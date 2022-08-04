"use strict";

var color = "#3aa757";

function defaultFunction() {
  chrome.storage.sync.set({ color });
  console.log("Default background color set to %cgreen", `color: ${color}`);
}

chrome.runtime.onInstalled.addListener(function (details) {
  defaultFunction();
  //   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //     chrome.declarativeContent.onPageChanged.addRules([rule2]);
  //   });
});
