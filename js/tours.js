
function startAccountSummaryTour(){
	var intro = introJs();
	intro.setOptions(getTourSteps().accountSummaryTourSteps);
	intro.start();
}

function startBenefitCenterTour(){
	var intro = introJs();
	intro.setOptions(getTourSteps().rewardsHubSteps);
	intro.start();
}

function startPinChangeTour(){
	var pinIntro = introJs();
    	pinIntro.setOptions(getTourSteps().changePinSteps);
    	pinIntro.onafterchange(function(step){
    		var allSteps = pinIntro._options.steps,
    		    currentStep = pinIntro._currentStep;
    		if(currentStep != 0 && allSteps[currentStep-1].requiresInteraction){
					setTimeout(function(){
						$(allSteps[0].element).addClass('open');
						setTimeout(function(){
							$('[data-auto="subnav-services-manage-pin"]').closest('li').css('transition',' border 1s');
							$('[data-auto="subnav-services-manage-pin"]').closest('li').css('border','2px solid red');
						},500);
					},500);
			}
    	});
    	pinIntro.start();
}

function startRewardsActivityTour(){
	var intro = introJs();
	intro.setOptions(getTourSteps().rewardsActivitySteps);
	/*intro.onbeforechange(function(step){
		var allSteps = intro._options.steps,
		    currentStep = intro._currentStep;	
		    if(currentStep != 0 && allSteps[currentStep-1].requiresInteraction){
		    	allSteps[currentStep-1].element.click();
			}
		
	});*/
	intro.start();
}

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
	},
	changePinSteps : {
		steps : [
		  {
            element: document.querySelectorAll('[data-auto="primary-nav-services"]')[0],
            intro: "You can change or manage your PIN from services menu. Click next to proceed",
            position: 'left',
            requiresInteraction : true
          },
          {
            element: document.querySelectorAll('[data-auto="primary-nav-services"]>ul')[0],
            intro: "This navigation menu holds many services you can avail online. Changing your EMV pin being one of them. Click on the link highlighted",
            position: 'left',
            requiresInteraction : true
          }
		]
	},
	rewardsActivitySteps : {
		steps : [
		  {
            element: '#top-section',
            intro: "This is your rewards activity at a glance!",
            position: 'top'
          },
          {
            element: document.querySelectorAll('[data-tab-name="currentBenefits"]')[0],
            intro: "You can view your reward goals for this anniversary period under Current Benefits tab.",
            position: 'top',
            requiresInteraction : true
          },
          {
            element: "#tab-content",
            intro: "You can see the your spend progress for each of the schemes available for you.",
            position: 'top'
          },
          {
            element: document.querySelectorAll('[data-tab-name="benefitHistory"]')[0],
            intro: "You can view your reward goals status for prevois anniversaries under Previous Benefits tab.",
            position: 'top',
            requiresInteraction : true
          },
          {
            element: "#tab-content",
            intro: "All the historic rewards tracker related data is available here",
            position: 'top'

          },
          {
            element: document.querySelectorAll('[data-tab-name="rewardsHistory"]')[0],
            intro: "Rewards Earned each statement can be viewed under this tab. Click on the tab. Then click next to proceed",
            position: 'top',
            requiresInteraction : true
          },
          {
            element: "#tab-content",
            intro: "Here is Your Rewards Earning History for every statement period.",
            position: 'top'
          }
		]
	} 
}
return tourSteps;
}