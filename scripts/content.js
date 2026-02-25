let settings = {
  hideComments: true,
  hideHomepageVideos: true,
  hideRelatedVideos: true,
  hideShorts: true,
};

const observer = new MutationObserver(() => {
  let relatedVids = document.getElementById("related");
  console.log("adsfasfdsafasf");
  relatedVids.hidden = true;
});

observer.observe(document.body, { subtree: true, childList: true });

chrome.runtime.onMessage.addListener((message) => {
  settings = message.settings;
});
