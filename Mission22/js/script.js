function BT(id,data){
  this.boot = document.getElementById(id);
  this.div = document.getElementById(id);
  this.left =null;
  this.right = null;
  this.data = data;
  this.insert = insert;
}

function node(data,left,right){
  this.data = data;
  this.left = left;
  this.right = right;
  this.div = null;
}

function insert(data){
  if(this.boot == null){
    return;
  }
  var n = new node(data,null,null);
  var div = document.createElement("div");
  var span = document.createElement("span");
  var a = document.createElement("a");

  div.appendChild(span);

  var current = this;
  var parent;
  var currentDiv = this.boot;

  while (true) {
    if(data > current.data){
      parent = current;
      current = current.right;
      currentDiv = currentDiv.getElementsByTagName("div")[0].nextSibling.nextSibling;
      if(current == null){
        var num = document.createTextNode(data);
        a.appendChild(num);
        currentDiv.appendChild(a);
        n.div = currentDiv;
        n.div.style.border = "4px #cdf solid";
        parent.right = n;
        return;
      }
    }

    if(data < current.data){
      parent = current;
      current = current.left;
      currentDiv = currentDiv.getElementsByTagName("div")[0];

      if(current == null){
        var num = document.createTextNode(data);
        a.appendChild(num);
        currentDiv.appendChild(a);
        n.div = currentDiv;
        n.div.style.border = "4px #cdf solid";
        parent.left = n;
        return;
      }
    }
  }


}

var time = 0;
var orderlist =[];
function Tictok(){
  if(time == orderlist.length){
    orderlist[orderlist.length - 1].div.style.border ="#cdf solid 4px";
    clearInterval(interval);
    time = 0;
    return;
  }
  orderlist[time].div.style.border ="tomato solid 4px";
  if(time){
    orderlist[time-1].div.style.border ="#cdf solid 4px";
  }
  time++;

}

function preOrder(node){
  if(node){
    orderlist.push(node)
    preOrder(node.left);
    preOrder(node.right);
  }
}

function midOrder(node) {
  if(node){

    preOrder(node.left);
    orderlist.push(node)
    preOrder(node.right);
  }
}
function backOrder(node) {
  if(node){

    preOrder(node.left);

    preOrder(node.right);
    orderlist.push(node)
  }
}
   var bt = new BT("boot",10);
   bt.insert(6);
 bt.insert(15)
  bt.insert(19)
  bt.insert(13)
  bt.insert(11)
  bt.insert(14)
  bt.insert(4)
  bt.insert(8)
  bt.insert(1)
  bt.insert(5)
  bt.insert(9)
  bt.insert(7)


var interval1,interval2,interval3  ;
var preButton = document.getElementById("preButton");
var midButton = document.getElementById("middleButton");
var backButton = document.getElementById("backButton");

preButton.onclick=function(){
   orderlist =[];
  preOrder(bt);
  interval = setInterval(Tictok,1000);
}
midButton.onclick=function(){
   orderlist =[];
  midOrder(bt);
  interval = setInterval(Tictok,1000);
}

backButton.onclick=function(){
   orderlist =[];
  backOrder(bt);
  interval = setInterval(Tictok,1000);
}
