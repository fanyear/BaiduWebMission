/*定时*/
var time = 1;
var stop = new Object();

function countDown() {
    time -= 0.6;

    if (stop.time) {
        clearTimeout(stop.time);
    }
    if (time <= 0) {
        time = 0;
        clearTimeout(stop.time);
        timeInterval = 1;
        timeTempt = 0;
        speed = 0.5;

        movement();
        return true;
    }
    stop.time = setTimeout(countDown, 100);
}

/*数据显示动画*/
function showData() {
    this.style.opacity = "1";
}
/*添加动画*/
var timeInterval = 1;
var timeIntervalStop;
var timeTempt = 0;
var diagram = document.getElementById("diagram");
var timeIntervalOut = new Object();
var num = diagram.getElementsByTagName("div");
var speed = 0.5;

function movement() {
    var h;
    var max = 400;
    timeInterval -= speed;

    h = max * Math.random();
    if (h < 50) h = 50;
    h = Math.round(h);
    if (typeof timeIntervalOut.stop != "undefined") {
        clearTimeout(timeIntervalOut.stop);
    }

    num[timeTempt].style.height = h + "px";

    var span = document.createElement("span");
    span.style.opacity = "0";
    var nums = parseInt(timeSelect.value);
    if (nums > 50) {
        if (h < 100) {
            span.style.left = "-0.2em";
        } else {
            span.style.left = "-0.6em";
        }
    }else if(nums >10){
      if (h < 100) {
          span.style.left = "0.3em";
      } else {
          span.style.left = "0.1em";
      }
    }else{
      if (h < 100) {
          span.style.left = "1.3em";
      } else {
          span.style.left = "1em";
      }
    }


    num[timeTempt].addEventListener("webkitTransitionEnd", function() {
        span.style.opacity = "1";
    });
    num[timeTempt].addEventListener("transitionend", function() {
        span.style.opacity = "1";
    });

    var data = document.createTextNode(String(h));
    span.appendChild(data);
    num[timeTempt].appendChild(span);



    timeTempt++;
    if (timeTempt >= num.length) {
        timeTempt = 0;
        clearTimeout(timeIntervalOut.stop);
        return true;
    }
    timeIntervalOut.stop = setTimeout(movement, 50);
}

/*添加div*/

function addDiv(num) {
    var color = ["#66CCCC", "#CCFF66", "#FF9900", "tomato", "#993366", "#666699", "#fff", "#FFFF99", "#FF6666", "#66CCCC"];
    var n = num;
    var dia = document.getElementById("diagram");
    var max = 400;

    for (var i = 0; i < n; i++) {
        var div = document.createElement("div");
        var he = Math.random() * max;
        div.style.height = "3px";
        div.style.background = color[Math.floor(Math.random() * (color.length - 1))];

        if (n > 50) {
            div.style.marginLeft = "3px";
            div.style.marginRight = "3px";
            div.style.width = "5px";
            div.style.fontSize = "10px";
        } else if (n > 5) {
            div.style.marginLeft = "7px";
            div.style.marginRight = "7px";
            div.style.width = "30px";
            div.style.fontSize = "18px";

        } else {
            div.style.width = "70px";
            div.style.marginRight = "10px";
            div.style.marginLeft = "10px";
            div.style.fontSize = "20px";
        }
        dia.appendChild(div);
    }
}

/*获取日期*/
var timeSelect = document.getElementById("timeSelect");

function getTime() {

    var days;
    timeSelect.onchange = function() {
        days = parseInt(timeSelect.value);
        clearDiv();
        addDiv(days);
        countDown();
    }
}

function getCity() {
    var citySelect = document.getElementById("citySelect");

    citySelect.onchange = function() {
        days = parseInt(timeSelect.value);
        clearDiv();
        addDiv(days);
        countDown();
    }
}
/*刷新数据*/
function clearDiv() {

    var dia = document.getElementById("diagram");
    var divs = dia.getElementsByTagName("div");

    var length = divs.length;
    if (length == 0) return true;

    time = 1;
    for (var i = 0; i < length; i++) {
        divs[0].style.height = "0px";
        divs[0].parentNode.removeChild(divs[0]);
    }

}



/*start*/
var start = 0;

function startDisplay() {
    if (start == 0) {
        start = 1;
        var days = parseInt(timeSelect.value);
        addDiv(days);
        countDown();
    }
}
/*初始化*/
function init() {
    startDisplay();
    getCity();
    getTime();
}

init();
