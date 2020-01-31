function addLoadEvent(func) {
  var oldonload = window.onload
  if (typeof window.onload != 'function') {
    window.onload = func
  } else {
    window.onload = function() {
      oldonload()
      func()
    }
  }
}

function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement)
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling)
  }
}

function addClass(element, value) {
  if (!element.className) {
    element.className = value
  } else {
    newClassName = element.className
    newClassName += ' '
    newClassName += value
    element.className = newClassName
  }
}


function highlightPage() {
  if (!document.getElementsByTagName) return false
  if (!document.getElementById) return false

  // 取得 header 元素所在的数组
  var headers = document.getElementsByTagName('header')
  // 如果没找到，就返回
  if (headers.length == 0) return false

  // 取得 nav 元素所在的数组
  var navs = headers[0].getElementsByTagName('nav')
  // 如果没找到就返回
  if (navs.length == 0) return false

  // 拿到 nav 元素下面的所有 a 标签
  var links = navs[0].getElementsByTagName('a')
  // 遍历 a 标签
  for (var i = 0; i < links.length; i++) {
    var linkurl
    for (var i = 0; i < links.length; i++) {
      linkurl = links[i].getAttribute('href')
      // 如果当前页面位置和 a 标签的 href 属性相同
      if (window.location.href.indexOf(linkurl) != -1) {
        // 添加 here，以便应用 CSS 样式
        links[i].className = 'here'
        var linktext = links[i].lastChild.nodeValue.toLowerCase()
        document.body.setAttribute('id', linktext)
      }
    }
  }
}

addLoadEvent(highlightPage)
