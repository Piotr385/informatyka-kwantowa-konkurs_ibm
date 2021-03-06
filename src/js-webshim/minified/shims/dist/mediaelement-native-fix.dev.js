"use strict";

webshims.register("mediaelement-native-fix", function (a, b, c, d) {
  var e = b.support,
      f = function () {
    if (e.videoBuffered) return a.noop;

    var c = function c(a) {
      var c = b.data(a, "mediaelementBuffered");
      return c || (c = {
        buffered: {
          start: function start(a) {
            return a >= c.buffered.length ? void b.error("buffered index size error") : 0;
          },
          end: function end(a) {
            return a >= c.buffered.length ? void b.error("buffered index size error") : c.loaded;
          },
          length: 0
        },
        loaded: 0
      }, b.data(a, "mediaelementBuffered", c)), c;
    },
        d = function d(_d) {
      if (_d = _d.originalEvent, _d && "lengthComputable" in _d) {
        var e = b.data(_d.target, "mediaelement");

        if ((!e || "html5" == e.isActive) && _d.lengthComputable && "loaded" in _d) {
          var f = _d.target.duration,
              g = c(_d.target);
          g.loaded = f ? _d.loaded / _d.total * f : 0, g.loaded && (g.buffered.length = 1), "load" == _d.type && a(_d.target).triggerHandler("progress");
        }
      }
    },
        f = function f(a) {
      var b = c(a.target);
      b.buffered.length = 0, b.loaded = 0;
    };

    return ["audio", "video"].forEach(function (a) {
      var d = b.defineNodeNameProperty(a, "buffered", {
        prop: {
          get: function get() {
            var a = b.data(this, "mediaelement");
            return a && "flash" == a.isActive && d.prop._supget ? void d.prop._supget.apply(this) : c(this).buffered;
          }
        }
      });
    }), function () {
      a(this).off("load progress", d).off("emptied", f).on("load progress", d).on("emptied", f);
    };
  }();

  !function () {
    var a = d.createElement("video");

    if (!("preload" in a) && "autobuffer" in a) {
      var c = {
        metadata: 1,
        none: 1
      };
      b.onNodeNamesPropertyModify(["audio", "video"], ["preload"], {
        set: function set(a, d, e) {
          c[a] || "removeAttr" == e ? this.autobuffer = !1 : "html5" == !(b.data(this, "mediaelement") || {}).isActive && (this.autobuffer = !0);
        },
        initAttr: !0
      });
    }
  }();

  var g = function () {
    return e.mediaDefaultMuted ? a.noop : function () {
      if (!a.data(this, "fixedMediaProgress")) {
        var d,
            e,
            f = this,
            g = function g() {
          var b = a.prop(f, "buffered");

          if (b) {
            for (var c = "", d = 0, e = b.length; e > d; d++) {
              c += b.end(d);
            }

            return c;
          }
        },
            h = function h() {
          var c = g();
          c != e && (e = c, b.error("needed to trigger progress manually"), a(f).triggerHandler("progress"));
        };

        a(this).data("fixedMediaProgress", !0).on({
          "play loadstart progress": function playLoadstartProgress(a) {
            "progress" == a.type && (e = g(this)), clearTimeout(d), d = setTimeout(h, 800);
          },
          "emptied stalled mediaerror abort suspend": function emptiedStalledMediaerrorAbortSuspend(a) {
            "emptied" == a.type && (e = !1), clearTimeout(d);
          }
        }), "ActiveXObject" in c && a.prop(this, "paused") && !a.prop(this, "readyState") && a(this).is('audio[preload="none"][controls]:not([autoplay],.nonnative-api-active)') && a(this).prop("preload", "metadata").mediaLoad();
      }
    };
  }();

  b.addReady(function (b, c) {
    a("video, audio", b).add(c.filter("video, audio")).each(f).each(g);
  });
});