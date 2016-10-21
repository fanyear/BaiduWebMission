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
}

function traverse() {
    var list = [];
    var index = 0;
    var interval;

    function traverseChildren(node) {
        for (var i = 0; i < node.children.length; i++) {
            traverseChildren(node.children[i]);
        }
        node.span.style.background = "#aaa";
        list.push(node);
    }

    traverseChildren(this.root);

    function show() {
        if (index === list.length) {
            clearInterval(interval);
            return;
        }
        list[index].span.style.background = "#666";
        index++;
    }
    interval = setInterval(show, 600)
}

function search(data) {
    var list = [];
    var index = 0;
    var interval;
    var stop = false;

    function searchChildren(node) {
        for (var i = 0; i < node.children.length; i++) {
            searchChildren(node.children[i]);
        }
        node.span.style.background = "#aaa";
        if (!stop) {
            list.push(node);
        }
        if (node.data == data) {
            stop = true;
            return node;
        }

    }
    searchChildren(this.root);

    function show() {
        if (index === list.length - 1) {
            if (stop) {
                list[index].span.style.background = "tomato";
            } else {
                list[index].span.style.background = "#666";

            }
            clearInterval(interval);

            return;
        }
        list[index].span.style.background = "#666";
        index++;
    }
    interval = setInterval(show, 600)
}

function addNode(data, toData) {
    function addChildren(nod) {
        for (var i = 0; i < nod.children.length; i++) {
            addChildren(nod.children[i]);
        }
        if (nod.data == toData) {
            var n = new node(data);
            nod.children.push(n);
            n.parent = nod;
            var a = document.createElement("a");
            var text = document.createTextNode(data);
            a.appendChild(text);

            var span = document.createElement("span");
            span.appendChild(a);
            nod.span.appendChild(span);
            n.span = span;

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
            Node.span.style.background = "blue";
            if (tree.selectedNode == null) {
                tree.selectedNode = Node;
            } else {
                tree.selectedNode.span.style.background = "#aaa";
                tree.selectedNode = Node;
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
    add.onclick = function(){
      if(tree.selectedNode!=null && input2.value){
          var n = new node(input2.value)
          var parent = tree.selectedNode;

          parent.children.push(n);
          n.parent = parent;
          var a = document.createElement("a");
          var text = document.createTextNode(input2.value);
          a.appendChild(text);

          var span = document.createElement("span");
          span.appendChild(a);
          parent.span.appendChild(span);
          n.span = span;
          tree.select()
      }
    }

    del.onclick = function(){
      if(tree.selectedNode!=null )
      {
        var node = tree.selectedNode;
        var nodeIndex ;
        for (var i = 0; i < node.parent.children.length; i++) {
            if(node.parent.children[i] === node){
               nodeIndex = i;
               break;
            }
        }
         node.parent.children.splice(nodeIndex,1);
         function Children(Node) {

             for (var i = 0; i < Node.children.length; i++) {
                 Children(Node.children[i], arguments[1]);
             }
             Node.parent.span.removeChild(Node.span);
           }
      }
      Children(node);
    }
}

var Tree = new tree("1", "boot");
Tree.addNode("2", "1");
Tree.addNode("3", "1");
Tree.addNode("4", "1");
Tree.addNode("5", "1");
Tree.addNode("6", "2");
Tree.addNode("7", "2");
Tree.addNode("8", "2");
Tree.addNode("9", "3");
Tree.addNode("10", "3");
Tree.addNode("11", "4");
Tree.addNode("12", "4");
Tree.addNode("13", "4");
Tree.addNode("14", "5");
Tree.addNode("15", "6");
Tree.addNode("16", "6");
Tree.addNode("17", "9");
Tree.addNode("18", "9");
Tree.addNode("19", "9");

Tree.select();
btn(Tree);
