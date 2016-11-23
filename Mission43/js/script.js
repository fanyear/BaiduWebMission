window.onload = function() {
  new GalleryWall("gallery-1", photos.slice(0, 1));
  new GalleryWall("gallery-2", photos.slice(0, 2));
  new GalleryWall("gallery-3", photos.slice(0, 3));
  new GalleryWall("gallery-4", photos.slice(0, 4));
  new GalleryWall("gallery-5", photos.slice(0, 5));
  new GalleryWall("gallery-6", photos.slice(0, 6));
}
var photos = [{
    "src": "img/1.jpg",
    "description": ""
}, {
    "src": "img/2.jpg",
    "description": ""
}, {
    "src": "img/3.jpg",
    "description": ""
}, {
    "src": "img/4.jpg",
    "description": ""
}, {
    "src": "img/5.jpg",
    "description": ""
}, {
    "src": "img/6.jpg",
    "description": ""
}];

function 你大爷的(){
  alert("你大爷的")
}
你大爷的()
var GalleryWall = function(id, photos) {
    this.ele = document.getElementById(id);
    this.photos = photos;
    this.length = photos.length;
    this.htmlInit();
    this.cssInit();
}

GalleryWall.prototype.htmlInit = function() {
    var htmlCode = [];
    var length = this.length;
    var photo = 0;
    var photos = this.photos;
    while (length != 0) {
        htmlCode.push(
            '<div class="frame">     <figure style="background-image:url(' + photos[photo].src + ')">         <span class="figcaption"></span>' +
            '<figcaption class="figcaption" >' +
            '<p>' + photos[photo].description + '</p>       </figcaption>   </figure>  </div>'

        )
        length--;
        photo++;
    }
    this.ele.innerHTML = htmlCode.join("");
}

GalleryWall.prototype.cssInit = function() {
    var cssList = this["gallery" + this.length]();
    var divs = this.ele.getElementsByTagName("div")

    if (divs) {

        for (var i = 0; i < divs.length; i++) {

            for (css in cssList[i]) {
                divs[i].style[css] = cssList[i][css];
            }

        }
    }


}


GalleryWall.prototype.gallery1 = function() {
    return [{
        "width": "100%",
        "height": "100%"
    }]
}
GalleryWall.prototype.gallery2 = function() {
    return [{
        "position": "absolute",
        "left": "0px",
        "width": "60%",
        "overflow": "none"
    }, {
        "position": "absolute",
        "right": "0px",
        "width": "60%",
        "overflow": "none"
    }]
}
GalleryWall.prototype.gallery3 = function() {
    return [{
        "width": "50%",
        "height": "100%"
    }, {
        "position": "absolute",
        "width": "50%",
        "height": "50%",
        "right": "0px"
    }, {
        "position": "absolute",
        "width": "50%",
        "height": "50%",
        "right": "0px",
        "top": "50%"
    }]
}
GalleryWall.prototype.gallery4 = function() {
    return [{
        "position": "absolute",
        "left": "0px",
        " top": "0",
        "width": "50%",
        "height": "50%"
    }, {
        "position": "absolute",
        "right": "0px",
        "top": "0",
        "width": "50%",
        "height": "50%"
    }, {
        "position": "absolute",
        "left": "0px",
        "bottom": "0px",
        "width": "50%",
        "height": "50%"
    }, {
        "position": "absolute",
        "right": "0px",
        "bottom": "0px",
        "width": "50%",
        "height": "50%"
    }]
}
GalleryWall.prototype.gallery5 = function() {
    return [{
      "position": "absolute",
      "left":  "0px",
      "top": "0px",
      "width": "66%",
      "height": "66%"
    },{
      "position": "absolute",
      "right":  "0px",
      "top":  "0px",
      "width": "33%",
      "height": "33%"
    },{
      "position": "absolute",
      "left":  "0px",
      "bottom":  "0px",
      "width": "33.33%",
      "height": "33%"
    },{
      "position": "absolute",
      "left":  "33%",
      "bottom":  "0px",
      "width": "33.33%",
      "height": "33%"
    },{
      "position": "absolute",
      "right":   "0px",
      "bottom":  "0px",
      "width": "33.33%",
      "height": "66%"
    }]
}
GalleryWall.prototype.gallery6 = function() {
    return [{
      "position": "absolute",
      "left":   "0px",
      "top":  "0px",
      "width": "66%",
      "height": "66%"
    },{
      "position": "absolute",
      "right":   "0px",
      "top":  "0px",
      "width": "33.33%",
      "height": "33%"
    },{
      "position": "absolute",
      "right":   "0px",
      "top":  "33%",
      "width": "33.33%",
      "height": "33%"
    },{
      "position": "absolute",
      "left":   "0px",
      "bottom":  "0px",
      "width": "33.33%",
      "height":" 33%"
    },{
      "position": "absolute",
      "left":   "33%",
      "bottom":  "0px",
      "width": "33.33%",
      "height": "33%"
    },{
      "position": "absolute",
      "right":   "0px",
      "bottom":  "0px",
      "width":" 33.33%",
      "height": "33%"
    }]
}
