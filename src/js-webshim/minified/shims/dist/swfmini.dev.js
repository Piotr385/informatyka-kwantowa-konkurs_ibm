"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!	SWFMini - a SWFObject 2.2 cut down version for webshims
 * 
 * based on SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfmini = function () {
  function a() {
    if (!s) {
      s = !0;

      for (var a = r.length, b = 0; a > b; b++) {
        r[b]();
      }
    }
  }

  function b(a) {
    s ? a() : r[r.length] = a;
  }

  function c() {
    q && d();
  }

  function d() {
    var a = o.getElementsByTagName("body")[0],
        b = e(i);
    b.setAttribute("type", m);
    var c = a.appendChild(b);

    if (c) {
      var d = 0;
      !function () {
        if (_typeof(c.GetVariable) != h) {
          var e = c.GetVariable("$version");
          e && (e = e.split(" ")[1].split(","), u.pv = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)]);
        } else if (10 > d) return d++, void setTimeout(arguments.callee, 10);

        a.removeChild(b), c = null;
      }();
    }
  }

  function e(a) {
    return o.createElement(a);
  }

  function f(a) {
    var b = u.pv,
        c = a.split(".");
    return c[0] = parseInt(c[0], 10), c[1] = parseInt(c[1], 10) || 0, c[2] = parseInt(c[2], 10) || 0, b[0] > c[0] || b[0] == c[0] && b[1] > c[1] || b[0] == c[0] && b[1] == c[1] && b[2] >= c[2] ? !0 : !1;
  }

  var g = function g() {
    j.error("This method was removed from swfmini");
  },
      h = "undefined",
      i = "object",
      j = window.webshims,
      k = "Shockwave Flash",
      l = "ShockwaveFlash.ShockwaveFlash",
      m = "application/x-shockwave-flash",
      n = window,
      o = document,
      p = navigator,
      q = !1,
      r = [c],
      s = !1,
      t = !0,
      u = function () {
    var a = _typeof(o.getElementById) != h && _typeof(o.getElementsByTagName) != h && _typeof(o.createElement) != h,
        b = p.userAgent.toLowerCase(),
        c = p.platform.toLowerCase(),
        d = /win/.test(c ? c : b),
        e = /mac/.test(c ? c : b),
        f = /webkit/.test(b) ? parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
        g = !1,
        j = [0, 0, 0],
        r = null;
    if (_typeof(p.plugins) != h && _typeof(p.plugins[k]) == i) r = p.plugins[k].description, !r || _typeof(p.mimeTypes) != h && p.mimeTypes[m] && !p.mimeTypes[m].enabledPlugin || (q = !0, g = !1, r = r.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), j[0] = parseInt(r.replace(/^(.*)\..*$/, "$1"), 10), j[1] = parseInt(r.replace(/^.*\.(.*)\s.*$/, "$1"), 10), j[2] = /[a-zA-Z]/.test(r) ? parseInt(r.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);else if (_typeof(n.ActiveXObject) != h) try {
      var s = new ActiveXObject(l);
      s && (r = s.GetVariable("$version"), r && (g = !0, r = r.split(" ")[1].split(","), j = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)]));
    } catch (t) {}
    return {
      w3: a,
      pv: j,
      wk: f,
      ie: g,
      win: d,
      mac: e
    };
  }();

  j.ready("DOM", a), j.loader.addModule("swfmini-embed", {
    d: ["swfmini"]
  });
  var v = f("9.0.0") ? function () {
    return j.loader.loadList(["swfmini-embed"]), !0;
  } : j.$.noop;
  return j.support.mediaelement ? j.ready("WINDOWLOAD", v) : v(), {
    registerObject: g,
    getObjectById: g,
    embedSWF: function embedSWF(a, b, c, d, e, f, g, h, i, k) {
      var l = arguments;
      v() ? j.ready("swfmini-embed", function () {
        swfmini.embedSWF.apply(swfmini, l);
      }) : k && k({
        success: !1,
        id: b
      });
    },
    switchOffAutoHideShow: function switchOffAutoHideShow() {
      t = !1;
    },
    ua: u,
    getFlashPlayerVersion: function getFlashPlayerVersion() {
      return {
        major: u.pv[0],
        minor: u.pv[1],
        release: u.pv[2]
      };
    },
    hasFlashPlayerVersion: f,
    createSWF: function (_createSWF) {
      function createSWF(_x, _x2, _x3) {
        return _createSWF.apply(this, arguments);
      }

      createSWF.toString = function () {
        return _createSWF.toString();
      };

      return createSWF;
    }(function (a, b, c) {
      return u.w3 ? createSWF(a, b, c) : void 0;
    }),
    showExpressInstall: g,
    removeSWF: g,
    createCSS: g,
    addDomLoadEvent: b,
    addLoadEvent: g,
    expressInstallCallback: g
  };
}();

webshims.isReady("swfmini", !0);