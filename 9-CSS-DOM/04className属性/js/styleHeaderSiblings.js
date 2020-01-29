// 实现给 h1 ~ * 设置样式
// 注：上面其实是原书表述错误，它想要实现的应该是 h1 + *
function styleHeaderSiblings() {
  if (!document.getElementsByTagName) return false
  var headers = document.getElementsByTagName('h1')
  var elem
  for (var i = 0; i < headers.length; i++) {
    elem = getNextElement(headers[i].nextSibling)
    addClass(elem, 'intro')
    // elem.className = 'intro'
    // elem.style.fontWeight = 'bold'
    // elem.style.fontSize = '1.2em'
  }
}

function getNextElement(node) {
  if (node.nodeType == 1) {
    return node
  }
  if (node.nextSibling) {
    return getNextElement(node.nextSibling)
  }
  return null
}

// window.onload = styleHeaderSiblings
addLoadEvent(styleHeaderSiblings)
