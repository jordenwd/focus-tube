chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    enabled: false,
    hideRecommended: true,
    hideComments: false,
    hideSidebar: true,
  });
});
