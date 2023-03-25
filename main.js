status = "";
objects = [];
sound = "";
function preload(){
    sound = loadSound("alarm.wav");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status :- Detecting Object";


}
function modelLoaded(){
    console.log("Model is loaded");
    status = true;

}
function gotResult(error, results){
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(video, 0, 0, 380, 380);
   if (status != "") {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
    for ( i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status : Object detected";
        percent = floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y +15);
        noFill();
        stroke("red");
        rect(objects[i].x, objects[i].y , objects[i].width, objects[i].height);
        if (objects[i].label == "person") {
            document.getElementById("baby_detector").innerHTML = "Baby Detected";
            sound.stop();

        }
        else{
            document.getElementById("baby_detector").innerHTML = "Baby Not Detected";
            sound.play();
        }
      

     }
     if (objects.length <= 0) {
        document.getElementById("baby_detector").innerHTML = "Baby Not Detected";
        sound.play();
    }
   }
  


}