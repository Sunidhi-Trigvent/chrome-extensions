chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "checkLoggedInStatus") {
    chrome.cookies.get(
      { url: "https://www.linkedin.com", name: "li_at" },
      (cookie) => {
        sendResponse({ loggedIn: !!cookie });
      }
    );
  }

  if (message.action === "getTabs") {
    chrome.tabs.query({}, (tabs) => {
      sendResponse({ tabs: tabs });
    });
  }

  if (message.action === "scrapeProfile") {
    chrome.scripting.executeScript(
      {
        target: { tabId: message.tabId },
        files: ["scrapProfile.js"],
      },
      () => {
        if (chrome.runtime.lastError) {
          sendResponse("Script injection failed:", chrome.runtime.lastError);
        } else {
          sendResponse("Script injected successfully into tab", message.tabId);
        }
      }
    );
  }

  if (message.action === "data") {
    console.log(message.data);
    chrome.runtime.sendMessage(
      { action: "dataFound", data: message.data },
      (response) => {
        console.log(response);
      }
    );
    sendResponse("data recieved by background.js");
  }

  // if (message.action === "contentPageOpen") {
  //   chrome.runtime.sendMessage({ action: "contentPageOpen", url: message.url });
  //   sendResponse({ message: "Content page opened successfully" });
  // }

  return true;

  //   if (message.action === "openNewTab") {
  //     // Open a new tab and pass the input content
  //     const url = "content.html";
  //   chrome.tabs.create({ url: url }, function (tab) {
  //     // Set the content of the new tab to the input content
  //     //   chrome.tabs.executeScript(tab.id, {
  //     //     code: `document.body.innerHTML = '${message.content}';`,
  //     //   });
  //   });
  //   }
});
// A2On35N4AQAASeXQ_QbbkumvQUR1hSFT9HTWZqSJTkw_NlOJKf3pPtGPApBnAWIqiy6Lr4YowLkAAAAAAAAAAA==
// voyager-web:badges	[{"_id":"ACoAAEXeSBkBiegJrYzZpAjxYILKtzDKWsFzs9E","tab":"feed","count":0}]
// voyager-web:enterSend	false
// voyager-web:feedInitialRequestUpdates	urn:li:activity:7249645051469783040|urn:li:activity:7247702680809201664
// voyager-web:msg-overlay-state	[{"_id":"urn:li:fs_miniProfile:ACoAAEXeSBkBiegJrYzZpAjxYILKtzDKWsFzs9E","_listBubble":{"isMinimized":false},"_timeLastUpdatedState":1728472817499}]
