// sets default values on extension install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    focusModeEnabled: false,
    hideRelatedVideos: false,
    hideHomepageVideos: false,
    hideComments: false,
  });
});
