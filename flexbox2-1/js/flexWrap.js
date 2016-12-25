var container = document.getElementById("container")
var choice = document.getElementById("choice")
var button = choice.getElementsByTagName("button")

button[0].onclick = function(){
  container.style.flexWrap = "nowrap";
}
button[1].onclick = function(){
  container.style.flexWrap = "wrap"; 
}
button[2].onclick = function(){
  container.style.flexWrap = "wrap-reverse";
}
