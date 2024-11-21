// Query the active tab in the current window
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	// Ensure the active tab has a valid URL
	const tab = tabs[0];
	if (!tab || !tab.url) {
		document.body.innerHTML = "<p>Unable to retrieve the current tab URL.</p>";
		return;
	}

	// Extract the URL from the active tab
	let tabUrl = tab.url;

	// Function to replace ".com" with ".local" and force "http://"
	const toLocal = (url: string): string => {
		return url.replace(".com", ".local").replace("https://", "http://");
	};

	// Function to replace ".local" with ".com" and force "https://"
	const toCom = (url: string): string => {
		return url.replace(".local", ".com").replace("http://", "https://");
	};

	// Determine the appropriate transformation
	let updatedUrl: string;
	if (tabUrl.includes(".com")) {
		updatedUrl = toLocal(tabUrl);
	} else if (tabUrl.includes(".local")) {
		updatedUrl = toCom(tabUrl);
	} else {
		// Show a message for unsupported URLs
		document.body.innerHTML = "<p>URL does not contain '.com' or '.local'.</p>";
		return;
	}

	// Update the active tab with the transformed URL
	chrome.tabs.update({ url: updatedUrl });
});
