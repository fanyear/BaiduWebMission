
var frame = document.getElementById("frame")
var header = document.getElementById("header")
var frameStop = null;
var opacity1 = 100;
var opacity2  = 1.0;
var num = 10;
var numFlag = false;
var numStop= null;

window.onload=function(){

numStop=  setInterval(function(){
    num--;
    if(num <= 0){
      clearInterval(numStop);
      frameStop = setInterval(function(){
        opacity1 -= 10;
        opacity2 -= 0.1;
          header.style.filter = "alpha(opacity="+opacity1+")";
          header.style.opacity = opacity2;

          if(opacity1 <= 0){
            header.style.display = "none"
            clearInterval(frameStop)
          }
      },100)
    }
  },1000)


}
