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
		var currentUserAccessToken = JSON.parse(currentUserToken).access_token;

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
		var received_rfc_msgID = getMessageGapiURLresponseObject.payload.headers[2].value;
		var receiver_email_address = getMessageGapiURLresponseObject.payload.headers[5].value;
		console.log(received_rfc_msgID,receiver_email_address);
		var rfcmsg_IDa = received_rfc_msgID.split('<');
		var rfcmsg_IDb = rfcmsg_IDa[1].split('>');
		var rfcmsg_IDc = rfcmsg_IDb[0];
		var rfcmsg_ID = encodeURIComponent(rfcmsg_IDc)
		console.log(rfcmsg_ID);
		var getRFC822msgID="https://www.googleapis.com/gmail/v1/users/"+request.useremail+"/messages?q=rfc822msgid:"+rfcmsg_ID+"&access_token="+currentUserAccessToken+"&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI";
		// var id="abhishektanwar184@gmail.com";
		
		var rf="CAM72BzV4dG%2Bm0c5ps0qJkDP7jvHz9yCiw8Nn_VNJ_j49Grifyg%40mail.gmail.com";
		var id=receiver_email_address;
		console.log(typeof rfcmsg_ID,typeof rf);
		// var rf=rfcmsg_ID;
		// var getRFC822msgID="https://www.googleapis.com/gmail/v1/users/"+id+"/messages?q=rfc822msgid:"+rf+"&access_token=ya29.a0AfH6SMCSJw0DFlEXqfOowHO1dkiC_HNGbwjF20mX7F-tJMnklXbejdXuM6iyfSr0nK4BTfUIEkxWBHNaOIzZKbZEiWUI9sZSs7oMfm71J6OgG2KkiNh5_GTLv_uFpz2uz2CebARQiIT3PtdRiWVYzXxm5mkRZm_8o3A&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI";
		console.log(getRFC822msgID);
		var msgIDfromRFC822 = getMessageusingID(getRFC822msgID);
		console.log(msgIDfromRFC822);
		var targetLabelmsgID=JSON.parse(msgIDfromRFC822).messages[0].id;
		console.log("avad 34sff",targetLabelmsgID);
		console.log("part2");
		
		setTimeout(function(){
			// console.log("hello");
			// var targetLabelUserTokens = getTokenDetails(receiver_email_address);
			// console.log("targetLabelUserTokens",targetLabelUserTokens);
			// var targetLabelUserAccessToken = JSON.parse(targetLabelUserTokens).access_token;
			// console.log("targetLabelUserAccessToken",targetLabelUserAccessToken);
			// var targetuserLabelIDURL = "https://hashcash3api.herokuapp.com/detaillabelid/"+receiver_email_address;
			// var targetuserLabelIDresponse = getSentMessage(targetuserLabelIDURL);
			// console.log("targetuserLabelIDresponse",targetuserLabelIDresponse);
			// var targetUserLabelID = JSON.parse(targetuserLabelIDresponse).label_id;
			// console.log("targetUserLabelID",targetUserLabelID);
			// console.log(rfcmsg_ID);
			// // var getRFC822msgIDa="https://www.googleapis.com/gmail/v1/users/"+String(receiver_email_address)+"/messages?q=rfc822msgid:"+String(rfcmsg_ID)+"&access_token="+String(targetLabelUserAccessToken)+"&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI";
			// var getRFC822msgIDa="https://www.googleapis.com/gmail/v1/users/"+id+"/messages?q=rfc822msgid:"+rfcmsg_ID+"&access_token="+targetLabelUserAccessToken+"&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI";
			// console.log(getRFC822msgIDa);
			// var msgIDfromRFC822a = getMessageusingID(getRFC822msgIDa);
			// console.log(msgIDfromRFC822a);
			// setTimeout(5000);
			// var targetLabelmsgIDa=JSON.parse(msgIDfromRFC822a).messages[0].id;
			// console.log(targetLabelmsgIDa);
			applyLabel(rfcmsg_ID,receiver_email_address);
		}, 60000);
		

		// applyLabel(rfcmsg_ID,receiver_email_address);
	
	}
});

function applyLabel(rfcmsg_ID,applylabeltargetemailUserID){
	console.log(rfcmsg_ID,applylabeltargetemailUserID);
	var targetLabelUserTokens = getTokenDetails(applylabeltargetemailUserID);
	console.log("targetLabelUserTokens",targetLabelUserTokens);
	var targetLabelUserAccessToken = JSON.parse(targetLabelUserTokens).access_token;
	console.log("targetLabelUserAccessToken",targetLabelUserAccessToken);
	var targetuserLabelIDURL = "https://hashcash3api.herokuapp.com/detaillabelid/"+applylabeltargetemailUserID;
	var targetuserLabelIDresponse = getSentMessage(targetuserLabelIDURL);
	console.log("targetuserLabelIDresponse",targetuserLabelIDresponse);
	var targetUserLabelID = JSON.parse(targetuserLabelIDresponse).label_id;
	console.log("targetUserLabelID",targetUserLabelID);
	console.log(rfcmsg_ID);
	var getRFC822msgIDa="https://www.googleapis.com/gmail/v1/users/"+applylabeltargetemailUserID+"/messages?q=rfc822msgid:"+rfcmsg_ID+"&access_token="+targetLabelUserAccessToken+"&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI";
	console.log(getRFC822msgIDa);
	var msgIDfromRFC822a = getMessageusingID(getRFC822msgIDa);
	console.log(msgIDfromRFC822a);
	var targetLabelmsgIDa=JSON.parse(msgIDfromRFC822a).messages[0].id;
	console.log(targetLabelmsgIDa);
	console.log(targetLabelmsgIDa,applylabeltargetemailUserID);
	

	var applyLabelURL = "https://www.googleapis.com/gmail/v1/users/"+applylabeltargetemailUserID+"/messages/"+targetLabelmsgIDa+"/modify?access_token="+targetLabelUserAccessToken+"&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI";
	var applyLabelresponse=applyLabelpost(applyLabelURL,targetUserLabelID);
	console.log(applyLabelresponse);
	
}
function applyLabelpost(applyLabelURL,targetUserLabelID){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "POST", applyLabelURL, false );
	xmlHttp.setRequestHeader("Content-Type", "application/json");
	xmlHttp.send(JSON.stringify({
		"addLabelIds": [
			targetUserLabelID
		]
	}));
	return xmlHttp.responseText;

// 	var xmlHttp = new XMLHttpRequest();
//   xmlHttp.open( "GET", url, false );
//   xmlHttp.setRequestHeader("Content-Type", "application/json");
//   xmlHttp.send(JSON.stringify({"resource": {
//     "labelListVisibility": "labelShow",
//     "messageListVisibility": "show",
//     "name": "labelTEST"
//   }}));
}
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



// var tyu="https://www.googleapis.com/gmail/v1/users/abhishektanwar284@gmail.com/messages?q=rfc822msgid:CAM72BzURwUD1Dmbw2XKRiG8gvFcdfva9bEFvYqbpncfG-d1F=w@mail.gmail.com&access_token=ya29.a0AfH6SMDYBy409Xx4PmEYZ_HQoY1wgn32mJEq2HcSllLSGZUkRrrctjAOSzbuNBv5lKZ_kpauxVO8pbvqm2H-CVsmb0je9EfpOspQ8QiXLzqGgQxCf-jamJPUDvui3tZbmg6XTLr2Ut3CJCcQsFCOXURnL0003lB9U5o&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI";