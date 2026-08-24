// Setup context menu item on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "verify-claim",
    title: "Verify with TruthWeave",
    contexts: ["selection"]
  });
});

// Handle selection context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "verify-claim" && info.selectionText && tab?.id) {
    // Open side panel
    chrome.sidePanel.open({ tabId: tab.id })
      .then(() => {
        // Send verification request to sidepanel (retried since panel might still be loading)
        const sendPayload = (retries = 3) => {
          chrome.runtime.sendMessage({
            type: "VERIFY_CLAIM",
            text: info.selectionText
          }).catch((err) => {
            if (retries > 0) {
              setTimeout(() => sendPayload(retries - 1), 300);
            } else {
              console.error("Failed to send message to sidepanel", err);
            }
          });
        };
        setTimeout(() => sendPayload(), 500);
      })
      .catch((err) => {
        console.error("Failed to open sidepanel", err);
      });
  }
});

// Cache for passing the last active selection text
let lastSelection = "";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SELECTION_CHANGE") {
    lastSelection = message.text;
  } else if (message.type === "GET_LAST_SELECTION") {
    sendResponse({ text: lastSelection });
  }
  return true;
});
