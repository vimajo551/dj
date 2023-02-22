pdx=0;
pdy=0;
pqx=0;
pqy=0;
song = ""
gnpqy = 0;
rdeci = 0;
gspqy = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500)
    canvas.position(400, 225)
    video = createCapture(VIDEO);
    video.hide()
    posenet=ml5.poseNet(video,modelLoaded)
    posenet.on("pose",gotPoses)
}

function gotPoses(results){
    if(results.length>0){
        console.log(results)
        gspqy=results[0].pose.keypoints[9].score;
        pdx=results[0].pose.rightWrist.x
        pdy=results[0].pose.rightWrist.y
        pqx=results[0].pose.leftWrist.x
        pqy=results[0].pose.leftWrist.y
    }
}

function modelLoaded(){
    console.log("carregado")
}

function draw(){
    image(video, 0, 0, 600, 500)
    fill("#836FFF");
    stroke("black")
    if(gspqy>0.2){
        circle(pqx,pqy,30)
        gnpqy=Number(pqy)
        rdeci=floor(gnpqy)
        vol=rdeci/500
        document.getElementById("volu").innerHTML="volume = "+vol;
        song.setVolume(vol)
    }
}

function play(){
    song.play()
    song.setVolume(0.1)
    song.rate(2.0)
}