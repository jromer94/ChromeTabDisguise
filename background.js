function tabListener(currId, title, favicon){    
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
		console.log("listener activated");
		if(tabId == currId){
			
			chrome.tabs.executeScript(tabId,{code:"document.title = '" + title +"'"});
		
			chrome.tabs.executeScript(tabId,{code:"console.log('hello'); var target = document.getElementsByTagName('title')[0]; console.log('hello'); var observer = new window.WebKitMutationObserver(function(mutations) {document.title='" + title + "'; console.log('changed title'); }); console.log('got here'); var config = {attributes:true, childList: true, characterData: true, subtree: true}; observer.observe(target, config);"});	

			chrome.tabs.executeScript(tabId, {code:"var link = document.createElement('link'); link.type = 'image/x-icon'; link.rel = 'shortcut icon'; link.href = '" + favicon + "'; document.getElementsByTagName('head')[0].insertBefore(link ,document.getElementsByTagName('head')[0].firstChild);"});
       		}
	});
}

chrome.runtime.onMessage.addListener(function(message){
	tabListener(message['tab'], message['title'], message['favicon']);
	console.log("message recieved");
});
