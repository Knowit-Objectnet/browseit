var Browser = {

  openTab: function(url) {
    if (chrome.tabs != undefined) {
      chrome.tabs.create({url: url, selected: true});
    }
  },

  openBackgroundTab: function(url) {
    if (chrome.tabs != undefined) {
      chrome.tabs.create({url: url, selected: false});
    }
  },

  getUrl: function(url) {
    // Allows you to get an accessible URL for a resource in the extension, e.g. an image
    return chrome.extension.getURL(url);
  },

}
