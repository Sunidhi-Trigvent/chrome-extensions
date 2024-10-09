// // Mock function to simulate fetching user data from LinkedIn
// function fetchUserData(linkedinUrl) {
//   // In a real application, you would fetch the data from LinkedIn API or scrape it
//   // Here we are returning mock data
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         name: "John Doe",
//         bio: "Software Developer with 5 years of experience.",
//         experience: "Worked at Company A, Company B",
//       });
//     }, 2000); // Simulating network delay
//   });
// }

// Get the LinkedIn URL from storage
chrome.storage.local.get("linkedinUrl", function (data) {
  const linkedinUrl = data.linkedinUrl;

  // Fetch the user data
  fetchUserData(linkedinUrl).then((userData) => {
    // Update the table with fetched data
    const tableBody = document
      .getElementById("profile-table")
      .querySelector("tbody");
    tableBody.innerHTML = ""; // Clear the loading row

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
            <td>${userData.name}</td>
            <td>${userData.bio}</td>
            <td>${userData.experience}</td>
        `;
    tableBody.appendChild(newRow);
  });
});
