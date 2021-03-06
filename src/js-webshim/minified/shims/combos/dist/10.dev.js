"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (a) {
  "use strict";

  var b = window.webshims;

  if (!b.defineProperties) {
    var c = "defineProperty",
        d = Object.prototype.hasOwnProperty,
        e = ["configurable", "enumerable", "writable"],
        f = function f(a) {
      for (var b = 0; 3 > b; b++) {
        void 0 !== a[e[b]] || "writable" === e[b] && void 0 === a.value || (a[e[b]] = !0);
      }
    },
        g = function g(a) {
      if (a) for (var b in a) {
        d.call(a, b) && f(a[b]);
      }
    };

    Object.create && (b.objectCreate = function (b, c, d) {
      g(c);
      var e = Object.create(b, c);
      return d && (e.options = a.extend(!0, {}, e.options || {}, d), d = e.options), e._create && a.isFunction(e._create) && e._create(d), e;
    }), Object[c] && (b[c] = function (a, b, d) {
      return f(d), Object[c](a, b, d);
    }), Object.defineProperties && (b.defineProperties = function (a, b) {
      return g(b), Object.defineProperties(a, b);
    }), b.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, b.getPrototypeOf = Object.getPrototypeOf;
  }
}(window.webshims.$), webshims.register("dom-extend", function (a, b, c, d, e) {
  "use strict";

  function f(c, d, e) {
    var f = a.clone(c, d, !1);
    return a(f.querySelectorAll("." + b.shadowClass)).detach(), e ? (s++, a(f.querySelectorAll("[id]")).prop("id", function (a, b) {
      return b + s;
    })) : a(f.querySelectorAll('audio[id^="ID-"], video[id^="ID-"], label[id^="ID-"]')).removeAttr("id"), f;
  }

  var g = !("hrefNormalized" in a.support) || a.support.hrefNormalized,
      h = Object.prototype.hasOwnProperty;

  if (b.assumeARIA = !0, ("text" == a('<input type="email" />').attr("type") || "" === a("<form />").attr("novalidate") || "required" in a("<input />")[0].attributes) && b.error("IE browser modes are busted in IE10+. Make sure to run IE in edge mode (X-UA-Compatible). Please test your HTML/CSS/JS with a real IE version or at least IETester or similar tools. "), !b.cfg.no$Switch) {
    var i = function i() {
      !c.jQuery || c.$ && c.jQuery != c.$ || c.jQuery.webshims || (b.error("jQuery was included more than once. Make sure to include it only once or try the $.noConflict(extreme) feature! Webshims and other Plugins might not work properly. Or set webshims.cfg.no$Switch to 'true'."), c.$ && (c.$ = b.$), c.jQuery = b.$);
    };

    i(), setTimeout(i, 90), b.ready("DOM", i), a(i), b.ready("WINDOWLOAD", i);
  }

  var j = /\s*,\s*/,
      k = {},
      l = {},
      m = {},
      n = {},
      o = {},
      p = {},
      q = a.fn.val,
      r = function r(b, c, d, e, f) {
    return f ? q.call(a(b)) : q.call(a(b), d);
  };

  a.widget || a.pluginFactory && a.pluginFactory.mixin || !function () {
    a.cleanData;

    a.cleanData = function (b) {
      return function (c) {
        var d, e, f;

        for (f = 0; null != (e = c[f]); f++) {
          try {
            d = a._data(e, "events"), d && d.remove && a(e).triggerHandler("remove");
          } catch (g) {}
        }

        b(c);
      };
    }(a.cleanData);
  }(), a.fn.val = function (b) {
    var c = this[0];
    if (arguments.length && null == b && (b = ""), !arguments.length) return c && 1 === c.nodeType ? a.prop(c, "value", b, "val", !0) : q.call(this);
    if (a.isArray(b)) return q.apply(this, arguments);
    var d = a.isFunction(b);
    return this.each(function (f) {
      if (c = this, 1 === c.nodeType) if (d) {
        var g = b.call(c, f, a.prop(c, "value", e, "val", !0));
        null == g && (g = ""), a.prop(c, "value", g, "val");
      } else a.prop(c, "value", b, "val");
    });
  }, a.fn.onTrigger = function (a, b) {
    return this.on(a, b).each(b);
  }, a.fn.onWSOff = function (b, c, e, f) {
    return f || (f = d), a(f)[e ? "onTrigger" : "on"](b, c), this.on("remove", function (d) {
      d.originalEvent || a(f).off(b, c);
    }), this;
  };

  var s = 0,
      t = "_webshims" + Math.round(1e3 * Math.random()),
      u = function u(b, c, d) {
    if (b = b.jquery ? b[0] : b, !b) return d || {};
    var f = a.data(b, t);
    return d !== e && (f || (f = a.data(b, t, {})), c && (f[c] = d)), c ? f && f[c] : f;
  };

  [{
    name: "getNativeElement",
    prop: "nativeElement"
  }, {
    name: "getShadowElement",
    prop: "shadowElement"
  }, {
    name: "getShadowFocusElement",
    prop: "shadowFocusElement"
  }].forEach(function (b) {
    a.fn[b.name] = function () {
      var c = [];
      return this.each(function () {
        var d = u(this, "shadowData"),
            e = d && d[b.prop] || this;
        -1 == a.inArray(e, c) && c.push(e);
      }), this.pushStack(c);
    };
  }), a.fn.clonePolyfill = function (b, c) {
    return b = b || !1, this.map(function () {
      var e = f(this, b, c);
      return setTimeout(function () {
        a.contains(d.body, e) && a(e).updatePolyfill();
      }), e;
    });
  }, b.cfg.extendNative || b.cfg.noTriggerOverride || !function (b) {
    a.event.trigger = function (c, d, e, f) {
      if (!m[c] || f || !e || 1 !== e.nodeType) return b.apply(this, arguments);
      var g,
          i,
          j,
          k = e[c],
          l = a.prop(e, c),
          n = l && k != l;
      return n && (j = "__ws" + c, i = c in e && h.call(e, c), e[c] = l, e[j] = k), g = b.apply(this, arguments), n && (i ? e[c] = k : delete e[c], delete e[j]), g;
    };
  }(a.event.trigger), ["removeAttr", "prop", "attr"].forEach(function (c) {
    k[c] = a[c], a[c] = function (b, d, f, g, h) {
      var i = "val" == g,
          j = i ? r : k[c];
      if (!b || !l[d] || 1 !== b.nodeType || !i && g && "attr" == c && a.attrFn[d]) return j(b, d, f, g, h);
      var m,
          o,
          q,
          s = (b.nodeName || "").toLowerCase(),
          t = n[s],
          u = "attr" != c || f !== !1 && null !== f ? c : "removeAttr";

      if (t || (t = n["*"]), t && (t = t[d]), t && (m = t[u]), m) {
        if ("value" == d && (o = m.isVal, m.isVal = i), "removeAttr" === u) return m.value.call(b);
        if (f === e) return m.get ? m.get.call(b) : m.value;
        m.set && ("attr" == c && f === !0 && (f = d), q = m.set.call(b, f)), "value" == d && (m.isVal = o);
      } else q = j(b, d, f, g, h);

      if ((f !== e || "removeAttr" === u) && p[s] && p[s][d]) {
        var v;
        v = "removeAttr" == u ? !1 : "prop" == u ? !!f : !0, p[s][d].forEach(function (a) {
          (!a.only || (a.only = "prop" && "prop" == c) || "attr" == a.only && "prop" != c) && a.call(b, f, v, i ? "val" : u, c);
        });
      }

      return q;
    }, o[c] = function (a, d, f) {
      n[a] || (n[a] = {}), n[a][d] || (n[a][d] = {});

      var g = n[a][d][c],
          h = function h(a, b, e) {
        var g;
        return b && b[a] ? b[a] : e && e[a] ? e[a] : "prop" == c && "value" == d ? function (a) {
          var b = this;
          return f.isVal ? r(b, d, a, !1, 0 === arguments.length) : k[c](b, d, a);
        } : "prop" == c && "value" == a && f.value.apply ? (g = "__ws" + d, m[d] = !0, function () {
          var a = this[g] || k[c](this, d);
          return a && a.apply && (a = a.apply(this, arguments)), a;
        }) : function (a) {
          return k[c](this, d, a);
        };
      };

      n[a][d][c] = f, f.value === e && (f.set || (f.set = f.writeable ? h("set", f, g) : b.cfg.useStrict && "prop" == d ? function () {
        throw d + " is readonly on " + a;
      } : function () {
        b.info(d + " is readonly on " + a);
      }), f.get || (f.get = h("get", f, g))), ["value", "get", "set"].forEach(function (a) {
        f[a] && (f["_sup" + a] = h(a, g));
      });
    };
  });

  var v = function () {
    var a = b.getPrototypeOf(d.createElement("foobar")),
        c = b.support.advancedObjectProperties && b.support.objectAccessor;
    return function (e, f, g) {
      var i, j;
      if (!(c && (i = d.createElement(e)) && (j = b.getPrototypeOf(i)) && a !== j) || i[f] && h.call(i, f)) g._supvalue = function () {
        var a = u(this, "propValue");
        return a && a[f] && a[f].apply ? a[f].apply(this, arguments) : a && a[f];
      }, w.extendValue(e, f, g.value);else {
        var k = i[f];
        g._supvalue = function () {
          return k && k.apply ? k.apply(this, arguments) : k;
        }, j[f] = g.value;
      }
      g.value._supvalue = g._supvalue;
    };
  }(),
      w = function () {
    var c = {};
    b.addReady(function (d, e) {
      var f = {},
          g = function g(b) {
        f[b] || (f[b] = a(d.getElementsByTagName(b)), e[0] && a.nodeName(e[0], b) && (f[b] = f[b].add(e)));
      };

      a.each(c, function (a, c) {
        return g(a), c && c.forEach ? void c.forEach(function (b) {
          f[a].each(b);
        }) : void b.warn("Error: with " + a + "-property. methods: " + c);
      }), f = null;
    });

    var e,
        f = a([]),
        g = function g(b, f) {
      c[b] ? c[b].push(f) : c[b] = [f], a.isDOMReady && (e || a(d.getElementsByTagName(b))).each(f);
    };

    return {
      createTmpCache: function createTmpCache(b) {
        return a.isDOMReady && (e = e || a(d.getElementsByTagName(b))), e || f;
      },
      flushTmpCache: function flushTmpCache() {
        e = null;
      },
      content: function content(b, c) {
        g(b, function () {
          var b = a.attr(this, c);
          null != b && a.attr(this, c, b);
        });
      },
      createElement: function createElement(a, b) {
        g(a, b);
      },
      extendValue: function extendValue(b, c, d) {
        g(b, function () {
          a(this).each(function () {
            var a = u(this, "propValue", {});
            a[c] = this[c], this[c] = d;
          });
        });
      }
    };
  }(),
      x = function x(a, b) {
    a.defaultValue === e && (a.defaultValue = ""), a.removeAttr || (a.removeAttr = {
      value: function value() {
        a[b || "prop"].set.call(this, a.defaultValue), a.removeAttr._supvalue.call(this);
      }
    }), a.attr || (a.attr = {});
  };

  a.extend(b, {
    xProps: l,
    getID: function () {
      var b = new Date().getTime();
      return function (c) {
        c = a(c);
        var d = c.prop("id");
        return d || (b++, d = "ID-" + b, c.eq(0).prop("id", d)), d;
      };
    }(),
    domPrefixes: ["webkit", "moz", "ms", "o", "ws"],
    prefixed: function prefixed(a, c) {
      var d,
          e,
          f = !1;
      if (c[a] && (f = a), !f) for (a = a.charAt(0).toUpperCase() + a.slice(1), d = 0; d < b.domPrefixes.length; d++) {
        if (e = b.domPrefixes[d] + a, e in c) {
          f = e;
          break;
        }
      }
      return f;
    },
    shadowClass: "wsshadow-" + Date.now(),
    implement: function implement(c, d) {
      var e = u(c, "implemented") || u(c, "implemented", {});
      return e[d] ? (b.warn(d + " already implemented for element #" + c.id), !1) : (e[d] = !0, !a(c).hasClass("ws-nopolyfill"));
    },
    extendUNDEFProp: function extendUNDEFProp(b, c) {
      a.each(c, function (a, c) {
        a in b || (b[a] = c);
      });
    },
    getOptions: function () {
      var c = /\-([a-z])/g,
          d = {},
          e = {},
          f = function f(a, b) {
        return b.toLowerCase();
      },
          g = function g(a, b) {
        return b.toUpperCase();
      };

      return function (h, i, j, k) {
        e[i] ? i = e[i] : (e[i] = i.replace(c, g), i = e[i]);
        var l,
            m = u(h, "cfg" + i),
            n = {};
        if (m) return m;

        if (m = a(h).data(), m && "string" == typeof m[i]) {
          if (k) return u(h, "cfg" + i, m[i]);
          b.error("data-" + i + " attribute has to be a valid JSON, was: " + m[i]);
        }

        j ? Array.isArray(j) ? j.unshift(!0, {}) : j = [!0, {}, j] : j = [!0, {}], m && "object" == _typeof(m[i]) && j.push(m[i]), d[i] || (d[i] = new RegExp("^" + i + "([A-Z])"));

        for (l in m) {
          d[i].test(l) && (n[l.replace(d[i], f)] = m[l]);
        }

        return j.push(n), u(h, "cfg" + i, a.extend.apply(a, j));
      };
    }(),
    createPropDefault: x,
    data: u,
    moveToFirstEvent: function moveToFirstEvent(b, c, d) {
      var e,
          f = (a._data(b, "events") || {})[c];
      f && f.length > 1 && (e = f.pop(), d || (d = "bind"), "bind" == d && f.delegateCount ? f.splice(f.delegateCount, 0, e) : f.unshift(e)), b = null;
    },
    addShadowDom: function () {
      var e,
          f,
          g,
          h = a(c),
          i = {
        init: !1,
        runs: 0,
        test: function test() {
          var a = i.getHeight(),
              b = i.getWidth();
          a != i.height || b != i.width ? (i.height = a, i.width = b, i.handler({
            type: "docresize"
          }), i.runs++, i.runs < 9 && setTimeout(i.test, 90)) : i.runs = 0;
        },
        handler: function () {
          var b,
              j = function j() {
            a(d).triggerHandler("updateshadowdom", [b]);
          },
              k = function k() {
            if (b && "resize" == b.type) {
              var a = h.width(),
                  d = h.width();
              if (d == f && a == g) return;
              f = d, g = a;
            }

            b && "docresize" != b.type && (i.height = i.getHeight(), i.width = i.getWidth()), c.requestAnimationFrame ? requestAnimationFrame(j) : setTimeout(j, 0);
          };

          return function (a) {
            clearTimeout(e), b = a, e = setTimeout(k, "resize" != a.type || c.requestAnimationFrame ? 9 : 50);
          };
        }(),
        _create: function _create() {
          a.each({
            Height: "getHeight",
            Width: "getWidth"
          }, function (a, b) {
            var c = d.body,
                e = d.documentElement;

            i[b] = function () {
              return Math.max(c["scroll" + a], e["scroll" + a], c["offset" + a], e["offset" + a], e["client" + a]);
            };
          });
        },
        start: function start() {
          !this.init && d.body && (this.init = !0, this._create(), this.height = i.getHeight(), this.width = i.getWidth(), setInterval(this.test, 999), a(this.test), null == a.support.boxSizing && a(function () {
            a.support.boxSizing && i.handler({
              type: "boxsizing"
            });
          }), b.ready("WINDOWLOAD", this.test), a(d).on("updatelayout.webshim pageinit popupafteropen panelbeforeopen tabsactivate collapsibleexpand shown.bs.modal shown.bs.collapse slid.bs.carousel playerdimensionchange", this.handler), a(c).on("resize", this.handler));
        }
      };
      return b.docObserve = function () {
        b.ready("DOM", function () {
          i.start();
        });
      }, function (c, d, e) {
        if (c && d) {
          e = e || {}, c.jquery && (c = c[0]), d.jquery && (d = d[0]);
          var f = a.data(c, t) || a.data(c, t, {}),
              g = a.data(d, t) || a.data(d, t, {}),
              h = {};
          e.shadowFocusElement ? e.shadowFocusElement && (e.shadowFocusElement.jquery && (e.shadowFocusElement = e.shadowFocusElement[0]), h = a.data(e.shadowFocusElement, t) || a.data(e.shadowFocusElement, t, h)) : e.shadowFocusElement = d, a(c).on("remove", function (b) {
            b.originalEvent || setTimeout(function () {
              a(d).remove();
            }, 4);
          }), f.hasShadow = d, h.nativeElement = g.nativeElement = c, h.shadowData = g.shadowData = f.shadowData = {
            nativeElement: c,
            shadowElement: d,
            shadowFocusElement: e.shadowFocusElement
          }, e.shadowChilds && e.shadowChilds.each(function () {
            u(this, "shadowData", g.shadowData);
          }), e.data && (h.shadowData.data = g.shadowData.data = f.shadowData.data = e.data), e = null;
        }

        b.docObserve();
      };
    }(),
    propTypes: {
      standard: function standard(a) {
        x(a), a.prop || (a.prop = {
          set: function set(b) {
            a.attr.set.call(this, "" + b);
          },
          get: function get() {
            return a.attr.get.call(this) || a.defaultValue;
          }
        });
      },
      "boolean": function boolean(a) {
        x(a), a.prop || (a.prop = {
          set: function set(b) {
            b ? a.attr.set.call(this, "") : a.removeAttr.value.call(this);
          },
          get: function get() {
            return null != a.attr.get.call(this);
          }
        });
      },
      src: function () {
        var b = d.createElement("a");
        return b.style.display = "none", function (c, d) {
          x(c), c.prop || (c.prop = {
            set: function set(a) {
              c.attr.set.call(this, a);
            },
            get: function get() {
              var c,
                  e = this.getAttribute(d);
              if (null == e) return "";

              if (b.setAttribute("href", e + ""), !g) {
                try {
                  a(b).insertAfter(this), c = b.getAttribute("href", 4);
                } catch (f) {
                  c = b.getAttribute("href", 4);
                }

                a(b).detach();
              }

              return c || b.href;
            }
          });
        };
      }(),
      enumarated: function enumarated(a) {
        x(a), a.prop || (a.prop = {
          set: function set(b) {
            a.attr.set.call(this, b);
          },
          get: function get() {
            var b = (a.attr.get.call(this) || "").toLowerCase();
            return b && -1 != a.limitedTo.indexOf(b) || (b = a.defaultValue), b;
          }
        });
      }
    },
    reflectProperties: function reflectProperties(c, d) {
      "string" == typeof d && (d = d.split(j)), d.forEach(function (d) {
        b.defineNodeNamesProperty(c, d, {
          prop: {
            set: function set(b) {
              a.attr(this, d, b);
            },
            get: function get() {
              return a.attr(this, d) || "";
            }
          }
        });
      });
    },
    defineNodeNameProperty: function defineNodeNameProperty(c, d, e) {
      return l[d] = !0, e.reflect && (e.propType && !b.propTypes[e.propType] ? b.error("could not finde propType " + e.propType) : b.propTypes[e.propType || "standard"](e, d)), ["prop", "attr", "removeAttr"].forEach(function (f) {
        var g = e[f];
        g && (g = "prop" === f ? a.extend({
          writeable: !0
        }, g) : a.extend({}, g, {
          writeable: !0
        }), o[f](c, d, g), "*" != c && b.cfg.extendNative && "prop" == f && g.value && a.isFunction(g.value) && v(c, d, g), e[f] = g);
      }), e.initAttr && w.content(c, d), e;
    },
    defineNodeNameProperties: function defineNodeNameProperties(a, c, d, e) {
      for (var f in c) {
        !e && c[f].initAttr && w.createTmpCache(a), d && (c[f][d] || (c[f][d] = {}, ["value", "set", "get"].forEach(function (a) {
          a in c[f] && (c[f][d][a] = c[f][a], delete c[f][a]);
        }))), c[f] = b.defineNodeNameProperty(a, f, c[f]);
      }

      return e || w.flushTmpCache(), c;
    },
    createElement: function createElement(c, d, e) {
      var f;
      return a.isFunction(d) && (d = {
        after: d
      }), w.createTmpCache(c), d.before && w.createElement(c, d.before), e && (f = b.defineNodeNameProperties(c, e, !1, !0)), d.after && w.createElement(c, d.after), w.flushTmpCache(), f;
    },
    onNodeNamesPropertyModify: function onNodeNamesPropertyModify(b, c, d, e) {
      "string" == typeof b && (b = b.split(j)), a.isFunction(d) && (d = {
        set: d
      }), b.forEach(function (a) {
        p[a] || (p[a] = {}), "string" == typeof c && (c = c.split(j)), d.initAttr && w.createTmpCache(a), c.forEach(function (b) {
          p[a][b] || (p[a][b] = [], l[b] = !0), d.set && (e && (d.set.only = e), p[a][b].push(d.set)), d.initAttr && w.content(a, b);
        }), w.flushTmpCache();
      });
    },
    defineNodeNamesBooleanProperty: function defineNodeNamesBooleanProperty(c, d, f) {
      f || (f = {}), a.isFunction(f) && (f.set = f), b.defineNodeNamesProperty(c, d, {
        attr: {
          set: function set(a) {
            f.useContentAttribute ? b.contentAttr(this, d, a) : this.setAttribute(d, a), f.set && f.set.call(this, !0);
          },
          get: function get() {
            var a = f.useContentAttribute ? b.contentAttr(this, d) : this.getAttribute(d);
            return null == a ? e : d;
          }
        },
        removeAttr: {
          value: function value() {
            this.removeAttribute(d), f.set && f.set.call(this, !1);
          }
        },
        reflect: !0,
        propType: "boolean",
        initAttr: f.initAttr || !1
      });
    },
    contentAttr: function contentAttr(a, b, c) {
      if (a.nodeName) {
        var d;
        return c === e ? (d = a.attributes[b] || {}, c = d.specified ? d.value : null, null == c ? e : c) : void ("boolean" == typeof c ? c ? a.setAttribute(b, b) : a.removeAttribute(b) : a.setAttribute(b, c));
      }
    },
    activeLang: function () {
      var c = [],
          d = [],
          e = {},
          f = function f(d, _f, h) {
        _f._isLoading = !0, e[d] ? e[d].push(_f) : (e[d] = [_f], b.loader.loadScript(d, function () {
          h == c.join() && a.each(e[d], function (a, b) {
            g(b);
          }), delete e[d];
        }));
      },
          g = function g(b) {
        var d = b.__active,
            e = function e(a, d) {
          return b._isLoading = !1, b[d] || -1 != b.availableLangs.indexOf(d) ? (b[d] ? (b.__active = b[d], b.__activeName = d) : f(b.langSrc + d, b, c.join()), !1) : void 0;
        };

        a.each(c, e), b.__active || (b.__active = b[""], b.__activeName = ""), d != b.__active && a(b).trigger("change");
      };

      return function (a) {
        var b;
        if ("string" == typeof a) c[0] != a && (c = [a], b = c[0].split("-")[0], b && b != a && c.push(b), d.forEach(g));else if ("object" == _typeof(a)) return a.__active || (d.push(a), g(a)), a.__active;
        return c[0];
      };
    }()
  }), a.each({
    defineNodeNamesProperty: "defineNodeNameProperty",
    defineNodeNamesProperties: "defineNodeNameProperties",
    createElements: "createElement"
  }, function (a, c) {
    b[a] = function (a, d, e, f) {
      "string" == typeof a && (a = a.split(j));
      var g = {};
      return a.forEach(function (a) {
        g[a] = b[c](a, d, e, f);
      }), g;
    };
  }), b.isReady("webshimLocalization", !0), function () {
    if (!("content" in d.createElement("template") || (a(function () {
      var c = a("main").attr({
        role: "main"
      });
      c.length > 1 ? b.error("only one main element allowed in document") : c.is("article *, section *") && b.error("main not allowed inside of article/section elements");
    }), "hidden" in d.createElement("a")))) {
      b.defineNodeNamesBooleanProperty(["*"], "hidden");

      var c = {
        article: "article",
        aside: "complementary",
        section: "region",
        nav: "navigation",
        address: "contentinfo"
      },
          e = function e(a, b) {
        var c = a.getAttribute("role");
        c || a.setAttribute("role", b);
      };

      a.webshims.addReady(function (b, f) {
        if (a.each(c, function (c, d) {
          for (var g = a(c, b).add(f.filter(c)), h = 0, i = g.length; i > h; h++) {
            e(g[h], d);
          }
        }), b === d) {
          var g = d.getElementsByTagName("header")[0],
              h = d.getElementsByTagName("footer"),
              i = h.length;
          if (g && !a(g).closest("section, article")[0] && e(g, "banner"), !i) return;
          var j = h[i - 1];
          a(j).closest("section, article")[0] || e(j, "contentinfo");
        }
      });
    }
  }();
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
});