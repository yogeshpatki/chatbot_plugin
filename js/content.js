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

function startAccountSummaryTour(){
	var intro = introJs();
	intro.setOptions(getTourSteps().accountSummaryTourSteps);
	intro.onchange(function(data){
		console.log(data);
	});
	intro.start();
}

function startBenefitCenterTour(){
	var intro = introJs();
	intro.setOptions(getTourSteps().rewardsHubSteps);
	intro.onchange(function(data){
		console.log(data);
	});
	intro.start();
}

function startTour(tourName) {
	if(tourName == "accountsummary"){
		startAccountSummaryTour();
	}else if(tourName == "rewardsHub"){
		startBenefitCenterTour();
	}
}
window.onmessage = function(e){
    if (e.data.tourNeeded) {
    	startTour(e.data.tourName);   
    }
};

function getTourSteps(){
var tourSteps = {
	accountSummaryTourSteps : {
		steps : [
		  {
            element: '#accountTile',
            intro: "Your balance is displayed here",
            position: 'right'
          },
          {
            element: '#paymentTile',
            intro: 'This displays your current payment due.',
            position: 'left'
          },
          {
            element: '#activityTile',
            intro: "These are  you recent activities.",
            position: 'right'
          }
		
		]
	},
	rewardsHubSteps : {
		steps : [
		  {
            element: document.querySelectorAll('.benefits-center-tile.row')[0],
            intro: "This is your Rewards Summary in a nutshell.",
            position: 'top'
          },
          {
            element: document.querySelectorAll('.reward-tile-container.tile')[0],
            intro: 'You can click this to see how to earn rewards.',
            position: 'right'
          },
          {
            element: document.querySelectorAll('.reward-tile-container.tile')[1],
            intro: "This will help you understand how to use your rewards.",
            position: 'left'
          }
		
		]	
	} 
}
return tourSteps;
}
