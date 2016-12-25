var container = document.getElementById("container")
var choice = document.getElementById("choice")
var button = choice.getElementsByTagName("button")

button[0].onclick = function(){
  container.style.flexDirection = "row";
}
button[1].onclick = function(){
  container.style.flexDirection = "row-reverse";
}
button[2].onclick = function(){
  container.style.flexDirection = "column";
}
button[3].onclick = function(){
  container.style.flexDirection = "column-reverse";
}
