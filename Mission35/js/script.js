var CANVASWIDTH = 550;
var CANVASHEIGHT = 550;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var input = document.getElementById("input")
var btn = document.getElementById("btn")
var lines = document.getElementById("lines")
var refreshBbtn = document.getElementById("refreshBbtn")

var target = {
    x: 5,
    y: 6,
    direction: 0,
    realDirection: 0
};

var cmds = [];
var moveInterval = null;
var nextStep = false;
var startStep = false;
var update = false;
var updateInterval = null;
var speed = 15
var commands = [];
var listNum = 0;
var inputCheckLines = null;
var error = false;
var run = 0;
var double = 0;

canvas.width = CANVASWIDTH;
canvas.height = CANVASHEIGHT;


window.onload = function() {
    drawBackground()
    drawTarget()
    btn.addEventListener("click", move);
    refreshBbtn.addEventListener("click", function() {
        input.value = "";
        error = false;
        target.x = parseInt(Math.ceil(Math.random() * 10));
        target.y = parseInt(Math.ceil(Math.random() * 10));
        target.direction = 0;
        target.realDirection = 0;
        run = 0;
        while (lines.getElementsByTagName("span").length) {
            lines.removeChild(lines.getElementsByTagName("span")[0])
        }
        drawBackground()
        drawTarget()
    })
}

input.onscroll = function() {
    linesMove()
}

input.onfocus = function(e) {
    clearInterval(inputCheckLines)
    inputCheckLines = setInterval(function() {
        var ls = lines.getElementsByTagName("span")
        commands = input.value.split(/\n/);
        for (var i = 0; i < commands.length; i++) {
            commands[i].trim()
        }
        if (ls.length < commands.length) {
            var span = document.createElement("span");
            var num = document.createTextNode(ls.length + 1);
            span.appendChild(num);
            lines.appendChild(span);
        } else if (ls.length > commands.length) {
            lines.removeChild(ls[ls.length - 1])
        }
    }, 2)
}
input.onblur = function() {
    clearInterval(inputCheckLines)
    if (commands.length == 1) {
        if (commands[0] == "") {
            var ls = lines.getElementsByTagName("span")
            lines.removeChild(ls[ls.length - 1])
        }
    }
}


function linesMove() {
    var span = lines.getElementsByTagName("span")[0];
    if (span) {
        span.style.marginTop = -input.scrollTop + "px";
    }
}
String.prototype.trim = function() {　　
    return this.replace(/(^\s*)|(\s*$)/g, "");　　
}

function move() {
    error = false;
    run = 0;
    commands = input.value.split(/\n/);
    for (var i = 0; i < commands.length; i++) {
        commands[i] = commands[i].trim()
        commands[i] = commands[i].toLowerCase()
    }
    console.log("step 0 :" + 0);
    console.log("command :" + commands);
    addCmd(commands.shift())
    if(error){
      linesShow(run+1 , 2)
    }

    if (cmds.length) {
        update = true
        clearInterval(updateInterval)
        updateInterval = setInterval(targeUpdate, speed)

    } else {
        update = false;
    }

}

function linesShow(n, flag) {
    var span = lines.getElementsByTagName("span")

    if (span.length >= n && flag == 1) {
        if (n - 2 > -1) {
            span[n - 2].style.background = "#1D1F21"
        }
        span[n - 1].style.background = "#373B41"

    }
    if (flag == 2) {
      if(span[n-1]){
        span[n - 1].style.background = "red"
      }

    }
}

function addCmd(cmd) {
    var num = 0;
  if(cmd.match(/\d/)){
      num = parseInt(cmd[cmd.length-1]);
      cmd = cmd.slice(0,cmd.length-2);
      console.log("num :"+ num + "cmd :"+cmd +"!");
  }

    switch (cmd) {
        case "go":
            moveForward(num)
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
            moveXY(3,num)
            break;
        case "tra top":
            moveXY(0,num)
            break;
        case "tra rig":
            moveXY(1,num)
            break;
        case "tra bot":
            moveXY(2,num)
            break;
        case "mov lef":
            moveWholeTarget(3,num)
            double = 1;
            break;
        case "mov rig":
            moveWholeTarget(1,num)
              double = 1;
            break;
        case "mov top":
            moveWholeTarget(0,num)
              double = 1;
            break;
        case "mov bot":
            moveWholeTarget(2,num)
              double = 1;
            break;

        default:
            error = true;
            console.log("error");

    }
}

function targeUpdate() {
    var step = 0;
    if (commands.length == 0 && cmds.length == 0 || error) {
        if (error) {

            linesShow(run+1 , 2)
                  } else {

        }
        clearInterval(updateInterval);
        return true;
    }
    if (startStep == false || nextStep == true) {
        startStep = true;
        nextStep = false;

        if(double != 2){
          run++;
        }
        if(double == 1){
          double++;
        }else if (double == 2) {
          double = 0;
        }

        linesShow(run, 1)
        step = cmds.shift();
console.log("moving");

        if (typeof step == "object") {
            moveTarget(step.ax, step.ay)
        }else if(typeof step == "number"){
          rotateTarget(step)
        }else{
          console.log("typeof error")
        }


    }
}

function moveWholeTarget(n,num) {
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
        if (degree == -270) {
            degree = 90;
        }
        if (degree == 270) {
            degree = -90;
        }
        cmds.push(degree);
        switch (n) {
            case 0:
                if (target.y > num) {
                    y = target.y - num;
                }

                break;
            case 1:
                if (target.x < 10 -num) {
                    x = target.x  +num;
                }
                break;
            case 2:
                if (target.y < 10 - num) {
                    y = target.y  + num;
                }
                break;
            case 3:
                if (target.x > num) {
                    x = target.x - num;
                }
                break;
            default:

        }
        if (x != target.x || y != target.y) {
            console.log("n"+n+"y: "+ y + " target.y :" + target.y);
            cmds.push({
                ax: x,
                ay: y
            })
        } else {
            error = true;
            console.log("y: "+ y + " target.y :" + target.y);
            console.log("error");
        }
    } else {
        switch (n) {
          case 0:
              if (target.y > num) {
                  y = target.y - num;
              }

              break;
          case 1:
              if (target.x < 10 -num) {
                  x = target.x  +num;
              }
              break;
          case 2:
              if (target.y < 10 - num) {
                  y = target.y  + num;
              }
              break;
          case 3:
              if (target.x > num) {
                  x = target.x - num;
              }
              break;
          default:

        }
        if (x != target.x || y != target.y) {
            console.log("n"+n+"y: "+ y + " target.y :" + target.y);
            cmds.push({
                ax: x,
                ay: y
            })
        } else {
            error = true;
            console.log("y: "+ y + " target.y :" + target.y);
            console.log("error");
        }
    }
}

function moveXY(n,num) {
    var angel = n;
    var x = target.x;
    var y = target.y;

    console.log(angel);
    switch (angel) {
        case 0:
            if (target.y > num) {
                y = target.y - num;
            }

            break;
        case 1:
            if (target.x < 10 -num) {
                x = target.x  +num;
            }
            break;
        case 2:
            if (target.y < 10 - num) {
                y = target.y  + num;
            }
            break;
        case 3:
            if (target.x > num) {
                x = target.x - num;
            }
            break;
        default:

    }
    if (x != target.x || y != target.y) {
        console.log("n"+n+"y: "+ y + " target.y :" + target.y);
        cmds.push({
            ax: x,
            ay: y
        })
    } else {
        error = true;
        console.log("y: "+ y + " target.y :" + target.y);
        console.log("error");
    }
}

function moveForward(n) {
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
    switch (angel) {
        case 0:
            if (target.y > n) {
                y = target.y - n;
            }

            break;
        case 1:
            if (target.x < 10 -n) {
                x = target.x  +n;
            }
            break;
        case 2:
            if (target.y < 10 - n) {
                y = target.y  + n;
            }
            break;
        case 3:
            if (target.x > n) {
                x = target.x - n;
            }
            break;
        default:

    }
    if (x != target.x || y != target.y) {
        console.log("n"+n+"y: "+ y + " target.y :" + target.y);
        cmds.push({
            ax: x,
            ay: y
        })
    } else {
        error = true;
        console.log("y: "+ y + " target.y :" + target.y);
        console.log("error");
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
        drawBackground()
        drawTarget()
        if (time == num) {
            nextStep = true;
            clearInterval(moveInterval);
            console.log("step :" + run );
            console.log("command "+run+":" + commands[0]);
            if (commands.length && cmds.length == 0) {
                addCmd(commands.shift())
            }

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
        if (Math.abs(x - target.x) < 0.01 && Math.abs(y - target.y) < 0.01) {
            nextStep = true;

            target.x = Math.round(target.x)
            target.y = Math.round(target.y)
            console.log("step :" + run);
              console.log("command "+run+":" + commands[0]);
            if (commands.length && cmds.length == 0) {
                addCmd(commands.shift())
            }
            clearInterval(moveInterval);
        } else {
            if (Math.abs(x - target.x) > 0.001) {
                target.x += (x - target.x)/12;
            }
            if (Math.abs(y - target.y) > 0.001) {
                target.y += (y - target.y)/12 ;
            }

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
    context.lineWidth = 0.7;
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
