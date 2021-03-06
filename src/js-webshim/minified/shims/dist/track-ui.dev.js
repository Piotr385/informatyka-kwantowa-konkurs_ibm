"use strict";

!function (a) {
  if (webshims.support.texttrackapi && document.addEventListener) {
    var b = webshims.cfg.track,
        c = function c(b) {
      a(b.target).filter("track").each(e);
    },
        d = webshims.bugs.track,
        e = function e() {
      return d || !b.override && 3 == a.prop(this, "readyState") ? (b.override = !0, webshims.reTest("track"), document.removeEventListener("error", c, !0), this && a.nodeName(this, "track") ? webshims.error("track support was overwritten. Please check your vtt including your vtt mime-type") : webshims.info("track support was overwritten. due to bad browser support"), !1) : void 0;
    },
        f = function f() {
      document.addEventListener("error", c, !0), d ? e() : a("track").each(e), d || b.override || webshims.defineProperty(TextTrack.prototype, "shimActiveCues", {
        get: function get() {
          return this._shimActiveCues || this.activeCues;
        }
      });
    };

    b.override || a(f);
  }
}(webshims.$), webshims.register("track-ui", function (a, b, c, d, e) {
  "use strict";

  function f(a, b) {
    var c = !0,
        d = 0,
        e = a.length;
    if (e != b.length) c = !1;else for (; e > d; d++) {
      if (a[d] != b[d]) {
        c = !1;
        break;
      }
    }
    return c;
  }

  function g(c, d, e, f, g) {
    var h,
        i,
        j = a.Event("cuechange");
    e.trackElements || (e.trackElements = f[0].getElementsByTagName("track")), h = e.trackElements[g], h && (i = (b.data(h, "trackData") || {
      track: a.prop(h, "track")
    }).track, i != c.track && (h = null)), a.event.trigger(j, null, c.track, !0), h && a.event.trigger(j, null, h, !0), a.event.trigger(d, null, c, !0);
  }

  var h = b.cfg.track,
      i = b.support,
      j = {
    subtitles: 1,
    captions: 1,
    descriptions: 1
  },
      k = b.mediaelement,
      l = function l() {
    return !h.override && i.texttrackapi;
  },
      m = c.cancelAnimationFrame && c.requestAnimationFrame || function (a) {
    setTimeout(a, 17);
  },
      n = c.cancelAnimationFrame || c.clearTimeout,
      o = {
    update: function update(c, d) {
      c.activeCues.length ? f(c.displayedActiveCues, c.activeCues) || (c.displayedActiveCues = c.activeCues, c.trackDisplay || (c.trackDisplay = a('<div class="cue-display ' + b.shadowClass + '"><span class="description-cues" aria-live="assertive" /></div>').insertAfter(d), this.addEvents(c, d), b.docObserve()), c.hasDirtyTrackDisplay && d.triggerHandler("forceupdatetrackdisplay"), this.showCues(c)) : this.hide(c);
    },
    showCues: function showCues(b) {
      var c = a('<span class="cue-wrapper" />');
      a.each(b.displayedActiveCues, function (d, e) {
        var f = e.id ? 'id="cue-id-' + e.id + '"' : "",
            g = a('<span class="cue-line"><span ' + f + ' class="cue" /></span>').find("span").html(e.getCueAsHTML()).end();
        "descriptions" == e.track.kind ? setTimeout(function () {
          a("span.description-cues", b.trackDisplay).html(g);
        }, 0) : c.prepend(g);
      }), a("span.cue-wrapper", b.trackDisplay).remove(), b.trackDisplay.append(c);
    },
    addEvents: function addEvents(a, b) {
      if (h.positionDisplay) {
        var c,
            d = function d(c) {
          if (a.displayedActiveCues.length || c === !0) {
            a.trackDisplay.css({
              display: "none"
            });
            var d = b.getShadowElement(),
                e = d.innerHeight(),
                f = d.innerWidth(),
                g = d.position();
            a.trackDisplay.css({
              left: g.left,
              width: f,
              height: e - 45,
              top: g.top,
              display: "block"
            }), a.trackDisplay.css("fontSize", Math.max(Math.round(e / 30), 7)), a.hasDirtyTrackDisplay = !1;
          } else a.hasDirtyTrackDisplay = !0;
        },
            e = function e() {
          clearTimeout(c), c = setTimeout(d, 0);
        },
            f = function f() {
          d(!0);
        };

        b.on("playerdimensionchange mediaelementapichange updatetrackdisplay updatemediaelementdimensions swfstageresize", e), b.on("forceupdatetrackdisplay", f).onWSOff("updateshadowdom", e), f();
      }
    },
    hide: function hide(b) {
      b.trackDisplay && b.displayedActiveCues.length && (b.displayedActiveCues = [], a("span.cue-wrapper", b.trackDisplay).remove(), a("span.description-cues", b.trackDisplay).empty());
    }
  };

  if (k.trackDisplay = o, !k.createCueList) {
    var p = {
      getCueById: function getCueById(a) {
        for (var b = null, c = 0, d = this.length; d > c; c++) {
          if (this[c].id === a) {
            b = this[c];
            break;
          }
        }

        return b;
      }
    };

    k.createCueList = function () {
      return a.extend([], p);
    };
  }

  k.getActiveCue = function (b, c, d, e, f) {
    b._lastFoundCue || (b._lastFoundCue = {
      index: 0,
      time: 0
    }), b._shimActiveCues || !i.texttrackapi || h.override || (b._shimActiveCues = k.createCueList());

    for (var l, m, n, o = 0; o < b.shimActiveCues.length; o++) {
      m = b.shimActiveCues[o], m.startTime > d || m.endTime < d ? (b.shimActiveCues.splice(o, 1), o--, m.pauseOnExit && a(c).pause(), g(m, "exit", e, c, f)) : (n = m.endTime - d, e.nextUpdateDelay > n && (e.nextUpdateDelay = n, e.nextEvent = m.endTime), "showing" == b.mode && j[b.kind] && -1 == a.inArray(m, e.activeCues) && e.activeCues.push(m));
    }

    for (l = b.cues.length, o = b._lastFoundCue.time < d ? b._lastFoundCue.index : 0; l > o; o++) {
      if (m = b.cues[o], m.startTime <= d && m.endTime >= d && -1 == a.inArray(m, b.shimActiveCues) && (b.shimActiveCues.push(m), "showing" == b.mode && j[b.kind] && e.activeCues.push(m), g(m, "enter", e, c, f), b._lastFoundCue.time = d, b._lastFoundCue.index = o, n = m.endTime - d, e.nextUpdateDelay > n && (e.nextUpdateDelay = n, e.nextEvent = m.endTime)), m.startTime > d) {
        n = m.startTime - d, e.nextUpdateDelay > n && (e.nextUpdateDelay = n, e.nextEvent = m.startTime);
        break;
      }
    }
  };

  var q = function q() {
    return b.implement(this, "trackui");
  },
      r = function r() {
    var c,
        d,
        f,
        g,
        h,
        i,
        j,
        p,
        q = .27,
        r = a(this),
        s = 0,
        t = function t() {
      s++, 9 > s ? r.prop("currentTime") > c.nextEvent ? (s = e, u()) : p = m(t) : s = e;
    },
        u = function u(a) {
      var e, j;

      if (d && c || (d = r.prop("textTracks"), c = b.data(r[0], "mediaelementBase") || b.data(r[0], "mediaelementBase", {}), c.displayedActiveCues || (c.displayedActiveCues = [])), d && (j = r.prop("currentTime"), !(!j && 0 !== j || c.nextEvent && a && "timeupdate" == a.type && j >= i && c.nextEvent - j > q && 9 > j - i))) {
        i = j, h = c.nextUpdateDelay, c.nextUpdateDelay = Number.MAX_VALUE, c.activeCues = [];

        for (var l = 0, m = d.length; m > l; l++) {
          e = d[l], "disabled" != e.mode && e.cues && e.cues.length && k.getActiveCue(e, r, j, c, l);
        }

        o.update(c, r), clearTimeout(f), c.nextUpdateDelay <= q && (a || h != c.nextUpdateDelay) && c.nextUpdateDelay > 0 ? (h = c.nextUpdateDelay, clearTimeout(g), p && n(p), s = 0, g = setTimeout(t, 1e3 * c.nextUpdateDelay + 9)) : c.nextUpdateDelay >= Number.MAX_VALUE && (c.nextEvent = j + 2);
      }
    },
        v = function v() {
      c && c.trackElements && delete c.trackElements;
    },
        w = function w(a) {
      c && a && ("addtrack" == a.type || "removetrack" == a.type) && (clearTimeout(j), j = setTimeout(v, 39)), clearTimeout(f), f = setTimeout(u, 40);
    },
        x = function x() {
      d || (c && "blockTrackListUpdate" in c && (c.blockTrackListUpdate = !0), d = r.prop("textTracks"), c && c.blockTrackListUpdate && (c.blockTrackListUpdate = !1)), a([d]).off(".trackview").on("change.trackview addtrack.trackview removetrack.trackview", w), r.off(".trackview").on("emptied.trackview", v).on("play.trackview playing.trackview updatetrackdisplay.trackview seeked.trackview", w).on("timeupdate.trackview", u);
    };

    r.on("remove", function (a) {
      !a.originalEvent && c && c.trackDisplay && setTimeout(function () {
        c.trackDisplay.remove();
      }, 4);
    }), l() ? (r.hasClass("nonnative-api-active") && x(), r.on("mediaelementapichange trackapichange", function () {
      !l() || r.hasClass("nonnative-api-active") ? x() : (clearTimeout(f), clearTimeout(g), p && n(p), d = r.prop("textTracks"), c = b.data(r[0], "mediaelementBase") || b.data(r[0], "mediaelementBase", {}), a.each(d, function (a, b) {
        b._shimActiveCues && delete b._shimActiveCues;
      }), a([d]).off(".trackview"), o.hide(c), r.off(".trackview"));
    })) : x();
  };

  l() && (!function () {
    var c,
        d = function d(b) {
      c = !0, setTimeout(function () {
        a(b).triggerHandler("updatetrackdisplay"), c = !1;
      }, 9);
    },
        e = function e(_e, f, g) {
      var h,
          i = "_sup" + g,
          j = {
        prop: {}
      };
      j.prop[g] = function () {
        return !c && l() && d(a(this).closest("audio, video")), h.prop[i].apply(this, arguments);
      }, h = b.defineNodeNameProperty(_e, f, j);
    };

    e("track", "track", "get"), ["audio", "video"].forEach(function (a) {
      e(a, "textTracks", "get"), e("nodeName", "addTextTrack", "value");
    });
  }(), a.propHooks.activeCues = {
    get: function get(a) {
      return a._shimActiveCues || a.activeCues;
    }
  }), b.addReady(function (b, c) {
    a("video, audio", b).add(c.filter("video, audio")).filter(q).each(r);
  });
});