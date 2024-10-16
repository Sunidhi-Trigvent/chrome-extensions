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

  // Handle login button click to open LinkedIn login page
  loginButton.addEventListener("click", () => {
    chrome.tabs.create({ url: "https://www.linkedin.com/login" }, () => {
      // Temporarily set login status to false until the user logs in completely
      chrome.storage.sync.set({ isLoggedIn: false });
    });
  });
});
