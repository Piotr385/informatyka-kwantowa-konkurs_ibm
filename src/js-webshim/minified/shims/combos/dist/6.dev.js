"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
}), webshims.register("form-number-date-api", function (a, b) {
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
}), function (a) {
  "use strict";

  var b = function b(a) {
    return "number" == typeof a || a && a == 1 * a;
  },
      c = function c(a, b) {
    return "number" == typeof a || a && a == 1 * a ? 1 * a : b;
  },
      d = ["step", "min", "max", "readonly", "title", "disabled", "tabindex"],
      e = function () {
    var a = {
      touchstart: 1,
      touchend: 1,
      touchmove: 1
    },
        b = ["pageX", "pageY"];
    return function (c) {
      if (a[c.type] && c.originalEvent && c.originalEvent.touches && c.originalEvent.touches.length) for (var d = 0; d < b.length; d++) {
        c[b[d]] = c.originalEvent.touches[0][b[d]];
      }
      return c;
    };
  }(),
      f = {
    _create: function _create() {
      var b;

      for (this.element.addClass(this.options.baseClass || "ws-range ws-input").attr({
        role: "slider"
      }).append('<span class="ws-range-rail ws-range-track"><span class="ws-range-min ws-range-progress" /><span class="ws-range-thumb"><span><span data-value="" data-valuetext="" /></span></span></span>'), this.trail = a(".ws-range-track", this.element), this.range = a(".ws-range-progress", this.element), this.thumb = a(".ws-range-thumb", this.trail), this.thumbValue = a("span[data-value]", this.thumb), this.updateMetrics(), this.orig = this.options.orig, b = 0; b < d.length; b++) {
        this[d[b]](this.options[d[b]]);
      }

      this.value = this._value, this.value(this.options.value), this.initDataList(), this.element.data("rangeUi", this), this.addBindings(), this._init = !0;
    },
    value: a.noop,
    _value: function _value(b, c, d) {
      var e,
          f,
          g = this.options,
          h = b,
          i = {},
          j = {};
      c || parseFloat(b, 10) == b || (b = g.min + (g.max - g.min) / 2), c || (b = this.normalizeVal(b)), e = 100 * ((b - g.min) / (g.max - g.min)), this._init && b == g.value && h == b || (g.value = b, a.fn.stop && (this.thumb.stop(), this.range.stop()), j[this.dirs.width] = e + "%", this.vertical && (e = Math.abs(e - 100)), i[this.dirs.left] = e + "%", d && a.fn.animate ? (d = "object" != _typeof(d) ? {} : a.extend({}, d), d.duration || (f = Math.abs(e - parseInt(this.thumb[0].style[this.dirs.left] || 50, 10)), d.duration = Math.max(Math.min(999, 5 * f), 99)), this.thumb.animate(i, d), this.range.animate(j, d)) : (this.thumb[0].style[this.dirs.left] = i[this.dirs.left], this.range[0].style[this.dirs.width] = j[this.dirs.width]), this.orig && (h != b || !this._init && this.orig.value != b) && this.options._change(b), this._setValueMarkup());
    },
    _setValueMarkup: function _setValueMarkup() {
      var b = this.options,
          c = b.textValue ? b.textValue(this.options.value) : b.options[b.value] || b.value;
      this.element[0].setAttribute("aria-valuenow", this.options.value), this.element[0].setAttribute("aria-valuetext", c), this.thumbValue[0].setAttribute("data-value", this.options.value), this.thumbValue[0].setAttribute("data-valuetext", c), b.selectedOption && (a(b.selectedOption).removeClass("ws-selected-option"), b.selectedOption = null), b.value in b.options && (b.selectedOption = a('[data-value="' + b.value + '"].ws-range-ticks', this.trail).addClass("ws-selected-option"));
    },
    initDataList: function initDataList() {
      if (this.orig) {
        var b,
            c = this,
            d = function d() {
          a(c.orig).jProp("list").off("updateDatalist", d).on("updateDatalist", d), clearTimeout(b), b = setTimeout(function () {
            c.list && c.list();
          }, 9);
        };

        a(this.orig).on("listdatalistchange", d), this.list();
      }
    },
    list: function list() {
      var c = this.options,
          d = c.min,
          e = c.max,
          f = this.trail,
          g = this;
      this.element.attr({
        "aria-valuetext": c.options[c.value] || c.value
      }), a(".ws-range-ticks", f).remove(), a(this.orig).jProp("list").find("option:not([disabled])").each(function () {
        c.options[a.prop(this, "value")] = a.prop(this, "label") || "";
      }), a.each(c.options, function (h, i) {
        if (!(!b(h) || d > h || h > e)) {
          var j = 100 * ((h - d) / (e - d)),
              k = 'data-value="' + h + '"';
          i && (k += ' data-label="' + i + '"', c.showLabels && (k += ' title="' + i + '"')), g.vertical && (j = Math.abs(j - 100)), g.posCenter(a('<span class="ws-range-ticks"' + k + ' style="' + g.dirs.left + ": " + j + '%;" />').appendTo(f));
        }
      }), c.value in c.options && this._setValueMarkup();
    },
    readonly: function readonly(a) {
      a = !!a, this.options.readonly = a, this.element.attr("aria-readonly", "" + a), this._init && this.updateMetrics();
    },
    disabled: function disabled(a) {
      a = !!a, this.options.disabled = a, this.element.attr(a ? {
        tabindex: -1,
        "aria-disabled": "true"
      } : {
        tabindex: this.options.tabindex,
        "aria-disabled": "false"
      }), this._init && this.updateMetrics();
    },
    tabindex: function tabindex(a) {
      this.options.tabindex = a, this.options.disabled || this.element.attr({
        tabindex: a
      });
    },
    title: function title(a) {
      this.element.prop("title", a);
    },
    min: function min(a) {
      this.options.min = c(a, 0), this.element.attr("aria-valuemin", this.options.min), this.value(this.options.value, !0);
    },
    max: function max(a) {
      this.options.max = c(a, 100), this.element.attr("aria-valuemax", this.options.max), this.value(this.options.value, !0);
    },
    step: function step(a) {
      var b = this.options,
          d = "any" == a ? "any" : c(a, 1);
      b.stepping && webshims.error("stepping was removed. Use stepfactor instead."), b.stepfactor && "any" != d && (d *= b.stepfactor), b.step = d, this.value(this.options.value);
    },
    normalizeVal: function normalizeVal(a) {
      var b,
          c,
          d,
          e = this.options;
      return a <= e.min ? a = e.min : a >= e.max ? a = e.max : "any" != e.step && (d = e.step, b = (a - e.min) % d, c = a - b, 2 * Math.abs(b) >= d && (c += b > 0 ? d : -d), a = 1 * c.toFixed(5)), a;
    },
    doStep: function doStep(a, b) {
      var d = c(this.options.step, 1);
      "any" == this.options.step && (d = Math.min(d, (this.options.max - this.options.min) / 10)), this.value(this.options.value + d * a, !1, b);
    },
    getStepedValueFromPos: function getStepedValueFromPos(a) {
      var b, c, d, e;
      return 0 >= a ? b = this.options[this.dirs[this.isRtl ? "max" : "min"]] : a > 100 ? b = this.options[this.dirs[this.isRtl ? "min" : "max"]] : ((this.vertical || this.isRtl) && (a = Math.abs(a - 100)), b = (this.options.max - this.options.min) * (a / 100) + this.options.min, e = this.options.step, "any" != e && (c = (b - this.options.min) % e, d = b - c, 2 * Math.abs(c) >= e && (d += c > 0 ? e : -e), b = 1 * d.toFixed(5))), b;
    },
    addRemoveClass: function addRemoveClass(a, b) {
      var c,
          d = -1 != this.element.prop("className").indexOf(a);
      !b && d ? (c = "removeClass", this.element.removeClass(a), this.updateMetrics()) : b && !d && (c = "addClass"), c && (this.element[c](a), this._init && this.updateMetrics());
    },
    addBindings: function addBindings() {
      var b,
          c,
          d,
          f,
          g = this,
          h = this.options,
          i = function () {
        var b = {};
        return {
          init: function init(c, d, e) {
            b[c] || (b[c] = {
              fn: e
            }, g.orig && a(g.orig).on(c, function () {
              b[c].val = a.prop(g.orig, "value");
            })), b[c].val = d;
          },
          call: function call(a, c) {
            b[a].val != c && (clearTimeout(b[a].timer), b[a].val = c, b[a].timer = setTimeout(function () {
              b[a].fn(c, g);
            }, 0));
          }
        };
      }(),
          j = function j(a, b) {
        a != h.value && (g.value(a, !1, b), i.call("input", a));
      },
          k = function k(a, d) {
        "touchmove" == a.type && (a.preventDefault(), e(a)), j(g.getStepedValueFromPos((a[g.dirs.mouse] - b) * c), d), a && "mousemove" == a.type && a.preventDefault();
      },
          l = function l(b) {
        !b || "mouseup" != b.type && "touchend" != b.type || (i.call("input", h.value), i.call("change", h.value)), g.addRemoveClass("ws-active"), a(document).off("mousemove touchmove", k).off("mouseup touchend", l), a(window).off("blur", m), f = !1;
      },
          m = function m(a) {
        a.target == window && l();
      },
          n = function n(d) {
        if (!f && ("touchstart" != d.type || d.originalEvent && d.originalEvent.touches && 1 == d.originalEvent.touches.length) && (d.preventDefault(), a(document).off("mousemove touchmove", k).off("mouseup touchend", l), a(window).off("blur", m), !h.readonly && !h.disabled)) {
          if (i.init("input", h.value), i.init("change", h.value), e(d), g.element.trigger("focus"), g.addRemoveClass("ws-active", !0), b = g.element.offset(), c = g.element[g.dirs.innerWidth](), !c || !b) return;
          b = b[g.dirs.pos], c = 100 / c, "ws-range-ticks" == d.target.className ? j(d.target.getAttribute("data-value"), h.animate) : k(d, h.animate), f = !0, a(document).on("touchstart" == d.type ? {
            touchend: l,
            touchmove: k
          } : {
            mouseup: l,
            mousemove: k
          }), a(window).on("blur", m), d.stopPropagation();
        }
      },
          o = {
        "touchstart mousedown": n,
        focus: function focus() {
          h.disabled || d || (f || (i.init("input", h.value), i.init("change", h.value)), g.addRemoveClass("ws-focus", !0), g.updateMetrics()), d = !0;
        },
        blur: function blur() {
          g.element.removeClass("ws-focus ws-active"), g.updateMetrics(), d = !1, i.init("input", h.value), i.call("change", h.value);
        },
        keyup: function keyup() {
          g.addRemoveClass("ws-active"), i.call("input", h.value), i.call("change", h.value);
        },
        keydown: function keydown(a) {
          var b = !0,
              c = a.keyCode;
          h.readonly || h.disabled || (g.isRtl && (39 == c ? c = 37 : 37 == c && (c = 39)), 39 == c || 38 == c ? g.doStep(1) : 37 == c || 40 == c ? g.doStep(-1) : 33 == c ? g.doStep(10, h.animate) : 34 == c ? g.doStep(-10, h.animate) : 36 == c ? g.value(g.options.max, !1, h.animate) : 35 == c ? g.value(g.options.min, !1, h.animate) : b = !1, b && (g.addRemoveClass("ws-active", !0), i.call("input", h.value), a.preventDefault()));
        }
      };

      i.init("input", h.value, this.options.input), i.init("change", h.value, this.options.change), o[a.fn.mwheelIntent ? "mwheelIntent" : "mousewheel"] = function (a, b) {
        b && d && !h.readonly && !h.disabled && (g.doStep(b), a.preventDefault(), i.call("input", h.value));
      }, this.element.on(o), this.thumb.on({
        mousedown: n
      }), this.orig && a(this.orig).jProp("form").on("reset", function () {
        var b = a.prop(g.orig, "value");
        g.value(b), setTimeout(function () {
          var c = a.prop(g.orig, "value");
          b != c && g.value(c);
        }, 4);
      }), window.webshims && webshims.ready("WINDOWLOAD", function () {
        webshims.ready("dom-support", function () {
          if (a.fn.onWSOff) {
            var b,
                c = function c() {
              g.updateMetrics();
            };

            g.element.onWSOff("updateshadowdom", function () {
              clearTimeout(b), b = setTimeout(c, 100);
            });
          }
        }), !a.fn.onWSOff && webshims._polyfill && webshims._polyfill(["dom-support"]);
      });
    },
    posCenter: function posCenter(a, b) {
      var c, d;
      !this.options.calcCenter || this._init && !this.element[0].offsetWidth || (a || (a = this.thumb), d = a[0].style, b || (b = a[this.dirs.outerWidth]()), b /= -2, d[this.dirs.marginLeft] = b + "px", this.options.calcTrail && a[0] == this.thumb[0] && (c = this.element[this.dirs.innerHeight](), d[this.dirs.marginTop] = (a[this.dirs.outerHeight]() - c) / -2 + "px", this.range[0].style[this.dirs.marginTop] = (this.range[this.dirs.outerHeight]() - c) / -2 + "px", this.range[0].style[this.dirs.posLeft] = b + "px", b *= -1, this.range[0].style[this.dirs.paddingRight] = b + "px", this.trail[0].style[this.dirs.left] = b + "px", this.trail[0].style[this.dirs.right] = b + "px"));
    },
    updateMetrics: function updateMetrics() {
      var a = this.element.innerWidth();
      this.vertical = a && this.element.innerHeight() - a > 10, this.dirs = this.vertical ? {
        mouse: "pageY",
        pos: "top",
        posLeft: "bottom",
        paddingRight: "paddingTop",
        min: "max",
        max: "min",
        left: "top",
        right: "bottom",
        width: "height",
        innerWidth: "innerHeight",
        innerHeight: "innerWidth",
        outerWidth: "outerHeight",
        outerHeight: "outerWidth",
        marginTop: "marginLeft",
        marginLeft: "marginTop"
      } : {
        mouse: "pageX",
        pos: "left",
        posLeft: "left",
        paddingRight: "paddingRight",
        min: "min",
        max: "max",
        left: "left",
        right: "right",
        width: "width",
        innerWidth: "innerWidth",
        innerHeight: "innerHeight",
        outerWidth: "outerWidth",
        outerHeight: "outerHeight",
        marginTop: "marginTop",
        marginLeft: "marginLeft"
      }, this.vertical || "rtl" != this.element.css("direction") || (this.isRtl = !0, this.dirs.left = "right", this.dirs.right = "left", this.dirs.marginLeft = "marginRight", this.dirs.posLeft = "right"), this.element[this.vertical ? "addClass" : "removeClass"]("vertical-range")[this.isRtl ? "addClass" : "removeClass"]("ws-is-rtl"), this.updateMetrics = this.posCenter, this.posCenter();
    }
  },
      g = function g(a) {
    function b() {}

    return b.prototype = a, new b();
  };

  a.fn.rangeUI = function (b) {
    return b = a.extend({
      readonly: !1,
      disabled: !1,
      tabindex: 0,
      min: 0,
      step: 1,
      max: 100,
      value: 50,
      input: a.noop,
      change: a.noop,
      _change: a.noop,
      showLabels: !0,
      options: {},
      calcCenter: !0,
      calcTrail: !0
    }, b), this.each(function () {
      var c = a.extend(g(f), {
        element: a(this)
      });
      c.options = b, c._create.call(c);
    });
  }, a.fn.rangeUI.normalizeTouch = e, window.webshims && webshims.isReady && webshims.isReady("range-ui", !0);
}(window.webshims ? webshims.$ : jQuery), webshims.register("form-number-date-ui", function (a, b, c, d, e, f) {
  "use strict";

  var g,
      h = b.formcfg,
      i = b.support.formvalidation && !b.bugs.bustedValidity,
      j = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
      k = function k(a) {
    a.stopImmediatePropagation();
  },
      l = function l(b) {
    var c = "monthSelect" + b.monthNames;

    if (!g[c]) {
      var d = g.date[b.monthNames] || j;
      g[c] = '<option value=""></option>' + a.map(j, function (a, b) {
        return '<option value="' + a + '">' + d[b] + "</option>";
      }).join("");
    }

    return g[c];
  },
      m = '<select class="dd"><option value=""></option>' + function () {
    for (var a = 1, b = []; 32 > a;) {
      b.push("<option>" + (10 > a ? "0" + a : a) + "</option>"), a++;
    }

    return b.join("");
  }() + "</select>",
      n = function n(b) {
    if (!g.patterns[b + "Obj"]) {
      var c = {};
      a.each(g.patterns[b].split(g[b + "Format"]), function (a, b) {
        c[b] = a;
      }), g.patterns[b + "Obj"] = c;
    }
  },
      o = function o(c, d) {
    var e, f, g, h;
    d.yearSelect && (f = parseInt(d.value.split("-")[0], 10), g = d.max.split("-"), h = d.min.split("-"), e = b.picker.createYearSelect(f || parseInt(h[0], 10) || parseInt(g[0], 10) || s, g, h), e.unshift("<option />"), a(c.elements).filter("select.yy").html(e.join("")).each(function () {
      f || (a("option[selected]", this).removeAttr("selected"), a(this).val());
    }));
  },
      p = !b.support.inputtypes.tel || -1 == navigator.userAgent.indexOf("Mobile") || "inputMode" in d.createElement("input") && !("inputmode" in d.createElement("input")) ? "text" : "tel",
      q = {
    date: {
      _create: function _create(b) {
        var c = {
          splits: []
        };
        return c.splits.push(b.yearSelect ? a('<select class="yy"></select>')[0] : a('<input type="' + p + '" class="yy" size="4" inputmode="numeric" maxlength="4" />')[0]), c.splits.push(b.monthSelect ? a('<select class="mm">' + l(b) + "</select>")[0] : a('<input type="' + p + '" class="mm" inputmode="numeric" maxlength="2" size="2" />')[0]), c.splits.push(b.daySelect ? a(m)[0] : a('<input type="' + p + '" class="dd ws-spin" inputmode="numeric" maxlength="2" size="2" />')[0]), c.elements = [c.splits[0], a('<span class="ws-input-seperator" />')[0], c.splits[1], a('<span class="ws-input-seperator" />')[0], c.splits[2]], o(c, b), c;
      },
      sort: function sort(b) {
        n("d");
        var c = 0,
            d = a(".ws-input-seperator", b).html(g.dFormat),
            e = a("input, select", b);
        a.each(g.patterns.dObj, function (a) {
          var f = e.filter("." + a);
          f[0] && (f.appendTo(b), c < d.length && d.eq(c).insertAfter(f), c++);
        });
      }
    },
    month: {
      _create: function _create(b) {
        var c = {
          splits: []
        };
        if (c.splits.push(b.yearSelect ? a('<select class="yy"></select>')[0] : a('<input type="' + p + '" class="yy" size="4" inputmode="numeric" maxlength="4" />')[0]), b.monthSelect) c.splits.push(a('<select class="mm">' + l(b) + "</select>")[0]);else if (c.splits.push(a('<input type="text" class="mm ws-spin" />')[0]), b.onlyMonthDigits) {
          a().attr({
            inputmode: "numeric",
            size: 2,
            maxlength: 2
          });

          try {
            c.splits[1].setAttribute("type", p);
          } catch (d) {}
        }
        return c.elements = [c.splits[0], a('<span class="ws-input-seperator" />')[0], c.splits[1]], o(c, b), c;
      },
      sort: function sort(b) {
        var c,
            d = a(".ws-input-seperator", b).html(g.dFormat),
            e = a("input.mm, select.mm", b);
        g.date.showMonthAfterYear ? (e.appendTo(b), c = "insertBefore") : (e.prependTo(b), c = "insertAfter"), d[c](e);
      }
    }
  },
      r = new Date(new Date().getTime() - 60 * new Date().getTimezoneOffset() * 1e3),
      s = r.getFullYear();

  r = new Date(r.getFullYear(), r.getMonth(), r.getDate(), r.getHours()).getTime();

  var t = {
    number: {
      step: 1
    },
    "datetime-local": {
      step: 60,
      start: new Date(r).getTime()
    },
    time: {
      step: 60
    },
    month: {
      step: 1,
      start: new Date(r)
    },
    date: {
      step: 1,
      start: new Date(r)
    }
  },
      u = function () {
    var c = function c() {
      return b.getID(this);
    };

    return function (b, d, e) {
      a(b).attr({
        "aria-labelledby": d.map(c).get().join(" ")
      }), e || d.on("click", function (a) {
        return a.isDefaultPrevented() ? void 0 : (b.getShadowFocusElement().focus(), a.preventDefault(), !1);
      });
    };
  }(),
      v = function v(a) {
    return a += "", a ? 1 == a.length ? "0" + a : a : "";
  },
      w = function w(a, c) {
    return a = ("color" == a ? "color" : "forms") + "-picker", w[c + "Loaded" + a] || (w[c + "Loaded" + a] = !0, b.ready(c, function () {
      b.loader.loadList([a]);
    })), a;
  };

  f.addZero = v, b.loader.addModule("forms-picker", {
    noAutoCallback: !0,
    css: "styles/forms-picker.css",
    options: f
  }), b.loader.addModule("color-picker", {
    noAutoCallback: !0,
    css: "jpicker/jpicker.css",
    options: f,
    d: ["forms-picker"]
  }), f.steps = t, function () {
    h.de = a.extend(!0, {
      numberFormat: {
        ",": ".",
        ".": ","
      },
      timeSigns: ":. ",
      numberSigns: ",",
      dateSigns: ".",
      dFormat: ".",
      patterns: {
        d: "dd.mm.yy"
      },
      month: {
        currentText: "Aktueller Monat"
      },
      time: {
        currentText: "Jetzt"
      },
      date: {
        close: "schlie\xdfen",
        clear: "L\xf6schen",
        prevText: "Zur\xfcck",
        nextText: "Vor",
        currentText: "Heute",
        monthNames: ["Januar", "Februar", "M\xe4rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        monthNamesShort: ["Jan", "Feb", "M\xe4r", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        weekHeader: "KW",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
      }
    }, h.de || {}), h.en = a.extend(!0, {
      numberFormat: {
        ".": ".",
        ",": ","
      },
      numberSigns: ".",
      dateSigns: "-",
      timeSigns: ":. ",
      dFormat: "-",
      patterns: {
        d: "yy-mm-dd"
      },
      month: {
        currentText: "This month"
      },
      time: {
        currentText: "Now"
      },
      date: {
        closeText: "Done",
        clear: "Clear",
        prevText: "Prev",
        nextText: "Next",
        currentText: "Today",
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        weekHeader: "Wk",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
      }
    }, h.en || {}), h["en-US"] || (h["en-US"] = a.extend(!0, {}, h.en, {
      date: {
        firstDay: 0
      },
      patterns: {
        d: "mm/dd/yy"
      },
      dateSigns: "/",
      dFormat: "/",
      meridian: ["AM", "PM"]
    })), h["en-GB"] || (h["en-GB"] = a.extend(!0, {}, h.en, {
      date: {
        firstDay: 1
      },
      patterns: {
        d: "dd/mm/yy"
      },
      dateSigns: "/",
      dFormat: "/",
      meridian: ["AM", "PM"]
    })), h["en-AU"] || (h["en-AU"] = a.extend(!0, {}, h["en-GB"])), h[""] || (h[""] = h.en), g = h[""];

    var c = function c(b) {
      if (!b.date.monthkeys) {
        var c = function c(a, _c) {
          var d,
              e = a + 1;
          d = 10 > e ? "0" + e : "" + e, b.date.monthkeys[e] = d, b.date.monthkeys[_c] = d, b.date.monthkeys[_c.toLowerCase()] = d;
        };

        b.date.monthkeys = {}, b.date.monthDigits = j, b.numberSigns += "-", b.meridian && (b.timeSigns += b.meridian[0] + b.meridian[1] + b.meridian[0].toLowerCase() + b.meridian[1].toLowerCase()), a.each(b.date.monthNames, c), a.each(b.date.monthNamesShort, c);
      }

      b.colorSigns || (b.colorSigns = "#abcdefABCDEF"), b["datetime-localSigns"] || (b["datetime-localSigns"] = b.dateSigns + b.timeSigns), b["datetime-local"] || (b["datetime-local"] = {}), b.time || (b.time = {}), !b["datetime-local"].currentText && b.time.currentText && (b["datetime-local"].currentText = b.time.currentText);
    },
        e = function e() {
      c(g), a(d).triggerHandler("wslocalechange");
    };

    g = b.activeLang(h), e(), a(h).on("change", function () {
      g = h.__active, e();
    });
  }(), function () {
    var c = function c(a, b) {
      return "number" == typeof a || a && a == 1 * a ? 1 * a : b;
    },
        d = {
      number: function number(a, b, c) {
        var d, e, f, h;
        if (b && b.nogrouping) return (a + "").replace(/\,/g, "").replace(/\./, g.numberFormat["."]);

        for (a += "", "-" == a.charAt(0) && (h = !0, a = a.replace("-", "")), d = a.split("."), e = d[0].length, f = e - 1, a = ""; f >= 0;) {
          a = d[0].charAt(f) + a, f > 0 && (e - f) % 3 === 0 && (a = g.numberFormat[","] + a), --f;
        }

        return null != d[1] && (c || (d[1] = d[1].replace(/\-/g, "0")), a += g.numberFormat["."] + d[1]), h && (a = "-" + a), a;
      },
      time: function time(b, c, d) {
        var e, f;

        if (b) {
          if (b = b.split(":"), 2 != b.length || isNaN(parseInt(b[0] || "", 10)) || isNaN(parseInt(b[1] || "", 10))) return b.join(":");

          if (g.meridian && (e = 1 * b[0], e && e >= 12 ? (b[0] = v(e - 12 + ""), e = 1) : e = 0, "00" === b[0] && (b[0] = "12")), !d) {
            for (f = 0; f < b.length; f++) {
              b[f] = v(b[f]);
            }

            b[1] || (b[1] = "00");
          }

          b = a.trim(b.join(":")), null != e && g.meridian && (b += " " + g.meridian[e]);
        }

        return b;
      },
      "datetime-local": function datetimeLocal(b, c) {
        var d = a.trim(b || "").split("T");
        return 2 == d.length && (b = this.date(d[0], c) + " " + this.time(d[1], c)), b;
      },
      month: function month(a, b) {
        var c,
            d = a.split("-");
        return d[0] && d[1] ? (b && b.monthSelect || (c = g.date[b.monthNames] || g.date.monthNames, d[1] = c[1 * d[1] - 1]), b && b.splitInput ? a = [d[0] || "", d[1] || ""] : d[1] && (a = g.date.showMonthAfterYear ? d.join(" ") : d[1] + " " + d[0])) : b && b.splitInput && (a = [d[0] || "", d[1] || ""]), a;
      },
      date: function date(a, b) {
        var c = (a + "").split("-");
        return c[2] && c[1] && c[0] ? b && b.splitInput ? a = c : (a = g.patterns.d.replace("yy", c[0] || ""), a = a.replace("mm", c[1] || ""), a = a.replace("dd", c[2] || "")) : b && b.splitInput && (a = [c[0] || "", c[1] || "", c[2] || ""]), a;
      },
      color: function color(a) {
        var b = "#000000";
        return a && (a = a.toLowerCase(), 7 == a.length && h("color").isValid(a) && (b = a)), b;
      }
    },
        e = {
      number: function number(a) {
        return (a + "").split(g.numberFormat[","]).join("").replace(g.numberFormat["."], ".");
      },
      "datetime-local": function datetimeLocal(b, c) {
        var d,
            e = a.trim(b || "").split(/\s+/);
        return 2 == e.length ? (-1 != e[0].indexOf(":") && -1 == e[1].indexOf(":") && (d = e[1], e[1] = e[0], e[0] = d), b = this.date(e[0], c) + "T" + this.time(e[1], c)) : 3 == e.length && (b = this.date(e[0], c) + "T" + this.time(e[1] + e[2], c)), b;
      },
      time: function time(b) {
        var c;
        return b && g.meridian && (b = b.toUpperCase(), "12" === b.substr(0, 2) && (b = "00" + b.substr(2)), -1 != b.indexOf(g.meridian[1]) && (b = b.split(":"), c = 1 * b[0].replace(g.meridian[1], ""), isNaN(c) || (b[0] = c + 12), b = b.join(":")), b = a.trim(b.replace(g.meridian[0], "").replace(g.meridian[1], ""))), b;
      },
      month: function month(a, b, c) {
        var d = "monthNamesShort" == b.monthNames ? /[\s-\/\\]+/ : /[\.\s-\/\\]+/,
            e = b.splitInput ? a : a.trim().split(d);
        return 2 == e.length && e[0] && e[1] ? (e[0] = !c && g.date.monthkeys[e[0]] || e[0], e[1] = !c && g.date.monthkeys[e[1]] || e[1], a = 2 == e[1].length && e[0].length > 3 ? e[0] + "-" + e[1] : 2 == e[0].length && e[1].length > 3 ? e[1] + "-" + e[0] : "") : b.splitInput && (a = ""), a;
      },
      date: function date(a, b, c) {
        n("d");
        var d,
            e,
            f = "";
        return b.splitInput ? e = {
          yy: 0,
          mm: 1,
          dd: 2
        } : (e = g.patterns.dObj, a = a.split(g.dFormat)), 3 == a.length && a[0] && a[1] && a[2] && (!c || a[e.yy].length > 3 && 2 == a[e.mm].length && 2 == a[e.dd].length) && (!b.noDayMonthSwitch && a[e.mm] > 12 && a[e.dd] < 13 && (d = a[e.dd], a[e.dd] = a[e.mm], a[e.mm] = d), a[e.yy].length < 4 && (d = (new Date().getFullYear() + "").substr(0, 4 - a[e.yy].length), a[e.yy] > 50 && d--, a[e.yy] = d + a[e.yy]), f = [v(a[e.yy]), v(a[e.mm]), v(a[e.dd])].join("-")), f;
      },
      color: function color(a) {
        var b = "#000000";
        return a && (a = a.toLowerCase(), 0 !== a.indexOf("#") && (a = "#" + a), 4 == a.length && (a = "#" + a.charAt(1) + a.charAt(1) + a.charAt(2) + a.charAt(2) + a.charAt(3) + a.charAt(3)), 7 == a.length && h("color").isValid(a) && (b = a)), b;
      }
    },
        f = {
      date: function date(a, b) {
        var c = (a || "").split("-");
        return c = 3 == c.length ? b.splitInput ? c : g.patterns.d.replace("yy", c[0]).replace("mm", c[1]).replace("dd", c[2]) : b.splitInput ? [a, a, a] : a;
      },
      month: function month(a, b) {
        var c = (a || "").split("-");
        return c = 2 == c.length ? b.splitInput ? c : g.date.showMonthAfterYear ? c[0] + " " + c[1] : c[1] + " " + c[0] : b.splitInput ? [a, a] : a;
      }
    },
        h = function () {
      var b = {};
      return function (c) {
        var d;
        return b[c] || (d = a('<input type="' + c + '" step="any" />'), b[c] = {
          asNumber: function asNumber(a) {
            var b = "object" == _typeof(a) ? "valueAsDate" : "value";
            return d.prop(b, a).prop("valueAsNumber");
          },
          asValue: function asValue(a) {
            var b = "object" == _typeof(a) ? "valueAsDate" : "valueAsNumber";
            return d.prop(b, a).prop("value");
          },
          asDate: function asDate(a) {
            var b = "number" == typeof a ? "valueAsNumber" : "value";
            return d.prop(b, a).prop("valueAsDate");
          },
          isValid: function isValid(b, c) {
            return c && (c.nodeName || c.jquery) && (c = {
              min: a(c).prop("min") || "",
              max: a(c).prop("max") || "",
              step: a(c).prop("step") || "any"
            }), c = a.extend({
              step: "any",
              min: "",
              max: ""
            }, c || {}), d.attr(c).prop("value", b).is(":valid") && d.prop("value") == b;
          }
        }), b[c];
      };
    }();

    t.range = t.number;
    var j = {
      _create: function _create() {
        var b,
            c,
            _d,
            e = this.options,
            f = this.createOpts;

        for (this.type = e.type, this.orig = e.orig, this.buttonWrapper = a('<span class="input-buttons ' + this.type + '-input-buttons"></span>').insertAfter(this.element), this.options.containerElements.push(this.buttonWrapper[0]), e.mirrorValidity = e.mirrorValidity && this.orig && i, e.splitInput && this._addSplitInputs ? (e.monthSelect && this.element.addClass("ws-month-select"), this._addSplitInputs()) : this.inputElements = this.element, t[this.type] && "object" == _typeof(t[this.type].start) && (t[this.type].start = this.asNumber(t[this.type].start)), b = 0; b < f.length; b++) {
          null != e[f[b]] && this[f[b]](e[f[b]], e[f[b]]);
        }

        "color" == this.type && this.inputElements.prop("maxLength", 7), this.addBindings(), a(this.element).data("wsWidget" + e.type, this), e.buttonOnly && this.inputElements.prop({
          readOnly: !0
        }), this._init = !0, e.mirrorValidity && (c = this, _d = function d() {
          clearTimeout(_d._timerDealy), _d._timerDealy = setTimeout(_d._wsexec, 9);
        }, _d._wsexec = function () {
          clearTimeout(_d._timerDealy), c.mirrorValidity(!0);
        }, _d(), a(this.orig).on("change input", function (a) {
          "input" == a.type ? _d() : _d._wsexec();
        }));
      },
      mirrorValidity: function mirrorValidity(b) {
        if (this._init && this.options.mirrorValidity) {
          b || a.prop(this.orig, "validity");
          var c = a(this.orig).getErrorMessage();
          c !== this.lastErrorMessage && (this.inputElements.prop("setCustomValidity", function (a, b) {
            b._supvalue && b._supvalue.call(this, c);
          }), this.lastErrorMessage = c);
        }
      },
      addBindings: function addBindings() {
        var c = this,
            d = this.options,
            e = function e() {
          c._addBindings();
        };

        this._addBindings ? e() : (b.ready("forms-picker", e), w(this.type, "WINDOWLOAD")), this.inputElements.add(this.buttonWrapper).add(this.element).one("mousedown focusin", function () {
          w(c.type, "DOM");
        }).on({
          "change input focus focusin blur focusout": function changeInputFocusFocusinBlurFocusout(b) {
            var e, f;
            a(b.target).trigger("ws__" + b.type), d.toFixed && "number" == d.type && "change" == b.type && (e = c.element.prop("value"), f = c.toFixed(e, !0), e != f && (c.element[0].value = f));
          }
        }), "color" != this.type && !function () {
          var b, e, g;
          d.splitInput ? (b = function b() {
            c.reorderInputs(), d.monthSelect && (e = c.inputElements.filter("select.mm"), g = e.prop("value"), e.html(l(d)), e.prop("value", g));
          }, c.reorderInputs()) : b = function b() {
            d.value && c.value(d.value, !0), f[c.type] && d.placeholder && c.placeholder(d.placeholder);
          }, a(c.orig).onWSOff("wslocalechange", b);
        }();
      },
      required: function required(a, b) {
        this.inputElements.attr({
          "aria-required": "" + b
        }), this.mirrorValidity();
      },
      parseValue: function parseValue(b) {
        var c = this.inputElements.map(function () {
          return a.prop(this, "value");
        }).get();
        return this.options.splitInput || (c = c[0]), e[this.type](c, this.options, b);
      },
      formatValue: function formatValue(a, b) {
        return d[this.type](a, b === !1 ? !1 : this.options);
      },
      createOpts: ["readonly", "title", "disabled", "tabindex", "placeholder", "defaultValue", "value", "required"],
      placeholder: function placeholder(b) {
        var c = this.options;
        c.placeholder = b;
        var d = b;
        f[this.type] && (d = f[this.type](b, this.options)), c.splitInput && "object" == _typeof(d) ? a.each(this.splits, function (b, c) {
          a.nodeName(c, "select") ? a(c).children("option:first-child").text(d[b]) : a.prop(c, "placeholder", d[b]);
        }) : this.element.prop("placeholder", d);
      },
      list: function list(b) {
        "number" == this.type && this.element.attr("list", a.attr(this.orig, "list")), this.options.list = b, this._propertyChange("list");
      },
      _propertyChange: a.noop,
      tabindex: function tabindex(b) {
        this.options.tabindex = b, this.inputElements.prop("tabindex", this.options.tabindex), a("button", this.buttonWrapper).prop("tabindex", this.options.tabindex);
      },
      title: function title(b) {
        !b && this.orig && null == a.attr(this.orig, "title") && (b = null), this.options.title = b, null == b ? this.inputElements.removeAttr("title") : this.inputElements.prop("title", this.options.title);
      }
    };
    ["defaultValue", "value"].forEach(function (a) {
      var b = "format" + a;

      j[a] = function (c, d) {
        (!this._init || d || c !== this.options[a] || this.options[b] != this.element.prop(a)) && (this.options[b] = this.formatValue(c), this.element.prop(a, this.options[b]), this.options[a] = c, this._propertyChange(a), this.mirrorValidity());
      };
    }), ["readonly", "disabled"].forEach(function (b) {
      var c = "disabled" == b;

      j[b] = function (d, e) {
        var f = this.options;
        f[b] == e && this._init || (f[b] = !!e, !c && f.buttonOnly ? this.inputElements.attr({
          "aria-readonly": f[b]
        }) : this.inputElements.prop(b, f[b]), this.buttonWrapper[f[b] ? "addClass" : "removeClass"]("ws-" + b), c && a("button", this.buttonWrapper).prop("disabled", f[b]));
      };
    });
    var k = a.extend({}, j, {
      _create: function _create() {
        var c = this.options,
            d = h(c.type);
        this.elemHelper = a('<input type="' + c.type + '" />'), this.asNumber = d.asNumber, this.asValue = d.asValue, this.isValid = d.isValid, this.asDate = d.asDate, j._create.apply(this, arguments), this._init = !1, this.buttonWrapper.html('<span unselectable="on" class="step-controls"><span class="step-up step-control"></span><span class="step-down step-control"></span></span>'), "number" == this.type && this.inputElements.attr("inputmode", "numeric"), (!c.max && "number" == typeof c.relMax || !c.min && "number" == typeof c.relMin) && b.error("relMax/relMin are not supported anymore calculate at set it your own."), this.options.relDefaultValue && b.warn("relDefaultValue was removed use startValue instead!"), this._init = !0;
      },
      createOpts: ["step", "min", "max", "readonly", "title", "disabled", "tabindex", "placeholder", "defaultValue", "value", "required"],
      _addSplitInputs: function _addSplitInputs() {
        if (!this.inputElements) {
          var b = q[this.type]._create(this.options);

          this.splits = b.splits, this.inputElements = a(b.elements).prependTo(this.element).filter("input, select");
        }
      },
      addZero: v,
      _setStartInRange: function _setStartInRange() {
        var a = this.options.startValue && this.asNumber(this.options.startValue) || t[this.type].start || 0;
        !isNaN(this.minAsNumber) && a < this.minAsNumber ? a = this.minAsNumber : !isNaN(this.maxAsNumber) && a > this.maxAsNumber && (a = this.maxAsNumber);

        try {
          this.elemHelper.prop("valueAsNumber", a);
        } catch (c) {
          b.warn("valueAsNumber set: " + c);
        }

        this.options.defValue = this.elemHelper.prop("value");
      },
      reorderInputs: function reorderInputs() {
        if (q[this.type]) {
          var a = this.element.attr("dir", g.date.isRTL ? "rtl" : "ltr");
          q[this.type].sort(a, this.options), setTimeout(function () {
            var c = b.data(a);
            c && c.shadowData && (c.shadowData.shadowFocusElement = a.find("input, select")[0] || a[0]);
          }, 9);
        }
      },
      step: function step(a) {
        var b = t[this.type];
        this.options.step = a, this.elemHelper.prop("step", c(a, b.step)), this.mirrorValidity();
      },
      _beforeValue: function _beforeValue(a) {
        this.valueAsNumber = this.asNumber(a), this.options.value = a, isNaN(this.valueAsNumber) || !isNaN(this.minAsNumber) && this.valueAsNumber < this.minAsNumber || !isNaN(this.maxAsNumber) && this.valueAsNumber > this.maxAsNumber ? this._setStartInRange() : (this.elemHelper.prop("value", a), this.options.defValue = "");
      },
      toFixed: function toFixed(a, b) {
        var c = this.options;
        return !c.toFixed || "number" != c.type || !a || isNaN(this.valueAsNumber) || !b && this.element.is(":focus") || c.fixOnlyFloat && !(this.valueAsNumber % 1) || (a = d[this.type](this.valueAsNumber.toFixed(c.toFixed), this.options)), a;
      }
    });
    ["defaultValue", "value"].forEach(function (b) {
      var c = "value" == b;

      k[b] = function (e, f, g) {
        var h;
        (!this._init || f || e || this.options[b] !== e) && (c ? this._beforeValue(e) : this.elemHelper.prop(b, e), e = d[this.type](e, this.options), this.options.splitInput ? a.each(this.splits, function (d, f) {
          b in f || c || !a.nodeName(f, "select") ? a.prop(f, b, e[d]) : a('option[value="' + e[d] + '"]', f).prop("defaultSelected", !0);
        }) : (e = this.toFixed(e), g && this._getSelectionEnd && (h = this._getSelectionEnd(e)), this.element.prop(b, e), null != h && this.element.prop("selectionEnd", h)), this._propertyChange(b), this.mirrorValidity());
      };
    }), a.each({
      min: 1,
      max: -1
    }, function (a, b) {
      var c = a + "AsNumber";

      k[a] = function (d) {
        this.elemHelper.prop(a, d), this[c] = this.asNumber(d), null != this.valueAsNumber && (isNaN(this.valueAsNumber) || !isNaN(this[c]) && this.valueAsNumber * b < this[c] * b) && this._setStartInRange(), this.options[a] = d, this._init && o({
          elements: this.inputElements
        }, this.options), this._propertyChange(a), this.mirrorValidity();
      };
    }), a.fn.wsBaseWidget = function (c) {
      return c = a.extend({}, c), this.each(function () {
        b.objectCreate(j, {
          element: {
            value: a(this)
          }
        }, c);
      });
    }, a.fn.wsBaseWidget.wsProto = j, a.fn.spinbtnUI = function (c) {
      return c = a.extend({
        monthNames: "monthNamesShort"
      }, c), this.each(function () {
        b.objectCreate(k, {
          element: {
            value: a(this)
          }
        }, c);
      });
    }, a.fn.spinbtnUI.wsProto = k, b._format = d;
  }(), a.fn.wsTouchClick || (a.fn.wsTouchClick = function () {
    var b = "touchAction" in d.documentElement.style,
        e = !b && "ontouchstart" in c && d.addEventListener;
    return function (c, d) {
      var f,
          _g,
          h,
          i,
          j,
          k = function k() {
        return i ? void 0 : d.apply(this, arguments);
      };

      return a.isFunction(c) ? (d = c, c = !1, this.on("click", k)) : this.on("click", c, k), e ? (j = function j() {
        i = !1;
      }, _g = function g(b) {
        var c, e;
        b = b.originalEvent || {}, a(this).off("touchend touchcancel", _g);
        var h = b.changedTouches || b.touches;
        return "touchcancel" == b.type || !f || !h || 1 != h.length || (e = h[0], Math.abs(f.x - e.pageX) > 40 || Math.abs(f.y - e.pageY) > 40 || Date.now() - f.now > 300) ? void 0 : (b.preventDefault(), i = !0, setTimeout(j, 400), c = d.apply(this, arguments));
      }, h = function h(b) {
        var d, e;
        b && 1 == b.touches.length && (d = b.touches[0], e = c ? a(d.target).closest(c) : a(this), e.length && (f = {
          x: d.pageX,
          y: d.pageY,
          now: Date.now()
        }, e.on("touchend touchcancel", _g)));
      }, this.each(function () {
        this.addEventListener("touchstart", h, !0);
      })) : b && !c && this.css("touch-action", "manipulation"), this;
    };
  }()), function () {
    var e = {},
        f = c.Modernizr,
        g = f && (f.touchevents || f.touch) || /android|iphone|ipad|ipod|blackberry|iemobile/i.test(navigator.userAgent.toLowerCase());
    b.inlinePopover = {
      _create: function _create() {
        this.element = a('<div class="ws-inline-picker"><div class="ws-po-box" /></div>').data("wspopover", this), this.contentElement = a(".ws-po-box", this.element), this.element.insertAfter(this.options.prepareFor);
      },
      show: a.noop,
      hide: a.noop,
      preventBlur: a.noop,
      isVisible: !0
    }, e.isInRange = function (a, b, c) {
      return !(c[0] && c[0] > a[0] || b[0] && b[0] < a[0]);
    }, e.createYearSelect = function (a, b, c, d, f) {
      f || (f = {
        start: a,
        step: 1,
        label: a
      });

      var g,
          h = !0,
          i = !0,
          j = ['<option selected="">' + f.label + "</option>"],
          k = 0,
          l = function l(a, g) {
        var h, i;
        return f.step > 1 ? (h = a + f.step - 1, i = a + " \u2013 " + h) : i = a, e.isInRange([a], b, c) || h && e.isInRange([h], b, c) ? (j[g]('<option value="' + (a + d) + '">' + i + "</option>"), !0) : void 0;
      };

      for (d || (d = ""); 18 > k && (h || i);) {
        k++, h && (g = f.start - k * f.step, h = l(g, "unshift")), i && (g = f.start + k * f.step, i = l(g, "push"));
      }

      return j;
    }, e._genericSetFocus = function (b, c) {
      if (b = a(b || this.activeButton), !this.popover.openedByFocus && !c) {
        var d = this,
            e = function e(a) {
          clearTimeout(d.timer), d.timer = setTimeout(function () {
            b[0] && (b.trigger("focus"), a === !0 || b.is(":focus") || e(!0));
          }, d.popover.isVisible ? 0 : 360);
        };

        this.popover.activateElement(b), e();
      }
    }, e._actions = {
      changeInput: function changeInput(a, b, c) {
        c.options.noChangeDismiss || e._actions.cancel(a, b, c), c.setChange(a);
      },
      cancel: function cancel(b, c, d) {
        d.options.inlinePicker || (c.stopOpen = !0, !c.openedByFocus && g ? a("button", d.buttonWrapper).trigger("focus") : d.element.getShadowFocusElement().trigger("focus"), setTimeout(function () {
          c.stopOpen = !1;
        }, 9), c.hide());
      }
    }, e.commonInit = function (b, c) {
      if (!b._commonInit) {
        b._commonInit = !0;
        var e;
        c.isDirty = !0, c.element.on("updatepickercontent pickerchange", function () {
          e = !1;
        }), b.options.inlinePicker || c.contentElement.on({
          keydown: function keydown(d) {
            if (9 == d.keyCode) {
              e || (e = a('input:not(:disabled), [tabindex="0"]:not(:disabled)', this).filter(":visible"));
              var f = e.index(d.target);
              if (d.shiftKey && 0 >= f) return e.last().focus(), !1;
              if (!d.shiftKey && f >= e.length - 1) return e.first().focus(), !1;
            } else if (27 == d.keyCode) return b.element.getShadowFocusElement().focus(), c.hide(), !1;
          }
        }), b._propertyChange = function () {
          var a,
              d = function d() {
            c.isVisible && c.element.triggerHandler("updatepickercontent");
          };

          return function (e) {
            ("value" != e || b.options.inlinePicker && !b._handledValue) && (c.isDirty = !0, c.isVisible && (clearTimeout(a), a = setTimeout(d, 9)));
          };
        }(), c.activeElement = a([]), c.activateElement = function (b) {
          b = a(b), b[0] != c.activeElement[0] && (c.activeElement.removeClass("ws-focus"), b.addClass("ws-focus")), c.activeElement = b;
        }, c.element.on({
          wspopoverbeforeshow: function wspopoverbeforeshow() {
            b.element.triggerHandler("wsupdatevalue"), c.element.triggerHandler("updatepickercontent");
          }
        }), a(b.orig).on("remove", function (c) {
          c.originalEvent || a(d).off("wslocalechange", b._propertyChange);
        });
      }
    }, e._common = function (c) {
      if (!c.options.nopicker) {
        var d = c.options,
            f = b.objectCreate(d.inlinePicker ? b.inlinePopover : b.wsPopover, {}, a.extend(d.popover || {}, {
          prepareFor: d.inlinePicker ? c.buttonWrapper : c.element
        })),
            g = a('<button type="button" class="ws-popover-opener"><span /></button>').appendTo(c.buttonWrapper),
            h = function h() {
          (e[c.type].showPickerContent || e.showPickerContent)(c, f);
        },
            i = function i() {
          var a = w(c.type, "DOM");
          d.disabled || d.readonly || !d.inlinePicker && f.isVisible || (b.ready(a, h), f.show(c.element));
        },
            j = function j() {
          (d.inlinePicker || f.isVisible) && f.activeElement && (f.openedByFocus = !1, f.activeElement.focus()), i();
        },
            l = function l() {
          f.openedByFocus || !f.isVisible ? j() : f.hide();
        };

        d.containerElements.push(f.element[0]), f.element.addClass(c.type + "-popover input-picker").attr({
          role: "application"
        }).on({
          wspopoverhide: function wspopoverhide() {
            f.openedByFocus = !1;
          },
          focusin: function focusin(a) {
            f.activateElement && (f.openedByFocus = !1, f.activateElement(a.target));
          },
          focusout: function focusout() {
            f.activeElement && f.activeElement.removeClass("ws-focus"), d.inlinePicker && (f.openedByFocus = !0);
          }
        }), u(f.element.children("div.ws-po-outerbox").attr({
          role: "group"
        }), d.labels, !0), u(g, d.labels, !0), null != d.tabindex && g.attr({
          tabindex: d.tabindex
        }), d.disabled && g.prop({
          disabled: !0
        }), g.wsTouchClick(l), d.inlinePicker ? f.openedByFocus = !0 : (g.on({
          mousedown: function mousedown() {
            k.apply(this, arguments), f.preventBlur();
          },
          keydown: function keydown(a) {
            40 == a.keyCode && a.altKey && j();
          },
          "focus mousedown": function () {
            var a = !0,
                b = function b() {
              a = !0;
            };

            return function (c) {
              "mousedown" == c.type && (a = !1, setTimeout(b)), "focus" == c.type && a && d.openOnFocus && f.openedByFocus && ("auto" == f.options.appendTo || "element" == f.options.appendTo) ? f.hide() : f.preventBlur();
            };
          }()
        }), function () {
          var b = !1,
              e = function e() {
            b = !1;
          };

          c.inputElements.on({
            keydown: function keydown(b) {
              40 == b.keyCode && b.altKey && !a.nodeName(b.target, "select") && j();
            },
            focus: function focus(c) {
              f.stopOpen || !(d.buttonOnly || d.openOnFocus || b && d.openOnMouseFocus) || a.nodeName(c.target, "select") ? f.preventBlur() : (f.openedByFocus = d.buttonOnly ? !1 : !d.noInput, i());
            },
            mousedown: function mousedown(g) {
              b = !0, setTimeout(e, 9), d.buttonOnly && f.isVisible && f.activeElement && (f.openedByFocus = !1, setTimeout(function () {
                f.openedByFocus = !1, f.activeElement.focus();
              }, 4)), c.element.is(":focus") && !a.nodeName(g.target, "select") && (f.openedByFocus = d.buttonOnly ? !1 : !d.noInput, i()), f.preventBlur();
            }
          });
        }()), c.popover = f, c.opener = g, a(c.orig).on("remove", function (a) {
          a.originalEvent || setTimeout(function () {
            g.remove(), f.element.remove();
          }, 4);
        }), d.inlinePicker && i();
      }
    }, e.month = e._common, e.date = e._common, e.time = e._common, e["datetime-local"] = e._common, e.color = function (b) {
      var c = e._common.apply(this, arguments),
          d = a(b.orig).data("alphacontrol"),
          f = b.opener.prepend('<span class="ws-color-indicator-bg"><span class="ws-color-indicator" /></span>').find(".ws-color-indicator"),
          g = function g() {
        f.css({
          backgroundColor: a.prop(this, "value") || "#000000"
        });
      },
          h = function () {
        var a,
            c = function c() {
          try {
            var a = b.alpha.prop("valueAsNumber") / (b.alpha.prop("max") || 1);
            isNaN(a) || f.css({
              opacity: a
            });
          } catch (c) {}
        };

        return function (b) {
          clearTimeout(a), a = setTimeout(c, b && "change" != b.type ? 40 : 4);
        };
      }();

      return b.alpha = a(d ? "#" + d : []), a(b.orig).on("wsupdatevalue change", g).each(g), b.alpha.on("wsupdatevalue change input", h).each(h), c;
    }, b.picker = e;
  }(), function () {
    var c,
        e,
        g = b.support.inputtypes,
        j = {},
        l = {
      disabled: 1,
      required: 1,
      readonly: 1
    },
        m = ["disabled", "readonly", "value", "defaultValue", "min", "max", "step", "title", "required", "placeholder"],
        n = ["data-placeholder", "tabindex"];

    if (a.each(m.concat(n), function (a, d) {
      var e = d.replace(/^data\-/, "");
      b.onNodeNamesPropertyModify("input", d, function (a, d) {
        if (!c) {
          var f = b.data(this, "shadowData");
          f && f.data && f.nativeElement === this && f.data[e] && (l[e] ? f.data[e](a, d) : f.data[e](a));
        }
      });
    }), f.replaceUI && "valueAsNumber" in d.createElement("input")) {
      var o = function o() {
        b.data(this, "hasShadow") && a.prop(this, "value", a.prop(this, "value"));
      };

      b.onNodeNamesPropertyModify("input", "valueAsNumber", o), b.onNodeNamesPropertyModify("input", "valueAsDate", o), a.each({
        stepUp: 1,
        stepDown: -1
      }, function (a) {
        var c = b.defineNodeNameProperty("input", a, {
          prop: {
            value: function value() {
              var a;
              return c.prop && c.prop._supvalue && (a = c.prop._supvalue.apply(this, arguments), o.apply(this, arguments)), a;
            }
          }
        });
      });
    }

    var p = function () {
      return function (b, c) {
        j[b] = c, c.attrs = a.merge([], n, c.attrs), c.props = a.merge([], m, c.props);
      };
    }(),
        r = function r() {
      return "none" != a.css(this, "display");
    },
        s = function s(b) {
      var c,
          d,
          e,
          f,
          g,
          h,
          i,
          j = b.orig.style,
          k = b.element[0].style;
      null == a.support.boxSizing ? a(function () {
        d = b.orig.parentNode;
      }) : d = b.orig.parentNode;

      var l = function l() {
        var l,
            m,
            n,
            o,
            p = .8;
        d && (l = d.offsetWidth), (!c || l && l != e) && (e = l, j.display = "", k.display = "none", c || (i = b.buttonWrapper && b.buttonWrapper.filter(r).length, h = i && "rtl" == b.buttonWrapper.css("direction"), h ? (f = "Right", g = "Left") : (f = "Left", g = "Right"), i && b.buttonWrapper[h ? "addClass" : "removeClass"]("ws-is-rtl")), m = a.css(b.orig, "margin" + g), k["margin" + f] = a.css(b.orig, "margin" + f), k["margin" + g] = i ? "0px" : m, i && (n = parseInt(b.buttonWrapper.css("margin" + f), 10) || 0, k["padding" + g] = "", 0 > n ? (m = (parseInt(m, 10) || 0) + -1 * (b.buttonWrapper.outerWidth() + n), b.buttonWrapper[0].style["margin" + g] = m + "px", k["padding" + g] = (parseInt(b.element.css("padding" + g), 10) || 0) + b.buttonWrapper.outerWidth() + "px") : (b.buttonWrapper[0].style["margin" + g] = m, p = b.buttonWrapper.outerWidth(!0) + p)), o = a(b.orig).outerWidth() - p, k.display = "", b.element.outerWidth(o), j.display = "none", c = !0);
      };

      j.webkitAppearance = "none", b.element.onWSOff("updateshadowdom", l, !0);
    },
        v = function v() {
      var d,
          h,
          l,
          o,
          p,
          q,
          t,
          v = a.prop(this, "type");

      if (j[v] && b.implement(this, "inputwidgets") && (!g[v] || !a(this).hasClass("ws-noreplace"))) {
        for (l = {}, o = v, t = a(this).is(":focus"), p = a(this).jProp("labels"), h = a.extend(b.getOptions(this, v, [f.widgets, f[v], a(a.prop(this, "form")).data(v)]), {
          orig: this,
          type: v,
          labels: p,
          options: {},
          input: function input(a) {
            h._change(a, "input");
          },
          change: function change(a) {
            h._change(a, "change");
          },
          _change: function _change(b, d) {
            c = !0, a.prop(h.orig, "value", b), c = !1, d && a(h.orig).trigger(d);
          },
          containerElements: []
        }), d = 0; d < m.length; d++) {
          h[m[d]] = a.prop(this, m[d]);
        }

        for (d = 0; d < n.length; d++) {
          o = n[d].replace(/^data\-/, ""), "placeholder" != o && h[o] || (h[o] = a.attr(this, n[d]) || h[o]);
        }

        h.formatMonthNames && b.error("formatMonthNames was renamded to monthNames"), h.onlyMonthDigits && (h.monthNames = "monthDigits"), l.shim = j[v]._create(h), b.addShadowDom(this, l.shim.element, {
          data: l.shim || {}
        }), l.shim.options.containerElements.push(l.shim.element[0]), q = a.prop(this, "className"), h.classes && (q += " " + h.classes, a(this).addClass(h.classes)), (h.splitInput || "range" == v) && (q = q.replace("form-control", "")), l.shim.element.on("change input", k).addClass(q + " " + b.shadowClass), l.shim.buttonWrapper && (l.shim.buttonWrapper.addClass("input-button-size-" + l.shim.buttonWrapper.children().filter(r).length + " " + b.shadowClass), l.shim.buttonWrapper.filter(r).length && l.shim.element.addClass("has-input-buttons")), u(a(this).getShadowFocusElement(), p), a(this).on("change", function () {
          c || l.shim.value(a.prop(this, "value"));
        }), function () {
          var b,
              c = {
            focusin: !0,
            focus: !0
          },
              d = !1,
              e = !1;
          a(l.shim.options.containerElements).on({
            "focusin focus focusout blur": function focusinFocusFocusoutBlur(f) {
              "focus" == f.type ? f.stopPropagation() : f.stopImmediatePropagation(), e = c[f.type], clearTimeout(b), b = setTimeout(function () {
                e != d && (d = e, a(h.orig).triggerHandler(e ? "focus" : "blur"), a(h.orig).trigger(e ? "focusin" : "focusout")), d = e;
              }, 9);
            }
          });
        }(), i && a(h.orig).on("firstinvalid", function (c) {
          (b.fromSubmit || !e) && a(h.orig).off("invalid.replacedwidgetbubble").on("invalid.replacedwidgetbubble", function (d) {
            d.isDefaultPrevented() || (b.validityAlert.showFor(c.target), c.preventDefault(), d.preventDefault()), a(h.orig).off("invalid.replacedwidgetbubble");
          });
        }), h.calculateWidth ? s(l.shim) : a(this).css("display", "none"), t && a(this).getShadowFocusElement().trigger("focus");
      }
    };

    i && ["input", "form"].forEach(function (a) {
      var c = b.defineNodeNameProperty(a, "checkValidity", {
        prop: {
          value: function value() {
            e = !0;

            var a = c.prop._supvalue.apply(this, arguments);

            return e = !1, a;
          }
        }
      });
    });
    var w = {};
    f.replaceUI && a.each(a.extend(w, a.isPlainObject(f.replaceUI) ? f.replaceUI : {
      range: 1,
      number: 1,
      time: 1,
      month: 1,
      date: 1,
      color: 1,
      "datetime-local": 1
    }), function (a, c) {
      g[a] && "auto" == c && (w[a] = b._getAutoEnhance(c));
    }), g.number && -1 == navigator.userAgent.indexOf("Touch") && (/MSIE 1[0|1]\.\d/.test(navigator.userAgent) || /Trident\/7\.0/.test(navigator.userAgent)) && (w.number = 1), w.range === !1 || g.range && !w.range || p("range", {
      _create: function _create(b) {
        var c = a("<span />").insertAfter(b.orig).rangeUI(b).data("rangeUi");
        return c;
      }
    }), ["number", "time", "month", "date", "color", "datetime-local"].forEach(function (c) {
      w[c] === !1 || g[c] && !w[c] || p(c, {
        _create: function _create(d) {
          (d.monthSelect || d.daySelect || d.yearSelect) && (d.splitInput = !0), d.splitInput && !q[c] && (b.warn("splitInput not supported for " + c), d.splitInput = !1);
          var e = d.splitInput ? '<span class="ws-' + c + ' ws-input ws-inputreplace" role="group"></span>' : '<input class="ws-' + c + ' ws-inputreplace" type="text" />',
              f = a(e).insertAfter(d.orig);
          return f = t[c] ? f.spinbtnUI(d).data("wsWidget" + c) : f.wsBaseWidget(d).data("wsWidget" + c), b.picker && b.picker[c] && b.picker[c](f), f;
        }
      });
    });

    var x = function x() {
      b.addReady(function (b, c) {
        a("input", b).add(c.filter("input")).each(v);
      });
    };

    null == a("<input />").prop("labels") && b.defineNodeNamesProperty("button, input, keygen, meter, output, progress, select, textarea", "labels", {
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
    }), h._isLoading ? a(h).one("change", x) : x();
  }();
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