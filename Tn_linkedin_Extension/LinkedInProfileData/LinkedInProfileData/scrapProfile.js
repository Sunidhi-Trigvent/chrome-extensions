// Function to check for the profile name element
function checkForProfileName() {
  let userName = document.querySelector(
    ".text-heading-xlarge.inline.t-24.v-align-middle.break-words"
  );
  const description = document.querySelector(".text-body-medium.break-words");
  const ProfileImg = findImageSrcByPartialTitle(userName.textContent.trim());
  let imgSrc = "";
  if (ProfileImg) {
    imgSrc = ProfileImg;
  }

  // if (userName) {
  // Successfully found the element
  console.log("Profile Name found:", userName.textContent.trim());

  chrome.runtime.sendMessage(
    {
      action: "data",
      data: {
        userName: userName.textContent.trim(),
        description: description.textContent.trim(),
        imgSrc: imgSrc,
      },
    },
    (response) => {
      console.log("Response from background:", response);
    }
  );
  // } else {
  //   console.log("Profile Name element not found, retrying...");
  //   setTimeout(checkForProfileName, 500); // Retry every 500 ms
  // }
}

// Start checking for the profile name element
checkForProfileName();

function findImageSrcByPartialTitle(partialTitle) {
  // Select all img elements on the page
  const imgElements = document.querySelectorAll("img");

  // Filter the img elements to find those whose title contains the partial string
  const matchingImages = Array.from(imgElements).filter((img) =>
    img.title.includes(partialTitle)
  );

  // Check if any images were found
  if (matchingImages.length > 0) {
    console.log(
      `Found ${matchingImages.length} image(s) with title containing: "${partialTitle}"`
    );

    // Iterate over each matched image and log its src
    matchingImages.forEach((imgElement, index) => {
      console.log(`Image ${index + 1} src:`, imgElement.src);
    });

    // Optionally, return the array of src attributes if needed
    return matchingImages.map((imgElement) => imgElement.src);
  } else {
    console.log(`No images found with title containing: "${partialTitle}"`);
    return [];
  }
}
