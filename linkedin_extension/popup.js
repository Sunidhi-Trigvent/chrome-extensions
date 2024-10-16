// Check if the current tab is LinkedIn and open a login page if necessary
document.getElementById("btn").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabUrl = tabs[0].url;

    // Check if the current tab is not on LinkedIn
    if (!tabUrl.includes("linkedin.com")) {
      chrome.tabs.create(
        { url: "https://www.linkedin.com/login", active: true },
        function () {
          alert("Please log in to LinkedIn.");
        }
      );
    } else {
      alert("You are already on LinkedIn.");
    }
  });
});

// Redirect the user to their LinkedIn profile if not logged in
document.getElementById("btn-redirect").addEventListener("click", function () {
  chrome.tabs.create({ url: "https://www.linkedin.com/me/" });
});

// Fetch LinkedIn profile data
document.getElementById("btn-f").addEventListener("click", function () {
  const linkedinUrl = document.getElementById("linkedin-url").value;

  // Open the LinkedIn profile in a new tab
  chrome.tabs.create({ url: linkedinUrl }, function (tab) {
    // Wait until the LinkedIn page loads, then inject the content script
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["contentScript.js"],
      },
      () => {
        console.log("Content script injected.");

        // Listen for the scraped data message from the background script
        chrome.runtime.onMessage.addListener(function (message) {
          if (message.type === "profileData") {
            // Open newPage.html to display the profile data
            chrome.tabs.create({ url: chrome.runtime.getURL("newPage.html") });
          }
        });
      }
    );
  });
});
