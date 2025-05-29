// TEXT TO SPEECH (script.js)

let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

// Load available voices
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];
  voices.forEach((voice, i) => {
    voiceSelect.options[i] = new Option(voice.name, i);
  });
};

// Change voice when selected
voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

// Speak the input text
document.getElementById("listen").addEventListener("click", () => {
  speech.text = document.querySelector(".textw").value;
  window.speechSynthesis.speak(speech);
});
