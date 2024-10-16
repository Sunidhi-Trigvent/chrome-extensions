// scrapeProfile.js

// Function to display profile data in newPage.html
function displayProfileData(data) {
    document.getElementById("profile-name").innerText = data.name;
    document.getElementById("profile-headline").innerText = data.headline;
  }
  
  // Listen for messages from content.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.profileData) {
      // Display the profile data received from the content script
      displayProfileData(request.profileData);
    }
  });
  