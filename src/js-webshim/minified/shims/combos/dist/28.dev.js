"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

webshims.register("form-shim-extend", function (a, b, c, d, e, f) {
  "use strict";

  b.inputTypes = b.inputTypes || {};

  var g = b.cfg.forms,
      h = b.bugs,
      i = /\s*,\s*/g,
      j = b.inputTypes,
      k = {
    radio: 1,
    checkbox: 1
  },
      l = function l() {
    var a = this,
        c = (a.getAttribute("type") || "").toLowerCase();
    return b.inputTypes[c] ? c : a.type;
  },
      m = function m(a, b) {
    "type" in a || (a.type = l.call(b));
  };

  !function () {
    if ("querySelector" in d) {
      try {
        h.findRequired = !a('<form action="#" style="width: 1px; height: 1px; overflow: hidden;"><select name="b" required="" /></form>')[0].querySelector("select:required");
      } catch (b) {
        h.findRequired = !1;
      }

      (h.bustedValidity || h.findRequired) && !function () {
        var b = a.find,
            c = a.find.matchesSelector,
            d = /(\:valid|\:invalid|\:optional|\:required)(?=[\s\[\~\.\+\>\:\#*]|$)/gi,
            e = function e(a) {
          return a + "-element";
        };

        a.find = function () {
          var a = Array.prototype.slice,
              c = function c(_c) {
            var f = arguments;
            return f = a.call(f, 1, f.length), f.unshift(_c.replace(d, e)), b.apply(this, f);
          };

          for (var f in b) {
            b.hasOwnProperty(f) && (c[f] = b[f]);
          }

          return c;
        }(), a.find.matchesSelector = function (a, b) {
          return b = b.replace(d, e), c.call(this, a, b);
        };
      }();
    }
  }(), b.addInputType = function (a, b) {
    j[a] = b;
  };

  var n = {
    customError: !1,
    typeMismatch: !1,
    badInput: !1,
    rangeUnderflow: !1,
    rangeOverflow: !1,
    stepMismatch: !1,
    tooLong: !1,
    tooShort: !1,
    patternMismatch: !1,
    valueMissing: !1,
    valid: !0
  },
      o = function o(b) {
    if ("select-one" == b.type && b.size < 2) {
      var c = a("> option:first-child", b);
      return !!c.prop("selected");
    }

    return !1;
  },
      p = a([]),
      q = function q(b) {
    b = a(b);
    var c,
        e,
        f = p;
    return "radio" == b[0].type && (c = b[0].name, c ? (e = b.prop("form"), f = a(d.getElementsByName(c)).filter(function () {
      return "radio" == this.type && a.prop(this, "form") == e && this.name == c;
    })) : f = b), f;
  },
      r = {
    url: 1,
    email: 1,
    text: 1,
    search: 1,
    tel: 1,
    password: 1
  },
      s = a.extend({
    textarea: 1
  }, r),
      t = {
    valueMissing: function valueMissing(a, b, c) {
      if (!a.prop("required")) return !1;
      var d = !1;
      return m(c, a[0]), d = "select" == c.nodeName ? !b && (a[0].selectedIndex < 0 || o(a[0])) : k[c.type] ? "checkbox" == c.type ? !a.is(":checked") : !q(a).filter(":checked")[0] : !b;
    },
    patternMismatch: function patternMismatch(a, c, d) {
      var e,
          f = !1;
      if ("" === c || "select" == d.nodeName) return f;
      if (m(d, a[0]), !r[d.type]) return f;
      var g = a.attr("pattern");
      if (!g) return f;

      try {
        g = new RegExp("^(?:" + g + ")$");
      } catch (h) {
        b.error('invalid pattern value: "' + g + '" | ' + h), g = f;
      }

      if (!g) return f;

      for (c = "email" == d.type && a.prop("multiple") ? c.split(i) : [c], e = 0; e < c.length; e++) {
        if (!g.test(c[e])) {
          f = !0;
          break;
        }
      }

      return f;
    }
  };

  a.each({
    tooShort: ["minLength", -1],
    tooLong: ["maxLength", 1]
  }, function (a, b) {
    t[a] = function (a, c, d) {
      if (!c || "select" == d.nodeName || a.prop("defaultValue") == c) return !1;
      if (m(d, a[0]), !s[d.type]) return !1;
      var e = a.prop(b[0]);
      return e > 0 && e * b[1] < c.length * b[1];
    };
  }), a.each({
    typeMismatch: "mismatch",
    badInput: "bad"
  }, function (a, b) {
    t[a] = function (c, d, e) {
      if ("" === d || "select" == e.nodeName) return !1;
      var f = !1;
      return m(e, c[0]), j[e.type] && j[e.type][b] ? f = j[e.type][b](d, c) : "validity" in c[0] && "name" in c[0].validity && (f = c[0].validity[a] || !1), f;
    };
  }), b.modules["form-core"].getGroupElements = q, b.addValidityRule = function (a, b) {
    t[a] = b;
  }, a.event.special.invalid = {
    add: function add() {
      a.event.special.invalid.setup.call(this.form || this);
    },
    setup: function setup() {
      var c = this.form || this;
      return a.data(c, "invalidEventShim") ? void (c = null) : (a(c).data("invalidEventShim", !0).on("submit", a.event.special.invalid.handler), b.moveToFirstEvent(c, "submit"), b.bugs.bustedValidity && a.nodeName(c, "form") && !function () {
        var a = c.getAttribute("novalidate");
        c.setAttribute("novalidate", "novalidate"), b.data(c, "bustedNoValidate", null == a ? null : a);
      }(), void (c = null));
    },
    teardown: a.noop,
    handler: function handler(b) {
      if ("submit" == b.type && !b.testedValidity && b.originalEvent && a.nodeName(b.target, "form") && !a.prop(b.target, "noValidate")) {
        b.testedValidity = !0;
        var c = !a(b.target).callProp("reportValidity");
        return c ? (b.stopImmediatePropagation(), f.noFormInvalid || a(b.target).trigger("invalid"), !1) : void 0;
      }
    }
  }, a.event.special.submit = a.event.special.submit || {
    setup: function setup() {
      return !1;
    }
  };
  var u = a.event.special.submit.setup;
  a.extend(a.event.special.submit, {
    setup: function setup() {
      return a.nodeName(this, "form") ? a(this).on("invalid", a.noop) : a("form", this).on("invalid", a.noop), u.apply(this, arguments);
    }
  }), b.ready("form-shim-extend2 WINDOWLOAD", function () {
    a(c).on("invalid", a.noop);
  }), b.addInputType("email", {
    mismatch: function () {
      var a = g.emailReg || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      return function (b, c) {
        var d,
            e = !1;
        if (b) for (b = c.prop("multiple") ? b.split(i) : [b], d = 0; d < b.length; d++) {
          if (!a.test(b[d])) {
            e = !0;
            break;
          }
        }
        return e;
      };
    }()
  }), b.addInputType("url", {
    mismatch: function () {
      var a = g.urlReg || /^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
      return function (b) {
        return b && !a.test(b);
      };
    }()
  }), b.defineNodeNameProperty("input", "type", {
    prop: {
      get: l
    }
  }), b.defineNodeNamesProperties(["button", "fieldset", "output"], {
    checkValidity: {
      value: function value() {
        return !0;
      }
    },
    reportValidity: {
      value: function value() {
        return !0;
      }
    },
    willValidate: {
      value: !1
    },
    setCustomValidity: {
      value: a.noop
    },
    validity: {
      writeable: !1,
      get: function get() {
        return a.extend({}, n);
      }
    }
  }, "prop");

  var v = function v(c, d) {
    var e,
        f = a.prop(c, "validity");
    if (!f) return !0;

    if (a.data(c, "cachedValidity", f), !f.valid) {
      e = a.Event("invalid");
      var g = a(c).trigger(e);
      "reportValidity" != d || v.unhandledInvalids || e.isDefaultPrevented() || (b.validityAlert.showFor(g), v.unhandledInvalids = !0);
    }

    return a.removeData(c, "cachedValidity"), f.valid;
  },
      w = /^(?:select|textarea|input)/i;

  ["checkValidity", "reportValidity"].forEach(function (c) {
    b.defineNodeNameProperty("form", c, {
      prop: {
        value: function value() {
          var d = !0,
              e = a(a.prop(this, "elements")).filter(function () {
            if (!w.test(this.nodeName)) return !1;
            var a = b.data(this, "shadowData");
            return !a || !a.nativeElement || a.nativeElement === this;
          });
          v.unhandledInvalids = !1;

          for (var f = 0, g = e.length; g > f; f++) {
            v(e[f], c) || (d = !1);
          }

          return d;
        }
      }
    });
  }), ["input", "textarea", "select"].forEach(function (c) {
    var d = {
      setCustomValidity: {
        value: function value(c) {
          a.removeData(this, "cachedValidity"), b.data(this, "customvalidationMessage", "" + c), h.bustedValidity && d.setCustomValidity.prop._supvalue && d.setCustomValidity.prop._supvalue.apply(this, arguments);
        }
      },
      willValidate: {
        writeable: !1,
        get: function () {
          var b = {
            button: 1,
            reset: 1,
            hidden: 1,
            image: 1
          };
          return function () {
            var c = a(this).getNativeElement()[0];
            return !(c.readOnly || b[c.type] || a.find.matchesSelector(c, ":disabled"));
          };
        }()
      },
      validity: {
        writeable: !1,
        get: function get() {
          var c = a(this).getNativeElement(),
              d = c[0],
              e = a.data(d, "cachedValidity");
          if (e) return e;
          if (e = a.extend({}, n), !a.prop(d, "willValidate") || "submit" == d.type) return e;
          var f = c.val(),
              g = {
            nodeName: d.nodeName.toLowerCase()
          };
          return e.customError = !!b.data(d, "customvalidationMessage"), e.customError && (e.valid = !1), a.each(t, function (a, b) {
            b(c, f, g) && (e[a] = !0, e.valid = !1);
          }), a(this).getShadowFocusElement().attr("aria-invalid", e.valid ? "false" : "true"), c = null, d = null, e;
        }
      }
    };
    ["checkValidity", "reportValidity"].forEach(function (b) {
      d[b] = {
        value: function value() {
          return v.unhandledInvalids = !1, v(a(this).getNativeElement()[0], b);
        }
      };
    }), b.defineNodeNameProperties(c, d, "prop");
  }), b.defineNodeNamesBooleanProperty(["input", "textarea", "select"], "required", {
    set: function set(b) {
      a(this).getShadowFocusElement().attr("aria-required", !!b + "");
    },
    initAttr: !0
  }), b.defineNodeNamesBooleanProperty(["input"], "multiple"), h.bustedValidity && (b.defineNodeNameProperty("form", "novalidate", {
    attr: {
      set: function set(a) {
        b.data(this, "bustedNoValidate", "" + a);
      },
      get: function get() {
        var a = b.data(this, "bustedNoValidate");
        return null == a ? e : a;
      }
    },
    removeAttr: {
      value: function value() {
        b.data(this, "bustedNoValidate", null);
      }
    }
  }), a.each(["rangeUnderflow", "rangeOverflow", "stepMismatch"], function (a, b) {
    t[b] = function (a) {
      return (a[0].validity || {})[b] || !1;
    };
  })), b.defineNodeNameProperty("form", "noValidate", {
    prop: {
      set: function set(b) {
        b = !!b, b ? a.attr(this, "novalidate", "novalidate") : a(this).removeAttr("novalidate");
      },
      get: function get() {
        return null != a.attr(this, "novalidate");
      }
    }
  }), ["minlength", "minLength"].forEach(function (a) {
    b.defineNodeNamesProperty(["input", "textarea"], a, {
      prop: {
        set: function set(a) {
          if (a *= 1, 0 > a) throw "INDEX_SIZE_ERR";
          this.setAttribute("minlength", a || 0);
        },
        get: function get() {
          var a = this.getAttribute("minlength");
          return null == a ? -1 : 1 * a || 0;
        }
      }
    });
  }), b.support.inputtypes.date && /webkit/i.test(navigator.userAgent) && !function () {
    var b = {
      updateInput: 1,
      input: 1
    },
        c = {
      date: 1,
      time: 1,
      month: 1,
      week: 1,
      "datetime-local": 1
    },
        e = {
      focusout: 1,
      blur: 1
    },
        f = {
      updateInput: 1,
      change: 1
    },
        g = function g(a) {
      var c,
          d,
          g = !0,
          h = a.prop("value"),
          i = h,
          j = function j(c) {
        if (a) {
          var d = a.prop("value");
          d !== h && (h = d, c && b[c.type] || a.trigger("input")), c && f[c.type] && (i = d), g || d === i || a.trigger("change");
        }
      },
          k = function k() {
        clearTimeout(d), d = setTimeout(j, 9);
      },
          l = function l(b) {
        clearInterval(c), setTimeout(function () {
          b && e[b.type] && (g = !1), a && (a.off("focusout blur", l).off("input change updateInput", j), j()), a = null;
        }, 1);
      };

      clearInterval(c), c = setInterval(j, 160), k(), a.off({
        "focusout blur": l,
        "input change updateInput": j
      }).on({
        "focusout blur": l,
        "input updateInput change": j
      });
    };

    a(d).on("focusin", function (b) {
      b.target && c[b.target.type] && !b.target.readOnly && !b.target.disabled && g(a(b.target));
    });
  }(), b.addReady(function (b, c) {
    a("form", b).add(c.filter("form")).on("invalid", a.noop), setTimeout(function () {
      var c;

      try {
        "form" in (d.activeElement || {}) || (c = a(b.querySelector("input[autofocus], select[autofocus], textarea[autofocus]")).eq(0).getShadowFocusElement()[0], c && (c.offsetHeight || c.offsetWidth) && c.focus());
      } catch (e) {}
    }, 9);
  }), b.support.datalist || b.defineNodeNameProperty("datalist", "options", {
    prop: {
      writeable: !1,
      get: function get() {
        var c,
            d = this,
            e = a("select", d);
        return e[0] ? c = a.makeArray(e[0].options || []) : (c = d.getElementsByTagName("option"), c.length && b.warn("you should wrap your option-elements for a datalist in a select element to support IE and other old browsers.")), c;
      }
    }
  });
  var x = {
    submit: 1,
    button: 1,
    image: 1
  },
      y = {};
  [{
    name: "enctype",
    limitedTo: {
      "application/x-www-form-urlencoded": 1,
      "multipart/form-data": 1,
      "text/plain": 1
    },
    defaultProp: "application/x-www-form-urlencoded",
    proptype: "enum"
  }, {
    name: "method",
    limitedTo: {
      get: 1,
      post: 1
    },
    defaultProp: "get",
    proptype: "enum"
  }, {
    name: "action",
    proptype: "url"
  }, {
    name: "target"
  }, {
    name: "novalidate",
    propName: "noValidate",
    proptype: "boolean"
  }].forEach(function (b) {
    var c = "form" + (b.propName || b.name).replace(/^[a-z]/, function (a) {
      return a.toUpperCase();
    }),
        e = "form" + b.name,
        f = b.name,
        g = "click.webshimssubmittermutate" + f,
        h = function h() {
      var d = this;

      if ("form" in d && x[d.type]) {
        var g = a.prop(d, "form");

        if (g) {
          var h = a.attr(d, e);

          if (null != h && (!b.limitedTo || h.toLowerCase() === a.prop(d, c))) {
            var i = a.attr(g, f);
            a.attr(g, f, h), setTimeout(function () {
              if (null != i) a.attr(g, f, i);else try {
                a(g).removeAttr(f);
              } catch (b) {
                g.removeAttribute(f);
              }
            }, 9);
          }
        }
      }
    };

    switch (b.proptype) {
      case "url":
        var i = d.createElement("form");
        y[c] = {
          prop: {
            set: function set(b) {
              a.attr(this, e, b);
            },
            get: function get() {
              var b = a.attr(this, e);
              return null == b ? "" : (i.setAttribute("action", b), i.action);
            }
          }
        };
        break;

      case "boolean":
        y[c] = {
          prop: {
            set: function set(b) {
              b = !!b, b ? a.attr(this, "formnovalidate", "formnovalidate") : a(this).removeAttr("formnovalidate");
            },
            get: function get() {
              return null != a.attr(this, "formnovalidate");
            }
          }
        };
        break;

      case "enum":
        y[c] = {
          prop: {
            set: function set(b) {
              a.attr(this, e, b);
            },
            get: function get() {
              var c = a.attr(this, e);
              return !c || (c = c.toLowerCase()) && !b.limitedTo[c] ? b.defaultProp : c;
            }
          }
        };
        break;

      default:
        y[c] = {
          prop: {
            set: function set(b) {
              a.attr(this, e, b);
            },
            get: function get() {
              var b = a.attr(this, e);
              return null != b ? b : "";
            }
          }
        };
    }

    y[e] || (y[e] = {}), y[e].attr = {
      set: function set(b) {
        y[e].attr._supset.call(this, b), a(this).off(g).on(g, h);
      },
      get: function get() {
        return y[e].attr._supget.call(this);
      }
    }, y[e].initAttr = !0, y[e].removeAttr = {
      value: function value() {
        a(this).off(g), y[e].removeAttr._supvalue.call(this);
      }
    };
  }), b.defineNodeNamesProperties(["input", "button"], y);
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