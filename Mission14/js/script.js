 var aqiData = [
    ["北京", 90],
    ["上海", 50],
    ["福州", 10],
    ["广州", 50],
    ["成都", 90],
    ["西安", 100]
];

function aqiList() {
    var array = aqiData;
    for (var i = 0; i < array.length - 1; i++) {
        for (var j = 0; j < array.length - 1 - i; j++) {
            if (array[j][1] < array[j + 1][1]) {
                var tem = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tem;
            }

        }
    }
    if(!document.getElementById("aqi-list")) return false;
    var ul = document.getElementById("aqi-list");

    if (!document.createElement) return false;

    for (var i = 0; i < array.length && array[i][1]>60 ; i++) {
        var li = document.createElement("li");
        var rank = i + 1;
        var city = array[i][0];
        var value = array[i][1];
        var text = "第 " + rank + " 名: " + city + "  " + value;
        var textNode = document.createTextNode(text);

        li.appendChild(textNode);
        ul.appendChild(li);
    }
}
window.onload = aqiList();
