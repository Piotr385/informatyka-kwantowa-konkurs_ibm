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
}), webshims.register("form-message", function (a, b, c, d, e, f) {
  "use strict";

  f.lazyCustomMessages && (f.customMessages = !0);
  var g = b.validityMessages,
      h = f.customMessages ? ["customValidationMessage"] : [];
  g.en = a.extend(!0, {
    typeMismatch: {
      defaultMessage: "Please enter a valid value.",
      email: "Please enter an email address.",
      url: "Please enter a URL."
    },
    badInput: {
      defaultMessage: "Please enter a valid value.",
      number: "Please enter a number.",
      date: "Please enter a date.",
      time: "Please enter a time.",
      range: "Invalid input.",
      month: "Please enter a valid value.",
      "datetime-local": "Please enter a datetime."
    },
    rangeUnderflow: {
      defaultMessage: "Value must be greater than or equal to {%min}."
    },
    rangeOverflow: {
      defaultMessage: "Value must be less than or equal to {%max}."
    },
    stepMismatch: "Invalid input.",
    tooLong: "Please enter at most {%maxlength} character(s). You entered {%valueLen}.",
    tooShort: "Please enter at least {%minlength} character(s). You entered {%valueLen}.",
    patternMismatch: "Invalid input. {%title}",
    valueMissing: {
      defaultMessage: "Please fill out this field.",
      checkbox: "Please check this box if you want to proceed."
    }
  }, g.en || g["en-US"] || {}), "object" == _typeof(g.en.valueMissing) && ["select", "radio"].forEach(function (a) {
    g.en.valueMissing[a] = g.en.valueMissing[a] || "Please select an option.";
  }), "object" == _typeof(g.en.rangeUnderflow) && ["date", "time", "datetime-local", "month"].forEach(function (a) {
    g.en.rangeUnderflow[a] = g.en.rangeUnderflow[a] || "Value must be at or after {%min}.";
  }), "object" == _typeof(g.en.rangeOverflow) && ["date", "time", "datetime-local", "month"].forEach(function (a) {
    g.en.rangeOverflow[a] = g.en.rangeOverflow[a] || "Value must be at or before {%max}.";
  }), g["en-US"] || (g["en-US"] = a.extend(!0, {}, g.en)), g["en-GB"] || (g["en-GB"] = a.extend(!0, {}, g.en)), g["en-AU"] || (g["en-AU"] = a.extend(!0, {}, g.en)), g[""] = g[""] || g["en-US"], g.de = a.extend(!0, {
    typeMismatch: {
      defaultMessage: "{%value} ist in diesem Feld nicht zul\xe4ssig.",
      email: "{%value} ist keine g\xfcltige E-Mail-Adresse.",
      url: "{%value} ist kein(e) g\xfcltige(r) Webadresse/Pfad."
    },
    badInput: {
      defaultMessage: "Geben Sie einen zul\xe4ssigen Wert ein.",
      number: "Geben Sie eine Nummer ein.",
      date: "Geben Sie ein Datum ein.",
      time: "Geben Sie eine Uhrzeit ein.",
      month: "Geben Sie einen Monat mit Jahr ein.",
      range: "Geben Sie eine Nummer.",
      "datetime-local": "Geben Sie ein Datum mit Uhrzeit ein."
    },
    rangeUnderflow: {
      defaultMessage: "{%value} ist zu niedrig. {%min} ist der unterste Wert, den Sie benutzen k\xf6nnen."
    },
    rangeOverflow: {
      defaultMessage: "{%value} ist zu hoch. {%max} ist der oberste Wert, den Sie benutzen k\xf6nnen."
    },
    stepMismatch: "Der Wert {%value} ist in diesem Feld nicht zul\xe4ssig. Hier sind nur bestimmte Werte zul\xe4ssig. {%title}",
    tooLong: "Der eingegebene Text ist zu lang! Sie haben {%valueLen} Zeichen eingegeben, dabei sind {%maxlength} das Maximum.",
    tooShort: "Der eingegebene Text ist zu kurz! Sie haben {%valueLen} Zeichen eingegeben, dabei sind {%minlength} das Minimum.",
    patternMismatch: "{%value} hat f\xfcr dieses Eingabefeld ein falsches Format. {%title}",
    valueMissing: {
      defaultMessage: "Bitte geben Sie einen Wert ein.",
      checkbox: "Bitte aktivieren Sie das K\xe4stchen."
    }
  }, g.de || {}), "object" == _typeof(g.de.valueMissing) && ["select", "radio"].forEach(function (a) {
    g.de.valueMissing[a] = g.de.valueMissing[a] || "Bitte w\xe4hlen Sie eine Option aus.";
  }), "object" == _typeof(g.de.rangeUnderflow) && ["date", "time", "datetime-local", "month"].forEach(function (a) {
    g.de.rangeUnderflow[a] = g.de.rangeUnderflow[a] || "{%value} ist zu fr\xfch. {%min} ist die fr\xfcheste Zeit, die Sie benutzen k\xf6nnen.";
  }), "object" == _typeof(g.de.rangeOverflow) && ["date", "time", "datetime-local", "month"].forEach(function (a) {
    g.de.rangeOverflow[a] = g.de.rangeOverflow[a] || "{%value} ist zu sp\xe4t. {%max} ist die sp\xe4teste Zeit, die Sie benutzen k\xf6nnen.";
  });

  var i = g[""],
      j = function j(b, c) {
    return b && "string" != typeof b && (b = b[a.prop(c, "type")] || b[(c.nodeName || "").toLowerCase()] || b.defaultMessage), b || "";
  },
      k = /</g,
      l = />/g,
      m = {
    value: 1,
    min: 1,
    max: 1
  },
      n = function () {
    var d,
        e = {
      number: function number(a) {
        var b = 1 * a;
        return b.toLocaleString && !isNaN(b) && (a = b.toLocaleString() || a), a;
      }
    },
        f = function f(b, c, d) {
      var f, g;
      return m[d] && (f = a.prop(c, "type"), g = a(c).getShadowElement().data("wsWidget" + f), g && g.formatValue ? b = g.formatValue(b, !1) : e[f] && (b = e[f](b))), b;
    };

    return [{
      n: "date",
      f: "toLocaleDateString"
    }, {
      n: "time",
      f: "toLocaleTimeString"
    }, {
      n: "datetime-local",
      f: "toLocaleString"
    }].forEach(function (a) {
      e[a.n] = function (b) {
        var c = new Date(b);
        return c && c[a.f] && (b = c[a.f]() || b), b;
      };
    }), c.Intl && Intl.DateTimeFormat && (d = new Intl.DateTimeFormat(navigator.browserLanguage || navigator.language, {
      year: "numeric",
      month: "2-digit"
    }).format(new Date()), d && d.format && (e.month = function (a) {
      var b = new Date(a);
      return b && (a = d.format(b) || a), a;
    })), b.format = {}, ["date", "number", "month", "time", "datetime-local"].forEach(function (a) {
      b.format[a] = function (c, d) {
        return d && d.nodeType ? f(c, d, a) : ("number" == a && d && d.toFixed && (c = 1 * c, (!d.fixOnlyFloat || c % 1) && (c = c.toFixed(d.toFixed))), b._format && b._format[a] ? b._format[a](c, d) : e[a](c));
      };
    }), f;
  }();

  b.replaceValidationplaceholder = function (c, d, e) {
    var f = a.prop(c, "title");
    return d && ("patternMismatch" != e || f || b.error("no title for patternMismatch provided. Always add a title attribute."), f && (f = '<span class="ws-titlevalue">' + f.replace(k, "&lt;").replace(l, "&gt;") + "</span>"), -1 != d.indexOf("{%title}") ? d = d.replace("{%title}", f) : f && (d = d + " " + f)), d && -1 != d.indexOf("{%") && ["value", "min", "max", "maxlength", "minlength", "label"].forEach(function (b) {
      if (-1 !== d.indexOf("{%" + b)) {
        var e = ("label" == b ? a.trim(a('label[for="' + c.id + '"]', c.form).text()).replace(/\*$|:$/, "") : a.prop(c, b) || a.attr(c, b) || "") || "";
        e = "" + e, e = n(e, c, b), d = d.replace("{%" + b + "}", e.replace(k, "&lt;").replace(l, "&gt;")), "value" == b && (d = d.replace("{%valueLen}", e.length));
      }
    }), d;
  }, b.createValidationMessage = function (c, d) {
    var e = j(i[d], c);
    return e || "badInput" != d || (e = j(i.typeMismatch, c)), e || "typeMismatch" != d || (e = j(i.badInput, c)), e || (e = j(g[""][d], c) || (a.prop(c, "validationMessage") || "").replace(k, "&lt;").replace(l, "&gt;"), "customError" != d && b.info("could not find errormessage for: " + d + " / " + a.prop(c, "type") + ". in language: " + b.activeLang())), e = b.replaceValidationplaceholder(c, e, d), e || "";
  }, (!b.support.formvalidation || b.bugs.bustedValidity) && h.push("validationMessage"), i = b.activeLang(g), a(g).on("change", function () {
    i = g.__active;
  }), h.forEach(function (c) {
    b.defineNodeNamesProperty(["fieldset", "output", "button"], c, {
      prop: {
        value: "",
        writeable: !1
      }
    }), ["input", "select", "textarea"].forEach(function (d) {
      var e = b.defineNodeNameProperty(d, c, {
        prop: {
          get: function get() {
            var c = this,
                d = "";
            if (!a.prop(c, "willValidate")) return d;
            var f = a.prop(c, "validity") || {
              valid: 1
            };
            return f.valid ? d : (d = b.getContentValidationMessage(c, f)) ? d : f.customError && c.nodeName && (d = b.support.formvalidation && !b.bugs.bustedValidity && e.prop._supget ? e.prop._supget.call(c) : b.data(c, "customvalidationMessage")) ? d : (a.each(f, function (a, e) {
              return "valid" != a && e ? (d = b.createValidationMessage(c, a), d ? !1 : void 0) : void 0;
            }), d || "");
          },
          writeable: !1
        }
      });
    });
  });
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
});