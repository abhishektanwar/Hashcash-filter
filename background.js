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