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

function showSection(id) {
  var sections = document.getElementsByTagName('section')
  for (var i = 0; i < sections.length; i++) {
    if (sections[i].getAttribute('id') != id) {
      sections[i].style.display = 'none'
    } else {
      sections[i].style.display = 'block'
    }
  }
}

function prepareInternalnav() {
  if (!document.getElementsByTagName) return false
  if (!document.getElementById) return false
  var articles = document.getElementsByTagName('article')
  if (articles.length == 0) return false
  var navs = articles[0].getElementsByTagName('nav')
  if (navs.length == 0) return false
  var nav = navs[0]
  // 找到了 article 元素下面的 nav 元素里面的所有 a 标签，遍历它
  var links = nav.getElementsByTagName('a')
  for (var i = 0; i < links.length; i++) {
    // 通过 a 标签的 href 获取了对应的 id
    var sectionId = links[i].getAttribute('href').split('#')[1]
    // 找不到这个 id，就进行下一次循环
    if (!document.getElementById(sectionId)) continue
    // 初始化的时候，把每个 section 都隐藏起来
    document.getElementById(sectionId).style.display = 'none'
    // sectionId 是局部变量，prepareInternalnav 执行完毕之后就消失了
    // 为了在 a 标签触发事件的时候它还在，给它绑定一个 destination 属性
    links[i].destination = sectionId
    links[i].onclick = function() {
      showSection(this.destination)
      // 取消浏览器默认行为
      return false
    }
  }
}

addLoadEvent(prepareInternalnav)

// 显示图片函数，传入一个要显示的图片的链接（a 标签）
// 在占位图片处显示它，并且把 title 也显示为图片描述
function showPic(whichpic) {
  // 如果没有 placeholder 这个 id，就让浏览器默认行为接管
  if (!document.getElementById('placeholder')) return true
  // 获取图片 href 地址
  var source = whichpic.getAttribute('href')
  var placeholder = document.getElementById('placeholder')
  // 设置占位图片的 src 属性为传入的 whichPic 的 href
  placeholder.setAttribute('src', source)
  // 如果没有 description 这个 id，直接返回，不进行下面的操作
  if (!document.getElementById('description')) return false
  // 如果有 title 属性，则获取文本，没有的话让 text 为空字符串
  if (whichpic.getAttribute('title')) {
    var text = whichpic.getAttribute('title')
  } else {
    var text = ''
  }
  var description = document.getElementById('description')
  // description 的第一个子节点的类型是文本节点，就把 text 设置进去
  if (description.firstChild.nodeType == 3) {
    description.firstChild.nodeValue = text
  }
  return false
}

// 创建占位图片，及其描述，描述位于占位图片的上方
function preparePlaceholder() {
  if (!document.createElement) return false
  if (!document.createTextNode) return false
  if (!document.getElementById) return false
  if (!document.getElementById('imagegallery')) return false
  // 创建 img 标签，作为 placeholder，设置一系列属性
  var placeholder = document.createElement('img')
  placeholder.setAttribute('id', 'placeholder')
  placeholder.setAttribute('src', 'images/placeholder.gif')
  placeholder.setAttribute('alt', 'my image gallery')
  // 创建 p 标签，作为图片的描述
  var description = document.createElement('p')
  description.setAttribute('id', 'description')
  var desctext = document.createTextNode('Choose an image')
  description.appendChild(desctext)
  var gallery = document.getElementById('imagegallery')
  // 图片集（其实就是缩略图）下面是描述文本，描述文本下面是占位图片
  insertAfter(description, gallery)
  insertAfter(placeholder, description)
}

// 创建图片集，为图片集的每个 a 链接都绑定 onclick 事件
function prepareGallery() {
  if (!document.getElementsByTagName) return false
  if (!document.getElementById) return false
  if (!document.getElementById('imagegallery')) return false
  var gallery = document.getElementById('imagegallery')
  var links = gallery.getElementsByTagName('a')
  for (var i = 0; i < links.length; i++) {
    links[i].onclick = function() {
      return showPic(this)
    }
  }
}

addLoadEvent(preparePlaceholder)
addLoadEvent(prepareGallery)

// 给表格加上 odd 类
function stripeTables() {
  if (!document.getElementsByTagName) return false
  var tables = document.getElementsByTagName('table')
  for (var i = 0; i < tables.length; i++) {
    var odd = false
    var rows = tables[i].getElementsByTagName('tr')
    for (var j = 0; j < rows.length; j++) {
      if (odd == true) {
        addClass(rows[j], 'odd')
        odd = false
      } else {
        odd = true
      }
    }
  }
}

function highlightRows() {
  if (!document.getElementsByTagName) return false
  var rows = document.getElementsByTagName('tr')
  for (var i = 0; i < rows.length; i++) {
    rows[i].oldClassName = rows[i].className
    rows[i].onmouseover = function() {
      addClass(this, 'highlight')
    }
    rows[i].onmouseout = function() {
      this.className = this.oldClassName
    }
  }
}

function displayAbbreviations() {
  if (
    !document.getElementsByTagName ||
    !document.createElement ||
    !document.createTextNode
  )
    return false
  var abbreviations = document.getElementsByTagName('abbr')
  if (abbreviations.length < 1) return false
  var defs = new Array()
  for (var i = 0; i < abbreviations.length; i++) {
    var current_abbr = abbreviations[i]
    if (current_abbr.childNodes.length < 1) continue
    var definition = current_abbr.getAttribute('title')
    var key = current_abbr.lastChild.nodeValue
    defs[key] = definition
  }
  var dlist = document.createElement('dl')
  for (key in defs) {
    var definition = defs[key]
    var dtitle = document.createElement('dt')
    var dtitle_text = document.createTextNode(key)
    dtitle.appendChild(dtitle_text)
    var ddesc = document.createElement('dd')
    var ddesc_text = document.createTextNode(definition)
    ddesc.appendChild(ddesc_text)
    dlist.appendChild(dtitle)
    dlist.appendChild(ddesc)
  }
  if (dlist.childNodes.length < 1) return false
  var header = document.createElement('h3')
  var header_text = document.createTextNode('Abbreviations')
  header.appendChild(header_text)
  var articles = document.getElementsByTagName('article')
  if (articles.length == 0) return false
  var container = articles[0]
  container.appendChild(header)
  container.appendChild(dlist)
}

addLoadEvent(stripeTables)
addLoadEvent(highlightRows)
addLoadEvent(displayAbbreviations)

// label 聚焦函数
function focusLabels() {
  if (!document.getElementsByTagName) return false
  var labels = document.getElementsByTagName('label')
  for (var i = 0; i < labels.length; i++) {
    // 如果 label 没有 for 属性，那么进入下一次循环
    if (!labels[i].getAttribute('for')) continue
    labels[i].onclick = function() {
      // 通过 for 获取 id
      var id = this.getAttribute('for')
      // 如果找不到对应 id 的元素，则返回
      if (!document.getElementById(id)) return false
      var element = document.getElementById(id)
      // 让元素点击后聚焦
      element.focus()
    }
  }
}
addLoadEvent(focusLabels)

// 表单占位符功能
function resetFields(whichform) {
  // 如果支持 placeholder 属性，那么返回，本函数是针对不支持 placeholder 的
  if (Modernizr.input.placeholder) return
  // 遍历表单所有的表单元素
  for (var i = 0; i < whichform.elements.length; i++) {
    var element = whichform.elements[i]
    // 如果是 submit 按钮，进入下一次循环
    if (element.type == 'submit') continue
    // 获取 placeholder 的值（第一种方法是 HTML-DOM 的方法，如果不支持，则用 DOM Core 方法）
    var check = element.placeholder || element.getAttribute('placeholder')
    // 如果根本没有 placeholder 属性，进入下一次循环
    if (!check) continue
    // 聚焦事件
    element.onfocus = function() {
      var text = this.placeholder || this.getAttribute('placeholder')
      // 如果文本内容是占位文字，则清空
      if (this.value == text) {
        this.className = ''
        this.value = ''
      }
    }
    // 失焦事件
    element.onblur = function() {
      // 如果没填入任何内容，则把 placeholder 重新填入进去
      if (this.value == '') {
        this.className = 'placeholder'
        this.value = this.placeholder || this.getAttribute('placeholder')
      }
    }
    element.onblur()
  }
}

function prepareForms() {
  for (var i = 0; i < document.forms.length; i++) {
    var thisform = document.forms[i]
    resetFields(thisform)
    thisform.onsubmit = function() {
      if (!validateForm(this)) return false
      var article = document.getElementsByTagName('article')[0]
      if (submitFormWithAjax(this, article)) return false
      return true
    }
  }
}
addLoadEvent(prepareForms)

function isFilled(field) {
  if (field.value.replace(' ', '').length == 0) return false
  var placeholder = field.placeholder || field.getAttribute('placeholder')
  return field.value != placeholder
}

function isEmail(field) {
  return field.value.indexOf('@') != -1 && field.value.indexOf('.') != -1
}

function validateForm(whichform) {
  for (var i = 0; i < whichform.elements.length; i++) {
    var element = whichform.elements[i]
    // 注意：可以这样获取 required 属性
    if (element.required == 'required') {
      if (!isFilled(element)) {
        alert('Please fill in the ' + element.name + ' field.')
        return false
      }
    }
    // 注意：表单元素上面有 type 属性，可以这样获取
    if (element.type == 'email') {
      if (!isEmail(element)) {
        alert('The ' + element.name + ' field must be a valid email address.')
        return false
      }
    }
  }
  return true
}

function getHTTPObject() {
  if (typeof XMLHttpRequest == 'undefined')
    XMLHttpRequest = function() {
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.6.0')
      } catch (e) {}

      try {
        return new ActiveXObject('Msxml2.XMLHTTP.3.0')
      } catch (e) {}

      try {
        return new ActiveXObject('Msxml2.XMLHTTP')
      } catch (e) {}

      return false
    }
  return new XMLHttpRequest()
}

function displayAjaxLoading(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild)
  }
  var content = document.createElement('img')
  content.setAttribute('src', 'images/loading.gif')
  content.setAttribute('alt', 'Loading...')
  element.appendChild(content)
}

// 用 ajax 提交表单
// whichform 是要提交的表单
// thetarget 是要展示结果的目标对象
function submitFormWithAjax(whichform, thetarget) {
  var request = getHTTPObject()
  // 检查是否存在有效的 XMLHttpRequest 对象，如果没有就返回 false
  if (!request) {
    return false
  }
  // 首先展示加载动画
  displayAjaxLoading(thetarget)
  var dataParts = []
  var element
  // 遍历要提交的表单中的 elements（表单元素数组）
  for (var i = 0; i < whichform.elements.length; i++) {
    element = whichform.elements[i]
    // 把每个表单元素的名字 name 和取值 value 拼接
    // 使用了 encodeURIComponent 编码成 URL 安全的字符串
    dataParts[i] = element.name + '=' + encodeURIComponent(element.value)
  }
  // 最终使用 & 连接成查询字符串
  var data = dataParts.join('&')
  // 向原始表单的 action 属性指定的处理函数发送 POST 请求
  // 第三个参数代表异步与否
  request.open('POST', whichform.getAttribute('action'), true)
  // 在请求中添加 application/x-www-form-urlencoded 头部
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      if (request.status == 200 || request.status == 0) {
        // matches[0] 是 responseText 中与整个模式匹配的部分，即包括 <article></article>在内的部分
        // 因为模式中包含了一个捕获组（一对圆括号），因此 matches[1] 就是捕获组中捕获的内容
        var matches = request.responseText.match(
          /<article>([\s\S]+)<\/article>/
        )
        if (matches.length > 0) {
          thetarget.innerHTML = matches[1]
        } else {
          thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>'
        }
      } else {
        thetarget.innerHTML = '<p>' + request.statusText + '</p>'
      }
    }
  }
  request.send(data)
  return true
}
