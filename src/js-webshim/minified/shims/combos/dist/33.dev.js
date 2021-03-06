"use strict";

webshims.register("form-number-date-api", function (a, b) {
  "use strict";

  b.addInputType || b.error("you can not call forms-ext feature after calling forms feature. call both at once instead: $.webshims.polyfill('forms forms-ext')"), b.getStep || (b.getStep = function (b, c) {
    var e = a.attr(b, "step");
    return "any" === e ? e : (c = c || g(b), d[c] && d[c].step ? (e = o.number.asNumber(e), (!isNaN(e) && e > 0 ? e : d[c].step) * (d[c].stepScaleFactor || 1)) : e);
  }), b.addMinMaxNumberToCache || (b.addMinMaxNumberToCache = function (a, b, c) {
    a + "AsNumber" in c || (c[a + "AsNumber"] = d[c.type].asNumber(b.attr(a)), isNaN(c[a + "AsNumber"]) && a + "Default" in d[c.type] && (c[a + "AsNumber"] = d[c.type][a + "Default"]));
  });

  var c = parseInt("NaN", 10),
      d = b.inputTypes,
      e = function e(a) {
    return "number" == typeof a || a && a == 1 * a;
  },
      f = function f(b) {
    return a('<input type="' + b + '" />').prop("type") === b;
  },
      g = function g(a) {
    return (a.getAttribute("type") || "").toLowerCase();
  },
      h = function h(a) {
    return a && !isNaN(1 * a);
  },
      i = b.addMinMaxNumberToCache,
      j = function j(a, b) {
    a = "" + a, b -= a.length;

    for (var c = 0; b > c; c++) {
      a = "0" + a;
    }

    return a;
  },
      k = 1e-7,
      l = b.bugs.bustedValidity;

  b.addValidityRule("stepMismatch", function (a, c, e, f) {
    if ("" === c) return !1;
    if ("type" in e || (e.type = g(a[0])), "week" == e.type) return !1;
    var h,
        j,
        l = (f || {}).stepMismatch || !1;

    if (d[e.type] && d[e.type].step) {
      if ("step" in e || (e.step = b.getStep(a[0], e.type)), "any" == e.step) return !1;
      if ("valueAsNumber" in e || (e.valueAsNumber = d[e.type].asNumber(c)), isNaN(e.valueAsNumber)) return !1;
      i("min", a, e), h = e.minAsNumber, isNaN(h) && (j = a.prop("defaultValue")) && (h = d[e.type].asNumber(j)), isNaN(h) && (h = d[e.type].stepBase || 0), l = Math.abs((e.valueAsNumber - h) % e.step), l = !(k >= l || Math.abs(l - e.step) <= k);
    }

    return l;
  }), [{
    name: "rangeOverflow",
    attr: "max",
    factor: 1
  }, {
    name: "rangeUnderflow",
    attr: "min",
    factor: -1
  }].forEach(function (a) {
    b.addValidityRule(a.name, function (b, c, e, f) {
      var h = (f || {})[a.name] || !1;
      if ("" === c) return h;

      if ("type" in e || (e.type = g(b[0])), d[e.type] && d[e.type].asNumber) {
        if ("valueAsNumber" in e || (e.valueAsNumber = d[e.type].asNumber(c)), isNaN(e.valueAsNumber)) return !1;
        if (i(a.attr, b, e), isNaN(e[a.attr + "AsNumber"])) return h;
        h = e[a.attr + "AsNumber"] * a.factor < e.valueAsNumber * a.factor - k;
      }

      return h;
    });
  }), b.reflectProperties(["input"], ["max", "min", "step"]);
  var m = b.defineNodeNameProperty("input", "valueAsNumber", {
    prop: {
      get: function get() {
        var b = this,
            e = g(b),
            f = d[e] && d[e].asNumber ? d[e].asNumber(a.prop(b, "value")) : m.prop._supget && m.prop._supget.apply(b, arguments);
        return null == f && (f = c), f;
      },
      set: function set(c) {
        var e = this,
            f = g(e);

        if (d[f] && d[f].numberToString) {
          if (isNaN(c)) return void a.prop(e, "value", "");
          var h = d[f].numberToString(c);
          h !== !1 ? a.prop(e, "value", h) : b.error("INVALID_STATE_ERR: DOM Exception 11");
        } else m.prop._supset && m.prop._supset.apply(e, arguments);
      }
    }
  }),
      n = b.defineNodeNameProperty("input", "valueAsDate", {
    prop: {
      get: function get() {
        var b = this,
            c = g(b);
        return d[c] && d[c].asDate && !d[c].noAsDate ? d[c].asDate(a.prop(b, "value")) : n.prop._supget && n.prop._supget.call(b) || null;
      },
      set: function set(c) {
        var e = this,
            f = g(e);
        if (!d[f] || !d[f].dateToString || d[f].noAsDate) return n.prop._supset && n.prop._supset.apply(e, arguments) || null;
        if (null === c) return a.prop(e, "value", ""), "";
        var h = d[f].dateToString(c);
        return h !== !1 ? (a.prop(e, "value", h), h) : void b.error("INVALID_STATE_ERR: DOM Exception 11");
      }
    }
  });
  a.each({
    stepUp: 1,
    stepDown: -1
  }, function (c, e) {
    var f = b.defineNodeNameProperty("input", c, {
      prop: {
        value: function value(c) {
          var h,
              i,
              j,
              l,
              m,
              n,
              o,
              p = g(this);

          if (!d[p] || !d[p].asNumber) {
            if (f.prop && f.prop._supvalue) return f.prop._supvalue.apply(this, arguments);
            throw b.info("no step method for type: " + p), "invalid state error";
          }

          if (m = {
            type: p
          }, c || (c = 1, b.warn("you should always use a factor for stepUp/stepDown")), c *= e, h = b.getStep(this, p), "any" == h) throw b.info("step is 'any' can't apply stepUp/stepDown"), "invalid state error";
          return b.addMinMaxNumberToCache("min", a(this), m), b.addMinMaxNumberToCache("max", a(this), m), i = a.prop(this, "valueAsNumber"), c > 0 && !isNaN(m.minAsNumber) && (isNaN(i) || m.minAsNumber > i) ? void a.prop(this, "valueAsNumber", m.minAsNumber) : 0 > c && !isNaN(m.maxAsNumber) && (isNaN(i) || m.maxAsNumber < i) ? void a.prop(this, "valueAsNumber", m.maxAsNumber) : (isNaN(i) && (i = 0), n = m.minAsNumber, isNaN(n) && (o = a.prop(this, "defaultValue")) && (n = d[p].asNumber(o)), n || (n = 0), h *= c, i = 1 * (i + h).toFixed(5), j = (i - n) % h, j && Math.abs(j) > k && (l = i - j, l += j > 0 ? h : -h, i = 1 * l.toFixed(5)), !isNaN(m.maxAsNumber) && i > m.maxAsNumber || !isNaN(m.minAsNumber) && i < m.minAsNumber ? void b.info("max/min overflow can't apply stepUp/stepDown") : void a.prop(this, "valueAsNumber", i));
        }
      }
    });
  });
  var o = {
    number: {
      bad: function bad(a) {
        return !e(a);
      },
      step: 1,
      stepScaleFactor: 1,
      asNumber: function asNumber(a) {
        return e(a) ? 1 * a : c;
      },
      numberToString: function numberToString(a) {
        return e(a) ? a : !1;
      }
    },
    range: {
      minDefault: 0,
      maxDefault: 100
    },
    color: {
      bad: function () {
        var a = /^\u0023[a-f0-9]{6}$/;
        return function (b) {
          return !b || 7 != b.length || !a.test(b);
        };
      }()
    },
    date: {
      bad: function bad(a) {
        if (!a || !a.split || !/\d$/.test(a)) return !0;
        var b,
            c = a.split(/\u002D/);
        if (3 !== c.length) return !0;
        var d = !1;
        if (c[0].length < 4 || 2 != c[1].length || c[1] > 12 || 2 != c[2].length || c[2] > 33) d = !0;else for (b = 0; 3 > b; b++) {
          if (!h(c[b])) {
            d = !0;
            break;
          }
        }
        return d || a !== this.dateToString(this.asDate(a, !0));
      },
      step: 1,
      stepScaleFactor: 864e5,
      asDate: function asDate(a, b) {
        return !b && this.bad(a) ? null : new Date(this.asNumber(a, !0));
      },
      asNumber: function asNumber(a, b) {
        var d = c;
        return (b || !this.bad(a)) && (a = a.split(/\u002D/), d = Date.UTC(a[0], a[1] - 1, a[2])), d;
      },
      numberToString: function numberToString(a) {
        return e(a) ? this.dateToString(new Date(1 * a)) : !1;
      },
      dateToString: function dateToString(a) {
        return a && a.getFullYear ? j(a.getUTCFullYear(), 4) + "-" + j(a.getUTCMonth() + 1, 2) + "-" + j(a.getUTCDate(), 2) : !1;
      }
    },
    time: {
      bad: function bad(b, c) {
        if (!b || !b.split || !/\d$/.test(b)) return !0;
        if (b = b.split(/\u003A/), b.length < 2 || b.length > 3) return !0;
        var d,
            e = !1;
        return b[2] && (b[2] = b[2].split(/\u002E/), d = parseInt(b[2][1], 10), b[2] = b[2][0]), a.each(b, function (a, b) {
          return h(b) && 2 === b.length ? void 0 : (e = !0, !1);
        }), e ? !0 : b[0] > 23 || b[0] < 0 || b[1] > 59 || b[1] < 0 ? !0 : b[2] && (b[2] > 59 || b[2] < 0) ? !0 : d && isNaN(d) ? !0 : (d && (100 > d ? d *= 100 : 10 > d && (d *= 10)), c === !0 ? [b, d] : !1);
      },
      step: 60,
      stepBase: 0,
      stepScaleFactor: 1e3,
      asDate: function asDate(a) {
        return a = new Date(this.asNumber(a)), isNaN(a) ? null : a;
      },
      asNumber: function asNumber(a) {
        var b = c;
        return a = this.bad(a, !0), a !== !0 && (b = Date.UTC("1970", 0, 1, a[0][0], a[0][1], a[0][2] || 0), a[1] && (b += a[1])), b;
      },
      dateToString: function dateToString(a) {
        if (a && a.getUTCHours) {
          var b = j(a.getUTCHours(), 2) + ":" + j(a.getUTCMinutes(), 2),
              c = a.getSeconds();
          return "0" != c && (b += ":" + j(c, 2)), c = a.getUTCMilliseconds(), "0" != c && (b += "." + j(c, 3)), b;
        }

        return !1;
      }
    },
    month: {
      bad: function bad(a) {
        return o.date.bad(a + "-01");
      },
      step: 1,
      stepScaleFactor: !1,
      asDate: function asDate(a) {
        return new Date(o.date.asNumber(a + "-01"));
      },
      asNumber: function asNumber(a) {
        var b = c;
        return a && !this.bad(a) && (a = a.split(/\u002D/), a[0] = 1 * a[0] - 1970, a[1] = 1 * a[1] - 1, b = 12 * a[0] + a[1]), b;
      },
      numberToString: function numberToString(a) {
        var b,
            c = !1;
        return e(a) && (b = a % 12, a = (a - b) / 12 + 1970, b += 1, 1 > b && (a -= 1, b += 12), c = j(a, 4) + "-" + j(b, 2)), c;
      },
      dateToString: function dateToString(a) {
        if (a && a.getUTCHours) {
          var b = o.date.dateToString(a);
          return b.split && (b = b.split(/\u002D/)) ? b[0] + "-" + b[1] : !1;
        }

        return !1;
      }
    },
    "datetime-local": {
      bad: function bad(a, b) {
        return a && a.split && 2 === (a + "special").split(/\u0054/).length ? (a = a.split(/\u0054/), o.date.bad(a[0]) || o.time.bad(a[1], b)) : !0;
      },
      noAsDate: !0,
      asDate: function asDate(a) {
        return a = new Date(this.asNumber(a)), isNaN(a) ? null : a;
      },
      asNumber: function asNumber(a) {
        var b = c,
            d = this.bad(a, !0);
        return d !== !0 && (a = a.split(/\u0054/)[0].split(/\u002D/), b = Date.UTC(a[0], a[1] - 1, a[2], d[0][0], d[0][1], d[0][2] || 0), d[1] && (b += d[1])), b;
      },
      dateToString: function dateToString(a, b) {
        return o.date.dateToString(a) + "T" + o.time.dateToString(a, b);
      }
    }
  };
  !l && f("range") && f("time") && f("month") && f("datetime-local") || (o.range = a.extend({}, o.number, o.range), o.time = a.extend({}, o.date, o.time), o.month = a.extend({}, o.date, o.month), o["datetime-local"] = a.extend({}, o.date, o.time, o["datetime-local"])), ["number", "month", "range", "date", "time", "color", "datetime-local"].forEach(function (a) {
    (l || !f(a)) && b.addInputType(a, o[a]);
  }), null == a("<input />").prop("labels") && b.defineNodeNamesProperty("button, input, keygen, meter, output, progress, select, textarea", "labels", {
    prop: {
      get: function get() {
        if ("hidden" == this.type) return null;
        var b = this.id,
            c = a(this).closest("label").filter(function () {
          var a = this.attributes["for"] || {};
          return !a.specified || a.value == b;
        });
        return b && (c = c.add('label[for="' + b + '"]')), c.get();
      },
      writeable: !1
    }
  });
}), webshims.register("form-datalist", function (a, b, c, d, e, f) {
  "use strict";

  var g = function g(a) {
    a && "string" == typeof a || (a = "DOM"), g[a + "Loaded"] || (g[a + "Loaded"] = !0, b.ready(a, function () {
      b.loader.loadList(["form-datalist-lazy"]);
    }));
  },
      h = {
    submit: 1,
    button: 1,
    reset: 1,
    hidden: 1,
    range: 1,
    date: 1,
    month: 1
  };

  b.modules["form-number-date-ui"].loaded && a.extend(h, {
    number: 1,
    time: 1
  }), b.propTypes.element = function (c, e) {
    b.createPropDefault(c, "attr"), c.prop || (c.prop = {
      get: function get() {
        var b = a.attr(this, e);
        return b && (b = d.getElementById(b), b && c.propNodeName && !a.nodeName(b, c.propNodeName) && (b = null)), b || null;
      },
      writeable: !1
    });
  }, function () {
    var i = b.cfg.forms,
        j = b.support.datalist;

    if (!j || i.customDatalist) {
      var k = function k() {
        var c = function c() {
          var b;
          !a.data(this, "datalistWidgetData") && (b = a.prop(this, "id")) ? a('input[list="' + b + '"], input[data-wslist="' + b + '"]').eq(0).attr("list", b) : a(this).triggerHandler("updateDatalist");
        },
            d = {
          autocomplete: {
            attr: {
              get: function get() {
                var b = this,
                    c = a.data(b, "datalistWidget");
                return c ? c._autocomplete : "autocomplete" in b ? b.autocomplete : b.getAttribute("autocomplete");
              },
              set: function set(b) {
                var c = this,
                    d = a.data(c, "datalistWidget");
                d ? (d._autocomplete = b, "off" == b && d.hideList()) : "autocomplete" in c ? c.autocomplete = b : c.setAttribute("autocomplete", b);
              }
            }
          }
        };

        j ? ((a("<datalist><select><option></option></select></datalist>").prop("options") || []).length || b.defineNodeNameProperty("datalist", "options", {
          prop: {
            writeable: !1,
            get: function get() {
              var b = this.options || [];

              if (!b.length) {
                var c = this,
                    d = a("select", c);
                d[0] && d[0].options && d[0].options.length && (b = d[0].options);
              }

              return b;
            }
          }
        }), d.list = {
          attr: {
            get: function get() {
              var c = b.contentAttr(this, "list");
              return null != c ? (a.data(this, "datalistListAttr", c), h[a.prop(this, "type")] || h[a.attr(this, "type")] || this.removeAttribute("list")) : c = a.data(this, "datalistListAttr"), null == c ? e : c;
            },
            set: function set(c) {
              var d = this;
              a.data(d, "datalistListAttr", c), h[a.prop(this, "type")] || h[a.attr(this, "type")] ? d.setAttribute("list", c) : (b.objectCreate(l, e, {
                input: d,
                id: c,
                datalist: a.prop(d, "list")
              }), d.setAttribute("data-wslist", c)), a(d).triggerHandler("listdatalistchange");
            }
          },
          initAttr: !0,
          reflect: !0,
          propType: "element",
          propNodeName: "datalist"
        }) : b.defineNodeNameProperties("input", {
          list: {
            attr: {
              get: function get() {
                var a = b.contentAttr(this, "list");
                return null == a ? e : a;
              },
              set: function set(c) {
                var d = this;
                b.contentAttr(d, "list", c), b.objectCreate(f.shadowListProto, e, {
                  input: d,
                  id: c,
                  datalist: a.prop(d, "list")
                }), a(d).triggerHandler("listdatalistchange");
              }
            },
            initAttr: !0,
            reflect: !0,
            propType: "element",
            propNodeName: "datalist"
          }
        }), b.defineNodeNameProperties("input", d), b.addReady(function (a, b) {
          b.filter("datalist > select, datalist, datalist > option, datalist > select > option").closest("datalist").each(c);
        });
      },
          l = {
        _create: function _create(d) {
          if (!h[a.prop(d.input, "type")] && !h[a.attr(d.input, "type")]) {
            var e = d.datalist,
                f = a.data(d.input, "datalistWidget"),
                i = this;
            return e && f && f.datalist !== e ? (f.datalist = e, f.id = d.id, a(f.datalist).off("updateDatalist.datalistWidget").on("updateDatalist.datalistWidget", a.proxy(f, "_resetListCached")), void f._resetListCached()) : e ? void (f && f.datalist === e || (this.datalist = e, this.id = d.id, this.hasViewableData = !0, this._autocomplete = a.attr(d.input, "autocomplete"), a.data(d.input, "datalistWidget", this), a.data(e, "datalistWidgetData", this), g("WINDOWLOAD"), b.isReady("form-datalist-lazy") ? c.QUnit ? i._lazyCreate(d) : setTimeout(function () {
              i._lazyCreate(d);
            }, 9) : (a(d.input).one("focus", g), b.ready("form-datalist-lazy", function () {
              i._destroyed || i._lazyCreate(d);
            })))) : void (f && f.destroy());
          }
        },
        destroy: function destroy(b) {
          var f,
              g = a.attr(this.input, "autocomplete");
          a(this.input).off(".datalistWidget").removeData("datalistWidget"), this.shadowList.remove(), a(d).off(".datalist" + this.id), a(c).off(".datalist" + this.id), this.input.form && this.input.id && a(this.input.form).off("submit.datalistWidget" + this.input.id), this.input.removeAttribute("aria-haspopup"), g === e ? this.input.removeAttribute("autocomplete") : a(this.input).attr("autocomplete", g), b && "beforeunload" == b.type && (f = this.input, setTimeout(function () {
            a.attr(f, "list", a.attr(f, "list"));
          }, 9)), this._destroyed = !0;
        }
      };

      b.loader.addModule("form-datalist-lazy", {
        noAutoCallback: !0,
        options: a.extend(f, {
          shadowListProto: l
        })
      }), f.list || (f.list = {}), k();
    }
  }();
});