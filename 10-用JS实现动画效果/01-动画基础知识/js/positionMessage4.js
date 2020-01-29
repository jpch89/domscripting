function positionMessage() {
  if (!document.getElementById) return false
  if (!document.getElementById('message')) return false
  // 给 message 设置初始位置
  var elem = document.getElementById('message')
  elem.style.position = 'absolute'
  elem.style.left = '50px'
  elem.style.top = '100px'
  // 移动 message
  moveElement('message', 125, 25, 20)

  if (!document.getElementById('message2')) return false
  // 给 message2 设置初始位置
  // 团子注：这里重复声明了 var elem
  var elem = document.getElementById('message2')
  elem.style.position = 'absolute'
  elem.style.left = '50px'
  elem.style.top = '50px'
  // 移动 message2
  moveElement('message2', 125, 125, 20)
}

addLoadEvent(positionMessage)