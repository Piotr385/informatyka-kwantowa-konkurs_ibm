"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

webshims.register("swfmini-embed", function () {
  function a(a, e, h) {
    var l,
        m = d(h);
    if (g.wk && g.wk < 312) return l;
    if (m) if (_typeof(a.id) == j && (a.id = h), g.ie && g.win) {
      var n = "";

      for (var o in a) {
        a[o] != Object.prototype[o] && ("data" == o.toLowerCase() ? e.movie = a[o] : "styleclass" == o.toLowerCase() ? n += ' class="' + a[o] + '"' : "classid" != o.toLowerCase() && (n += " " + o + '="' + a[o] + '"'));
      }

      var p = "";

      for (var q in e) {
        e[q] != Object.prototype[q] && (p += '<param name="' + q + '" value="' + e[q] + '" />');
      }

      m.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + n + ">" + p + "</object>", f[f.length] = a.id, l = d(a.id);
    } else {
      var r = b(k);
      r.setAttribute("type", i);

      for (var s in a) {
        a[s] != Object.prototype[s] && ("styleclass" == s.toLowerCase() ? r.setAttribute("class", a[s]) : "classid" != s.toLowerCase() && r.setAttribute(s, a[s]));
      }

      for (var t in e) {
        e[t] != Object.prototype[t] && "movie" != t.toLowerCase() && c(r, t, e[t]);
      }

      m.parentNode.replaceChild(r, m), l = r;
    }
    return l;
  }

  function b(a) {
    return h.createElement(a);
  }

  function c(a, c, d) {
    var e = b("param");
    e.setAttribute("name", c), e.setAttribute("value", d), a.appendChild(e);
  }

  function d(a) {
    var b = null;

    try {
      b = h.getElementById(a);
    } catch (c) {}

    return b;
  }

  var e = window.swfmini,
      f = [],
      g = e.ua,
      h = document,
      i = "application/x-shockwave-flash",
      j = "undefined",
      k = "object",
      l = e.hasFlashPlayerVersion;

  e.embedSWF = function (b, c, d, e, f, h, i, m, n, o) {
    var p = {
      success: !1,
      id: c
    };

    if (g.w3 && !(g.wk && g.wk < 312) && b && c && d && e && f) {
      d += "", e += "";
      var q = {};
      if (n && _typeof(n) === k) for (var r in n) {
        q[r] = n[r];
      }
      q.data = b, q.width = d, q.height = e;
      var s = {};
      if (m && _typeof(m) === k) for (var t in m) {
        s[t] = m[t];
      }
      if (i && _typeof(i) === k) for (var u in i) {
        _typeof(s.flashvars) != j ? s.flashvars += "&" + u + "=" + i[u] : s.flashvars = u + "=" + i[u];
      }

      if (l(f)) {
        var v = a(q, s, c);
        p.success = !0, p.ref = v;
      }

      o && o(p);
    } else o && o(p);
  };
});