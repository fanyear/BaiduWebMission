//绑定事件
var bindEvents = function() {
    bindEventCheckAdvanceOrder()
    bindEventCancelCheckAdvanceOrder()
    bindEventAddAdvanceOrder()
    bindEventCancelCheckAddAdvanceOrder()
    bindEventSelectSpecifications()
    bindEventChangeNumber()
    bindEventAdvanceOrderChangeNumber()
    bindEventDelete()
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

//绑定规格选择
var bindEventSelectSpecifications = function() {
    var elements = es('.goods-specifications-cell')
    for(var i = 0; i < elements.length; i++) {
        bindEvent(elements[i], 'click', function(e) {
            var target = e.target||e.srcElement
            if(target.classList.contains('goods-specifications-option')) {
                clearClass(this, '.goods-specifications-option', 'goods-specifications-active')
                addClass(target, 'goods-specifications-active')
            }
        })
    }
}

//绑定加减选择
var bindEventChangeNumber = function() {
    var elements = es('.number-button')
    for(var i = 0; i < elements.length; i++) {
        bindEvent(elements[i], 'click', function(event) {
            var number = parseInt(this.dataset.number)
            var target = e('#id-number')
            var targetNumber = parseInt(target.innerHTML)
            targetNumber = targetNumber + number
            if(targetNumber <= 0) {
                targetNumber = 1
            }
            target.innerHTML = targetNumber
        })
    }
}

//绑定加减选择
var bindEventAdvanceOrderChangeNumber = function() {
    var elements = es('.advance-order-cell')
    for(var i = 0; i < elements.length; i++) {
        bindEvent(elements[i], 'click', function(e) {
            var target = e.target||e.srcElement
            if(target.classList.contains('advance-order-cell-number-button')) {
                var number = parseInt(target.dataset.number)
                var numberCell = find(this, '.advance-order-cell-number')
                var targetNumber = parseInt(numberCell.innerHTML)
                targetNumber = targetNumber + number
                if(targetNumber <= 0) {
                    targetNumber = 1
                }
                numberCell.innerHTML = targetNumber
                var singleCell = find(this, '.advance-order-cell-single-price')
                var singelPrice = parseInt(singleCell.innerHTML)
                var sumCell = find(this, '.advance-order-cell-sum-price')
                sumCell.innerHTML = targetNumber * singelPrice  
            }
        })
    }
}

//绑定删除
var bindEventDelete = function() {
    var elements = es('.advance-order-cell')
    for(var i = 0; i < elements.length; i++) {
        bindEvent(elements[i], 'click', function(e) {
            var target = e.target||e.srcElement
            if(target.classList.contains('advance-order-cell-delete')) {
                this.remove()
            }
        })
    }
}

//清楚class
var clearClass = function(node, children, className) {
    var all = findAll(node, children)
    for(var i = 0; i < all.length; i++) {
        removeClass(all[i], className)
    }
}

//初始化
var advanceOrderInit = function() {
    bindEvents()
}

advanceOrderInit()
