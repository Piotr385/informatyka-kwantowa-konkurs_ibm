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
}(webshims), webshims.register("track", function (a, b, c, d) {
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