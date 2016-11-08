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
var moveInterval = null;
var nextStep = false;
var startStep = false;
var update = false;
var updateInterval = null;
var speed = 20

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
            moveForward()
            break;
        case "tun lef":
            cmds.push(-90)
            break;
        case "tun rig":
            cmds.push(90)
            break;
        case "tun bac":
            cmds.push(180)
            break;
        case "tra lef":
            moveXY(3)
            break;
        case "tra top":
            moveXY(0)
            break;
        case "tra rig":
            moveXY(1)
            break;
        case "tra bot":
            moveXY(2)
            break;
        case "mov lef":
            moveWholeTarget(3)
            break;
        case "mov rig":
            moveWholeTarget(1)
            break;
        case "mov top":
            moveWholeTarget(0)
            break;
        case "mov bot":
            moveWholeTarget(2)
            break;

        default:

    }
    if (cmds.length) {
        update = true
        clearInterval(updateInterval)
        updateInterval = setInterval(targeUpdate, speed)

    } else {
        update = false;
    }

}


function targeUpdate() {
    var step = 0;
    if (cmds.length == 0) {
        clearInterval(updateInterval)
    }
    if (startStep == false || nextStep == true) {
        startStep = true;
        nextStep = false;

        step = cmds.shift();
        console.log(step);
        if (typeof step == "object") {
            moveTarget(step.ax, step.ay)
        }

        if (typeof step == "number") {
            rotateTarget(step)
        }
    }
}

function moveWholeTarget(n) {
    var angel = 0;
    var degree = 0;
    var x = target.x;
    var y = target.y;
    if (target.direction < 0) {
        angel = (target.direction % 360 + 360) / 90;
    } else {
        angel = (target.direction % 360) / 90;
    }
    if (angel == 4) {
        angel = 0
    }
    if (n != angel) {
        degree = (n - angel) * 90;
        if(degree == -270){
          degree = 90;
        }
        if(degree == 270){
          degree = -90;
        }
        cmds.push(degree);
        switch (n) {
            case 0:
                if (target.y > 1) {
                    y = target.y - 1;
                }

                break;
            case 1:
                if (target.x < 10) {
                    x = target.x + 1;
                }
                break;
            case 2:
                if (target.y < 10) {
                    y = target.y + 1;
                }
                break;
            case 3:
                if (target.x > 1) {
                    x = target.x - 1;
                }
                break;
            default:

        }
        if (x != target.x || y != target.y) {
            cmds.push({
                ax: x,
                ay: y
            })
        }
    } else {
      switch (n) {
          case 0:
              if (target.y > 1) {
                  y = target.y - 1;
              }

              break;
          case 1:
              if (target.x < 10) {
                  x = target.x + 1;
              }
              break;
          case 2:
              if (target.y < 10) {
                  y = target.y + 1;
              }
              break;
          case 3:
              if (target.x > 1) {
                  x = target.x - 1;
              }
              break;
          default:

      }
      if (x != target.x || y != target.y) {
          cmds.push({
              ax: x,
              ay: y
          })
      }
    }
}

function moveXY(n) {
    var angel = n;
    var x = target.x;
    var y = target.y;

    console.log(angel);
    switch (angel) {
        case 0:
            if (target.y > 1) {
                y = target.y - 1;
            }

            break;
        case 1:
            if (target.x < 10) {
                x = target.x + 1;
            }
            break;
        case 2:
            if (target.y < 10) {
                y = target.y + 1;
            }
            break;
        case 3:
            if (target.x > 1) {
                x = target.x - 1;
            }
            break;
        default:

    }
    if (x != target.x || y != target.y) {
        cmds.push({
            ax: x,
            ay: y
        })
    }
}

function moveForward() {
    var angel = 0;
    var x = target.x;
    var y = target.y;
    if (target.direction < 0) {
        angel = (target.direction % 360 + 360) / 90;
    } else {
        angel = (target.direction % 360) / 90;
    }
    if (angel == 4) {
        angel = 0
    }
    console.log(angel);
    switch (angel) {
        case 0:
            if (target.y > 1) {
                y = target.y - 1;
            }

            break;
        case 1:
            if (target.x < 10) {
                x = target.x + 1;
            }
            break;
        case 2:
            if (target.y < 10) {
                y = target.y + 1;
            }
            break;
        case 3:
            if (target.x > 1) {
                x = target.x - 1;
            }
            break;
        default:

    }
    if (x != target.x || y != target.y) {
        cmds.push({
            ax: x,
            ay: y
        })
    }
}


function rotateTarget(n) {
    var num = Math.abs(n / 9);
    var deg = Math.abs(n) / n * 9;
    var time = 0;
    clearInterval(moveInterval);
    moveInterval = setInterval(function() {
        target.direction += deg;
        time++;
        console.log(time);
        drawBackground()
        drawTarget()
        if (time == num) {
            nextStep = true;
            clearInterval(moveInterval);
        }

    }, speed)
}

function moveTarget(x, y) {
    var dx = 0,
        dy = 0;

    if (Math.abs(x - target.x) > 0.11) {
        target.x > x ? dx = -0.1 : dx = 0.1;
    }
    if (Math.abs(y - target.y) > 0.11) {
        target.y > y ? dy = -0.1 : dy = 0.1;
    }

    clearInterval(moveInterval);
    moveInterval = setInterval(function() {
        if (Math.abs(x - target.x) < 0.1 && Math.abs(y - target.y) < 0.1) {
            nextStep = true;

            target.x = Math.round(target.x)
            target.y = Math.round(target.y)
            clearInterval(moveInterval);
        } else {
            if (Math.abs(x - target.x) > 0.1) {
                target.x += dx;
            }
            if (Math.abs(y - target.y) > 0.1) {
                target.y += dy;
            }

            console.log(target.x, target.y);
        }

        drawBackground()
        drawTarget()
    }, speed)

}

function drawTarget() {

    var x = (target.x - 1) * 50 + 25
    var y = (target.y - 1) * 50 + 25

    context.save()
    context.translate(40 + x, 40 + y);
    context.save();
    context.fillStyle = "red";
    context.strokeStyle = "red"
    context.rotate(target.direction / 360 * 2 * Math.PI)
    context.fillRect(-25, -25, 50, 50)
    context.restore();

    context.save()
    context.fillStyle = "blue";
    context.rotate(target.direction / 360 * 2 * Math.PI)
    context.fillRect(-25, -25, 50, 15)
    context.restore();

    context.restore();

}

function drawBackground() {

    context.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)
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
