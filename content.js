InboxSDK.load('1', 'sdk_testesr_376df85a0e').then(function(sdk){

	// the SDK has been loaded, now do something with it!
	sdk.Compose.registerComposeViewHandler(function(composeView){

		// a compose view has come into existence, do something with it!
		composeView.addButton({
			title: "My Nifty Tifty Button!",
			iconUrl: 'https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365',
			onClick: function(event) {
				console.log(event);
				event.composeView.insertTextIntoBodyAtCursor('Hellloooo World!');
				var a=composeView.send();
				console.log(a);
				console.log("Sent");
			},
		});
		composeView.on('sent',function(event){
			console.log("message sent");
			console.log(event);
			// console.log(event.getMessageIDAsync());
			console.log(event.getMessageID());
			console.log("message sent2");
			


			// label functionality
			var currentUserEmailAddress=sdk.User.getEmailAddress();
			let msg = {
				message:"mailsentapplylabel",
				useremail:currentUserEmailAddress
			}
			chrome.runtime.sendMessage(msg);
			
			// var currentUserToken = getTokenDetails(currentUserEmailAddress);
			// console.log(currentUserToken);
			
			// var gapiRequestInboxMessagesAndToken = "https://www.googleapis.com/gmail/v1/users/me/messages?q=in%3Asent&access_token=" + chromeIdentityToken + "&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI" ;
			// var sentMessageResponse = getSentMessage(gapiRequestInboxMessagesAndToken);
			// console.log(sentMessageResponse)

		});
		composeView.on('sending',function(event){
			console.log("Sending",event);
		});
		
	});

});
function getTokenDetails(currentUserEmailAddress){
	var tokenDetailURL = "https://hashcash3api.herokuapp.com/detailAuthorizationTokens/" + currentUserEmailAddress;
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", tokenDetailURL, false );
	xmlHttp.send( null );
	return xmlHttp.responseText;
}
function getSentMessage(gapiRequestURL){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", gapiRequestURL, false );
	xmlHttp.send( null );
	return xmlHttp.responseText;
}
console.log("extension side");


