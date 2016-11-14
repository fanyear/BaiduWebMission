window.onload = function() {
    addTableControl("table", 1,largeSort,smallSort);
    addTableControl("table", 2,largeSort,smallSort);
    addTableControl("table", 3,largeSort,smallSort);
    addTableControl("table", 4,largeSort,smallSort);
}

function addTableControl(id, index, f1, f2) {
    var table = document.getElementById(id);
    var list = table.getElementsByTagName("tr");
    var datas = []

    if (list.length >= 2) {
        ths = table.getElementsByTagName("th")
        var spans = ths[index].getElementsByTagName("span")

        if (spans.length) {
            spans[0].onclick = function() {
                datas = addTds(list);
                remove(table);
                datas.sort(f1(index))
                buildTable(table,datas)
            }
            spans[1].onclick = function() {
                datas = addTds(list);
                remove(table);
                datas.sort(f2(index))
                buildTable(table,datas)
            }
        }
    } else {
        return false;
    }

}

function remove(table) {
    while (true) {

        var l = table.getElementsByTagName("tr");
        if (l.length == 1) {
            break;
        }
        l[l.length - 1].parentNode.removeChild(l[l.length - 1])
    }
}


function addTds(list) {
    var datas = []
    for (var i = 1; i < list.length; i++) {
        var td = [];
        var tds = list[i].getElementsByTagName("td");
        for (var j = 0; j < tds.length; j++) {
            td.push(tds[j].firstChild.nodeValue)
        }
        datas.push(td)
    }
    return datas;
}

function largeSort(index){
  return function(a,b){
    var a1 = parseInt(a[index])
    var b1 = parseInt(b[index])
    return b1 - a1
  }
}

function smallSort(index){
  return function(a,b){
    var a1 = parseInt(a[index])
    var b1 = parseInt(b[index])
    return a1 - b1
  }
}

function buildTable(table,datas){
    for (var i = 0; i < datas.length; i++) {
      var tr = document.createElement("tr")
        for (var j = 0; j < datas[i].length; j++) {
          var td = document.createElement("td");
          var text = document.createTextNode(datas[i][j]);
          td.appendChild(text)
          tr.appendChild(td)
        }
      table.appendChild(tr)
    }
}
