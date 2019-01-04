var audio = new Audio(chrome.extension.getURL('happiness.mp3'));
var paused = false;

chrome.runtime.onMessage.addListener(
 function(request, sender, sendResponse) {
    if (request.action == "play") {
		audio.play();
	} else if (request.action == "pause") {
		audio.pause();
		paused = true;
	} else if (request.action == "isPlaying") {
		sendResponse({isPlaying: !audio.paused});
	} else if (request.action == "wasPaused") {
		sendResponse({wasPaused: paused});
	}
});