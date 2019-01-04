function highlightMenuItem() {
	var slides = document.getElementsByClassName("navigation__item");
	for(var i = 0; i < slides.length; i++) {
	   if (slides.item(i).classList.contains('is-active')) {
		   slides.item(i).style.opacity = "1";
		   slides.item(i).style.webkitFilter  = "brightness(100%)";
	   } else {
		   slides.item(i).style.opacity = "0.75";
		   slides.item(i).style.webkitFilter  = "brightness(100%)";
	   }
	}
	
	var numberItems = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
	for(var i = 0; i < numberItems; i++) {
		var item = slides[Math.floor(Math.random()*slides.length)];
		item.style.opacity = "1";
		item.style.webkitFilter  = "brightness(110%)";
	}
}

highlightMenuItem();
(function loop() {
    setTimeout(function() {
            highlightMenuItem();
            loop();  
    }, 4000);
}());

var videlem = document.createElement("video");
videlem.loop = true;
videlem.muted = true;
videlem.autoplay = true;
videlem.id = "video-background";
var sourceMP4 = document.createElement("source"); 
sourceMP4.type = "video/mp4";
sourceMP4.src = chrome.extension.getURL('background.mp4');
videlem.appendChild(sourceMP4);

var audioButton = document.createElement("button"); 
audioButton.classList.add("audio-button");

chrome.runtime.sendMessage({action: "isPlaying"}, function(response) {
	if (response.isPlaying) {
		audioButton.classList.add("playing");
	}
});

audioButton.onclick = function() {
	if (audioButton.classList.contains("playing")) {
		chrome.runtime.sendMessage({action: "pause"}, function(response) {});
		audioButton.classList.remove("playing");
	} else {
		chrome.runtime.sendMessage({action: "play"}, function(response) {});
		audioButton.classList.add("playing");
	}
}

chrome.runtime.sendMessage({action: "wasPaused"}, function(response) {
	if (!response.wasPaused) {
		chrome.runtime.sendMessage({action: "play"}, function(response) {});
		audioButton.classList.add("playing");
	}
});

document.body.insertBefore(audioButton, document.body.firstChild);
document.body.insertBefore(videlem, document.body.firstChild);