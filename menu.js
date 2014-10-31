//changes tab stuff
var currTab

document.addEventListener('DOMContentLoaded', function() {
	
	chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
		currTab = tabs[0].id;
			
		var button = document.getElementById('submit');
		var title = document.getElementById('titleform').elements['title'];
		var favicon = document.getElementById('titleform').elements['favicon'];
		var checkbox  = document.getElementById('titleform').elements['check'];

		console.log(currTab);
		chrome.runtime.sendMessage(currTab, function(response) {
			console.log(response);
			if(response){
				title.disabled = true;
				favicon.disabled = true;	
				button.innerHTML = "Remove";
			}
		});	
		var test = chrome.extension.getBackgroundPage();
		console.log(test);
		button.addEventListener("click", function(){

			title = title.value;
			favicon = favicon.value;

			if(!title.disabled){
				chrome.tabs.executeScript({code:"document.title = '" + title +"'"});
				
				chrome.tabs.executeScript({code:"console.log('hello'); var target = document.getElementsByTagName('title')[0]; console.log('hello'); var observer = new window.WebKitMutationObserver(function(mutations) {document.title='" + title + "'; console.log('changed title'); }); console.log('got here'); var config = {attributes:true, childList: true, characterData: true, subtree: true}; observer.observe(target, config);"});	

				chrome.tabs.executeScript({code:"var link = document.createElement('link'); link.type = 'image/x-icon'; link.rel = 'shortcut icon'; link.href = '" + favicon + "'; document.getElementsByTagName('head')[0].insertBefore(link ,document.getElementsByTagName('head')[0].firstChild);"});
			}
			if(checkbox.checked){
				chrome.runtime.sendMessage({tab:currTab, title:title, favicon:favicon});
			}
		});
	});
});

