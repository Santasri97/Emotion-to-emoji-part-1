var p1 = ""
var p2 = ""

Webcam.set({
    height: 300,
    width: 350,
    image_format: "png",
    png_quality: 100
});
camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log("ml5 version : ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/vylUeC443/model.json", santa);

function santa() {
    console.log("Model is loaded");
}

function speak() {
    var v1 = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + p1;
    speak_data_2 = "And the second prediction is " + p2;
    var v2 = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    v1.speak(v2);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotresult);
}
function gotresult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        p1 = results[0].label;
        p2 = results[1].label;
        speak();

        if (results[0].label == "happy") {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }
        if (results[0].label == "sad") {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if (results[0].label == "angry") {
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }

        if (results[1].label == "happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }
        if (results[1].label == "sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if (results[1].label == "angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }
    }
}