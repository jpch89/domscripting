function displayAccessKeys() {
  if (
    !document.getElementsByTagName ||
    !document.createElement ||
    !document.createTextNode
  )
    return false

  var links = document.getElementsByTagName('a')
  var akeys = new Array()
  for (var i = 0; i < links.length; i++) {
    var current_link = links[i]
    if (!current_link.getAttribute('accesskey')) continue
    var key = current_link.getAttribute('accesskey')
    var text = current_link.lastChild.nodeValue
    // 添加到 akeys 关联数组
    akeys[key] = text
  }

  // 创建快捷键列表
  var list = document.createElement('ul')
  for (key in akeys) {
    var text = akeys[key]
    var str = key + ': ' + text
    var item = document.createElement('li')
    var item_text = document.createTextNode(str)
    item.appendChild(item_text)
    list.appendChild(item)
  }

  // 创建标题
  var header = document.createElement('h3')
  var header_text = document.createTextNode('AccessKeys')
  header.appendChild(header_text)

  // 添加到 body
  document.body.appendChild(header)
  document.body.appendChild(list)
}

addLoadEvent(displayAccessKeys)
