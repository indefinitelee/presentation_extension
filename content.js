(function changeImgs(url) {
  console.log("change Imgs");
  let imgs = document.getElementsByTagName("img");
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].src = "/cat_pic.jpeg";
  }
})();

//  wrap in IFFE? ( stuff )()
