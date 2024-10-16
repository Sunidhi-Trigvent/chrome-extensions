// content.js

// Function to check login status (this part remains unchanged)
function checkLoginStatus() {
  const isLoggedIn =
    document.URL.includes("linkedin.com/feed") ||
    document.URL.includes("linkedin.com/in/");

  // Send a message to the background script with the login status
  chrome.storage.sync.set({ isLoggedIn });
}

// Run the check when the content script is loaded
checkLoginStatus();
// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrapeProfile") {
    // Scrape the profile data
    const profileNameElement = document.querySelector("h1.text-heading-xlarge");
    const profileHeadlineElement = document.querySelector(
      "div.text-body-medium"
    );
    const profileImageElement = document.querySelector(
      "img.pv-top-card-profile-picture__image--show"
    );

    const profileName = profileNameElement
      ? profileNameElement.innerText
      : "Not found";
    const profileHeadline = profileHeadlineElement
      ? profileHeadlineElement.innerText
      : "Not found";
    const profileImage = profileImageElement ? profileImageElement.src : "";

    // Send the profile data including the image to the scrapeProfile.js script
    chrome.runtime.sendMessage({
      profileData: {
        name: profileName,
        headline: profileHeadline,
        image: profileImage,
      },
    });

    // Indicate that the response is asynchronous
    sendResponse({ success: true });
    return true;
  }
});
