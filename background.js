// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


const XHR = new XMLHttpRequest();

'use strict';
chrome.downloads.onDeterminingFilename.addListener(function (item) {
  // send http request to the server - with the url of the file in question
  getPromise(item).then(function (res) {
    let result = res.target.response;
    console.log(res.target.response);
    //the file is an exe file
    if (result == "not_safe") {
      console.log("not safe");
      chrome.downloads.cancel(item.id);
      alert("You can't download an executable file!")
    }
    //the server didn't recognized to MIME type of the file
    else if (result == 'not_recognized') {
      var c = confirm('Unrecognized file - Are you sure you wish to download this file?');
      if (!c) {
        chrome.downloads.cancel(item.id);
      }
    }
  }), function (err) { }
});

// create a promise and return it, param: the download item
function getPromise(item) {
  const url = 'http://13.211.158.6:3000/checkFile';
  let promise = new Promise(function (resolve, reject) {
    const XHR = new XMLHttpRequest();
    XHR.open("POST", url);
    XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    XHR.onload = resolve;
    XHR.onerror = reject;
    XHR.send(JSON.stringify({ "url": item.url }))
  })
  return promise;
}