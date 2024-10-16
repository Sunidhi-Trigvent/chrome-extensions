// content.js

// Check if the user is logged in by checking the current URL
function checkLoginStatus() {
  const isLoggedIn =
    document.URL.includes("linkedin.com/feed") ||
    document.URL.includes("linkedin.com/in/");

  // Send a message to the background script with the login status
  chrome.storage.sync.set({ isLoggedIn });
}

// Run the check when the content script is loaded
checkLoginStatus();
