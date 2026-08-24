const API_URL = "http://localhost:8000/api/v1";

interface UserProfile {
  email: string;
  role: string;
}

document.addEventListener("DOMContentLoaded", () => {
  const authStatusCard = document.getElementById("auth-status-card")!;
  const verificationCard = document.getElementById("verification-card")!;
  const claimText = document.getElementById("claim-text")!;
  const verifyBtn = document.getElementById("verify-btn") as HTMLButtonElement;
  const resultsCard = document.getElementById("results-card")!;
  const resultsContent = document.getElementById("results-content")!;

  let currentToken: string | null = null;
  let activeClaim: string | null = null;

  const checkAuth = async () => {
    chrome.storage.local.get(["tw_token"], async (result) => {
      const token = result.tw_token;
      if (!token) {
        renderLoggedOut();
        return;
      }

      currentToken = token;
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const user: UserProfile = await response.json();
          renderLoggedIn(user);
        } else {
          renderLoggedOut();
        }
      } catch (err) {
        console.error("Error verifying credentials", err);
        authStatusCard.innerHTML = `<p style="color: #f87171;">Unable to connect to TruthWeave core backend.</p>`;
      }
    });
  };

  const renderLoggedOut = () => {
    currentToken = null;
    authStatusCard.innerHTML = `
      <p style="color: #f87171; font-weight: 600;">Not Authenticated</p>
      <p>Please log in to your dashboard to activate the verification tools.</p>
      <button class="btn" id="go-to-dashboard-btn">Go to Dashboard</button>
    `;
    document.getElementById("go-to-dashboard-btn")?.addEventListener("click", () => {
      chrome.tabs.create({ url: "http://localhost:5173" });
    });
    verificationCard.style.display = "none";
    resultsCard.style.display = "none";
  };

  const renderLoggedIn = (user: UserProfile) => {
    authStatusCard.innerHTML = `
      <p style="color: #34d399; font-weight: 600; margin: 0 0 4px 0;">🛡️ Verified Connection</p>
      <p style="margin: 0; font-size: 12px; color: #94a3b8;">User: ${user.email} (${user.role})</p>
    `;
    verificationCard.style.display = "block";
    
    // Check if background worker has a cached active selection
    chrome.runtime.sendMessage({ type: "GET_LAST_SELECTION" }, (response) => {
      if (response && response.text) {
        updateActiveClaim(response.text);
      }
    });
  };

  const updateActiveClaim = (text: string) => {
    activeClaim = text;
    claimText.innerText = `"${text}"`;
    resultsCard.style.display = "none";
    verifyBtn.disabled = false;
    verifyBtn.innerText = "Run AI Verification";
  };

  // Listen for incoming selection messages
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "VERIFY_CLAIM") {
      updateActiveClaim(message.text);
    }
  });

  // Handle Verify button clicks
  verifyBtn.addEventListener("click", async () => {
    if (!activeClaim || !currentToken) return;

    verifyBtn.disabled = true;
    verifyBtn.innerText = "Analyzing Claim...";
    resultsCard.style.display = "block";
    resultsContent.innerHTML = `<p class="status">Sending claim to TruthWeave core engine...</p>`;

    try {
      const response = await fetch(`${API_URL}/verify/text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`
        },
        body: JSON.stringify({ text: activeClaim })
      });

      if (response.ok) {
        const data = await response.json();
        
        let scoreColor = "#34d399"; // Green
        if (data.score < 40) scoreColor = "#f87171"; // Red
        else if (data.score < 75) scoreColor = "#fbbf24"; // Amber

        resultsContent.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-weight: bold;">Trust Score:</span>
            <span style="font-size: 20px; font-weight: 800; color: ${scoreColor};">${data.score}%</span>
          </div>
          <p style="margin: 8px 0; font-weight: bold; color: #e2e8f0;">Summary:</p>
          <p style="margin: 0; color: #cbd5e1; font-size: 13px; line-height: 1.4;">${data.summary}</p>
        `;
        verifyBtn.innerText = "Analysis Complete";
      } else {
        resultsContent.innerHTML = `<p style="color: #f87171;">Verification failed. Server returned status: ${response.status}</p>`;
        verifyBtn.disabled = false;
        verifyBtn.innerText = "Try Again";
      }
    } catch (err) {
      console.error(err);
      resultsContent.innerHTML = `<p style="color: #f87171;">Network error connecting to API engine.</p>`;
      verifyBtn.disabled = false;
      verifyBtn.innerText = "Try Again";
    }
  });

  // Periodically check local storage updates (e.g. if tab logs in/out)
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.tw_token) {
      checkAuth();
    }
  });

  checkAuth();
});
