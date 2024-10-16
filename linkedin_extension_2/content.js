// content.js

// Check if the user is logged in by checking the current URL
function checkLoginStatus() {
    const isLoggedIn =
      document.URL.includes("linkedin.com/feed") ||
      document.URL.includes("linkedin.com/in/");
  
    // Store the login status
    chrome.storage.sync.set({ isLoggedIn });
  
    // Optionally send a message to the background script
    chrome.runtime.sendMessage({ type: "updateLoginStatus", isLoggedIn });
  }
  
  // Run the check when the content script is loaded
  checkLoginStatus();
  