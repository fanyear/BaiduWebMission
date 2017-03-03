//绑定事件
var bindEvents = function() {
    bindEventGoBack()
}

//绑定返回按钮
var bindEventGoBack = function() {
    var element = e('#id-go-back')
    bindEvent(element, 'click', function() {
        history.back()
    })
}

//初始化
var _init = function() {
    bindEvents()
}

_init()
