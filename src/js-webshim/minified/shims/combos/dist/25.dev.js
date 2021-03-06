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
}), webshims.register("mediaelement-jaris", function (a, b, c, d, e, f) {
  "use strict";

  var g = b.mediaelement,
      h = c.swfmini,
      i = b.support,
      j = i.mediaelement,
      k = h.hasFlashPlayerVersion("11.3"),
      l = 0,
      m = "ActiveXObject" in c && j,
      n = {
    paused: !0,
    ended: !1,
    currentSrc: "",
    duration: c.NaN,
    readyState: 0,
    networkState: 0,
    videoHeight: 0,
    videoWidth: 0,
    seeking: !1,
    error: null,
    buffered: {
      start: function start(a) {
        return a ? void b.error("buffered index size error") : 0;
      },
      end: function end(a) {
        return a ? void b.error("buffered index size error") : 0;
      },
      length: 0
    }
  },
      o = Object.keys(n),
      p = {
    currentTime: 0,
    volume: 1,
    muted: !1
  },
      q = (Object.keys(p), a.extend({
    isActive: "html5",
    activating: "html5",
    wasSwfReady: !1,
    _usermedia: null,
    _bufferedEnd: 0,
    _bufferedStart: 0,
    currentTime: 0,
    lastCalledTime: -500,
    _ppFlag: e,
    _calledMeta: !1,
    lastDuration: 0,
    _timeDif: .3
  }, n, p)),
      r = function r(a) {
    try {
      a.nodeName;
    } catch (c) {
      return null;
    }

    var d = b.data(a, "mediaelement");
    return d && "third" == d.isActive ? d : null;
  },
      s = function s(b, c) {
    c = a.Event(c), c.preventDefault(), a.event.trigger(c, e, b);
  },
      t = f.playerPath || b.cfg.basePath + "swf/" + (f.playerName || "JarisFLVPlayer.swf");

  b.extendUNDEFProp(f.params, {
    allowscriptaccess: "always",
    allowfullscreen: "true",
    wmode: "transparent",
    allowNetworking: "all"
  }), b.extendUNDEFProp(f.vars, {
    controltype: "1",
    jsapi: "1"
  }), b.extendUNDEFProp(f.attrs, {
    bgcolor: "#000000"
  }), f.playerPath = t;

  var u = function u(a, b) {
    3 > a && clearTimeout(b._canplaythroughTimer), a >= 3 && b.readyState < 3 && (b.readyState = a, s(b._elem, "canplay"), b.paused || s(b._elem, "playing"), clearTimeout(b._canplaythroughTimer), b._canplaythroughTimer = setTimeout(function () {
      u(4, b);
    }, 4e3)), a >= 4 && b.readyState < 4 && (b.readyState = a, s(b._elem, "canplaythrough")), b.readyState = a;
  },
      v = function v(b) {
    b.seeking && Math.abs(b.currentTime - b._lastSeektime) < 2 && (b.seeking = !1, a(b._elem).triggerHandler("seeked"));
  };

  g.jarisEvent = g.jarisEvent || {};
  var w,
      x = {
    onPlayPause: function onPlayPause(a, b, c) {
      var d,
          e,
          f = b.paused || b.ended;
      if (null == c) try {
        d = b.api.api_get("isPlaying");
      } catch (g) {} else d = c;
      (d == f || null == d) && (b.paused = !d, e = b.paused ? "pause" : "play", b._ppFlag = !0, s(b._elem, e)), b.paused && d != f && null != d || b.readyState < 3 && u(3, b), b.paused || s(b._elem, "playing");
    },
    onSeek: function onSeek(b, c) {
      c._lastSeektime = b.seekTime, c.seeking = !0, a(c._elem).triggerHandler("seeking"), clearTimeout(c._seekedTimer), c._seekedTimer = setTimeout(function () {
        v(c), c.seeking = !1;
      }, 300);
    },
    onConnectionFailed: function onConnectionFailed(a, b) {
      g.setError(b._elem, "flash connection error");
    },
    onNotBuffering: function onNotBuffering(a, b) {
      u(3, b);
    },
    onDataInitialized: function onDataInitialized(a, b) {
      var c,
          d = b.duration;
      b.duration = a.duration, d == b.duration || isNaN(b.duration) || b._calledMeta && (c = Math.abs(b.lastDuration - b.duration)) < 2 || (b.videoHeight = a.height, b.videoWidth = a.width, b.networkState || (b.networkState = 2), b.readyState < 1 && u(1, b), clearTimeout(b._durationChangeTimer), b._calledMeta && b.duration ? b._durationChangeTimer = setTimeout(function () {
        b.lastDuration = b.duration, s(b._elem, "durationchange");
      }, c > 50 ? 0 : c > 9 ? 9 : 99) : (b.lastDuration = b.duration, b.duration && s(b._elem, "durationchange"), b._calledMeta || s(b._elem, "loadedmetadata"), b._timeDif = b.duration > 1 && b.duration < 140 ? .2 : b.duration < 600 ? .25 : .3), b._calledMeta = !0);
    },
    onBuffering: function onBuffering(a, b) {
      b.ended && (b.ended = !1), u(1, b), s(b._elem, "waiting");
    },
    onTimeUpdate: function onTimeUpdate(b, c) {
      var d = c.currentTime - c.lastCalledTime;
      c.ended && (c.ended = !1), c.readyState < 3 && (u(3, c), s(c._elem, "playing")), c.seeking && v(c), (d > c._timeDif || -.3 > d) && (c.lastCalledTime = c.currentTime, a.event.trigger("timeupdate", e, c._elem, !0));
    },
    onProgress: function onProgress(b, c) {
      if (c.ended && (c.ended = !1), c.duration && !isNaN(c.duration)) {
        var d = b.loaded / b.total;
        d > .02 && .2 > d ? u(3, c) : d > .2 && (d > .95 && (d = 1, c.networkState = 1), u(4, c)), c._bufferedEnd && c._bufferedEnd > d && (c._bufferedStart = c.currentTime || 0), c._bufferedEnd = d, c.buffered.length = 1, a.event.trigger("progress", e, c._elem, !0);
      }
    },
    onPlaybackFinished: function onPlaybackFinished(a, b) {
      b.readyState < 4 && u(4, b), b.ended = !0, s(b._elem, "ended");
    },
    onVolumeChange: function onVolumeChange(a, b) {
      (b.volume != a.volume || b.muted != a.mute) && (b.volume = a.volume, b.muted = a.mute, s(b._elem, "volumechange"));
    },
    ready: function () {
      var c = function c(a) {
        var b = !0;

        try {
          a.api.api_get("volume");
        } catch (c) {
          b = !1;
        }

        return b;
      };

      return function (d, e) {
        var f = 0,
            g = function g() {
          return f > 9 ? void (e.tryedReframeing = 0) : (f++, e.tryedReframeing++, void (c(e) ? (e.wasSwfReady = !0, e.tryedReframeing = 0, z(e), y(e)) : e.tryedReframeing < 6 ? e.tryedReframeing < 3 ? (e.reframeTimer = setTimeout(g, 9), e.shadowElem.css({
            overflow: "visible"
          }), setTimeout(function () {
            e.shadowElem.css({
              overflow: "hidden"
            });
          }, 1)) : (e.shadowElem.css({
            overflow: "hidden"
          }), a(e._elem).mediaLoad()) : (clearTimeout(e.reframeTimer), b.error("reframing error"))));
        };

        e && e.api && (e.tryedReframeing || (e.tryedReframeing = 0), clearTimeout(w), clearTimeout(e.reframeTimer), e.shadowElem.removeClass("flashblocker-assumed"), f ? e.reframeTimer = setTimeout(g, 9) : g());
      };
    }()
  };
  x.onMute = x.onVolumeChange, g.onEvent = x;

  var y = function y(a) {
    var c,
        d = a.actionQueue.length,
        e = 0;
    if (d && "third" == a.isActive) for (; a.actionQueue.length && d > e;) {
      e++, c = a.actionQueue.shift();

      try {
        a.api[c.fn].apply(a.api, c.args);
      } catch (f) {
        b.warn(f);
      }
    }
    a.actionQueue.length && (a.actionQueue = []);
  },
      z = function z(b) {
    b && ((b._ppFlag === e && a.prop(b._elem, "autoplay") || !b.paused) && setTimeout(function () {
      if ("third" == b.isActive && (b._ppFlag === e || !b.paused)) try {
        a(b._elem).play(), b._ppFlag = !0;
      } catch (c) {}
    }, 1), b.muted && a.prop(b._elem, "muted", !0), 1 != b.volume && a.prop(b._elem, "volume", b.volume));
  },
      A = a.noop;

  if (j) {
    var B = {
      play: 1,
      playing: 1
    },
        C = ["play", "pause", "playing", "loadstart", "canplay", "progress", "waiting", "ended", "loadedmetadata", "durationchange", "emptied"],
        D = C.map(function (a) {
      return a + ".webshimspolyfill";
    }).join(" "),
        E = function E(c) {
      var d = b.data(c.target, "mediaelement");

      if (d) {
        var e = c.originalEvent && c.originalEvent.type === c.type;
        e == ("third" == d.activating) && (c.stopImmediatePropagation(), B[c.type] && (d.isActive != d.activating ? a(c.target).pause() : e && (a.prop(c.target, "pause")._supvalue || a.noop).apply(c.target)));
      }
    };

    A = function A(c) {
      a(c).off(D).on(D, E), C.forEach(function (a) {
        b.moveToFirstEvent(c, a);
      });
    }, A(d);
  }

  g.setActive = function (c, d, e) {
    if (e || (e = b.data(c, "mediaelement")), e && e.isActive != d) {
      "html5" != d && "third" != d && b.warn("wrong type for mediaelement activating: " + d);
      var f = b.data(c, "shadowData");
      e.activating = d, a(c).pause(), e.isActive = d, "third" == d ? (f.shadowElement = f.shadowFocusElement = e.shadowElem[0], a(c).addClass("swf-api-active nonnative-api-active").hide().getShadowElement().show()) : (a(c).removeClass("swf-api-active nonnative-api-active").show().getShadowElement().hide(), f.shadowElement = f.shadowFocusElement = !1), a(c).trigger("mediaelementapichange");
    }
  };

  var F = function () {
    var a = ["_calledMeta", "lastDuration", "_bufferedEnd", "lastCalledTime", "_usermedia", "_bufferedStart", "_ppFlag", "currentSrc", "currentTime", "duration", "ended", "networkState", "paused", "seeking", "videoHeight", "videoWidth"],
        b = a.length;
    return function (c) {
      if (c) {
        clearTimeout(c._seekedTimer);
        var d = b,
            e = c.networkState;

        for (u(0, c), clearTimeout(c._durationChangeTimer); --d > -1;) {
          delete c[a[d]];
        }

        c.actionQueue = [], c.buffered.length = 0, e && s(c._elem, "emptied");
      }
    };
  }(),
      G = function () {
    var e = {},
        f = function f(b) {
      var c, f, g;
      return e[b.currentSrc] ? c = e[b.currentSrc] : b.videoHeight && b.videoWidth ? (e[b.currentSrc] = {
        width: b.videoWidth,
        height: b.videoHeight
      }, c = e[b.currentSrc]) : (f = a.attr(b._elem, "poster")) && (c = e[f], c || (g = d.createElement("img"), g.onload = function () {
        e[f] = {
          width: this.width,
          height: this.height
        }, e[f].height && e[f].width ? H(b, a.prop(b._elem, "controls")) : delete e[f], g.onload = null;
      }, g.src = f, g.complete && g.onload && g.onload())), c || {
        width: 300,
        height: "video" == b._elemNodeName ? 150 : 50
      };
    },
        g = function g(a, b) {
      return a.style[b] || a.currentStyle && a.currentStyle[b] || c.getComputedStyle && (c.getComputedStyle(a, null) || {})[b] || "";
    },
        h = ["minWidth", "maxWidth", "minHeight", "maxHeight"],
        i = function i(a, b) {
      var c,
          d,
          e = !1;

      for (c = 0; 4 > c; c++) {
        d = g(a, h[c]), parseFloat(d, 10) && (e = !0, b[h[c]] = d);
      }

      return e;
    },
        j = function j(c) {
      var d,
          e,
          h = c._elem,
          j = {
        width: "auto" == g(h, "width"),
        height: "auto" == g(h, "height")
      },
          k = {
        width: !j.width && a(h).width(),
        height: !j.height && a(h).height()
      };
      return (j.width || j.height) && (d = f(c), e = d.width / d.height, j.width && j.height ? (k.width = d.width, k.height = d.height) : j.width ? k.width = k.height * e : j.height && (k.height = k.width / e), i(h, k) && (c.shadowElem.css(k), j.width && (k.width = c.shadowElem.height() * e), j.height && (k.height = (j.width ? k.width : c.shadowElem.width()) / e), j.width && j.height && (c.shadowElem.css(k), k.height = c.shadowElem.width() / e, k.width = k.height * e, c.shadowElem.css(k), k.width = c.shadowElem.height() * e, k.height = k.width / e), b.support.mediaelement || (k.width = c.shadowElem.width(), k.height = c.shadowElem.height()))), k;
    };

    return j;
  }(),
      H = function H(b, c) {
    var d,
        e = b.shadowElem;
    a(b._elem)[c ? "addClass" : "removeClass"]("webshims-controls"), ("third" == b.isActive || "third" == b.activating) && ("audio" != b._elemNodeName || c ? (b._elem.style.display = "", d = G(b), b._elem.style.display = "none", e.css(d)) : e.css({
      width: 0,
      height: 0
    }));
  },
      I = function () {
    var b = {
      "": 1,
      auto: 1
    };
    return function (c) {
      var d = a.attr(c, "preload");
      return null == d || "none" == d || a.prop(c, "autoplay") ? !1 : (d = a.prop(c, "preload"), !!(b[d] || "metadata" == d && a(c).is(".preload-in-doubt, video:not([poster])")));
    };
  }(),
      J = {
    A: /&amp;/g,
    a: /&/g,
    e: /\=/g,
    q: /\?/g
  },
      K = function K(a) {
    return a.replace ? a.replace(J.A, "%26").replace(J.a, "%26").replace(J.e, "%3D").replace(J.q, "%3F") : a;
  };

  if ("matchMedia" in c) {
    var L = !1;

    try {
      L = c.matchMedia("only all").matches;
    } catch (M) {}

    L && (g.sortMedia = function (a, b) {
      try {
        a = !a.media || matchMedia(a.media).matches, b = !b.media || matchMedia(b.media).matches;
      } catch (c) {
        return 0;
      }

      return a == b ? 0 : a ? -1 : 1;
    });
  }

  g.resetSwfProps = F, g.createSWF = function (c, e, f) {
    if (!k) return void setTimeout(function () {
      a(c).mediaLoad();
    }, 1);
    var h = {};
    1 > l ? l = 1 : l++, f || (f = b.data(c, "mediaelement")), ((h.height = a.attr(c, "height") || "") || (h.width = a.attr(c, "width") || "")) && (a(c).css(h), b.warn("width or height content attributes used. Webshims prefers the usage of CSS (computed styles or inline styles) to detect size of a video/audio. It's really more powerfull."));

    var i,
        m = e.streamrequest,
        n = "jarisplayer/stream" == e.type,
        o = a.prop(c, "controls"),
        p = "jarisplayer-" + b.getID(c),
        r = c.nodeName.toLowerCase(),
        t = function t() {
      "third" == f.isActive && H(f, a.prop(c, "controls"));
    };

    return n && !m ? void webshim.usermedia.attach(c, e, f) : (f && f.swfCreated ? (g.setActive(c, "third", f), f.currentSrc = "", f.shadowElem.html('<div id="' + p + '">'), f.api = !1, f.actionQueue = [], i = f.shadowElem, F(f), f.currentSrc = e.srcProp) : (a(d.getElementById("wrapper-" + p)).remove(), i = a('<div class="polyfill-' + r + " polyfill-mediaelement " + b.shadowClass + '" id="wrapper-' + p + '"><div id="' + p + '"></div>').css({
      position: "relative",
      overflow: "hidden"
    }), f = b.data(c, "mediaelement", b.objectCreate(q, {
      actionQueue: {
        value: []
      },
      shadowElem: {
        value: i
      },
      _elemNodeName: {
        value: r
      },
      _elem: {
        value: c
      },
      currentSrc: {
        value: m ? "" : e.srcProp
      },
      swfCreated: {
        value: !0
      },
      id: {
        value: p.replace(/-/g, "")
      },
      buffered: {
        value: {
          start: function start(a) {
            return a >= f.buffered.length ? void b.error("buffered index size error") : 0;
          },
          end: function end(a) {
            return a >= f.buffered.length ? void b.error("buffered index size error") : (f.duration - f._bufferedStart) * f._bufferedEnd + f._bufferedStart;
          },
          length: 0
        }
      }
    })), i.insertBefore(c), j && a.extend(f, {
      volume: a.prop(c, "volume"),
      muted: a.prop(c, "muted"),
      paused: a.prop(c, "paused")
    }), b.addShadowDom(c, i), b.data(c, "mediaelement") || b.data(c, "mediaelement", f), A(c), g.setActive(c, "third", f), H(f, o), a(c).on({
      "updatemediaelementdimensions loadedmetadata emptied": t,
      remove: function remove(a) {
        !a.originalEvent && g.jarisEvent[f.id] && g.jarisEvent[f.id].elem == c && (delete g.jarisEvent[f.id], clearTimeout(w), clearTimeout(f.flashBlock));
      }
    }).onWSOff("updateshadowdom", t)), g.jarisEvent[f.id] && g.jarisEvent[f.id].elem != c ? void b.error("something went wrong") : (g.jarisEvent[f.id] || (g.jarisEvent[f.id] = function (a) {
      if ("ready" == a.type) {
        var b = function b() {
          f.api && (f.paused || f.api.api_play(), I(c) && f.api.api_preload(), x.ready(a, f));
        };

        f.api ? b() : setTimeout(b, 9);
      } else f.currentTime = a.position, f.api && (!f._calledMeta && isNaN(a.duration) && f.duration != a.duration && isNaN(f.duration) && x.onDataInitialized(a, f), f._ppFlag || "onPlayPause" == a.type || x.onPlayPause(a, f), x[a.type] && x[a.type](a, f)), f.duration = a.duration;
    }, g.jarisEvent[f.id].elem = c), N(c, e, f, p, o, r), void (m || s(f._elem, "loadstart"))));
  };

  var N = function N(c, d, e, g, i, j) {
    var k,
        l,
        m,
        n,
        o = "audio/rtmp" == d.type || "video/rtmp" == d.type,
        p = "jarisplayer/stream" == d.type;
    k = a.extend({}, f.vars, {
      poster: K(a.attr(c, "poster") && a.prop(c, "poster") || ""),
      source: K(d.streamId || d.srcProp),
      server: K(d.server || "")
    }), l = a(c).data("vars") || {}, a.extend(k, {
      id: g,
      evtId: e.id,
      controls: "" + (!p && i),
      autostart: "false",
      nodename: j
    }, l), o ? k.streamtype = "rtmp" : p ? k.streamtype = "usermedia" : "audio/mpeg" == d.type || "audio/mp3" == d.type ? (k.type = "audio", k.streamtype = "file") : "video/youtube" == d.type && (k.streamtype = "youtube"), n = a.extend({}, f.attrs, {
      name: g,
      id: g
    }, a(c).data("attrs")), m = a.extend({}, f.params, a(c).data("params")), f.changeSWF(k, c, d, e, "embed"), clearTimeout(e.flashBlock), h.embedSWF(t, g, "100%", "100%", "11.3", !1, k, m, n, function (f) {
      if (f.success) {
        var g = function g() {
          f.ref.parentNode && "none" != f.ref.style.display || (a(c).trigger("flashblocker"), b.warn("flashblocker assumed")), a(f.ref).css({
            minHeight: "2px",
            minWidth: "2px",
            display: "block"
          });
        };

        e.api = f.ref, i || a(f.ref).attr("tabindex", "-1").css("outline", "none"), e.flashBlock = setTimeout(g, 99), w || (clearTimeout(w), w = setTimeout(function () {
          g();
          var c = a(f.ref);
          c[0].offsetWidth > 1 && c[0].offsetHeight > 1 && 0 === location.protocol.indexOf("file:") ? b.error("Add your local development-directory to the local-trusted security sandbox:  http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html") : (c[0].offsetWidth < 2 || c[0].offsetHeight < 2) && b.warn("JS-SWF connection can't be established on hidden or unconnected flash objects"), c = null;
        }, 8e3)), p && webshim.usermedia.request(c, d, e);
      }
    });
  },
      O = function O(a, b, c, d) {
    return d = d || r(a), d ? (d.api && d.api[b] ? d.api[b].apply(d.api, c || []) : (d.actionQueue.push({
      fn: b,
      args: c
    }), d.actionQueue.length > 10 && setTimeout(function () {
      d.actionQueue.length > 5 && d.actionQueue.shift();
    }, 99)), d) : !1;
  };

  g.queueSwfMethod = O, ["audio", "video"].forEach(function (c) {
    var d,
        e = {},
        f = function f(a) {
      ("audio" != c || "videoHeight" != a && "videoWidth" != a) && (e[a] = {
        get: function get() {
          var b = r(this);
          return b ? b[a] : j && d[a].prop._supget ? d[a].prop._supget.apply(this) : q[a];
        },
        writeable: !1
      });
    },
        g = function g(a, b) {
      f(a), delete e[a].writeable, e[a].set = b;
    };

    g("seeking"), g("volume", function (a) {
      var c = r(this);
      if (c) a *= 1, isNaN(a) || ((0 > a || a > 1) && b.error("volume greater or less than allowed " + a / 100), O(this, "api_volume", [a], c), c.volume != a && (c.volume = a, s(c._elem, "volumechange")), c = null);else if (d.volume.prop._supset) return d.volume.prop._supset.apply(this, arguments);
    }), g("muted", function (a) {
      var b = r(this);
      if (b) a = !!a, O(this, "api_muted", [a], b), b.muted != a && (b.muted = a, s(b._elem, "volumechange")), b = null;else if (d.muted.prop._supset) return d.muted.prop._supset.apply(this, arguments);
    }), g("currentTime", function (a) {
      var b = r(this);
      if (b) a *= 1, isNaN(a) || O(this, "api_seek", [a], b);else if (d.currentTime.prop._supset) return d.currentTime.prop._supset.apply(this, arguments);
    }), ["play", "pause"].forEach(function (a) {
      e[a] = {
        value: function value() {
          var b = r(this);
          if (b) b.stopPlayPause && clearTimeout(b.stopPlayPause), O(this, "play" == a ? "api_play" : "api_pause", [], b), b._ppFlag = !0, b.paused != ("play" != a) && (b.paused = "play" != a, s(b._elem, a));else if (d[a].prop._supvalue) return d[a].prop._supvalue.apply(this, arguments);
        }
      };
    }), o.forEach(f), b.onNodeNamesPropertyModify(c, "controls", function (b, d) {
      var e = r(this);
      a(this)[d ? "addClass" : "removeClass"]("webshims-controls"), e && ("audio" == c && H(e, d), O(this, "api_controls", [d], e));
    }), b.onNodeNamesPropertyModify(c, "preload", function () {
      var c, d, e;
      I(this) && (c = r(this), c ? O(this, "api_preload", [], c) : !m || !this.paused || this.error || a.data(this, "mediaerror") || this.readyState || this.networkState || this.autoplay || !a(this).is(":not(.nonnative-api-active)") || (e = this, d = b.data(e, "mediaelementBase") || b.data(e, "mediaelementBase", {}), clearTimeout(d.loadTimer), d.loadTimer = setTimeout(function () {
        a(e).mediaLoad();
      }, 9)));
    }), d = b.defineNodeNameProperties(c, e, "prop"), i.mediaDefaultMuted || b.defineNodeNameProperties(c, {
      defaultMuted: {
        get: function get() {
          return null != a.attr(this, "muted");
        },
        set: function set(b) {
          b ? a.attr(this, "muted", "") : a(this).removeAttr("muted");
        }
      }
    }, "prop");
  });

  var P = function P() {
    if (!c.CanvasRenderingContext2D) return !1;

    var e = CanvasRenderingContext2D.prototype.drawImage,
        g = Array.prototype.slice,
        h = {
      video: 1,
      VIDEO: 1
    },
        i = {},
        j = function j() {
      var b = webshim.defineNodeNameProperty("canvas", "toBlob", {
        prop: {
          value: function value() {
            var c = a(this).callProp("getContext", ["2d"]),
                d = this,
                e = arguments,
                f = function f() {
              return b.prop._supvalue.apply(d, e);
            };

            return c.wsImageComplete && c._wsIsLoading ? void c.wsImageComplete(f) : f();
          }
        }
      });
    };

    return e || webshim.error("canvas.drawImage feature is needed. In IE8 flashvanvas pro can be used"), CanvasRenderingContext2D.prototype.wsImageComplete = function (a) {
      this._wsIsLoading ? (this._wsLoadingCbs || (this._wsLoadingCbs = []), this._wsLoadingCbs.push(a)) : a.call(this, this);
    }, CanvasRenderingContext2D.prototype.drawImage = function (a) {
      var c,
          j,
          k,
          l,
          m,
          n = this;

      if (h[a.nodeName] && (c = b.data(a, "mediaelement")) && "third" == c.isActive && c.api.api_image) {
        try {
          l = c.api.api_image();
        } catch (o) {
          b.error(o);
        }

        return i[c.currentSrc] || (i[c.currentSrc] = !0, null == l && b.error("video has to be same origin or a crossdomain.xml has to be provided. Video has to be visible for flash API")), k = g.call(arguments, 1), f.canvasSync && c.canvasImg && (k.unshift(c.canvasImg), e.apply(n, k), k = g.call(arguments, 1), m = !0), j = d.createElement("img"), j.onload = function () {
          if (k.unshift(this), j.onload = null, !(f.canvasSync && (c.canvasImg = j, m && f.noDoubbleDraw)) && (e.apply(n, k), n._wsIsLoading = !1, n._wsLoadingCbs && n._wsLoadingCbs.length)) for (; n._wsLoadingCbs.length;) {
            n._wsLoadingCbs.shift().call(n, n);
          }
        }, j.src = "data:image/jpeg;base64," + l, this._wsIsLoading = !0, void (j.complete && j.onload && j.onload());
      }

      return e.apply(this, arguments);
    }, d.createElement("canvas").toBlob ? j() : b.ready("filereader", j), !0;
  };

  if (P() || b.ready("canvas", P), k && a.cleanData) {
    var Q = a.cleanData,
        R = d.createElement("object"),
        S = {
      SetVariable: 1,
      GetVariable: 1,
      SetReturnValue: 1,
      GetReturnValue: 1
    },
        T = {
      object: 1,
      OBJECT: 1
    };

    a.cleanData = function (a) {
      var b,
          c,
          d,
          e = Q.apply(this, arguments);
      if (a && (c = a.length) && l) for (b = 0; c > b; b++) {
        if (T[a[b].nodeName] && "api_destroy" in a[b]) {
          l--;

          try {
            if (a[b].api_destroy(), 4 == a[b].readyState) for (d in a[b]) {
              S[d] || R[d] || "function" != typeof a[b][d] || (a[b][d] = null);
            }
          } catch (f) {
            console.log(f);
          }
        }
      }
      return e;
    };
  }

  if (j ? "media" in d.createElement("source") || b.reflectProperties("source", ["media"]) : (["poster", "src"].forEach(function (a) {
    b.defineNodeNamesProperty("src" == a ? ["audio", "video", "source"] : ["video"], a, {
      reflect: !0,
      propType: "src"
    });
  }), b.defineNodeNamesProperty(["audio", "video"], "preload", {
    reflect: !0,
    propType: "enumarated",
    defaultValue: "",
    limitedTo: ["", "auto", "metadata", "none"]
  }), b.reflectProperties("source", ["type", "media"]), ["autoplay", "controls"].forEach(function (a) {
    b.defineNodeNamesBooleanProperty(["audio", "video"], a);
  }), b.defineNodeNamesProperties(["audio", "video"], {
    HAVE_CURRENT_DATA: {
      value: 2
    },
    HAVE_ENOUGH_DATA: {
      value: 4
    },
    HAVE_FUTURE_DATA: {
      value: 3
    },
    HAVE_METADATA: {
      value: 1
    },
    HAVE_NOTHING: {
      value: 0
    },
    NETWORK_EMPTY: {
      value: 0
    },
    NETWORK_IDLE: {
      value: 1
    },
    NETWORK_LOADING: {
      value: 2
    },
    NETWORK_NO_SOURCE: {
      value: 3
    }
  }, "prop"), k && b.ready("WINDOWLOAD", function () {
    setTimeout(function () {
      l || (d.createElement("img").src = t);
    }, 9);
  })), j && k && !f.preferFlash) {
    var U = {
      3: 1,
      4: 1
    },
        V = function V(c) {
      var e, g, h;
      (a(c.target).is("audio, video") || (h = c.target.parentNode) && a("source", h).last()[0] == c.target) && (e = a(c.target).closest("audio, video")) && !e.hasClass("nonnative-api-active") && (g = e.prop("error"), setTimeout(function () {
        e.hasClass("nonnative-api-active") || (g && U[g.code] && (f.preferFlash = !0, d.removeEventListener("error", V, !0), a("audio, video").each(function () {
          b.mediaelement.selectSource(this);
        }), b.error("switching mediaelements option to 'preferFlash', due to an error with native player: " + c.target.currentSrc + " Mediaerror: " + e.prop("error") + " error.code: " + g.code)), b.warn("There was a mediaelement error. Run the following line in your console to get more info: webshim.mediaelement.loadDebugger();"));
      }));
    };

    d.addEventListener("error", V, !0), setTimeout(function () {
      a("audio, video").each(function () {
        var b = a.prop(this, "error");
        b && U[b] && V({
          target: this
        });
      });
    });
  }
});