chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "dataFound") {
    console.log(message.data);
    const userName = document.querySelector("#userName");
    const description = document.querySelector("#description");
    const profileImg = document.querySelector(".profileImg");
    userName.innerHTML = message.data.userName;
    description.innerHTML = message.data.description;
    profileImg.setAttribute("src", message.data.imgSrc);
    sendResponse("data Recieved by content.js");
  }
  if (message.action == "scrapData") {
    chrome.tabs.query({}, (tabs) => {
      const tab = tabs.find((tab) => tab.url.includes(message.url));
      if (tab) {
        chrome.runtime.sendMessage(
          { action: "scrapeProfile", tabId: tab.id },
          (response) => {
            chrome.tabs.query({}, (tabs) => {
              const tab = tabs.find((tab) => tab.title.includes("New Tab"));
              chrome.tabs.update(tab.id, { active: true }, () => {
                console.log(`Switched to tab: ${tab.title}`);
              });
            });
          }
        );
      } else {
        chrome.tabs.create({ url: message.url }, (response) => {
          chrome.runtime.sendMessage(
            { action: "scrapeProfile", tabId: response.id },
            (response) => {
              chrome.tabs.query({}, (tabs) => {
                const tab = tabs.find((tab) => tab.title.includes("New Tab"));
                chrome.tabs.update(tab.id, { active: true }, () => {
                  console.log(`Switched to tab: ${tab.title}`);
                });
              });
            }
          );
        });
      }
    });
  }

  sendResponse("tab opened");
});
