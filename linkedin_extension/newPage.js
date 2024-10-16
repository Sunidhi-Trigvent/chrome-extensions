// Retrieve the LinkedIn profile data from Chrome storage and display it
chrome.storage.local.get("linkedinProfileData", function (data) {
  const userData = data.linkedinProfileData;

  const tableBody = document
    .getElementById("profile-table")
    .querySelector("tbody");
  tableBody.innerHTML = ""; // Clear the loading row

  // Check if userData exists
  if (userData) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${userData.name}</td>
        <td>${userData.bio}</td>
        <td>${userData.experience}</td>
    `;
    tableBody.appendChild(newRow);
  } else {
    tableBody.innerHTML = `<tr><td colspan="3">No data available</td></tr>`;
  }
});
