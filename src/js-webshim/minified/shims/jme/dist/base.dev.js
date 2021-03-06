"use strict";

webshims.register("jmebase", function (a, b, c, d, e) {
  "use strict";

  var f = {},
      g = {},
      h = Array.prototype.slice,
      i = 0,
      j = a.extend({
    selector: ".mediaplayer"
  }, b.cfg.mediaelement.jme),
      k = j.selector;
  b.cfg.mediaelement.jme = j, a.jme || (a.jme = {}), a.extend(a.jme, {
    pluginsClasses: [],
    pluginsSel: "",
    plugins: {},
    props: f,
    fns: g,
    data: function data(b, c, d) {
      var f = a(b).data("jme") || a.data(b, "jme", {});
      return d === e ? c ? f[c] : f : void (f[c] = d);
    },
    runPlugin: function runPlugin(b) {
      i && a(document.querySelectorAll(k)).each(function () {
        var c = this.querySelectorAll(b);
        c.length && a(this).jmeFn("addControls", c);
      });
    },
    registerPlugin: function registerPlugin(b, c) {
      this.plugins[b] = c, c.nodeName || (c.nodeName = ""), c.className || (c.className = b), this.pluginsClasses.push("." + c.className), this.pluginsSel = this.pluginsClasses.join(", "), j[b] = a.extend(c.options || {}, j[b]), j[b] && j[b].text ? c.text = j[b].text : j.i18n && j.i18n[b] && (c.text = j.i18n[b]), this.runPlugin("." + c.className);
    },
    configmenuPlugins: {},
    addToConfigmenu: function addToConfigmenu(a, b) {
      this.configmenuPlugins[a] = b;
    },
    defineMethod: function defineMethod(a, b) {
      g[a] = b;
    },
    defineProp: function defineProp(b, c) {
      c || (c = {}), c.set || (c.set = c.readonly ? function () {
        throw b + " is readonly";
      } : a.noop), c.get || (c.get = function (c) {
        return a.jme.data(c, b);
      }), f[b] = c;
    },
    prop: function prop(b, c, d) {
      if (!f[c]) return a.prop(b, c, d);
      if (d === e) return f[c].get(b);
      var g = f[c].set(b, d);
      g === e && (g = d), "noDataSet" != g && a.jme.data(b, c, g);
    }
  }), a.fn.jmeProp = function (b, c) {
    return a.access(this, a.jme.prop, b, c, arguments.length > 1);
  }, a.fn.jmeFn = function (c) {
    var d,
        f = h.call(arguments, 1);
    return this.each(function () {
      return a.jme.data(this).media || (a(this).closest(k).jmePlayer(), b.warn("jmeFn called to early or on wrong element!")), d = (g[c] || a.prop(this, c)).apply(this, f), d !== e ? !1 : void 0;
    }), d !== e ? d : this;
  };
  var l = {
    emptied: 1,
    pause: 1
  },
      m = {
    canplay: 1,
    canplaythrough: 1
  };
  a.jme.initJME = function (b, c) {
    i += a(b.querySelectorAll(k)).add(c.filter(k)).jmePlayer().length;
  }, a.jme.getDOMList = function (b) {
    var c = [];
    return b || (b = []), "string" == typeof b && (b = b.split(" ")), a.each(b, function (a, b) {
      b && (b = document.getElementById(b), b && c.push(b));
    }), c;
  }, a.jme.getButtonText = function (b, c) {
    var d,
        e,
        f = function f(_f) {
      e !== _f && (e = _f, b.removeClass(c[_f ? 0 : 1]).addClass(c[_f]), d && (b.prop("checked", !!_f), (b.data("checkboxradio") || {
        refresh: a.noop
      }).refresh()));
    };

    return b.is('[type="checkbox"], [type="radio"]') ? (b.prop("checked", function () {
      return this.defaultChecked;
    }), d = !0) : b.is("a") && b.on("click", function (a) {
      a.preventDefault();
    }), f;
  }, a.fn.jmePlayer = function () {
    return this.each(function () {
      var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i = a("audio, video", this).eq(0),
          j = a(this),
          k = a.jme.data(this),
          n = a.jme.data(i[0]);
      j.addClass(i.prop("nodeName").toLowerCase() + "player"), n.player = j, n.media = i, k.media || (h = function h() {
        j[0].className = j[0].className;
      }, d = function d() {
        i.off("canplay", c), clearTimeout(e);
      }, c = function c() {
        var a = i.prop("paused") ? "idle" : "playing";
        j.attr("data-state", a);
      }, b = function b(_b) {
        var k,
            n,
            o = _b.type;
        d(), m[o] && "waiting" != f || g && "emptied" == o || ("ended" == o || a.prop(this, "ended") ? o = "ended" : "waiting" == o ? a.prop(this, "readyState") > 2 ? o = "" : (e = setTimeout(function () {
          i.prop("readyState") > 2 && c();
        }, 9), i.on("canPlay", c)) : l[o] ? o = "idle" : (k = a.prop(this, "readyState"), n = a.prop(this, "paused"), o = !n && 3 > k ? "waiting" : !n && k > 2 ? "playing" : "idle"), "idle" == o && j._seekpause && (o = !1), o && (f = o, j.attr("data-state", o), setTimeout(h)));
      }, k.media = i, k.player = j, i.on("emptied waiting canplay canplaythrough playing ended pause mediaerror", b).on("volumechange updateJMEState", function () {
        var b = a.prop(this, "volume");
        j[!b || a.prop(this, "muted") ? "addClass" : "removeClass"]("state-muted"), b = .01 > b ? "no" : .36 > b ? "low" : .7 > b ? "medium" : "high", j.attr("data-volume", b);
      }), a.jme.pluginsSel && j.jmeFn("addControls", a(j[0].querySelectorAll(a.jme.pluginsSel))), b && i.on("updateJMEState", b).triggerHandler("updateJMEState"));
    });
  }, a.jme.defineProp("isPlaying", {
    get: function get(b) {
      return !a.prop(b, "ended") && !a.prop(b, "paused") && a.prop(b, "readyState") > 1 && !a.data(b, "mediaerror");
    },
    readonly: !0
  }), a.jme.defineProp("player", {
    readonly: !0
  }), a.jme.defineProp("media", {
    readonly: !0
  }), a.jme.defineProp("srces", {
    get: function get(b) {
      var c,
          d = a.jme.data(b),
          e = d.media.prop("src");
      return e ? [{
        src: e
      }] : c = a.map(a("source", d.media).get(), function (b) {
        var c,
            d,
            e = {
          src: a.prop(b, "src")
        },
            f = b.attributes;

        for (c = 0, d = f.length; d > c; c++) {
          "specified" in f[c] && !f[c].specified || (e[f[c].nodeName] = f[c].nodeValue);
        }

        return e;
      });
    },
    set: function set(b, c) {
      var d = a.jme.data(b),
          e = function e(b, c) {
        "string" == typeof c && (c = {
          src: c
        }), a(document.createElement("source")).attr(c).appendTo(d.media);
      };

      return d.media.removeAttr("src").find("source").remove(), a.isArray(c) ? a.each(c, e) : e(0, c), d.media.jmeFn("load"), "noDataSet";
    }
  }), a.jme.defineMethod("togglePlay", function () {
    a(this).jmeFn(f.isPlaying.get(this) ? "pause" : "play");
  }), a.jme.defineMethod("addControls", function (b) {
    var c = a.jme.data(this) || {};

    if (c.media) {
      var d = a.jme.data(c.player[0], "controlElements") || a([]);
      b = a(b), a.jme.pluginsSel && (b = b.find(a.jme.pluginsSel).add(b.filter(a.jme.pluginsSel))), b.length && (a.each(a.jme.plugins, function (d, e) {
        var f,
            g,
            h,
            i,
            j = b.filter("." + e.className);

        for (h = 0; h < j.length; h++) {
          if (f = a(j[h]), g = a.jme.data(j[h]), g.player = c.player, g.media = c.media, !g._rendered) {
            if (g._rendered = !0, e.options) for (i in e.options) {
              i in g || (g[i] = e.options[i]);
            }

            e._create(f, c.media, c.player, g);
          }
        }
      }), a.jme.data(c.player[0], "controlElements", d.add(b)), c.player.triggerHandler("controlsadded"));
    }
  }), b.ready("DOM mediaelement", function () {
    b.isReady("jme", !0), b.addReady(a.jme.initJME), b.isReady("jme-base", !0), b.cfg.debug !== !1 && document.getElementsByTagName("video").length && !document.querySelector(k) && b.warn("found video element but video wasn't wrapped inside a ." + k + " element. Will not add control UI");
  });
});