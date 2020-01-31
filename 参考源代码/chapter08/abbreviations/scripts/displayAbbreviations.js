/*function displayAbbreviations() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
// get all the abbreviations
  var abbreviations = document.getElementsByTagName("abbr");
  if (abbreviations.length < 1) return false;
  var defs = new Array();
// loop through the abbreviations
  for (var i=0; i<abbreviations.length; i++) {
    var current_abbr = abbreviations[i];
    if (current_abbr.childNodes.length < 1) continue;
    var definition = current_abbr.getAttribute("title");
    var key = current_abbr.lastChild.nodeValue;
    defs[key] = definition;
  }
// create the definition list
  var dlist = document.createElement("dl");
// loop through the definitions
  for (key in defs) {
    var definition = defs[key];
// create the definition title
    var dtitle = document.createElement("dt");
    var dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
// create the definition description
    var ddesc = document.createElement("dd");
    var ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
// add them to the definition list
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  if (dlist.childNodes.length < 1) return false;
// create a headline
  var header = document.createElement("h2");
  var header_text = document.createTextNode("Abbreviations");
  header.appendChild(header_text);
// add the headline to the body
  document.body.appendChild(header);
// add the definition list to the body
  document.body.appendChild(dlist);
}
addLoadEvent(displayAbbreviations);
*/




function displayAbbreviations() {
var dlist = document.createElement("dl");
alert("dd");
var abbrlist = document.getElementsByTagName("abbr");
for(var i=0;i<abbrlist.length;i++){
var dt = document.createElement("dt");
var title1 = abbrlist[i].childNodes[0].nodeValue;
var abbrsuoxie = document.createTextNode(title1);
dt.appendChild(abbrsuoxie);
var dd = document.createElement("dd");
var des=abbrlist[i].getAttribute("title")
var abbrquan = document.createTextNode(des);
dd.appendChild(abbrquan);
dlist.appendChild(dd);
dlist.appendChild(dt);
alert("tie"+title1+"desc=="+des);
}

var header = document.createElement("h2");
  var header_text = document.createTextNode("Abbreviations");
  header.appendChild(header_text);
  document.body.appendChild(header);
document.body.appendChild(dlist);
}
addLoadEvent(displayAbbreviations);
