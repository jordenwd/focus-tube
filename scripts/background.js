// sets default values on extension install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    focusModeEnabled: true,
    hideRelatedVideos: true,
    hideHomepageVideos: true,
    hideComments: true,
  });
});
