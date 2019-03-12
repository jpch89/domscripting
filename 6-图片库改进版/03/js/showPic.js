function showPic(whichpic) {
    // whichpic 是被点击的 a 标签
    // 通过该 a 标签获取 href 指向的图片路径
    var source = whichpic.getAttribute("href");
    // 获取显示图片的元素
    var placeholder = document.getElementById("placeholder");
    // 设置图片路径
    placeholder.setAttribute("src", source);

    // 获取被点击的 a 标签的 title
    var text = whichpic.getAttribute("title");
    // 获取图片描述 p 标签
    var description = document.getElementById("description");
    // 把 a 标签的 title 设置给 p 标签
    description.firstChild.nodeValue = text;
}


function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var gallery = document.getElementById("gallery");
    if (!gallery) return false;
    var links = gallery.getElementsByTagName("a");

    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            showPic(this);
            return false;
        };
    }
}


function addLoadEvent(func) {
    var oldOnload = window.onload
    if (typeof oldOnload !== 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldOnload();
            func();
        };
    }
}


addLoadEvent(prepareGallery);
