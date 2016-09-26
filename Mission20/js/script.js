var text = document.getElementById("text");
var showData = document.getElementById("showData");

/*左侧入*/

function leftIn() {
    if (!document.getElementById("leftIn")) return false;

    var btn = document.getElementById("leftIn");
    var spans = showData.getElementsByTagName("span");

    btn.onclick = function() {
        var sp = showData.getElementsByTagName("span");
        if (sp.length >= 60) {
            alert("数量已达到60个");
            return false;
        }
        if (text.value == "") {

            alert("请输入数据");
        } else {
            var list = inputList();

            for (var i = 0; i < list.length; i++) {
                var span = document.createElement("span");
                var spanText = document.createTextNode(list[i]);
                span.onclick = function() {
                    alert("value :" + span.firstChild.nodeValue);
                    this.parentNode.removeChild(this);
                }
                span.appendChild(spanText);

                if (spans.length == 0) {
                    showData.appendChild(span);
                } else {
                    showData.insertBefore(span, spans[0]);
                }

            }


        }
    }
}

/*右侧入*/
function rightIn() {
    if (!document.getElementById("rightIn")) return false;

    var btn = document.getElementById("rightIn");
    btn.onclick = function() {
        inputList()
        var sp = showData.getElementsByTagName("span");
        if (sp.length >= 60) {
            alert("数量已达到60个");
            return false;
        }
        if (text.value == "") {

            alert("请输入数据");
        } else {
            var list = inputList();

            for (var i = 0; i < list.length; i++) {
                var span = document.createElement("span");
                var spanText = document.createTextNode(list[i]);
                span.onclick = function() {
                    alert("value :" + span.firstChild.nodeValue);
                    this.parentNode.removeChild(this);
                }
                span.appendChild(spanText);


                showData.appendChild(span);


            }

        }
    }
}

/*出*/

function Out() {
    if (!document.getElementById("leftOut")) return false;
    if (!document.getElementById("rightOut")) return false;

    var btnL = document.getElementById("leftOut");
    var btnR = document.getElementById("rightOut");
    var data = showData.getElementsByTagName("span");

    btnL.onclick = function() {
        if (data.length == 0) {
            alert("清空完毕");
        } else {
            showData.removeChild(data[0]);
        }
    }

    btnR.onclick = function() {
        if (data.length == 0) {
            alert("清空完毕");
        } else {
            showData.removeChild(data[data.length - 1]);
        }
    }

}

/*删除*/

function deleteData() {
    var data = showData.getElementsByTagName("span");

    for (var i = 0; i < data.length; i++) {
        data[i].onclick = function() {
            alert("value :" + this.firstChild.nodeValue);
            this.parentNode.removeChild(this);
        }
    }
}

/*检测输入*/

function inputList() {
    var str = text.value;
    var reg = /\s+|\、|，|,/;
    var finalList = str.split(reg);
    return finalList;
}

/*搜索*/
function search() {
    var searchText = document.getElementById("searchText");
    var btn = document.getElementById("search");

    btn.onclick = function() {

        var content = searchText.value;

        if (content == "") {
            alert("请输入关键字");
            return false;
        }
        var num =0
        var spans = showData.getElementsByTagName("span");
        for (var i = 0; i < spans.length; i++) {
            if (spans[i].firstChild.nodeValue.search(content)!= -1) {
                spans[i].style.background = "#abc";
                num++;
            }
        }
        if(num==0){
          alert("没有你要找的数据")
        }
        num=0;
    }
}


function init() {

    leftIn()
    rightIn()
    Out()
    deleteData()
    search()
}

window.onload = init;
