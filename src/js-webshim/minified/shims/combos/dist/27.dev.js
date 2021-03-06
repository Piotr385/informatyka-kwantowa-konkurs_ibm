"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

webshims.register("form-shim-extend2", function (a, b, c, d, e, f) {
  "use strict";

  var g = function g(a) {
    return "number" == typeof a || a && a == 1 * a;
  },
      h = b.support,
      i = !("getSetAttribute" in a.support && !a.support.getSetAttribute),
      j = !("submitBubbles" in a.support) || a.support.submitBubbles,
      k = function k(b) {
    j || !b || "object" != _typeof(b) || b._submit_attached || (a.event.add(b, "submit._submit", function (a) {
      a._submit_bubble = !0;
    }), b._submit_attached = !0);
  };

  if (!j && a.event.special.submit && (a.event.special.submit.setup = function () {
    return a.nodeName(this, "form") ? !1 : void a.event.add(this, "click._submit keypress._submit", function (b) {
      var c = b.target,
          d = a.nodeName(c, "input") || a.nodeName(c, "button") ? a.prop(c, "form") : e;
      k(d);
    });
  }), b.reflectProperties(["input"], ["pattern"]), !("maxLength" in d.createElement("textarea"))) {
    var l = function () {
      var b,
          c = 0,
          d = a([]),
          e = 1e9,
          f = function f() {
        var a = d.prop("value"),
            b = a.length;
        b > c && b > e && (b = Math.max(c, e), d.prop("value", a.substr(0, b))), c = b;
      },
          g = function g() {
        clearTimeout(b), d.off(".maxlengthconstraint");
      };

      return function (h, i) {
        g(), i > -1 && (e = i, c = a.prop(h, "value").length, d = a(h), d.on({
          "keydown.maxlengthconstraint keypress.maxlengthconstraint paste.maxlengthconstraint cut.maxlengthconstraint": function keydownMaxlengthconstraintKeypressMaxlengthconstraintPasteMaxlengthconstraintCutMaxlengthconstraint() {
            setTimeout(f, 0);
          },
          "keyup.maxlengthconstraint": f,
          "blur.maxlengthconstraint": g
        }), b = setInterval(f, 200));
      };
    }();

    l.update = function (b, c) {
      a(b).is(":focus") && (c || (c = a.prop(b, "maxlength")), l(b, c));
    }, a(d).on("focusin", function (b) {
      var c;
      "TEXTAREA" == b.target.nodeName && (c = a.prop(b.target, "maxlength")) > -1 && l(b.target, c);
    }), b.defineNodeNameProperty("textarea", "maxlength", {
      attr: {
        set: function set(a) {
          this.setAttribute("maxlength", "" + a), l.update(this);
        },
        get: function get() {
          var a = this.getAttribute("maxlength");
          return null == a ? e : a;
        }
      },
      prop: {
        set: function set(a) {
          if (g(a)) {
            if (0 > a) throw "INDEX_SIZE_ERR";
            return a = parseInt(a, 10), this.setAttribute("maxlength", a), void l.update(this, a);
          }

          this.setAttribute("maxlength", "0"), l.update(this, 0);
        },
        get: function get() {
          var a = this.getAttribute("maxlength");
          return g(a) && a >= 0 ? parseInt(a, 10) : -1;
        }
      }
    }), b.defineNodeNameProperty("textarea", "maxLength", {
      prop: {
        set: function set(b) {
          a.prop(this, "maxlength", b);
        },
        get: function get() {
          return a.prop(this, "maxlength");
        }
      }
    });
  }

  i || null != a("<form novalidate></form>").attr("novalidate") || b.defineNodeNameProperty("form", "novalidate", {
    attr: {
      set: function set(a) {
        this.setAttribute("novalidate", "" + a);
      },
      get: function get() {
        var a = this.getAttribute("novalidate");
        return null == a ? e : a;
      }
    }
  }), h.fieldsetdisabled && h.fieldsetelements || !function () {
    if (!h.fieldsetdisabled) {
      var f = "isDisabled" in d.createElement("div"),
          g = {
        fieldset: 1,
        FIELDSET: 1
      },
          i = "input, textarea, select, button",
          j = function j(b) {
        return f && !b.isDisabled ? !1 : a.find.matchesSelector(b, "fieldset[disabled] *");
      },
          l = f ? function () {
        return this.isDisabled && a.find.matchesSelector(this, "fieldset[disabled] *");
      } : "fieldset[disabled] *",
          m = f ? function () {
        return !this.isDisabled && !a.find.matchesSelector(this, "fieldset[disabled] *");
      } : ":not(fieldset[disabled] *)";

      a.extend(a.expr[":"], {
        enabled: function enabled(a) {
          return g[a.nodeName] ? null == b.contentAttr(a, "disabled") && !j(a) : a.disabled === !1;
        },
        disabled: function disabled(a) {
          return g[a.nodeName] ? null != b.contentAttr(a, "disabled") || j(a) : a.disabled === !0;
        }
      });
      var n = {
        disable: function disable() {
          this.disabled || (b.data(this, "groupedisabled", !0), this.disabled = !0);
        },
        enable: function enable() {
          this.disabled && b.data(this, "groupedisabled") && (b.data(this, "groupedisabled", !1), this.disabled = !1);
        }
      };
      a(c).on("unload", function () {
        a(i).each(n.enable);
      }), b.defineNodeNamesBooleanProperty(["fieldset"], "disabled", {
        set: function set(b) {
          if (b = !!b) a(this.querySelectorAll(i)).each(n.disable);else if (!j(this)) {
            var c = a(this.querySelectorAll(i));
            this.querySelector("fieldset[disabled]") && (c = c.filter(m)), c.each(n.enable);
          }
        },
        initAttr: !0,
        useContentAttribute: !0
      }), ["input", "textarea", "select", "button"].forEach(function (a) {
        var c = b.defineNodeNameProperty(a, "disabled", {
          prop: {
            set: function set(a) {
              a ? (b.data(this, "groupedisabled", !1), c.prop._supset.call(this, a)) : j(this) ? (b.data(this, "groupedisabled", !0), c.prop._supset.call(this, !0)) : (b.data(this, "groupedisabled", !1), c.prop._supset.call(this, a));
            },
            get: function get() {
              var a = c.prop._supget.call(this);

              return a ? !b.data(this, "groupedisabled") : a;
            }
          },
          removeAttr: {
            value: function value() {
              c.prop.set.call(this, !1);
            }
          }
        });
      }), b.addReady(function (b) {
        a(b).filter(l).find(i).each(n.disable);
      });
    }

    !function (b, c) {
      var e = {
        form: 1,
        FORM: 1
      };

      a.prop = function (f, g, h) {
        var i;
        return f && 1 == f.nodeType && h === c && e[f.nodeName] && f.id && (i = d.getElementsByName(g), i && i.length || (i = d.getElementById(g)), i && (i = a(i).filter(function () {
          return a.prop(this, "form") == f;
        }).get(), i.length)) ? 1 == i.length ? i[0] : i : b.apply(this, arguments);
      };
    }(a.prop, e);

    var o = function o(b) {
      var c = a.data(b, "webshimsAddedElements");
      c && (c.remove(), a.removeData(b, "webshimsAddedElements"));
    },
        p = function p() {
      var c = b.contentAttr(this, "form");
      return c && (c = d.getElementById(c), c && !a.nodeName(c, "form") && (c = null)), c || this.form;
    };

    if (b.defineNodeNamesProperty(["input", "textarea", "select", "button", "fieldset"], "form", {
      prop: {
        get: p,
        writeable: !1
      }
    }), b.defineNodeNamesProperty(["form"], "elements", {
      prop: {
        get: function get() {
          var b,
              c,
              e,
              f,
              g,
              h,
              i = this.id,
              j = [];
          if (i && (e = a.data(this, "webshimsAddedElements"), e && e.detach()), f = this.elements, this.querySelector("input[form], select[form], textarea[form]")) for (g = 0, h = f.length; h > g; g++) {
            p.call(f[g]) == this && j.push(f[g]);
          } else j = a.makeArray(f);
          return i && (b = 'input[form="' + i + '"], select[form="' + i + '"], textarea[form="' + i + '"], button[form="' + i + '"], fieldset[form="' + i + '"]', c = d.querySelectorAll(b) || [], c.length && (j = a(j).add(c).get()), e && e.appendTo(this)), j;
        },
        writeable: !1
      }
    }), a(function () {
      var c = function c(a) {
        a.stopPropagation();
      },
          e = {
        image: 1,
        submit: 1
      };

      a(d).on("submit", function (b) {
        if (!b.isDefaultPrevented()) {
          var c,
              e = b.target,
              f = e.id;
          f && (o(e), c = d.querySelectorAll('input[form="' + f + '"], select[form="' + f + '"], textarea[form="' + f + '"]'), c = a(c).filter(function () {
            return !this.disabled && this.name && this.form != e;
          }).clone(), c.length && (a.data(e, "webshimsAddedElements", a('<div class="webshims-visual-hide" />').append(c).appendTo(e)), setTimeout(function () {
            o(e);
          }, 9)), c = null);
        }
      }), a(d).on("click", function (d) {
        if (e[d.target.type] && !d.isDefaultPrevented() && b.contentAttr(d.target, "form")) {
          var f,
              g = a.prop(d.target, "form"),
              h = d.target.form;
          g && g != h && (f = a(d.target).clone().removeAttr("form").addClass("webshims-visual-hide").on("click", c).appendTo(g), h && d.preventDefault(), k(g), f.trigger("click"), setTimeout(function () {
            f.remove(), f = null;
          }, 9));
        }
      });
    }), !a.fn.finish && parseFloat(a.fn.jquery, 10) < 1.9) {
      var q = /\r?\n/g,
          r = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
          s = /^(?:select|textarea)/i;

      a.fn.serializeArray = function () {
        return this.map(function () {
          var b = a.prop(this, "elements");
          return b ? a.makeArray(b) : this;
        }).filter(function () {
          return this.name && !a(this).is(":disabled") && (this.checked || s.test(this.nodeName) || r.test(this.type));
        }).map(function (b, c) {
          var d = a(this).val();
          return null == d ? null : a.isArray(d) ? a.map(d, function (a) {
            return {
              name: c.name,
              value: a.replace(q, "\r\n")
            };
          }) : {
            name: c.name,
            value: d.replace(q, "\r\n")
          };
        }).get();
      };
    }

    h.fieldsetelements || b.defineNodeNamesProperty(["fieldset"], "elements", {
      prop: {
        get: function get() {
          return this.querySelectorAll("input, select, textarea, button, fieldset") || [];
        },
        writeable: !1
      }
    });
  }(), null == a("<input />").prop("labels") && b.defineNodeNamesProperty("button, input, keygen, meter, output, progress, select, textarea", "labels", {
    prop: {
      get: function get() {
        if ("hidden" == this.type) return null;
        var b = this.id,
            c = a(this).closest("label").filter(function () {
          var a = this.attributes["for"] || {};
          return !a.specified || a.value == b;
        });
        return b && (c = c.add(d.querySelectorAll('label[for="' + b + '"]'))), c.get();
      },
      writeable: !1
    }
  }), "value" in d.createElement("progress") || !function () {
    var c = parseInt("NaN", 10),
        d = function d(b) {
      var c = a.prop(b, "position");
      a.attr(b, "data-position", c), a("> span", b).css({
        width: (0 > c ? 100 : 100 * c) + "%"
      });
    },
        e = {
      position: {
        prop: {
          get: function get() {
            var b,
                e = this.getAttribute("value"),
                f = -1;
            return e = e ? 1 * e : c, isNaN(e) ? d.isInChange && a(this).removeAttr("aria-valuenow").addClass("ws-indeterminate") : (b = a.prop(this, "max"), f = Math.max(Math.min(e / b, 1), 0), d.isInChange && (a.attr(this, "aria-valuenow", 100 * f), "max" == d.isInChange && a.attr(this, "aria-valuemax", b)), a(this).removeClass("ws-indeterminate")), f;
          },
          writeable: !1
        }
      }
    };

    a.each({
      value: 0,
      max: 1
    }, function (c, f) {
      var g = "value" == c && !a.fn.finish;
      e[c] = {
        attr: {
          set: function set(a) {
            var b = e[c].attr._supset.call(this, a);

            return d.isInChange = c, d(this), d.isInChange = !1, b;
          }
        },
        removeAttr: {
          value: function value() {
            if (this.removeAttribute(c), g) try {
              delete this.value;
            } catch (a) {}
            d.isInChange = c, d(this), d.isInChange = !1;
          }
        },
        prop: {
          get: function get() {
            var b = 1 * e[c].attr.get.call(this);
            return 0 > b || isNaN(b) ? b = f : "value" == c ? b = Math.min(b, a.prop(this, "max")) : 0 === b && (b = f), b;
          },
          set: function set(a) {
            return a = 1 * a, isNaN(a) && b.error("Floating-point value is not finite."), e[c].attr.set.call(this, a);
          }
        }
      };
    }), b.createElement("progress", function () {
      var c = a(this).attr({
        role: "progressbar",
        "aria-valuemin": "0"
      }).html('<span class="progress-value" />').jProp("labels").map(function () {
        return b.getID(this);
      }).get();
      c.length ? a.attr(this, "aria-labelledby", c.join(" ")) : b.info("you should use label elements for your prgogress elements"), a(this).addClass("ws-style"), "rtl" == a(this).css("direction") && a(this).addClass("ws-is-rtl"), d.isInChange = "max", d(this), d.isInChange = !1;
    }, e);
  }(), "setSelectionRange" in d.createElement("input") || !function () {
    var c = function c(b, _c) {
      var e,
          f,
          g,
          h,
          i,
          j,
          k = 0,
          l = 0;
      return d.selection && (e = d.selection.createRange()) && e.parentElement() == b && (f = a.prop(b, "value"), i = f.length, g = f.replace(/\r\n/g, "\n"), h = b.createTextRange(), h.moveToBookmark(e.getBookmark()), j = b.createTextRange(), j.collapse(!1), h.compareEndPoints("StartToEnd", j) > -1 ? k = l = i : _c ? (k = -h.moveStart("character", -i), k += g.slice(0, k).split("\n").length - 1) : h.compareEndPoints("EndToEnd", j) > -1 ? l = i : (l = -h.moveEnd("character", -i), l += g.slice(0, l).split("\n").length - 1)), {
        start: k,
        end: l
      };
    };

    ["input", "textarea"].forEach(function (d) {
      var e = "textarea" == d,
          f = {
        text: 1,
        search: 1,
        url: 1,
        tel: 1,
        password: 1,
        email: 1
      },
          g = "InvalidStateError: An attempt was made to use an object that is not, or is no longer, usable. selection not allowed on this type";
      b.defineNodeNameProperties(d, {
        selectionStart: {
          get: function get() {
            return e || f[a.prop(this, "type")] ? c(this, !0).start : void b.error(g);
          },
          set: function set(c) {
            if (this.createTextRange && (e || f[a.prop(this, "type")])) {
              var d = this.createTextRange();
              d.collapse(!0), d.moveStart("character", c), d.moveEnd("character", a.prop(this, "selectionEnd")), a(this).is(":focus") && d.select();
            } else b.error(g);
          }
        },
        selectionEnd: {
          get: function get() {
            return e || f[a.prop(this, "type")] ? c(this).end : void b.error(g);
          },
          set: function set(d) {
            if (this.createTextRange && (e || f[a.prop(this, "type")])) {
              var h,
                  i = this.createTextRange();
              i.collapse(!0), h = c(this, !0).start, i.moveStart("character", h), i.moveEnd("character", d - h), a(this).is(":focus") && i.select();
            } else b.error(g);
          }
        },
        setSelectionRange: {
          value: function value(c, d) {
            if (this.createTextRange && (e || f[a.prop(this, "type")])) {
              var h = this.createTextRange();
              h.collapse(!0), h.moveStart("character", c), h.moveEnd("character", d - c), a(this).is(":focus") && h.select();
            } else b.error(g);
          }
        }
      }, "prop");
    });
  }(), function () {
    if (!f.noPlaceholderPolyfill) {
      var d;
      if (h.textareaPlaceholder = !!("placeholder" in a("<textarea />")[0]), h.placeholder = !!("placeholder" in a("<input />")[0]), h.placeholder && f.overridePlaceholder && (d = !0), h.placeholder && h.textareaPlaceholder && !d) return void function () {
        var b = navigator.userAgent;
        -1 != b.indexOf("Mobile") && -1 != b.indexOf("Safari") && a(c).on("orientationchange", function () {
          var b,
              c = function c(a, b) {
            return b;
          },
              d = function d() {
            a("input[placeholder], textarea[placeholder]").attr("placeholder", c);
          };

          return function () {
            clearTimeout(b), b = setTimeout(d, 9);
          };
        }());
      }();
      var e = "over" == b.cfg.forms.placeholderType,
          g = b.cfg.forms.responsivePlaceholder,
          i = ["textarea"];
      (!h.placeholder || d) && i.push("input");

      var j = function j(b) {
        try {
          return a(b).setSelectionRange(0, 0), !0;
        } catch (c) {}
      },
          k = function k(b, c, d, f) {
        if (d === !1 && (d = a.prop(b, "value")), e || "password" == b.type) {
          if (!d && f) return void a(b).off(".placeholderremove").on({
            "keydown.placeholderremove keypress.placeholderremove paste.placeholderremove input.placeholderremove": function keydownPlaceholderremoveKeypressPlaceholderremovePastePlaceholderremoveInputPlaceholderremove(d) {
              (!d || 17 != d.keyCode && 16 != d.keyCode) && (c.box.removeClass("placeholder-visible"), a(b).off(".placeholderremove"));
            },
            "blur.placeholderremove": function blurPlaceholderremove() {
              a(b).off(".placeholderremove");
            }
          });
        } else {
          if (!d && f && j(b)) {
            var g = setTimeout(function () {
              j(b);
            }, 9);
            return void a(b).off(".placeholderremove").on({
              "keydown.placeholderremove keypress.placeholderremove paste.placeholderremove input.placeholderremove": function keydownPlaceholderremoveKeypressPlaceholderremovePastePlaceholderremoveInputPlaceholderremove(d) {
                (!d || 17 != d.keyCode && 16 != d.keyCode) && (b.value = a.prop(b, "value"), c.box.removeClass("placeholder-visible"), clearTimeout(g), a(b).off(".placeholderremove"));
              },
              "mousedown.placeholderremove drag.placeholderremove select.placeholderremove": function mousedownPlaceholderremoveDragPlaceholderremoveSelectPlaceholderremove() {
                j(b), clearTimeout(g), g = setTimeout(function () {
                  j(b);
                }, 9);
              },
              "blur.placeholderremove": function blurPlaceholderremove() {
                clearTimeout(g), a(b).off(".placeholderremove");
              }
            });
          }

          f || d || !b.value || (b.value = d);
        }

        c.box.removeClass("placeholder-visible");
      },
          l = function l(b, c, d) {
        d === !1 && (d = a.prop(b, "placeholder")), e || "password" == b.type || (b.value = d), c.box.addClass("placeholder-visible");
      },
          m = function m(b, c, d, f, g) {
        if (f || (f = a.data(b, "placeHolder"))) {
          var h = a(b).hasClass("placeholder-visible");
          return d === !1 && (d = a.attr(b, "placeholder") || ""), a(b).off(".placeholderremove"), c === !1 && (c = a.prop(b, "value")), c || "focus" != g && (g || !a(b).is(":focus")) ? c ? void k(b, f, c) : void (d && !c ? l(b, f, d) : k(b, f, c)) : void (("password" == b.type || e || h) && k(b, f, "", !0));
        }
      },
          n = function n() {
        return a('<span class="placeholder-text"></span>');
      },
          o = function () {
        var d = {
          text: 1,
          search: 1,
          url: 1,
          email: 1,
          password: 1,
          tel: 1,
          number: 1
        };
        return b.modules["form-number-date-ui"].loaded && delete d.number, {
          create: function create(b) {
            var d,
                f = a.data(b, "placeHolder");
            if (f) return f;
            if (f = a.data(b, "placeHolder", {}), a(b).on("focus.placeholder blur.placeholder", function (a) {
              m(this, !1, !1, f, a.type), f.box["focus" == a.type ? "addClass" : "removeClass"]("placeholder-focused");
            }), (d = a.prop(b, "form")) && a(b).onWSOff("reset.placeholder", function (a) {
              setTimeout(function () {
                m(b, !1, !1, f, a.type);
              }, 0);
            }, !1, d), "password" == b.type || e) f.text = n(b), g || a(b).hasClass("responsive-width") || -1 != (b.currentStyle || {
              width: ""
            }).width.indexOf("%") ? f.box = f.text : (f.box = a('<span class="placeholder-box placeholder-box-' + (b.nodeName || "").toLowerCase() + " placeholder-box-" + a.css(b, "float") + '" />').insertAfter(b), f.box.append(b)), f.text.insertAfter(b).on("mousedown.placeholder", function () {
              m(this, !1, !1, f, "focus");

              try {
                setTimeout(function () {
                  b.focus();
                }, 0);
              } catch (a) {}

              return !1;
            }), a.each(["lineHeight", "fontSize", "fontFamily", "fontWeight"], function (c, d) {
              var e = a.css(b, d);
              f.text.css(d) != e && f.text.css(d, e);
            }), a.each(["Left", "Top"], function (c, d) {
              var e = (parseInt(a.css(b, "padding" + d), 10) || 0) + Math.max(parseInt(a.css(b, "margin" + d), 10) || 0, 0) + (parseInt(a.css(b, "border" + d + "Width"), 10) || 0);
              f.text.css("padding" + d, e);
            }), a(b).onWSOff("updateshadowdom", function () {
              var c,
                  d,
                  e,
                  g = a(b),
                  h = {};
              return function () {
                var a, i;
                (a = b.offsetWidth) && (i = function i() {
                  var b = g.position();
                  a !== c && (c = a, f.text[0].style.width = a + "px"), (b.top !== h.top || b.left !== h.left) && (h = b, f.text[0].style.top = b.top + "px", f.text[0].style.left = b.left + "px");
                }, d ? (clearTimeout(e), e = setTimeout(i, 99)) : (i(), d = !0));
              };
            }(), !0);else {
              var h = function h(c) {
                a(b).hasClass("placeholder-visible") && (k(b, f, ""), setTimeout(function () {
                  (!c || "submit" != c.type || c.isDefaultPrevented()) && m(b, !1, !1, f);
                }, 9));
              };

              a(b).onWSOff("beforeunload", h, !1, c), f.box = a(b), d && a(b).onWSOff("submit", h, !1, d);
            }
            return f;
          },
          update: function update(c, e) {
            var f = (a.attr(c, "type") || a.prop(c, "type") || "").toLowerCase();
            if (!d[f] && !a.nodeName(c, "textarea")) return void b.warn('placeholder not allowed on input[type="' + f + '"], but it is a good fallback :-)');
            var g = o.create(c);
            g.text && g.text.text(e), m(c, !1, e, g);
          }
        };
      }();

      a.webshims.publicMethods = {
        pHolder: o
      }, i.forEach(function (a) {
        b.defineNodeNameProperty(a, "placeholder", {
          attr: {
            set: function set(a) {
              var c = this;
              d ? (b.data(c, "bustedPlaceholder", a), c.placeholder = "") : b.contentAttr(c, "placeholder", a), o.update(c, a);
            },
            get: function get() {
              var a;
              return d && (a = b.data(this, "bustedPlaceholder")), a || b.contentAttr(this, "placeholder");
            }
          },
          reflect: !0,
          initAttr: !0
        });
      }), i.forEach(function (c) {
        var e,
            f = {};
        ["attr", "prop"].forEach(function (c) {
          f[c] = {
            set: function set(f) {
              var g,
                  h = this;
              d && (g = b.data(h, "bustedPlaceholder")), g || (g = b.contentAttr(h, "placeholder")), a.removeData(h, "cachedValidity");

              var i = e[c]._supset.call(h, f);

              return g && "value" in h && m(h, f, g), i;
            },
            get: function get() {
              var d,
                  f,
                  g = this;
              return a(g).hasClass("placeholder-visible") ? b.cfg.debug && (f = e[c]._supget.call(g)) && (d = a.attr(g, "placeholder")) && d != f ? (b.error("value input[placeholder] was changed by input.value instead using $.val or $.prop."), m(g, f, d)) : f = "" : f = e[c]._supget.call(g), f;
            }
          };
        }), e = b.defineNodeNameProperty(c, "value", f);
      });
    }
  }(), function () {
    var c = d;

    if (!("value" in d.createElement("output"))) {
      b.defineNodeNameProperty("output", "value", {
        prop: {
          set: function set(b) {
            var c = a.data(this, "outputShim");
            c || (c = e(this)), c(b);
          },
          get: function get() {
            return b.contentAttr(this, "value") || a(this).text() || "";
          }
        }
      }), b.onNodeNamesPropertyModify("input", "value", function (b, c, d) {
        if ("removeAttr" != d) {
          var e = a.data(this, "outputShim");
          e && e(b);
        }
      });

      var e = function e(c) {
        if (!a.data(c, "outputShim")) {
          c = a(c);

          var e = (c.text() || "").trim(),
              f = c.prop("id"),
              g = c.attr("for"),
              h = a('<input class="output-shim" type="text" disabled name="' + (c.attr("name") || "") + '" value="' + e + '" style="display: none !important;" />').insertAfter(c),
              i = function i(a) {
            h[0].value = a, a = h[0].value, c.text(a), b.contentAttr(c[0], "value", a);
          };

          return c[0].defaultValue = e, b.contentAttr(c[0], "value", e), c.attr({
            "aria-live": "polite"
          }), f && (h.attr("id", f), c.attr("aria-labelledby", c.jProp("labels").map(function () {
            return b.getID(this);
          }).get().join(" "))), g && (f = b.getID(c), g.split(" ").forEach(function (a) {
            a = d.getElementById(a), a && a.setAttribute("aria-controls", f);
          })), c.data("outputShim", i), h.data("outputShim", i), i;
        }
      };

      b.addReady(function (b, c) {
        a(b.getElementsByTagName("output")).add(c.filter("output")).each(function () {
          e(this);
        });
      }), function () {
        var d,
            e,
            f,
            g,
            h = {
          updateInput: 1,
          input: 1
        },
            i = {
          radio: 1,
          checkbox: 1,
          submit: 1,
          button: 1,
          image: 1,
          reset: 1,
          file: 1,
          color: 1
        },
            j = {
          input: 1,
          INPUT: 1,
          textarea: 1,
          TEXTAREA: 1
        },
            k = function k(a) {
          if (f) {
            var c = f.prop("value");
            c !== e && (e = c, a && h[a.type] || b.triggerInlineForm && b.triggerInlineForm(f[0], "input"));
          }
        },
            l = function l() {
          clearTimeout(g), g = setTimeout(k, 9);
        },
            m = function m() {
          clearTimeout(g), clearInterval(d), f && f.off("focusout", m).off("keyup keypress keydown paste cut", l).off("input change updateInput triggerinput", k);
        },
            n = function n(a) {
          m(), f = a, e = f.prop("value"), clearInterval(d), d = setInterval(k, 200), l(), f.on({
            "keyup keypress keydown paste cut": l,
            "focusout wswidgetfocusout": m,
            "input updateInput change triggerinput": k
          });
        };

        a(c).on("focusin wswidgetfocusin", function (c) {
          !c.target || c.target.readOnly || c.target.disabled || !j[c.target.nodeName] || i[c.target.type] || (b.data(c.target, "implemented") || {}).inputwidgets || n(a(c.target));
        });
      }();
    }
  }();
}), webshim.register("filereader-xhr", function (a, b, c, d, e, f) {
  "use strict";

  var g,
      h,
      i,
      j = 'input[type="file"].ws-filereader, input[type="file"].ws-capture',
      k = swfmini.hasFlashPlayerVersion("10.3"),
      l = function l() {
    b.loader.loadList(["moxie"]);
  },
      m = function m() {
    var c,
        d,
        e,
        f,
        h = this;
    b.implement(h, "filepicker") && (h = this, c = a(this), e = c.parent(), f = function f() {
      h.value || c.prop("value", "");
    }, c.attr("tabindex", "-1").on("mousedown.filereaderwaiting click.filereaderwaiting", !1), e.addClass("ws-loading"), d = new g.FileInput({
      browse_button: this,
      accept: a.prop(this, "accept"),
      multiple: a.prop(this, "multiple")
    }), c.jProp("form").on("reset", function () {
      setTimeout(f);
    }), d.onready = function () {
      c.off(".fileraderwaiting"), e.removeClass("ws-waiting");
    }, d.onchange = function (a) {
      b.data(h, "fileList", a.target.files), c.trigger("change");
    }, d.onmouseenter = function () {
      c.trigger("mouseover"), e.addClass("ws-mouseenter");
    }, d.onmouseleave = function () {
      c.trigger("mouseout"), e.removeClass("ws-mouseenter");
    }, d.onmousedown = function () {
      c.trigger("mousedown"), e.addClass("ws-active");
    }, d.onmouseup = function () {
      c.trigger("mouseup"), e.removeClass("ws-active");
    }, b.data(h, "filePicker", d), b.ready("WINDOWLOAD", function () {
      var a;
      c.onWSOff("updateshadowdom", function () {
        var b = h.offsetWidth;
        b && a != b && (a = b, d.refresh());
      });
    }), b.addShadowDom(), d.init(), h.disabled && d.disable(!0));
  },
      n = function n(a) {
    return a.name;
  },
      _o = function o() {
    var c = this;
    l(), a(c).on("mousedown.filereaderwaiting click.filereaderwaiting", !1).parent().addClass("ws-loading"), b.ready("moxie", function () {
      _o.call(c);
    });
  },
      p = /^(?:script|jsonp)$/i,
      q = function q() {
    l(), b.error('filereader/formdata not ready yet. please wait for moxie to load `webshim.ready("moxie", callbackFn);`` or wait for the first change event on input[type="file"].ws-filereader.');
  },
      r = b.defineNodeNameProperty("input", "value", {
    prop: {
      get: function get() {
        var a = b.data(this, "fileList");
        return a && a.map ? a.map(n).join(", ") : r.prop._supget.call(this);
      }
    }
  }),
      s = b.cfg.basePath + "moxie/",
      t = 'You nedd a crossdomain.xml to get all "filereader" / "XHR2" / "CORS" features to work. Or host moxie.swf on your server an configure filereader options: "swfpath"',
      u = function u(b) {
    return "moxie" == b.wsType || b.data && b.data instanceof g.FormData || b.crossDomain && a.support.cors !== !1 && "no" != i && !p.test(b.dataType || "");
  },
      v = function v(c) {
    if (u(c)) {
      var d;
      return b.info("moxie transfer used for $.ajax"), "no" == i && b.error(t), {
        send: function send(b, e) {
          var g = function g(a, b) {
            if (c[b]) {
              var e = !1;
              d.addEventListener("load", function () {
                e ? e.lengthComputable && e.total > e.loaded && c[b]({
                  type: "progress",
                  lengthComputable: !0,
                  total: e.total,
                  loaded: e.total
                }) : c[b]({
                  type: "progress",
                  lengthComputable: !0,
                  total: 1,
                  loaded: 1
                });
              }), a.addEventListener("progress", function (a) {
                e = a, c[b](a);
              });
            }
          };

          d = new h.xhr.XMLHttpRequest(), d.open(c.type, c.url, c.async, c.username, c.password), g(d.upload, f.uploadprogress), g(d.upload, f.progress), d.addEventListener("load", function () {
            var a = {
              text: d.responseText,
              xml: d.responseXML
            };
            e(d.status, d.statusText, a, d.getAllResponseHeaders());
          }), c.xhrFields && c.xhrFields.withCredentials && (d.withCredentials = !0), c.timeout && (d.timeout = c.timeout), a.each(b, function (a, b) {
            d.setRequestHeader(a, b);
          }), d.send(c.data);
        },
        abort: function abort() {
          d && d.abort();
        }
      };
    }
  },
      w = {
    xdomain: function () {
      var c = /^https?:\/\//i,
          d = /^get|post$/i,
          e = new RegExp("^" + location.protocol, "i");
      return function (f, h) {
        if (!(!f.crossDomain || f.username || f.xhrFields && f.xhrFields.withCredentials || !f.async || !d.test(f.type) || !c.test(f.url) || !e.test(f.url) || f.data && f.data instanceof g.FormData || p.test(f.dataType || ""))) {
          var i = null;
          return b.info("xdomain transport used."), {
            send: function send(b, c) {
              var d = "",
                  e = (h.dataType || "").toLowerCase();
              i = new XDomainRequest(), /^\d+$/.test(h.timeout) && (i.timeout = h.timeout), i.ontimeout = function () {
                c(500, "timeout");
              }, i.onload = function () {
                var b = "Content-Length: " + i.responseText.length + "\r\nContent-Type: " + i.contentType,
                    d = {
                  code: i.status || 200,
                  message: i.statusText || "OK"
                },
                    f = {
                  text: i.responseText,
                  xml: i.responseXML
                };

                try {
                  if ("html" === e || /text\/html/i.test(i.contentType)) f.html = i.responseText;else if ("json" === e || "text" !== e && /\/json/i.test(i.contentType)) try {
                    f.json = a.parseJSON(i.responseText);
                  } catch (g) {} else if ("xml" === e && !i.responseXML) {
                    var h;

                    try {
                      h = new ActiveXObject("Microsoft.XMLDOM"), h.async = !1, h.loadXML(i.responseText);
                    } catch (g) {}

                    f.xml = h;
                  }
                } catch (j) {}

                c(d.code, d.message, f, b);
              }, i.onprogress = function () {}, i.onerror = function () {
                c(500, "error", {
                  text: i.responseText
                });
              }, h.data && (d = "string" === a.type(h.data) ? h.data : a.param(h.data)), i.open(f.type, f.url), i.send(d);
            },
            abort: function abort() {
              i && i.abort();
            }
          };
        }
      };
    }(),
    moxie: function moxie(a, c, d) {
      if (u(a)) {
        l(a);
        var e,
            f = {
          send: function send(g, h) {
            e = !0, b.ready("moxie", function () {
              e && (e = v(a, c, d), f.send = e.send, f.abort = e.abort, e.send(g, h));
            });
          },
          abort: function abort() {
            e = !1;
          }
        };
        return f;
      }
    }
  };

  b.loader.addModule("moxie", {
    src: "moxie/js/moxie-" + (k ? "swf" : "html4")
  }), f.progress || (f.progress = "onprogress"), f.uploadprogress || (f.uploadprogress = "onuploadprogress"), f.swfpath || (f.swfpath = s + "flash/Moxie.min.swf"), a.support.cors === !1 && c.XDomainRequest || delete w.xdomain, a.ajaxTransport("+*", function (a, b, c) {
    var d, e;
    if ((a.wsType || w[w]) && (d = w[w](a, b, c)), !d) for (e in w) {
      if (d = w[e](a, b, c)) break;
    }
    return d;
  }), b.defineNodeNameProperty("input", "files", {
    prop: {
      writeable: !1,
      get: function get() {
        return "file" != this.type ? null : (a(this).is(".ws-filereader, .ws-capture") || b.info("please add the 'ws-filereader'/'ws-capture' class to your input[type='file'] to implement files-property"), b.data(this, "fileList") || []);
      }
    }
  }), b.reflectProperties(["input"], ["accept"]), null == a("<input />").prop("multiple") && b.defineNodeNamesBooleanProperty(["input"], ["multiple"]), b.onNodeNamesPropertyModify("input", "disabled", function (a, c) {
    var d = b.data(this, "filePicker");
    d && d.disable(c);
  }), b.onNodeNamesPropertyModify("input", "value", function (c) {
    "" === c && "file" == this.type && a(this).is(".ws-filereader, .ws-capture") && b.data(this, "fileList", []);
  }), d.createElement("canvas").toBlob || (b.defineNodeNameProperty("canvas", "toBlob", {
    prop: {
      value: function value(c, d, e) {
        var f,
            h = a(this);
        d || (d = "image/jpeg"), "image/jpeg" != d || e || (e = .8), l(), b.ready("moxie", function () {
          var a = new g.Image();
          f = h.callProp("getAsDataURL", [d, e]), a.onload = function () {
            var d = a.getAsBlob();
            b.defineProperty(d, "_wsDataURL", {
              value: f,
              enumerable: !1
            }), c(d);
          }, a.load(f);
        });
      }
    }
  }), b.ready("url", function () {
    var a = URL.createObjectURL,
        b = URL.revokeObjectURL;
    URL.createObjectURL = function (b) {
      var c = b;
      if (b._wsimgDataURL) c = b._wsimgDataURL;else if (a) return a.apply(this, arguments);
      return c;
    }, URL.revokeObjectURL = function () {
      return b ? b.apply(this, arguments) : void 0;
    };
  })), c.FileReader = q, c.FormData = q, b.ready("moxie", function () {
    var d = "application/xml,xml";
    h = c.moxie, g = c.mOxie, g.Env.swf_url = f.swfpath, c.FileReader = g.FileReader, c.FormData = function (c) {
      var d,
          e,
          f,
          h,
          i,
          j,
          k,
          l = new g.FormData();

      if (c && a.nodeName(c, "form")) {
        for (d = a(c).serializeArray(), e = 0; e < d.length; e++) {
          Array.isArray(d[e].value) ? d[e].value.forEach(function (a) {
            l.append(d[e].name, a);
          }) : l.append(d[e].name, d[e].value);
        }

        for (d = c.querySelectorAll('input[type="file"][name]'), e = 0, f = d.length; e < d.length; e++) {
          if (k = d[e].name, k && !a(d[e]).is(":disabled") && (h = a.prop(d[e], "files") || [], h.length)) for ((h.length > 1 || l.hasBlob && l.hasBlob()) && b.error("FormData shim can only handle one file per ajax. Use multiple ajax request. One per file."), i = 0, j = h.length; j > i; i++) {
            l.append(k, h[i]);
          }
        }
      }

      return l;
    }, _o = m, w.moxie = v, f.mimeTypes = f.mimeTypes ? d + "," + f.mimeTypes : d;

    try {
      g.Mime.addMimeType(f.mimeTypes);
    } catch (e) {
      b.warn("mimetype to moxie error: " + e);
    }
  }), b.addReady(function (b, c) {
    a(b.querySelectorAll(j)).add(c.filter(j)).each(_o);
  }), b.ready("WINDOWLOAD", l), b.cfg.debug !== !1 && f.swfpath.indexOf(location.protocol + "//" + location.hostname) && f.swfpath.indexOf("https://" + location.hostname) && b.ready("WINDOWLOAD", function () {
    var c = function c() {
      "no" == i && b.error(t);
    };

    try {
      i = sessionStorage.getItem("wsXdomain.xml");
    } catch (d) {}

    if (c(), null == i) try {
      a.ajax({
        url: "crossdomain.xml",
        type: "HEAD",
        dataType: "xml",
        success: function success() {
          i = "yes";
        },
        error: function error() {
          i = "no";
        },
        complete: function complete() {
          try {
            sessionStorage.setItem("wsXdomain.xml", i);
          } catch (a) {}

          c();
        }
      });
    } catch (d) {}
  }), "complete" == d.readyState && webshims.isReady("WINDOWLOAD", !0);
});