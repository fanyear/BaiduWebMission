var text = document.getElementById("text");
var showData = document.getElementById("showData");

/*左侧入*/

function leftIn() {
    if (!document.getElementById("leftIn")) return false;

    var btn = document.getElementById("leftIn");
    btn.onclick = function() {
        if (text.value == "") {

            alert("请输入数据");
        } else {

            var span = document.createElement("span");
            var tex = document.createTextNode(text.value);
            span.appendChild(tex);
            span.onclick = function() {
              alert("value :" + this.firstChild.nodeValue);
                this.parentNode.removeChild(this);
            }
            var spans = showData.getElementsByTagName("span");
            if (spans.length == 0) {
                showData.appendChild(span);
            } else {
                showData.insertBefore(span, spans[0]);
            }
        }
    }
}

/*右侧入*/
function rightIn() {
    if (!document.getElementById("rightIn")) return false;

    var btn = document.getElementById("rightIn");
    btn.onclick = function() {
        if (text.value == "") {

            alert("请输入数据");
        } else {

            var span = document.createElement("span");
            var tex = document.createTextNode(text.value);
            span.appendChild(tex);
            span.onclick = function() {
              alert("value :" + this.firstChild.nodeValue);
                this.parentNode.removeChild(this);
            }
            showData.appendChild(span);

        }
    }
}

/*左侧出*/

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
function init(){

  leftIn()
  rightIn()
  Out()
  deleteData()
}

window.onload = init;
