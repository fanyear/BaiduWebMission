var photos = [
    {
        'src':'index1-1.jpg'
    },
    {
        'src':'index1-6.jpg'
    }
]

//插入图片
var insertPhotos = function(element, photos) {
    for(var i = 0; i < photos.length; i++) {
        var html = "<span class='photo-box' style='background-image:url(img/" + photos[i].src + ");'></span>"
        appendHtml(element, html)
    }
}

//顺序播放
var slidePlay = function() {
    var spans = es('.photo-box') 
    var len = spans.length
    slideActive = len - 1
    activeSpan(slideActive)
    slideInterval = setInterval(function() {
        activeSpan(slideActive)
    },2000)
}

//显示照片
var activeSpan = function(slideNum) {
    var spans = es('.photo-box')
    removeClass(spans[slideNum], 'active')
    slideActive = nextActive(slideNum)
    addClass(spans[slideActive], 'active')
}

//下一张图片index
var nextActive = function(slideActive) {
    var spans = es('.photo-box')
    var len = spans.length
    if(slideActive < len - 1) {
        return slideActive + 1
    } else {
        return 0
    }
}

//slide 初始化
var _slideInit = function() {
    var slideBox = e('#id-welcome')
    insertPhotos(slideBox, photos)
    slidePlay()
}

_slideInit()
