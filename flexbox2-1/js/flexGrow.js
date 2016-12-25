var item3 = document.getElementById("item3")
var choice = document.getElementById("choice")
var button = choice.getElementsByTagName("button")

button[0].onclick = function(){
  item3.style.flexGrow = "2";
}
button[1].onclick = function(){
  item3.style.flexGrow = "3";
}
button[2].onclick = function(){
  item3.style.flexGrow = "4";
}
