// Sync authentication token from dashboard to extension storage
if (window.location.origin === 'http://localhost:5173' || window.location.origin === 'http://127.0.0.1:5173') {
  const syncToken = () => {
    const token = localStorage.getItem('tw_token');
    chrome.storage.local.set({ tw_token: token }, () => {
      console.log('TruthWeave: Synced authentication token with extension');
    });
  };

  // Sync on initial load
  syncToken();

  // Listen for storage changes in the dashboard page
  window.addEventListener('storage', (event) => {
    if (event.key === 'tw_token') {
      syncToken();
    }
  });

  // Listen for custom token sync messages from the dashboard app directly (optional fallback)
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'TRUTHWEAVE_TOKEN_SYNC') {
      chrome.storage.local.set({ tw_token: event.data.token }, () => {
        console.log('TruthWeave: Received token sync from message');
      });
    }
  });
}

// In-page selection extractor listener
document.addEventListener('mouseup', () => {
  const selection = window.getSelection()?.toString().trim();
  if (selection && selection.length > 5) {
    chrome.runtime.sendMessage({
      type: 'SELECTION_CHANGE',
      text: selection
    }).catch(() => {});
  }
});
