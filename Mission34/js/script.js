var CANVASWIDTH = 550;
var CANVASHEIGHT = 550;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var input = document.getElementById("input")
var btn = document.getElementById("btn")

var target = {
    x: parseInt(Math.ceil(Math.random() * 10)),
    y: parseInt(Math.ceil(Math.random() * 10)),
    direction: 0,
    realDirection: 0
};

var cmds = [];

canvas.width = CANVASWIDTH;
canvas.height = CANVASHEIGHT;


window.onload = function() {
    drawBackground()
    drawTarget()
    btn.addEventListener("click", move);
}

String.prototype.trim = function() {　　
    return this.replace(/(^\s*)|(\s*$)/g, "");　　
}

function move() {
    var cmd = input.value.trim();
    cmd = cmd.toLowerCase()
    switch (cmd) {
        case "go":
            moveForward();
            break;
        case "tun lef":
            turn(3)
            break;
        case "tun rig":
            turn(1)
            break;
        case "tun bac":
            turn(2)
            break;

        default:

    }
    drawBackground()
    drawTarget()
}

function turn(n){
  target.direction = Math.abs(target.direction + n)%4;
}
function moveForward() {
    switch (target.direction) {
        case 0:
            if(target.y>1){
              target.y--;
            }
            break;
        case 1:
            if(target.x <10){
              target.x++
            }
            break;
        case 2:
            if(target.y<10){
              target.y++;
            }
            break;
        case 3:
            if(target.x>1){
              target.x--;
            }
            break;
        default:

    }
}

function drawTarget() {

    var x = (target.x - 1) * 50 + 25
    var y = (target.y - 1) * 50 + 25

    context.save()
    context.translate(40 + x, 40 + y);
    context.save();
    context.fillStyle = "red";
    context.strokeStyle = "red"
    context.rotate(target.direction * 90 / 360 * 2 * Math.PI)
    context.fillRect(-25, -25, 50, 50)
    context.restore();

    context.save()
    context.fillStyle = "blue";
    context.rotate(target.direction * 90 / 360 * 2 * Math.PI)
    context.fillRect(-25, -25, 50, 15)
    context.restore();

    context.restore();

}

function drawBackground() {

    context.clearRect(0,0,CANVASWIDTH,CANVASHEIGHT)
    context.save()
    context.beginPath()
    context.translate(40, 40)
    context.lineWidth = 1;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            context.beginPath()
            context.rect(i * 50, j * 50, 50, 50)
            context.stroke()
        }
    }
    context.restore()
        //横坐标
    context.save()
    context.translate(40, 0)
    context.textAlign = "center";
    context.textBaseline = "middle"
    context.font = "bolder 25px Arial";
    for (var k = 0; k < 10; k++) {
        context.fillText(k + 1, k * 50 + 25, 20)
    }
    context.restore()

    //纵坐标
    context.save()
    context.translate(0, 40)
    context.font = "bolder 25px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle"
    for (var k = 0; k < 10; k++) {
        context.fillText(k + 1, 20, k * 50 + 25)
    }
    context.restore()
}
