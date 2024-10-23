// background.js

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "updateLoginStatus") {
    // Update the stored login status
    chrome.storage.sync.set({ isLoggedIn: request.isLoggedIn });
  } else if (request.type === "checkLoginStatus") {
    chrome.storage.sync.get("isLoggedIn", ({ isLoggedIn }) => {
      sendResponse({ isLoggedIn });
    });
    return true; // Indicate that the response is asynchronous
  }
});