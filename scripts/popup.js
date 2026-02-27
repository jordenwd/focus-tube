const form = document.getElementById("focus-settings");
const focusButton = document.getElementById("toggle-button");

const relatedInput = document.getElementById("relatedVideosInput");
const homepageInput = document.getElementById("homepageInput");
const commentsInput = document.getElementById("commentsInput");

// initialize checkboxes and focus button
initCheckboxes();
chrome.storage.local.get(["focusModeEnabled"], (result) => {
  focusButton.innerText = result.focusModeEnabled
    ? "Disable focus"
    : "Enable focus";
});

// set variables in local storage when form is changed
form.addEventListener("change", () => {
  console.log("form changed");
  chrome.storage.local.set({
    [relatedVideosInput.name]: relatedVideosInput.checked,
  });
  chrome.storage.local.set({ [homepageInput.name]: homepageInput.checked });
  chrome.storage.local.set({ [commentsInput.name]: commentsInput.checked });
});

// change focus mode when focus button is clicked
focusButton.addEventListener("click", () => {
  chrome.storage.local.get("focusModeEnabled").then((result) => {
    if (!result.focusModeEnabled) {
      focusButton.innerText = "Disable focus";
      chrome.storage.local.set({ ["focusModeEnabled"]: true });
      return;
    }
    focusButton.innerText = "Enable focus";
    chrome.storage.local.set({ ["focusModeEnabled"]: false });
  });
});

// asynchronous function to initialize checkboxes when the popup is loaded
async function initCheckboxes() {
  const defaults = {
    hideRelatedVideos: false,
    hideHomepageVideos: false,
    hideComments: false,
  };

  function setFocusButton() {}

  await chrome.storage.local.get(Object.keys(defaults)).then((result) => {
    for (const [key, defaultValue] of Object.entries(defaults)) {
      if (!(key in result)) {
        chrome.storage.local.set({ [key]: defaultValue });
      }
    }
  });

  const result = await chrome.storage.local.get(Object.keys(defaults));
  relatedInput.checked = result.hideRelatedVideos;
  homepageInput.checked = result.hideHomepageVideos;
  commentsInput.checked = result.hideComments;
}
