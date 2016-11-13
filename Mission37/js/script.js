var logIn = document.getElementById("logIn");
var emersionLayer = document.getElementById("emersionLayer");
var emersionFrame = document.getElementById("emersionFrame");
var btnConfirm = document.getElementById("confirm")
var btnCancel = document.getElementById("cancel")
var resizeBtn = document.getElementById("resize")
var moveElement = emersionFrame.getElementsByTagName("span")[0]

var elementTop = -125;
var elementLeft = -300;
var elementWidth = 600;
var elementHeight = 250;

var speed = 20;
var showInterval = null;
var hideInterval = null;

var emersionLayerOp = 8;
var emersionLayerOp1 = 0;
var moveFlag = false;

var boxoffx = 0;
var boxoffy = 0;

var resizeFlag = false;
var resizeStartX = 0;
var resizeStartY = 0;

window.onload = function() {
    init()
    resizeFrame()
    moveFrame()
}

function init() {
    logIn.onclick = function() {
        showLayer();
        reset()
    }
    emersionLayer.onclick = function() {
        hideLayer()
    }
    btnConfirm.onclick = function() {
        hideLayer()
    }
    btnCancel.onclick = function() {
        hideLayer()
    }
    emersionFrame.onselectstart= function(){
      return false;
    }
}


function resizeFrame() {
    resizeBtn.onmousedown = function(e) {
        resizeFlag = true;
        resizeStartX = emersionFrame.offsetLeft;
        resizeStartY = emersionFrame.offsetTop;
    }
    window.onmousemove = function(e) {
        if (resizeFlag) {
            resize(e);
        }
    }
    window.onmouseup = function() {
        resizeFlag = false;
    }
}

function moveFrame() {
    moveElement.onmousedown = function(e) {
        moveFlag = true;
        boxoffx = e.clientX - emersionFrame.offsetLeft;
        boxoffy = e.clientY - emersionFrame.offsetTop;
    }
    moveElement.onmousemove = function(e) {
        if (moveFlag) {
            move(e);
        }
    }
    moveElement.onmouseup = function() {
        moveFlag = false;
    }
    moveElement.onmouseout = function() {
        moveFlag = false;
    }
}

function showLayer() {
    var op = 0;
    var op1 = 0;
    emersionLayer.style.display = "block"
    emersionFrame.style.display = "block"
    clearInterval(showInterval)
    showInterval = setInterval(function() {
        op += 0.5;
        op1 = op / 10;
        emersionLayer.style.opacity = op1;
        emersionFrame.style.opacity = op1;
        if (op >= emersionLayerOp) {
            clearInterval(showInterval);
        }
    }, speed)

}

function hideLayer() {
    var op = 10;
    var op1 = 0;
    clearInterval(hideInterval)
    hideInterval = setInterval(function() {
        op -= 0.5;
        op1 = op / 10;
        emersionLayer.style.opacity = op1;
        emersionFrame.style.opacity = op1;
        if (op < emersionLayerOp1) {
            clearInterval(hideInterval);
            emersionLayer.style.display = "none"
            emersionFrame.style.display = "none"
        }
    }, speed)

}

function move(e) {
    var mx = e.clientX;
    var my = e.clientY;

    var dx = mx - boxoffx;
    var dy = my - boxoffy;

    var px = dx - elementLeft;
    var py = dy - elementTop;
    console.log( );
    console.log(document.body.clientHeight  );
    if(px +elementLeft <=0 || py + elementTop<=0 || px +elementLeft >= document.body.clientWidth - emersionFrame.offsetWidth ||py + elementTop >= document.body.clientHeight - emersionFrame.offsetHeight ){
      return false;
    }
    emersionFrame.style.left = px + "px";
    emersionFrame.style.top = py + "px";
}

function reset() {
    emersionFrame.style.left = "50%";
    emersionFrame.style.top = "50%";
    emersionFrame.style.width = elementWidth + "px";
    emersionFrame.style.height = elementHeight + "px";
}

function resize(e) {
    var dx = e.clientX - resizeStartX;
    var dy = e.clientY - resizeStartY;

    var px = resizeStartX - (dx - elementWidth) / 2 - elementLeft;
    var py = resizeStartY - (dy - elementHeight) / 2 - elementTop;


    if (dx < elementWidth * 2 / 3 || dy < elementHeight * 3 / 4) {
        return false;
    }

    emersionFrame.style.width = dx + "px";
    emersionFrame.style.height = dy + "px";

    emersionFrame.style.left = px + "px";
    emersionFrame.style.top = py + "px";

}
