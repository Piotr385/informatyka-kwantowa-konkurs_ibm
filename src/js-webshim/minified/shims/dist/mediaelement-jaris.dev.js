"use strict";

webshims.register("mediaelement-jaris", function (a, b, c, d, e, f) {
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