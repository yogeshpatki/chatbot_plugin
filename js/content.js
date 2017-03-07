// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
    	if(request.url.indexOf("accountSummary") >= 0){
    		var data = getData();
    		loadContext(data);
    	}
		$('body').append('<div class="chatBot" id="chatBot"> <span id="chatMessage">Click Here To Chat</span></div>');
		bindEvent();
		$('#accountTile').attr('data-step',1);
		$('#accountTile').attr('data-intro','Your balance is displayed here');
		$('#accountTile').attr('data-position','right');
		$('#paymentTile').attr('data-step',2);
		$('#paymentTile').attr('data-intro','This displays your current payment due.');
		$('#paymentTile').attr('data-position','right');
		$('#activityTile').attr('data-step',3);
		$('#activityTile').attr('data-intro','These are  you recent activities.');
		$('#activityTile').attr('data-position','right');


    }
  }
);

var getData = function(){
	var data= {},
	    name = $('p.b-greeting').text().split(",")[1].trim(),
	    balance = $('#accountTile .tile-message').text();
	data = {"balance" : balance,
			"userName" : name }
	return data;
} 

var loadContext = function(context){
	var response = $.ajax({
		url:"https://fuzzychat.herokuapp.com/contextLoad",
		data:JSON.stringify(context),
		type:"post",
		contentType:"application/json"

	});
}

var bindEvent = function(){ $('.chatBot').on('click',function(){
	var that = $(this);
	that.css("height","400px");
	that.html('<iframe class="chatWindow card1" src="https://fuzzychat.herokuapp.com/"> </iframe>');
            

});
}

window.onmessage = function(e){
    if (e.data == 'tourNeeded') {
        introJs().start();
    }
};