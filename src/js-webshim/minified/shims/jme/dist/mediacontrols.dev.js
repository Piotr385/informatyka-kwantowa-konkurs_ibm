"use strict";

webshims.register("mediacontrols", function (a, b, c) {
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