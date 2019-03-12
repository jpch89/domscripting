function showPic(whichpic) {
    // 必须有 placeholder 元素
    if (!document.getElementById("placeholder")) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);

    // 可以没有 description 元素
    if (document.getElementById("description")) {
        var text = whichpic.getAttribute("title");
        var description = document.getElementById("description");
        description.firstChild.nodeValue = text;
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
            return showPic(this) ? false : true;
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


function preparePlaceholder() {
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "img/placeholder.gif");
    placeholder.setAttribute("alt", "my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var desctext = document.createTextNode("Choose an image");
    description.appendChild(desctext);

    // 插入
    // document.getElementsByTagName("body")[0].appendChild(placeholder);
    // document.getElementsByTagName("body")[0].appendChild(description);
    // 也可以这么写
    document.body.appendChild(placeholder);
    document.body.appendChild(description);

}

addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);
