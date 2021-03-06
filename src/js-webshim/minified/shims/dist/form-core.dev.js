"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

webshims.register("form-core", function (a, b, c, d, e, f) {
  "use strict";

  b.capturingEventPrevented = function (b) {
    if (!b._isPolyfilled) {
      var c = b.isDefaultPrevented,
          d = b.preventDefault;
      b.preventDefault = function () {
        return clearTimeout(a.data(b.target, b.type + "DefaultPrevented")), a.data(b.target, b.type + "DefaultPrevented", setTimeout(function () {
          a.removeData(b.target, b.type + "DefaultPrevented");
        }, 30)), d.apply(this, arguments);
      }, b.isDefaultPrevented = function () {
        return !(!c.apply(this, arguments) && !a.data(b.target, b.type + "DefaultPrevented"));
      }, b._isPolyfilled = !0;
    }
  };

  var g = b.modules,
      h = b.support,
      i = function i(b) {
    return (a.prop(b, "validity") || {
      valid: 1
    }).valid;
  },
      j = function j() {
    var c = ["form-validation"];
    a(d).off(".lazyloadvalidation"), f.lazyCustomMessages && (f.customMessages = !0, c.push("form-message")), b._getAutoEnhance(f.customDatalist) && (f.fD = !0, c.push("form-datalist")), f.addValidators && c.push("form-validators"), b.reTest(c);
  },
      k = function k() {
    var c,
        e,
        g = a.expr[":"],
        j = /^(?:form|fieldset)$/i,
        k = function k(b) {
      var c = !1;
      return a(b).jProp("elements").each(function () {
        return !j.test(this.nodeName || "") && (c = g.invalid(this)) ? !1 : void 0;
      }), c;
    };

    if (a.extend(g, {
      "valid-element": function validElement(b) {
        return j.test(b.nodeName || "") ? !k(b) : !(!a.prop(b, "willValidate") || !i(b));
      },
      "invalid-element": function invalidElement(b) {
        return j.test(b.nodeName || "") ? k(b) : !(!a.prop(b, "willValidate") || i(b));
      },
      "required-element": function requiredElement(b) {
        return !(!a.prop(b, "willValidate") || !a.prop(b, "required"));
      },
      "user-error": function userError(b) {
        return a.prop(b, "willValidate") && a(b).getShadowElement().hasClass(f.iVal.errorClass || "user-error");
      },
      "optional-element": function optionalElement(b) {
        return !(!a.prop(b, "willValidate") || a.prop(b, "required") !== !1);
      }
    }), ["valid", "invalid", "required", "optional"].forEach(function (b) {
      g[b] = a.expr[":"][b + "-element"];
    }), h.fieldsetdisabled && !a('<fieldset disabled=""><input /><input /></fieldset>').find(":disabled").filter(":disabled").is(":disabled") && (c = a.find.matches, e = {
      ":disabled": 1,
      ":enabled": 1
    }, a.find.matches = function (a, b) {
      return e[a] ? c.call(this, "*" + a, b) : c.apply(this, arguments);
    }, a.extend(g, {
      enabled: function enabled(b) {
        return "disabled" in b && b.disabled === !1 && !a.find.matchesSelector(b, "fieldset[disabled] *");
      },
      disabled: function disabled(b) {
        return b.disabled === !0 || "disabled" in b && a.find.matchesSelector(b, "fieldset[disabled] *");
      }
    })), "unknown" == typeof d.activeElement) {
      var l = g.focus;

      g.focus = function () {
        try {
          return l.apply(this, arguments);
        } catch (a) {
          b.error(a);
        }

        return !1;
      };
    }
  },
      l = {
    noAutoCallback: !0,
    options: f
  },
      m = b.loader.addModule,
      n = function n(a, c, d) {
    j(), b.ready("form-validation", function () {
      a[c].apply(a, d);
    });
  },
      o = "transitionDelay" in d.documentElement.style ? "" : " no-transition",
      p = b.cfg.wspopover;

  m("form-validation", a.extend({
    d: ["form-message"]
  }, l)), m("form-validators", a.extend({}, l)), h.formvalidation && !b.bugs.bustedValidity && b.capturingEvents(["invalid"], !0), a.expr.filters ? k() : b.ready("sizzle", k), b.triggerInlineForm = function (b, c) {
    a(b).trigger(c);
  }, p.position || p.position === !1 || (p.position = {
    at: "left bottom",
    my: "left top",
    collision: "fit flip"
  }), b.wsPopover = {
    id: 0,
    _create: function _create() {
      this.options = a.extend(!0, {}, p, this.options), this.id = b.wsPopover.id++, this.eventns = ".wsoverlay" + this.id, this.timers = {}, this.element = a('<div class="ws-popover' + o + '" tabindex="-1"><div class="ws-po-outerbox"><div class="ws-po-arrow"><div class="ws-po-arrowbox" /></div><div class="ws-po-box" /></div></div>'), this.contentElement = a(".ws-po-box", this.element), this.lastElement = a([]), this.bindElement(), this.element.data("wspopover", this);
    },
    options: {},
    content: function content(a) {
      this.contentElement.html(a);
    },
    bindElement: function bindElement() {
      var a = this,
          b = function b() {
        a.stopBlur = !1;
      };

      this.preventBlur = function () {
        a.stopBlur = !0, clearTimeout(a.timers.stopBlur), a.timers.stopBlur = setTimeout(b, 9);
      }, this.element.on({
        mousedown: this.preventBlur
      });
    },
    show: function show() {
      n(this, "show", arguments);
    }
  }, b.validityAlert = {
    showFor: function showFor() {
      n(this, "showFor", arguments);
    }
  }, b.getContentValidationMessage = function (c, d, e) {
    var f;
    b.errorbox && b.errorbox.initIvalContentMessage && b.errorbox.initIvalContentMessage(c);
    var g = (b.getOptions && b.errorbox ? b.getOptions(c, "errormessage", !1, !0) : a(c).data("errormessage")) || c.getAttribute("x-moz-errormessage") || "";
    return e && g[e] ? g = g[e] : g && (d = d || a.prop(c, "validity") || {
      valid: 1
    }, d.valid && (g = "")), "object" == _typeof(g) && (d = d || a.prop(c, "validity") || {
      valid: 1
    }, d.customError && (f = a.data(c, "customMismatchedRule")) && g[f] && "string" == typeof g[f] ? g = g[f] : d.valid || (a.each(d, function (a, b) {
      return b && "valid" != a && g[a] ? (g = g[a], !1) : void 0;
    }), "object" == _typeof(g) && (d.typeMismatch && g.badInput && (g = g.badInput), d.badInput && g.typeMismatch && (g = g.typeMismatch)))), "object" == _typeof(g) && (g = g.defaultMessage), b.replaceValidationplaceholder && (g = b.replaceValidationplaceholder(c, g)), g || "";
  }, b.refreshCustomValidityRules = a.noop, a.fn.getErrorMessage = function (c) {
    var d = "",
        e = this[0];
    return e && (d = b.getContentValidationMessage(e, !1, c) || a.prop(e, "customValidationMessage") || a.prop(e, "validationMessage") || ""), d;
  }, a.event.special.valuevalidation = {
    setup: function setup() {
      b.error("valuevalidation was renamed to validatevalue!");
    }
  }, a.event.special.validatevalue = {
    setup: function setup() {
      var b = a(this).data() || a.data(this, {});
      "validatevalue" in b || (b.validatevalue = !0);
    }
  }, a(d).on("focusin.lazyloadvalidation mousedown.lazyloadvalidation touchstart.lazyloadvalidation", function (a) {
    "form" in a.target && j();
  }), b.ready("WINDOWLOAD", j), g["form-number-date-ui"].loaded && !f.customMessages && (g["form-number-date-api"].test() || h.inputtypes.range && h.inputtypes.color) && b.isReady("form-number-date-ui", !0), b.ready("DOM", function () {
    d.querySelector(".ws-custom-file") && b.reTest(["form-validation"]);
  }), f.addValidators && f.fastValidators && b.reTest(["form-validators", "form-validation"]), "complete" == d.readyState && b.isReady("WINDOWLOAD", !0);
});