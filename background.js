function tabListener(currId){    
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
		console.log("listener activated");
		if(tabId == currId){
				console.log("if entered");
				chrome.tabs.executeScript(tabId, {code:"console.log('test');"}, function() {
        	if (chrome.runtime.lastError) {
            		console.error(chrome.runtime.lastError.message);
       		 }
 	   	});
		}	
	});
}

chrome.runtime.onMessage.addListener(function(message){
	tabListener(message);
	console.log("message recieved");
});
