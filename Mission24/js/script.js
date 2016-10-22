function node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
    this.span = null;
    this.beSelected = false;
}

function tree(data, id) {
    var n = new node(data);
    n.span = document.getElementById(id);
    this.root = n;
    this.traverse = traverse;
    this.search = search;
    this.addNode = addNode;
    this.select = select;
    this.selectedNode = null;
    this.interval = null;
}

function traverse() {
    var list = [];
    var index = 0;
    var interval;
    var tree = this;

    function traverseChildren(node) {
        for (var i = 0; i < node.children.length; i++) {
            traverseChildren(node.children[i]);
        }
        node.span.getElementsByTagName("dot")[0].style.background = "#666";
        node.beSelected=true;

          for (var i = 0; i < node.children.length; i++) {
              node.children[i].span.style.display = "block";
          }

        list.push(node);
    }

    traverseChildren(this.root);

    function show() {
        if (index === list.length+1) {
            clearInterval(tree.interval);
            return;
        }
        if(index){
          list[index-1].span.getElementsByTagName("a")[0].style.color = "#fff";
        }
        if(index < list.length){
          list[index].span.getElementsByTagName("a")[0].style.color = "tomato";
        }



        index++;
    }
    tree.interval = setInterval(show, 600)
}

function search(data) {
    var list = [];
    var index = 0;
    var tree = this;
    var stop = false;
    var nodeList = [];
    var flag = false;

    function searchChildren(node) {
        if(!flag){
          flag = true;
          nodeList.push(node);
        }
        for (var i = 0; i < node.children.length; i++) {
           nodeList.push(node.children[i]);
        }
        for (var i = 0; i < node.children.length; i++) {
          searchChildren(node.children[i]);
        }


    }
    searchChildren(this.root);

    function show() {
        if (data == nodeList[index].data) {

              nodeList[index].span.getElementsByTagName("a")[0].style.color = "tomato";
              nodeList[index-1].span.getElementsByTagName("a")[0].style.color = "#fff";

            clearInterval(tree.interval);
            return;
        }

        if(index){
        nodeList[index-1].span.getElementsByTagName("a")[0].style.color = "#fff";
        }
        if(index < nodeList.length){
            nodeList[index].span.getElementsByTagName("a")[0].style.color = "tomato";
        }
        if(!nodeList[index].beSelected && nodeList[index].children.length){
          nodeList[index].beSelected=true;
          nodeList[index].span.getElementsByTagName("dot")[0].style.background = "#666";
          for (var i = 0; i <   nodeList[index].children.length; i++) {
                nodeList[index].children[i].span.style.display = "block";
          }
        }
        index++;
    }
    tree.interval = setInterval(show, 500)
}

function addNode(data, toData) {
    function addChildren(nod) {
        for (var i = 0; i < nod.children.length; i++) {
            addChildren(nod.children[i]);
        }
        if (nod.data == toData) {
            var n = new node(data);

            n.parent = nod;
            var a = document.createElement("a");
            var text = document.createTextNode(data);
            var dot = document.createElement("dot");

            a.appendChild(text);

            var span = document.createElement("span");
            span.appendChild(dot);
            dot.style.background ="#666";
            dot.style.border = "#666 3px solid";

            if(nod.children.length == 0){

              nod.span.getElementsByTagName("dot")[0].style.border="#ADFF2F 3px solid" ;
            }
            nod.children.push(n);

            span.appendChild(a);
            nod.span.appendChild(span);
            n.span = span;
            if (nod.beSelected) {
                n.span.style.display = "block";
                nod.span.getElementsByTagName("dot")[0].style.background = "#666"
            } else {
                n.span.style.display = "none";
                nod.span.getElementsByTagName("dot")[0].style.background = "#ADFF2F";
            }

        }
    }

    addChildren(this.root);
}

function select() {
    function addChildren(Node) {

        for (var i = 0; i < Node.children.length; i++) {
            addChildren(Node.children[i], arguments[1]);
        }
        var tree = arguments[1];
        Node.span.getElementsByTagName("a")[0].onclick = function() {
            Node.beSelected = !Node.beSelected;

            if(tree.selectedNode == null){
            tree.selectedNode  = Node;
            Node.span.getElementsByTagName("a")[0].style.color="tomato";
          }else{
            tree.selectedNode.span.getElementsByTagName("a")[0].style.color="#fff";
            tree.selectedNode  = Node;
            Node.span.getElementsByTagName("a")[0].style.color="tomato";
          }

            if (Node.beSelected) {
              if (Node.span.getElementsByTagName("dot")[0]){
            Node.span.getElementsByTagName("dot")[0].style.background = "#666";
              }

                for (var i = 0; i < Node.children.length; i++) {
                    Node.children[i].span.style.display = "block";
                }
            } else {
                  if (Node.span.getElementsByTagName("dot")[0] && Node.children.length){
                Node.span.getElementsByTagName("dot")[0].style.background = "#ADFF2F";
                  }

                for (var i = 0; i < Node.children.length; i++) {
                    function allChildren(selectNode) {
                        for (var i = 0; i < selectNode.children.length; i++) {
                            allChildren(selectNode.children[i]);
                        }
                        selectNode.span.style.display = "none";
                        selectNode.beSelected = false;
                        if(selectNode.children.length!= 0){
                          selectNode.span.getElementsByTagName("dot")[0].style.background = "#ADFF2F";
                        }
                      }

                      allChildren(Node.children[i]);
                }


            }


        }
    }
    addChildren(this.root, this);
}

function btn(tree) {
    var traverseBtn = document.getElementById("traverse");
    var search = document.getElementById("search");
    var input = document.getElementById("input");
    var add = document.getElementById("add");
    var input2 = document.getElementById("input2");

    search.onclick = function() {
        if (input.value) {
            tree.search(input.value);
        }
    }
    traverseBtn.onclick = function() {
        tree.traverse();
    }
    add.onclick = function() {
        if (tree.selectedNode != null && input2.value) {
            var n = new node(input2.value)
            var parent = tree.selectedNode;

            if(parent.children.length == 0){
              parent.span.getElementsByTagName("dot")[0].style.border="#ADFF2F 3px solid" ;
            }
            parent.children.push(n);

            n.parent = parent;
            var a = document.createElement("a");
            var text = document.createTextNode(input2.value);
            a.appendChild(text);

            var span = document.createElement("span");
            var dot = document.createElement("dot");
            dot.style.background ="#666";
            dot.style.border = "#666 3px solid";

            span.appendChild(dot);
            span.appendChild(a);
            parent.span.appendChild(span);
            n.span = span;
            input2.value = "";
            tree.select()
        }
    }

    del.onclick = function() {
        if (tree.selectedNode != null) {
            var node = tree.selectedNode;
            var nodeIndex;
            for (var i = 0; i < node.parent.children.length; i++) {
                if (node.parent.children[i] === node) {
                    nodeIndex = i;
                    break;
                }
            }
            node.parent.children.splice(nodeIndex, 1);
            if(node.parent.children==0){
              node.parent.span.getElementsByTagName("dot")[0].style.border="#666 3px solid";
            }
            function Children(Node) {

                for (var i = 0; i < Node.children.length; i++) {
                    Children(Node.children[i], arguments[1]);
                }
                Node.parent.span.removeChild(Node.span);
            }
            Children(node);
        }

    }
}


var newTree = new tree("root", "root");

newTree.addNode("自动化", "root")
newTree.addNode("自动化1班", "自动化")
newTree.addNode("自动化2班", "自动化")
newTree.addNode("自动化3班", "自动化")
newTree.addNode("电气及其自动化", "root")
newTree.addNode("电气及其自动化1班", "电气及其自动化")
newTree.addNode("电气及其自动化2班", "电气及其自动化")
newTree.addNode("电气及其自动化3班", "电气及其自动化")
newTree.addNode("测控", "root")
newTree.addNode("测控1班", "测控")
newTree.addNode("测控3班", "测控")
newTree.addNode("测控2班", "测控")
newTree.addNode("测控4班","测控")
newTree.select()
btn(newTree)
