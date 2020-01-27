function displayAbbreviations() {
  var abbreviations = document.getElementsByTagName('abbr')
  if (abbreviations.length < 1) return false
  var defs = new Array()
  for (var i = 0; i < abbreviations.length; i++) {
    var current_abbr = abbreviations[i]
    var definition = current_abbr.getAttribute('title')
    var key = current_abbr.lastChild.nodeValue
    defs[key] = definition
  }
}
