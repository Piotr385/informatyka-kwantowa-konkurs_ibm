"use strict";

/*! Respimg - Responsive Images that work today.
 *  Author: Alexander Farkas, 2014
 *  Author: Scott Jehl, Filament Group, 2012 ( new proposal implemented by Shawn Jansepar )
 *  License: MIT
 *  Spec: http://picture.responsiveimages.org/
 */
!function (a, b, c) {
  "use strict";

  function d(a) {
    return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "");
  }

  function e() {
    var b;
    T = !1, W = a.devicePixelRatio, U = {}, V = {}, b = (W || 1) * E.xQuant, E.uT || (E.maxX = Math.max(1.3, E.maxX), b = Math.min(b, E.maxX), w.DPR = b), X.width = Math.max(a.innerWidth || 0, C.clientWidth), X.height = Math.max(a.innerHeight || 0, C.clientHeight), X.vw = X.width / 100, X.vh = X.height / 100, X.em = w.getEmValue(), X.rem = X.em, o = E.lazyFactor / 2, o = o * b + o, q = .4 + .1 * b, l = .5 + .2 * b, m = .5 + .25 * b, p = b + 1.3, (n = X.width > X.height) || (o *= .9), J && (o *= .9), v = [X.width, X.height, b].join("-");
  }

  function f(a, b, c) {
    var d = b * Math.pow(a - .4, 1.9);
    return n || (d /= 1.3), a += d, a > c;
  }

  function g(a) {
    var b,
        c = w.getSet(a),
        d = !1;
    "pending" != c && (d = v, c && (b = w.setRes(c), d = w.applySetCandidate(b, a))), a[w.ns].evaled = d;
  }

  function h(a, b) {
    return a.res - b.res;
  }

  function i(a, b, c) {
    var d;
    return !c && b && (c = a[w.ns].sets, c = c && c[c.length - 1]), d = j(b, c), d && (b = w.makeUrl(b), a[w.ns].curSrc = b, a[w.ns].curCan = d, d.res || cb(d, d.set.sizes)), d;
  }

  function j(a, b) {
    var c, d, e;
    if (a && b) for (e = w.parseSet(b), a = w.makeUrl(a), c = 0; c < e.length; c++) {
      if (a == w.makeUrl(e[c].url)) {
        d = e[c];
        break;
      }
    }
    return d;
  }

  function k(a, c) {
    var d,
        e,
        f,
        g,
        h = a.getElementsByTagName("source");

    for (d = 0, e = h.length; e > d; d++) {
      f = h[d], f[w.ns] = !0, g = f.getAttribute("srcset"), RIDEBUG && 9 != b.documentMode && f.parentNode != a && r("all source elements have to be a child of the picture element. For IE9 support wrap them in an audio/video element, BUT with conditional comments"), g && c.push({
        srcset: g,
        media: f.getAttribute("media"),
        type: f.getAttribute("type"),
        sizes: f.getAttribute("sizes")
      }), RIDEBUG && f.getAttribute("src") && r("`src` on `source` invalid, use `srcset`.");
    }

    if (RIDEBUG) {
      var i = w.qsa(a, "source, img");
      "SOURCE" == i[i.length - 1].nodeName.toUpperCase() && r("all sources inside picture have to precede the img element");
    }
  }

  "undefined" == typeof RIDEBUG && (a.RIDEBUG = !0);

  var l,
      m,
      n,
      o,
      p,
      q,
      r,
      s,
      t,
      u,
      v,
      w = {},
      x = function x() {},
      y = b.createElement("img"),
      z = y.getAttribute,
      A = y.setAttribute,
      B = y.removeAttribute,
      C = b.documentElement,
      D = {},
      E = {
    xQuant: 1,
    lazyFactor: .4,
    maxX: 2
  },
      F = "data-risrc",
      G = F + "set",
      H = "webkitBackfaceVisibility" in C.style,
      I = navigator.userAgent,
      J = /rident/.test(I) || /ecko/.test(I) && I.match(/rv\:(\d+)/) && RegExp.$1 > 35,
      K = "currentSrc",
      L = /\s+\+?\d+(e\d+)?w/,
      M = /((?:\([^)]+\)(?:\s*and\s*|\s*or\s*|\s*not\s*)?)+)?\s*(.+)/,
      N = /^([\+eE\d\.]+)(w|x)$/,
      O = /\s*\d+h\s*/,
      P = a.respimgCFG,
      Q = "https:" == location.protocol,
      R = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",
      S = "font-size:100%!important;",
      T = !0,
      U = {},
      V = {},
      W = a.devicePixelRatio,
      X = {
    px: 1,
    "in": 96
  },
      Y = b.createElement("a"),
      Z = !1,
      $ = function $(a, b, c, d) {
    a.addEventListener ? a.addEventListener(b, c, d || !1) : a.attachEvent && a.attachEvent("on" + b, c);
  },
      _ = function _(a, b, c, d) {
    a.removeEventListener ? a.removeEventListener(b, c, d || !1) : a.detachEvent && a.detachEvent("on" + b, c);
  },
      ab = function ab(a) {
    var b = {};
    return function (c) {
      return c in b || (b[c] = a(c)), b[c];
    };
  },
      bb = function () {
    var a = /^([\d\.]+)(em|vw|px)$/,
        b = function b() {
      for (var a = arguments, b = 0, c = a[0]; ++b in a;) {
        c = c.replace(a[b], a[++b]);
      }

      return c;
    },
        c = ab(function (a) {
      return "return " + b((a || "").toLowerCase(), /\band\b/g, "&&", /,/g, "||", /min-([a-z-\s]+):/g, "e.$1>=", /max-([a-z-\s]+):/g, "e.$1<=", /calc([^)]+)/g, "($1)", /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi, "");
    });

    return function (b, d) {
      var e;
      if (!(b in U)) if (U[b] = !1, d && (e = b.match(a))) U[b] = e[1] * X[e[2]];else try {
        U[b] = new Function("e", c(b))(X);
      } catch (f) {}
      return U[b];
    };
  }(),
      cb = function cb(a, b) {
    return a.w ? (a.cWidth = w.calcListLength(b || "100vw"), a.res = a.w / a.cWidth) : a.res = a.x, a;
  },
      db = function db(c) {
    var d,
        e,
        f,
        g = c || {};

    if (g.elements && 1 == g.elements.nodeType && ("IMG" == g.elements.nodeName.toUpperCase() ? g.elements = [g.elements] : (g.context = g.elements, g.elements = null)), g.reparse && (g.reevaluate = !0, a.console && console.warn && console.warn("reparse was renamed to reevaluate!")), d = g.elements || w.qsa(g.context || b, g.reevaluate || g.reselect ? w.sel : w.selShort), f = d.length) {
      for (w.setupRun(g), Z = !0, e = 0; f > e; e++) {
        w.fillImg(d[e], g);
      }

      w.teardownRun(g);
    }
  },
      eb = ab(function (a) {
    var b = [1, "x"],
        c = d(a || "");
    return c && (c = c.replace(O, ""), c.match(N) ? (b = [1 * RegExp.$1, RegExp.$2], RIDEBUG && (b[0] < 0 || isNaN(b[0]) || "w" == b[1] && /\./.test("" + b[0])) && r("bad descriptor: " + a)) : (b = !1, RIDEBUG && r("unknown descriptor: " + a))), b;
  });

  RIDEBUG && (r = a.console && console.warn ? function (a) {
    console.warn(a);
  } : x), K in y || (K = "src"), D["image/jpeg"] = !0, D["image/gif"] = !0, D["image/png"] = !0, D["image/svg+xml"] = b.implementation.hasFeature("http://wwwindow.w3.org/TR/SVG11/feature#Image", "1.1"), w.ns = ("ri" + new Date().getTime()).substr(0, 9), w.supSrcset = "srcset" in y, w.supSizes = "sizes" in y, w.selShort = "picture>img,img[srcset]", w.sel = w.selShort, w.cfg = E, w.supSrcset && (w.sel += ",img[" + G + "]"), w.DPR = W || 1, w.u = X, w.types = D, t = w.supSrcset && !w.supSizes, w.setSize = x, w.makeUrl = ab(function (a) {
    return Y.href = a, Y.href;
  }), w.qsa = function (a, b) {
    return a.querySelectorAll(b);
  }, w.matchesMedia = function () {
    return w.matchesMedia = a.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? function (a) {
      return !a || matchMedia(a).matches;
    } : w.mMQ, w.matchesMedia.apply(this, arguments);
  }, w.mMQ = function (a) {
    return a ? bb(a) : !0;
  }, w.calcLength = function (a) {
    var b = bb(a, !0) || !1;
    return 0 > b && (b = !1), RIDEBUG && (b === !1 || 0 > b) && r("invalid source size: " + a), b;
  }, w.supportsType = function (a) {
    return a ? D[a] : !0;
  }, w.parseSize = ab(function (a) {
    var b = (a || "").match(M);
    return {
      media: b && b[1],
      length: b && b[2]
    };
  }), w.parseSet = function (a) {
    if (!a.cands) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i = a.srcset;

      for (a.cands = []; i;) {
        i = i.replace(/^\s+/g, ""), b = i.search(/\s/g), d = null, -1 != b ? (c = i.slice(0, b), e = c.charAt(c.length - 1), "," != e && c || (c = c.replace(/,+$/, ""), d = ""), i = i.slice(b + 1), null == d && (f = i.indexOf(","), -1 != f ? (d = i.slice(0, f), i = i.slice(f + 1)) : (d = i, i = ""))) : (c = i, i = ""), c && (d = eb(d)) && (RIDEBUG && (h || (h = a.sizes ? "w" : d[1]), h != d[1] && r("mixing x with a w descriptor/sizes attribute in one srcset doesn't make sense in most cases and is invalid.")), g = {
          url: c.replace(/^,+/, ""),
          set: a
        }, g[d[1]] = d[0], "x" == d[1] && 1 == d[0] && (a.has1x = !0), a.cands.push(g));
      }
    }

    return a.cands;
  }, w.getEmValue = function () {
    var a;

    if (!s && (a = b.body)) {
      var c = b.createElement("div"),
          d = C.style.cssText,
          e = a.style.cssText;
      c.style.cssText = R, C.style.cssText = S, a.style.cssText = S, a.appendChild(c), s = c.offsetWidth, a.removeChild(c), s = parseFloat(s, 10), C.style.cssText = d, a.style.cssText = e;
    }

    return s || 16;
  }, w.calcListLength = function (a) {
    if (!(a in V) || E.uT) {
      var b,
          c,
          e,
          f,
          g,
          h,
          i = d(a).split(/\s*,\s*/),
          j = !1;

      for (g = 0, h = i.length; h > g && (b = i[g], c = w.parseSize(b), e = c.length, f = c.media, !e || !w.matchesMedia(f) || (j = w.calcLength(e)) === !1); g++) {
        ;
      }

      V[a] = j ? j : X.width;
    }

    return V[a];
  }, w.setRes = function (a) {
    var b;

    if (a) {
      b = w.parseSet(a);

      for (var c = 0, d = b.length; d > c; c++) {
        cb(b[c], a.sizes);
      }
    }

    return b;
  }, w.setRes.res = cb, w.applySetCandidate = function (a, b) {
    if (a.length) {
      var c,
          d,
          e,
          g,
          j,
          k,
          n,
          s,
          t,
          u,
          x,
          y,
          z,
          A = b[w.ns],
          B = v,
          C = o,
          D = q;
      if (s = A.curSrc || b[K], t = A.curCan || i(b, s, a[0].set), d = w.DPR, z = t && t.res, !n && s && (y = J && !b.complete && t && z - .2 > d, y || t && !(p > z) || (t && d > z && z > l && (m > z && (C *= .8, D += .04 * d), t.res += C * Math.pow(z - D, 2)), u = !A.pic || t && t.set == a[0].set, t && u && t.res >= d && (n = t))), !n) for (z && (t.res = t.res - (t.res - z) / 2), a.sort(h), k = a.length, n = a[k - 1], e = 0; k > e; e++) {
        if (c = a[e], c.res >= d) {
          g = e - 1, n = a[g] && (j = c.res - d) && (y || s != w.makeUrl(c.url)) && f(a[g].res, j, d) ? a[g] : c;
          break;
        }
      }
      return z && (t.res = z), n && (x = w.makeUrl(n.url), A.curSrc = x, A.curCan = n, x != s && (w.setSrc(b, n), RIDEBUG && (fb(b, n), Q && !n.url.indexOf("http:") && r("insecure: " + x))), w.setSize(b)), B;
    }
  }, w.setSrc = function (a, b) {
    var c;
    a.src = b.url, H && (c = a.style.zoom, a.style.zoom = "0.999", a.style.zoom = c);
  }, w.getSet = function (a) {
    var b,
        c,
        d,
        e = !1,
        f = a[w.ns].sets;

    for (b = 0; b < f.length && !e; b++) {
      if (c = f[b], c.srcset && w.matchesMedia(c.media) && (d = w.supportsType(c.type))) {
        "pending" == d && (c = d), e = c;
        break;
      }
    }

    return e;
  }, w.parseSets = function (a, b, d) {
    var e,
        f,
        g,
        h,
        i = "PICTURE" == b.nodeName.toUpperCase(),
        l = a[w.ns];
    (l.src === c || d.src) && (l.src = z.call(a, "src"), l.src ? A.call(a, F, l.src) : B.call(a, F)), (l.srcset === c || !w.supSrcset || a.srcset || d.srcset) && (e = z.call(a, "srcset"), l.srcset = e, h = !0), l.sets = [], i && (l.pic = !0, k(b, l.sets)), l.srcset ? (f = {
      srcset: l.srcset,
      sizes: z.call(a, "sizes")
    }, l.sets.push(f), g = (t || l.src) && L.test(l.srcset || ""), g || !l.src || j(l.src, f) || f.has1x || (f.srcset += ", " + l.src, f.cands.push({
      url: l.src,
      x: 1,
      set: f
    })), RIDEBUG && !i && g && l.src && -1 == f.srcset.indexOf(a[w.ns].src) && r("The fallback candidate (`src`) isn't described inside the srcset attribute. Normally you want to describe all available candidates.")) : l.src && l.sets.push({
      srcset: l.src,
      sizes: null
    }), l.curCan = null, l.curSrc = c, l.supported = !(i || f && !w.supSrcset || g), h && w.supSrcset && !l.supported && (e ? (A.call(a, G, e), a.srcset = "") : B.call(a, G)), l.supported && !l.srcset && (!l.src && a.src || a.src != w.makeUrl(l.src)) && (null == l.src ? a.removeAttribute("src") : a.src = l.src), RIDEBUG && gb(l.sets, "source"), l.parsed = !0;
  }, w.fillImg = function (a, b) {
    var c,
        d,
        e = b.reselect || b.reevaluate;

    if (a[w.ns] || (a[w.ns] = {}), d = a[w.ns], e || d.evaled != v) {
      if (!d.parsed || b.reevaluate) {
        if (c = a.parentNode, !c) return;
        w.parseSets(a, c, b);
      }

      d.supported ? d.evaled = v : g(a);
    }
  }, w.setupRun = function (b) {
    (!Z || T || W != a.devicePixelRatio) && (e(), b.elements || b.context || clearTimeout(u));
  }, a.HTMLPictureElement ? (db = x, w.fillImg = x) : (b.createElement("picture"), function () {
    var c,
        d = a.attachEvent ? /d$|^c/ : /d$|^c|^i/,
        e = function e() {
      var a = b.readyState || "";
      h = setTimeout(e, "loading" == a ? 200 : 999), b.body && (c = c || d.test(a), w.fillImgs(), c && clearTimeout(h));
    },
        f = function f() {
      w.fillImgs();
    },
        g = function g() {
      clearTimeout(u), T = !0, u = setTimeout(f, 99);
    },
        h = setTimeout(e, b.body ? 0 : 20);

    $(a, "resize", g), $(b, "readystatechange", e);
  }()), w.respimage = db, w.fillImgs = db, w.teardownRun = x, db._ = w, a.respimage = db, a.respimgCFG = {
    ri: w,
    push: function push(a) {
      var b = a.shift();
      "function" == typeof w[b] ? w[b].apply(w, a) : (E[b] = a[0], Z && w.fillImgs({
        reselect: !0
      }));
    }
  };

  for (; P && P.length;) {
    a.respimgCFG.push(P.shift());
  }

  if (RIDEBUG) {
    r("Responsive image debugger active. Do not use in production, because it slows things down! extremly"), (!b.querySelector || (b.documentMode || 9) < 8) && r("querySelector is needed. IE8 needs to be in strict, standard or edge mode: http://bit.ly/1yGgYU0 or try the ri.oldie.js plugin."), "<PICTURE>" == (b.getElementsByTagName("picture")[0] || {}).outerHTML && r("IE8 needs to picture shived. Either include respimage.js in <head> or use html5shiv."), "BackCompat" == b.compatMode && r("Browser is in quirksmode. Please make sure to be in strict mode.");

    var fb = function fb(a, b) {
      var c = function c() {
        var d,
            e,
            f = a.offsetWidth,
            g = a.naturalWidth,
            h = b.cWidth,
            i = w.DPR * E.xQuant,
            j = .84,
            k = i > 1 ? .5 : .75;
        !h && g && b.x && (h = g / i), f && h && (f > h ? (d = h / f, e = k) : (d = f / h, e = j), Math.abs(f - h) > 50 && (b.w && .86 > d ? r("Check your sizes attribute: " + b.set.sizes + " was calculated to: " + h + "px. But your image is shown with a size of " + f + "px. img: " + b.url) : b.x && e > d)), _(a, "load", c);
      };

      $(a, "load", c);
    },
        gb = function () {
      var a = {
        minw: /^\s*\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)\s*$/,
        maxw: /^\s*\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)\s*$/
      },
          b = function b(a, _b, c, d) {
        var e, f;

        for (e = 0; c > e && e < _b.length; e++) {
          f = _b[e], (a._min && f._min && a._min >= f._min || a._max && f._max && a._max <= f._max) && r("source" == d ? "Order of your source elements matters. Defining " + a.media + " after " + f.media + " doesn't make sense." : "Order inside your sizes attribute does matter. Defining " + a.media + " after " + f.media + " doesn't make sense.");
        }
      },
          c = function c(_c, d) {
        var e, f, g, h;

        for (h = _c[_c.length - 1], h && (h.media || h.type) && r("source" == d ? "The last src/srcset shouldn't have any type or media conditions. Use img[src] or img[srcset]." : "Last sizes attribute shouldn't have any condition otherwise 100vw is used."), e = 0, f = _c.length; f > e; e++) {
          g = _c[e], g.media && !g.type ? (g._min = g.media.match(a.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""), g._max = g.media.match(a.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""), g._min && (g._min = parseFloat(g._min, 10) * (g._min.indexOf("em") > 0 ? w.getEmValue() : 1)), g._max && (g._max = parseFloat(g._max, 10) * (g._max.indexOf("em") > 0 ? w.getEmValue() : 1)), (g._min || g._max) && b(g, _c, e, d)) : g.type || e == f - 1 || r("source" == d ? "A source element without [media] and [type] doesn't make any sense. Last srcset can be used at the img element. Order is important!" : "The order of your sizes attribute does matter! The sizes length without a media condition has to be defined as last entry.");
        }
      };

      return function (a) {
        var b, e, f, g, h;

        for (c(a, "source"), b = 0, e = a.length; e > b; b++) {
          if (f = d(a[b].sizes || "")) {
            for (h = [], f = f.split(/\s*,\s*/), g = 0; g < f.length; g++) {
              f[g] && h.push(w.parseSize(f[g]));
            }

            h.length && c(h, "sizes");
          }
        }
      };
    }();
  }
}(window, document), function (a) {
  "use strict";

  var b,
      c = 0,
      d = function d() {
    window.respimage && a(window.respimage), (window.respimage || c > 9999) && clearInterval(b), c++;
  };

  b = setInterval(d, 8), d();
}(function (a, b) {
  "use strict";

  var c = window.document,
      d = a._,
      e = {},
      f = d.cfg,
      g = function g(a, b, c) {
    var d = c.curCan;
    a && b.setAttribute("width", parseInt(a / d.res, 10));
  },
      h = function h(a, b, d) {
    var f, h, i;
    a in e ? g(e[a], b, d) : (i = function i() {
      d.pendingURLSize = null, f.onload = null, f.onerror = null, b = null, f = null;
    }, d.pendingURLSize = a, h = d.curCan, h.w && g(h.w, b, d), f = c.createElement("img"), f.onload = function () {
      if (e[a] = f.naturalWidth || f.width, !e[a]) try {
        c.body.appendChild(f), e[a] = f.offsetWidth || f.naturalWidth || f.width, c.body.removeChild(f);
      } catch (h) {}
      a == b.src && g(e[a], b, d), i();
    }, f.onerror = i, f.src = a, f && f.complete && f.onload());
  },
      i = function () {
    var a,
        b,
        e = function e() {
      var e,
          f,
          g,
          h = c.getElementsByTagName("img"),
          i = {
        elements: []
      };

      for (d.setupRun(i), a = !1, clearTimeout(b), e = 0, f = h.length; f > e; e++) {
        g = h[e][d.ns], g && g.curCan && (d.setRes.res(g.curCan, g.curCan.set.sizes), d.setSize(h[e]));
      }

      d.teardownRun(i);
    };

    return function () {
      !a && f.addSize && (a = !0, clearTimeout(b), b = setTimeout(e));
    };
  }();

  d.setSize = function (a) {
    var c,
        e = a[d.ns],
        g = e.curCan;
    e.dims === b && (e.dims = a.getAttribute("height") && a.getAttribute("width")), f.addSize && g && !e.dims && (c = d.makeUrl(g.url), c == a.src && c !== e.pendingURLSize && h(c, a, e));
  }, window.addEventListener && !window.HTMLPictureElement && addEventListener("resize", i, !1), f.addSize = "addSize" in f ? !!f.addSize : !0, i();
}), function (a) {
  "use strict";

  var b,
      c = 0,
      d = function d() {
    window.respimage && a(window.respimage), (window.respimage || c > 9999) && clearInterval(b), c++;
  };

  b = setInterval(d, 8), d();
}(function (a) {
  "use strict";

  var b = a._,
      c = 0,
      d = function d(a, c) {
    var d;

    for (d = 0; d < a.length; d++) {
      b.types[a[d]] = c;
    }
  };

  return window.HTMLPictureElement && !b.cfg.uT ? void (a.testTypeSupport = function () {}) : (b.types["image/bmp"] = !0, b.types["image/x-bmp"] = !0, a.testTypeSupport = function (b, e, f, g) {
    "string" == typeof b && (b = b.split(/\s*\,*\s+/g));

    var h,
        i = "pending",
        j = document.createElement("img"),
        k = function k() {
      c--, d(b, i), 1 > c && a({
        reevaluate: !0
      });
    };

    return g && (h = document.createElement("canvas"), !h.getContext) ? void d(b, !1) : (j.onload = function () {
      var a;
      i = !0, f && (i = j.width == f), g && (a = h.getContext("2d"), a.drawImage(j, 0, 0), i = 0 === a.getImageData(0, 0, 1, 1).data[3]), k();
    }, j.onerror = function () {
      i = !1, k();
    }, c++, d(b, "pending"), void (j.src = e));
  }, a.testTypeSupport("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==", 1), a.testTypeSupport("image/jp2 image/jpx image/jpm", "data:image/jp2;base64,/0//UQAyAAAAAAABAAAAAgAAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAEBwEBBwEBBwEBBwEB/1IADAAAAAEAAAQEAAH/XAAEQED/ZAAlAAFDcmVhdGVkIGJ5IE9wZW5KUEVHIHZlcnNpb24gMi4wLjD/kAAKAAAAAABYAAH/UwAJAQAABAQAAf9dAAUBQED/UwAJAgAABAQAAf9dAAUCQED/UwAJAwAABAQAAf9dAAUDQED/k8+kEAGvz6QQAa/PpBABr994EAk//9k=", 1), a.testTypeSupport("image/vnd.ms-photo", "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA==", 1), void a.testTypeSupport("video/vnd.mozilla.apng video/x-apng video/png video/apng video/x-mng video/x-png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg==", !1, !0));
}), function () {
  webshim.isReady("picture", !0);
  var a = "picture, img[srcset]";
  webshim.addReady(function (b) {
    b.querySelector(a) && window.respimage();
  });
}(),
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
window.matchMedia || (window.matchMedia = function () {
  "use strict";

  var a = window.styleMedia || window.media;

  if (!a) {
    var b = document.createElement("style"),
        c = document.getElementsByTagName("script")[0],
        d = null;
    b.type = "text/css", b.id = "matchmediajs-test", c.parentNode.insertBefore(b, c), d = "getComputedStyle" in window && window.getComputedStyle(b, null) || b.currentStyle, a = {
      matchMedium: function matchMedium(a) {
        var c = "@media " + a + "{ #matchmediajs-test { width: 1px; } }";
        return b.styleSheet ? b.styleSheet.cssText = c : b.textContent = c, "1px" === d.width;
      }
    };
  }

  return function (b) {
    return {
      matches: a.matchMedium(b || "all"),
      media: b || "all"
    };
  };
}()),
/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
function () {
  if (window.matchMedia && window.matchMedia("all").addListener) return !1;

  var a = window.matchMedia,
      b = a("only all").matches,
      c = !1,
      d = 0,
      e = [],
      f = function f() {
    clearTimeout(d), d = setTimeout(function () {
      for (var b = 0, c = e.length; c > b; b++) {
        var d = e[b].mql,
            f = e[b].listeners || [],
            g = a(d.media).matches;

        if (g !== d.matches) {
          d.matches = g;

          for (var h = 0, i = f.length; i > h; h++) {
            f[h].call(window, d);
          }
        }
      }
    }, 30);
  };

  window.matchMedia = function (d) {
    var g = a(d),
        h = [],
        i = 0;
    return g.addListener = function (a) {
      b && (c || (c = !0, window.addEventListener("resize", f, !0)), 0 === i && (i = e.push({
        mql: g,
        listeners: h
      })), h.push(a));
    }, g.removeListener = function (a) {
      for (var b = 0, c = h.length; c > b; b++) {
        h[b] === a && h.splice(b, 1);
      }
    }, g;
  };
}(), webshim.isReady("matchMedia", !0);