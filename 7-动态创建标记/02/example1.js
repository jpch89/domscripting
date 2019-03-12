window.onload = function () {
    var para = document.createElement("p");
    var info = "nodeName: ";
    info += para.nodeName;  // nodeName 都是大写！！！
    info += " nodeType: ";
    info += para.nodeType;
    alert(info);
};
