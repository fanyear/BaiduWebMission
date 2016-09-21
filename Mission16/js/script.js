/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function delBlank(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
}

function addAqiData() {
    if (!document.getElementById) return false;

    var cityInput = document.getElementById("aqi-city-input");
    var numInput = document.getElementById("aqi-value-input");
    var table = document.getElementById("aqi-table");

    var btn = document.getElementById("add-btn");
    btn.onclick = function() {

        if (cityInput.value == "") {
            alert("请输入城市名称");
            return false;
        }
        if (numInput.value == "") {
            alert("请输入空气质量指数");
            return false;
        }
        var reg1 = /^[A-Za-z]+$/;
        var reg2 = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        if (!reg1.test(cityInput.value) && !reg2.test(cityInput.value)) //判断是否符合正则表达式
        {
            alert("请输入正确的城市名称（英文或中文）");
            return false;
        }

        var reg3 = /^[1-9]+[0-9]*]*$/;
        if(!reg3.test(numInput.value))
        {
          alert("请输入正整数")
          return false;
        }
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var btnDelete = document.createElement("button");

        var cityText = document.createTextNode(delBlank(cityInput.value));
        var numText = document.createTextNode(numInput.value);
        var btnText = document.createTextNode("删除");
        td1.appendChild(cityText);
        td2.appendChild(numText);
        btnDelete.appendChild(btnText);
        td3.appendChild(btnDelete);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        btnDelete.onclick = function() {
            var parent = this.parentNode;
            parent = parent.parentNode;
            parent.parentNode.removeChild(parent);
        }
        table.appendChild(tr);

    }


}


/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    if (!document.getElementById) return false;
    var table = document.getElementById("aqi-table");
    var btns = table.getElementsByTagName("button");
    for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = function() {
            var parent = this.parentNode;
            parent = parent.parentNode;
            parent.parentNode.removeChild(parent);
        }
    }
}

function init() {
    addAqiData(); // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    delBtnHandle() // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
