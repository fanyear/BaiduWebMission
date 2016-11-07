

var s1 = document.getElementById("student")
var s2 = document.getElementById("noStudent")

var school = document.getElementById("school")
var workUnit = document.getElementById("workUnit")

var citySelect = document.getElementById("city")
var schoolsSelect = document.getElementById("schoolsSelect")
var city = ["北京","上海","广州"];
var schools = [["清华大学","北京大学","中国人民大学"],["上海交通大学","同济大学","上海大学"],["中山大学","华南理工大学","华南师范大学"]]

citySelect.onchange = function(){
    var index = this.selectedIndex;
    var children = schoolsSelect.childNodes
    while (children.length) {
      schoolsSelect.removeChild(schoolsSelect.firstChild)
    }
    for(var i=0;i<schools[index].length;i++){
      var option = document.createElement("option");
      var text = document.createTextNode(schools[index][i]);
      option.appendChild(text);
      schoolsSelect.appendChild(option);
    }

}

s1.onclick=function(){
  school.style.display = "block";
  workUnit.style.display = "none";
}
s2.onclick=function(){
  school.style.display = "none";
  workUnit.style.display = "block";
}
