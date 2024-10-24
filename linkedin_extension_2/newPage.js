document.addEventListener("DOMContentLoaded", () => {
  // Fetch the profile data from chrome.storage
  chrome.storage.sync.get("profiles", ({ profiles }) => {
    const tbody = document.querySelector("#profile-data tbody");
    tbody.innerHTML = ""; // Clear existing entries

    if (profiles && profiles.length > 0) {
      profiles.forEach((profile, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${
              profile.image || "default-image.jpg"
            }" alt="Profile Image" width="100" height="100"></td>
            <td>${profile.name}</td>
            <td>${profile.headline}</td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
          `;
        tbody.appendChild(row);
      });

      // Add event listeners to each delete button
      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", function () {
          const index = this.getAttribute("data-index");

          // Fetch profiles from storage again to update them
          chrome.storage.sync.get("profiles", ({ profiles }) => {
            if (profiles) {
              // Remove the profile at the specific index
              profiles.splice(index, 1);
              chrome.storage.sync.set({ profiles }, () => {
                console.log("Profile deleted successfully");

                // Reload the table to reflect the changes
                location.reload();
              });
            }
          });
        });
      });
    } else {
      console.error("No profiles found in chrome.storage");
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="4">No profiles available.</td>`;
      tbody.appendChild(row);
    }
  });
});
