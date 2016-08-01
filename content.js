// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
    	console.dir($);
      $('p.text-text-muted').html("<a href=\"http://localhost:8080/\">Click Here To Open ChatBot</a>");
    }
  }
);

