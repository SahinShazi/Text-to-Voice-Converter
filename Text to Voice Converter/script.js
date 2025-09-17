// Speech Synthesis Setup
const speech = new SpeechSynthesisUtterance();
let voices = [];
const voiceSelect = document.getElementById("voiceSelect");
const textInput = document.getElementById("textInput");

// Set initial values
speech.rate = 1;
speech.pitch = 1;
speech.volume = 1;

// Get available voices
function loadVoices() {
  voices = window.speechSynthesis.getVoices();
  voiceSelect.innerHTML = '';
  
  // Add voices to select dropdown
  voices.forEach((voice, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
  
  // Set a default voice
  if (voices.length > 0) {
    speech.voice = voices[0];
  }
}

// Load voices when they are ready
window.speechSynthesis.onvoiceschanged = loadVoices;
loadVoices(); // Initial load

// Event Listeners
voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

document.getElementById("playButton").addEventListener("click", () => {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  
  speech.text = textInput.value;
  if (speech.text.trim() !== '') {
    window.speechSynthesis.speak(speech);
  } else {
    alert('Please enter some text to convert to speech.');
  }
});

document.getElementById("pauseButton").addEventListener("click", () => {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.pause();
  }
});


// Settings Sliders
const rateSlider = document.getElementById("rateSlider");
const rateValue = document.getElementById("rateValue");
const pitchSlider = document.getElementById("pitchSlider");
const pitchValue = document.getElementById("pitchValue");
const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");

rateSlider.addEventListener("input", () => {
  speech.rate = parseFloat(rateSlider.value);
  rateValue.textContent = rateSlider.value;
});

pitchSlider.addEventListener("input", () => {
  speech.pitch = parseFloat(pitchSlider.value);
  pitchValue.textContent = pitchSlider.value;
});

volumeSlider.addEventListener("input", () => {
  speech.volume = parseFloat(volumeSlider.value);
  volumeValue.textContent = volumeSlider.value;
});

// Initialize display values
rateValue.textContent = rateSlider.value;
pitchValue.textContent = pitchSlider.value;
volumeValue.textContent = volumeSlider.value;