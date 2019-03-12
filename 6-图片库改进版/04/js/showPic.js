function showPic(whichpic) {
    // 必须有 placeholder 元素
    if (!document.getElementById("placeholder")) return false;
    // placeholder 必须是 img 标签
    if (placeholder.nodeName !== "IMG") return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);

    // 可以没有 description 元素
    if (document.getElementById("description")) {
        var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
        var description = document.getElementById("description");
        if (description.firstChild.nodeType === 3) {  // 必须是文本节点
            description.firstChild.nodeValue = text;
        }
    }
    return true;
}


function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var gallery = document.getElementById("gallery");
    if (!gallery) return false;
    var links = gallery.getElementsByTagName("a");

    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            return !showPic(this);
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
