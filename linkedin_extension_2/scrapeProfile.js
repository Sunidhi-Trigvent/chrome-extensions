// scrapeProfile.js

// Function to display profile data in newPage.html
function displayProfileData(data) {
    document.getElementById('profile-name').innerText = data.name;
    document.getElementById('profile-headline').innerText = data.headline;
}

// Get data from the current tab using storage
chrome.storage.sync.get(["profileData"], ({ profileData }) => {
    if (profileData) {
        displayProfileData(profileData);
    } else {
        document.getElementById('profile-name').innerText = 'Data not found';
        document.getElementById('profile-headline').innerText = 'Data not found';
    }
});
