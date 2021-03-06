"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!	SWFMini - a SWFObject 2.2 cut down version for webshims
 * 
 * based on SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfmini = function () {
  function a() {
    if (!s) {
      s = !0;

      for (var a = r.length, b = 0; a > b; b++) {
        r[b]();
      }
    }
  }

  function b(a) {
    s ? a() : r[r.length] = a;
  }

  function c() {
    q && d();
  }

  function d() {
    var a = o.getElementsByTagName("body")[0],
        b = e(i);
    b.setAttribute("type", m);
    var c = a.appendChild(b);

    if (c) {
      var d = 0;
      !function () {
        if (_typeof(c.GetVariable) != h) {
          var e = c.GetVariable("$version");
          e && (e = e.split(" ")[1].split(","), u.pv = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)]);
        } else if (10 > d) return d++, void setTimeout(arguments.callee, 10);

        a.removeChild(b), c = null;
      }();
    }
  }

  function e(a) {
    return o.createElement(a);
  }

  function f(a) {
    var b = u.pv,
        c = a.split(".");
    return c[0] = parseInt(c[0], 10), c[1] = parseInt(c[1], 10) || 0, c[2] = parseInt(c[2], 10) || 0, b[0] > c[0] || b[0] == c[0] && b[1] > c[1] || b[0] == c[0] && b[1] == c[1] && b[2] >= c[2] ? !0 : !1;
  }

  var g = function g() {
    j.error("This method was removed from swfmini");
  },
      h = "undefined",
      i = "object",
      j = window.webshims,
      k = "Shockwave Flash",
      l = "ShockwaveFlash.ShockwaveFlash",
      m = "application/x-shockwave-flash",
      n = window,
      o = document,
      p = navigator,
      q = !1,
      r = [c],
      s = !1,
      t = !0,
      u = function () {
    var a = _typeof(o.getElementById) != h && _typeof(o.getElementsByTagName) != h && _typeof(o.createElement) != h,
        b = p.userAgent.toLowerCase(),
        c = p.platform.toLowerCase(),
        d = /win/.test(c ? c : b),
        e = /mac/.test(c ? c : b),
        f = /webkit/.test(b) ? parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
        g = !1,
        j = [0, 0, 0],
        r = null;
    if (_typeof(p.plugins) != h && _typeof(p.plugins[k]) == i) r = p.plugins[k].description, !r || _typeof(p.mimeTypes) != h && p.mimeTypes[m] && !p.mimeTypes[m].enabledPlugin || (q = !0, g = !1, r = r.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), j[0] = parseInt(r.replace(/^(.*)\..*$/, "$1"), 10), j[1] = parseInt(r.replace(/^.*\.(.*)\s.*$/, "$1"), 10), j[2] = /[a-zA-Z]/.test(r) ? parseInt(r.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);else if (_typeof(n.ActiveXObject) != h) try {
      var s = new ActiveXObject(l);
      s && (r = s.GetVariable("$version"), r && (g = !0, r = r.split(" ")[1].split(","), j = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)]));
    } catch (t) {}
    return {
      w3: a,
      pv: j,
      wk: f,
      ie: g,
      win: d,
      mac: e
    };
  }();

  j.ready("DOM", a), j.loader.addModule("swfmini-embed", {
    d: ["swfmini"]
  });
  var v = f("9.0.0") ? function () {
    return j.loader.loadList(["swfmini-embed"]), !0;
  } : j.$.noop;
  return j.support.mediaelement ? j.ready("WINDOWLOAD", v) : v(), {
    registerObject: g,
    getObjectById: g,
    embedSWF: function embedSWF(a, b, c, d, e, f, g, h, i, k) {
      var l = arguments;
      v() ? j.ready("swfmini-embed", function () {
        swfmini.embedSWF.apply(swfmini, l);
      }) : k && k({
        success: !1,
        id: b
      });
    },
    switchOffAutoHideShow: function switchOffAutoHideShow() {
      t = !1;
    },
    ua: u,
    getFlashPlayerVersion: function getFlashPlayerVersion() {
      return {
        major: u.pv[0],
        minor: u.pv[1],
        release: u.pv[2]
      };
    },
    hasFlashPlayerVersion: f,
    createSWF: function (_createSWF) {
      function createSWF(_x, _x2, _x3) {
        return _createSWF.apply(this, arguments);
      }

      createSWF.toString = function () {
        return _createSWF.toString();
      };

      return createSWF;
    }(function (a, b, c) {
      return u.w3 ? createSWF(a, b, c) : void 0;
    }),
    showExpressInstall: g,
    removeSWF: g,
    createCSS: g,
    addDomLoadEvent: b,
    addLoadEvent: g,
    expressInstallCallback: g
  };
}();

webshims.isReady("swfmini", !0), function (a) {
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
}), webshims.register("form-core", function (a, b, c, d, e, f) {
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
}), function (a) {
  "use strict";

  var b = a.support,
      c = b.mediaelement,
      d = !1,
      e = a.bugs,
      f = "mediaelement-jaris",
      g = function g() {
    a.ready(f, function () {
      a.mediaelement.createSWF || (a.mediaelement.loadSwf = !0, a.reTest([f], c));
    });
  },
      h = a.cfg,
      i = h.mediaelement,
      j = -1 != navigator.userAgent.indexOf("MSIE");

  if (!i) return void a.error("mediaelement wasn't implemented but loaded");

  if (c) {
    var k = document.createElement("video");
    b.videoBuffered = "buffered" in k, b.mediaDefaultMuted = "defaultMuted" in k, d = "loop" in k, b.mediaLoop = d, a.capturingEvents(["play", "playing", "waiting", "paused", "ended", "durationchange", "loadedmetadata", "canplay", "volumechange"]), (!b.videoBuffered || !d || !b.mediaDefaultMuted && j && "ActiveXObject" in window) && (a.addPolyfill("mediaelement-native-fix", {
      d: ["dom-support"]
    }), a.loader.loadList(["mediaelement-native-fix"]));
  }

  b.track && !e.track && !function () {
    if (!e.track) {
      window.VTTCue && !window.TextTrackCue ? window.TextTrackCue = window.VTTCue : window.VTTCue || (window.VTTCue = window.TextTrackCue);

      try {
        new VTTCue(2, 3, "");
      } catch (a) {
        e.track = !0;
      }
    }
  }(), window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype && (CanvasRenderingContext2D.prototype.wsImageComplete = function (a) {
    a.call(this, this);
  }), a.register("mediaelement-core", function (a, e, h, i, j, k) {
    var l = swfmini.hasFlashPlayerVersion("11.3"),
        m = e.mediaelement,
        n = !1;

    m.parseRtmp = function (a) {
      var b,
          c,
          d,
          f = a.src.split("://"),
          g = f[1].split("/");

      for (a.server = f[0] + "://" + g[0] + "/", a.streamId = [], b = 1, c = g.length; c > b; b++) {
        d || -1 === g[b].indexOf(":") || (g[b] = g[b].split(":")[1], d = !0), d ? a.streamId.push(g[b]) : a.server += g[b] + "/";
      }

      a.streamId.length || e.error("Could not parse rtmp url"), a.streamId = a.streamId.join("/");
    };

    var o = function o(b, c) {
      b = a(b);
      var d,
          e = {
        src: b.attr("src") || "",
        elem: b,
        srcProp: b.prop("src")
      };
      return e.src ? (d = b.attr("data-server"), null != d && (e.server = d), d = b.attr("type") || b.attr("data-type"), d ? (e.type = d, e.container = a.trim(d.split(";")[0])) : (c || (c = b[0].nodeName.toLowerCase(), "source" == c && (c = (b.closest("video, audio")[0] || {
        nodeName: "video"
      }).nodeName.toLowerCase())), e.server ? (e.type = c + "/rtmp", e.container = c + "/rtmp") : (d = m.getTypeForSrc(e.src, c, e), d && (e.type = d, e.container = d))), d = b.attr("media"), d && (e.media = d), ("audio/rtmp" == e.type || "video/rtmp" == e.type) && (e.server ? e.streamId = e.src : m.parseRtmp(e)), e) : e;
    },
        p = !l && "postMessage" in h && c,
        q = function q() {
      q.loaded || (q.loaded = !0, k.noAutoTrack || e.ready("WINDOWLOAD", function () {
        s(), e.loader.loadList(["track-ui"]);
      }));
    },
        r = function () {
      var b;
      return function () {
        !b && p && (b = !0, n && e.loader.loadScript("https://www.youtube.com/player_api"), a(function () {
          e._polyfill(["mediaelement-yt"]);
        }));
      };
    }(),
        s = function s() {
      l ? g() : r();
    };

    e.addPolyfill("mediaelement-yt", {
      test: !p,
      d: ["dom-support"]
    }), m.mimeTypes = {
      audio: {
        "audio/ogg": ["ogg", "oga", "ogm"],
        'audio/ogg;codecs="opus"': "opus",
        "audio/mpeg": ["mp2", "mp3", "mpga", "mpega"],
        "audio/mp4": ["mp4", "mpg4", "m4r", "m4a", "m4p", "m4b", "aac"],
        "audio/wav": ["wav"],
        "audio/3gpp": ["3gp", "3gpp"],
        "audio/webm": ["webm"],
        "audio/fla": ["flv", "f4a", "fla"],
        "application/x-mpegURL": ["m3u8", "m3u"]
      },
      video: {
        "video/ogg": ["ogg", "ogv", "ogm"],
        "video/mpeg": ["mpg", "mpeg", "mpe"],
        "video/mp4": ["mp4", "mpg4", "m4v"],
        "video/quicktime": ["mov", "qt"],
        "video/x-msvideo": ["avi"],
        "video/x-ms-asf": ["asf", "asx"],
        "video/flv": ["flv", "f4v"],
        "video/3gpp": ["3gp", "3gpp"],
        "video/webm": ["webm"],
        "application/x-mpegURL": ["m3u8", "m3u"],
        "video/MP2T": ["ts"]
      }
    }, m.mimeTypes.source = a.extend({}, m.mimeTypes.audio, m.mimeTypes.video), m.getTypeForSrc = function (b, c) {
      if (-1 != b.indexOf("youtube.com/watch?") || -1 != b.indexOf("youtube.com/v/")) return "video/youtube";
      if (!b.indexOf("mediastream:") || !b.indexOf("blob:http")) return "usermedia";
      if (!b.indexOf("webshimstream")) return "jarisplayer/stream";
      if (!b.indexOf("rtmp")) return c + "/rtmp";
      b = b.split("?")[0].split("#")[0].split("."), b = b[b.length - 1];
      var d;
      return a.each(m.mimeTypes[c], function (a, c) {
        return -1 !== c.indexOf(b) ? (d = a, !1) : void 0;
      }), d;
    }, m.srces = function (b) {
      var c = [];
      b = a(b);
      var d = b[0].nodeName.toLowerCase(),
          e = o(b, d);
      return e.src ? c.push(e) : a("source", b).each(function () {
        e = o(this, d), e.src && c.push(e);
      }), c;
    }, m.swfMimeTypes = ["video/3gpp", "video/x-msvideo", "video/quicktime", "video/x-m4v", "video/mp4", "video/m4p", "video/x-flv", "video/flv", "audio/mpeg", "audio/aac", "audio/mp4", "audio/x-m4a", "audio/m4a", "audio/mp3", "audio/x-fla", "audio/fla", "youtube/flv", "video/jarisplayer", "jarisplayer/jarisplayer", "jarisplayer/stream", "video/youtube", "video/rtmp", "audio/rtmp"], m.canThirdPlaySrces = function (b, c) {
      var d = "";
      return (l || p) && (b = a(b), c = c || m.srces(b), a.each(c, function (a, b) {
        return b.container && b.src && (l && -1 != m.swfMimeTypes.indexOf(b.container) || p && "video/youtube" == b.container) ? (d = b, !1) : void 0;
      })), d;
    };
    var t = {};

    m.canNativePlaySrces = function (b, d) {
      var e = "";

      if (c) {
        b = a(b);
        var f = (b[0].nodeName || "").toLowerCase(),
            g = (t[f] || {
          prop: {
            _supvalue: !1
          }
        }).prop._supvalue || b[0].canPlayType;
        if (!g) return e;
        d = d || m.srces(b), a.each(d, function (a, c) {
          return "usermedia" == c.type || c.type && g.call(b[0], c.type) ? (e = c, !1) : void 0;
        });
      }

      return e;
    };

    var u = /^\s*application\/octet\-stream\s*$/i,
        v = function v() {
      var b = u.test(a.attr(this, "type") || "");
      return b && a(this).removeAttr("type"), b;
    };

    m.setError = function (b, c) {
      if (a("source", b).filter(v).length) {
        e.error('"application/octet-stream" is a useless mimetype for audio/video. Please change this attribute.');

        try {
          a(b).mediaLoad();
        } catch (d) {}
      } else c || (c = "can't play sources"), a(b).pause().data("mediaerror", c), e.error("mediaelementError: " + c + ". Run the following line in your console to get more info: webshim.mediaelement.loadDebugger();"), setTimeout(function () {
        a(b).data("mediaerror") && a(b).addClass("media-error").trigger("mediaerror");
      }, 1);
    };

    var w = function () {
      var b,
          c = l ? f : "mediaelement-yt";
      return function (d, f, g) {
        e.ready(c, function () {
          m.createSWF && a(d).parent()[0] ? m.createSWF(d, f, g) : b || (b = !0, s(), w(d, f, g));
        }), b || !p || m.createSWF || (n = !0, r());
      };
    }(),
        x = {
      "native": function native(a, b, c) {
        c && "third" == c.isActive && m.setActive(a, "html5", c);
      },
      third: w
    },
        y = function y(a, b, c) {
      var d,
          e,
          f = [{
        test: "canNativePlaySrces",
        activate: "native"
      }, {
        test: "canThirdPlaySrces",
        activate: "third"
      }];

      for ((k.preferFlash || b && "third" == b.isActive) && f.reverse(), d = 0; 2 > d; d++) {
        if (e = m[f[d].test](a, c)) {
          x[f[d].activate](a, e, b);
          break;
        }
      }

      e || (m.setError(a, !1), b && "third" == b.isActive && m.setActive(a, "html5", b));
    },
        z = /^(?:embed|object|datalist|picture)$/i,
        A = function A(b, c) {
      var d = e.data(b, "mediaelementBase") || e.data(b, "mediaelementBase", {}),
          f = m.srces(b),
          g = b.parentNode;
      clearTimeout(d.loadTimer), a(b).removeClass("media-error"), a.data(b, "mediaerror", !1), f.length && g && 1 == g.nodeType && !z.test(g.nodeName || "") && (c = c || e.data(b, "mediaelement"), m.sortMedia && f.sort(m.sortMedia), y(b, c, f));
    };

    m.selectSource = A, a(i).on("ended", function (b) {
      var c = e.data(b.target, "mediaelement");
      (!d || c && "html5" != c.isActive || a.prop(b.target, "loop")) && setTimeout(function () {
        !a.prop(b.target, "paused") && a.prop(b.target, "loop") && a(b.target).prop("currentTime", 0).play();
      });
    });

    var B = !1,
        C = function C() {
      var f = function f() {
        e.implement(this, "mediaelement") && (A(this), b.mediaDefaultMuted || null == a.attr(this, "muted") || a.prop(this, "muted", !0));
      };

      e.ready("dom-support", function () {
        B = !0, d || e.defineNodeNamesBooleanProperty(["audio", "video"], "loop"), ["audio", "video"].forEach(function (b) {
          var d;
          d = e.defineNodeNameProperty(b, "load", {
            prop: {
              value: function value() {
                var b = e.data(this, "mediaelement");
                A(this, b), !c || b && "html5" != b.isActive || !d.prop._supvalue || d.prop._supvalue.apply(this, arguments), !q.loaded && this.querySelector("track") && q(), a(this).triggerHandler("wsmediareload");
              }
            }
          }), t[b] = e.defineNodeNameProperty(b, "canPlayType", {
            prop: {
              value: function value(d) {
                var e = "";
                return c && t[b].prop._supvalue && (e = t[b].prop._supvalue.call(this, d), "no" == e && (e = "")), !e && l && (d = a.trim((d || "").split(";")[0]), -1 != m.swfMimeTypes.indexOf(d) && (e = "maybe")), !e && p && "video/youtube" == d && (e = "maybe"), e;
              }
            }
          });
        }), e.onNodeNamesPropertyModify(["audio", "video"], ["src", "poster"], {
          set: function set() {
            var a = this,
                b = e.data(a, "mediaelementBase") || e.data(a, "mediaelementBase", {});
            clearTimeout(b.loadTimer), b.loadTimer = setTimeout(function () {
              A(a), a = null;
            }, 9);
          }
        }), e.addReady(function (b, c) {
          var d = a("video, audio", b).add(c.filter("video, audio")).each(f);
          !q.loaded && a("track", d).length && q(), d = null;
        });
      }), c && !B && e.addReady(function (b, c) {
        B || a("video, audio", b).add(c.filter("video, audio")).each(function () {
          return m.canNativePlaySrces(this) ? void 0 : (n = !0, s(), B = !0, !1);
        });
      });
    };

    m.loadDebugger = function () {
      e.ready("dom-support", function () {
        e.loader.loadScript("mediaelement-debug");
      });
    }, {
      noCombo: 1,
      media: 1
    }[e.cfg.debug] && a(i).on("mediaerror", function () {
      m.loadDebugger();
    }), c ? (e.isReady("mediaelement-core", !0), C(), e.ready("WINDOWLOAD mediaelement", s)) : e.ready(f, C), e.ready("track", q), "complete" == i.readyState && e.isReady("WINDOWLOAD", !0);
  });
}(webshims);