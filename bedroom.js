img = "";
status = "";
objects = [];
function preload(){
    img = loadImage("bedroom.png");
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
}

function draw(){
    image(img, 0, 0, 640, 420);

    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_detector = ml5.objectDetector("cocossd", modelLoaded);

    if(status){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
        
            fill("red");
            text(objects[i].label + " " + floor(objects[i].confidence * 100) + "%", objects[i].x, objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("cocossd model is loaded");
    status = true;
    object_detector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);

        objects = results;
    }
}