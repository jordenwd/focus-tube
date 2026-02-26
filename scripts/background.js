chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    hideRelatedVideos: false,
    hideHomepageVideos: false,
    hideComments: false,
  });
});
