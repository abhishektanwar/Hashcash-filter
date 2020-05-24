// window.onload = function() {
//     document.querySelector('button').addEventListener('click', function() {
//       chrome.identity.getAuthToken({interactive: true}, function(token) {
//         let init = {
//           method: 'GET',
//           async: true,
//           headers: {
//             Authorization: 'Bearer ' + token,
//             'Content-Type': 'application/json'
//           },
//           'contentType': 'json'
//         };
//         fetch(
//             'https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI',
//             init)
//             .then((response) => response.json())
//             .then(function(data) {
//               let photoDiv = document.querySelector('#friendDiv');
//               let returnedContacts = data.memberResourceNames;
//               for (let i = 0; i < returnedContacts.length; i++) {
//                 fetch(
//                     'https://people.googleapis.com/v1/' + returnedContacts[i] +
//                         '?personFields=photos&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI',
//                     init)
//                     .then((response) => response.json())
//                     .then(function(data) {
//                       let profileImg = document.createElement('img');
//                       profileImg.src = data.photos[0].url;
//                       photoDiv.appendChild(profileImg);
//                     });
//               };
//             });
//       });
//     });
//   };



// asgasglnjasfhasnf5461


// window.onload = function() {
//     document.querySelector('button').addEventListener('click', function() {
//       chrome.identity.getAuthToken({interactive: true}, function(token) {
//         let init = {
//           method: 'GET',
//           async: true,
//           headers: {
//             Authorization: 'Bearer ' + token,
//             'Content-Type': 'application/json'
//           },
//           'contentType': 'json'
// 		};
// 		console.log(token);
//         fetch(
//             'https://www.googleapis.com/gmail/v1/users/me/messages?q=access_token='+token,
// 			init)
			
//             .then((response) => response.json())
//             .then(function(data) {
// 			  console.log(data);
//             //   let photoDiv = document.querySelector('#friendDiv');
//             //   let returnedContacts = data.memberResourceNames;
//             //   for (let i = 0; i < returnedContacts.length; i++) {
//             //     fetch(
//             //         'https://people.googleapis.com/v1/' + returnedContacts[i] +
//             //             '?personFields=photos&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI',
//             //         init)
//             //         .then((response) => response.json())
//             //         .then(function(data) {
//             //           let profileImg = document.createElement('img');
//             //           profileImg.src = data.photos[0].url;
//             //           photoDiv.appendChild(profileImg);
//             //         });
//             //   };
//             });
//       });
//     });
//   };

// window.onload = function(){
// 	document.querySelector('button').addEventListener('click', function() {
// 		chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
// 	  chromeIdentityToken = token;
// 	  console.log(chromeIdentityToken);
//     });
// 	var api_url="https://accounts.google.com/o/oauth2/v2/auth?client_id=732151024970-ol1c9u6dt52nc7j7ufa8f23ejvg23lnf.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/gmail.send&redirect_uri=http://localhost&access_type=offline";
//     // var api_url="https://apis.google.com/js/api.js";
//     // var gapiRequestInboxMessagesAndToken = "https://www.googleapis.com/gmail/v1/users/me/messages?q=in%3Asent&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI" ;
//     var gapiRequestInboxMessagesAndToken = "https://www.googleapis.com/gmail/v1/users/me/messages?q=in%3Asent&access_token=" + chromeIdentityToken + "&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI" ;

//     var gapiGETRequest = function (gapiRequestURL)
//             {
//                 var xmlHttp = new XMLHttpRequest();
//                 xmlHttp.open( "GET", gapiRequestURL, false );
//                 xmlHttp.send( null );
//                 return xmlHttp.responseText;
//       }
//       function getGlobarMsgID(idd){
//         var messageBodyURL = "https://www.googleapis.com/gmail/v1/users/me/messages/"+idd+"?access_token=" + chromeIdentityToken + "&key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI" ;
//         var messagebody_res = gapiGETRequest(messageBodyURL);
//         // setTimeout(10);
//         var t = JSON.parse(messagebody_res);
//         console.log("t");
//         console.log(t.payload.headers[2].value);
//         console.log(messagebody_res);
//         // getJson()
			
			
//       }
//     var api_res = gapiGETRequest(api_url);
// 		var allMessagesReceived = gapiGETRequest(gapiRequestInboxMessagesAndToken);
// 		var allMessagesObject = JSON.parse(allMessagesReceived)
//           var messageIds = [];
//           var threadAndMessageIdsAlreadyUsed = {} // ThreadId = key, MessageId = value
//           var getIdsOfMessages = function(responseObject){
//             for(var i=0; i < responseObject.messages.length; i ++) {
//             // for(var i=0; i < 54; i ++) {
//               if (!threadAndMessageIdsAlreadyUsed.hasOwnProperty(responseObject.messages[i].threadId)){
//                 threadAndMessageIdsAlreadyUsed[responseObject.messages[i].threadId] = responseObject.messages[i].id
//                 messageIds.push(responseObject.messages[i].id)
//               }
//             }
//           }

					

					
					
//           /* here are some utility functions for making common gmail requests */

//           var messageContentsArr = [];
//           var gapiRequestMessageWithId = "";
//           var getMessageContents = function(messageIdList)
//           {
//             for(var i=0; i < messageIdList.length; i++)
//             {
//               gapiRequestMessageWithId = "https://www.googleapis.com/gmail/v1/users/me/messages/" + messageIdList[i] + "?access_token=" + chromeIdentityToken
//               var currentMessage = JSON.parse(gapiGETRequest(gapiRequestMessageWithId))
//               // var encodedMessageContents = currentMessage.payload.parts[0].body.data
//               // var decodedMessageContents = atob(encodedMessageContents.replace(/-/g, '+').replace(/_/g, '/'));
//               // messageContentsArr.push(decodedMessageContents)
//               messageContentsArr.push(currentMessage)
//             }
//           }
//       console.log(chromeIdentityToken);
//       console.log(api_res);
//       console.log(allMessagesReceived);
//       console.log("ASasg");
//       console.log(allMessagesObject);
//       test();
//       console.log(allMessagesObject.messages[0].id);
//       getGlobarMsgID(allMessagesObject.messages[0].id);
//       createLabel();
			
//         //   getIdsOfMessages(allMessagesObject);
// 		//   getMessageContents(messageIds);
// 		  console.log("end");
// 		//   console.log(messageIds);
// 	});
// }

// function test(){
//   console.log("test");
// }

// function getJson(argg){

// }

// POST https://www.googleapis.com/gmail/v1/users/[USERID]/labels?key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json
// Content-Type: application/json

// {
//   "labelListVisibility": "labelShow",
//   "messageListVisibility": "show",
//   "name": "labelTEST"
// }
// var url = "https://www.googleapis.com/gmail/v1/users/me/labels?key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI";
// function createLabel(){

//   var xmlHttp = new XMLHttpRequest();
//   xmlHttp.open( "GET", url, false );
//   xmlHttp.setRequestHeader("Content-Type", "application/json");
//   xmlHttp.send(JSON.stringify({"resource": {
//     "labelListVisibility": "labelShow",
//     "messageListVisibility": "show",
//     "name": "labelTEST"
//   }}));
//   return xmlHttp.responseText;
// 	fetch(url, {
// 	  method: 'post',
// 	  headers: {
// 	    "Content-type": "application/json"
// 	  },
// 	  "resource": {
// 	    "labelListVisibility": "labelShow",
// 	    "messageListVisibility": "show",
// 	    "name": "labelTEST"
// 	  }
// 	})
// 	// .then(json)
// 	.then(function (dataa) {
// 	  console.log('Request succeeded with JSON response', dataa);
// 	})
// 	.catch(function (error) {
// 	  console.log('Request failed', error);
// 	});

// }


// curl --request POST \
//   'https://www.googleapis.com/gmail/v1/users/testhashcash@gmail.com/labels?key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI' \
//   --header 'Authorization: Bearer ya29.a0AfH6SMAKUmLBikSo6HkfCUUtLWp0QNEPn358Hq4nWcW69n8NYgu5U6d17UiarRObBj-1wASXkoeBjvd_FlOry34hLY7qt2chyC-kIBouF2Z2qiGG0tHp2Knb4WywLYdatbhXVPPO-hfhAJ7qp68zDBdPOlhYw8IrkJcg' \
//   --header 'Accept: application/json' \
//   --header 'Content-Type: application/json' \
//   --data '{"labelListVisibility":"labelShow","messageListVisibility":"show","name":"labelTESTas"}' \
//   --compressed

//   curl --request POST https://www.googleapis.com/gmail/v1/users/[USERID]/labels?key=AIzaSyBroHCLfOPUZEEbmUXpE3qWsOmC6dEteNI HTTP/1.1

// Authorization: Bearer ya29.a0AfH6SMAKUmLBikSo6HkfCUUtLWp0QNEPn358Hq4nWcW69n8NYgu5U6d17UiarRObBj-1wASXkoeBjvd_FlOry34hLY7qt2chyC-kIBouF2Z2qiGG0tHp2Knb4WywLYdatbhXVPPO-hfhAJ7qp68zDBdPOlhYw8IrkJcg
// Accept: application/json
// Content-Type: application/json

// {
//   "labelListVisibility": "labelShow",
//   "messageListVisibility": "show",
//   "name": "315132as"
// }

window.onload = function(){
	document.querySelector('button').addEventListener('click',function(){

	})

	var url="https://accounts.google.com/o/oauth2/v2/auth?client_id=732151024970-ol1c9u6dt52nc7j7ufa8f23ejvg23lnf.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/gmail.send&redirect_uri=http://localhost&access_type=offline";
	var gapiGETRequest = function (gapiRequestURL)
		{
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.open( "GET", gapiRequestURL, false );

			xmlHttp.send( null );
			return xmlHttp.responseText;
	}
	var tab_length;
	var res = gapiGETRequest(url);
	var authorization_url;
	var auth_code_parameter_url;
	var code_param;
	function handleUpdated(tabId, changeInfo, tab) {
		
		if (changeInfo.status == 'complete' && tab.status == 'complete' && tab.url != undefined && tab.id == tab_length.id){
			console.log("Updated tab: " + tabId);
			console.log("Changed attributes: ");
			console.log(changeInfo);
			console.log("New tab Info: ");
			console.log(tab);
			authorization_url = tab.url;
			console.log(authorization_url);
			console.log("asfasgag",tab.id,tab_length.id);
			var split_authurl = authorization_url.split('?');
			auth_code_parameter_url = "?"+split_authurl[1];
			var urlParams = new URLSearchParams(auth_code_parameter_url);
			code_param = urlParams.get('code');
			console.log(code_param);
		}
		if(code_param!=undefined){
			var ress = gapiPOSTRequest(post_authtoken);
			console.log(ress);
		}
		
	}
	var post_authtoken="https://www.googleapis.com/oauth2/v4/token";
	var gapiPOSTRequest = function (gapiRequestURL)
		{
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.open( "POST", gapiRequestURL, false );
			xmlHttp.setRequestHeader("Content-Type", "application/json");
			var body = "code="+code_param+"&client-id=732151024970-ol1c9u6dt52nc7j7ufa8f23ejvg23lnf.apps.googleusercontent.com&client_secret=UvqOfM7hi3CUoWgvCumI8I10&grant_type=authorization_code&redirect_uri=http://localhost";
			xmlHttp.onload = function() {
				console.log('Signed in as: ' + xmlHttp.responseText);
				console.log(body);
			};
			xmlHttp.send(JSON.stringify({
				"code":code_param,
				"client_id":"732151024970-ol1c9u6dt52nc7j7ufa8f23ejvg23lnf.apps.googleusercontent.com",
				"client_secret":"UvqOfM7hi3CUoWgvCumI8I10",
				"grant_type":"authorization_code",
				"redirect_uri":"http://localhost"
			}));
			return xmlHttp.responseText;
	}
	
	chrome.tabs.onUpdated.addListener(handleUpdated);
	window.open("https://accounts.google.com/o/oauth2/v2/auth?client_id=732151024970-ol1c9u6dt52nc7j7ufa8f23ejvg23lnf.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/gmail.send&redirect_uri=http://localhost&access_type=offline");
	var uis="https://accounts.google.com/o/oauth2/v2/auth?client_id=732151024970-ol1c9u6dt52nc7j7ufa8f23ejvg23lnf.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/gmail.send&redirect_uri=http://localhost&access_type=offline";
	// var ty = gapiGETRequest(uis);
	// console.log("ty",ty);
	// console.log(window.location.href);
	chrome.tabs.query({ currentWindow: true }, function (tabs) {
		tab_length=tabs[tabs.length-1];
		console.log(tab_length);
		tabs.forEach(function (tab) {

			console.log('Tab ID: ', tab.id ,tab.url);
			
		});
		console.log("asfa",tab_length);
	});
	// chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
	// 	let urll = tabs[0].url;
	// 	console.log(urll);
	// 	// use `url` here inside the callback because it's asynchronous!
	// });
	// console.log(urll);
	console.log(res);

}