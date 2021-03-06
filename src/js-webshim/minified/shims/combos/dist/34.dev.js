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
}), webshims.register("track", function (a, b, c, d) {
  "use strict";

  function e(a, c, e) {
    3 != arguments.length && b.error("wrong arguments.length for VTTCue.constructor"), this.startTime = a, this.endTime = c, this.text = e, this.onenter = null, this.onexit = null, this.pauseOnExit = !1, this.track = null, this.id = null, this.getCueAsHTML = function () {
      var a,
          b = "",
          c = "";
      return function () {
        var e, g;
        if (a || (a = d.createDocumentFragment()), b != this.text) for (b = this.text, c = f.parseCueTextToHTML(b), t.innerHTML = c, e = 0, g = t.childNodes.length; g > e; e++) {
          a.appendChild(t.childNodes[e].cloneNode(!0));
        }
        return a.cloneNode(!0);
      };
    }();
  }

  var f = b.mediaelement,
      g = (new Date().getTime(), {
    subtitles: 1,
    captions: 1,
    descriptions: 1
  }),
      h = a("<track />"),
      i = b.support,
      j = i.ES5 && i.objectAccessor,
      k = function k(a) {
    var c = {};
    return a.addEventListener = function (a, d) {
      c[a] && b.error("always use $.on to the shimed event: " + a + " already bound fn was: " + c[a] + " your fn was: " + d), c[a] = d;
    }, a.removeEventListener = function (a, d) {
      c[a] && c[a] != d && b.error("always use $.on/$.off to the shimed event: " + a + " already bound fn was: " + c[a] + " your fn was: " + d), c[a] && delete c[a];
    }, a;
  },
      l = {
    getCueById: function getCueById(a) {
      for (var b = null, c = 0, d = this.length; d > c; c++) {
        if (this[c].id === a) {
          b = this[c];
          break;
        }
      }

      return b;
    }
  },
      m = {
    0: "disabled",
    1: "hidden",
    2: "showing"
  },
      n = {
    shimActiveCues: null,
    _shimActiveCues: null,
    activeCues: null,
    cues: null,
    kind: "subtitles",
    label: "",
    language: "",
    id: "",
    mode: "disabled",
    oncuechange: null,
    toString: function toString() {
      return "[object TextTrack]";
    },
    addCue: function addCue(a) {
      if (this.cues) {
        var c = this.cues[this.cues.length - 1];
        if (c && c.startTime > a.startTime) return void b.error("cue startTime higher than previous cue's startTime");
      } else this.cues = f.createCueList();

      a.startTime >= a.endTime && webshim.error("startTime >= endTime of cue: " + a.text), a.track && a.track.removeCue && a.track.removeCue(a), a.track = this, this.cues.push(a);
    },
    removeCue: function removeCue(a) {
      var c = this.cues || [],
          d = 0,
          e = c.length;
      if (a.track != this) return void b.error("cue not part of track");

      for (; e > d; d++) {
        if (c[d] === a) {
          c.splice(d, 1), a.track = null;
          break;
        }
      }

      return a.track ? void b.error("cue not part of track") : void 0;
    }
  },
      o = ["kind", "label", "srclang"],
      p = {
    srclang: "language"
  },
      q = function q(c, d) {
    var e,
        f,
        g = !1,
        h = [],
        i = [],
        j = [];
    if (c || (c = b.data(this, "mediaelementBase") || b.data(this, "mediaelementBase", {})), d || (c.blockTrackListUpdate = !0, d = a.prop(this, "textTracks"), c.blockTrackListUpdate = !1), clearTimeout(c.updateTrackListTimer), a("track", this).each(function () {
      var b = a.prop(this, "track");
      j.push(b), -1 == d.indexOf(b) && i.push(b);
    }), c.scriptedTextTracks) for (e = 0, f = c.scriptedTextTracks.length; f > e; e++) {
      j.push(c.scriptedTextTracks[e]), -1 == d.indexOf(c.scriptedTextTracks[e]) && i.push(c.scriptedTextTracks[e]);
    }

    for (e = 0, f = d.length; f > e; e++) {
      -1 == j.indexOf(d[e]) && h.push(d[e]);
    }

    if (h.length || i.length) {
      for (d.splice(0), e = 0, f = j.length; f > e; e++) {
        d.push(j[e]);
      }

      for (e = 0, f = h.length; f > e; e++) {
        a([d]).triggerHandler(a.Event({
          type: "removetrack",
          track: h[e]
        }));
      }

      for (e = 0, f = i.length; f > e; e++) {
        a([d]).triggerHandler(a.Event({
          type: "addtrack",
          track: i[e]
        }));
      }

      (c.scriptedTextTracks || h.length) && a(this).triggerHandler("updatetrackdisplay");
    }

    for (e = 0, f = d.length; f > e; e++) {
      d[e].__wsmode != d[e].mode && (d[e].__wsmode = d[e].mode, g = !0);
    }

    g && a([d]).triggerHandler("change");
  },
      r = function r(c, d) {
    d || (d = b.data(c, "trackData")), d && !d.isTriggering && (d.isTriggering = !0, setTimeout(function () {
      a(c).closest("audio, video").triggerHandler("updatetrackdisplay"), d.isTriggering = !1;
    }, 9));
  },
      s = function () {
    var c = {
      subtitles: {
        subtitles: 1,
        captions: 1
      },
      descriptions: {
        descriptions: 1
      },
      chapters: {
        chapters: 1
      }
    };
    return c.captions = c.subtitles, function (d) {
      var e,
          f,
          g = a.prop(d, "default");
      return g && "metadata" != (e = a.prop(d, "kind")) && (f = a(d).parent().find("track[default]").filter(function () {
        return !!c[e][a.prop(this, "kind")];
      })[0], f != d && (g = !1, b.error("more than one default track of a specific kind detected. Fall back to default = false"))), g;
    };
  }(),
      t = a("<div />")[0];

  c.VTTCue = e, c.TextTrackCue = function () {
    b.error("Use VTTCue constructor instead of abstract TextTrackCue constructor."), e.apply(this, arguments);
  }, c.TextTrackCue.prototype = e.prototype, f.createCueList = function () {
    return a.extend([], l);
  }, f.parseCueTextToHTML = function () {
    var a = /(<\/?[^>]+>)/gi,
        b = /^(?:c|v|ruby|rt|b|i|u)/,
        c = /\<\s*\//,
        d = function d(a, b, _d, e) {
      var f;
      return c.test(e) ? f = "</" + a + ">" : (_d.splice(0, 1), f = "<" + a + " " + b + '="' + _d.join(" ").replace(/\"/g, "&#34;") + '">'), f;
    },
        e = function e(a) {
      var c = a.replace(/[<\/>]+/gi, "").split(/[\s\.]+/);
      return c[0] && (c[0] = c[0].toLowerCase(), b.test(c[0]) ? "c" == c[0] ? a = d("span", "class", c, a) : "v" == c[0] && (a = d("q", "title", c, a)) : a = ""), a;
    };

    return function (b) {
      return b.replace(a, e);
    };
  }();

  var u = function u(b) {
    var c = b + "",
        d = this.getAttribute("begin") || "",
        e = this.getAttribute("end") || "",
        f = a.trim(a.text(this));
    return /\./.test(d) || (d += ".000"), /\./.test(e) || (e += ".000"), c += "\n", c += d + " --> " + e + "\n", c += f;
  },
      v = function v(b) {
    return b = a.parseXML(b) || [], a(b).find("[begin][end]").map(u).get().join("\n\n") || "";
  },
      w = 0;

  f.loadTextTrack = function (c, d, e, h) {
    var i = "play playing loadedmetadata loadstart",
        j = e.track,
        k = function k() {
      var g,
          h,
          l,
          m = "disabled" == j.mode,
          n = !(!(a.prop(c, "readyState") > 0 || 2 == a.prop(c, "networkState")) && a.prop(c, "paused")),
          o = (!m || n) && a.attr(d, "src") && a.prop(d, "src");

      if (o && (a(c).off(i, k).off("updatetrackdisplay", k), !e.readyState)) {
        g = function g() {
          w--, e.readyState = 3, j.cues = null, j.activeCues = j.shimActiveCues = j._shimActiveCues = null, a(d).triggerHandler("error");
        }, e.readyState = 1;

        try {
          j.cues = f.createCueList(), j.activeCues = j.shimActiveCues = j._shimActiveCues = f.createCueList(), w++, l = function l() {
            h = a.ajax({
              dataType: "text",
              url: o,
              success: function success(i) {
                w--;
                var k = h.getResponseHeader("content-type") || "";
                k.indexOf("application/xml") ? k.indexOf("text/vtt") && b.error("set the mime-type of your WebVTT files to text/vtt. see: http://dev.w3.org/html5/webvtt/#text/vtt") : i = v(i), f.parseCaptions(i, j, function (b) {
                  b && "length" in b ? (e.readyState = 2, a(d).triggerHandler("load"), a(c).triggerHandler("updatetrackdisplay")) : g();
                });
              },
              error: g
            });
          }, m ? setTimeout(l, 2 * w) : l();
        } catch (p) {
          g(), b.error(p);
        }
      }
    };

    e.readyState = 0, j.shimActiveCues = null, j._shimActiveCues = null, j.activeCues = null, j.cues = null, a(c).on(i, k), h ? (j.mode = g[j.kind] ? "showing" : "hidden", k()) : a(c).on("updatetrackdisplay", k);
  }, f.createTextTrack = function (c, d) {
    var e, g;
    return d.nodeName && (g = b.data(d, "trackData"), g && (r(d, g), e = g.track)), e || (e = k(b.objectCreate(n)), j || o.forEach(function (b) {
      var c = a.prop(d, b);
      c && (e[p[b] || b] = c);
    }), d.nodeName ? (j && o.forEach(function (c) {
      b.defineProperty(e, p[c] || c, {
        get: function get() {
          return a.prop(d, c);
        }
      });
    }), e.id = a(d).prop("id"), g = b.data(d, "trackData", {
      track: e
    }), f.loadTextTrack(c, d, g, s(d))) : (j && o.forEach(function (a) {
      b.defineProperty(e, p[a] || a, {
        value: d[a],
        writeable: !1
      });
    }), e.cues = f.createCueList(), e.activeCues = e._shimActiveCues = e.shimActiveCues = f.createCueList(), e.mode = "hidden", e.readyState = 2), "subtitles" != e.kind || e.language || b.error("you must provide a language for track in subtitles state"), e.__wsmode = e.mode, b.defineProperty(e, "_wsUpdateMode", {
      value: function value() {
        a(c).triggerHandler("updatetrackdisplay");
      },
      enumerable: !1
    })), e;
  }, a.propHooks.mode || (a.propHooks.mode = {
    set: function set(a, b) {
      return a.mode = b, a._wsUpdateMode && a._wsUpdateMode.call && a._wsUpdateMode(), a.mode;
    }
  }), f.parseCaptionChunk = function () {
    var a = /^(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s+\-\-\>\s+(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/,
        c = /^(DEFAULTS|DEFAULT)\s+\-\-\>\s+(.*)/g,
        d = /^(STYLE|STYLES)\s+\-\-\>\s*\n([\s\S]*)/g,
        f = /^(COMMENT|COMMENTS)\s+\-\-\>\s+(.*)/g,
        g = /^(\d{2})?:?(\d{2}):(\d{2})[\.\,](\d+)\s+\-\-\>\s+(\d{2})?:?(\d{2}):(\d{2})[\.\,](\d+)\s*(.*)/;
    return function (h) {
      var i, j, k, l, m, n, o, p, q;
      if (c.exec(h) || f.exec(h) || d.exec(h)) return null;

      for (i = h.split(/\n/g); !i[0].replace(/\s+/gi, "").length && i.length > 0;) {
        i.shift();
      }

      for (i[0].match(/^\s*[a-z0-9-\_]+\s*$/gi) && (o = String(i.shift().replace(/\s*/gi, ""))), n = 0; n < i.length; n++) {
        var r = i[n];
        ((p = a.exec(r)) || (p = g.exec(r))) && (m = p.slice(1), j = parseInt(60 * (m[0] || 0) * 60, 10) + parseInt(60 * (m[1] || 0), 10) + parseInt(m[2] || 0, 10) + parseFloat("0." + (m[3] || 0)), k = parseInt(60 * (m[4] || 0) * 60, 10) + parseInt(60 * (m[5] || 0), 10) + parseInt(m[6] || 0, 10) + parseFloat("0." + (m[7] || 0))), i = i.slice(0, n).concat(i.slice(n + 1));
        break;
      }

      return j || k ? (l = i.join("\n"), q = new e(j, k, l), o && (q.id = o), q) : (b.warn("couldn't extract time information: " + [j, k, i.join("\n"), o].join(" ; ")), null);
    };
  }(), f.parseCaptions = function (a, c, d) {
    var e, _g, h, i, j;

    f.createCueList(), a ? (h = /^WEBVTT(\s*FILE)?/gi, _g = function g(k, l) {
      for (; l > k; k++) {
        if (e = a[k], h.test(e) ? j = !0 : e.replace(/\s*/gi, "").length && (e = f.parseCaptionChunk(e, k), e && c.addCue(e)), i < new Date().getTime() - 30) {
          k++, setTimeout(function () {
            i = new Date().getTime(), _g(k, l);
          }, 90);
          break;
        }
      }

      k >= l && (j || b.error("please use WebVTT format. This is the standard"), d(c.cues));
    }, a = a.replace(/\r\n/g, "\n"), setTimeout(function () {
      a = a.replace(/\r/g, "\n"), setTimeout(function () {
        i = new Date().getTime(), a = a.split(/\n\n+/g), _g(0, a.length);
      }, 9);
    }, 9)) : b.error("Required parameter captionData not supplied.");
  }, f.createTrackList = function (c, d) {
    return d = d || b.data(c, "mediaelementBase") || b.data(c, "mediaelementBase", {}), d.textTracks || (d.textTracks = [], b.defineProperties(d.textTracks, {
      onaddtrack: {
        value: null
      },
      onremovetrack: {
        value: null
      },
      onchange: {
        value: null
      },
      getTrackById: {
        value: function value(a) {
          for (var b = null, c = 0; c < d.textTracks.length; c++) {
            if (a == d.textTracks[c].id) {
              b = d.textTracks[c];
              break;
            }
          }

          return b;
        }
      }
    }), k(d.textTracks), a(c).on("updatetrackdisplay", function () {
      for (var b, c = 0; c < d.textTracks.length; c++) {
        b = d.textTracks[c], b.__wsmode != b.mode && (b.__wsmode = b.mode, a([d.textTracks]).triggerHandler("change"));
      }
    })), d.textTracks;
  }, i.track || (b.defineNodeNamesBooleanProperty(["track"], "default"), b.reflectProperties(["track"], ["srclang", "label"]), b.defineNodeNameProperties("track", {
    src: {
      reflect: !0,
      propType: "src"
    }
  })), b.defineNodeNameProperties("track", {
    kind: {
      attr: i.track ? {
        set: function set(a) {
          var c = b.data(this, "trackData");
          this.setAttribute("data-kind", a), c && (c.attrKind = a);
        },
        get: function get() {
          var a = b.data(this, "trackData");
          return a && "attrKind" in a ? a.attrKind : this.getAttribute("kind");
        }
      } : {},
      reflect: !0,
      propType: "enumarated",
      defaultValue: "subtitles",
      limitedTo: ["subtitles", "captions", "descriptions", "chapters", "metadata"]
    }
  }), a.each(o, function (c, d) {
    var e = p[d] || d;
    b.onNodeNamesPropertyModify("track", d, function () {
      var c = b.data(this, "trackData");
      c && ("kind" == d && r(this, c), j || (c.track[e] = a.prop(this, d)));
    });
  }), b.onNodeNamesPropertyModify("track", "src", function (c) {
    if (c) {
      var d,
          e = b.data(this, "trackData");
      e && (d = a(this).closest("video, audio"), d[0] && f.loadTextTrack(d, this, e));
    }
  }), b.defineNodeNamesProperties(["track"], {
    ERROR: {
      value: 3
    },
    LOADED: {
      value: 2
    },
    LOADING: {
      value: 1
    },
    NONE: {
      value: 0
    },
    readyState: {
      get: function get() {
        return (b.data(this, "trackData") || {
          readyState: 0
        }).readyState;
      },
      writeable: !1
    },
    track: {
      get: function get() {
        return f.createTextTrack(a(this).closest("audio, video")[0], this);
      },
      writeable: !1
    }
  }, "prop"), b.defineNodeNamesProperties(["audio", "video"], {
    textTracks: {
      get: function get() {
        var a = this,
            c = b.data(a, "mediaelementBase") || b.data(a, "mediaelementBase", {}),
            d = f.createTrackList(a, c);
        return c.blockTrackListUpdate || q.call(a, c, d), d;
      },
      writeable: !1
    },
    addTextTrack: {
      value: function value(a, c, d) {
        var e = f.createTextTrack(this, {
          kind: h.prop("kind", a || "").prop("kind"),
          label: c || "",
          srclang: d || ""
        }),
            g = b.data(this, "mediaelementBase") || b.data(this, "mediaelementBase", {});
        return g.scriptedTextTracks || (g.scriptedTextTracks = []), g.scriptedTextTracks.push(e), q.call(this), e;
      }
    }
  }, "prop");

  var x = function x(c) {
    if (a(c.target).is("audio, video")) {
      var d = b.data(c.target, "mediaelementBase");
      d && (clearTimeout(d.updateTrackListTimer), d.updateTrackListTimer = setTimeout(function () {
        q.call(c.target, d);
      }, 0));
    }
  },
      y = function y(a, b) {
    return b.readyState || a.readyState;
  },
      z = function z(a) {
    a.originalEvent && a.stopImmediatePropagation();
  },
      A = function A() {
    if (b.implement(this, "track")) {
      var c,
          d = this.track;
      d && (b.bugs.track || !d.mode && !y(this, d) || (a.prop(this, "track").mode = m[d.mode] || d.mode), c = a.prop(this, "kind"), d.mode = "string" == typeof d.mode ? "disabled" : 0, this.kind = "metadata", a(this).attr({
        kind: c
      })), a(this).on("load error", z);
    }
  };

  b.addReady(function (c, d) {
    var e = d.filter("video, audio, track").closest("audio, video");
    a("video, audio", c).add(e).each(function () {
      q.call(this);
    }).on("emptied updatetracklist wsmediareload", x).each(function () {
      if (i.track) {
        var c = a.prop(this, "textTracks"),
            d = this.textTracks;
        c.length != d.length && b.warn("textTracks couldn't be copied"), a("track", this).each(A);
      }
    }), e.each(function () {
      var a = this,
          c = b.data(a, "mediaelementBase");
      c && (clearTimeout(c.updateTrackListTimer), c.updateTrackListTimer = setTimeout(function () {
        q.call(a, c);
      }, 9));
    });
  }), i.texttrackapi && a("video, audio").trigger("trackapichange");
});