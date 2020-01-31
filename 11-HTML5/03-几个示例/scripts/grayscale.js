function convertToGS(img) {
  // 如果浏览器不支持 <canvas> 就返回
  if (!Modernizr.canvas) return
  // 存储原始的彩色斑斑
  img.color = img.src
  // 创建灰度版
  img.grayscale = createGSCanvas(img)
  // 在 mouseover/out 事件发生时切换图片
  img.onmouseover = function() {
    this.src = this.color
  }
  img.onmouseout = function() {
    this.src = this.grayscale
  }
  // 第一次运行的时候，让它默认变成灰色
  img.onmouseout()
}


function createGSCanvas(img) {
  var canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height

  var ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  
  // 注意：getImageData 只能操作与脚本位于同一个域的图片
  // 取得原始的图像数据，循环遍历其中的每一个像素
  // 将每个彩色像素的红、绿、蓝彩色成分求平均值，得到对应彩色值的灰度值。
  var c = ctx.getImageData(0, 0, img.width, img.height)
  for (i = 0; i < c.height; i++) {
    for (j = 0; j < c.width; j++) {
      var x = i * 4 * c.width + j * 4
      var r = c.data[x]
      var g = c.data[x + 1]
      var b = c.data[x + 2]
      c.data[x] = c.data[x + 1] = c.data[x + 2] = (r + g + b) / 3
    }
  }
  // 把灰度数据再放回到画布的绘图环境中
  ctx.putImageData(c, 0, 0, 0, 0, c.width, c.height)
  // 返回原始的图像数据作为新灰度图片的源。
  return canvas.toDataURL()
}

// 添加 load 事件。如果有其他脚本，可以使用 addLoadEvent 函数
window.onload = function() {
  convertToGS(document.getElementById('avatar'))
}
