const form = document.getElementById("focus-settings");
const button = document.getElementById("toggle-button");

const relatedInput = document.getElementById("relatedVideosInput");
const homepageInput = document.getElementById("homepageInput");
const commentsInput = document.getElementById("commentsInput");

initCheckboxes();

form.addEventListener("change", () => {
  console.log("form changed");
  chrome.storage.local.set({
    [relatedVideosInput.name]: relatedVideosInput.checked,
  });
  chrome.storage.local.set({ [homepageInput.name]: homepageInput.checked });
  chrome.storage.local.set({ [commentsInput.name]: commentsInput.checked });
});

button.addEventListener("click", () => {
  const formData = new FormData(form);

  formData.forEach((value, key) => {
    chrome.storage.local.get([key]).then((result) => {
      console.log(result[key]);
    });
  });
});

async function initCheckboxes() {
  const defaults = {
    hideRelatedVideos: false,
    hideHomepageVideos: false,
    hideComments: false,
  };

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
