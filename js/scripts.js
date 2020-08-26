function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './Intents.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(JSON.parse(xobj.responseText));
      }
    };
    xobj.send(null);  
  }

var intents = loadJSON(function(json) {
    return json; // this will log out the json object
});
console.log(intents);

function ChangeImage() {
    document.getElementById('Click').src = "./img/button_on.png"
}

function LangChange() {
    var checkBox = document.getElementById("LangBtn");
    if (checkBox.checked == true){
        document.getElementById("LangBtn").value = "Hindi";
    }
    else {
        document.getElementById("LangBtn").value = "English";
    }
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
            var lang_model = document.getElementById('LangBtn').value;
            //document.getElementById('Language_Select').value = lang_model;
            //document.forms["query_form"].submit();
        };
      
        recognition.onstart = function() {
          document.getElementById('queryListener').innerHTML = "Listening...";
          if(window.location.href == 'http://127.0.0.1:5500/#' || window.location.href == 'https://leytondsilva.github.io/ava-js/'){
            document.getElementById('transcript1').remove();
          }
        }
  
        recognition.onerror = function(e) {
          recognition.stop();
          speechSay('Did not hear anything','false');
          location.replace('#');
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

    if(window.location.href != '12'){
        speech.onend = function() {
            startDictation();
        }
    }

    speechSynthesis.speak(speech);
    if(speech.text == 'Goodbye' || speech.text == 'alvida'){
        location.replace('#');
    }
}
  
    
function HomePage(){
    sessionStorage.setItem("counter",0);
    speechSynthesis.cancel();
    speechSay('Goodbye','false');
    location.reload();
}
/*
function aide(){
    import nltk
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()

import numpy
import tflearn
import tensorflow
import random
import json
import pickle
import datetime

import os


#naturalLanguageProcessing

with open("aide_ai\intents.json") as file:
    data = json.load(file)

with open("aide_ai\data.pickle", "rb") as f:
    words, labels, training, output = pickle.load(f)

with open("aide_ai\intents_hindi.json") as file:
    data_hindi = json.load(file)

with open("aide_ai\data_hindi.pickle", "rb") as f:
    words_hindi, labels_hindi, training_hindi, output_hindi = pickle.load(f)

#neural net for english
tensorflow.reset_default_graph()

net = tflearn.input_data(shape=[None, len(training[0])])
net = tflearn.fully_connected(net, 80)
net = tflearn.fully_connected(net, 80)
net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
net = tflearn.regression(net)

model = tflearn.DNN(net)
model.load("aide_ai\model.tflearn")

#neural net for hindi
tensorflow.reset_default_graph()

net = tflearn.input_data(shape=[None, len(training_hindi[0])])
net = tflearn.fully_connected(net, 80)
net = tflearn.fully_connected(net, 80)
net = tflearn.fully_connected(net, len(output_hindi[0]), activation="softmax")
net = tflearn.regression(net)

model_hindi = tflearn.DNN(net)
model_hindi.load("aide_ai\model_hindi.tflearn")

def bag_of_words(s, words):
    bag = [0 for _ in range(len(words))]

    s_words = nltk.word_tokenize(s)
    
    s_words = [stemmer.stem(w.lower()) for w in s_words if w != "?" and w != "!"]

    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1
            
    return numpy.array(bag)

def chat(asr_obj,lang_choice):
    #print("Start talking with the bot (type quit to stop)!")
    #while True:
    #inp = input("You: ")
    inp = asr_obj

    if lang_choice=='false':
        results = model.predict([bag_of_words(inp, words)])[0]
        results_index = numpy.argmax(results)
        tag = labels[results_index]
        print("tag :",tag)
        print("results_index : ",results_index)

        if results[results_index] > 0.7:
            if tag=='ctime' :
                now = datetime.datetime.now()
                return(now.strftime("%H:%M:%S"))
            else:
                for tg in data["intents"]:
                    if tg['tag'] == tag:
                        responses = tg['responses']

                text_output = random.choice(responses) # Text object to be sent for speech synthesis
            #   print(text_output)
                return(text_output)
        else:
    #        print("Sorry, I didn't get that.")
            return("Sorry, I did not get that.")
        
    elif lang_choice=='true':
        results = model_hindi.predict([bag_of_words(inp, words_hindi)])[0]
#    if inp.lower() == "quit":
#       break
        results_index = numpy.argmax(results)
        tag = labels_hindi[results_index]
        print("tag :",tag)
        print("results_index : ",results_index)

        if results[results_index] > 0.7:
            if tag=='ctime' :
                now = datetime.datetime.now()
                return(now.strftime("%H:%M:%S"))
            else:
                for tg in data_hindi["intents"]:
                    if tg['tag'] == tag:
                        responses = tg['responses']

                text_output = responses[Math.floor(Math.random() * arr.length)];  # Text object to be sent for speech synthesis
            #   print(text_output)
                return(text_output)
        else:
            print("Sorry, I didn't get that.")
            return("maaf keejiye, mujhe samajh nahi aya.")
}*/