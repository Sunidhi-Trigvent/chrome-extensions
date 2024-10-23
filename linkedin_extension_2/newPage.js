document.addEventListener("DOMContentLoaded", () => {
  // Fetch the profile data from chrome.storage
  chrome.storage.sync.get("profiles", ({ profiles }) => {
    const tbody = document.querySelector("#profile-data tbody");
    tbody.innerHTML = ""; // Clear existing entries

    if (profiles && profiles.length > 0) {
      profiles.forEach((profile) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${
              profile.image || "default-image.jpg"
            }" alt="Profile Image" width="100" height="100"></td>
            <td>${profile.name}</td>
            <td>${profile.headline}</td>
          `;
        tbody.appendChild(row);
      });
    } else {
      console.error("No profiles found in chrome.storage");
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="3">No profiles available.</td>`;
      tbody.appendChild(row);
    }
  });
});
