"use strict";

window.FlashCanvasOptions = window.FlashCanvasOptions || {};
webshims.$.extend(FlashCanvasOptions, {
  swfPath: webshims.cfg.basePath + 'FlashCanvas/'
});
/*
 * FlashCanvas
 *
 * Copyright (c) 2009      Tim Cameron Ryan
 * Copyright (c) 2009-2013 FlashCanvas Project
 * Released under the MIT/X License
 */

window.ActiveXObject && !window.CanvasRenderingContext2D && function (i, j, z) {
  function D(a) {
    this.code = a;
    this.message = R[a];
  }

  function S(a) {
    this.width = a;
  }

  function v(a) {
    this.id = a.C++;
  }

  function k(a) {
    this.G = a;
    this.id = a.C++;
  }

  function m(a, b) {
    this.canvas = a;
    this.B = b;
    this.d = b.id.slice(8);
    this.D();
    this.C = 0;
    this.f = this.u = "";
    var c = this;
    setInterval(function () {
      o[c.d] === 0 && c.e();
    }, 30);
  }

  function A() {
    if (j.readyState === "complete") {
      j.detachEvent(E, A);

      for (var a = j.getElementsByTagName(r), b = 0, c = a.length; b < c; ++b) {
        B.initElement(a[b]);
      }
    }
  }

  function F() {
    var a = event.srcElement,
        b = a.parentNode;
    a.blur();
    b.focus();
  }

  function G() {
    var a = event.propertyName;

    if (a === "width" || a === "height") {
      var b = event.srcElement,
          c = b[a],
          d = parseInt(c, 10);
      if (isNaN(d) || d < 0) d = a === "width" ? 300 : 150;
      c === d ? (b.style[a] = d + "px", b.getContext("2d").I(b.width, b.height)) : b[a] = d;
    }
  }

  function H() {
    i.detachEvent(I, H);

    for (var a in s) {
      var b = s[a],
          c = b.firstChild,
          d;

      for (d in c) {
        typeof c[d] === "function" && (c[d] = l);
      }

      for (d in b) {
        typeof b[d] === "function" && (b[d] = l);
      }

      c.detachEvent(J, F);
      b.detachEvent(K, G);
    }

    i[L] = l;
    i[M] = l;
    i[N] = l;
    i[C] = l;
    i[O] = l;
  }

  function T() {
    var a = j.getElementsByTagName("script"),
        a = a[a.length - 1];
    return j.documentMode >= 8 ? a.src : a.getAttribute("src", 4);
  }

  function t(a) {
    return ("" + a).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }

  function U(a) {
    return a.toLowerCase();
  }

  function h(a) {
    throw new D(a);
  }

  function P(a) {
    var b = parseInt(a.width, 10),
        c = parseInt(a.height, 10);
    if (isNaN(b) || b < 0) b = 300;
    if (isNaN(c) || c < 0) c = 150;
    a.width = b;
    a.height = c;
  }

  var l = null,
      r = "canvas",
      L = "CanvasRenderingContext2D",
      M = "CanvasGradient",
      N = "CanvasPattern",
      C = "FlashCanvas",
      O = "G_vmlCanvasManager",
      J = "onfocus",
      K = "onpropertychange",
      E = "onreadystatechange",
      I = "onunload",
      w = ((i[C + "Options"] || {}).swfPath || T().replace(/[^\/]+$/, "")) + "flashcanvas.swf",
      e = new function (a) {
    for (var b = 0, c = a.length; b < c; b++) {
      this[a[b]] = b;
    }
  }("toDataURL,save,restore,scale,rotate,translate,transform,setTransform,globalAlpha,globalCompositeOperation,strokeStyle,fillStyle,createLinearGradient,createRadialGradient,createPattern,lineWidth,lineCap,lineJoin,miterLimit,shadowOffsetX,shadowOffsetY,shadowBlur,shadowColor,clearRect,fillRect,strokeRect,beginPath,closePath,moveTo,lineTo,quadraticCurveTo,bezierCurveTo,arcTo,rect,arc,fill,stroke,clip,isPointInPath,font,textAlign,textBaseline,fillText,strokeText,measureText,drawImage,createImageData,getImageData,putImageData,addColorStop,direction,resize".split(",")),
      u = {},
      p = {},
      o = {},
      x = {},
      s = {},
      y = {};
  m.prototype = {
    save: function save() {
      this.b();
      this.c();
      this.n();
      this.m();
      this.z();
      this.w();
      this.F.push([this.g, this.h, this.A, this.v, this.k, this.i, this.j, this.l, this.q, this.r, this.o, this.p, this.f, this.s, this.t]);
      this.a.push(e.save);
    },
    restore: function restore() {
      var a = this.F;
      if (a.length) a = a.pop(), this.globalAlpha = a[0], this.globalCompositeOperation = a[1], this.strokeStyle = a[2], this.fillStyle = a[3], this.lineWidth = a[4], this.lineCap = a[5], this.lineJoin = a[6], this.miterLimit = a[7], this.shadowOffsetX = a[8], this.shadowOffsetY = a[9], this.shadowBlur = a[10], this.shadowColor = a[11], this.font = a[12], this.textAlign = a[13], this.textBaseline = a[14];
      this.a.push(e.restore);
    },
    scale: function scale(a, b) {
      this.a.push(e.scale, a, b);
    },
    rotate: function rotate(a) {
      this.a.push(e.rotate, a);
    },
    translate: function translate(a, b) {
      this.a.push(e.translate, a, b);
    },
    transform: function transform(a, b, c, d, f, g) {
      this.a.push(e.transform, a, b, c, d, f, g);
    },
    setTransform: function setTransform(a, b, c, d, f, g) {
      this.a.push(e.setTransform, a, b, c, d, f, g);
    },
    b: function b() {
      var a = this.a;
      if (this.g !== this.globalAlpha) this.g = this.globalAlpha, a.push(e.globalAlpha, this.g);
      if (this.h !== this.globalCompositeOperation) this.h = this.globalCompositeOperation, a.push(e.globalCompositeOperation, this.h);
    },
    n: function n() {
      if (this.A !== this.strokeStyle) {
        var a = this.A = this.strokeStyle;
        if (typeof a !== "string") if (a instanceof k || a instanceof v) a = a.id;else return;
        this.a.push(e.strokeStyle, a);
      }
    },
    m: function m() {
      if (this.v !== this.fillStyle) {
        var a = this.v = this.fillStyle;
        if (typeof a !== "string") if (a instanceof k || a instanceof v) a = a.id;else return;
        this.a.push(e.fillStyle, a);
      }
    },
    createLinearGradient: function createLinearGradient(a, b, c, d) {
      (!isFinite(a) || !isFinite(b) || !isFinite(c) || !isFinite(d)) && h(9);
      this.a.push(e.createLinearGradient, a, b, c, d);
      return new k(this);
    },
    createRadialGradient: function createRadialGradient(a, b, c, d, f, g) {
      (!isFinite(a) || !isFinite(b) || !isFinite(c) || !isFinite(d) || !isFinite(f) || !isFinite(g)) && h(9);
      (c < 0 || g < 0) && h(1);
      this.a.push(e.createRadialGradient, a, b, c, d, f, g);
      return new k(this);
    },
    createPattern: function createPattern(a, b) {
      a || h(17);
      var c = a.tagName,
          d,
          f = this.d;
      if (c) {
        if (c = c.toLowerCase(), c === "img") d = a.getAttribute("src", 2);else if (c === r || c === "video") return;else h(17);
      } else a.src ? d = a.src : h(17);
      b === "repeat" || b === "no-repeat" || b === "repeat-x" || b === "repeat-y" || b === "" || b === l || h(12);
      this.a.push(e.createPattern, t(d), b);
      !p[f][d] && u[f] && (this.e(), ++o[f], p[f][d] = !0);
      return new v(this);
    },
    z: function z() {
      var a = this.a;
      if (this.k !== this.lineWidth) this.k = this.lineWidth, a.push(e.lineWidth, this.k);
      if (this.i !== this.lineCap) this.i = this.lineCap, a.push(e.lineCap, this.i);
      if (this.j !== this.lineJoin) this.j = this.lineJoin, a.push(e.lineJoin, this.j);
      if (this.l !== this.miterLimit) this.l = this.miterLimit, a.push(e.miterLimit, this.l);
    },
    c: function c() {
      var a = this.a;
      if (this.q !== this.shadowOffsetX) this.q = this.shadowOffsetX, a.push(e.shadowOffsetX, this.q);
      if (this.r !== this.shadowOffsetY) this.r = this.shadowOffsetY, a.push(e.shadowOffsetY, this.r);
      if (this.o !== this.shadowBlur) this.o = this.shadowBlur, a.push(e.shadowBlur, this.o);
      if (this.p !== this.shadowColor) this.p = this.shadowColor, a.push(e.shadowColor, this.p);
    },
    clearRect: function clearRect(a, b, c, d) {
      this.a.push(e.clearRect, a, b, c, d);
    },
    fillRect: function fillRect(a, b, c, d) {
      this.b();
      this.c();
      this.m();
      this.a.push(e.fillRect, a, b, c, d);
    },
    strokeRect: function strokeRect(a, b, c, d) {
      this.b();
      this.c();
      this.n();
      this.z();
      this.a.push(e.strokeRect, a, b, c, d);
    },
    beginPath: function beginPath() {
      this.a.push(e.beginPath);
    },
    closePath: function closePath() {
      this.a.push(e.closePath);
    },
    moveTo: function moveTo(a, b) {
      this.a.push(e.moveTo, a, b);
    },
    lineTo: function lineTo(a, b) {
      this.a.push(e.lineTo, a, b);
    },
    quadraticCurveTo: function quadraticCurveTo(a, b, c, d) {
      this.a.push(e.quadraticCurveTo, a, b, c, d);
    },
    bezierCurveTo: function bezierCurveTo(a, b, c, d, f, g) {
      this.a.push(e.bezierCurveTo, a, b, c, d, f, g);
    },
    arcTo: function arcTo(a, b, c, d, f) {
      f < 0 && isFinite(f) && h(1);
      this.a.push(e.arcTo, a, b, c, d, f);
    },
    rect: function rect(a, b, c, d) {
      this.a.push(e.rect, a, b, c, d);
    },
    arc: function arc(a, b, c, d, f, g) {
      c < 0 && isFinite(c) && h(1);
      this.a.push(e.arc, a, b, c, d, f, g ? 1 : 0);
    },
    fill: function fill() {
      this.b();
      this.c();
      this.m();
      this.a.push(e.fill);
    },
    stroke: function stroke() {
      this.b();
      this.c();
      this.n();
      this.z();
      this.a.push(e.stroke);
    },
    clip: function clip() {
      this.a.push(e.clip);
    },
    w: function w() {
      var a = this.a;
      if (this.f !== this.font) try {
        var b = y[this.d];
        b.style.font = this.f = this.font;
        var c = b.currentStyle;
        a.push(e.font, [c.fontStyle, c.fontWeight, b.offsetHeight, c.fontFamily].join(" "));
      } catch (d) {}
      if (this.s !== this.textAlign) this.s = this.textAlign, a.push(e.textAlign, this.s);
      if (this.t !== this.textBaseline) this.t = this.textBaseline, a.push(e.textBaseline, this.t);
      if (this.u !== this.canvas.currentStyle.direction) this.u = this.canvas.currentStyle.direction, a.push(e.direction, this.u);
    },
    fillText: function fillText(a, b, c, d) {
      this.b();
      this.m();
      this.c();
      this.w();
      this.a.push(e.fillText, t(a), b, c, d === z ? Infinity : d);
    },
    strokeText: function strokeText(a, b, c, d) {
      this.b();
      this.n();
      this.c();
      this.w();
      this.a.push(e.strokeText, t(a), b, c, d === z ? Infinity : d);
    },
    measureText: function measureText(a) {
      var b = y[this.d];

      try {
        b.style.font = this.font;
      } catch (c) {}

      b.innerText = ("" + a).replace(/[ \n\f\r]/g, "\t");
      return new S(b.offsetWidth);
    },
    drawImage: function drawImage(a, b, c, d, f, g, i, j, l) {
      a || h(17);
      var k = a.tagName,
          n,
          q = arguments.length,
          m = this.d;
      if (k) {
        if (k = k.toLowerCase(), k === "img") n = a.getAttribute("src", 2);else if (k === r || k === "video") return;else h(17);
      } else a.src ? n = a.src : h(17);
      this.b();
      this.c();
      n = t(n);
      if (q === 3) this.a.push(e.drawImage, q, n, b, c);else if (q === 5) this.a.push(e.drawImage, q, n, b, c, d, f);else if (q === 9) (d === 0 || f === 0) && h(1), this.a.push(e.drawImage, q, n, b, c, d, f, g, i, j, l);else return;
      !p[m][n] && u[m] && (this.e(), ++o[m], p[m][n] = !0);
    },
    loadImage: function loadImage(a, b, c) {
      var d = a.tagName,
          f,
          g = this.d;
      if (d) d.toLowerCase() === "img" && (f = a.getAttribute("src", 2));else if (a.src) f = a.src;

      if (f && !p[g][f]) {
        if (b || c) x[g][f] = [a, b, c];
        this.a.push(e.drawImage, 1, t(f));
        u[g] && (this.e(), ++o[g], p[g][f] = !0);
      }
    },
    D: function D() {
      this.globalAlpha = this.g = 1;
      this.globalCompositeOperation = this.h = "source-over";
      this.fillStyle = this.v = this.strokeStyle = this.A = "#000000";
      this.lineWidth = this.k = 1;
      this.lineCap = this.i = "butt";
      this.lineJoin = this.j = "miter";
      this.miterLimit = this.l = 10;
      this.shadowBlur = this.o = this.shadowOffsetY = this.r = this.shadowOffsetX = this.q = 0;
      this.shadowColor = this.p = "rgba(0, 0, 0, 0.0)";
      this.font = this.f = "10px sans-serif";
      this.textAlign = this.s = "start";
      this.textBaseline = this.t = "alphabetic";
      this.a = [];
      this.F = [];
    },
    H: function H() {
      var a = this.a;
      this.a = [];
      return a;
    },
    e: function e() {
      var a = this.H();
      if (a.length > 0) return eval(this.B.CallFunction('<invoke name="executeCommand" returntype="javascript"><arguments><string>' + a.join("&#0;") + "</string></arguments></invoke>"));
    },
    I: function I(a, b) {
      this.e();
      this.D();
      if (a > 0) this.B.width = a;
      if (b > 0) this.B.height = b;
      this.a.push(e.resize, a, b);
    }
  };
  k.prototype = {
    addColorStop: function addColorStop(a, b) {
      (isNaN(a) || a < 0 || a > 1) && h(1);
      this.G.a.push(e.addColorStop, this.id, a, b);
    }
  };
  D.prototype = Error();
  var R = {
    1: "INDEX_SIZE_ERR",
    9: "NOT_SUPPORTED_ERR",
    11: "INVALID_STATE_ERR",
    12: "SYNTAX_ERR",
    17: "TYPE_MISMATCH_ERR",
    18: "SECURITY_ERR"
  },
      B = {
    initElement: function initElement(a) {
      if (a.getContext) return a;
      var b = Math.random().toString(36).slice(2) || "0",
          c = "external" + b;
      u[b] = !1;
      p[b] = {};
      o[b] = 1;
      x[b] = {};
      P(a);
      a.innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + location.protocol + '//fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="100%" height="100%" id="' + c + '"><param name="allowScriptAccess" value="always"><param name="flashvars" value="id=' + c + '"><param name="wmode" value="transparent"></object><span style="margin:0;padding:0;border:0;display:inline-block;position:static;height:1em;overflow:visible;white-space:nowrap"></span>';
      s[b] = a;
      var d = a.firstChild;
      y[b] = a.lastChild;
      var f = j.body.contains;
      if (f(a)) d.movie = w;else var g = setInterval(function () {
        if (f(a)) clearInterval(g), d.movie = w;
      }, 0);
      if (j.compatMode === "BackCompat" || !i.XMLHttpRequest) y[b].style.overflow = "hidden";
      var h = new m(a, d);

      a.getContext = function (a) {
        return a === "2d" ? h : l;
      };

      a.toDataURL = function (a, b) {
        ("" + a).replace(/[A-Z]+/g, U) === "image/jpeg" ? h.a.push(e.toDataURL, a, typeof b === "number" ? b : "") : h.a.push(e.toDataURL, a);
        return h.e();
      };

      d.attachEvent(J, F);
      return a;
    },
    saveImage: function saveImage(a, b) {
      a.firstChild.saveImage(b);
    },
    setOptions: function setOptions() {},
    trigger: function trigger(a, b) {
      s[a].fireEvent("on" + b);
    },
    unlock: function unlock(a, b, c) {
      var d, e, g;
      o[a] && --o[a];

      if (b === z) {
        d = s[a];
        b = d.firstChild;
        P(d);
        e = d.width;
        c = d.height;
        d.style.width = e + "px";
        d.style.height = c + "px";
        if (e > 0) b.width = e;
        if (c > 0) b.height = c;
        b.resize(e, c);
        d.attachEvent(K, G);
        u[a] = !0;
        typeof d.onload === "function" && setTimeout(function () {
          d.onload();
        }, 0);
      } else if (g = x[a][b]) e = g[0], c = g[1 + c], delete x[a][b], typeof c === "function" && c.call(e);
    }
  };
  j.createElement(r);
  j.createStyleSheet().cssText = r + "{display:inline-block;overflow:hidden;width:300px;height:150px}";
  j.readyState === "complete" ? A() : j.attachEvent(E, A);
  i.attachEvent(I, H);

  if (w.indexOf(location.protocol + "//" + location.host + "/") === 0) {
    var Q = new ActiveXObject("Microsoft.XMLHTTP");
    Q.open("GET", w, !1);
    Q.send(l);
  }

  i[L] = m;
  i[M] = k;
  i[N] = v;
  i[C] = B;
  i[O] = {
    init: function init() {},
    init_: function init_() {},
    initElement: B.initElement
  };
  keep = [m.measureText, m.loadImage];
}(window, document);

(function (document) {
  webshims.addReady(function (context, elem) {
    if (context == document) {
      if (window.G_vmlCanvasManager && G_vmlCanvasManager.init_) {
        G_vmlCanvasManager.init_(document);
      }
    }

    webshims.$('canvas', context).add(elem.filter('canvas')).each(function () {
      var hasContext = this.getContext;

      if (!hasContext && window.G_vmlCanvasManager) {
        G_vmlCanvasManager.initElement(this);
      }
    });
  });
  webshims.isReady('canvas', true);
})(document);