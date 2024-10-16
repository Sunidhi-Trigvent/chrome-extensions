// background.js

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'checkLoginStatus') {
      chrome.storage.sync.get('isLoggedIn', ({ isLoggedIn }) => {
        sendResponse({ isLoggedIn });
      });
      // Return true to indicate we will respond asynchronously
      return true;
    }
  });
  