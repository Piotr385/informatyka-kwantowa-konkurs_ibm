"use strict";

!function (a) {
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