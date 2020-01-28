function displayCitations() {
  if (
    !document.getElementsByTagName ||
    !document.createElement ||
    !document.createTextNode
  )
    return false
  var quotes = document.getElementsByTagName('blockquote')
  for (var i = 0; i < quotes.length; i++) {
    // 检测当前的 blockquote 元素是否有 cite 属性
    // 如果没有则不执行本次循环
    if (!quotes[i].getAttribute('cite')) {
      continue
    }
    // 或者写成这样
    // if (!quotes[i].getAttribute('cite')) continue

    var url = quotes[i].getAttribute('cite')
    var quoteChildren = quotes[i].getElementsByTagName('*')
    if (quoteChildren.length < 1) continue
    // 找到了 blockquote 的最后一个元素节点
    var elem = quoteChildren[quoteChildren.length - 1]

    // 创建链接
    var link = document.createElement('a')
    var link_text = document.createTextNode('source')
    link.appendChild(link_text)
    // link.setAttribute('href', url)
    link.href = url

    // 创建上标，并添加 a 标签
    var superscript = document.createElement('sup')
    superscript.appendChild(link)
    // 把上标添加到 blockquote 元素最后一个元素节点的里面
    elem.appendChild(superscript)
  }
}

addLoadEvent(displayCitations)