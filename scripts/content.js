// constantly observes the state of the page, setting chosen elements to hidden
const observer = new MutationObserver(() => {
  const homepage = document.getElementById("contents");
  const relatedVids = document.getElementById("related");
  const comments = document.getElementById("comments");

  // Check if the current page is the homepage
  const isHomepage = window.location.pathname === "/";

  chrome.storage.local.get(
    ["hideHomepageVideos", "hideRelatedVideos", "hideComments"],
    (result) => {
      if (isHomepage && homepage) {
        homepage.hidden = result.hideHomepageVideos;
      }
      if (relatedVids) {
        relatedVids.hidden = result.hideRelatedVideos;
      }
      if (comments) {
        comments.hidden = result.hideComments;
      }
    },
  );
});

observer.observe(document.body, { subtree: true, childList: true });
