document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("btn-login");
  const fetchSection = document.getElementById("fetch-section");
  const loginSection = document.getElementById("login-section");

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
    // Check if the user is currently on the LinkedIn login page
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const linkedInLoginURL = "https://www.linkedin.com/login";
      const isOnLoginPage = tabs.some(
        (tab) => tab.url && tab.url.includes(linkedInLoginURL)
      );

      if (!isOnLoginPage) {
        // If not on the LinkedIn login page, open a new tab
        chrome.tabs.create({ url: linkedInLoginURL });
      } else {
        // If already on the LinkedIn login page, just close the popup
        window.close();
      }
    });
  });
});
