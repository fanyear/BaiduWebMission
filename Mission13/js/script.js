function showInput() {
    if (!document.getElementById("button")) return false;
    var btn = document.getElementById("button");

    btn.onclick = function() {
        if (!document.getElementById("aqi-input")) return false;
        var input = document.getElementById("aqi-input");
        var text = input.value;

        if (!document.getElementById("aqi-display")) return false;
        var display = document.getElementById("aqi-display");

        if (text) {
            display.firstChild.nodeValue = text;
        } else {
            display.firstChild.nodeValue = "Nothing";
        }
    }
}

window.onload = showInput();
