// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const Http = new XMLHttpRequest();


'use strict';
console.log("downnnnnnnnn");
if (chrome.downloads.setShelfEnabled)
  chrome.downloads.setShelfEnabled(false);
isSafe = false;
chrome.downloads.onCreated.addListener(function (item) {
  console.log(item.url);
  // const url = 'http://13.211.158.6'
  const url = 'https://httpbin.org/post';
  if (isSafe == false) {
    console.log("not safe");
    chrome.downloads.cancel(item.id)
  }
  // Http.open("POST", url);
  // Http.send(item.finalUrl);

  // Http.onreadystatechange = (e) => {
  //   console.log(Http.responseText)
  // }
});
