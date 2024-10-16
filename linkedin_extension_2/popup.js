document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("btn-login");
  const fetchSection = document.getElementById("fetch-section");
  const loginSection = document.getElementById("login-section");

  // Check the login status from Chrome storage
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
    chrome.tabs.create({ url: "https://www.linkedin.com/login" });
    chrome.storage.sync.set({ isLoggedIn: true }, () => {
      loginSection.style.display = "none";
      fetchSection.style.display = "block";
    });
  });
});
