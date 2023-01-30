var prediction1 = "";
var prediction2 = "";
Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src="'+data_uri+'"/>';
    }); 
}

console.log('ml5 version', ml5.version);

Classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xtETTH3LW/model.json', model_loaded);
function model_loaded(){
    console.log('model is loaded');
}
function speak(){
    var synth = window.speechSynthesis;
    sentence1 = "the first prediction is "+ prediction1;
    sentence2 = "the second prediction is "+ prediction2;
    var utterThis = new SpeechSynthesisUtterance(sentence1+sentence2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    Classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
} else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;
    prediction1 = results[0].label;
    prediction2 = results[1].label;
    speak();
    if(results[0].label == "Victory")
{
   document.getElementById("update_emoji").innerHTML = "&#9996;";
}
if(results[0].label == "Good Luck")
{
    document.getElementById("update_emoji").innerHTML = "&#128077;";
}
if(results[0].label == "Amazing")
{
    document.getElementById("update_emoji"),innerHTML = "&#128076;";
}

if(results[1].label == "Victory")
{
   document.getElementById("update_emoji2").innerHTML = "&#9996;";
}
if(results[1].label == "Good Luck")
{
    document.getElementById("update_emoji2").innerHTML = "&#128077;";
}
if(results[1].label == "Amazing")
{
    document.getElementById("update_emoji2"),innerHTML = "&#128076;";
}
}
}