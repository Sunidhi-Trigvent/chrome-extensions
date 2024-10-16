// contentScript.js

function scrapeLinkedInProfile() {
  const name =
    document.querySelector(".pv-text-details__left-panel h1")?.innerText ||
    "Name not found";
  const bio =
    document.querySelector(".pv-about-section p")?.innerText || "Bio not found";
  const experienceElements = document.querySelectorAll(
    ".experience-section ul li .pv-entity__summary-info h3"
  );
  const experience =
    Array.from(experienceElements)
      .map((el) => el.innerText)
      .join(", ") || "Experience not found";

  return { name, bio, experience };
}

// Send the scraped data back to the background script
chrome.runtime.sendMessage({
  type: "profileData",
  data: scrapeLinkedInProfile(),
});
