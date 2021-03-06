"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (a) {
  "use strict";

  var b = function b(a, _b) {
    return void 0 === _b && (_b = 0), Math.round(a * Math.pow(10, _b)) / Math.pow(10, _b);
  },
      c = function c(b, _c, d) {
    var e = _c;
    _c.nodeType && (e = a.data(_c, "wsjPicker") || a.data(_c, "wsjPicker", {})), b ? a.extend(!0, e, d) : a.extend(e, d);
  },
      d = function d(b, c) {
    var d,
        e,
        f,
        g = this,
        h = b.find("img").eq(0),
        i = 0,
        j = 100,
        k = 100,
        l = 0,
        m = 100,
        n = 100,
        o = 0,
        p = 0,
        q = new Array(),
        r = function r(a) {
      for (var b = 0; b < q.length; b++) {
        q[b].call(g, g, a);
      }
    },
        s = function s(c) {
      var f = b.offset();
      d = {
        l: 0 | f.left,
        t: 0 | f.top
      }, clearTimeout(e), e = setTimeout(function () {
        v.call(g, c);
      }, 0), a(document).on("mousemove", t).on("mouseup", u), c.preventDefault();
    },
        t = function t(a) {
      return clearTimeout(e), e = setTimeout(function () {
        v.call(g, a);
      }, 0), a.stopPropagation(), a.preventDefault(), !1;
    },
        u = function u(b) {
      return a(document).off("mouseup", u).off("mousemove", t), b.stopPropagation(), b.preventDefault(), !1;
    },
        v = function v(a) {
      var c = a.pageX - d.l,
          e = a.pageY - d.t,
          f = b.w,
          h = b.h;
      0 > c ? c = 0 : c > f && (c = f), 0 > e ? e = 0 : e > h && (e = h), x.call(g, "xy", {
        x: c / f * k + i,
        y: e / h * n + l
      });
    },
        w = function w() {
      var a = 0,
          c = 0,
          d = b.w,
          e = b.h,
          g = h.w,
          i = h.h;
      clearTimeout(f), f = setTimeout(function () {
        k > 0 && (a = o == j ? d : o / k * d | 0), n > 0 && (c = p == m ? e : p / n * e | 0), g >= d ? a = (d >> 1) - (g >> 1) : a -= g >> 1, i >= e ? c = (e >> 1) - (i >> 1) : c -= i >> 1, h.css({
          left: a + "px",
          top: c + "px"
        });
      }, 0);
    },
        x = function x(a, b, c) {
      var d = void 0 !== b;
      if (!d) switch ((void 0 === a || null == a) && (a = "xy"), a.toLowerCase()) {
        case "x":
          return o;

        case "y":
          return p;

        case "xy":
        default:
          return {
            x: o,
            y: p
          };
      }

      if (null == c || c != g) {
        var e,
            f,
            h = !1;

        switch (null == a && (a = "xy"), a.toLowerCase()) {
          case "x":
            e = b && (b.x && 0 | b.x || 0 | b) || 0;
            break;

          case "y":
            f = b && (b.y && 0 | b.y || 0 | b) || 0;
            break;

          case "xy":
          default:
            e = b && b.x && 0 | b.x || 0, f = b && b.y && 0 | b.y || 0;
        }

        null != e && (i > e ? e = i : e > j && (e = j), o != e && (o = e, h = !0)), null != f && (l > f ? f = l : f > m && (f = m), p != f && (p = f, h = !0)), h && r.call(g, c || g);
      }
    },
        y = function y(a, b) {
      var c = void 0 !== b;
      if (!c) switch ((void 0 === a || null == a) && (a = "all"), a.toLowerCase()) {
        case "minx":
          return i;

        case "maxx":
          return j;

        case "rangex":
          return {
            minX: i,
            maxX: j,
            rangeX: k
          };

        case "miny":
          return l;

        case "maxy":
          return m;

        case "rangey":
          return {
            minY: l,
            maxY: m,
            rangeY: n
          };

        case "all":
        default:
          return {
            minX: i,
            maxX: j,
            rangeX: k,
            minY: l,
            maxY: m,
            rangeY: n
          };
      }
      var d, e, f, g;

      switch (null == a && (a = "all"), a.toLowerCase()) {
        case "minx":
          d = b && (b.minX && 0 | b.minX || 0 | b) || 0;
          break;

        case "maxx":
          e = b && (b.maxX && 0 | b.maxX || 0 | b) || 0;
          break;

        case "rangex":
          d = b && b.minX && 0 | b.minX || 0, e = b && b.maxX && 0 | b.maxX || 0;
          break;

        case "miny":
          f = b && (b.minY && 0 | b.minY || 0 | b) || 0;
          break;

        case "maxy":
          g = b && (b.maxY && 0 | b.maxY || 0 | b) || 0;
          break;

        case "rangey":
          f = b && b.minY && 0 | b.minY || 0, g = b && b.maxY && 0 | b.maxY || 0;
          break;

        case "all":
        default:
          d = b && b.minX && 0 | b.minX || 0, e = b && b.maxX && 0 | b.maxX || 0, f = b && b.minY && 0 | b.minY || 0, g = b && b.maxY && 0 | b.maxY || 0;
      }

      null != d && i != d && (i = d, k = j - i), null != e && j != e && (j = e, k = j - i), null != f && l != f && (l = f, n = m - l), null != g && m != g && (m = g, n = m - l);
    },
        z = function z(b) {
      a.isFunction(b) && q.push(b);
    },
        A = function A(b) {
      if (a.isFunction(b)) for (var c; -1 != (c = a.inArray(b, q));) {
        q.splice(c, 1);
      }
    },
        B = function B() {
      a(document).off("mouseup", u).off("mousemove", t), b.off("mousedown", s), b = null, h = null, q = null;
    };

    a.extend(!0, g, {
      val: x,
      range: y,
      bind: z,
      unbind: A,
      destroy: B
    }), h.src = c.arrow && c.arrow.image, h.w = c.arrow && c.arrow.width || h.width(), h.h = c.arrow && c.arrow.height || h.height(), b.w = c.map && c.map.width || b.width(), b.h = c.map && c.map.height || b.height(), b.on("mousedown", s), z.call(g, w);
  },
      e = function e(a, d, _e, f) {
    var g = this,
        h = a.find("td.Text input"),
        i = h.eq(3),
        j = h.eq(4),
        k = h.eq(5),
        l = h.length > 7 ? h.eq(6) : null,
        m = h.eq(0),
        n = h.eq(1),
        o = h.eq(2),
        p = h.eq(h.length > 7 ? 7 : 6),
        q = h.length > 7 ? h.eq(8) : null,
        r = function r(a) {
      if ("" != a.target.value || a.target == p.get(0) || (null == _e || a.target == _e.get(0)) && null != _e) {
        if (!u(a)) return a;

        switch (a.target) {
          case i.get(0):
            switch (a.keyCode) {
              case 38:
                return i.val(v.call(g, (i.val() << 0) + 1, 0, 255)), d.val("r", i.val(), a.target), !1;

              case 40:
                return i.val(v.call(g, (i.val() << 0) - 1, 0, 255)), d.val("r", i.val(), a.target), !1;
            }

            break;

          case j.get(0):
            switch (a.keyCode) {
              case 38:
                return j.val(v.call(g, (j.val() << 0) + 1, 0, 255)), d.val("g", j.val(), a.target), !1;

              case 40:
                return j.val(v.call(g, (j.val() << 0) - 1, 0, 255)), d.val("g", j.val(), a.target), !1;
            }

            break;

          case k.get(0):
            switch (a.keyCode) {
              case 38:
                return k.val(v.call(g, (k.val() << 0) + 1, 0, 255)), d.val("b", k.val(), a.target), !1;

              case 40:
                return k.val(v.call(g, (k.val() << 0) - 1, 0, 255)), d.val("b", k.val(), a.target), !1;
            }

            break;

          case l && l.get(0):
            switch (a.keyCode) {
              case 38:
                return l.val(v.call(g, parseFloat(l.val()) + 1, 0, 100)), d.val("a", b(255 * l.val() / 100, f), a.target), !1;

              case 40:
                return l.val(v.call(g, parseFloat(l.val()) - 1, 0, 100)), d.val("a", b(255 * l.val() / 100, f), a.target), !1;
            }

            break;

          case m.get(0):
            switch (a.keyCode) {
              case 38:
                return m.val(v.call(g, (m.val() << 0) + 1, 0, 360)), d.val("h", m.val(), a.target), !1;

              case 40:
                return m.val(v.call(g, (m.val() << 0) - 1, 0, 360)), d.val("h", m.val(), a.target), !1;
            }

            break;

          case n.get(0):
            switch (a.keyCode) {
              case 38:
                return n.val(v.call(g, (n.val() << 0) + 1, 0, 100)), d.val("s", n.val(), a.target), !1;

              case 40:
                return n.val(v.call(g, (n.val() << 0) - 1, 0, 100)), d.val("s", n.val(), a.target), !1;
            }

            break;

          case o.get(0):
            switch (a.keyCode) {
              case 38:
                return o.val(v.call(g, (o.val() << 0) + 1, 0, 100)), d.val("v", o.val(), a.target), !1;

              case 40:
                return o.val(v.call(g, (o.val() << 0) - 1, 0, 100)), d.val("v", o.val(), a.target), !1;
            }

        }
      }
    },
        s = function s(a) {
      if ("" != a.target.value || a.target == p.get(0) || (null == _e || a.target == _e.get(0)) && null != _e) {
        if (!u(a)) return a;

        switch (a.target) {
          case i.get(0):
            i.val(v.call(g, i.val(), 0, 255)), d.val("r", i.val(), a.target);
            break;

          case j.get(0):
            j.val(v.call(g, j.val(), 0, 255)), d.val("g", j.val(), a.target);
            break;

          case k.get(0):
            k.val(v.call(g, k.val(), 0, 255)), d.val("b", k.val(), a.target);
            break;

          case l && l.get(0):
            l.val(v.call(g, l.val(), 0, 100)), d.val("a", b(255 * l.val() / 100, f), a.target);
            break;

          case m.get(0):
            m.val(v.call(g, m.val(), 0, 360)), d.val("h", m.val(), a.target);
            break;

          case n.get(0):
            n.val(v.call(g, n.val(), 0, 100)), d.val("s", n.val(), a.target);
            break;

          case o.get(0):
            o.val(v.call(g, o.val(), 0, 100)), d.val("v", o.val(), a.target);
            break;

          case p.get(0):
            p.val(p.val().replace(/[^a-fA-F0-9]/g, "").toLowerCase().substring(0, 6)), _e && _e.val(p.val()), d.val("hex", "" != p.val() ? p.val() : null, a.target);
            break;

          case _e && _e.get(0):
            _e.val(_e.val().replace(/[^a-fA-F0-9]/g, "").toLowerCase().substring(0, 6)), p.val(_e.val()), d.val("hex", "" != _e.val() ? _e.val() : null, a.target);
            break;

          case q && q.get(0):
            q.val(q.val().replace(/[^a-fA-F0-9]/g, "").toLowerCase().substring(0, 2)), d.val("a", null != q.val() ? parseInt(q.val(), 16) : null, a.target);
        }
      }
    },
        t = function t(a) {
      if (null != d.val()) switch (a.target) {
        case i.get(0):
          i.val(d.val("r"));
          break;

        case j.get(0):
          j.val(d.val("g"));
          break;

        case k.get(0):
          k.val(d.val("b"));
          break;

        case l && l.get(0):
          l.val(b(100 * d.val("a") / 255, f));
          break;

        case m.get(0):
          m.val(d.val("h"));
          break;

        case n.get(0):
          n.val(d.val("s"));
          break;

        case o.get(0):
          o.val(d.val("v"));
          break;

        case p.get(0):
        case _e && _e.get(0):
          p.val(d.val("hex")), _e && _e.val(d.val("hex"));
          break;

        case q && q.get(0):
          q.val(d.val("ahex").substring(6));
      }
    },
        u = function u(a) {
      switch (a.keyCode) {
        case 9:
        case 16:
        case 29:
        case 37:
        case 39:
          return !1;

        case "c".charCodeAt():
        case "v".charCodeAt():
          if (a.ctrlKey) return !1;
      }

      return !0;
    },
        v = function v(a, b, c) {
      return "" == a || isNaN(a) ? b : a > c ? c : b > a ? b : a;
    },
        w = function w(a, c) {
      var d = a.val("all");
      c != i.get(0) && i.val(null != d ? d.r : ""), c != j.get(0) && j.val(null != d ? d.g : ""), c != k.get(0) && k.val(null != d ? d.b : ""), l && c != l.get(0) && l.val(null != d ? b(100 * d.a / 255, f) : ""), c != m.get(0) && m.val(null != d ? d.h : ""), c != n.get(0) && n.val(null != d ? d.s : ""), c != o.get(0) && o.val(null != d ? d.v : ""), c != p.get(0) && (_e && c != _e.get(0) || !_e) && p.val(null != d ? d.hex : ""), _e && c != _e.get(0) && c != p.get(0) && _e.val(null != d ? d.hex : ""), q && c != q.get(0) && q.val(null != d ? d.ahex.substring(6) : "");
    },
        x = function x() {
      i.add(j).add(k).add(l).add(m).add(n).add(o).add(p).add(_e).add(q).off("keyup", s).off("blur", t), i.add(j).add(k).add(l).add(m).add(n).add(o).off("keydown", r), d.off(w), i = null, j = null, k = null, l = null, m = null, n = null, o = null, p = null, q = null;
    };

    c(!0, g, {
      destroy: x
    }), i.add(j).add(k).add(l).add(m).add(n).add(o).add(p).add(_e).add(q).on("keyup", s).on("blur", t), i.add(j).add(k).add(l).add(m).add(n).add(o).on("keydown", r), d.bind(w);
  };

  a.wsjPicker = {
    List: [],
    Color: function Color(b) {
      var d,
          e,
          f,
          g,
          i,
          j,
          k,
          l = this,
          m = new Array(),
          n = function n(a) {
        for (var b = 0; b < m.length; b++) {
          m[b].call(l, l, a);
        }
      },
          o = function o(a, b, c) {
        var m = void 0 !== b;

        if (!m) {
          if ((void 0 === a || null == a || "" == a) && (a = "all"), null == d) return null;

          switch (a.toLowerCase()) {
            case "ahex":
              return h.rgbaToHex({
                r: d,
                g: e,
                b: f,
                a: g
              });

            case "hex":
              return o("ahex").substring(0, 6);

            case "all":
              return {
                r: d,
                g: e,
                b: f,
                a: g,
                h: i,
                s: j,
                v: k,
                hex: o.call(l, "hex"),
                ahex: o.call(l, "ahex")
              };

            default:
              for (var p = {}, q = 0; q < a.length; q++) {
                switch (a.charAt(q)) {
                  case "r":
                    1 == a.length ? p = d : p.r = d;
                    break;

                  case "g":
                    1 == a.length ? p = e : p.g = e;
                    break;

                  case "b":
                    1 == a.length ? p = f : p.b = f;
                    break;

                  case "a":
                    1 == a.length ? p = g : p.a = g;
                    break;

                  case "h":
                    1 == a.length ? p = i : p.h = i;
                    break;

                  case "s":
                    1 == a.length ? p = j : p.s = j;
                    break;

                  case "v":
                    1 == a.length ? p = k : p.v = k;
                }
              }

              return p == {} ? o.call(l, "all") : p;
          }
        }

        if (null == c || c != l) {
          var r = !1;
          if (null == a && (a = ""), null == b) return null != d && (d = null, r = !0), null != e && (e = null, r = !0), null != f && (f = null, r = !0), null != g && (g = null, r = !0), null != i && (i = null, r = !0), null != j && (j = null, r = !0), null != k && (k = null, r = !0), void (r && n.call(l, c || l));

          switch (a.toLowerCase()) {
            case "ahex":
            case "hex":
              var p = h.hexToRgba(b && (b.ahex || b.hex) || b || "00000000");
              o.call(l, "rgba", {
                r: p.r,
                g: p.g,
                b: p.b,
                a: "ahex" == a ? p.a : null != g ? g : 255
              }, c);
              break;

            default:
              if (b && (null != b.ahex || null != b.hex)) return void o.call(l, "ahex", b.ahex || b.hex || "00000000", c);
              var s = {},
                  t = !1,
                  u = !1;
              void 0 !== b.r && -1 == !a.indexOf("r") && (a += "r"), void 0 !== b.g && -1 == !a.indexOf("g") && (a += "g"), void 0 !== b.b && -1 == !a.indexOf("b") && (a += "b"), void 0 !== b.a && -1 == !a.indexOf("a") && (a += "a"), void 0 !== b.h && -1 == !a.indexOf("h") && (a += "h"), void 0 !== b.s && -1 == !a.indexOf("s") && (a += "s"), void 0 !== b.v && -1 == !a.indexOf("v") && (a += "v");

              for (var q = 0; q < a.length; q++) {
                switch (a.charAt(q)) {
                  case "r":
                    if (u) continue;
                    t = !0, s.r = b && b.r && 0 | b.r || b && 0 | b || 0, s.r < 0 ? s.r = 0 : s.r > 255 && (s.r = 255), d != s.r && (d = s.r, r = !0);
                    break;

                  case "g":
                    if (u) continue;
                    t = !0, s.g = b && b.g && 0 | b.g || b && 0 | b || 0, s.g < 0 ? s.g = 0 : s.g > 255 && (s.g = 255), e != s.g && (e = s.g, r = !0);
                    break;

                  case "b":
                    if (u) continue;
                    t = !0, s.b = b && b.b && 0 | b.b || b && 0 | b || 0, s.b < 0 ? s.b = 0 : s.b > 255 && (s.b = 255), f != s.b && (f = s.b, r = !0);
                    break;

                  case "a":
                    s.a = b && null != b.a ? 0 | b.a : null != b ? 0 | b : 255, s.a < 0 ? s.a = 0 : s.a > 255 && (s.a = 255), g != s.a && (g = s.a, r = !0);
                    break;

                  case "h":
                    if (t) continue;
                    u = !0, s.h = b && b.h && 0 | b.h || b && 0 | b || 0, s.h < 0 ? s.h = 0 : s.h > 360 && (s.h = 360), i != s.h && (i = s.h, r = !0);
                    break;

                  case "s":
                    if (t) continue;
                    u = !0, s.s = b && null != b.s ? 0 | b.s : null != b ? 0 | b : 100, s.s < 0 ? s.s = 0 : s.s > 100 && (s.s = 100), j != s.s && (j = s.s, r = !0);
                    break;

                  case "v":
                    if (t) continue;
                    u = !0, s.v = b && null != b.v ? 0 | b.v : null != b ? 0 | b : 100, s.v < 0 ? s.v = 0 : s.v > 100 && (s.v = 100), k != s.v && (k = s.v, r = !0);
                }
              }

              if (r) {
                if (t) {
                  d = d || 0, e = e || 0, f = f || 0;
                  var p = h.rgbToHsv({
                    r: d,
                    g: e,
                    b: f
                  });
                  i = p.h, j = p.s, k = p.v;
                } else if (u) {
                  i = i || 0, j = null != j ? j : 100, k = null != k ? k : 100;
                  var p = h.hsvToRgb({
                    h: i,
                    s: j,
                    v: k
                  });
                  d = p.r, e = p.g, f = p.b;
                }

                g = null != g ? g : 255, n.call(l, c || l);
              }

          }
        }
      },
          p = function p(b) {
        a.isFunction(b) && m.push(b);
      },
          q = function q(b) {
        if (a.isFunction(b)) for (var c; -1 != (c = a.inArray(b, m));) {
          m.splice(c, 1);
        }
      },
          r = function r() {
        m = null;
      };

      c(!0, l, {
        val: o,
        bind: p,
        unbind: q,
        destroy: r
      }), b && (null != b.ahex ? o("ahex", b) : null != b.hex ? o((null != b.a ? "a" : "") + "hex", null != b.a ? {
        ahex: b.hex + h.intToHex(b.a)
      } : b) : null != b.r && null != b.g && null != b.b ? o("rgb" + (null != b.a ? "a" : ""), b) : null != b.h && null != b.s && null != b.v && o("hsv" + (null != b.a ? "a" : ""), b));
    },
    ColorMethods: {
      hexToRgba: function hexToRgba(a) {
        if (a = this.validateHex(a), "" == a) return {
          r: null,
          g: null,
          b: null,
          a: null
        };
        var b = "00",
            c = "00",
            d = "00",
            e = "255";
        return 6 == a.length && (a += "ff"), a.length > 6 ? (b = a.substring(0, 2), c = a.substring(2, 4), d = a.substring(4, 6), e = a.substring(6, a.length)) : (a.length > 4 && (b = a.substring(4, a.length), a = a.substring(0, 4)), a.length > 2 && (c = a.substring(2, a.length), a = a.substring(0, 2)), a.length > 0 && (d = a.substring(0, a.length))), {
          r: this.hexToInt(b),
          g: this.hexToInt(c),
          b: this.hexToInt(d),
          a: this.hexToInt(e)
        };
      },
      validateHex: function validateHex(a) {
        return a = a.toLowerCase().replace(/[^a-f0-9]/g, ""), a.length > 8 && (a = a.substring(0, 8)), a;
      },
      rgbaToHex: function rgbaToHex(a) {
        return this.intToHex(a.r) + this.intToHex(a.g) + this.intToHex(a.b) + this.intToHex(a.a);
      },
      intToHex: function intToHex(a) {
        var b = (0 | a).toString(16);
        return 1 == b.length && (b = "0" + b), b.toLowerCase();
      },
      hexToInt: function hexToInt(a) {
        return parseInt(a, 16);
      },
      rgbToHsv: function rgbToHsv(a) {
        var b,
            c = a.r / 255,
            d = a.g / 255,
            e = a.b / 255,
            f = {
          h: 0,
          s: 0,
          v: 0
        },
            g = 0,
            h = 0;
        return c >= d && c >= e ? (h = c, g = d > e ? e : d) : d >= e && d >= c ? (h = d, g = c > e ? e : c) : (h = e, g = d > c ? c : d), f.v = h, f.s = h ? (h - g) / h : 0, f.s ? (b = h - g, f.h = c == h ? (d - e) / b : d == h ? 2 + (e - c) / b : 4 + (c - d) / b, f.h = parseInt(60 * f.h), f.h < 0 && (f.h += 360)) : f.h = 0, f.s = 100 * f.s | 0, f.v = 100 * f.v | 0, f;
      },
      hsvToRgb: function hsvToRgb(a) {
        var b = {
          r: 0,
          g: 0,
          b: 0,
          a: 100
        },
            c = a.h,
            d = a.s,
            e = a.v;
        if (0 == d) b.r = b.g = b.b = 0 == e ? 0 : 255 * e / 100 | 0;else {
          360 == c && (c = 0), c /= 60, d /= 100, e /= 100;
          var f = 0 | c,
              g = c - f,
              h = e * (1 - d),
              i = e * (1 - d * g),
              j = e * (1 - d * (1 - g));

          switch (f) {
            case 0:
              b.r = e, b.g = j, b.b = h;
              break;

            case 1:
              b.r = i, b.g = e, b.b = h;
              break;

            case 2:
              b.r = h, b.g = e, b.b = j;
              break;

            case 3:
              b.r = h, b.g = i, b.b = e;
              break;

            case 4:
              b.r = j, b.g = h, b.b = e;
              break;

            case 5:
              b.r = e, b.g = h, b.b = i;
          }

          b.r = 255 * b.r | 0, b.g = 255 * b.g | 0, b.b = 255 * b.b | 0;
        }
        return b;
      }
    }
  };
  var f = a.wsjPicker.Color,
      g = a.wsjPicker.List,
      h = a.wsjPicker.ColorMethods;
  a.fn.wsjPicker = function (h) {
    var j = arguments;
    return this.each(function () {
      var k = this,
          l = a.extend(!0, {}, a.fn.wsjPicker.defaults, h);
      l.window.liveUpdate = !1;

      var m = null,
          n = null,
          o = null,
          p = null,
          q = null,
          r = null,
          s = null,
          t = null,
          u = null,
          v = null,
          w = null,
          x = null,
          y = null,
          z = null,
          A = null,
          B = null,
          C = null,
          D = null,
          E = null,
          F = null,
          G = function G(a) {
        var b,
            c,
            d = hb.active,
            e = (fb.clientPath, d.val("hex"));

        switch (l.color.mode = a, a) {
          case "h":
            if (setTimeout(function () {
              O.call(k, n, "transparent"), Q.call(k, p, 0), R.call(k, p, 100), Q.call(k, q, 260), R.call(k, q, 100), O.call(k, o, "transparent"), Q.call(k, s, 0), R.call(k, s, 100), Q.call(k, t, 260), R.call(k, t, 100), Q.call(k, u, 260), R.call(k, u, 100), Q.call(k, v, 260), R.call(k, v, 100), Q.call(k, x, 260), R.call(k, x, 100);
            }, 0), y.range("all", {
              minX: 0,
              maxX: 100,
              minY: 0,
              maxY: 100
            }), z.range("rangeY", {
              minY: 0,
              maxY: 360
            }), null == d.val("ahex")) break;
            y.val("xy", {
              x: d.val("s"),
              y: 100 - d.val("v")
            }, y), z.val("y", 360 - d.val("h"), z);
            break;

          case "s":
            if (setTimeout(function () {
              O.call(k, n, "transparent"), Q.call(k, p, -260), Q.call(k, q, -520), Q.call(k, s, -260), Q.call(k, t, -520), Q.call(k, x, 260), R.call(k, x, 100);
            }, 0), y.range("all", {
              minX: 0,
              maxX: 360,
              minY: 0,
              maxY: 100
            }), z.range("rangeY", {
              minY: 0,
              maxY: 100
            }), null == d.val("ahex")) break;
            y.val("xy", {
              x: d.val("h"),
              y: 100 - d.val("v")
            }, y), z.val("y", 100 - d.val("s"), z);
            break;

          case "v":
            if (setTimeout(function () {
              O.call(k, n, "000000"), Q.call(k, p, -780), Q.call(k, q, 260), O.call(k, o, e), Q.call(k, s, -520), Q.call(k, t, 260), R.call(k, t, 100), Q.call(k, x, 260), R.call(k, x, 100);
            }, 0), y.range("all", {
              minX: 0,
              maxX: 360,
              minY: 0,
              maxY: 100
            }), z.range("rangeY", {
              minY: 0,
              maxY: 100
            }), null == d.val("ahex")) break;
            y.val("xy", {
              x: d.val("h"),
              y: 100 - d.val("s")
            }, y), z.val("y", 100 - d.val("v"), z);
            break;

          case "r":
            if (b = -1040, c = -780, y.range("all", {
              minX: 0,
              maxX: 255,
              minY: 0,
              maxY: 255
            }), z.range("rangeY", {
              minY: 0,
              maxY: 255
            }), null == d.val("ahex")) break;
            y.val("xy", {
              x: d.val("b"),
              y: 255 - d.val("g")
            }, y), z.val("y", 255 - d.val("r"), z);
            break;

          case "g":
            if (b = -1560, c = -1820, y.range("all", {
              minX: 0,
              maxX: 255,
              minY: 0,
              maxY: 255
            }), z.range("rangeY", {
              minY: 0,
              maxY: 255
            }), null == d.val("ahex")) break;
            y.val("xy", {
              x: d.val("b"),
              y: 255 - d.val("r")
            }, y), z.val("y", 255 - d.val("g"), z);
            break;

          case "b":
            if (b = -2080, c = -2860, y.range("all", {
              minX: 0,
              maxX: 255,
              minY: 0,
              maxY: 255
            }), z.range("rangeY", {
              minY: 0,
              maxY: 255
            }), null == d.val("ahex")) break;
            y.val("xy", {
              x: d.val("r"),
              y: 255 - d.val("g")
            }, y), z.val("y", 255 - d.val("b"), z);
            break;

          case "a":
            if (setTimeout(function () {
              O.call(k, n, "transparent"), Q.call(k, p, -260), Q.call(k, q, -520), Q.call(k, s, 260), Q.call(k, t, 260), R.call(k, t, 100), Q.call(k, x, 0), R.call(k, x, 100);
            }, 0), y.range("all", {
              minX: 0,
              maxX: 360,
              minY: 0,
              maxY: 100
            }), z.range("rangeY", {
              minY: 0,
              maxY: 255
            }), null == d.val("ahex")) break;
            y.val("xy", {
              x: d.val("h"),
              y: 100 - d.val("v")
            }, y), z.val("y", 255 - d.val("a"), z);
            break;

          default:
            throw "Invalid Mode";
        }

        switch (a) {
          case "h":
            break;

          case "s":
          case "v":
          case "a":
            setTimeout(function () {
              R.call(k, p, 100), R.call(k, s, 100), Q.call(k, u, 260), R.call(k, u, 100), Q.call(k, v, 260), R.call(k, v, 100);
            }, 0);
            break;

          case "r":
          case "g":
          case "b":
            setTimeout(function () {
              O.call(k, n, "transparent"), O.call(k, o, "transparent"), R.call(k, s, 100), R.call(k, p, 100), Q.call(k, p, b), Q.call(k, q, b - 260), Q.call(k, s, c - 780), Q.call(k, t, c - 520), Q.call(k, u, c), Q.call(k, v, c - 260), Q.call(k, x, 260), R.call(k, x, 100);
            }, 0);
        }

        null != d.val("ahex") && H.call(k, d);
      },
          H = function H(a, b) {
        (null == b || b != z && b != y) && K.call(k, a, b), setTimeout(function () {
          L.call(k, a), M.call(k, a), N.call(k, a);
        }, 0);
      },
          I = function I(a, b) {
        var c = hb.active;

        if (b == y || null != c.val()) {
          var d = a.val("all");

          switch (l.color.mode) {
            case "h":
              c.val("sv", {
                s: d.x,
                v: 100 - d.y
              }, b);
              break;

            case "s":
            case "a":
              c.val("hv", {
                h: d.x,
                v: 100 - d.y
              }, b);
              break;

            case "v":
              c.val("hs", {
                h: d.x,
                s: 100 - d.y
              }, b);
              break;

            case "r":
              c.val("gb", {
                g: 255 - d.y,
                b: d.x
              }, b);
              break;

            case "g":
              c.val("rb", {
                r: 255 - d.y,
                b: d.x
              }, b);
              break;

            case "b":
              c.val("rg", {
                r: d.x,
                g: 255 - d.y
              }, b);
          }
        }
      },
          J = function J(a, b) {
        var c = hb.active;
        if (b == z || null != c.val()) switch (l.color.mode) {
          case "h":
            c.val("h", {
              h: 360 - a.val("y")
            }, b);
            break;

          case "s":
            c.val("s", {
              s: 100 - a.val("y")
            }, b);
            break;

          case "v":
            c.val("v", {
              v: 100 - a.val("y")
            }, b);
            break;

          case "r":
            c.val("r", {
              r: 255 - a.val("y")
            }, b);
            break;

          case "g":
            c.val("g", {
              g: 255 - a.val("y")
            }, b);
            break;

          case "b":
            c.val("b", {
              b: 255 - a.val("y")
            }, b);
            break;

          case "a":
            c.val("a", 255 - a.val("y"), b);
        }
      },
          K = function K(a, b) {
        if (b != y) switch (l.color.mode) {
          case "h":
            var c = a.val("sv");
            y.val("xy", {
              x: null != c ? c.s : 100,
              y: 100 - (null != c ? c.v : 100)
            }, b);
            break;

          case "s":
          case "a":
            var d = a.val("hv");
            y.val("xy", {
              x: d && d.h || 0,
              y: 100 - (null != d ? d.v : 100)
            }, b);
            break;

          case "v":
            var e = a.val("hs");
            y.val("xy", {
              x: e && e.h || 0,
              y: 100 - (null != e ? e.s : 100)
            }, b);
            break;

          case "r":
            var f = a.val("bg");
            y.val("xy", {
              x: f && f.b || 0,
              y: 255 - (f && f.g || 0)
            }, b);
            break;

          case "g":
            var g = a.val("br");
            y.val("xy", {
              x: g && g.b || 0,
              y: 255 - (g && g.r || 0)
            }, b);
            break;

          case "b":
            var h = a.val("rg");
            y.val("xy", {
              x: h && h.r || 0,
              y: 255 - (h && h.g || 0)
            }, b);
        }
        if (b != z) switch (l.color.mode) {
          case "h":
            z.val("y", 360 - (a.val("h") || 0), b);
            break;

          case "s":
            var i = a.val("s");
            z.val("y", 100 - (null != i ? i : 100), b);
            break;

          case "v":
            var j = a.val("v");
            z.val("y", 100 - (null != j ? j : 100), b);
            break;

          case "r":
            z.val("y", 255 - (a.val("r") || 0), b);
            break;

          case "g":
            z.val("y", 255 - (a.val("g") || 0), b);
            break;

          case "b":
            z.val("y", 255 - (a.val("b") || 0), b);
            break;

          case "a":
            var k = a.val("a");
            z.val("y", 255 - (null != k ? k : 255), b);
        }
      },
          L = function L(a) {
        try {
          var c = a.val("all");
          B.css({
            backgroundColor: c && "#" + c.hex || "transparent"
          }), R.call(k, B, c && b(100 * c.a / 255, 4) || 0);
        } catch (d) {}
      },
          M = function M(a) {
        switch (l.color.mode) {
          case "h":
            O.call(k, n, new f({
              h: a.val("h") || 0,
              s: 100,
              v: 100
            }).val("hex"));
            break;

          case "s":
          case "a":
            var c = a.val("s");
            R.call(k, q, 100 - (null != c ? c : 100));
            break;

          case "v":
            var d = a.val("v");
            R.call(k, p, null != d ? d : 100);
            break;

          case "r":
            R.call(k, q, b((a.val("r") || 0) / 255 * 100, 4));
            break;

          case "g":
            R.call(k, q, b((a.val("g") || 0) / 255 * 100, 4));
            break;

          case "b":
            R.call(k, q, b((a.val("b") || 0) / 255 * 100));
        }

        var e = a.val("a");
        R.call(k, r, b(100 * (255 - (e || 0)) / 255, 4));
      },
          N = function N(a) {
        switch (l.color.mode) {
          case "h":
            var c = a.val("a");
            R.call(k, w, b(100 * (255 - (c || 0)) / 255, 4));
            break;

          case "s":
            var d = a.val("hva"),
                e = new f({
              h: d && d.h || 0,
              s: 100,
              v: null != d ? d.v : 100
            });
            O.call(k, o, e.val("hex")), R.call(k, t, 100 - (null != d ? d.v : 100)), R.call(k, w, b(100 * (255 - (d && d.a || 0)) / 255, 4));
            break;

          case "v":
            var g = a.val("hsa"),
                h = new f({
              h: g && g.h || 0,
              s: null != g ? g.s : 100,
              v: 100
            });
            O.call(k, o, h.val("hex")), R.call(k, w, b(100 * (255 - (g && g.a || 0)) / 255, 4));
            break;

          case "r":
          case "g":
          case "b":
            var i = 0,
                j = 0,
                m = a.val("rgba");
            "r" == l.color.mode ? (i = m && m.b || 0, j = m && m.g || 0) : "g" == l.color.mode ? (i = m && m.b || 0, j = m && m.r || 0) : "b" == l.color.mode && (i = m && m.r || 0, j = m && m.g || 0);
            var n = j > i ? i : j;
            R.call(k, t, i > j ? b((i - j) / (255 - j) * 100, 4) : 0), R.call(k, u, j > i ? b((j - i) / (255 - i) * 100, 4) : 0), R.call(k, v, b(n / 255 * 100, 4)), R.call(k, w, b(100 * (255 - (m && m.a || 0)) / 255, 4));
            break;

          case "a":
            var c = a.val("a");
            O.call(k, o, a.val("hex") || "000000"), R.call(k, w, null != c ? 0 : 100), R.call(k, x, null != c ? 100 : 0);
        }
      },
          O = function O(a, b) {
        a.css({
          backgroundColor: b && 6 == b.length && "#" + b || "transparent"
        });
      },
          P = function P(a, b) {
        a.css({
          backgroundImage: "url('" + b + "')"
        });
      },
          Q = function Q(a, b) {
        a.css({
          top: b + "px"
        });
      },
          R = function R(a, c) {
        a.css({
          visibility: c > 0 ? "visible" : "hidden"
        }), c > 0 && 100 > c ? a.css({
          opacity: b(c / 100, 4)
        }) : (0 == c || 100 == c) && a.css({
          opacity: ""
        });
      },
          S = function S() {
        hb.active.val("ahex", hb.current.val("ahex"));
      },
          T = function T() {
        hb.current.val("ahex", hb.active.val("ahex"));
      },
          U = function U(a) {
        m.find('input[type="radio"]:not([value="' + a.target.value + '"])').prop("checked", !1), G.call(k, a.target.value);
      },
          V = function V() {
        S.call(k);
      },
          W = function W() {
        S.call(k), a.isFunction(ab) && ab.call(k, hb.active, E);
      },
          X = function X() {
        T.call(k), a.isFunction($) && $.call(k, hb.active, D);
      },
          Y = function Y(a) {
        var c = a.val("hex");
        C.css({
          backgroundColor: c && "#" + c || "transparent"
        }), R.call(k, C, b(100 * (a.val("a") || 0) / 255, 4));
      },
          Z = function Z(b) {
        return hb.active.val("ahex", a(this).attr("title") || null, b.target), !1;
      },
          $ = a.isFunction(j[1]) && j[1] || null,
          _ = a.isFunction(j[2]) && j[2] || null,
          ab = a.isFunction(j[3]) && j[3] || null,
          bb = function bb() {
        hb.current.val("ahex", hb.active.val("ahex"));
      },
          cb = function cb() {},
          db = function db() {
        var c = l.window;
        m = a(k), m.addClass("jPicker Container"), m.get(0).onselectstart = function (a) {
          return "input" !== a.target.nodeName.toLowerCase() ? !1 : void 0;
        };
        var g = hb.active.val("all");
        c.alphaPrecision < 0 ? c.alphaPrecision = 0 : c.alphaPrecision > 2 && (c.alphaPrecision = 2);
        var h = '<table class="jPicker" cellpadding="0" cellspacing="0"><tbody><tr><td rowspan="9"><div class="Map"><span class="Map1">&nbsp;</span><span class="Map2">&nbsp;</span><span class="Map3">&nbsp;</span><img src="' + fb.clientPath + fb.colorMap.arrow.file + '" class="Arrow"/></div></td><td rowspan="9"><div class="Bar"><span class="Map1">&nbsp;</span><span class="Map2">&nbsp;</span><span class="Map3">&nbsp;</span><span class="Map4">&nbsp;</span><span class="Map5">&nbsp;</span><span class="Map6">&nbsp;</span><img src="' + fb.clientPath + fb.colorBar.arrow.file + '" class="Arrow"/></div></td><td colspan="2" class="Preview">' + gb.text.newColor + '<div><span class="Active" title="' + gb.tooltips.colors.newColor + '">&nbsp;</span><span class="Current" title="' + gb.tooltips.colors.currentColor + '">&nbsp;</span></div>' + gb.text.currentColor + '</td><td rowspan="9" class="Button"><input type="button" class="Ok" value="' + gb.text.ok + '" title="' + gb.tooltips.buttons.ok + '"/><input type="button" class="Cancel" value="' + gb.text.cancel + '" title="' + gb.tooltips.buttons.cancel + '"/><hr/><div class="Grid">&nbsp;</div></td></tr><tr class="Hue"><td class="Radio"><label><input type="radio" aria-label="' + gb.tooltips.hue.radio + '" class="hue-radio" value="h"' + ("h" == l.color.mode ? ' checked="checked"' : "") + '/>H:</label></td><td class="Text"><input type="text" maxlength="3" value="' + (null != g ? g.h : "") + '" title="' + gb.tooltips.hue.textbox + '"/>&nbsp;&deg;</td></tr><tr class="Saturation"><td class="Radio"><label><input type="radio" aria-label="' + gb.tooltips.saturation.radio + '" value="s"' + ("s" == l.color.mode ? ' checked="checked"' : "") + '/>S:</label></td><td class="Text"><input type="text" maxlength="3" value="' + (null != g ? g.s : "") + '" title="' + gb.tooltips.saturation.textbox + '"/>&nbsp;%</td></tr><tr class="Value"><td class="Radio"><label><input type="radio" aria-label="' + gb.tooltips.value.radio + '" value="v"' + ("v" == l.color.mode ? ' checked="checked"' : "") + '/>V:</label><br/><br/></td><td class="Text"><input type="text" maxlength="3" value="' + (null != g ? g.v : "") + '" title="' + gb.tooltips.value.textbox + '"/>&nbsp;%<br/><br/></td></tr><tr class="Red"><td class="Radio"><label><input type="radio" aria-label="' + gb.tooltips.red.radio + '" value="r"' + ("r" == l.color.mode ? ' checked="checked"' : "") + '/>R:</label></td><td class="Text"><input type="text" maxlength="3" value="' + (null != g ? g.r : "") + '" title="' + gb.tooltips.red.textbox + '"/></td></tr><tr class="Green"><td class="Radio"><label><input type="radio" title="' + gb.tooltips.green.radio + '" value="g"' + ("g" == l.color.mode ? ' checked="checked"' : "") + '/>G:</label></td><td class="Text"><input type="text" maxlength="3" value="' + (null != g ? g.g : "") + '" title="' + gb.tooltips.green.textbox + '"/></td></tr><tr class="Blue"><td class="Radio"><label><input type="radio"  aria-label="' + gb.tooltips.blue.radio + '" value="b"' + ("b" == l.color.mode ? ' checked="checked"' : "") + '/>B:</label></td><td class="Text"><input type="text" maxlength="3" value="' + (null != g ? g.b : "") + '" title="' + gb.tooltips.blue.textbox + '"/></td></tr><tr class="Alpha"><td class="Radio"><label><input aria-label="' + gb.tooltips.alpha.radio + '" class="alpha-radio" type="radio" value="a"' + ("a" == l.color.mode ? ' checked="checked"' : "") + '/>A:</label></td><td class="Text"><input type="text" maxlength="' + (3 + c.alphaPrecision) + '" value="' + (null != g ? b(100 * g.a / 255, c.alphaPrecision) : "") + '" title="' + gb.tooltips.alpha.textbox + '"/>&nbsp;%</td></tr><tr class="Hex"><td colspan="2" class="Text"><label>#:<input  aria-label="' + gb.tooltips.hex.textbox + '" type="text" maxlength="6" class="Hex" value="' + (null != g ? g.hex : "") + '"/></label><input type="text" maxlength="2" class="AHex" value="' + (null != g ? g.ahex.substring(6) : "") + '" title="' + gb.tooltips.hex.alpha + '"/></td></tr></tbody></table>';
        m = a(k), m.html(h);
        var i = m.find("tbody").eq(0);
        n = i.find("div.Map").eq(0), o = i.find("div.Bar").eq(0);
        var j = n.find("span"),
            K = o.find("span");
        p = j.filter(".Map1").eq(0), q = j.filter(".Map2").eq(0), r = j.filter(".Map3").eq(0), s = K.filter(".Map1").eq(0), t = K.filter(".Map2").eq(0), u = K.filter(".Map3").eq(0), v = K.filter(".Map4").eq(0), w = K.filter(".Map5").eq(0), x = K.filter(".Map6").eq(0), y = new d(n, {
          map: {
            width: fb.colorMap.width,
            height: fb.colorMap.height
          },
          arrow: {
            image: fb.clientPath + fb.colorMap.arrow.file,
            width: fb.colorMap.arrow.width,
            height: fb.colorMap.arrow.height
          }
        }), y.bind(I), z = new d(o, {
          map: {
            width: fb.colorBar.width,
            height: fb.colorBar.height
          },
          arrow: {
            image: fb.clientPath + fb.colorBar.arrow.file,
            width: fb.colorBar.arrow.width,
            height: fb.colorBar.arrow.height
          }
        }), z.bind(J), A = new e(i, hb.active, null, c.alphaPrecision);
        var L = null != g ? g.hex : null,
            M = i.find(".Preview"),
            N = i.find(".Button");

        if (B = M.find(".Active").eq(0).css({
          backgroundColor: L && "#" + L || "transparent"
        }), C = M.find(".Current").eq(0).css({
          backgroundColor: L && "#" + L || "transparent"
        }).on("click", V), R.call(k, C, b(100 * hb.current.val("a")) / 255, 4), D = N.find(".Ok").eq(0).on("click", X), E = N.find(".Cancel").eq(0).on("click", W), F = N.find(".Grid").eq(0), setTimeout(function () {
          P.call(k, p, fb.clientPath + "Maps.png"), P.call(k, q, fb.clientPath + "Maps.png"), P.call(k, r, fb.clientPath + "map-opacity.png"), P.call(k, s, fb.clientPath + "Bars.png"), P.call(k, t, fb.clientPath + "Bars.png"), P.call(k, u, fb.clientPath + "Bars.png"), P.call(k, v, fb.clientPath + "Bars.png"), P.call(k, w, fb.clientPath + "bar-opacity.png"), P.call(k, x, fb.clientPath + "AlphaBar.png"), P.call(k, M.find("div").eq(0), fb.clientPath + "preview-opacity.png");
        }, 0), i.find("td.Radio input").on("click", U), hb.quickList && hb.quickList.length > 0) {
          var O,
              Q = "";

          for (O = 0; O < hb.quickList.length; O++) {
            "string" == _typeof(hb.quickList[O]).toString().toLowerCase() && (hb.quickList[O] = new f({
              hex: hb.quickList[O]
            }));
            var S = hb.quickList[O].val("a"),
                T = hb.quickList[O].val("ahex");
            !c.alphaSupport && T && (T = T.substring(0, 6) + "ff");
            var $ = hb.quickList[O].val("hex");
            Q += '<span class="QuickColor"' + (T && ' title="#' + T + '"' || "") + ' style="background-color:' + ($ && "#" + $ || "") + ";" + ($ ? "" : "background-image:url(" + fb.clientPath + "NoColor.png)") + (c.alphaSupport && S && 255 > S ? ";opacity:" + b(S / 255, 4) + ";filter:Alpha(opacity=" + b(S / 2.55, 4) + ")" : "") + '">&nbsp;</span>';
          }

          P.call(k, F, fb.clientPath + "bar-opacity.png"), F.html(Q), F.find(".QuickColor").on("click", Z);
        }

        G.call(k, l.color.mode), hb.active.bind(H), a.isFunction(_) && hb.active.bind(_), hb.current.bind(Y), bb.call(k);
      },
          eb = function eb() {
        var b = a.data(k, "wsjPicker") || k;

        for (m.find("td.Radio input").off("click", U), C.off("click", V), E.off("click", W), D.off("click", X), m.find(".QuickColor").off("click", Z), n = null, o = null, p = null, q = null, r = null, s = null, t = null, u = null, v = null, w = null, x = null, y.destroy(), y = null, z.destroy(), z = null, A.destroy(), A = null, B = null, C = null, D = null, E = null, F = null, $ = null, ab = null, _ = null, m.html(""), i = 0; i < g.length; i++) {
          if (g[i] == b) {
            g.splice(i, 1);
            break;
          }
        }
      },
          fb = l.images,
          gb = l.localization,
          hb = {
        active: new f("string" == _typeof(l.color.active).toString().toLowerCase() ? {
          ahex: !l.window.alphaSupport && l.color.active ? l.color.active.substring(0, 6) + "ff" : l.color.active
        } : {
          ahex: !l.window.alphaSupport && l.color.active.val("ahex") ? l.color.active.val("ahex").substring(0, 6) + "ff" : l.color.active.val("ahex")
        }),
        current: new f("string" == _typeof(l.color.active).toString().toLowerCase() ? {
          ahex: !l.window.alphaSupport && l.color.active ? l.color.active.substring(0, 6) + "ff" : l.color.active
        } : {
          ahex: !l.window.alphaSupport && l.color.active.val("ahex") ? l.color.active.val("ahex").substring(0, 6) + "ff" : l.color.active.val("ahex")
        }),
        quickList: l.color.quickList
      };

      c(!1, k, {
        commitCallback: $,
        liveCallback: _,
        cancelCallback: ab,
        color: hb,
        setColorMode: function setColorMode(b) {
          a('input[type="radio"][value="' + b + '"]', m).prop("checked", !0).triggerHandler("click");
        },
        settings: l,
        show: bb,
        hide: cb,
        destroy: eb
      }), g.push(a.data(k, "wsjPicker") || k), setTimeout(function () {
        db.call(k);
      }, 0);
    });
  }, a.fn.wsjPicker.defaults = {
    window: {
      liveUpdate: !0,
      alphaSupport: !1,
      alphaPrecision: 0
    },
    color: {
      mode: "h",
      active: new f({
        ahex: "#000000ff"
      }),
      quickList: [new f({
        h: 360,
        s: 33,
        v: 100
      }), new f({
        h: 360,
        s: 66,
        v: 100
      }), new f({
        h: 360,
        s: 100,
        v: 100
      }), new f({
        h: 360,
        s: 100,
        v: 75
      }), new f({
        h: 360,
        s: 100,
        v: 50
      }), new f({
        h: 180,
        s: 0,
        v: 100
      }), new f({
        h: 30,
        s: 33,
        v: 100
      }), new f({
        h: 30,
        s: 66,
        v: 100
      }), new f({
        h: 30,
        s: 100,
        v: 100
      }), new f({
        h: 30,
        s: 100,
        v: 75
      }), new f({
        h: 30,
        s: 100,
        v: 50
      }), new f({
        h: 180,
        s: 0,
        v: 90
      }), new f({
        h: 60,
        s: 33,
        v: 100
      }), new f({
        h: 60,
        s: 66,
        v: 100
      }), new f({
        h: 60,
        s: 100,
        v: 100
      }), new f({
        h: 60,
        s: 100,
        v: 75
      }), new f({
        h: 60,
        s: 100,
        v: 50
      }), new f({
        h: 180,
        s: 0,
        v: 80
      }), new f({
        h: 90,
        s: 33,
        v: 100
      }), new f({
        h: 90,
        s: 66,
        v: 100
      }), new f({
        h: 90,
        s: 100,
        v: 100
      }), new f({
        h: 90,
        s: 100,
        v: 75
      }), new f({
        h: 90,
        s: 100,
        v: 50
      }), new f({
        h: 180,
        s: 0,
        v: 70
      }), new f({
        h: 120,
        s: 33,
        v: 100
      }), new f({
        h: 120,
        s: 66,
        v: 100
      }), new f({
        h: 120,
        s: 100,
        v: 100
      }), new f({
        h: 120,
        s: 100,
        v: 75
      }), new f({
        h: 120,
        s: 100,
        v: 50
      }), new f({
        h: 180,
        s: 0,
        v: 60
      }), new f({
        h: 150,
        s: 33,
        v: 100
      }), new f({
        h: 150,
        s: 66,
        v: 100
      }), new f({
        h: 150,
        s: 100,
        v: 100
      }), new f({
        h: 150,
        s: 100,
        v: 75
      }), new f({
        h: 150,
        s: 100,
        v: 50
      }), new f({
        h: 180,
        s: 0,
        v: 50
      }), new f({
        h: 180,
        s: 33,
        v: 100
      }), new f({
        h: 180,
        s: 66,
        v: 100
      }), new f({
        h: 180,
        s: 100,
        v: 100
      }), new f({
        h: 180,
        s: 100,
        v: 75
      }), new f({
        h: 180,
        s: 100,
        v: 50
      }), new f({
        h: 180,
        s: 0,
        v: 40
      }), new f({
        h: 210,
        s: 33,
        v: 100
      }), new f({
        h: 210,
        s: 66,
        v: 100
      }), new f({
        h: 210,
        s: 100,
        v: 100
      }), new f({
        h: 210,
        s: 100,
        v: 75
      }), new f({
        h: 210,
        s: 100,
        v: 50
      }), new f({
        h: 180,
        s: 0,
        v: 30
      }), new f({
        h: 240,
        s: 33,
        v: 100
      }), new f({
        h: 240,
        s: 66,
        v: 100
      }), new f({
        h: 240,
        s: 100,
        v: 100
      }), new f({
        h: 240,
        s: 100,
        v: 75
      }), new f({
        h: 240,
        s: 100,
        v: 50
      }), new f({
        h: 180,
        s: 0,
        v: 20
      }), new f({
        h: 270,
        s: 33,
        v: 100
      }), new f({
        h: 270,
        s: 66,
        v: 100
      }), new f({
        h: 270,
        s: 100,
        v: 100
      }), new f({
        h: 270,
        s: 100,
        v: 75
      }), new f({
        h: 270,
        s: 100,
        v: 50
      }), new f({
        h: 180,
        s: 0,
        v: 10
      }), new f({
        h: 300,
        s: 33,
        v: 100
      }), new f({
        h: 300,
        s: 66,
        v: 100
      }), new f({
        h: 300,
        s: 100,
        v: 100
      }), new f({
        h: 300,
        s: 100,
        v: 75
      }), new f({
        h: 300,
        s: 100,
        v: 50
      }), new f({
        h: 180,
        s: 0,
        v: 0
      }), new f({
        h: 330,
        s: 33,
        v: 100
      }), new f({
        h: 330,
        s: 66,
        v: 100
      }), new f({
        h: 330,
        s: 100,
        v: 100
      }), new f({
        h: 330,
        s: 100,
        v: 75
      }), new f({
        h: 330,
        s: 100,
        v: 50
      }), new f({
        h: 180,
        s: 0,
        v: 0
      })]
    },
    images: {
      clientPath: "/jPicker/images/",
      colorMap: {
        width: 256,
        height: 256,
        arrow: {
          file: "mappoint.gif",
          width: 15,
          height: 15
        }
      },
      colorBar: {
        width: 20,
        height: 256,
        arrow: {
          file: "rangearrows.gif",
          width: 20,
          height: 7
        }
      }
    },
    localization: {
      text: {
        title: "Drag Markers To Pick A Color",
        newColor: "new",
        currentColor: "current",
        ok: "OK",
        cancel: "Cancel"
      },
      tooltips: {
        colors: {
          newColor: "New Color - Press &ldquo;OK&rdquo; To Commit",
          currentColor: "Click To Revert To Original Color"
        },
        buttons: {
          ok: "Commit To This Color Selection",
          cancel: "Cancel And Revert To Original Color"
        },
        hue: {
          radio: "Set To &ldquo;Hue&rdquo; Color Mode",
          textbox: "Enter A &ldquo;Hue&rdquo; Value (0-360&deg;)"
        },
        saturation: {
          radio: "Set To &ldquo;Saturation&rdquo; Color Mode",
          textbox: "Enter A &ldquo;Saturation&rdquo; Value (0-100%)"
        },
        value: {
          radio: "Set To &ldquo;Value&rdquo; Color Mode",
          textbox: "Enter A &ldquo;Value&rdquo; Value (0-100%)"
        },
        red: {
          radio: "Set To &ldquo;Red&rdquo; Color Mode",
          textbox: "Enter A &ldquo;Red&rdquo; Value (0-255)"
        },
        green: {
          radio: "Set To &ldquo;Green&rdquo; Color Mode",
          textbox: "Enter A &ldquo;Green&rdquo; Value (0-255)"
        },
        blue: {
          radio: "Set To &ldquo;Blue&rdquo; Color Mode",
          textbox: "Enter A &ldquo;Blue&rdquo; Value (0-255)"
        },
        alpha: {
          radio: "Set To &ldquo;Alpha&rdquo; Color Mode",
          textbox: "Enter A &ldquo;Alpha&rdquo; Value (0-100)"
        },
        hex: {
          textbox: "Enter A &ldquo;Hex&rdquo; Color Value (#000000-#ffffff)",
          alpha: "Enter A &ldquo;Alpha&rdquo; Value (#00-#ff)"
        }
      }
    }
  };
}(jQuery, "1.1.6wsmod"), webshims.register("color-picker", function (a, b, c, d, e, f) {
  "use strict";

  var g = b.picker;
  g.commonColorInit = function (b) {
    var c = b.popover;
    c.element.on({
      wspopovershow: function wspopovershow() {
        b.element.triggerHandler("wsupdatevalue"), g._genericSetFocus.call(b, a("input.Hex", c.element));
      }
    });
  }, g.color.showPickerContent = function () {
    var c,
        d = a('<div class="ws-jpicker" />');
    a.fn.wsjPicker.defaults.images.clientPath = b.cfg.basePath + "jpicker/images/";

    var e,
        f = {
      setPicker: function setPicker(b) {
        var c = a(b.orig).data("colormode") || "h";
        b.alpha && b.alpha.length ? d.removeClass("no-alpha-picker") : (d.addClass("no-alpha-picker"), "a" == c && (c = "h")), c != e.settings.color.mode && e.setColorMode(c);
      },
      setInputColor: function setInputColor(b) {
        var c,
            d = e.color.active.val(),
            f = "#" + d.hex;
        return b.alpha.length && (c = b.alpha.prop("value"), b.alpha.prop("value", d.a / (255 / (b.alpha.prop("max") || 1)))), a(b.orig).data("colormode", e.settings.color.mode), g._actions.changeInput(f, b.popover, b), b.alpha.length && c != b.alpha.prop("value") && b.alpha.trigger("input").trigger("change"), f;
      }
    },
        h = function h(a, b) {
      b == c && f[a] && f[a](b);
    },
        i = function i() {
      e = d.data("wsjPicker"), e || (d.empty().wsjPicker({}, function () {
        c && h("setInputColor", c);
      }, !1, function (a) {
        c && g._actions.cancel("#" + a.val().hex, c.popover, c);
      }), e = d.data("wsjPicker"));
    },
        j = function j(a) {
      i(), a != c && (c && c.popover.hide(), c = a, a.popover.contentElement.html(d), h("setPicker", a));
    };

    return function (b) {
      b._popoverinit || (g.commonInit(b, b.popover), g.commonColorInit(b));
      var c = b.parseValue();
      j(b), c += b.alpha && b.alpha.length ? a.wsjPicker.ColorMethods.intToHex((b.alpha.prop("value") || 1) * (255 / (b.alpha.prop("max") || 1))) : "ff", e.color.active.val("ahex", c), e.color.current.val("ahex", c), b._popoverinit = !0;
    };
  }(), f && f._types && -1 == a.inArray("color", f._types) && b.error('[type="color"] used without adding it to the types config.'), d.createElement("img").src = b.cfg.basePath + "jpicker/images/Maps.png";
});