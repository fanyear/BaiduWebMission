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

var addBtn = document.getElementById("addBtn")
var btnText = ["Launch", "Stop", "Destroy"]

var rockets = [];
var rate = 10;

var powerArguments = [{d:300,c:3},{d:600,c:4},{d:900,c:5}];
var sourceArguments = [1,2,3];

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
            addBtnShow()
            selectModel();
        }, 20)

        addBtn.onclick = function() {
            addAirship();


        }

    }
}

function addBtnShow() {
    var show = false;
    for (var i = 0; i < 4; i++) {
        if (rockets[i] == undefined) {
            show = true;
            break;
        }
    }

    if (show) {
        addBtn.disabled = false;
    } else {
        addBtn.disabled = true;
    }
}
function selectModel(){
  var power = document.getElementById("powerSys");
  var source = document.getElementById("sourceSys");

  var powerList = power.getElementsByTagName("input");
  var sourceList = source.getElementsByTagName("input");

  var powerSelected = -1;
  var sourceSelected = -1;

  var selectedList =[];

  for (var i = 0; i < powerList.length; i++) {
    if(powerList[i].checked){
        powerSelected = i;
        break;
    }
  }

  for (var j = 0; j < sourceList.length; j++) {
    if(sourceList[j].checked){
      sourceSelected = j;
      break;
    }
  }

  selectedList.push(powerSelected)
  selectedList.push(sourceSelected)

  return selectedList




}
function addAirship() {

    var num = 0;
    var airshipFull = true;

    var control = document.getElementById("control");

    var div = document.createElement("div");

    var btn1 = document.createElement("button");
    var btn2 = document.createElement("button");
    var btn3 = document.createElement("button");
    var span = document.createElement("span")

    var list = selectModel()
    if(list[0] == -1 || list[1] == -1){
      alert("Please choose your system !");
      return false;
    }
    btn1.setAttribute("type", "button");
    btn1.setAttribute("name", "button");
    btn2.setAttribute("type", "button");
    btn2.setAttribute("name", "button");
    btn3.setAttribute("type", "button");
    btn3.setAttribute("name", "button");

    for(var i =0 ;i<4;i++){
      if(rockets[i] == undefined){
        var r = new Rocket(Radius + i * RadiusPlus );
        r.degreeSpeed = powerArguments[list[0]].d;
        r.speed = (r.degreeSpeed / 360 * Math.PI) /r.r;
        r.consume = powerArguments[list[0]].c;
        r.charge = sourceArguments[list[1]];
        rockets[i] = r;
        num = i +1;
        airshipFull = false;
        break;
      }
    }
    if(airshipFull){
      return false;
    }

    var textNum = "Airship " + num;
    var text = document.createTextNode(textNum)
    span.appendChild(text);
    div.appendChild(span);

    var text1 = document.createTextNode("Launch");
    btn1.appendChild(text1);
    div.appendChild(btn1);

    var text2 = document.createTextNode("Stop");
    btn2.appendChild(text2);
    div.appendChild(btn2);

    var text3 = document.createTextNode("Destroy");
    btn3.appendChild(text3);
    div.appendChild(btn3);

    r.div = div;
    btn1.onclick = function() {
      var flag =probability(rate)
        setTimeout(function(){
          if(flag){
            r.launch = true;
          }

        },300)

    }
    btn2.onclick = function() {
      var flag =probability(rate)
        setTimeout(function(){
          if(flag){
              r.launch = false;
          }

        },300)
    }
    btn3.onclick = function() {
      var flag =probability(rate)

        setTimeout(function(){
          if(flag){
            r.boom = true;
            control.removeChild(r.div)
          }

        },300)

    }
    control.appendChild(div)



}

function probability(percent){
    var num =   Math.random()*100;
    return percent > num ? false:true;
}

function Rocket(r) {
    this.launch = false;
    this.r = r;
    this.degree = 0;
    this.boom = false;
    this.energy = 200;
    this.degreeSpeed = 0;
    this.speed = (this.degreeSpeed / 360 * Math.PI) / this.r;
    this.consume = 2;
    this.countDown = 0;
    this.charge = 1;
    this.div = null;
}

function rocketsUpate() {
    for (var i = 0; i < rockets.length; i++) {
        if (rockets[i]) {
            if (rockets[i].launch == true) {
                rockets[i].degree -= rockets[i].speed;

            }

            if (rockets[i].countDown >= 6) {
                if (rockets[i].launch == true) {
                    rockets[i].energy -= rockets[i].consume;
                }
                rockets[i].energy += rockets[i].charge;
                if (rockets[i].energy >= 200) {
                    rockets[i].energy = 200;
                }
                rockets[i].countDown = 0;
            }

            if (rockets[i].energy <= 0) {
                rockets[i].energy = 0;
                rockets[i].launch = false;

            }
            rockets[i].countDown++;

            if (rockets[i].boom == true) {
                rockets[i] = undefined;
            }
        }

    }
}

function drawBackground() {

    var imgX = canvas.width / 2 - r;
    var imgY = canvas.height / 2 - r;

    var x = canvas.width / 2;
    var y = canvas.height / 2;

    context.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)

    context.save()
    context.translate(x, y);
    earthDegree -= 0.4 / 360 * 2 * Math.PI;
    context.rotate(earthDegree)
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

        if (rockets[i]) {
            context.save();

            var cx = x + Math.cos(rockets[i].degree) * rockets[i].r;
            var cy = y + Math.sin(rockets[i].degree) * rockets[i].r;

            var line = rockets[i].energy/2 * 30 / 100 - 15;
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


}
