function displayAbbreviations() {
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) return false;
    var defs = new Array();
    for (var i = 0; i < abbreviations.length; i++) {
        // 解释
        var definition = abbreviations[i].getAttribute("title");

    }
}
