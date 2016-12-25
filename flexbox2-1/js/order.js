var item5 = document.getElementById("item5")
var choice = document.getElementById("choice")
var button = choice.getElementsByTagName("button")

button[0].onclick = function(){
  item5.style.order = "-1";
}
button[1].onclick = function(){
  item5.style.order = "0";
}
button[2].onclick = function(){
  item5.style.order = "1";
}
