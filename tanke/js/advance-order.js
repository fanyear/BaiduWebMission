//绑定事件
var bindEvents = function() {
    bindEventCheckAdvanceOrder()
    bindEventCancelCheckAdvanceOrder()
    bindEventAddAdvanceOrder()
    bindEventCancelCheckAddAdvanceOrder()
}

//绑定查看订单事件
var bindEventCheckAdvanceOrder = function() {
    var element = e('#id-check-book')
    bindEvent(element, 'click', function() {
        var advanceOrder = e('#id-advance-order')
        removeClass(advanceOrder, 'go-to-bottom1')
        addClass(advanceOrder, 'go-to-top')
    })
}

//绑定取消查看订单事件
var bindEventCancelCheckAdvanceOrder = function() {
    var element = e('#id-cancel-order')
    bindEvent(element, 'click', function() {
        var advanceOrder = e('#id-advance-order')
        removeClass(advanceOrder, 'go-to-top')
        addClass(advanceOrder, 'go-to-bottom1')
    })
}

//绑定添加订单事件
var bindEventAddAdvanceOrder = function() {
    var element = e('#id-add-book')
    bindEvent(element, 'click', function() {
        var advanceOrder = e('#add-advance-order')
        removeClass(advanceOrder, 'go-to-bottom2')
        addClass(advanceOrder, 'go-to-top2')
    })
}

//绑定取消查看订单事件
var bindEventCancelCheckAddAdvanceOrder = function() {
    var element = e('#id-cancel-add')
    bindEvent(element, 'click', function() {
        var advanceOrder = e('#add-advance-order')
        removeClass(advanceOrder, 'go-to-top2')
        addClass(advanceOrder, 'go-to-bottom2')
    })
}
//初始化
var advanceOrderInit = function() {
    bindEvents()
}

advanceOrderInit()
