//current-tab-open-new-tab
// document.getElementById("btn").addEventListener("click", function () {
//   //   alert("welcome!");
//   chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//     // console.log(tabs[0].url);

//     let tabUrl = tabs[0].url;

//     if (tabUrl.indexOf("linkedin.com") == -1) {
//       chrome.tabs.create(
//         { url: "https://in.linkedin.com/", active: true },
//         function (tab) {
//           alert("Tab is opened");
//         }
//       );
//     }
//   });
// });

//fetch-btn code
// document.getElementById("btn-f").addEventListener("click", function () {
//   chrome.tabs.create({ url: chrome.runtime.getURL("newPage.html") });
// });

//fetch-linkedin-url
document.getElementById("btn-f").addEventListener("click", function () {
  const linkedinUrl = document.getElementById("linkedin-url").value;
  chrome.tabs.create({
    url: chrome.runtime.getURL("newPage.html"),
  });

  // Store the LinkedIn URL using chrome storage to access it in the new page
  chrome.storage.local.set({ linkedinUrl: linkedinUrl }, function () {
    console.log("LinkedIn URL stored: " + linkedinUrl);
  });
});
