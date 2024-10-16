document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("btn-login");
  const fetchSection = document.getElementById("fetch-section");
  const loginSection = document.getElementById("login-section");
  const fetchButton = document.getElementById("btn-f");
  const linkedinUrlInput = document.getElementById("linkedin-url");

  // Check the LinkedIn login status when the popup is opened
  chrome.runtime.sendMessage({ type: "checkLoginStatus" }, (response) => {
    const isLoggedIn = response.isLoggedIn;

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
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const linkedInLoginURL = "https://www.linkedin.com/login";
      const isOnLoginPage = tabs.some(
        (tab) => tab.url && tab.url.includes(linkedInLoginURL)
      );

      if (!isOnLoginPage) {
        chrome.tabs.create({ url: linkedInLoginURL });
      } else {
        window.close();
      }
    });
  });

  // Handle fetch data button click
  fetchButton.addEventListener("click", () => {
    const url = linkedinUrlInput.value.trim();
    if (url) {
      // Open LinkedIn profile URL in a new tab
      chrome.tabs.create({ url: url }, (tab) => {
        // Send a message to the content script to scrape data
        chrome.tabs.sendMessage(tab.id, { action: "scrapeProfile" });
      });

      // Open newPage.html to display the scraped data
      chrome.tabs.create({ url: "newPage.html" });
    }
  });
});
