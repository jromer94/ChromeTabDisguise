//changes tab stuff
var currTab
chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
	currTab = tabs[0].id;
});

document.addEventListener('DOMContentLoaded', function() {

	var button = document.getElementById('submit');
	button.addEventListener("click", function(){

		var title = document.getElementById('titleform').elements['title'];
		title = title.value;
		var favicon = document.getElementById('titleform').elements['favicon'];
		favicon = favicon.value;
		chrome.tabs.executeScript({code:"document.title = '" + title +"'"});
		
		chrome.tabs.executeScript({code:"console.log('hello'); var target = document.getElementsByTagName('title')[0]; console.log('hello'); var observer = new window.WebKitMutationObserver(function(mutations) {document.title='" + title + "'; console.log('changed title'); }); console.log('got here'); var config = {attributes:true, childList: true, characterData: true, subtree: true}; observer.observe(target, config);"});	

		chrome.tabs.executeScript({code:"var link = document.createElement('link'); link.type = 'image/x-icon'; link.rel = 'shortcut icon'; link.href = '" + favicon + "'; document.getElementsByTagName('head')[0].insertBefore(link ,document.getElementsByTagName('head')[0].firstChild);"});
		//doesn't work right now		
		chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
			if(tabId == currTab){
				chrome.tabs.executeScript({code:"document.title = 'I crossed the browser';"});

			}
		
		});


	});
	

});

