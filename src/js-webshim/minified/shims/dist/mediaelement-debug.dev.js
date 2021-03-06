"use strict";

!function (a, b) {
  "use strict";

  function c(a, c, d, e) {
    var f,
        g,
        h = b.Deferred(),
        i = b("#wsmediatestcontainer"),
        j = b("<div />").css({
      width: 320,
      height: 120,
      "float": "left"
    }),
        k = b(document.createElement(e.nodeName)).attr({
      src: a.src,
      "data-type": c,
      controls: "controls",
      preload: "none"
    }),
        l = function l() {
      k.pause(), setTimeout(function () {
        j.remove(), b("video, audio", i).length || i.remove();
      }, 9), setTimeout(function () {
        h.resolve();
      }, 99);
    },
        m = function m(b) {
      var c = k.prop("duration"),
          e = k.prop("currentTime");
      c && c > 5 ? e > 0 && 5 > e ? l() : ("ended" == b.type || e >= c - 1) && (a.decode[d].endJump = !0, l()) : l();
    },
        n = function n(c) {
      if (clearTimeout(f), c) {
        if ("loadedmetadata" == c.type) {
          if ("swf" == d) try {
            a.decode[d] = k.getShadowElement().find("object, embed")[0].api_get("meta");
          } catch (c) {}
          (!a.decode[d] || b.isEmptyObject(a.decode[d])) && (a.decode[d] = {
            duration: k.prop("duration"),
            height: k.prop("videoHeight"),
            width: k.prop("videoWidth")
          }), a.decode[d].success = !0;
        } else a.decode[d] = {
          error: k.prop("error"),
          mediaError: k.data("mediaerror"),
          success: !1
        };
      } else a.decode[d] = {
        success: !1,
        timeout: !0
      };
      setTimeout(function () {
        k.play();
      }, 9), k.on("ended timeupdate", m), clearTimeout(g), setTimeout(l, 300);
    };

    return i.length || (i = b('<div id="wsmediatestcontainer" />').css({
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      padding: 10,
      zIndex: 9999999999
    }).prependTo("body")), k.on("mediaerror loadedmetadata", n).appendTo(j), "native" == d && k.on("error", n), j.appendTo(i), f = setTimeout(n, 4e4), g = setTimeout(function () {
      k.prop("muted", !0), k.play();
    }, 200), k.mediaLoad(), h;
  }

  function d(d, e) {
    var f = [],
        g = d.declaredContainer || d.computedContainer || d.headerContainer || "",
        h = a.cfg.mediaelement.preferFlash;
    return l && e.element.canPlayType(g) ? (a.cfg.mediaelement.preferFlash = !1, f.push(c(d, g, "native", e))) : d.decode["native"] = {
      success: !1,
      notsupported: !0
    }, k && !/youtube|rtmp/i.test(g) && -1 != j.swfMimeTypes.indexOf(g) ? (a.cfg.mediaelement.preferFlash = !0, f.push(c(d, g, "swf", e))) : d.decode.swf = {
      success: !1,
      notsupported: "video/youtube" != g
    }, a.cfg.mediaelement.preferFlash = h, b.when.apply(b, f);
  }

  function e(a, c) {
    var e = b.Deferred(),
        f = function f() {
      o || (o++, b(p).off("finish", f), d(a, c).always(function () {
        e.resolve(), o--, b(p).trigger("finish");
      }));
    };

    o ? b(p).on("finish", f) : f(), a.decode.promise = e.promise();
  }

  function f(a, c) {
    var d,
        f = {
      src: b.prop(a, "src"),
      attrSrc: b.trim(b.attr(a, "src")),
      declaredType: b.attr(a, "type") || b(a).attr("data-type") || "",
      errors: {},
      decode: {
        "native": {},
        swf: {}
      }
    };
    f.declaredContainer = f.declaredType.split(";")[0].trim();

    try {
      f.computedContainer = j.getTypeForSrc(f.src, c.nodeName);
    } catch (g) {
      f.computedContainer = "";
    }

    if (f.src.indexOf(m)) f.cors = !0;else try {
      f.headerType = "", f.headers = {}, d = b.ajax({
        url: f.src,
        type: "head",
        success: function success() {
          f.headerType = d.getResponseHeader("Content-Type") || "", /^\s*application\/octet\-stream\s*$/i.test(f.headerType) && (f.headerType = "", f.errors.octetStream = "octetStream"), f.headerContainer = b.trim(f.headerType.split(";")[0]), ["Location", "Content-Type", "Content-Length", "Accept-Ranges", "Content-Disposition", "Content-Encoding"].forEach(function (a) {
            f.headers[a] = d.getResponseHeader(a) || "";
          });
        },
        error: function error(a, b, c) {
          f.httpError = b, f.httpErrorText = c;
        }
      }), f.ajax = d;
    } catch (g) {}
    return e(f, c), f;
  }

  function g(a) {
    var c,
        d = [],
        e = [],
        g = b("source", a.element),
        h = [],
        i = b.Deferred(),
        j = 0,
        k = function k() {
      j++, j > 1 && i.resolve();
    };

    return b.prop(a.element, "src") && (c = f(a.element, a), c.attrMode = !0, c.typeNotRequired = !0, d.push(c)), g.each(function (b) {
      var c = f(this, a);
      c.typeNotRequired = !!(b && b >= g.length - 1), d.push(c), c.ajax && e.push(c.ajax), c.decode.promise && h.push(c.decode.promise);
    }), a.srces = d, b.when.apply(b, h).always(k), b.when.apply(b, e).done(k).fail(function () {
      setTimeout(k, 200);
    }), i.promise();
  }

  function h(a) {
    b.each(n, function (b, c) {
      var d,
          e = !1,
          f = c.message || b;
      c.srcTest ? (c.srcTest.poster && (d = c.test(a.poster, a), d && ("string" == typeof d ? a.poster.errors[b] = d : (a.poster.errors[b] = f, e = !0))), c.srcTest.srces && a.srces.forEach(function (g) {
        d = c.test(g, a), d && ("string" == typeof d ? g.errors[b] = d : (g.errors[b] = f, e = !0));
      })) : e = c.test(a), e && a.errors.push({
        message: f,
        level: c.level,
        name: b
      });
    }), a.errors.sort(function (a, b) {
      return a.level > b.level;
    }), console.log("---- Media Test Start ----"), console.log("Testing results for mediaelement network + markup debugger. For detailed information expand the following object:", a), a.errors.length ? (console.log(a.errors[0].level < 3 ? "Found " + a.errors.length + " errors/warnings with at least 1 critical issue." : a.errors[0].level < 4 ? "Found " + a.errors.length + " errors/warnings." : "Found " + a.errors.length + " warnings but no critical issue."), a.errors.forEach(function (a) {
      var b = "log";
      console.error && console.warn && (a.level < 3 ? b = "error" : a.level < 4 && (b = "warn")), console[b](a.message, "priority level: " + a.level, a.name);
    })) : console.log("Congratulations: No errors found for video."), console.log("---- Media Test End ----"), console.log("----");
  }

  function i(a) {
    var c = {
      element: a,
      nodeName: a.nodeName.toLowerCase(),
      errors: [],
      poster: {
        src: b.prop(a, "poster"),
        attrSrc: b.trim(b.attr(a, "poster")),
        errors: {}
      },
      mediaError: b.prop(a, "error"),
      wsError: b(a).data("mediaerror")
    },
        d = g(c),
        e = function e() {
      h(c);
    };

    d.always(e);
  }

  if (window.console) {
    var j = a.mediaelement,
        k = swfmini.hasFlashPlayerVersion("10.0.3"),
        l = a.support.mediaelement,
        m = location.protocol + "//" + location.hostname,
        n = {
      urlInValid: {
        level: 1,
        test: function () {
          var a = /^[a-z0-9\,\.\:\/\-_\;\?#\+\*\!\(\)\$\;\&\=\+]+$/i;
          return function (b) {
            return b.src && !a.test(b.src);
          };
        }(),
        srcTest: {
          poster: 1,
          srces: 1
        },
        message: "URL has invalid characters. Remove any special characters and mutated vowels."
      },
      noHeaderTest: {
        level: 5,
        test: function test(a) {
          return "video/youtube" != a.computedContainer && !a.ajax && !a.httpError;
        },
        srcTest: {
          srces: 1
        },
        message: "Could not run HTTP network tests (cross-domain) for all sources. Check manually."
      },
      hasNoTypeAttribute: {
        level: 4,
        test: function test(a) {
          return !a.declaredType && !a.typeNotRequired;
        },
        srcTest: {
          srces: 1
        },
        message: "The source element has no type attribute specified. Browser needs to download file before testing compatibility. Add a proper type attribute."
      },
      couldNotComputeTypeDeclaredTypeAbsent: {
        level: 1,
        test: function test(a) {
          return !a.computedContainer && !a.declaredType;
        },
        srcTest: {
          srces: 1
        },
        message: "The source element has no type attribute specified and the extensions seems unknown. Add a proper type attribute."
      },
      httpError: {
        level: 2.5,
        test: function test(a) {
          return !a.ajax || a.decode.swf.success || a.decode["native"].success ? "not testable" : !(!a.httpError || a.httpErrorText);
        },
        srcTest: {
          srces: 1
        },
        message: "There was an unknown http error. Check source/URL."
      },
      fileEncoding: {
        test: function test() {
          return "This test does not test file encoding, framerate compatibility, moov index, encoding profiles. So there is room to fail!";
        },
        srcTest: {
          srces: 1
        }
      },
      explicitHttpError: {
        level: 1,
        test: function test(a) {
          return !a.ajax || a.decode.swf.success || a.decode["native"].success ? "not testable" : !!a.httpErrorText;
        },
        srcTest: {
          srces: 1
        },
        message: "There was a http error. Check source/URL."
      },
      charsetInContentType: {
        level: 2.5,
        test: function test(a) {
          return !a.ajax || a.httpError ? "not testable" : a.headerType && /charset=/i.test(a.headerType);
        },
        srcTest: {
          srces: 1
        },
        message: "Content-Type header of media file sends charset. Remove charset information."
      },
      explicitTypeMix: {
        level: 3,
        test: function test(a) {
          return a.declaredContainer && a.headerType ? a.headerType != a.declaredType : "not testable";
        },
        srcTest: {
          srces: 1
        },
        message: "Content-Type header and attribute type do not match. Set same and proper type value."
      },
      noContentType: {
        level: 2.5,
        test: function test(a) {
          return a.ajax && !a.httpError ? !a.headerType : "not testable";
        },
        srcTest: {
          srces: 1
        },
        message: "Content-Type header for media file is either empty or application/octet-stream."
      },
      noContentLength: {
        level: 3,
        test: function test(a) {
          return a.ajax && !a.httpError ? !a.headers["Content-Length"] : "not testable";
        },
        srcTest: {
          srces: 1
        },
        message: "Content-Length header for media file does not send value."
      },
      noRange: {
        level: 3,
        test: function test(a) {
          return a.ajax && !a.httpError ? !a.headers["Accept-Ranges"] : "not testable";
        },
        srcTest: {
          srces: 1
        },
        message: "Accept-Ranges header for media file does not send value. Make sure server supports Range requests in bytes"
      },
      explicitNoRange: {
        level: 2.5,
        test: function test(a) {
          return a.ajax && !a.httpError ? "none" == a.headers["Accept-Ranges"] : "not testable";
        },
        srcTest: {
          srces: 1
        },
        message: "Server does not support Range requests. Make sure server supports Range requests in bytes"
      },
      doubleEncoded: {
        level: 1,
        test: function test(a) {
          return a.ajax && !a.httpError ? /[defalte|gzip]/i.test(a.headers["Content-Encoding"]) : "not testable";
        },
        srcTest: {
          srces: 1
        },
        message: "Content of media file is encoded with gzip/defalte. Make sure to not encode it. It's already encoded."
      },
      mediaAttachment: {
        level: 1,
        test: function test(a) {
          return a.ajax && !a.httpError ? /attach/i.test(a.headers["Content-Disposition"]) : "not testable";
        },
        srcTest: {
          srces: 1
        },
        message: "Content-Disposition header wants media file to be downloaded, but not to be played."
      },
      badTypeMix: {
        level: 1,
        test: function test(a, b) {
          var c,
              d,
              e = !1,
              f = a.declaredContainer || a.computedContainer,
              g = a.headerContainer;
          return g && f ? g != f && (c = -1 != j.swfMimeTypes.indexOf(f), d = -1 != j.swfMimeTypes.indexOf(g), c != d && (e = !0), !e && b.element.canPlayType && (c = !!b.element.canPlayType(f), d = !!b.element.canPlayType(g), c != d && (e = !0))) : e = "not testable", e;
        },
        srcTest: {
          srces: 1
        },
        message: "Content-Type header and attribute type do not match and are quite different. Set same and proper type value."
      },
      typeMix: {
        level: 2.5,
        test: function test(a, b) {
          var c,
              d,
              e = !1;
          return !a.headerContainer && a.declaredContainer && a.computedContainer && a.computedContainer != a.declaredContainer && (c = -1 != j.swfMimeTypes.indexOf(a.computedContainer), d = -1 != j.swfMimeTypes.indexOf(a.declaredContainer), c != d && (e = !0), !e && b.element.canPlayType && (c = !!b.element.canPlayType(a.computedContainer), d = !!b.element.canPlayType(a.declaredContainer), c != d && (e = !0))), e;
        },
        srcTest: {
          srces: 1
        },
        message: "Computed type and declared type are different. Needs manual check."
      },
      hasNoPlayableSrc: {
        level: 1,
        test: function test(a) {
          var c = !1;
          return b.each(a.srces, function (b, d) {
            var e = d.declaredContainer || d.computedContainer,
                f = d.headerContainer || e;
            return -1 != j.swfMimeTypes.indexOf(e) ? (c = !0, !1) : a.element.canPlayType && a.element.canPlayType(e) && a.element.canPlayType(f) ? (c = !0, !1) : void 0;
          }), !c;
        },
        message: "Mediaelement has no source to be played in browser or by plugin. Use at least a video/mp4 source."
      },
      endJump: {
        level: 2.5,
        test: function test(a) {
          return a.decode.swf.endJump || a.decode["native"].endJump;
        },
        srcTest: {
          srces: 1
        },
        message: "src jumped to end too soon. Check negative timestamps: https://bugzilla.mozilla.org/show_bug.cgi?id=868797"
      },
      swfTimeout: {
        level: 3,
        test: function test(a) {
          return a.decode.swf.timeout;
        },
        srcTest: {
          srces: 1
        },
        message: "Could not run decode tests. Maybe moovposition is on end?"
      },
      moovPosition: {
        level: 2,
        test: function test(a) {
          return a.decode.swf.moovposition ? a.decode.swf.moovposition > 300 : !1;
        },
        srcTest: {
          srces: 1
        }
      },
      tabletDecode: {
        level: 2,
        test: function test(a) {
          var c = !1,
              d = !1;
          return k && b.each(a.srces, function (a, b) {
            var e = b.decode.swf;
            return "videocodecid" in e && (c = !0), "avc1" != e.videocodecid || e.avclevel > 31 || e.height * e.width > 921600 ? void 0 : (d = !0, !1);
          }), c ? !d : !1;
        },
        message: "Not playable on more than 25% of smartphone and more than 15% of tablet devices. In case you want to support 75% of smartphone- and 90% of tablet devices you need to provide a source encoded with H.264, High Profile (HP), Level 3.1, up to 1280 * 720."
      },
      allTabletDecode: {
        level: 3,
        test: function test(a) {
          var c = !1,
              d = !1;
          return k && b.each(a.srces, function (a, b) {
            var e = b.decode.swf;
            return "videocodecid" in e && (c = !0), "avc1" != e.videocodecid || e.avcprofile > 77 || e.avclevel > 31 || e.height * e.width > 921600 ? void 0 : (d = !0, !1);
          }), c ? !d : !1;
        },
        message: "Not playable on more than 15% of smartphone and more than 5% of tablet devices. In case you want to support 90% of smartphone- and 99% of tablet devices you need to provide a source encoded with H.264, Main Profile (HP), Level 3.1, up to 1280 * 720."
      },
      smartphoneDecode: {
        level: 3.5,
        test: function test(a) {
          var c = !1,
              d = !1;
          return k && b.each(a.srces, function (a, b) {
            var e = b.decode.swf;
            return "videocodecid" in e && (c = !0), "avc1" != e.videocodecid || e.avcprofile > 77 || e.avclevel > 30 || e.height * e.width > 345600 ? void 0 : (d = !0, !1);
          }), c ? !d : !1;
        },
        message: "Not playable on more than 10% of smartphones: In case you want to support 90% of smartphone- and 99% of tablet devices you need to provide a source encoded with H.264, Main Profile (HP), Level 3.1, up to 720 * 404 / 640 * 480."
      },
      notAllSmartphoneDecode: {
        level: 4,
        test: function test(a) {
          var c = !1,
              d = !1;
          return k && b.each(a.srces, function (a, b) {
            var e = b.decode.swf;
            return "videocodecid" in e && (c = !0), "avc1" != e.videocodecid || e.avcprofile > 66 || e.avclevel > 30 || e.height * e.width > 307200 ? void 0 : (d = !0, !1);
          }), c ? !d : !1;
        },
        message: "Not playable on more than 1% of smartphones: In case you want to support 99% of all devices you need to provide a source encoded with H.264, Baseline Profile (BP), Level 3.0, up to 720 * 404 / 640 * 480. You might want to use multiple sources to satisfy quality and maximum device compatibility."
      },
      needsFlashInstalled: {
        level: 1,
        test: function test(a) {
          var c = !1,
              d = !1;
          return k || b.each(a.srces, function (b, e) {
            var f = e.declaredContainer || e.computedContainer,
                g = e.headerContainer || f;
            return -1 != j.swfMimeTypes.indexOf(f) && (c = !0), a.element.canPlayType && ("video/youtube" == f || a.element.canPlayType(f) && a.element.canPlayType(g)) ? (d = !0, !1) : void 0;
          }), c && !d;
        },
        message: "While media file could be played by flash plugin, Browser has no flash installed. Use at least a video/mp4 source and install flash. Or add additionally a video/webm file."
      },
      hasNoSwfPlayableSrc: {
        level: 1,
        test: function test(a) {
          var c = !1;
          return b.each(a.srces, function (a, b) {
            var d = b.declaredContainer || b.computedContainer;
            return -1 != j.swfMimeTypes.indexOf(d) ? (c = !0, !1) : void 0;
          }), !c;
        },
        message: "Mediaelement has no source to be played by fallback plugin. Use at least a video/mp4 source."
      },
      hasNoNativePlayableSrc: {
        level: 4,
        test: function test(a) {
          var c = !1;
          return a.element.canPlayType && b.each(a.srces, function (b, d) {
            var e = d.declaredContainer || d.computedContainer,
                f = d.headerContainer || e;
            return "video/youtube" == e || a.element.canPlayType(e) && a.element.canPlayType(f) ? (c = !0, !1) : void 0;
          }), !c;
        },
        message: "Mediaelement has no source to be played native. Use at least a video/mp4 and a video/webm source."
      },
      misLeadingAttrMode: {
        level: 2,
        test: function test(a) {
          return a.srces.length > 1 && a.srces[0].attrMode;
        },
        message: "Mediaelement has a src attribute and some source child elements. Only src attribute is used."
      },
      emptySrc: {
        level: 2,
        test: function test(a) {
          return a.src && !a.attrSrc;
        },
        srcTest: {
          poster: 1,
          srces: 1
        },
        message: "The src or poster attribute is an empty string, which is not allowed."
      }
    },
        o = 0,
        p = {},
        q = function q(a) {
      var b = this;
      setTimeout(function () {
        i(b);
      }, 100 * a);
    };

    console.log('Running mediaelement debugger. Only run these tests in development never in production. set webshim.setOptions("debug", false); to remove. Debugger only tests media on same domain and does not test all file encoding issues. So there is still room to fail!'), a.cfg.extendNative && console.log('mediaelement debugger does not detect all problems with extendNative set to true. Please set webshim.setOptions("extendNative", false);'), a.addReady(function (a, c) {
      b("video, audio", a).add(c.filter("video, audio")).each(q);
    }), a.mediaelement.getMediaInfo = i;
  }
}(webshim, webshim.$);