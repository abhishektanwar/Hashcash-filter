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

window.onload = function(){
	document.querySelector('button').addEventListener('click', function() {
		chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
			chromeIdentityToken = token;
		});
		var gapiRequestInboxMessagesAndToken = "https://www.googleapis.com/gmail/v1/users/me/messages?q=-label%3ASENT+in%3AINBOX&access_token=" + chromeIdentityToken ;
		var gapiGETRequest = function (gapiRequestURL)
            {
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open( "GET", gapiRequestURL, false );
                xmlHttp.send( null );
                return xmlHttp.responseText;
			}
		var allMessagesReceived = gapiGETRequest(gapiRequestInboxMessagesAndToken);
		var allMessagesObject = JSON.parse(allMessagesReceived)
          var messageIds = [];
          var threadAndMessageIdsAlreadyUsed = {} // ThreadId = key, MessageId = value
          var getIdsOfMessages = function(responseObject){
            for(var i=0; i < responseObject.messages.length; i ++) {
            // for(var i=0; i < 54; i ++) {
              if (!threadAndMessageIdsAlreadyUsed.hasOwnProperty(responseObject.messages[i].threadId)){
                threadAndMessageIdsAlreadyUsed[responseObject.messages[i].threadId] = responseObject.messages[i].id
                messageIds.push(responseObject.messages[i].id)
              }
            }
          }

          var messageContentsArr = [];
          var gapiRequestMessageWithId = "";
          var getMessageContents = function(messageIdList)
          {
            for(var i=0; i < messageIdList.length; i++)
            {
              gapiRequestMessageWithId = "https://www.googleapis.com/gmail/v1/users/me/messages/" + messageIdList[i] + "?access_token=" + chromeIdentityToken
              var currentMessage = JSON.parse(gapiGETRequest(gapiRequestMessageWithId))
              // var encodedMessageContents = currentMessage.payload.parts[0].body.data
              // var decodedMessageContents = atob(encodedMessageContents.replace(/-/g, '+').replace(/_/g, '/'));
              // messageContentsArr.push(decodedMessageContents)
              messageContentsArr.push(currentMessage)
            }
          }
		  console.log(allMessagesReceived);
        //   getIdsOfMessages(allMessagesObject);
		//   getMessageContents(messageIds);
		  console.log("end");
		//   console.log(messageIds);
	});
}