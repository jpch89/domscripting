function moveMessage() {
  if (!document.getElementById) return false
  if (!document.getElementById('message')) return false
  var elem = document.getElementById('message')
  elem.style.left = '200px'
}

// addLoadEvent(moveMessage)