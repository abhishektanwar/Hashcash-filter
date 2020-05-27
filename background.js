chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.create({url: 'index.html'});
});
chrome.browserAction.onClicked.addListener(buttonClicked);
var currentURL;
function buttonClicked(tab){
	console.log(tab);
	// chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, 
	// function(tabs){
	// 	getCurrentURL(tabs[0].url);
	// });
	chrome.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			console.log('Tab ID: ', tab.id , tab.url);
		});
	});
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.message === "mailsentapplylabel"){
		console.log(request.useremail);
		var currentUserToken = getTokenDetails(request.useremail);
		console.log(currentUserToken);

		var gapiRequestInboxMessagesAndToken = "https://www.googleapis.com/gmail/v1/users/"+request.useremail+"/messages?q=in%3Asent&access_token=" + JSON.parse(currentUserToken).access_token + "&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI" ;
		console.log(gapiRequestInboxMessagesAndToken);
		var sentMessageResponse = getSentMessage(gapiRequestInboxMessagesAndToken);
		console.log(sentMessageResponse);
		var sentMessageReceivedObject = JSON.parse(sentMessageResponse);
		console.log(sentMessageReceivedObject);
		console.log(sentMessageReceivedObject.messages[0].id);
		var msgID=sentMessageReceivedObject.messages[0].id;

		var getMessageGapiURL="https://www.googleapis.com/gmail/v1/users/"+request.useremail+"/messages/"+msgID+"?access_token=" + JSON.parse(currentUserToken).access_token + "&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI" ;
		var getMessageGapiURLresponse = getMessageusingID(getMessageGapiURL);
		console.log(getMessageGapiURLresponse);
		var getMessageGapiURLresponseObject = JSON.parse(getMessageGapiURLresponse)
		var rfc_msgID = getMessageGapiURLresponseObject.payload.headers[2].value;
		var receiver_email_address = getMessageGapiURLresponseObject.payload.headers[5].value
		console.log(rfc_msgID,receiver_email_address);
		var tyu="https://www.googleapis.com/gmail/v1/users/abhishektanwar284@gmail.com/messages?q=rfc822msgid%3Acam72bzxpxjlt-7q-whnub%3D_%3Dfvqoufochr1bgsdxdacbvjwd9g%40mail.gmail.com&access_token=ya29.a0AfH6SMAav0W87OXoH5z7vZzLe6MZLR76utgRHDWQD7O7FIMXHLHoErs0prpj1sGRT6TCPOy-GsGFGAEunP7YVnox5N3Qa3OP2fn9lJ2qTtu_YwllGkXg5PPtS_qtQmlJqB5qna2Yi_fq9rTA6n_8ff9fOcKjDzFKvyk&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI";
		var ress = getMessageusingID(tyu);
		console.log(ress);
	
	}
});
function getMessageusingID(gapiRequestURL){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", gapiRequestURL, false );
	xmlHttp.send( null );
	return xmlHttp.responseText;
}

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
console.log("g");
window.onload = function(){
	chrome.tabs.query({ currentWindow: true }, function (tabs) {
		tabs.forEach(function (tab) {
			console.log('Tab ID: ', tab.id ,tab.url);
		});
	});
}


function getCurrentURL(tab){
	currentURL = tab;
}

// https://www.googleapis.com/gmail/v1/users/+abhishektanwar284@gmail.com+"/messages?q=rfc822msgid%3Acam72bzxpxjlt-7q-whnub%3D_%3Dfvqoufochr1bgsdxdacbvjwd9g%40mail.gmail.com&access_token=ya29.a0AfH6SMCpG5ckl0hhNru7tCh_bR7xNUn3vwK2X0NR2GZblzceLsMXLeLK6_FwwZoU9hnnLHLn6TcVyiAGvxWdiDQxTcMje9BI9qVCCIJfCtwWLUPT13l1vuI17T-zYl-3ZXmG-xvJJmX5Jg1cWVrpn-6Up5wiUKTdfwo&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI


// GET https://www.googleapis.com/gmail/v1/users/me/messages?q=rfc822msgid%3Acam72bzxpxjlt-7q-whnub%3D_%3Dfvqoufochr1bgsdxdacbvjwd9g%40mail.gmail.com&key=[YOUR_API_KEY] HTTP/1.1


// working : https://www.googleapis.com/gmail/v1/users/abhishektanwar284@gmail.com/messages?q=rfc822msgid%3Acam72bzxpxjlt-7q-whnub%3D_%3Dfvqoufochr1bgsdxdacbvjwd9g%40mail.gmail.com&access_token=ya29.a0AfH6SMAav0W87OXoH5z7vZzLe6MZLR76utgRHDWQD7O7FIMXHLHoErs0prpj1sGRT6TCPOy-GsGFGAEunP7YVnox5N3Qa3OP2fn9lJ2qTtu_YwllGkXg5PPtS_qtQmlJqB5qna2Yi_fq9rTA6n_8ff9fOcKjDzFKvyk&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI