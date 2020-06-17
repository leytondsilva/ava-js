
function ChangeImage() {
    document.getElementById('Click').src = "./img/button_on.png"
}
  
function startDictation() {
  
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
  
  //    var recognition = new webkitSpeechRecognition();
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        var recognition = new SpeechRecognition();
  
        recognition.continuous = true;
        recognition.interimResults = false;
  
        recognition.lang = "en-IN";
  //    recognition.lang = "hi-IN";
        recognition.start();
  
        recognition.onresult = function(e) {
            var query = e.results[0][0].transcript;
            document.getElementById('queryListener').innerHTML = query;
            document.getElementById('transcript_query').value = query;
            recognition.stop();
    
             //  CheckBox Button    
            var lang_model = document.getElementById('CheckBox').checked;
            document.getElementById('Language_Select').value = lang_model;
            document.forms["query_form"].submit();
        };
      
        recognition.onstart = function() {
          document.getElementById('queryListener').innerHTML = "Listening...";
          if(window.location.href == 'http://127.0.0.1:5500/' || window.location.href == 'http://192.168.1.102:8000/'){
            document.getElementById('transcript1').remove();
          }
        }
  
        recognition.onerror = function(e) {
          recognition.stop();
          speechSay('Did not hear anything','false');
          location.replace('http://127.0.0.1:5500/');
        }
  
    }
}
  
  
function speechSay(message,lange){

    const speech = new SpeechSynthesisUtterance(message);
    // Set the text and voice attributes.
    var voices = speechSynthesis.getVoices();

    if(lange=='false'){
        console.log("HERE");
        /*   speech.voice = voices[5];
        speech.lang = 'en-GB';*/
    }
    else{
        speech.voice = voices[10];
        speech.lang = 'hi-IN';
    }

    speech.volume = 2;
    speech.rate = 1;
    speech.pitch = 1;

    if(window.location.href != 'http://127.0.0.1:5500/'){
        speech.onend = function() {
            startDictation();
        }
    }

    speechSynthesis.speak(speech);
    if(speech.text == 'Goodbye'){
        location.replace('http://127.0.0.1:5500/');
    }
    else if(speech.text == 'alvida'){
        location.replace('http://127.0.0.1:5500/');
    }
}
  
    
function HomePage(){
    localStorage.setItem("counter",0);
    speechSynthesis.cancel();
    speechSay('Goodbye','false');
    location.replace('http://127.0.0.1:5500/');
}
  