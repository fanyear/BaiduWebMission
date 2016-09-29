/*显示删除*/
function Delete() {
    var contents = document.getElementsByClassName("content");
    for (var i = 0; i < contents.length; i++) {
        var spans = contents[i].getElementsByTagName("span");
        for (var j = 0; j < spans.length; j++) {
            spans[j].onmouseover = function() {
                var text = this.firstChild.nodeValue;
                text = "点击删除" + text;
                this.firstChild.nodeValue = text;
            }
            spans[j].onmouseout = function() {
                var text = this.firstChild.nodeValue;
                text = text.slice(4);
                this.firstChild.nodeValue = text;

            }
            spans[j].onmousedown = function() {
                this.parentNode.removeChild(this);
            }
        }
    }
}

/*tag function*/
function tagFunction(id) {
    var tag = document.getElementById(id);
    var input = tag.getElementsByTagName("input");

    input[0].onkeypress = function() {
        if (event.keyCode == 13) {
            var content = tag.getElementsByTagName("div");
            var text = this.value;
              var reg = /[^\u4e00-\u9fa5|\w]+/;
            var finalList = text.split(reg);
            for (var i = 0; i < finalList.length; i++) {
                var span = document.createElement("span");
                var textNode = document.createTextNode(finalList[i]);
                span.appendChild(textNode);
                var spans = content[0].getElementsByTagName("span");

                if(spans.length>=10){
                  content[0].removeChild(spans[0]);
                }
                content[0].appendChild(span);
            }

        }
        Delete();
    }

}

/*textarea function*/
function textareaFunction(id) {
    var tag = document.getElementById(id);
    var input = tag.getElementsByTagName("textarea");
    var btn = tag.getElementsByTagName("button");

    btn[0].onclick = function() {

        var content = tag.getElementsByTagName("div");
        var text = input[0].value;
        var reg = /[^\u4e00-\u9fa5|\w]+/;// [^\u4e00-\u9fa5|\w]+
        var finalList = text.split(reg);
        for (var i = 0; i < finalList.length; i++) {
            var span = document.createElement("span");
            var textNode = document.createTextNode(finalList[i]);
            span.appendChild(textNode);
            var spans = content[0].getElementsByTagName("span");

            if(spans.length>=10){
              content[0].removeChild(spans[0]);
            }

            content[0].appendChild(span);
        }


        Delete();
    }

}

Delete();
tagFunction("tagOne")

tagFunction("tagTwo")
textareaFunction("textareaOne")
