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

webshims.isReady("swfmini", !0), webshims.register("form-core", function (a, b, c, d, e, f) {
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