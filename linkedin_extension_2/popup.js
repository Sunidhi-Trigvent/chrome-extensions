document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("btn-login");
  const fetchSection = document.getElementById("fetch-section");
  const loginSection = document.getElementById("login-section");

  // Function to check LinkedIn login status
  function checkLinkedInLoginStatus() {
    chrome.tabs.query({ url: "*://www.linkedin.com/*" }, (tabs) => {
      if (tabs.length > 0) {
        // Assume the user is logged in if there is an open LinkedIn tab
        chrome.storage.sync.set({ isLoggedIn: true }, () => {
          loginSection.style.display = "none";
          fetchSection.style.display = "block";
        });
      } else {
        chrome.storage.sync.set({ isLoggedIn: false }, () => {
          loginSection.style.display = "block";
          fetchSection.style.display = "none";
        });
      }
    });
  }

  // Check the login status on page load
  chrome.storage.sync.get("isLoggedIn", ({ isLoggedIn }) => {
    if (isLoggedIn) {
      loginSection.style.display = "none";
      fetchSection.style.display = "block";
    } else {
      loginSection.style.display = "block";
      fetchSection.style.display = "none";
    }
  });

  // Handle login button click
  loginButton.addEventListener("click", () => {
    chrome.tabs.create({ url: "https://www.linkedin.com/login" }, () => {
      // Once the user logs in, the status will be updated when they reopen the popup
      chrome.storage.sync.set({ isLoggedIn: true });
    });
  });

  // Check LinkedIn login status whenever the popup is opened
  checkLinkedInLoginStatus();
});
