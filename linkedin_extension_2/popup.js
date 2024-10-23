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
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];

        chrome.tabs.update(activeTab.id, { url: url }, () => {
          chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
            if (tabId === activeTab.id && info.status === "complete") {
              chrome.tabs.onUpdated.removeListener(listener);

              chrome.tabs.sendMessage(
                activeTab.id,
                { action: "scrapeProfile" },
                (response) => {
                  if (response && response.success) {
                    // Profile data successfully scraped, open the new page
                    chrome.tabs.create({ url: "newPage.html" });
                  } else {
                    console.error(
                      "Error in sending message to content script."
                    );
                  }
                }
              );
            }
          });
        });
      });
    }
  });
});
