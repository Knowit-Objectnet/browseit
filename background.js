var openTab = function(url) {
  if (chrome.tabs != undefined) {
    chrome.tabs.create({url: url, selected: true});
  }
};

chrome.commands.onCommand.addListener(function(command) {
  if (command == 'open_confluence') {
    openTab('https://projects.knowit.no/');
  }
  if (command == 'open_jira') {
    openTab('https://support.knowit.no/');
  }
  if (command == 'open_bitbucket') {
    openTab('https://kode.knowit.no/');
  }
  else {
    console.error('Unrecognized browser command');
  }
});
