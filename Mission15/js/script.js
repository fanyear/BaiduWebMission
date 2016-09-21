/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
function getData() {

    if (!document.getElementById) return false;


    var ul = document.getElementById("source");
    var list = ul.getElementsByTagName("li");
    var bb = ul.getElementsByTagName("b");
    var data = new Array();

    for (var i = 0; i < list.length; i++) {
        data[list[i].firstChild.nodeValue] = parseInt(bb[i].firstChild.nodeValue);

    }

    return data;

}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
    var num = [];
    var text = [];
    var i = 0;
    for (var t in data) {
        text[i] = t;
        num[i] = data[t];
        i++;
    }
    for (var i = 0; i < num.length - 1; i++) {
        for (var j = 0; j < num.length - 1 - i; j++) {
            if (num[j] > num[j + 1]) {
                var temt = text[j];
                text[j] = text[j + 1];
                text[j + 1] = temt;

                var tem = num[j];
                num[j] = num[j + 1];
                num[j + 1] = tem;
            }

        }
    }

    var result = [text, num];
    return result;
}


/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
    if (!document.getElementById) return false;
    var resort = document.getElementById("resort");

    for (var i = 0; i < data[0].length; i++) {
        var li = document.createElement("li");
        var text = document.createTextNode(data[0][i]);
        li.appendChild(text);
        var bb = document.createElement("b");
        var num = document.createTextNode(data[1][i]);
        bb.appendChild(num);
        li.appendChild(bb);
        resort.appendChild(li);
    }

}




function btnHandle() {
    var data = getData();
    var dataResorted = sortAqiData(data);
    render(dataResorted);
}


function init() {
    var resorted = false;
    if (!document.getElementById) return false;
    var btn = document.getElementById("sort-btn");
    btn.onclick = function() {
        if (!resorted) {
            btnHandle();
            resorted = true;
        }

    }
}

window.onload = init;
