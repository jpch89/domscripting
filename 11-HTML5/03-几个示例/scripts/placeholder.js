// 如果 input 元素不支持 placeholder 属性
if (!Modernizr.input.placeholder) {
  var input = document.getElementById('first-name')

  input.onfocus = function() {
    // 获取 placeholder 文本，存入 text
    var text = this.placeholder || this.getAttribute('placeholder')
    // 如果当前 input 的 value 取值与 text 相同
    // 就重置 value 取值
    if (this.value == text) {
      this.value = ''
    }
  }

  input.onblur = function() {
    if (this.value == '') {
      // 如果没有填入任何信息，重新把 placeholder 文本设置回去
      this.value = this.placeholder || this.getAttribute('placeholder')
    }
  }

  // 初始时执行 onblue 以便添加 placeholder 文本
  input.onblur()
}
