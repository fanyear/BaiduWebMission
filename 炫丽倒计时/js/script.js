var WINDOW_WIDTH = 1400;
var WINDOW_HEIGHT = 700;
var RADIUS = 8;
var MARGIN_LEFT = 200;
var MARGIN_TOP = 200;

var endTime = new Date(2016, 11, 18, 1, 20, 40);
var showTimeSecond = 0;

window.onload = function() {
    var canvas = document.getElementById("canvas");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;


    if (canvas.getContext("2d")) {
        var context = canvas.getContext("2d");

        showTimeSecond = getShowTimeSecond();

        setInterval(
            function() {
                render(context);
                update();
            }, 50
        );


    } else {
        alert("当前浏览器不支持Canvas，赶紧将浏览器更新换代吧~");
    }

}

function getShowTimeSecond() {
    var currentTime = new Date();
    var ret = endTime.getTime() - currentTime.getTime();
    ret = Math.round(ret / 1000);

    return ret >= 0 ? ret : 0;
}

function update() {
    var nextShowTimeSecond = getShowTimeSecond();
    var nextSecond = nextShowTimeSecond % 60;
    var curSecond = showTimeSecond % 60;

    if (nextSecond != curSecond) {
        showTimeSecond = nextShowTimeSecond;
    }
}

function render(ctx) {

    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    var hour = parseInt(showTimeSecond / 3600);
    var minute = parseInt((showTimeSecond - hour * 3600) / 60);
    var second = showTimeSecond % 60;


    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hour / 10 % 10), ctx);
    renderDigit(MARGIN_LEFT + 9 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(hour % 10), ctx);
    renderDigit(MARGIN_LEFT + 17 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(10), ctx);
    renderDigit(MARGIN_LEFT + 22 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(minute / 10), ctx);
    renderDigit(MARGIN_LEFT + 31 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(minute % 10), ctx);
    renderDigit(MARGIN_LEFT + 38 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(10), ctx);
    renderDigit(MARGIN_LEFT + 43 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(second / 10), ctx);
    renderDigit(MARGIN_LEFT + 52 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(second % 10), ctx);

}

function renderDigit(x, y, time, ctx) {

    ctx.fillStyle = "#acf";

    for (var i = 0; i < digit[time].length; i++) {
        for (var j = 0; j < digit[time][i].length; j++) {
            if (digit[time][i][j] == 1) {
                ctx.beginPath();
                ctx.arc(x + j * (2 * RADIUS + 2) + RADIUS + 1, y + i * 2 * (RADIUS + 1) + RADIUS + 1, RADIUS, 0, 2 * Math.PI)
                ctx.closePath();

                ctx.fill();

            }

        }

    }


}
