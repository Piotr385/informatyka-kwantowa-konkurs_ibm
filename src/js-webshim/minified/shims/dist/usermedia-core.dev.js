"use strict";

webshim.register("usermedia-core", function (a, b, c, d) {
  "use strict";

  var e = b.prefixed("srcObject", d.createElement("video")),
      f = function f() {
    navigator.getUserMedia = navigator[b.prefixed("getUserMedia", navigator)];
  };

  if ("srcObject" != e) {
    var g = !(!c.URL || !URL.createObjectURL);
    b.defineNodeNamesProperty(["audio", "video"], "srcObject", {
      prop: {
        get: function get() {
          return this[e] || null;
        },
        set: function set(b) {
          e ? a.prop(this, e, b) : a.prop(this, "src", g ? URL.createObjectURL(b) : b);
        }
      }
    });
  }

  !function () {
    var a = {},
        b = URL.createObjectURL,
        c = URL.revokeObjectURL;
    URL.createObjectURL = function (c) {
      var d = c;
      return b && !c._wsStreamId ? d = b.apply(this, arguments) : c._wsStreamId && (d = c._wsStreamId, a[d] = c), d;
    }, URL.revokeObjectURL = function (b) {
      if (a[b]) delete a[b];else if (c) return c.apply(this, arguments);
    };
  }(), b.ready(b.modules["usermedia-shim"].loaded ? "usermedia-api" : "usermedia-shim", f);
});