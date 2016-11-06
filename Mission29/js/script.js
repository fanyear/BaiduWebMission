var input = document.getElementById("input");
var check = document.getElementById("check")
var tip = document.getElementById("tip");

function isChinese(temp) {
    var re = /[^\u4e00-\u9fa5]/;
    if (re.test(temp)) {
        return false
    } else {
        return true
    }
}
window.onload = function() {
    input.onfocus = function() {

        //  var tipText = document.createTextNode("必填，长度为4~16个字符")
        //  tip.appendChild(tipText);
        tip.lastChild.nodeValue = "必填，长度为4~16个字符"
        input.style.border = "2px #bbb solid"
        tip.style.color = "#bbb" 
    }
    input.onblur = function() {
        tip.lastChild.nodeValue = " "
    }
    check.onclick = function() {
        var text = input.value;
        checkText(text);
    }
}

function checkText(text) {
    var realLength = 0;

    if (text == "") {
        tip.lastChild.nodeValue = "姓名不能为空"
        input.style.border = "2px #F72F2F solid"
        tip.style.color = "#F72F2F"
        return false;
    }
    for (var i = 0; i < text.length; i++) {
        if (isChinese(text[i])) {
            realLength += 2
        } else {
            realLength++;
        }
    }

    if(realLength >=4 && realLength <=16){
      tip.lastChild.nodeValue = "名称格式正确"
      input.style.border = "2px #76D68F solid"
      tip.style.color = "#76D68F"
    }else{
      tip.lastChild.nodeValue = "名称格式错误"
      input.style.border = "2px #F72F2F solid"
      tip.style.color = "#F72F2F"
    }

}
