function createVideoControls() {
  // 找到所有 video 元素，循环遍历，对其应用 addControls 函数
  var vids = document.getElementsByTagName('video')
  for (var i = 0; i < vids.length; i++) {
    addControls(vids[i])
  }
}


function addControls(vid) {
  // 删除 controls 属性，从而去掉 video 元素的内置控件
  vid.removeAttribute('controls')

  vid.height = vid.videoHeight
  vid.width = vid.videoWidth
  vid.parentNode.style.height = vid.videoHeight + 'px'
  vid.parentNode.style.width = vid.videoWidth + 'px'

  // controls 是控制按钮的面板
  var controls = document.createElement('div')
  controls.setAttribute('class', 'controls')

  // 创建 play 按键
  var play = document.createElement('button')
  play.setAttribute('title', 'Play')
  play.innerHTML = '&#x25BA;'
  controls.appendChild(play)

  // 插入控制面板到 video 元素前面
  vid.parentNode.insertBefore(controls, vid)

  // 为 play 按钮绑定单击事件，点击之后播放视频
  play.onclick = function() {
    // 如果视频已经结束播放了，那么当前时间设置为 0，以便重新开始播放
    if (vid.ended) {
      vid.currentTime = 0
    }
    // 如果视频是暂停的，那么播放视频
    if (vid.paused) {
      vid.play()
    } else {  // 否则暂停视频
      vid.pause()
    }
  }
  // 利用 play，pause，ended 来修改 Play 按钮状态
  vid.addEventListener(
    'play',
    function() {
      play.innerHTML = '&#x2590;&#x2590;'
      play.setAttribute('paused', true)
    },
    false
  )
  vid.addEventListener(
    'pause',
    function() {
      play.removeAttribute('paused')
      play.innerHTML = '&#x25BA;'
    },
    false
  )
  vid.addEventListener(
    'ended',
    function() {
      vid.pause()
    },
    false
  )
}
window.onload = function() {
  createVideoControls()
}
