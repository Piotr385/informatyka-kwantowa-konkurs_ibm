"use strict";

webshims.register("track", function (a, b, c, d) {
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