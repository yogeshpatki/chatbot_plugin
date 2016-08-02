// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
    	if(request.url.indexOf("accountSummary") >= 0){
    		var data = getData();
    		loadContext(data);
    		$('body').append('<div class="chatBot" id="chatBot"> <span id="chatMessage">Click Here To Chat</span></div>');
    	}
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

$('.chatBot').on('click',function(){
	var that = $(this);
	that.html(
                '<li class="self">' +
            '<div class="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>' +
                '<div class="msg">'+
                    '<p>'+"message"+'</p>' +
                '</div>'+
            '</div>' +
            '</li>'
            );
            $(window).scrollTop(10000000000000);

});
