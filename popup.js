// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  console.log("get Current Tab url");
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, tabs => {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == "string", "tab.url should be a string");

    callback(url);
  });
}

/* Add cats to the current page.
 *
 */

function addCats() {
  var catScript = `let imgs = document.getElementsByTagName("img");
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].src = "http://3.bp.blogspot.com/-KL7d7LdSANg/Tm5VLQf9k4I/AAAAAAAAACo/cSV52JoD7vk/s1600/cat-wallpaper-34-713472.jpg";
  }`;
  // See https://developer.chrome.com/extensions/tabs#method-executeScript.
  // chrome.tabs.
  // executeScript allows us to programmatically inject JavaScript
  // into a page. Since we omit the optional first argument "tabId", the script
  // is inserted into the active tab of the current window, which is the
  // default.
  chrome.tabs.executeScript({
    code: catScript
  });
}

function changeWords() {
  var wordScript = `document.body.innerHTML = document.body.innerHTML.replace(/Trump/g, 'Drumpf');`;
  chrome.tabs.executeScript({
    code: wordScript
  });
}

// function changeImgs(url, pic) {
//   console.log("change Imgs");
//   imgs = document.getElementsByTagName("img");
//   console.log("images", imgs);
//   imgs.src = "cat_pic.jpeg";
// }

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  getCurrentTabUrl(url => {
    console.log("tab url", url);
    var pic = "cat_pic.jpeg";
    var catifier = document.getElementById("catifier");
    var drumpifier = document.getElementById("drumpifier");
    catifier.addEventListener("click", () => {
      console.log("meow");
      addCats(url);
      changeWords(url);
    });
  });
});
