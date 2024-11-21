chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	// Ensure the URL is fully loaded
	if (changeInfo.status === "complete" && tab.url) {
		// Determine the appropriate icon based on the URL
		const isLocal = tab.url.includes(".local");
		const newIcon = isLocal ? "local-icon.png" : "production-icon.png";

		// Set the extension icon
		chrome.action.setIcon({ tabId, path: newIcon });
	}
});
