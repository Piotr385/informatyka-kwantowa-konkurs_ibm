"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

webshims.register("form-validators", function (a, b, c, d, e, f) {
  "use strict";

  var g;
  b.ready("form-validation", function () {
    g = "." + f.iVal.errorClass + ", ." + f.iVal.successClass;
  }), function () {
    var c,
        e,
        f = {},
        h = !1,
        i = "input, select, textarea, fieldset[data-dependent-validation]",
        j = function j(a) {
      "refreshCustomValidityRules" == a.type && b.error("refreshCustomValidityRules event was renamed to updatecustomvalidity"), b.refreshCustomValidityRules(a.target);
    },
        k = function () {
      function b(b) {
        var c,
            d,
            e = {},
            f = function f() {
          var b, d;

          for (var f in e) {
            b = e[f].elem, b != c && e[f].val != (d = b.value) && (e[f].val = d, g && a.find.matchesSelector(b, g) ? a(b).trigger("updatevalidation.webshims") : m(b));
          }
        };

        return a(b).on("autocomplete change", function (a) {
          clearTimeout(d), c = a.target, d = setTimeout(f, 9);
        }), e;
      }

      function c(c, d, e) {
        var f = a.data(c, "autocompleteElements") || a.data(c, "autocompleteElements", b(c));
        f[e] = {
          elem: d,
          val: d.value
        };
      }

      function d(b, c) {
        var d = a.data(b, "autocompleteElements");
        d && d[c] && delete d[c];
      }

      return {
        add: function add(b) {
          var d, e;
          (d = b.id) && ("password" == b.type || (e = b.autocomplete) && "off" != e) && setTimeout(function () {
            var e = a.prop(b, "form");
            e && c(e, b, d);
          }, 9);
        },
        remove: function remove(b) {
          var c;
          (c = b.id) && setTimeout(function () {
            var e = a.prop(b, "form");
            e && d(e, c);
          }, 9);
        }
      };
    }(),
        l = function l() {
      return !l.types[this.type];
    };

    l.types = {
      hidden: 1,
      image: 1,
      button: 1,
      reset: 1,
      submit: 1
    }, b.customErrorMessages = {}, b.addCustomValidityRule = function () {
      var c,
          e = function e() {
        a(d.querySelectorAll(i)).filter(l).each(function () {
          m(this);
        });
      };

      return function (a, d, g) {
        f[a] = d, b.customErrorMessages[a] || (b.customErrorMessages[a] = [], b.customErrorMessages[a][""] = g || a), h && (clearTimeout(c), c = setTimeout(e));
      };
    }(), b.refreshCustomValidityRules = function (d) {
      if (e) {
        var g,
            h,
            i = a(d).data(),
            j = "",
            l = i && i.customMismatchedRule,
            m = i && a.prop(d, "validity") || {
          valid: 1
        };
        return i && (l || m.valid) && (g = a(d).val(), h = function h(e, f) {
          c = !0, e ? (i.customMismatchedRule = f, "string" != typeof e && (e = b.getContentValidationMessage(d, !1, f), e && "object" == _typeof(e) && (e = e[f]), e && "string" == typeof e || (e = b.customErrorMessages[f][b.activeLang()] || b.customErrorMessages[f][""] || e.customError || e.defaultMessage || "")), b.replaceValidationplaceholder && (e = b.replaceValidationplaceholder(d, e, f)), k.add(d)) : (e = "", i.customMismatchedRule = "", k.remove(d)), a(d).setCustomValidity(e), c = !1;
        }, a.each(f, function (a, b) {
          return j = b(d, g, i, h) || "", l = a, j ? !1 : void 0;
        }), i && i.dependentValidation && !i.dependentValidation._init && !i.dependentValidation.masterElement && f.dependent(d, g, i, a.noop), "async" == j || !j && m.valid || h(j, l)), j;
      }
    };
    var m = b.refreshCustomValidityRules;
    a("body").on("click", function (b) {
      if ("submit" == b.target.type && !b.isDefaultPrevented()) {
        var c, e, f, g;

        try {
          c = d.activeElement;
        } catch (h) {}

        if (!c || c == b.target) return;
        g = a(b.target).jProp("form").prop("elements") || [], c && "form" in c && a.prop(c, "willValidate") && a(c).trigger("updatevalidation.webshims");

        for (e = 0, f = g.length; f > e; e++) {
          a.data(g[e], "customMismatchedRule") && m(g[e]);
        }
      }
    }), b.ready("forms form-validation", function () {
      a.propHooks.setCustomValidity = {
        get: function get(b) {
          return c || a.data(b, "customMismatchedRule", ""), null;
        }
      }, setTimeout(function () {
        b.addReady(function (b, c) {
          e = !0, a(b.querySelectorAll(i)).add(c.filter(i)).filter(l).each(function () {
            m(this);
          }), h = !0;
        }), a(d).on("refreshCustomValidityRules updatecustomvalidity", j);
      }, 29);
    });
  }(), function () {
    var c = b.cfg.forms,
        h = b.addCustomValidityRule,
        i = function i(a, b) {
      return d.getElementById(b) || d.getElementsByName(b)[0];
    };

    h("partialPattern", function (a, b, c) {
      return c = c.partialPattern, b && c ? !new RegExp("(" + c + ")", "i").test(b) : void 0;
    }, "This format is not allowed here."), a("<input />").prop("minLength") !== e && "tooShort" in (a("<input />").prop("validity") || {}) || h("tooShort", function (a, c) {
      var d;
      if (c && c != a.defaultValue && (d = a.getAttribute("minlength"))) return d = parseInt(d, 10), d > 0 && d > c.length ? (b.validityMessages.__active || {}).tooShort || !0 : "";
    }, "Entered value is too short."), h("grouprequired", function (b, c, e) {
      var f, g;
      if ("grouprequired" in e && "checkbox" === b.type && (g = b.name)) return e.grouprequired.checkboxes || (e.grouprequired = {}, e.grouprequired.checkboxes = a((f = a.prop(b, "form")) && f[g] || d.getElementsByName(g)).filter('[type="checkbox"]'), e.grouprequired.checkboxes.off("click.groupRequired").on("click.groupRequired", function () {
        "grouprequired" == e.customMismatchedRule == this.checked && a(b).trigger("updatevalidation.webshims");
      }), e.grouprequired.checkboxes.not(b).removeData("grouprequired")), !e.grouprequired.checkboxes.filter(":checked:enabled")[0];
    }, "Please check one of these checkboxes."), h("luhn", function (a, c, d) {
      if (c && d && ("creditcard" in d || "luhn" in d)) {
        if ("creditcard" in d && b.error("data-creditcard was renamed to data-luhn!!!"), c = c.replace(/\-/g, ""), c != 1 * c) return !0;

        for (var e, f = c.length, g = 0, h = 1; f--;) {
          e = parseInt(c.charAt(f), 10) * h, g += e - 9 * (e > 9), h ^= 3;
        }

        return !(g % 10 === 0 && g > 0);
      }
    }, "Please enter a valid credit card number");

    var j = {
      prop: "value",
      "from-prop": "value",
      toggle: !1
    },
        k = function k(b) {
      return a(b.form[b.name]).filter('[type="radio"]');
    };

    b.ready("form-validation", function () {
      b.modules && (k = b.modules["form-core"].getGroupElements || k);
    }), h("dependent", function (c, e, f) {
      if (f = f.dependentValidation) {
        var h = function h(b) {
          var d = a.prop(f.masterElement, f["from-prop"]);
          f.specialVal && (d = -1 !== a.inArray(d, f.specialVal)), f.toggle && (d = !d), a.prop(c, f.prop, d), g && b && a(c).getShadowElement().filter(g).trigger("updatevalidation.webshims");
        };

        if (!f._init || !f.masterElement) {
          if ("string" == typeof f && (f = {
            from: f
          }), f.masterElement = d.getElementById(f.from) || d.getElementsByName(f.from || [])[0], f._init = !0, !f.masterElement || !f.masterElement.form) return;
          /radio|checkbox/i.test(f.masterElement.type) ? (f["from-prop"] || (f["from-prop"] = "checked"), f.prop || "checked" != f["from-prop"] || (f.prop = "disabled")) : f["from-prop"] || (f["from-prop"] = "value"), 0 === f["from-prop"].indexOf("value:") && (f.specialVal = f["from-prop"].replace("value:", "").split("||"), f["from-prop"] = "value"), f = a.data(c, "dependentValidation", a.extend({
            _init: !0
          }, j, f)), "value" !== f.prop || f.specialVal ? a("radio" === f.masterElement.type && k(f.masterElement) || f.masterElement).on("change", h) : a(f.masterElement).on("change", function () {
            b.refreshCustomValidityRules(c), g && a(c).getShadowElement().filter(g).trigger("updatevalidation.webshims");
          });
        }

        return "value" != f.prop || f.specialVal ? (h(), "") : a.prop(f.masterElement, "value") != e;
      }
    }, "The value of this field does not repeat the value of the other field"), h("validatevalue", function (b, c, d) {
      return "validatevalue" in d ? a(b).triggerHandler("validatevalue", [{
        value: c,
        valueAsDate: a.prop(b, "valueAsDate"),
        isPartial: !1
      }]) || "" : void 0;
    }, "This value is not allowed here"), h("ajaxvalidate", function (d, e, g) {
      if (e && g.ajaxvalidate) {
        var h;

        if (!g.remoteValidate) {
          "string" == typeof g.ajaxvalidate ? g.ajaxvalidate = {
            url: g.ajaxvalidate,
            depends: a([])
          } : g.ajaxvalidate.depends = g.ajaxvalidate.depends ? a("string" == typeof g.ajaxvalidate.depends && g.ajaxvalidate.depends.split(" ") || g.ajaxvalidate.depends).map(i) : a([]), g.ajaxvalidate.depends.on("change", function () {
            a.find.matchesSelector(this, ":valid") && b.refreshCustomValidityRules(d);
          }), h = g.ajaxvalidate;
          var j = {
            ajaxLoading: !1,
            restartAjax: !1,
            message: "async",
            cache: {},
            update: function update(b) {
              this.ajaxLoading ? this.restartAjax = b : (this.restartAjax = !1, this.ajaxLoading = !0, a.ajax(a.extend({
                dataType: "json"
              }, h, {
                url: h.url,
                depData: b,
                data: c.fullRemoteForm || h.fullForm ? a(d).jProp("form").serializeArray() : b,
                success: this.getResponse,
                complete: this._complete,
                timeout: 3e3
              })));
            },
            _complete: function _complete() {
              j.ajaxLoading = !1, j.restartAjax && this.update(j.restartAjax), j.restartAjax = !1;
            },
            getResponse: function getResponse(b) {
              if (f.transformAjaxValidate && (b = f.transformAjaxValidate(b)), b) {
                if ("string" == typeof b) try {
                  b = JSON.parse(b);
                } catch (c) {}
              } else b = {
                message: "",
                valid: !0
              };

              j.message = "message" in b ? b.message : !b.valid, j.lastMessage = j.message, j.blockUpdate = !0, a(d).triggerHandler("updatevalidation.webshims"), j.message = "async", j.blockUpdate = !1;
            },
            getData: function getData() {
              var b;
              return b = {}, b[a.prop(d, "name") || a.prop(d, "id")] = a(d).val(), h.depends.each(function () {
                return a.find.matchesSelector(this, ":invalid") ? (b = !1, !1) : void (b[a.prop(this, "name") || a.prop(this, "id")] = a(this).val());
              }), b;
            },
            getTempMessage: function getTempMessage() {
              var a,
                  b,
                  c = "async";
              if (g.remoteValidate.blockUpdate) c = j.message;else if (a = this.getData()) {
                try {
                  b = JSON.stringify(a);
                } catch (d) {}

                b === this.lastString ? c = this.ajaxLoading ? "async" : this.lastMessage : (this.lastString = b, this.lastMessage = "async", clearTimeout(g.remoteValidate.timer), g.remoteValidate.timer = setTimeout(function () {
                  g.remoteValidate.update(a);
                }, 9));
              } else c = "";
              return c;
            }
          };
          g.remoteValidate = j;
        }

        return g.remoteValidate.getTempMessage();
      }
    }, "remote error");
  }();
});