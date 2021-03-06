"use strict";

webshims.register("form-native-extend", function (a, b, c, d) {
  "use strict";

  var e = b.support;

  if (e.formvalidation && !b.bugs.bustedValidity) {
    var f = b.inputTypes,
        g = !1,
        h = {},
        i = function () {
      var b,
          c = function c() {
        a(this).prop("validity");
      },
          d = function d() {
        a("input").each(c);
      };

      return function () {
        clearTimeout(b), b = setTimeout(d, 9);
      };
    }();

    b.addInputType = function (c, d) {
      f[c] = d, g = !0, a.isDOMReady && e.formvalidation && !b.bugs.bustedValidity && i();
    }, b.addValidityRule = function (a, b) {
      h[a] = b;
    }, a.each({
      typeMismatch: "mismatch",
      badInput: "bad"
    }, function (a, c) {
      b.addValidityRule(a, function (b, d, e, g) {
        if ("" === d) return !1;
        var h = g[a];
        return "type" in e || (e.type = (b[0].getAttribute("type") || "").toLowerCase()), f[e.type] && f[e.type][c] && (h = f[e.type][c](d, b)), h || !1;
      });
    });

    var j = b.modules["form-number-date-api"],
        k = j.loaded && !j.test(),
        l = ["customError", "badInput", "typeMismatch", "rangeUnderflow", "rangeOverflow", "stepMismatch", "tooLong", "tooShort", "patternMismatch", "valueMissing", "valid"],
        m = ["value"],
        n = [],
        o = function o(b) {
      if (b || g) {
        var c = (b.getAttribute && b.getAttribute("type") || b.type || "").toLowerCase();
        f[c] && a.prop(b, "validity");
      }
    },
        p = {};

    if (["input", "textarea", "select"].forEach(function (c) {
      var d = b.defineNodeNameProperty(c, "setCustomValidity", {
        prop: {
          value: function value(e) {
            e += "";
            var f = "input" == c ? a(this).getNativeElement()[0] : this;
            d.prop._supvalue.call(f, e), k && (b.data(f, "hasCustomError", !!e), o(f));
          }
        }
      });
      p[c] = d.prop._supvalue;
    }), k && (m.push("min"), m.push("max"), m.push("step"), n.push("input")), k) {
      var q;

      if (n.forEach(function (c) {
        var d = b.defineNodeNameProperty(c, "validity", {
          prop: {
            get: function get() {
              if (!q) {
                var e = "input" == c ? a(this).getNativeElement()[0] : this,
                    g = d.prop._supget.call(e);

                if (!g) return g;
                var i = {};
                if (l.forEach(function (a) {
                  i[a] = g[a] || !1;
                }), !a.prop(e, "willValidate")) return i;
                q = !0;
                var j,
                    k = a(e),
                    m = {
                  type: (e.getAttribute && e.getAttribute("type") || e.type || "").toLowerCase(),
                  nodeName: (e.nodeName || "").toLowerCase()
                },
                    n = k.val(),
                    o = !!b.data(e, "hasCustomError");
                if (q = !1, i.customError = o, i.valid && i.customError) i.valid = !1;else if (!i.valid) {
                  var r = !0;
                  a.each(i, function (a, b) {
                    return b ? (r = !1, !1) : void 0;
                  }), r && (i.valid = !0);
                }
                return a.each(h, function (a, d) {
                  i[a] = d(k, n, m, i), i[a] && (i.valid || !j) && f[m.type] && (p[c].call(e, b.createValidationMessage(e, a)), i.valid = !1, j = !0);
                }), i.valid && (p[c].call(e, ""), b.data(e, "hasCustomError", !1)), i;
              }
            },
            writeable: !1
          }
        });
      }), m.forEach(function (a) {
        b.onNodeNamesPropertyModify(n, a, function () {
          o(this);
        });
      }), d.addEventListener) {
        var r,
            s = function s(a) {
          "form" in a.target && (clearTimeout(r), o(a.target));
        };

        d.addEventListener("change", s, !0), d.addEventListener("input", function (a) {
          clearTimeout(r), r = setTimeout(function () {
            o(a.target);
          }, 290);
        }, !0);
      }

      var t = n.join(",");
      b.addReady(function (b, c) {
        g && a(t, b).add(c.filter(t)).each(function () {
          o(this);
        });
      });
    }

    b.defineNodeNameProperty("input", "type", {
      prop: {
        get: function get() {
          var a = this,
              c = (a.getAttribute && a.getAttribute("type") || "").toLowerCase();
          return b.inputTypes[c] ? c : a.type;
        }
      }
    });
  }
});