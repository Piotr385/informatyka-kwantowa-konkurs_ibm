"use strict";

webshim.register("mediacapture", function (a, b, c, d, e, f) {
  "use strict";

  var g = -1,
      _h = a.noop,
      i = 'input[type="file"].ws-filereader, input[type="file"].ws-capture',
      j = a.Deferred();
  !function () {
    var c,
        d = !(!navigator.getUserMedia || navigator.wsGetUserMedia),
        e = swfmini.hasFlashPlayerVersion("11.3"),
        f = function f() {
      try {
        sessionStorage.setItem("wsCameras", JSON.stringify(g));
      } catch (a) {}
    },
        i = function i() {
      g = 0, f(), j.reject(g);
    },
        k = function k() {
      f(), j.resolve(g);
    };

    try {
      c = JSON.parse(sessionStorage.getItem("wsCameras")), null == c && (g = -1);
    } catch (l) {}

    0 === g || -1 == g && !d && !e ? i() : e ? _h = function h() {
      var c = b.cfg.mediaelement,
          d = c.playerPath || b.cfg.basePath + "swf/" + (c.playerName || "JarisFLVPlayer.swf"),
          e = "wscameralistdetection",
          f = {
        controltype: "1",
        jsapi: "1",
        source: "",
        id: e,
        evtId: e
      },
          j = {
        id: e,
        name: e
      },
          l = {
        allowscriptaccess: "always",
        allowNetworking: "all"
      },
          m = a('<div><div id="' + e + '"></div></div>').css({
        position: "absolute",
        left: -999,
        width: 5,
        height: 5,
        overflow: "hidden"
      }).appendTo("body");
      b.mediaelement.jarisEvent = b.mediaelement.jarisEvent || {}, b.mediaelement.jarisEvent[e] = function (a) {
        g = a.cameras, m.remove(), g ? k() : i();
      }, _h = a.noop, swfmini.embedSWF(d, e, "100%", "100%", "11.3", !1, f, l, j);
    } : (g = -1, k());
  }();

  var k = /image\/\*|image\/jp/i,
      _l = function l() {
    b.ready("WINDOWLOAD", function () {
      b.loader.loadList(["mediacapture-picker"]);
    }), _l = a.noop;
  },
      m = function m() {
    if (a(this).is("[capture].ws-filereader, .ws-capture") && b.implement(this, "capture")) {
      var c,
          d,
          e,
          f,
          g = a(this),
          h = g.prop("accept") || "image/*";
      if (!k.test(h)) return;
      e = a('<button type="button" class="ws-capture-button" />'), f = b.objectCreate(b.wsPopover, {}, a.extend({
        prepareFor: e
      })), f.element.addClass("capture-popover input-picker"), g.is(".ws-custom-file > *") ? (d = g.closest(".ws-custom-file"), c = a('<div class="ws-capture-file" />').insertAfter(d), c.append(e).append(d)) : g.before(e), f.element.insertAfter(e), e.on("click", function () {
        b.mediacapture.showContent(g, e, f), f.show();
      }), _l();
    }
  },
      n = function n() {
    var a = this;
    _h(), j.done(function () {
      m.call(a);
    });
  };

  b.mediacapture = {
    showContent: function showContent(a, c, d) {
      b.loader.loadList(["mediacapture-picker"]), b.ready("mediacapture-picker", function () {
        b.mediacapture.showContent(a, c, d);
      });
    }
  }, b.defineNodeNamesBooleanProperty("input", "capture"), g && (j.done(function () {
    n = m, b.loader.addModule("mediacapture-picker", {
      noAutoCallback: !0,
      css: "styles/forms-picker.css",
      options: f
    });
  }), b.addReady(function (b, c) {
    a(i, b).add(c.filter(i)).filter('[accept*="image"], :not([accept]), [accept=""]').each(n);
  }), b.ready("WINDOWLOAD", _h)), "complete" == d.readyState && b.isReady("WINDOWLOAD", !0);
});