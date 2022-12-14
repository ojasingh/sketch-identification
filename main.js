function setup(){
    canvas=createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(clasifycanvas);
    synth=window.speechSynthesis;
}
function clear_canvas(){
    background("white");
}
function preload(){
    doodle=ml5.imageClassifier("DoodleNet");
}
function draw(){
    strokeWeight(7);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function clasifycanvas(){
doodle.classify(canvas,gotresult);
}
function gotresult(error,result){
    if(error){
        console.error(error);
    }else{
        console.log(result);
        document.getElementById("label").innerHTML="Label - "+result[0].label;
        document.getElementById("label2").innerHTML="confidence - "+Math.round(result[0].confidence*100)+"%";
    utterthis=new SpeechSynthesisUtterance(result[0].label);
    synth.speak(utterthis);
    }

}