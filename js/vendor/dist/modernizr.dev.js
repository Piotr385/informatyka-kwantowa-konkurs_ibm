"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* Modernizr 2.5.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;
window.Modernizr = function (a, b, c) {
  function B(a) {
    i.cssText = a;
  }

  function C(a, b) {
    return B(m.join(a + ";") + (b || ""));
  }

  function D(a, b) {
    return _typeof(a) === b;
  }

  function E(a, b) {
    return !!~("" + a).indexOf(b);
  }

  function F(a, b) {
    for (var d in a) {
      if (i[a[d]] !== c) return b == "pfx" ? a[d] : !0;
    }

    return !1;
  }

  function G(a, b, d) {
    for (var e in a) {
      var f = b[a[e]];
      if (f !== c) return d === !1 ? a[e] : D(f, "function") ? f.bind(d || b) : f;
    }

    return !1;
  }

  function H(a, b, c) {
    var d = a.charAt(0).toUpperCase() + a.substr(1),
        e = (a + " " + o.join(d + " ") + d).split(" ");
    return D(b, "string") || D(b, "undefined") ? F(e, b) : (e = (a + " " + p.join(d + " ") + d).split(" "), G(e, b, c));
  }

  function J() {
    e.input = function (c) {
      for (var d = 0, e = c.length; d < e; d++) {
        t[c[d]] = c[d] in j;
      }

      return t.list && (t.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), t;
    }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), e.inputtypes = function (a) {
      for (var d = 0, e, g, h, i = a.length; d < i; d++) {
        j.setAttribute("type", g = a[d]), e = j.type !== "text", e && (j.value = k, j.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(g) && j.style.WebkitAppearance !== c ? (f.appendChild(j), h = b.defaultView, e = h.getComputedStyle && h.getComputedStyle(j, null).WebkitAppearance !== "textfield" && j.offsetHeight !== 0, f.removeChild(j)) : /^(search|tel)$/.test(g) || (/^(url|email)$/.test(g) ? e = j.checkValidity && j.checkValidity() === !1 : /^color$/.test(g) ? (f.appendChild(j), f.offsetWidth, e = j.value != k, f.removeChild(j)) : e = j.value != k)), s[a[d]] = !!e;
      }

      return s;
    }("search tel url email datetime date month week time datetime-local number range color".split(" "));
  }

  var d = "2.5.3",
      e = {},
      f = b.documentElement,
      g = "modernizr",
      h = b.createElement(g),
      i = h.style,
      j = b.createElement("input"),
      k = ":)",
      l = {}.toString,
      m = " -webkit- -moz- -o- -ms- ".split(" "),
      n = "Webkit Moz O ms",
      o = n.split(" "),
      p = n.toLowerCase().split(" "),
      q = {
    svg: "http://www.w3.org/2000/svg"
  },
      r = {},
      s = {},
      t = {},
      u = [],
      v = u.slice,
      w,
      x = function x(a, c, d, e) {
    var h,
        i,
        j,
        k = b.createElement("div"),
        l = b.body,
        m = l ? l : b.createElement("body");
    if (parseInt(d, 10)) while (d--) {
      j = b.createElement("div"), j.id = e ? e[d] : g + (d + 1), k.appendChild(j);
    }
    return h = ["&#173;", "<style>", a, "</style>"].join(""), k.id = g, (l ? k : m).innerHTML += h, m.appendChild(k), l || (m.style.background = "", f.appendChild(m)), i = c(k, a), l ? k.parentNode.removeChild(k) : m.parentNode.removeChild(m), !!i;
  },
      y = function () {
    function d(d, e) {
      e = e || b.createElement(a[d] || "div"), d = "on" + d;
      var f = d in e;
      return f || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""), f = D(e[d], "function"), D(e[d], "undefined") || (e[d] = c), e.removeAttribute(d))), e = null, f;
    }

    var a = {
      select: "input",
      change: "input",
      submit: "form",
      reset: "form",
      error: "img",
      load: "img",
      abort: "img"
    };
    return d;
  }(),
      z = {}.hasOwnProperty,
      A;

  !D(z, "undefined") && !D(z.call, "undefined") ? A = function A(a, b) {
    return z.call(a, b);
  } : A = function A(a, b) {
    return b in a && D(a.constructor.prototype[b], "undefined");
  }, Function.prototype.bind || (Function.prototype.bind = function (b) {
    var c = this;
    if (typeof c != "function") throw new TypeError();

    var d = v.call(arguments, 1),
        e = function e() {
      if (this instanceof e) {
        var a = function a() {};

        a.prototype = c.prototype;
        var f = new a(),
            g = c.apply(f, d.concat(v.call(arguments)));
        return Object(g) === g ? g : f;
      }

      return c.apply(b, d.concat(v.call(arguments)));
    };

    return e;
  });

  var I = function (c, d) {
    var f = c.join(""),
        g = d.length;
    x(f, function (c, d) {
      var f = b.styleSheets[b.styleSheets.length - 1],
          h = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "",
          i = c.childNodes,
          j = {};

      while (g--) {
        j[i[g].id] = i[g];
      }

      e.touch = "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch || (j.touch && j.touch.offsetTop) === 9;
    }, g, d);
  }([, ["@media (", m.join("touch-enabled),("), g, ")", "{#touch{top:9px;position:absolute}}"].join("")], [, "touch"]);

  r.canvas = function () {
    var a = b.createElement("canvas");
    return !!a.getContext && !!a.getContext("2d");
  }, r.canvastext = function () {
    return !!e.canvas && !!D(b.createElement("canvas").getContext("2d").fillText, "function");
  }, r.webgl = function () {
    try {
      var d = b.createElement("canvas"),
          e;
      e = !(!a.WebGLRenderingContext || !d.getContext("experimental-webgl") && !d.getContext("webgl")), d = c;
    } catch (f) {
      e = !1;
    }

    return e;
  }, r.touch = function () {
    return e.touch;
  }, r.geolocation = function () {
    return !!navigator.geolocation;
  }, r.postmessage = function () {
    return !!a.postMessage;
  }, r.websqldatabase = function () {
    return !!a.openDatabase;
  }, r.indexedDB = function () {
    return !!H("indexedDB", a);
  }, r.hashchange = function () {
    return y("hashchange", a) && (b.documentMode === c || b.documentMode > 7);
  }, r.history = function () {
    return !!a.history && !!history.pushState;
  }, r.draganddrop = function () {
    var a = b.createElement("div");
    return "draggable" in a || "ondragstart" in a && "ondrop" in a;
  }, r.websockets = function () {
    for (var b = -1, c = o.length; ++b < c;) {
      if (a[o[b] + "WebSocket"]) return !0;
    }

    return "WebSocket" in a;
  }, r.video = function () {
    var a = b.createElement("video"),
        c = !1;

    try {
      if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "");
    } catch (d) {}

    return c;
  }, r.audio = function () {
    var a = b.createElement("audio"),
        c = !1;

    try {
      if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, "");
    } catch (d) {}

    return c;
  }, r.localstorage = function () {
    try {
      return localStorage.setItem(g, g), localStorage.removeItem(g), !0;
    } catch (a) {
      return !1;
    }
  }, r.sessionstorage = function () {
    try {
      return sessionStorage.setItem(g, g), sessionStorage.removeItem(g), !0;
    } catch (a) {
      return !1;
    }
  }, r.webworkers = function () {
    return !!a.Worker;
  }, r.applicationcache = function () {
    return !!a.applicationCache;
  }, r.svg = function () {
    return !!b.createElementNS && !!b.createElementNS(q.svg, "svg").createSVGRect;
  }, r.inlinesvg = function () {
    var a = b.createElement("div");
    return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == q.svg;
  }, r.smil = function () {
    return !!b.createElementNS && /SVGAnimate/.test(l.call(b.createElementNS(q.svg, "animate")));
  }, r.svgclippaths = function () {
    return !!b.createElementNS && /SVGClipPath/.test(l.call(b.createElementNS(q.svg, "clipPath")));
  };

  for (var K in r) {
    A(r, K) && (w = K.toLowerCase(), e[w] = r[K](), u.push((e[w] ? "" : "no-") + w));
  }

  return e.input || J(), e.addTest = function (a, b) {
    if (_typeof(a) == "object") for (var d in a) {
      A(a, d) && e.addTest(d, a[d]);
    } else {
      a = a.toLowerCase();
      if (e[a] !== c) return e;
      b = typeof b == "function" ? b() : b, e[a] = b;
    }
    return e;
  }, B(""), h = j = null, function (a, b) {
    function g(a, b) {
      var c = a.createElement("p"),
          d = a.getElementsByTagName("head")[0] || a.documentElement;
      return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild);
    }

    function h() {
      var a = k.elements;
      return typeof a == "string" ? a.split(" ") : a;
    }

    function i(a) {
      var b = {},
          c = a.createElement,
          e = a.createDocumentFragment,
          f = e();
      a.createElement = function (a) {
        var e = (b[a] || (b[a] = c(a))).cloneNode();
        return k.shivMethods && e.canHaveChildren && !d.test(a) ? f.appendChild(e) : e;
      }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + h().join().replace(/\w+/g, function (a) {
        return b[a] = c(a), f.createElement(a), 'c("' + a + '")';
      }) + ");return n}")(k, f);
    }

    function j(a) {
      var b;
      return a.documentShived ? a : (k.shivCSS && !e && (b = !!g(a, "article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio{display:none}canvas,video{display:inline-block;*display:inline;*zoom:1}[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}mark{background:#FF0;color:#000}")), f || (b = !i(a)), b && (a.documentShived = b), a);
    }

    var c = a.html5 || {},
        d = /^<|^(?:button|form|map|select|textarea)$/i,
        e,
        f;

    (function () {
      var a = b.createElement("a");
      a.innerHTML = "<xyz></xyz>", e = "hidden" in a, f = a.childNodes.length == 1 || function () {
        try {
          b.createElement("a");
        } catch (a) {
          return !0;
        }

        var c = b.createDocumentFragment();
        return typeof c.cloneNode == "undefined" || typeof c.createDocumentFragment == "undefined" || typeof c.createElement == "undefined";
      }();
    })();

    var k = {
      elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
      shivCSS: c.shivCSS !== !1,
      shivMethods: c.shivMethods !== !1,
      type: "default",
      shivDocument: j
    };
    a.html5 = k, j(b);
  }(this, b), e._version = d, e._prefixes = m, e._domPrefixes = p, e._cssomPrefixes = o, e.hasEvent = y, e.testProp = function (a) {
    return F([a]);
  }, e.testAllProps = H, e.testStyles = x, e.prefixed = function (a, b, c) {
    return b ? H(a, b, c) : H(a, "pfx");
  }, e;
}(void 0, (void 0).document), function (a, b, c) {
  function d(a) {
    return o.call(a) == "[object Function]";
  }

  function e(a) {
    return typeof a == "string";
  }

  function f() {}

  function g(a) {
    return !a || a == "loaded" || a == "complete" || a == "uninitialized";
  }

  function h() {
    var a = p.shift();
    q = 1, a ? a.t ? m(function () {
      (a.t == "c" ? _B.injectCss : _B.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
    }, 0) : (a(), h()) : q = 0;
  }

  function i(a, c, d, e, f, i, j) {
    function k(b) {
      if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
        a != "img" && m(function () {
          t.removeChild(l);
        }, 50);

        for (var d in y[c]) {
          y[c].hasOwnProperty(d) && y[c][d].onload();
        }
      }
    }

    var j = j || _B.errorTimeout,
        l = {},
        o = 0,
        r = 0,
        u = {
      t: d,
      s: c,
      e: f,
      a: i,
      x: j
    };
    y[c] === 1 && (r = 1, y[c] = [], l = b.createElement(a)), a == "object" ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function () {
      k.call(this, r);
    }, p.splice(e, 0, u), a != "img" && (r || y[c] === 2 ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l));
  }

  function j(a, b, c, d, f) {
    return q = 0, b = b || "j", e(a) ? i(b == "c" ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), p.length == 1 && h()), this;
  }

  function k() {
    var a = _B;
    return a.loader = {
      load: j,
      i: 0
    }, a;
  }

  var l = b.documentElement,
      m = a.setTimeout,
      n = b.getElementsByTagName("script")[0],
      o = {}.toString,
      p = [],
      q = 0,
      r = "MozAppearance" in l.style,
      s = r && !!b.createRange().compareNode,
      t = s ? l : n.parentNode,
      l = a.opera && o.call(a.opera) == "[object Opera]",
      l = !!b.attachEvent && !l,
      u = r ? "object" : l ? "script" : "img",
      v = l ? "script" : u,
      w = Array.isArray || function (a) {
    return o.call(a) == "[object Array]";
  },
      x = [],
      y = {},
      z = {
    timeout: function timeout(a, b) {
      return b.length && (a.timeout = b[0]), a;
    }
  },
      _A,
      _B;

  _B = function B(a) {
    function b(a) {
      var a = a.split("!"),
          b = x.length,
          c = a.pop(),
          d = a.length,
          c = {
        url: c,
        origUrl: c,
        prefixes: a
      },
          e,
          f,
          g;

      for (f = 0; f < d; f++) {
        g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
      }

      for (f = 0; f < b; f++) {
        c = x[f](c);
      }

      return c;
    }

    function g(a, e, f, g, i) {
      var j = b(a),
          l = j.autoCallback;
      j.url.split(".").pop().split("?").shift(), j.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]] || h), j.instead ? j.instead(a, e, f, g, i) : (y[j.url] ? j.noexec = !0 : y[j.url] = 1, f.load(j.url, j.forceCSS || !j.forceJS && "css" == j.url.split(".").pop().split("?").shift() ? "c" : c, j.noexec, j.attrs, j.timeout), (d(e) || d(l)) && f.load(function () {
        k(), e && e(j.origUrl, i, g), l && l(j.origUrl, i, g), y[j.url] = 2;
      })));
    }

    function i(a, b) {
      function c(a, c) {
        if (a) {
          if (e(a)) c || (j = function j() {
            var a = [].slice.call(arguments);
            k.apply(this, a), l();
          }), g(a, j, b, 0, h);else if (Object(a) === a) for (n in m = function () {
            var b = 0,
                c;

            for (c in a) {
              a.hasOwnProperty(c) && b++;
            }

            return b;
          }(), a) {
            a.hasOwnProperty(n) && (!c && ! --m && (d(j) ? j = function j() {
              var a = [].slice.call(arguments);
              k.apply(this, a), l();
            } : j[n] = function (a) {
              return function () {
                var b = [].slice.call(arguments);
                a && a.apply(this, b), l();
              };
            }(k[n])), g(a[n], j, b, n, h));
          }
        } else !c && l();
      }

      var h = !!a.test,
          i = a.load || a.both,
          j = a.callback || f,
          k = j,
          l = a.complete || f,
          m,
          n;
      c(h ? a.yep : a.nope, !!i), i && c(i);
    }

    var j,
        l,
        m = this.yepnope.loader;
    if (e(a)) g(a, 0, m, 0);else if (w(a)) for (j = 0; j < a.length; j++) {
      l = a[j], e(l) ? g(l, 0, m, 0) : w(l) ? _B(l) : Object(l) === l && i(l, m);
    } else Object(a) === a && i(a, m);
  }, _B.addPrefix = function (a, b) {
    z[a] = b;
  }, _B.addFilter = function (a) {
    x.push(a);
  }, _B.errorTimeout = 1e4, b.readyState == null && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", _A = function A() {
    b.removeEventListener("DOMContentLoaded", _A, 0), b.readyState = "complete";
  }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) {
    var k = b.createElement("script"),
        l,
        o,
        e = e || _B.errorTimeout;
    k.src = a;

    for (o in d) {
      k.setAttribute(o, d[o]);
    }

    c = j ? h : c || f, k.onreadystatechange = k.onload = function () {
      !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null);
    }, m(function () {
      l || (l = 1, c(1));
    }, e), i ? k.onload() : n.parentNode.insertBefore(k, n);
  }, a.yepnope.injectCss = function (a, c, d, e, g, i) {
    var e = b.createElement("link"),
        j,
        c = i ? h : c || f;
    e.href = a, e.rel = "stylesheet", e.type = "text/css";

    for (j in d) {
      e.setAttribute(j, d[j]);
    }

    g || (n.parentNode.insertBefore(e, n), m(c, 0));
  };
}(void 0, document), Modernizr.load = function () {
  yepnope.apply(window, [].slice.call(arguments, 0));
};