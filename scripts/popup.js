const form = document.getElementById("focus-settings");
console.log("asef");

form.addEventListener("change", () => {
  const formData = new FormData(form);
  const settings = {};

  formData.forEach((value, key) => {
    settings[key] = value === "on";
  });
  console.log(settings);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: "UPDATE_SETTINGS", settings });
  });
});
