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
	that.html('<iframe class="chatWindow card1" src="http://localhost:8080/"> </iframe>');
            

});
}


function startTour(tourName) {
	if(tourName == "accountsummary"){
		startAccountSummaryTour();
	}else if(tourName == "rewardsHub"){
		startBenefitCenterTour();
	}else if(tourName == "pinChange"){
		startPinChangeTour();
	}else if(tourName == 'rewardsActivity'){
		startRewardsActivityTour();
	}
}
window.onmessage = function(e){
    if (e.data.tourNeeded) {
    	startTour(e.data.tourName);   
    }
};
