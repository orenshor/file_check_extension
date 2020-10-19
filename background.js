// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


const XHR = new XMLHttpRequest();

'use strict';
console.log("downnnnnnnnn");
let shit = false;
chrome.downloads.onCreated.addListener(function (item) {
  // chrome.downloads.pause(item.id, function () {
  console.log(item);
  console.log(item.url);

  getPromise(item).then(function (res) {
    let result = res.target.response;
    console.log(res.target.response);
    if (result == "not_safe") {
      console.log("not safe");
      chrome.downloads.cancel(item.id);
      alert("You can't download an executable file!")
    }
    else if (result == 'not_recognized') {
      var c = confirm('Unrecognized file - Are you sure you wish to download this file?');
      if (!c) {
        chrome.downloads.cancel(item.id);
      }
    }
  }), function (err) { }


});

function getPromise(item) {
  const url = 'http://13.211.158.6:3000/checkFile';
  let pro = new Promise(function (resolve, reject) {
    const XHR = new XMLHttpRequest();
    XHR.open("POST", url);
    XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    XHR.onload = resolve;
    XHR.onerror = reject;
    XHR.send(JSON.stringify({ "url": item.url }))
    console.log("123213");
    // XHR.onreadystatechange(function () {
    //   let result = XHR.responseText
    //   console.log(XHR)

    // })
  })
  return pro;
}