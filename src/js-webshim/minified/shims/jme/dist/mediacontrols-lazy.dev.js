"use strict";

webshims.register("mediacontrols-lazy", function (a, b, c, d, e) {
  "use strict";

  function f(a) {
    var b, c;
    a.release === !0 && (a.release = a.set);
    var d = {
      start: function start() {
        c || (c = !0, a.start && a.start());
      },
      release: function release() {
        c && (c = !1, a.release && a.release());
      },
      get: function get() {
        return c ? void 0 : a.get.apply(this, arguments);
      },
      set: function set() {
        var c = this,
            e = arguments;
        d.start(), clearTimeout(b), b = setTimeout(function () {
          a.set.apply(c, e);
        }, 33);
      }
    };
    return d.fns = a, d;
  }

  function g(b) {
    var c = a.grep(b, u.chapters),
        d = c;
    return c.length > 1 && (c = a.grep(c, u.chapters)), c.length ? c.length > 1 && (c = a.grep(c, u.notDisabled)) : c = d, c.length ? c.length > 1 && (c = a.grep(c, u.activeLang)) : c = d, c.length ? c.length > 1 && (c = a.grep(c, u.activePartialLang)) : c = d, c[0] || d[0] || null;
  }

  function h(a) {
    var b = '<li role="presentation">' + this.html.replace("{{startTime}}", a.startTime).replace("{{endTime}}", a.endTime).replace("{{title}}", a.title);
    return a.list && a.list.length && (b += '\n<ul role="presentation">' + a.list.map(h, this).join("\n	") + "</ul>\n"), b += "</li>";
  }

  function i(a) {
    var b, c, d, e;
    if (a.length) for (c = a[0].startTime, d = a[a.length - 1].endTime, e = 100 / (d - c), b = 0; b < a.length; b++) {
      a[b].rel = (a[b].endTime - a[b].startTime) * e, b == a.length - 1 ? (a[b].last = !0, a[b].style = "overflow: hidden;") : a[b].style = "float: left; width: " + a[b].rel + "%;", i(a[b].list);
    }
  }

  function j(a) {
    var b = "__chaptertree" + a.cues.length;
    if (a[b]) return a[b];
    var c,
        d,
        e,
        f = [],
        g = null;

    for (d = 0; d < a.cues.length; d++) {
      c = a.cues[d], g && g.startTime > c.startTime || (g && c.startTime >= g.endTime && (g = g.parent), g && c.endTime > g.endTime || (e = {
        startTime: c.startTime,
        endTime: c.endTime,
        parent: g,
        list: [],
        title: c.text,
        cue: c
      }, g ? g.list.push(e) : (g = e, f.push(e))));
    }

    return i(f), a[b] = f, f;
  }

  var k = a.jme.plugins,
      l = "pseudoClasses",
      m = {
    play: 1,
    playing: 1
  },
      n = {
    pause: 1,
    ended: 1
  },
      o = function o() {
    b.loader.loadList(["range-ui"]);
  },
      p = function p(a) {
    o(), b.ready("range-ui", a);
  },
      q = {
    subtitles: 1,
    caption: 1
  },
      r = function r(b) {
    var c = a.map(b, function (a) {
      var b = "caption" == a.kind ? "caption-type" : "subtitle-type",
          c = a.language;
      return c = c ? ' <span class="track-lang">' + c + "</span>" : "", '<li class="' + b + '" role="presentation"><button role="menuitemcheckbox" type="button" tabindex="-1">' + a.label + c + "</button></li>";
    });
    return '<div><ul role="presentation">' + c.join("") + "</ul></div>";
  },
      s = b.domPrefixes,
      t = b.prefixed;

  a.fn.wsTouchClick || (a.fn.wsTouchClick = function () {
    var b = "touchAction" in document.documentElement.style,
        d = !b && "ontouchstart" in c && document.addEventListener;
    return function (c, e) {
      var f,
          _g,
          h,
          i,
          j,
          k = function k() {
        return i ? void 0 : e.apply(this, arguments);
      };

      return a.isFunction(c) ? (e = c, c = !1, this.on("click", k)) : this.on("click", c, k), d ? (j = function j() {
        i = !1;
      }, _g = function g(b) {
        var c, d;
        b = b.originalEvent || {}, a(this).off("touchend touchcancel", _g);
        var h = b.changedTouches || b.touches;
        return "touchcancel" == b.type || !f || !h || 1 != h.length || (d = h[0], Math.abs(f.x - d.pageX) > 40 || Math.abs(f.y - d.pageY) > 40 || Date.now() - f.now > 300) ? void 0 : (b.preventDefault(), i = !0, setTimeout(j, 400), c = e.apply(this, arguments));
      }, h = function h(b) {
        var d, e;
        b && 1 == b.touches.length && (d = b.touches[0], e = c ? a(d.target).closest(c) : a(this), e.length && (f = {
          x: d.pageX,
          y: d.pageY,
          now: Date.now()
        }, e.on("touchend touchcancel", _g)));
      }, this.each(function () {
        this.addEventListener("touchstart", h, !0);
      })) : b && !c && this.css("touch-action", "manipulation"), this;
    };
  }()), a.extend(!0, k, {
    useractivity: {
      _create: function _create(a, b, c) {
        c.on({
          useractive: function useractive() {
            c.attr("data-useractivity", "true");
          }
        }).on("userinactive", {
          idletime: 3500
        }, function () {
          c.attr("data-useractivity", "false");
        }).triggerHandler("userinactive");
      }
    },
    "play-pause": {
      pseudoClasses: {
        play: "state-paused",
        pause: "state-playing"
      },
      _create: function _create(b, c) {
        var d = a.jme.getButtonText(b, [this[l].play, this[l].pause]);
        c.on("play playing ended pause updateJMEState", function (a) {
          var b = a.type;
          b = m[b] ? 1 : n[b] ? 0 : c.jmeProp("isPlaying") ? 1 : 0, d(b);
        }).triggerHandler("updateJMEState"), b.wsTouchClick(function (a) {
          c.jmeFn("togglePlay"), a.stopPropagation();
        });
      }
    },
    "mute-unmute": {
      pseudoClasses: {
        mute: "state-mute",
        unmute: "state-unmute"
      },
      _create: function _create(b, c) {
        var d = a.jme.getButtonText(b, [this[l].mute, this[l].unmute]);
        c.on("volumechange updateJMEState", function () {
          d(c.prop("muted") ? 1 : 0);
        }).triggerHandler("updateJMEState"), b.wsTouchClick(function (a) {
          c.prop("muted", !c.prop("muted")), a.stopPropagation();
        });
      }
    },
    "jme-media-overlay": {
      _create: function _create(b, c, d) {
        var e,
            f,
            g,
            h = {
          touchend: 1,
          click: 1
        },
            i = function i() {
          e = !1;
        };

        b.wsTouchClick(function () {
          c.jmeProp("isPlaying") && "false" != d.attr("data-useractivity") ? c.pause() : c.play();
        }), d.on({
          "touchstart touchend mousedown click mouseover": function touchstartTouchendMousedownClickMouseover(a) {
            var b = 500;
            e = !0, clearTimeout(f), g && h[a.type] && -1 != a.target.className.indexOf("ws-a11y-focus") && (b = 1), f = setTimeout(i, b);
          },
          focusin: function focusin(b) {
            !e && b.originalEvent && (a.prop(b.target, "tabIndex") > -1 || a.attr(b.target, "role")) && setTimeout(function () {
              e || (g = !0, a(b.target).addClass("ws-a11y-focus"));
            }, 20);
          },
          focusout: function focusout(b) {
            g && (g = !1, a(b.target).removeClass("ws-a11y-focus"));
          }
        });
      }
    },
    "volume-slider": {
      _create: function _create(a, b) {
        var c = function c() {
          var c, d;
          d = f({
            get: function get() {
              var a = b.prop("volume");
              a !== e && c.value(a);
            },
            set: function set() {
              b.prop({
                muted: !1,
                volume: c.options.value
              });
            },
            release: !0
          }), c = a.rangeUI({
            min: 0,
            max: 1,
            step: "any",
            input: d.set,
            change: d.release,
            baseClass: "media-range"
          }).data("rangeUi"), b.on("volumechange", d.get);
        };

        p(c);
      }
    },
    "time-slider": {
      pseudoClasses: {
        no: "no-duration"
      },
      _create: function _create(b, c, d) {
        var e = this,
            g = function g() {
          var g,
              h,
              i,
              j,
              k,
              _m,
              n = "has-duration",
              o = c.prop("duration");

          g = f({
            get: function get() {
              var a = c.prop("currentTime");
              if (!isNaN(a)) try {
                i.value(a);
              } catch (b) {}
            },
            set: function set() {
              try {
                c.prop("currentTime", i.options.value).triggerHandler("timechanged", [i.options.value]);
              } catch (a) {}
            },
            start: function start() {
              null == k && (k = c.prop("paused"), k ? d._seekpause = !1 : (d._seekpause = !0, c.pause()));
            },
            release: function release() {
              g.fns.set(), k === !1 && c.play(), "_seekpause" in d && delete d._seekpause, k = null, c.triggerHandler("updateprogress");
            }
          }), h = function h() {
            o = c.prop("duration"), n = o && isFinite(o) && !isNaN(o), n ? (i.disabled(!1), i.max(o), d.removeClass(e[l].no)) : (i.disabled(!0), i.max(Number.MAX_VALUE), d.addClass(e[l].no));
          }, _m = function m() {
            setTimeout(function () {
              j.removeClass("show-time-select"), b.off(".jmetimeselect"), document.removeEventListener && document.removeEventListener("touchend", _m, !0);
            });
          }, i = b.rangeUI({
            min: 0,
            value: c.prop("currentTime") || 0,
            step: "any",
            input: g.set,
            change: g.release,
            textValue: function textValue(a) {
              return c.jmeFn("formatTime", a);
            },
            baseClass: "media-range"
          }).data("rangeUi"), j = a('<span class="time-select" />').appendTo(b), b.on({
            "mouseenter touchstart": function mouseenterTouchstart(d) {
              if (n && "touchstart" != d.type || d.originalEvent && d.originalEvent.touches && 1 == d.originalEvent.touches.length) {
                var e = (b.offset() || {
                  left: 0
                }).left,
                    f = b.innerWidth(),
                    g = function g(a) {
                  var b = (a - e) / f * 100,
                      d = -(j.outerWidth() / 2);
                  j[0].innerHTML = c.jmeFn("formatTime", o * b / 100), j[0].style.left = b + "%", j[0].style.marginLeft = d + "px";
                };

                a.fn.rangeUI.normalizeTouch(d), setTimeout(function () {
                  j.addClass("show-time-select"), g(d.pageX);
                }), document.addEventListener && document.addEventListener("touchend", _m, !0), b.off(".jmetimeselect").on("mousemove.jmetimeselect touchmove.jmetimeselect", function (b) {
                  a.fn.rangeUI.normalizeTouch(b), g(b.pageX);
                });
              }
            },
            "mouseleave touchend": _m
          }), c.on({
            timeupdate: g.get,
            emptied: function emptied() {
              h(), i.value(0);
            },
            durationchange: h
          }), d.jmeFn("addControls", a('<div class="buffer-progress" />').prependTo(b)), h();
        };

        p(g);
      }
    },
    "duration-display": {
      _create: function _create(a, b, c, d) {
        "string" == typeof d.format && (d.format = d.format.split(":"));

        var e = function e() {
          a.html(x(b.prop("duration"), d.format));
        };

        b.on("durationchange emptied", e), a.on("updatetimeformat", e).jmeProp("format", d.format);
      }
    },
    "currenttime-display": {
      _create: function _create(a, b, c, d) {
        "string" == typeof d.format && (d.format = d.format.split(":"));

        var e = function e() {
          var c = b.prop("currentTime");
          d.countdown && (c = (b.prop("duration") || 0) - c, .7 > c && (c = 0)), a.html(x(c, d.format));
        };

        b.on("timeupdate emptied durationchange", e), a.on("updatetimeformat", e).jmeProp("format", d.format);
      }
    },
    "poster-display": {
      _create: function _create(a, b) {
        var c = function c() {
          var c = b.prop("poster");
          c ? a.html('<span></span><img src="' + c + '" class="poster-image" />') : a.empty();
        };

        b.on("emptied", c), c();
      }
    },
    fullscreen: {
      pseudoClasses: {
        enter: "state-enterfullscreen",
        exit: "state-exitfullscreen"
      },
      _create: function _create(b, c, d) {
        var e = a.jme.getButtonText(b, [this[l].enter, this[l].exit]),
            f = function f() {
          e(d.hasClass("player-fullscreen") ? 1 : 0);
        },
            g = this.options,
            h = function h() {
          a(d.data("jme").controlElements).filter(".jme-media-overlay").off(".dblfullscreen").on("dblclick.dblfullscreen", function () {
            d.jmeProp("fullscreen", !d.jmeProp("fullscreen"));
          });
        };

        d.on("controlsadded", h), d.on("playerdimensionchange", f), b.wsTouchClick(function () {
          var a = d.hasClass("player-fullscreen") ? !1 : g.fullscreen;
          d.jmeProp("fullscreen", a), a && g.autoplayfs && c.jmeFn("play");
        }), h(), f();
      }
    },
    chapters: {
      _create: function _create(c, d, e) {
        var f = this;
        b.ready("track", function () {
          var g,
              i,
              j,
              k,
              l,
              m = function m() {
            clearTimeout(k), k = setTimeout(n, 999);
          },
              n = function n() {
            var a;
            j && !d.prop("readyState") && (a = d.attr("preload"), "auto" != a && (a = "auto", d.prop("preload", a)));
          },
              o = function o() {
            g || (g = new a.jme.ButtonMenu(c, '<div class="mediamenu chapter-menu" />', function (b, c) {
              var e = d.prop("paused"),
                  f = d.prop("readyState");
              (!i || 2 > f) && (d.play(), e && d.pause()), 2 > f && setTimeout(function () {
                d.prop("currentTime", a(c).data("starttime"));
              }, 99), f && d.prop("currentTime", a(c).data("starttime"));
            }));
          },
              p = function p(a, b) {
            if (l && (l.remove(), l = null), a && b.length) {
              var d = b.map(h, {
                html: '<button type="button" data-starttime="{{startTime}}" data-endtime="{{endTime}}" role="menuitem" tabindex="-1">{{title}}</button>'
              }),
                  i = a.label || f.text;
              j = !0, e.addClass("has-chapter-tracks"), o(), c.attr("aria-label", i), g.addMenu('<div class="mediamenu chapter-menu" aria-label="' + i + '"><div><h5>' + i + '</h5><ul role="presentation">' + d.join("\n") + "</div></ul></div>");
            } else j = !1, c.attr("aria-label", f.text), e.removeClass("has-chapter-tracks");
          };

          d.on({
            play: function play() {
              i = !0;
            },
            "emptied loadstart": function emptiedLoadstart() {
              i = !1, m();
            }
          }), b.ready("WINDOWLOAD", m), e.jmeFn("getMediaChapters", p);
        });
      }
    },
    mediaconfigmenu: {
      _create: function _create(b, c, d) {
        var e,
            f = new a.jme.ButtonMenu(b, '<div class="mediamenu" ><div /></div>'),
            g = f.menu.find("div"),
            h = function h() {
          d[g[0].getElementsByTagName("*").length ? "addClass" : "removeClass"]("has-config-menu");
        },
            i = function i() {
          clearTimeout(e), e = setTimeout(h);
        };

        a.each(a.jme.configmenuPlugins, function (a, b) {
          b(g, c, d, f);
        }), h(), c.on("loadstart emptied loadedmetadata", i);
      }
    },
    captions: {
      pseudoClasses: {
        menu: "subtitle-menu"
      },
      _create: function _create(c, d, e) {
        var f,
            g = this,
            h = c.wsclonedcheckbox;
        h || (f = d.find("track"), h = a(c).clone().attr({
          role: "checkbox"
        }).insertBefore(c), e.attr("data-tracks", f.length > 1 ? "many" : f.length), c.attr("aria-haspopup", "true")), b.ready("track", function () {
          function b(b) {
            var e;
            j ? j.addMenu(b) : (e = function e(b, c) {
              "true" == a.attr(c, "aria-checked") ? m[b].mode = "disabled" : a.each(m, function (a, c) {
                c.mode = a == b ? "showing" : "disabled";
              }), d.prop("textTracks"), f();
            }, j = new a.jme.ButtonMenu(c, b, e), h.wsTouchClick(function () {
              return e(0, this), !1;
            })), f();
          }

          function f() {
            j && j.menu && j.menu.length && a("button", j.menu).each(function (b) {
              if (!m[b]) return !1;
              var c = "showing" == m[b].mode ? "true" : "false";
              b || h.attr("aria-checked", c), a.attr(this, "aria-checked", c);
            });
          }

          function i() {
            m = [], a.each(n, function (a, b) {
              q[b.kind] && 3 != b.readyState && m.push(b);
            }), e.attr("data-tracks", m.length > 1 ? "many" : m.length), m.length ? (b('<div class="mediamenu ' + g[l].menu + '" >' + r(m) + "</div>"), a("span.jme-text, label span.jme-text", h).text((m[0].label || " ") + (m[0].lang || "")), (!e.hasClass(g[l].hasTrack) || e.hasClass(g[l].noTrack)) && c.prop("disabled", !1)) : (!e.hasClass(g[l].noTrack) || e.hasClass(g[l].hasTrack)) && c.prop("disabled", !0);
          }

          var j,
              k,
              m = [],
              n = d.prop("textTracks"),
              o = function () {
            var a, b;
            return function (c) {
              clearTimeout(a), clearTimeout(b), "updatesubtitlestate" == c.type && (b = setTimeout(function () {
                d.trigger("updatetracklist");
              }, 0)), a = setTimeout(i, 19);
            };
          }();

          n ? (k = function () {
            var a;
            return function () {
              clearTimeout(a), a = setTimeout(f, 20);
            };
          }(), i(), a([n]).on("addtrack removetrack", o).on("change", k), e.on("updatesubtitlestate", o), d.on("updatetrackdisplay", k)) : (n = [], i());
        });
      }
    }
  });
  var u = {
    chapters: function chapters(a) {
      return "chapters" == a.kind;
    },
    notDisabled: function notDisabled(a) {
      return "disabled" != a.mode;
    },
    activeLang: function activeLang(a) {
      return a.language == b.activeLang();
    },
    activePartialLang: function activePartialLang(a) {
      return a.language == b.activeLang().split("-")[0];
    }
  },
      v = {
    captions: "showing",
    subtitles: "showing"
  };
  a.jme.defineMethod("activateTrack", function (b, c) {
    var d = a.jme.data(this);

    if (d.media) {
      var e,
          f,
          g = 0,
          h = function h() {
        clearTimeout(f), e && e.cues && e.cues.length ? (c(e), c = a.noop, d.media.find("track").off("load", h)) : 9 > g && (f = setTimeout(h, 100 * g), g++);
      };

      b.jquery && (b = b[0]), e = b.nodeName ? a.prop(b, "track") : b, "disabled" == a.prop(e, "mode") && a.prop(e, "mode", v[a.prop(e, "mode")] || "hidden"), d.media.prop("textTracks"), d.media.find("track").on("load", h), setTimeout(h);
    }
  }), a.jme.defineMethod("getMediaChapters", function (b) {
    var c = a.jme.data(this);

    if (c.media) {
      var d,
          e = c.media.prop("textTracks"),
          f = function () {
        var a,
            f = function f() {
          var a,
              f = g(e);
          d !== f && (a = d, d = f, f ? c.media.jmeFn("activateTrack", d, function () {
            var c = j(d);
            b(d, c, a);
          }) : b(d, [], a));
        };

        return function () {
          clearTimeout(a), a = setTimeout(f);
        };
      }();

      f(), a([e]).on("addtrack removetrack change", f), c.player.on("updatesubtitlestate", f), c.media.on("updatetrackdisplay emptied", f);
    }
  }), a.jme.defineMethod("getChapterTree", j), a.jme.defineMethod("concerningRange", function (b, c) {
    var d = this,
        e = {
      start: 0,
      end: 0
    };
    if (b || (b = "buffered"), b = a.prop(d, b), null == c && (c = a.prop(d, "currentTime")), !(b && "length" in b)) return e;

    for (var f = 0, g = b.length; g > f && (e.start = b.start(f), e.end = b.end(f), !(e.start <= c && e.end >= c)); f++) {
      ;
    }

    return e;
  }), a.jme.defineProp("progress", {
    get: function get(b) {
      var c = a.jme.data(b);
      if (!c.media) return 0;
      var d = c.media.jmeFn("concerningRange").end / c.media.prop("duration") * 100;
      return d > 99.4 && (d = 100), d || 0;
    },
    readonly: !0
  });

  var w = {
    hh: 6e4,
    mm: 60,
    ss: 1,
    ms: .001
  },
      x = function x(b, c) {
    var d;
    c || (c = ["mm", "ss"]), null == b && (d = a.jme.data(this), b = a.prop(d.media, "duration")), b && isFinite(b) || (b = 0);

    for (var e, f = [], g = 0, h = c.length; h > g; g++) {
      "ms" == c[g] && g == h - 1 ? e = Math.round(b / w[c[g]] / 10) : (e = parseInt(b / w[c[g]], 10), b %= w[c[g]]), 10 > e && (e = "0" + e), f.push(e);
    }

    return f.join(":");
  };

  a.jme.defineMethod("formatTime", x), a.jme.fullscreen = function () {
    var b,
        d,
        e = document.documentElement,
        f = {
      supportsFullScreen: t("fullscreenEnabled", document) || t("fullScreenEnabled", document),
      isFullScreen: function isFullScreen() {
        return !1;
      },
      requestFullScreen: function requestFullScreen(c) {
        var e;
        b = [], a(c).parentsUntil("body").each(function () {
          var c,
              d = a.css(this, "position"),
              f = this.scrollLeft,
              g = this.scrollTop;
          e = {
            elemStyle: this.style,
            elem: this
          }, "static" !== d && (c = !0, e.pos = e.elemStyle.position, this.style.position = "static"), f && (c = !0, e.left = f), g && (c = !0, e.top = g), c && b.push(e);
        }), d = !1;

        try {
          d = {
            elemStyle: frameElement.style,
            elem: frameElement,
            css: {}
          }, d.css.position = d.elemStyle.position, d.elemStyle.position = "fixed", a.each(["top", "left", "right", "bottom"], function (a, b) {
            d.css[b] = d.elemStyle[b], d.elemStyle[b] = "0px";
          }), a.each(["height", "width"], function (a, b) {
            d.css[b] = d.elemStyle[b], d.elemStyle[b] = "100%";
          });
        } catch (f) {
          d = !1;
        }

        e = null;
      },
      cancelFullScreen: function cancelFullScreen() {
        b && (a.each(b, function (a, b) {
          "pos" in b && (b.elemStyle.position = b.pos), b.left && (b.elem.scrollLeft = b.left), b.top && (b.elem.scrollTop = b.top), b = null;
        }), b = []), d && (a.each(d.css, function (a, b) {
          d.elemStyle[a] = b;
        }), d = !1);
      },
      eventName: "fullscreenchange",
      exitName: "exitFullscreen",
      requestName: "requestFullscreen",
      elementName: "fullscreenElement",
      enabledName: ""
    };
    return f.cancelFullWindow = f.cancelFullScreen, f.requestFullWindow = f.requestFullScreen, f.supportsFullScreen && (f.enabledName = f.supportsFullScreen, f.exitName = t("exitFullscreen", document) || t("cancelFullScreen", document), f.elementName = t("fullscreenElement", document) || t("fullScreenElement", document), f.supportsFullScreen = !!f.supportsFullScreen, ("fullscreenElement" != f.elementName || "exitFullscreen" != f.exitName || "fullscreenEnabled" != f.enabledName) && a.each(s, function (a, b) {
      var c = b + "RequestFullscreen";
      return c in e || (c = b + "RequestFullScreen") && c in e ? (f.eventName = b + "fullscreenchange", f.requestName = c, !1) : void 0;
    }), f.isFullScreen = function () {
      return document[f.elementName];
    }, f.requestFullScreen = function (a) {
      return a[f.requestName]();
    }, f.cancelFullScreen = function () {
      return document[f.exitName]();
    }), c.parent != c && !function () {
      try {
        var b = c.frameElement;
        f.supportsFullScreen && ("allowfullscreen" in b && !b.allowfullscreen ? b.allowfullscreen = !0 : (null == b.getAttribute("webkitallowfullscreen") && b.setAttribute("webkitallowfullscreen", ""), null == b.getAttribute("allowfullscreen") && b.setAttribute("allowfullscreen", "allowfullscreen")));
      } catch (d) {
        f.supportsFullScreen || a("html").addClass("no-fullwindow");
      }
    }(), f;
  }(), a.jme.defineProp("fullscreen", {
    set: function set(b, d) {
      var e = a.jme.data(b);
      if (!(e && e.player || a(b).hasClass("player-fullscreen"))) return "noDataSet";

      if (d) {
        if (e.player.hasClass("player-fullscreen")) return "noDataSet";
        if (e.scrollPos = {
          top: a(c).scrollTop(),
          left: a(c).scrollLeft()
        }, a(document).off(".jmefullscreen").on("keydown.jmefullscreen", function (a) {
          return 27 == a.keyCode ? (e.player.jmeProp("fullscreen", !1), !1) : 32 !== a.keyCode || "form" in a.target ? void 0 : (e.media.jmeFn("togglePlay"), !1);
        }), "fullwindow" == d) a.jme.fullscreen.requestFullWindow(e.player[0]);else try {
          a.jme.fullscreen.requestFullScreen(e.player[0]);
        } catch (f) {}
        a("html").addClass("has-media-fullscreen"), e.player.addClass("player-fullscreen"), e.media.addClass("media-fullscreen"), a("button.play-pause", e.player).trigger("focus"), a.jme.fullscreen.supportsFullScreen && a(document).on(a.jme.fullscreen.eventName + ".jmefullscreen", function () {
          var c = a.jme.fullscreen.isFullScreen();
          c && b == c ? e.media.trigger("playerdimensionchange", ["fullscreen"]) : e.player.jmeProp("fullscreen", !1);
        }), e.media.trigger("playerdimensionchange", ["fullwindow"]);
      } else {
        if (e.player && !e.player.hasClass("player-fullscreen")) return "noDataSet";
        if (a(document).off(".jmefullscreen"), a("html").removeClass("has-media-fullscreen"), e.player && e.media && (e.player.removeClass("player-fullscreen"), e.media.removeClass("media-fullscreen")), a.jme.fullscreen.isFullScreen()) try {
          a.jme.fullscreen.cancelFullScreen();
        } catch (f) {} else a.jme.fullscreen.cancelFullWindow();
        e.scrollPos && (a(c).scrollTop(e.scrollPos.top), a(c).scrollLeft(e.scrollPos.left), delete e.scrollPos), e.media && e.media.trigger("playerdimensionchange");
      }

      return "noDataSet";
    },
    get: function get(b) {
      var c = a.jme.data(b);

      if (c && c.player) {
        var d = c.player.hasClass("player-fullscreen");
        return d ? a.jme.fullscreen.isFullScreen() || "fullwindow" : !1;
      }
    }
  }), a.jme.defineProp("autoplayfs"), a.jme.registerPlugin("buffer-progress", {
    _create: function _create(b, c, d, e) {
      var f,
          g = a('<div class="buffer-progress-indicator" />').appendTo(b),
          h = function h() {
        var a = c.jmeProp("progress");
        clearTimeout(f), e.progress !== a && (e.progress = a, g.css("width", a + "%"));
      };

      c.on({
        progress: h,
        emptied: function emptied() {
          g.css("width", 0), e.progress = 0;
        },
        playing: h,
        "seeked seeking updateprogress": function seekedSeekingUpdateprogress(a) {
          clearTimeout(f), "seeking" != a.type && (f = setTimeout(h, 100));
        }
      }), h();
    }
  }), a.jme.ButtonMenu = function (b, c, d) {
    var e = this;
    this.button = a(b).attr({
      "aria-haspopup": "true"
    }), this.clickHandler = d, this.toggle = a.proxy(this, "toggle"), this.keyIndex = a.proxy(this, "keyIndex"), this._buttonClick = a.proxy(this, "_buttonClick"), this.addMenu(c), this._closeFocusOut(), this.button.wsTouchClick(this.toggle).on("keydown", function (a) {
      return e.isVisible || 38 != a.keyCode && 40 != a.keyCode ? void 0 : (e.show(), !1);
    });
  }, a.jme.ButtonMenu.prototype = {
    addMenu: function addMenu(b) {
      this.menu && this.menu.remove(), this.menu = a(b), this.menu.insertAfter(this.button), this.clickHandler && (this.buttons = a("button", this.menu), this.menu.attr("role", "menu").on("keydown", this.keyIndex).wsTouchClick("button", this._buttonClick));
    },
    _closeFocusOut: function _closeFocusOut() {
      var a,
          b = this,
          c = function c() {
        clearTimeout(a), setTimeout(function () {
          clearTimeout(a);
        }, 9);
      };

      this.menu.parent().on("focusin mousedown click touchend", c).on("focusout", function () {
        a = setTimeout(function () {
          b.activeElement = !1, b.hide();
        }, 40);
      });
    },
    _buttonClick: function _buttonClick(a) {
      this.clickHandler && (this.clickHandler(this.buttons.index(a.currentTarget), a.currentTarget), this.hide());
    },
    keyIndex: function keyIndex(b) {
      var c = 40 == b.keyCode ? 1 : 38 == b.keyCode ? -1 : 0;

      if (27 == b.keyCode && this.hide(), c) {
        var d = this.buttons.not(":disabled"),
            e = d.filter(":focus");
        e = e[0] && d[d.index(e) + c] || d[c > 0 ? "first" : "last"](), a(e).trigger("focus"), b.preventDefault();
      }
    },
    show: function show() {
      if (!this.isVisible) {
        var b = a("button, select, input, textarea", this.menu).not(':disabled, [aria-diabled="true"]');
        this.isVisible = !0, this.menu.addClass("visible-menu");

        try {
          this.activeElement = document.activeElement || this.button[0];
        } catch (c) {
          this.activeElement = this.button[0];
        }

        setTimeout(function () {
          a(b.filter('[aria-checked="true"]').last()[0] || b[0]).trigger("focus");
        }, 60);
      }
    },
    toggle: function toggle() {
      this[this.isVisible ? "hide" : "show"]();
    },
    hide: function hide() {
      if (this.isVisible) {
        if (this.isVisible = !1, this.menu.removeClass("visible-menu"), this.activeElement) try {
          this.activeElement.focus();
        } catch (a) {}
        this.activeElement = !1;
      }
    }
  }, function () {
    var b = {
      add: function add(b, c, d) {
        var e,
            f,
            g = a.data(b, "jmeuseractivity") || a.data(b, "jmeuseractivity", {
          idletime: 2500,
          idle: !0,
          trigger: {}
        }),
            h = a(b),
            i = function i() {
          g.idle || (g.idle = !0, g.trigger.userinactive && h.trigger("userinactive"));
        },
            j = function j(a) {
          !a || "mousemove" === a.type && a.pageX === e && a.pageY === f || ("mousemove" === a.type && (e = a.pageX, f = a.pageY), g.idleTimer && clearTimeout(g.idleTimer), g.idleTimer = setTimeout(i, g.idletime), g.idle && (g.idle = !1, g.trigger.useractive && h.trigger("useractive")));
        };

        g.idletime = (c || {}).idletime || g.idletime, c && "idle" in c && (g.idle = c.idle), g.trigger[d] = !0, g.bound || (h.on("mouseleave.jmeuseractivity", i).on("touchend.jmeuseractivity setuseractive.jmeuseractivity mousemove.jmeuseractivity focusin.jmeuseractivity mouseenter.jmeuseractivity keydown.jmeuseractivity keyup.jmeuseractivity mousedown.jmeuseractivity", j), g.bound = !0), g.idle || j({
          type: "initunidled"
        });
      },
      remove: function remove(b, c) {
        var d = a.data(b, "jmeuseractivity") || a.data(b, "jmeuseractivity", {
          idletime: 2500,
          idle: !0,
          trigger: {}
        });
        d.trigger[c] = !1, d.trigger.useractive || d.trigger.userinactive || (a(b).off(".jmeuseractivity"), d.bound = !1);
      }
    };
    a.each(["useractive", "userinactive"], function (c, d) {
      a.event.special[d] = {
        setup: function setup(a) {
          b.add(this, a, d);
        },
        teardown: function teardown() {
          b.remove(this, d);
        }
      };
    });
  }();
});