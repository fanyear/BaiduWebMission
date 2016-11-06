var form = document.getElementById("form");
var submit = document.getElementById("submit");
var passwordInput;
var inputs = [];

var nameI = new Input("名称", "text", "真实姓名", checkName, "名称格式正确", "名称格式错误");
var pswI = new Input("密码", "password", "不少于6位，不多于16位", checkPsw, "密码可用", "密码不可用");
var pswAgainI = new Input("密码确认", "password", "再次输入相同密码", checkPswAgain, "密码输入一致", "密码输入不一致");
var mailI = new Input("邮箱", "text", "输入可用邮箱", checkMail, "邮箱格式正确", "邮箱格式错误");
var phoneI = new Input("手机", "text", "输入11位手机号码", checkPhone, "手机格式正确", "手机格式错误");

inputs.push(nameI)
inputs.push(pswI)
inputs.push(pswAgainI)
inputs.push(mailI)
inputs.push(phoneI)

window.onload = function() {
    addInputs();
    submit.onclick = function(){
      checkAll();
    }
}

function addInputs(){
  for (var i = 0; i < inputs.length; i++) {
    addInput(inputs[i])
  }
}

function Input(nam, type, tip, check, success, failure) {
    this.nam = nam;
    this.tip = tip;
    this.check = check;
    this.success = success;
    this.failure = failure;
    this.type = type;
    this.div = null;
}

function checkPsw(obj) {
    var input = obj.div.getElementsByTagName("input")[0];
    var text = input.value;
    passwordInput = text;

    if (text.length >= 6 && text.length <= 16) {
        return true;
    } else {
        return false;
    }
}

function checkName(obj) {
    var input = obj.div.getElementsByTagName("input")[0];
    var text = input.value;
    console.log(text.length);
    if (text.length >= 2) {
        return true;
    } else {
        return false;
    }
}

function checkPswAgain(obj) {
    var input = obj.div.getElementsByTagName("input")[0];
    var text = input.value;

    if (!passwordInput) {
        return false;
    }
    if (passwordInput == text && text.length >= 6 && text.length <= 16) {
        return true;
    } else {
        return false;
    }
}

function checkMail(obj) {
    var input = obj.div.getElementsByTagName("input")[0];
    var text = input.value;

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (filter.test(text)){
      return true;
    } else {
        return false;
    }

}

function checkPhone(obj) {
    var input = obj.div.getElementsByTagName("input")[0];
    var text = input.value;
    var num = Number(text)
    var str = num.toString()

    if (!num) {
        return false
    }
    if (str.length == 11) {
        return true
    } else {
        return false;
    }

}

function addInput(obj) {
    var div = document.createElement("div");
    var span = document.createElement("span");
    var input = document.createElement("input");
    var tip = document.createElement("tip");
    var tipText = document.createTextNode(obj.tip);

    var text1 = document.createTextNode(obj.nam);

    span.appendChild(text1);
    tip.appendChild(tipText);

    input.setAttribute("type", obj.type);
    input.setAttribute("name", obj.name);

    div.appendChild(span);
    div.appendChild(input);
    div.appendChild(tip);

    obj.div = div;

    form.insertBefore(div, submit);

    input.onfocus = function() {
        tip.style.display = "block";
        tip.firstChild.nodeValue = obj.tip;
        tip.style.color = "#bbb";
        input.style.border = "#6CBEEB 2px solid"
    }
    input.onblur = function() {
        var result = obj.check(obj)
        if (result) {
            tip.style.display = "block";
            tip.style.color = "#76D68F";
            input.style.border = "#76D68F 2px solid"
            tip.firstChild.nodeValue = obj.success;
        } else {
            tip.style.display = "block";
            tip.style.color = "#F72F2F";
            input.style.border = "#F72F2F 2px solid"
            tip.firstChild.nodeValue = obj.failure;
        }

    }

}

function checkAll(){
  var flag = true;
  for (var i = 0; i < inputs.length; i++) {
    var result = inputs[i].check(inputs[i])
    if (result) {
        inputs[i].div.getElementsByTagName("tip")[0].style.display = "block";
        inputs[i].div.getElementsByTagName("tip")[0].style.color = "#76D68F";
        inputs[i].div.getElementsByTagName("input")[0].style.border = "#76D68F 2px solid"
        inputs[i].div.getElementsByTagName("tip")[0].firstChild.nodeValue = inputs[i].success;
    } else {
      flag = false;
        inputs[i].div.getElementsByTagName("tip")[0].style.display = "block";
        inputs[i].div.getElementsByTagName("tip")[0].style.color = "#F72F2F";
        inputs[i].div.getElementsByTagName("input")[0].style.border = "#F72F2F 2px solid"
        inputs[i].div.getElementsByTagName("tip")[0].firstChild.nodeValue = inputs[i].failure;
    }
  }
  if(!flag){
    alert("输入有误")
  }
}
