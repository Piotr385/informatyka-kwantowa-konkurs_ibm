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
}), webshims.register("mediacontrols", function (a, b, c) {
  "use strict";

  var d = b.cfg.mediaelement.jme,
      e = d.selector,
      f = a.jme,
      g = '<div class="{%class%}"></div>',
      h = '<button class="{%class%}" type="button" aria-label="{%text%}"></button>',
      i = '<div class="{%class%} media-range" aria-label="{%text%}"></div>',
      j = '<div  class="{%class%}">00:00</div>',
      k = function () {
    var a,
        b = "";
    if (c.Audio) try {
      a = new Audio(), a.volume = .55, b = Math.round(100 * a.volume) / 100 == .55 ? "" : " no-volume-api";
    } catch (d) {}
    return b;
  }(),
      l = function () {
    var a = {},
        c = /\{\{(.+?)\}\}/gim;
    return function (e, h) {
      return e || (e = d.barTemplate), (!a[e] || h) && (a[e] = e.replace(c, function (a, c) {
        var d = f.plugins[c];
        return d ? (d.structure || (b.warn("no structure option provided for plugin: " + c + ". Fallback to standard div"), d.structure = g), d.structure.replace("{%class%}", c).replace("{%text%}", d.text || "")) : a;
      })), a[e] || "";
    };
  }(),
      m = /iP(hone|od|ad)/i.test(navigator.platform),
      n = m && parseInt((navigator.appVersion.match(/OS (\d+)_\d+/) || ["", "8"])[1], 10) < 7,
      o = c.Modernizr,
      p = !(o && o.videoautoplay || !m && !/android/i.test(navigator.userAgent)),
      q = function q() {
    q.loaded || (q.loaded = !0, b.loader.loadList(["mediacontrols-lazy", "range-ui"]));
  },
      r = function r(c) {
    c || (c = "_create");

    var d = function d(e, f) {
      var g = this,
          h = arguments;
      q(), b.ready("mediacontrols-lazy", function () {
        return d != g[c] && a.data(f[0]) ? g[c].apply(g, h) : void b.error("stop too much recursion");
      });
    };

    return d;
  };

  b.loader.addModule("mediacontrols-lazy", {
    src: "jme/mediacontrols-lazy",
    d: ["dom-support"]
  });
  var s = {
    _create: r()
  };
  f.plugins.useractivity = s, f.defineProp("controlbar", {
    set: function set(e, g) {
      g = !!g;
      var h,
          i,
          j = f.data(e),
          k = a("div.jme-mediaoverlay, div.jme-controlbar", j.player),
          m = "";
      if (g && !k[0]) {
        if (j._controlbar) j._controlbar.appendTo(j.player);else {
          n && (j.media.removeAttr("controls"), j.media.mediaLoad()), p && j.player.addClass("has-yt-bug"), j.media.prop("controls", !1), m = l(), j._controlbar = a(d.barStructure), k = j._controlbar.find("div.jme-cb-box").addClass("media-controls"), h = j._controlbar.filter(".jme-media-overlay"), h = h.add(k), a(m).appendTo(k), j._controlbar.appendTo(j.player), j.player.jmeFn("addControls", h), i = function () {
            var a = {},
                b = [{
              size: 290,
              name: "xx-small",
              names: "s xs xxs"
            }, {
              size: 380,
              name: "x-small",
              names: "s xs"
            }, {
              size: 478,
              name: "small",
              names: "s"
            }, {
              size: 756,
              name: "medium",
              names: "m"
            }, {
              size: 1024,
              name: "large",
              names: "l"
            }, {
              size: Number.MAX_VALUE,
              name: "x-large",
              names: "l xl"
            }],
                c = b.length;
            return function () {
              var d,
                  e = 0,
                  f = j.player.outerWidth(),
                  g = Math.max(parseInt(j.player.css("fontSize"), 10) || 16, 13);

              for (f *= 16 / g; c > e; e++) {
                if (b[e].size >= f) {
                  d = b[e];
                  break;
                }
              }

              a.name != d.name && (a = d, j.player.attr("data-playersize", d.name), j.player.attr("data-playersizes", d.names));
            };
          }();

          var o = a('<div class="ws-poster" />').insertAfter(j.media),
              q = function () {
            var a,
                b,
                d,
                e,
                f = c.swfmini && swfmini.hasFlashPlayerVersion("10.0.3"),
                g = /youtube\.com\/[watch\?|v\/]+/i,
                h = j.media.prop("paused"),
                i = j.media.prop("ended");
            return h && j.player.addClass("initial-state"), i && j.player.addClass("ended-state"), "backgroundSize" in o[0].style || j.player.addClass("no-backgroundsize"), j.media.on("play playing waiting seeked seeking", function (a) {
              a || (a.type = "playing"), !h || e && p && "playing" != a.type && !j.media.prop("readyState") && !j.media.prop("networkState") || (h = !1, j.player.removeClass("initial-state")), i && (i = !1, j.player.removeClass("ended-state"));
            }), j.media.on("ended", function () {
              i || j.media.prop("loop") || !j.media.prop("ended") || (i = !0, j.player.addClass("ended-state"));
            }), function () {
              var c,
                  k = j.media.attr("poster"),
                  l = !!k,
                  m = j.media.prop("currentSrc") || "";
              e = g.test(m), c = f && l ? !1 : e, !l && e && (k = m.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i) || "", k && (k = "https://img.youtube.com/vi/" + k[1] + "/0.jpg", l = !!k)), d !== k && (d = k, o[0].style.backgroundImage = k ? "url(" + k + ")" : ""), a !== l && (a = l, j.player[l ? "removeClass" : "addClass"]("no-poster")), j.media.prop("paused") && (j.player.addClass("initial-state"), h = !0), i && (i = !1, j.player.removeClass("ended-state")), j.player[e ? "addClass" : "removeClass"]("yt-video"), b !== c && (b = c, j.player[c ? "addClass" : "removeClass"]("has-ytposter"));
            };
          }();

          s._create(j.player, j.media, j.player), j.media.on("emptied loadstart", function () {
            setTimeout(q);
          }), i(), q(), b.ready("dom-support", function () {
            j.player.onWSOff("updateshadowdom", i), h.add(j._controlbar).add(o).addClass(b.shadowClass), b.addShadowDom();
          });
        }
      } else g || k.detach();
      return g;
    }
  }), f.registerPlugin("play-pause", {
    structure: h,
    text: "play / pause",
    _create: r()
  }), f.registerPlugin("mute-unmute", {
    structure: h,
    text: "mute / unmute",
    _create: r()
  }), f.registerPlugin("jme-media-overlay", {
    _create: r()
  }), f.registerPlugin("volume-slider", {
    structure: i,
    text: "volume level",
    _create: r()
  }), f.registerPlugin("time-slider", {
    structure: i,
    options: {
      format: ["mm", "ss"]
    },
    text: "time position",
    _create: r()
  }), f.defineProp("format", {
    set: function set(b, c) {
      a.isArray(c) || (c = c.split(":"));
      var d = f.data(b);
      return d.format = c, a(b).triggerHandler("updatetimeformat"), d.player.triggerHandler("updatetimeformat"), "noDataSet";
    }
  }), f.registerPlugin("duration-display", {
    structure: j,
    options: {
      format: "mm:ss"
    },
    _create: r()
  }), f.defineProp("countdown", {
    set: function set(b, c) {
      var d = f.data(b);
      return d.countdown = !!c, a(b).triggerHandler("updatetimeformat"), d.player.triggerHandler("updatetimeformat"), "noDataSet";
    }
  }), f.registerPlugin("currenttime-display", {
    structure: j,
    options: {
      format: "mm:ss",
      countdown: !1
    },
    _create: r()
  }), f.registerPlugin("poster-display", {
    structure: "<div />",
    options: {},
    _create: r()
  }), f.registerPlugin("fullscreen", {
    options: {
      fullscreen: !0,
      autoplayfs: !1
    },
    structure: h,
    text: "enter fullscreen / exit fullscreen",
    _create: r()
  }), f.registerPlugin("mediaconfigmenu", {
    structure: h,
    text: "configuration",
    _create: r()
  }), f.registerPlugin("captions", {
    structure: h,
    text: "subtitles",
    _create: function _create(b, c, d) {
      var e = c.find("track").filter(':not([kind]), [kind="subtitles"], [data-kind="subtitles"], [kind="captions"], [data-kind="captions"]');
      b.wsclonedcheckbox = a(b).clone().attr({
        role: "checkbox"
      }).insertBefore(b), d.attr("data-tracks", e.length > 1 ? "many" : e.length), b.attr("aria-haspopup", "true"), r().apply(this, arguments);
    }
  }), f.registerPlugin("chapters", {
    structure: h,
    text: "chapters",
    _create: function _create(a, c, d) {
      var e = c.find("track").filter('[kind="chapters"], [data-kind="chapters"]');
      a.attr("aria-haspopup", "true"), e.length && (b._polyfill(["track"]), d.addClass("has-chapter-tracks")), r().apply(this, arguments);
    }
  }), b.ready(b.cfg.mediaelement.plugins.concat(["mediaelement", "jme-base"]), function () {
    d.barTemplate || (d.barTemplate = '<div class="play-pause-container">{{play-pause}}</div><div class="playlist-container"><div class="playlist-box"><div class="playlist-button-container">{{playlist-prev}}</div><div class="playlist-button-container">{{playlist-next}}</div></div></div><div class="currenttime-container">{{currenttime-display}}</div><div class="progress-container">{{time-slider}}</div><div class="duration-container">{{duration-display}}</div><div class="mute-container">{{mute-unmute}}</div><div class="volume-container">{{volume-slider}}</div><div class="chapters-container"><div class="chapters-controls mediamenu-wrapper">{{chapters}}</div></div><div class="subtitle-container mediamenu-wrapper"><div class="subtitle-controls">{{captions}}</div></div><div class="mediaconfig-container"><div class="mediaconfig-controls mediamenu-wrapper">{{mediaconfigmenu}}</div></div><div class="fullscreen-container">{{fullscreen}}</div>'), d.barStructure || (d.barStructure = '<div class="jme-media-overlay"></div><div class="jme-controlbar' + k + '" tabindex="-1"><div class="jme-cb-box"></div></div>'), b.addReady(function (b, c) {
      a(e, b).add(c.filter(e)).jmeProp("controlbar", !0);
    });
  }), b.ready("WINDOWLOAD", q);
});