var left = document.getElementById("left");
var right = document.getElementById("right");
var selectYear = document.getElementById("selectYear");
var selectMonth = document.getElementById("selectMonth");
var dateDiv = document.getElementById("date");
var open = document.getElementById("open");
var dateResult = document.getElementById("dateResult")
var calendar = document.getElementById("calendar")
var date = new Date(2017, 0, 1)
var clickBtn = 0;
var preDate = null;
var curDay = 0;
var slts = [];
var sltss = []

window.onload = function() {
    calendarInit();
    selectDate();
    dateBtnInit();
}

function dateBtnInit() {
    open.onclick = function(e) {
        e.stopPropagation()
        clickBtn++;
        clickBtn %= 2;
        if (clickBtn) {
            calendar.style.display = "inline-block";
        } else {
            calendar.style.display = "none";
        }
        cfmDate(curDay, date)

    }
    calendar.onclick = function(e) {
        e.stopPropagation()
    }
    document.body.onclick = function() {
        calendar.style.display = "none";
        clickBtn = 0;
        cfmDate(curDay, date)
    }
}

function cfmDate(slts) {
    if (slts.length == 2) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d1 = 0;
        var d2 = 0;
        var text =0;
        var textNode =null;
          if(slts[0].day >slts[1].day){
            d1 = slts[1].day;
            d2 = slts[0].day;
          }else{
            d1 = slts[0].day;
            d2 = slts[1].day;
          }
        text = y + "-" + m + "-" + d1 + " TO "+y + "-" + m + "-" + d2;
         textNode = document.createTextNode(text);
        dateResult.innerHTML = text;

    }
}

function selectDate() {
    selectYear.onchange = function() {
        var newYear = parseInt(selectYear.value);
        var newMonth = parseInt(selectMonth.value) - 1;
        date = new Date(newYear, newMonth, 1)

        refreshDate(date)
    }
    selectMonth.onchange = function() {
        var newYear = parseInt(selectYear.value);
        var newMonth = parseInt(selectMonth.value) - 1;
        date = new Date(newYear, newMonth, 1);
        refreshDate(date)
    }
    left.onclick = function() {
        var newYear = date.getFullYear()
        var newMonth = date.getMonth();
        if (newMonth == 0) {
            newYear -= 1;
            newMonth = 11;
        } else {
            newMonth -= 1;
        }
        date = new Date(newYear, newMonth, 1);
        refreshSelect(newYear, newMonth + 1)
        refreshDate(date)
    }
    right.onclick = function() {
        var newYear = date.getFullYear()
        var newMonth = date.getMonth();
        if (newMonth == 11) {
            newYear += 1;
            newMonth = 0;
        } else {
            newMonth += 1;
        }
        date = new Date(newYear, newMonth, 1);
        refreshSelect(newYear, newMonth + 1)
        refreshDate(date)
    }
}

function refreshSelect(newYear, newMonth) {
    var years = selectYear.getElementsByTagName("option");
    var months = selectMonth.getElementsByTagName("option");
    var flag = false;
    for (var i = 0; i < years.length; i++) {
        if (years[i].value == newYear) {
            years[i].selected = true;
            flag = true;
            break;
        }

    }
    for (var j = 0; j < months.length; j++) {
        if (months[j].value == newMonth) {
            months[j].selected = true;
            break;
        }
    }

    if (newYear > 2017 && !flag) {
        var option = document.createElement("option");
        var text = document.createTextNode(newYear);
        option.setAttribute("value", newYear);
        option.selected = true;
        option.appendChild(text);
        selectYear.insertBefore(option, years[0])

    } else if (newYear < 2006 && !flag) {
        var option = document.createElement("option");
        var text = document.createTextNode(newYear);
        option.setAttribute("value", newYear)
        option.selected = true;
        option.appendChild(text);
        selectYear.appendChild(option);

    }
}

function refreshDate(newDate) {
    var year = newDate.getFullYear();
    var month = newDate.getMonth();
    var dayOfWeek = newDate.getDay();
    var day = newDate.getDate();
    var days = daysOfMonth(year, month);
    var lastDays = 0;

    if (month == 0) {
        lastDays = daysOfMonth(year - 1, 11)
    } else {
        lastDays = daysOfMonth(year, month - 1)
    }

    clearDate();
    createDate(dayOfWeek, days, lastDays);
}

function clearDate() {
    while (true) {
        if (dateDiv.firstChild) {
            dateDiv.removeChild(dateDiv.firstChild)
        } else {
            break;
        }

    }
}

function calendarInit() {
    var year = date.getFullYear();
    var month = date.getMonth();
    var dayOfWeek = date.getDay();
    var day = date.getDate();
    var days = daysOfMonth(year, month);
    var lastDays = 0;

    if (month == 0) {
        lastDays = daysOfMonth(year - 1, 11)
    } else {
        lastDays = daysOfMonth(year, month - 1)
    }

    createDate(dayOfWeek, days, lastDays);


}

function createDate(dw, ds, lds) {

    var days = 0;
    var nextMonthDays = 0;
    for (var i = 0; i < dw; i++) {
        var span = document.createElement("span");
        var text = document.createTextNode(lds - dw + 1 + i);
        span.className = "notThisMonth";
        span.appendChild(text);
        dateDiv.appendChild(span);
    }
    for (var j = 1; j <= ds; j++) {
        var span = document.createElement("span");
        var text = document.createTextNode(j);
        span.className = "thisMonth";
        (function(j) {
            var tem = j;
            span.onclick = function() {
              var ds = 0;
              var smallDay = 0;
              var curDay = 0;
              if(slts.length <= 1){
                this.day = j;
                this.style.background = "#347EBF"
                slts.push(this);
              }else if(slts.length >=2){
                slts[0].style.background = "#fff";
                slts[1].style.background = "#fff";
                slts = [];


                for (var i = 0; i < sltss.length; i++) {
                  sltss[i].style.background = "#fff";
                  sltss[i].style.borderRadius = "5px";
                }
                sltss=[];
                this.style.background = "#347EBF"
                slts.push(this);
                this.day = j;
              }

              if(slts.length ==2){
                  ds = Math.abs(slts[0].day - slts[1].day)
                   if(slts[0].day>slts[1].day){
                     smallDay = slts[1];
                   }else{
                    smallDay =  slts[0];
                   }
                 while (ds !=1) {
                   console.log(smallDay);
                   curDay = smallDay.nextSibling;
                   sltss.push(curDay)
                   curDay.style.background = "#EBF4F9";
                    curDay.style.borderRadius = "0";
                   ds--;
                   smallDay = curDay;
                 }
              }
                curDay = tem;
                cfmDate(slts)
            }
        })(j)

        span.appendChild(text);
        dateDiv.appendChild(span);
    }
    days = dateDiv.getElementsByTagName("span")
    nextMonthDays = 7 - days.length % 7;
    if (nextMonthDays == 7) {
        nextMonthDays = 0;
    }
    for (var k = 1; k <= nextMonthDays; k++) {
        var span = document.createElement("span");
        var text = document.createTextNode(k);
        span.className = "notThisMonth";
        span.appendChild(text);
        dateDiv.appendChild(span);
    }
}

function daysOfMonth(y, m) {
    if (m == 0 || m == 2 || m == 4 || m == 6 || m == 7 || m == 9 || m == 11) {
        return 31;
    } else if (m == 3 || m == 5 || m == 8 || m == 10) {
        return 30;
    } else if (m == 1) {
        if (y % 4 == 0) {
            return 29
        } else {
            return 28
        }
    }
}
