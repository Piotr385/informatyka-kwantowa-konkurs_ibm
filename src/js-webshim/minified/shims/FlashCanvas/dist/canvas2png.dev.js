"use strict";

!function (a) {
  var b = a.getElementsByTagName("script"),
      c = b[b.length - 1],
      d = c.getAttribute("src").replace(/[^\/]+$/, "save.php");

  window.canvas2png = function (b, c) {
    var e = b.tagName.toLowerCase();
    if ("canvas" === e) if ("undefined" != typeof FlashCanvas) FlashCanvas.saveImage(b, c);else {
      var f = d;
      c && (f += "?filename=" + c);
      var g = a.createElement("form"),
          h = a.createElement("input");
      g.setAttribute("action", f), g.setAttribute("method", "post"), h.setAttribute("type", "hidden"), h.setAttribute("name", "dataurl"), h.setAttribute("value", b.toDataURL()), a.body.appendChild(g), g.appendChild(h), g.submit(), g.removeChild(h), a.body.removeChild(g);
    }
  };
}(document);