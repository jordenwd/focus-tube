// constantly observes the state of the page, setting chosen elements to hidden
const observer = new MutationObserver(() => {
  let homepage = document.getElementById("primary");
  let relatedVids = document.getElementById("related");
  let comments = document.getElementById("comments");
  chrome.storage.local.get(
    ["hideHomepageVideos", "hideRelatedVideos", "hideComments"],
    (result) => {
      homepage.hidden = result.hideHomepageVideos && homepage;
      relatedVids.hidden = result.hideRelatedVideos && relatedVids;
      comments.hidden = result.hideComments && comments;
    },
  );
});

observer.observe(document.body, { subtree: true, childList: true });
