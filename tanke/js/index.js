//绑定按钮事件
var bindEventWelcome = function() {
    var element = e('#id-btn-welcome')
    bindEvent(element, 'click', function() {
        hideWelcome()
    })
}

//隐藏欢迎界面
var hideWelcome = function() {
    var elements = es('.welcome')
    var list = e('#id-list')
    for(var i = 0; i < elements.length; i++) {
        addClass(elements[i], 'hide')
    }
    removeClass(list, 'hide')
}

//绑定事件
var bindEvents = function() {
    bindEventWelcome()
}

//初始化
var _indexInit = function() {
    bindEvents()
}

_indexInit()
