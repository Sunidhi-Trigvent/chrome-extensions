const fetchDataButton = document.querySelector(".fetchData");
const urlField = document.querySelector(".urlField");
fetchDataButton.addEventListener("click", () => {
  if (urlField.value !== "") {
    openContent("content.html");
  }
});

chrome.runtime.sendMessage(
  {
    action: "checkLoggedInStatus",
  },
  (response) => {
    if (!response.loggedIn) {
      const element = document.querySelector(".popup-body");
      element.innerHTML = `<button type="button" class="loginButton">login First</button>`;
      document.querySelector(".loginButton").addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "getTabs" }, (response) => {
          if (response) {
            const isTabOpen = response.tabs.filter((tab) => {
              return tab.url.includes("https://www.linkedin.com");
            });
            if (isTabOpen.length === 0) {
              handleLogIn();
            }
          }
        });
      });
    }
  }
);

function handleLogIn() {
  chrome.tabs.create({ url: "https://www.linkedin.com/login" });
}

function openContent() {
  chrome.tabs.create({ url: chrome.runtime.getURL("content.html") }, (tab) => {
    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
      // Check if the tab is fully loaded
      if (tabId === tab.id && changeInfo.status === "complete") {
        // Send a message to content.js
        chrome.runtime.sendMessage(
          { action: "scrapData", url: urlField?.value },
          function (response) {
            console.log("Response from content.js:", response);
          }
        );

        // Remove the listener to avoid duplicate messages
        chrome.tabs.onUpdated.removeListener(listener);
      }
    });
  });
}
