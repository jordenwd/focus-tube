const observer = new MutationObserver(() => {
  let relatedVids = document.getElementById("related");
  console.log("adsfasfdsafasf");
  relatedVids.hidden = true;
});

observer.observe(document.body, { subtree: true, childList: true });
