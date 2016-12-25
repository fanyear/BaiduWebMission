var test = document.getElementById("test")
var container = document.getElementById("container")
var choice = document.getElementById("choice")
var divs = choice.getElementsByTagName("div")
var item = document.getElementById("item")
console.log(item);
window.onload=function(){

  for (var i = 0; i < divs.length; i++) {
    var property  = divs[i].getElementsByTagName("a")[0].getAttribute("alt")
    var btns = divs[i].getElementsByTagName("button")

    for (var j = 0; j < btns.length; j++) {
      btns[j].property = property
      btns[j].div = divs[i]
      btns[j].onclick = function(){
        item.style[this.property] = this.innerHTML;
        var bs = this.div.getElementsByTagName("button")
        for (var k = 0; k < bs.length; k++) {
          bs[k].style.background = "tomato"
        }
        this.style.background = "#000"
      }
    }

  }
}
