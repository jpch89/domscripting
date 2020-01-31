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

function moveElement(elementID, final_x, final_y, interval) {
  if (!document.getElementById) return false
  if (!document.getElementById(elementID)) return false
  var elem = document.getElementById(elementID)
  if (elem.movement) {
    clearTimeout(elem.movement)
  }
  if (!elem.style.left) {
    elem.style.left = '0px'
  }
  if (!elem.style.top) {
    elem.style.top = '0px'
  }
  var xpos = parseInt(elem.style.left)
  var ypos = parseInt(elem.style.top)
  if (xpos == final_x && ypos == final_y) {
    return true
  }
  if (xpos < final_x) {
    var dist = Math.ceil((final_x - xpos) / 10)
    xpos = xpos + dist
  }
  if (xpos > final_x) {
    var dist = Math.ceil((xpos - final_x) / 10)
    xpos = xpos - dist
  }
  if (ypos < final_y) {
    var dist = Math.ceil((final_y - ypos) / 10)
    ypos = ypos + dist
  }
  if (ypos > final_y) {
    var dist = Math.ceil((ypos - final_y) / 10)
    ypos = ypos - dist
  }
  elem.style.left = xpos + 'px'
  elem.style.top = ypos + 'px'
  var repeat =
    "moveElement('" +
    elementID +
    "'," +
    final_x +
    ',' +
    final_y +
    ',' +
    interval +
    ')'
  elem.movement = setTimeout(repeat, interval)
}

function prepareSlideshow() {
  // 对象检测
  if (!document.getElementsByTagName) return false
  if (!document.getElementById) return false
  if (!document.getElementById('intro')) return false

  // intro 就是 article 元素下面的 p 元素的 id
  var intro = document.getElementById('intro')
  // 创建幻灯片的 div
  var slideshow = document.createElement('div')
  slideshow.setAttribute('id', 'slideshow')
  // 创建小窗口，并把小窗口添加为幻灯片的子元素
  var frame = document.createElement('img')
  frame.setAttribute('src', 'images/frame.gif')
  frame.setAttribute('alt', '')
  frame.setAttribute('id', 'frame')
  slideshow.appendChild(frame)
  // 创建预览图片
  var preview = document.createElement('img')
  preview.setAttribute('src', 'images/slideshow.gif')
  preview.setAttribute('alt', 'a glimpse of what awaits you')
  preview.setAttribute('id', 'preview')
  // 把预览图片加入到幻灯片的 div 中
  slideshow.appendChild(preview)
  // 把整个幻灯片插入到 intro 元素后面
  insertAfter(slideshow, intro)

  // 从 intro 元素中获取所有 a 标签
  // var links = intro.getElementsByTagName('a')
  // 改成：从整个文档中获取 a 标签
  var links = document.getElementsByTagName('a')
  var destination
  for (var i = 0; i < links.length; i++) {
    // 遍历所有标签，给每个标签绑定 onmouseover 事件
    links[i].onmouseover = function() {
      // 获取 a 标签的地址
      destination = this.getAttribute('href')
      if (destination.indexOf('index.html') != -1) {
        moveElement('preview', 0, 0, 5)
      }
      if (destination.indexOf('about.html') != -1) {
        moveElement('preview', -150, 0, 5)
      }
      if (destination.indexOf('photos.html') != -1) {
        moveElement('preview', -300, 0, 5)
      }
      if (destination.indexOf('live.html') != -1) {
        moveElement('preview', -450, 0, 5)
      }
      if (destination.indexOf('contact.html') != -1) {
        moveElement('preview', -600, 0, 5)
      }
    }
  }
}

addLoadEvent(prepareSlideshow)
