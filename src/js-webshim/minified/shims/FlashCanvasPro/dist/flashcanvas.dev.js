"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

window.FlashCanvasOptions = window.FlashCanvasOptions || {}, webshims.$.extend(FlashCanvasOptions, {
  swfPath: webshims.cfg.basePath + "FlashCanvasPro/"
}), window.ActiveXObject && !window.CanvasRenderingContext2D && function (l, k, q) {
  function O(a) {
    this.code = a, this.message = ga[a];
  }

  function w(a, b, c) {
    if (!c) for (var c = [], d = 0, e = a * b * 4; e > d; ++d) {
      c[d] = 0;
    }
    this.width = a, this.height = b, this.data = c;
  }

  function ha(a) {
    this.width = a;
  }

  function x(a) {
    this.id = a.F++;
  }

  function o(a) {
    this.J = a, this.id = a.F++;
  }

  function A(a, b) {
    this.canvas = a, this.z = b, this.e = b.id.slice(8), this.G(), this.F = 0, this.j = this.D = "", this.d = 0;
  }

  function B() {
    if ("complete" === k.readyState) {
      k.detachEvent(P, B);

      for (var a = k.getElementsByTagName(r), b = 0, c = a.length; c > b; ++b) {
        C.initElement(a[b]);
      }
    }
  }

  function Q() {
    var a = event.srcElement,
        b = a.parentNode;
    a.blur(), b.focus();
  }

  function D() {
    2 & event.button && event.srcElement.parentNode.setCapture();
  }

  function E() {
    2 & event.button && event.srcElement.parentNode.releaseCapture();
  }

  function R() {
    var a = event.propertyName;

    if ("width" === a || "height" === a) {
      var b = event.srcElement,
          c = b[a],
          d = parseInt(c, 10);
      (isNaN(d) || 0 > d) && (d = "width" === a ? 300 : 150), c === d ? (b.style[a] = d + "px", b.getContext("2d").K(b.width, b.height)) : b[a] = d;
    }
  }

  function S() {
    l.detachEvent(T, S);

    for (var a in m) {
      var b,
          c = m[a],
          d = c.firstChild;

      for (b in d) {
        "function" == typeof d[b] && (d[b] = g);
      }

      for (b in c) {
        "function" == typeof c[b] && (c[b] = g);
      }

      d.detachEvent(U, Q), d.detachEvent(F, D), c.detachEvent(G, E), c.detachEvent(V, R);
    }

    l[W] = g, l[X] = g, l[Y] = g, l[H] = g, l[Z] = g;
  }

  function ia(a) {
    return a.toLowerCase();
  }

  function i(a) {
    throw new O(a);
  }

  function $(a) {
    var b = parseInt(a.width, 10),
        c = parseInt(a.height, 10);
    (isNaN(b) || 0 > b) && (b = 300), (isNaN(c) || 0 > c) && (c = 150), a.width = b, a.height = c;
  }

  function I(a, b) {
    for (var c in m) {
      var d = m[c].getContext("2d");
      d.g.push(d.a.length + 2), d.a.push(y, a, b);
    }
  }

  var g = null,
      r = "canvas",
      W = "CanvasRenderingContext2D",
      X = "CanvasGradient",
      Y = "CanvasPattern",
      H = "FlashCanvas",
      Z = "G_vmlCanvasManager",
      U = "onfocus",
      F = "onmousedown",
      G = "onmouseup",
      V = "onpropertychange",
      P = "onreadystatechange",
      T = "onunload",
      n;

  try {
    n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").match(/[\d,]+/)[0].replace(/,/g, ".");
  } catch (ka) {
    n = 0;
  }

  var j = l[H + "Options"] || {},
      J = function () {
    var a = k.getElementsByTagName("script"),
        a = a[a.length - 1];
    return k.documentMode >= 8 ? a.src : a.getAttribute("src", 4);
  }().replace(/[^\/]+$/, ""),
      t = j.swfPath || J;

  t += parseInt(n) > 9 ? "flash10canvas.swf" : "flash9canvas.swf";
  var y = "4",
      s = {},
      u = {},
      aa = {},
      K = {},
      p = {},
      ba = {},
      v = {},
      m = {},
      z = {},
      J = "autoinit" in j ? j.autoinit : 1,
      L = "turbo" in j ? j.turbo : 1,
      M = j.delay || 0,
      ca = j.disableContextMenu || 0,
      da = j.imageCacheSize || 100,
      N = j.usePolicyFile || 0,
      ea = j.proxy || "proxy.php",
      fa = j.save || "save.php";
  "10.1.53.64" === n && (L = 0, M = 30), A.prototype = {
    save: function save() {
      this.h(15), this.I.push([this.m, this.n, this.w, this.l, this.q, this.o, this.p, this.r, this.u, this.v, this.s, this.t, this.j, this.A, this.B]), this.a.push("B");
    },
    restore: function restore() {
      var a = this.I;
      a.length && (a = a.pop(), this.globalAlpha = a[0], this.globalCompositeOperation = a[1], this.strokeStyle = a[2], this.fillStyle = a[3], this.lineWidth = a[4], this.lineCap = a[5], this.lineJoin = a[6], this.miterLimit = a[7], this.shadowOffsetX = a[8], this.shadowOffsetY = a[9], this.shadowBlur = a[10], this.shadowColor = a[11], this.font = a[12], this.textAlign = a[13], this.textBaseline = a[14]), this.a.push("C");
    },
    scale: function scale(a, b) {
      this.a.push("D", a, b);
    },
    rotate: function rotate(a) {
      this.a.push("E", a);
    },
    translate: function translate(a, b) {
      this.a.push("F", a, b);
    },
    transform: function transform(a, b, c, d, e, f) {
      this.a.push("G", a, b, c, d, e, f);
    },
    setTransform: function setTransform(a, b, c, d, e, f) {
      this.a.push("H", a, b, c, d, e, f);
    },
    createLinearGradient: function createLinearGradient(a, b, c, d) {
      return !(isFinite(a) && isFinite(b) && isFinite(c) && isFinite(d) || !i(9)), this.a.push("M", a, b, c, d), new o(this);
    },
    createRadialGradient: function createRadialGradient(a, b, c, d, e, f) {
      return !(isFinite(a) && isFinite(b) && isFinite(c) && isFinite(d) && isFinite(e) && isFinite(f) || !i(9)), (0 > c || 0 > f) && i(1), this.a.push("N", a, b, c, d, e, f), new o(this);
    },
    createPattern: function createPattern(a, b) {
      a || i(17);
      var c,
          d,
          e,
          f = a.tagName,
          h = this.e;
      if (f) {
        if (f = f.toLowerCase(), "img" === f) c = a.getAttribute("src", 2);else if (f === r) d = this.C(a), e = a !== this.canvas;else {
          if ("video" === f) return;
          i(17);
        }
      } else a.src ? c = a.src : i(17);
      return "repeat" === b || "no-repeat" === b || "repeat-x" === b || "repeat-y" === b || "" === b || b === g || i(12), d || (d = u[h][c], (e = d === q) && (d = this.k(c))), this.a.push("O", d, b), e && s[h] && (this.f(), ++p[h]), new x(this);
    },
    clearRect: function clearRect(a, b, c, d) {
      this.a.push("X", a, b, c, d), this.b || this.c(), this.d = 0;
    },
    fillRect: function fillRect(a, b, c, d) {
      this.h(1), this.a.push("Y", a, b, c, d), this.b || this.c(), this.d = 0;
    },
    strokeRect: function strokeRect(a, b, c, d) {
      this.h(6), this.a.push("Z", a, b, c, d), this.b || this.c(), this.d = 0;
    },
    beginPath: function beginPath() {
      this.a.push("a");
    },
    closePath: function closePath() {
      this.a.push("b");
    },
    moveTo: function moveTo(a, b) {
      this.a.push("c", a, b);
    },
    lineTo: function lineTo(a, b) {
      this.a.push("d", a, b);
    },
    quadraticCurveTo: function quadraticCurveTo(a, b, c, d) {
      this.a.push("e", a, b, c, d);
    },
    bezierCurveTo: function bezierCurveTo(a, b, c, d, e, f) {
      this.a.push("f", a, b, c, d, e, f);
    },
    arcTo: function arcTo(a, b, c, d, e) {
      0 > e && isFinite(e) && i(1), this.a.push("g", a, b, c, d, e);
    },
    rect: function rect(a, b, c, d) {
      this.a.push("h", a, b, c, d);
    },
    arc: function arc(a, b, c, d, e, f) {
      0 > c && isFinite(c) && i(1), this.a.push("i", a, b, c, d, e, f ? 1 : 0);
    },
    fill: function fill() {
      this.h(1), this.a.push("j"), this.b || this.c(), this.d = 0;
    },
    stroke: function stroke() {
      this.h(6), this.a.push("k"), this.b || this.c(), this.d = 0;
    },
    clip: function clip() {
      this.a.push("l");
    },
    isPointInPath: function isPointInPath(a, b) {
      return this.a.push("m", a, b), "true" === this.f();
    },
    fillText: function fillText(a, b, c, d) {
      this.h(9), this.g.push(this.a.length + 1), this.a.push("r", a, b, c, d === q ? 1 / 0 : d), this.b || this.c(), this.d = 0;
    },
    strokeText: function strokeText(a, b, c, d) {
      this.h(10), this.g.push(this.a.length + 1), this.a.push("s", a, b, c, d === q ? 1 / 0 : d), this.b || this.c(), this.d = 0;
    },
    measureText: function measureText(a) {
      var b = z[this.e];

      try {
        b.style.font = this.font;
      } catch (c) {}

      return b.innerText = ("" + a).replace(/[ \n\f\r]/g, "	"), new ha(b.offsetWidth);
    },
    drawImage: function drawImage(a, b, c, d, e, f, g, h, j) {
      a || i(17);
      var k,
          l,
          m,
          n = a.tagName,
          o = arguments.length,
          t = this.e;
      if (n) {
        if (n = n.toLowerCase(), "img" === n) k = a.getAttribute("src", 2);else if (n === r) l = this.C(a), m = a !== this.canvas;else {
          if ("video" === n) return;
          i(17);
        }
      } else a.src ? k = a.src : i(17);
      if (l || (l = u[t][k], (m = l === q) && (l = this.k(k))), this.h(0), 3 === o) this.a.push("u", o, l, b, c);else if (5 === o) this.a.push("u", o, l, b, c, d, e);else {
        if (9 !== o) return;
        (0 === d || 0 === e) && i(1), this.a.push("u", o, l, b, c, d, e, f, g, h, j);
      }
      m && s[t] ? (this.f(), ++p[t]) : this.b || this.c(), this.d = 0;
    },
    createImageData: function createImageData(a, b) {
      var c = Math.ceil;
      return 2 === arguments.length ? ((!isFinite(a) || !isFinite(b)) && i(9), (0 === a || 0 === b) && i(1)) : (a instanceof w || i(9), b = a.height, a = a.width), a = c(0 > a ? -a : a), b = c(0 > b ? -b : b), new w(a, b);
    },
    getImageData: function getImageData(a, b, c, d) {
      return !(isFinite(a) && isFinite(b) && isFinite(c) && isFinite(d) || !i(9)), (0 === c || 0 === d) && i(1), this.a.push("w", a, b, c, d), a = this.f(), c = "object" == (typeof JSON === "undefined" ? "undefined" : _typeof(JSON)) ? JSON.parse(a) : k.documentMode ? eval(a) : a.slice(1, -1).split(","), a = c.shift(), b = c.shift(), new w(a, b, c);
    },
    putImageData: function putImageData(a, b, c, d, e, f, g) {
      a instanceof w || i(17), (!isFinite(b) || !isFinite(c)) && i(9);
      var h = arguments.length,
          j = a.width,
          k = a.height,
          l = a.data;
      3 === h ? this.a.push("x", h, j, k, l.toString(), b, c) : 7 === h && (!(isFinite(d) && isFinite(e) && isFinite(f) && isFinite(g) || !i(9)), this.a.push("x", h, j, k, l.toString(), b, c, d, e, f, g)), this.b || this.c(), this.d = 0;
    },
    loadFont: function loadFont(a, b, c) {
      var d = this.e;
      (b || c) && (v[d][a] = [a, b, c]), this.g.push(this.a.length + 1), this.a.push("6", a), s[d] ? (this.f(), ++p[d]) : this.b || this.c();
    },
    loadImage: function loadImage(a, b, c) {
      var d,
          e = a.tagName,
          f = this.e;
      e ? "img" === e.toLowerCase() && (d = a.getAttribute("src", 2)) : a.src && (d = a.src), d && u[f][d] === q && (e = this.k(d), (b || c) && (v[f][e] = [a, b, c]), this.a.push("u", 1, e), s[f] && (this.f(), ++p[f]));
    },
    G: function G() {
      this.globalAlpha = this.m = 1, this.globalCompositeOperation = this.n = "source-over", this.fillStyle = this.l = this.strokeStyle = this.w = "#000000", this.lineWidth = this.q = 1, this.lineCap = this.o = "butt", this.lineJoin = this.p = "miter", this.miterLimit = this.r = 10, this.shadowBlur = this.s = this.shadowOffsetY = this.v = this.shadowOffsetX = this.u = 0, this.shadowColor = this.t = "rgba(0, 0, 0, 0.0)", this.font = this.j = "10px sans-serif", this.textAlign = this.A = "start", this.textBaseline = this.B = "alphabetic", this.a = [], this.I = [], this.i = [], this.g = [], this.b = g, this.H = 1;
    },
    h: function h(a) {
      var b,
          c = this.a;
      this.m !== this.globalAlpha && c.push("I", this.m = this.globalAlpha), this.n !== this.globalCompositeOperation && c.push("J", this.n = this.globalCompositeOperation), this.u !== this.shadowOffsetX && c.push("T", this.u = this.shadowOffsetX), this.v !== this.shadowOffsetY && c.push("U", this.v = this.shadowOffsetY), this.s !== this.shadowBlur && c.push("V", this.s = this.shadowBlur), this.t !== this.shadowColor && (b = this.t = this.shadowColor, ("" + b).indexOf("%") > 0 && this.i.push(c.length + 1), c.push("W", b)), 1 & a && this.l !== this.fillStyle && (b = this.l = this.fillStyle, "string" == typeof b ? (b.indexOf("%") > 0 && this.i.push(c.length + 1), c.push("L", b)) : (b instanceof o || b instanceof x) && c.push("L", b.id)), 2 & a && this.w !== this.strokeStyle && (b = this.w = this.strokeStyle, "string" == typeof b ? (b.indexOf("%") > 0 && this.i.push(c.length + 1), c.push("K", b)) : (b instanceof o || b instanceof x) && c.push("K", b.id)), 4 & a && (this.q !== this.lineWidth && c.push("P", this.q = this.lineWidth), this.o !== this.lineCap && c.push("Q", this.o = this.lineCap), this.p !== this.lineJoin && c.push("R", this.p = this.lineJoin), this.r !== this.miterLimit && c.push("S", this.r = this.miterLimit)), 8 & a && (this.j !== this.font && (a = z[this.e].offsetHeight, this.g.push(c.length + 2), c.push("o", a, this.j = this.font)), this.A !== this.textAlign && c.push("p", this.A = this.textAlign), this.B !== this.textBaseline && c.push("q", this.B = this.textBaseline), this.D !== this.canvas.currentStyle.direction && c.push("1", this.D = this.canvas.currentStyle.direction));
    },
    c: function c() {
      var a = this;
      a.b = setTimeout(function () {
        p[a.e] ? a.c() : (a.b = g, a.f(L));
      }, M);
    },
    L: function L() {
      clearTimeout(this.b), this.b = g;
    },
    f: function f(a) {
      var b,
          c,
          d,
          e = this.i,
          f = this.g,
          g = this.a,
          h = this.z;

      if (g.length) {
        if (this.b && this.L(), a) {
          for (b = 0, c = e.length; c > b; ++b) {
            d = e[b], g[d] = encodeURI(g[d]);
          }

          for (b = 0, c = f.length; c > b; ++b) {
            d = f[b], g[d] = encodeURIComponent(g[d]);
          }
        } else for (b = 0, c = f.length; c > b; ++b) {
          d = f[b], g[d] = ("" + g[d]).replace(/&/g, "&amp;").replace(/</g, "&lt;");
        }

        if (b = g.join(""), this.a = [], this.i = [], this.g = [], !a) return h.CallFunction('<invoke name="executeCommand" returntype="javascript"><arguments><string>' + b + "</string></arguments></invoke>");
        h.flashvars = "c=" + b, h.width = h.clientWidth + this.H, this.H ^= -2;
      }
    },
    K: function K(a, b) {
      this.f(), this.G(), a > 0 && (this.z.width = a), b > 0 && (this.z.height = b), this.a.push("2", a, b), this.b || this.c(), this.d = 0;
    },
    C: function C(a) {
      var b = a.getContext("2d").e,
          c = r + ":" + b;
      return (0 === a.width || 0 === a.height) && i(11), b === this.e || (a = m[b].getContext("2d"), a.d) || (b = ++ba[b], c += ":" + b, a.a.push("3", b), a.b || a.c(), a.d = 1), c;
    },
    k: function k(a) {
      var b = this.e,
          c = u[b],
          d = aa[b],
          e = c[a] = K[b]++;
      return e >= da - 1 && (K[b] = 0), e in d && delete c[d[e]], this.g.push(this.a.length + 2), this.a.push("5", e, a), d[e] = a, e;
    }
  }, o.prototype = {
    addColorStop: function addColorStop(a, b) {
      (isNaN(a) || 0 > a || a > 1) && i(1);
      var c = this.J,
          d = this.id;
      ("" + b).indexOf("%") > 0 && c.i.push(c.a.length + 3), c.a.push("y", d, a, b);
    }
  }, O.prototype = Error();
  var ga = {
    1: "INDEX_SIZE_ERR",
    9: "NOT_SUPPORTED_ERR",
    11: "INVALID_STATE_ERR",
    12: "SYNTAX_ERR",
    17: "TYPE_MISMATCH_ERR",
    18: "SECURITY_ERR"
  },
      C = {
    initElement: function initElement(a) {
      if (a.getContext) return a;
      var b = Math.random().toString(36).slice(2) || "0",
          c = "external" + b;
      s[b] = 0, u[b] = {}, aa[b] = [], K[b] = 0, p[b] = 1, ba[b] = 0, v[b] = [], $(a), a.innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + location.protocol + '//fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="100%" height="100%" id="' + c + '"><param name="allowScriptAccess" value="always"><param name="flashvars" value="id=' + c + '"><param name="wmode" value="transparent"></object><span style="margin:0;padding:0;border:0;display:inline-block;position:static;height:1em;overflow:visible;white-space:nowrap"></span>', m[b] = a;
      var d = a.firstChild;
      z[b] = a.lastChild;
      var e = k.body.contains;
      if (e(a)) d.movie = t;else var f = setInterval(function () {
        e(a) && (clearInterval(f), d.movie = t);
      }, 0);
      "BackCompat" !== k.compatMode && l.XMLHttpRequest || (z[b].style.overflow = "hidden");
      var h = new A(a, d);
      return a.getContext = function (a) {
        return "2d" === a ? h : g;
      }, a.toDataURL = function (b, c) {
        return 0 === a.width || 0 === a.height ? "data:," : ("image/jpeg" === ("" + b).replace(/[A-Z]+/g, ia) ? h.a.push("A", b, "number" == typeof c ? c : "") : h.a.push("A", b), h.f().slice(1, -1));
      }, d.attachEvent(U, Q), ca && (d.attachEvent(F, D), a.attachEvent(G, E)), N && h.a.push(y, "usePolicyFile", N), b = h.a.length, h.g.push(b + 2, b + 5), h.a.push(y, "proxy", ea, y, "save", fa), a;
    },
    saveImage: function saveImage(a, b) {
      a.firstChild.saveImage(b);
    },
    setOptions: function setOptions(a) {
      for (var b in a) {
        var c = a[b];

        switch (b) {
          case "turbo":
            L = c;
            break;

          case "delay":
            M = c;
            break;

          case "disableContextMenu":
            ca = c;
            var d = void 0;

            for (d in m) {
              var e = m[d],
                  f = c ? "attachEvent" : "detachEvent";
              e.firstChild[f](F, D), e[f](G, E);
            }

            break;

          case "imageCacheSize":
            da = c;
            break;

          case "usePolicyFile":
            I(b, N = c ? 1 : 0);
            break;

          case "proxy":
            I(b, ea = c);
            break;

          case "save":
            I(b, fa = c);
        }
      }
    },
    trigger: function trigger(a, b) {
      m[a].fireEvent("on" + b);
    },
    unlock: function unlock(a, b, c) {
      var d, e, f;
      p[a] && --p[a], b === q ? (d = m[a], b = d.firstChild, $(d), e = d.width, c = d.height, d.style.width = e + "px", d.style.height = c + "px", e > 0 && (b.width = e), c > 0 && (b.height = c), b.resize(e, c), d.attachEvent(V, R), s[a] = 1, "function" == typeof d.onload && setTimeout(function () {
        d.onload();
      }, 0)) : (f = v[a][b]) && (e = f[0], c = f[1 + c], delete v[a][b], "function" == typeof c && c.call(e));
    }
  };
  k.createElement(r), k.createStyleSheet().cssText = r + "{display:inline-block;overflow:hidden;width:300px;height:150px}", J && ("complete" === k.readyState ? B() : k.attachEvent(P, B)), l.attachEvent(T, S), 0 === t.indexOf(location.protocol + "//" + location.host + "/") && (n = new ActiveXObject("Microsoft.XMLHTTP"), n.open("GET", t, !1), n.send(g)), l[W] = A, l[X] = o, l[Y] = x, l[H] = C, l[Z] = {
    init: function init() {},
    init_: function init_() {},
    initElement: C.initElement
  };
}(window, document), function (a) {
  webshims.addReady(function (b, c) {
    b == a && window.G_vmlCanvasManager && G_vmlCanvasManager.init_ && G_vmlCanvasManager.init_(a), webshims.$("canvas", b).add(c.filter("canvas")).each(function () {
      var a = this.getContext;
      !a && window.G_vmlCanvasManager && G_vmlCanvasManager.initElement(this);
    });
  }), webshims.isReady("canvas", !0);
}(document);