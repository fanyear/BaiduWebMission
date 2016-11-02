var CANVASWIDTH = 1100;
var CANVASHEIGHT = 700;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = CANVASWIDTH;
canvas.height = CANVASHEIGHT;

var imgLoad1 = false;
var imgLoad2 = false;

var img = new Image();
img.src = "img/earth.png";

var img2 = new Image();
img2.src = "img/rocket.png";

var r = 60;
var Radius = 100;
var RadiusPlus = 50;
var earthDegree = 0;


var rockets = [];
var r1 = new Rocket(100);
var r2 = new Rocket(150);
var r3 = new Rocket(200);
var r4 = new Rocket(250)

rockets.push(r1)
rockets.push(r2)
rockets.push(r3)
rockets.push(r4)
console.log(rockets);
img.onload = function() {
    imgLoad1 = true;
}
img2.onload = function() {
    imgLoad2 = true;
}
window.onload = function() {
    if (imgLoad1 && imgLoad2) {
        setInterval(function() {
            drawBackground();
            drawRocket();
            rocketsUpate();
        }, 20)

    }
}

function Rocket(r) {
    this.launch = true;
    this.r = r;
    this.degree = 0;
    this.boom = false;
    this.energy = 100;
    this.speed = (240 / 360 * Math.PI) / this.r;
    this.consume = 8;
    this.countDown = 0;
    this.charge = 4;
}

function rocketsUpate() {
    for (var i = 0; i < rockets.length; i++) {
        if (rockets[i].launch == true) {
            rockets[i].degree -= rockets[i].speed;

        }

        if (rockets[i].countDown >= 50) {
            if (rockets[i].launch == true) {
                rockets[i].energy -= rockets[i].consume;
            }
            rockets[i].energy += rockets[i].charge;
            if(rockets[i].energy >=100){
              rockets[i].energy = 100;
            }
            rockets[i].countDown = 0;
        }

        if (rockets[i].energy <= 0) {
            rockets[i].energy = 0;
            rockets[i].launch = false;

        }
        rockets[i].countDown++;



    }
}

function drawBackground() {

    var imgX = canvas.width / 2 - r;
    var imgY = canvas.height / 2 - r;

    var x = canvas.width / 2;
    var y = canvas.height / 2;

    context.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)

    context.save()
    context.translate(x,y);
    earthDegree -= 0.4 / 360 * 2* Math.PI;
    context.rotate( earthDegree )
    context.drawImage(img, -r, -r, 2 * r, 2 * r);

    context.restore()
    for (var i = 0; i < 4; i++) {
        context.save();
        context.translate(x, y);
        context.beginPath();
        context.arc(0, 0, Radius + i * RadiusPlus, 0, 2 * Math.PI)

        context.stroke()

        context.restore();
    }
}

function drawRocket() {

    var x = canvas.width / 2;
    var y = canvas.height / 2;


    for (var i = 0; i < rockets.length; i++) {
        context.save();

        var cx = x + Math.cos(rockets[i].degree) * rockets[i].r;
        var cy = y + Math.sin(rockets[i].degree) * rockets[i].r;

        var line = rockets[i].energy * 30 / 100 - 15;
        context.translate(cx, cy);
        context.beginPath()
        context.rotate(rockets[i].degree)
        context.lineWidth = 5;
        if (line <= 0) {
            context.strokeStyle = "red"
        } else {
            context.strokeStyle = "#00e500"
        }

        context.moveTo(-15, -35);
        context.lineTo(line, -35)
        context.stroke()
        context.drawImage(img2, -15, -30, 30, 60)


        context.restore();
    }


}
