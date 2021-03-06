"use strict";

webshim.register("url", function (a, b, c, d, e) {
  "use strict";

  !function (a) {
    function b(a) {
      if (f) return new g(a);
      var b = d.createElement("a");
      return b.href = a, b;
    }

    var f,
        g = a.URL;

    try {
      if (g) {
        if (f = new a.URL("http://example.com"), "searchParams" in f) return;
        "href" in f || (f = e);
      }
    } catch (h) {}

    if (a.URL = function (e, h) {
      function i(a, b) {
        var c = a.split("&");
        b && -1 === c[0].indexOf("=") && (c[0] = "=" + c[0]);
        var d = [];
        c.forEach(function (a) {
          if (0 !== a.length) {
            var b = a.indexOf("=");
            if (-1 !== b) var c = a.substring(0, b),
                e = a.substring(b + 1);else c = a, e = "";
            c = c.replace(/\+/g, " "), e = e.replace(/\+/g, " "), d.push({
              name: c,
              value: e
            });
          }
        });
        var e = [];
        return d.forEach(function (a) {
          e.push({
            name: decodeURIComponent(a.name),
            value: decodeURIComponent(a.value)
          });
        }), e;
      }

      function j(a, b) {
        function c() {
          f || (f = !0, a.search = d(e), f = !1);
        }

        function d(a) {
          var b = "",
              c = !0;
          return a.forEach(function (a) {
            var d = encodeURIComponent(a.name),
                e = encodeURIComponent(a.value);
            c || (b += "&"), b += d + "=" + e, c = !1;
          }), b.replace(/%20/g, "+");
        }

        var e = [];
        b && (e = i(b)), this._setPairs = function (a) {
          e = a;
        }, this._updateSteps = function () {
          c();
        };
        var f = !1;
        Object.defineProperties(this, {
          append: {
            value: function value(a, b) {
              e.push({
                name: a,
                value: b
              }), c();
            }
          },
          "delete": {
            value: function value(a) {
              for (var b = 0; b < e.length;) {
                e[b].name === a ? e.splice(b, 1) : ++b;
              }

              c();
            }
          },
          get: {
            value: function value(a) {
              for (var b = 0; b < e.length; ++b) {
                if (e[b].name === a) return e[b].value;
              }

              return null;
            }
          },
          getAll: {
            value: function value(a) {
              for (var b = [], c = 0; c < e.length; ++c) {
                e[c].name === a && b.push(e[c].value);
              }

              return b;
            }
          },
          has: {
            value: function value(a) {
              for (var b = 0; b < e.length; ++b) {
                if (e[b].name === a) return !0;
              }

              return !1;
            }
          },
          set: {
            value: function value(a, b) {
              for (var d = !1, f = 0; f < e.length;) {
                e[f].name === a ? d ? e.splice(f, 1) : (e[f].value = b, d = !0, ++f) : ++f;
              }

              d || e.push({
                name: a,
                value: b
              }), c();
            }
          },
          toString: {
            value: function value() {
              return d(e);
            }
          }
        });
      }

      function k() {
        var a = m.href.replace(/#$|\?$|\?(?=#)/g, "");
        m.href !== a && (m.href = a);
      }

      function l() {
        p._setPairs(m.search ? i(m.search.substring(1)) : []), p._updateSteps();
      }

      if (!(this instanceof a.URL)) throw new TypeError("Failed to construct 'URL': Please use the 'new' operator.");
      h && (e = function () {
        if (f) return new g(e, h).href;
        var a;
        if (d.implementation && d.implementation.createHTMLDocument ? a = d.implementation.createHTMLDocument("") : d.implementation && d.implementation.createDocument ? (a = d.implementation.createElement("http://www.w3.org/1999/xhtml", "html", null), a.documentElement.appendChild(a.createElement("head")), a.documentElement.appendChild(a.createElement("body"))) : c.ActiveXObject && (a = new c.ActiveXObject("htmlfile"), a.write("<head></head><body></body>"), a.close()), !a) throw Error("base not supported");
        var b = a.createElement("base");
        b.href = h, a.getElementsByTagName("head")[0].appendChild(b);
        var i = a.createElement("a");
        return i.href = e, i.href;
      }());

      var m = b(e || ""),
          n = Object.defineProperties && function () {
        var a = {};
        return Object.defineProperties(a, {
          p: {
            get: function get() {
              return !0;
            }
          }
        }), a.p;
      }(),
          o = n ? this : d.createElement("a"),
          p = new j(o, m.search ? m.search.substring(1) : null);

      return Object.defineProperties(o, {
        href: {
          get: function get() {
            return m.href;
          },
          set: function set(a) {
            m.href = a, k(), l();
          }
        },
        origin: {
          get: function get() {
            return "origin" in m ? m.origin : this.protocol + "//" + this.host;
          }
        },
        protocol: {
          get: function get() {
            return m.protocol;
          },
          set: function set(a) {
            m.protocol = a;
          }
        },
        username: {
          get: function get() {
            return m.username;
          },
          set: function set(a) {
            m.username = a;
          }
        },
        password: {
          get: function get() {
            return m.password;
          },
          set: function set(a) {
            m.password = a;
          }
        },
        host: {
          get: function get() {
            var a = {
              "http:": /:80$/,
              "https:": /:443$/,
              "ftp:": /:21$/
            }[m.protocol];
            return a ? m.host.replace(a, "") : m.host;
          },
          set: function set(a) {
            m.host = a;
          }
        },
        hostname: {
          get: function get() {
            return m.hostname;
          },
          set: function set(a) {
            m.hostname = a;
          }
        },
        port: {
          get: function get() {
            return m.port;
          },
          set: function set(a) {
            m.port = a;
          }
        },
        pathname: {
          get: function get() {
            return "/" !== m.pathname.charAt(0) ? "/" + m.pathname : m.pathname;
          },
          set: function set(a) {
            m.pathname = a;
          }
        },
        search: {
          get: function get() {
            return m.search;
          },
          set: function set(a) {
            m.search !== a && (m.search = a, k(), l());
          }
        },
        searchParams: {
          get: function get() {
            return p;
          }
        },
        hash: {
          get: function get() {
            return m.hash;
          },
          set: function set(a) {
            m.hash = a, k();
          }
        },
        toString: {
          value: function value() {
            return m.toString();
          }
        },
        valueOf: {
          value: function value() {
            return m.valueOf();
          }
        }
      }), o;
    }, g) for (var i in g) {
      g.hasOwnProperty(i) && (a.URL[i] = g[i]);
    }
  }(c);
});