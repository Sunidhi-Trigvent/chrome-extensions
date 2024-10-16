// Listener for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "profileData") {
    // Handle the received profile data
    console.log("Received profile data from content script:", message.data);

    // Store the LinkedIn profile data in Chrome storage
    chrome.storage.local.set(
      { linkedinProfileData: message.data },
      function () {
        console.log(
          "LinkedIn Profile Data stored in background:",
          message.data
        );

        // Notify any listeners that the data has been stored
        chrome.runtime.sendMessage({ type: "dataStored" });
      }
    );
  }
});
