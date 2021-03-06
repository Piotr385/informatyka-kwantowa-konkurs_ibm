"use strict";

webshim.register("usermedia-shim", function (a, b, c, d, e, f) {
  "use strict";

  function g(a, c, d) {
    n ? b.mediaelement.createSWF ? h(a, c, d) : (b.loader.loadList(["swfmini-embed"]), b.mediaelement.loadSwf = !0, b.reTest(["mediaelement-jaris"], !0), b.ready("mediaelement-jaris", function () {
      h(a, c, d);
    })) : d({
      name: "NOT_SUPPORTED_ERROR"
    });
  }

  function h(a, b, c) {
    var d,
        e = i();
    e && (l++, d = "webshimstream:stream" + l, m[d] = {
      src: d,
      success: b,
      fail: c
    }, _k(), o.createSWF(e, {
      srcProp: d,
      streamrequest: !0,
      type: "jarisplayer/stream"
    }));
  }

  function i() {
    var c = a("video");
    return c = c.filter(".ws-usermedia"), c.length || (c = c.end()), 1 != c.length && (c = c.filter(p)), 1 != c.length && b.error('for getUserMedia an empty video element has to be already in the DOM. If you provide multiple empty videos. please mark your suggested video using the "ws-usermedia" class.'), c[0];
  }

  function j(a, c, d) {
    a._cTNow = Date.now(), a._cTID = !1, b.defineProperties(this, {
      _swf: {
        value: c,
        enumerable: !1
      },
      _data: {
        value: a,
        enumerable: !1
      },
      _wsStreamId: {
        value: d,
        enumerable: !1
      }
    });
  }

  var _k,
      l = 0,
      m = {},
      n = swfmini.hasFlashPlayerVersion("11.3"),
      o = b.mediaelement,
      p = function p() {
    return !a.prop(this, "currentSrc") && !o.srces(this).length;
  };

  j.prototype = {
    stop: function stop() {
      this._data._cTID && clearInterval(this._data._cTID), o.queueSwfMethod(this._data._elem, "api_detach", [], this._data), this._data.ended = !0, a(this._data._elem).trigger("ended");
    }
  }, b.usermedia = {
    attach: function attach(c, d, e) {
      var f;
      e._usermedia == d.srcProp ? (o.queueSwfMethod(e._elem, "api_attach", [], e), f = a(e._elem).trigger("loadstart"), e._cTID = setInterval(function () {
        e.ended ? clearInterval(e._cTID) : e.paused || (e.currentTime = (Date.now() - e._cTNow) / 1e3, f.triggerHandler("timeupdate"));
      }, 250), e.paused || o.queueSwfMethod(e._elem, "api_play", [], e)) : b.error("something went wrong");
    },
    request: function request(b, c, d) {
      d._usermedia = c.srcProp, a(d.api).css(f.inline || a(b).hasClass("ws-inlineusermedia") ? {
        position: "relative",
        zIndex: "999999"
      } : {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: 150,
        zIndex: "999999"
      });
    }
  }, _k = function k() {
    if (b.mediaelement.createSWF) {
      _k = a.noop;

      var c = function c(b) {
        setTimeout(function () {
          a(b.api).css({
            position: "",
            top: "",
            left: "",
            width: "",
            height: "",
            zIndex: ""
          }), a.prop(b._elem, "controls") && a.prop(b._elem, "controls", !0);
        }, 50);
      },
          d = function d(a, b) {
        c(b), m[b._usermedia].fail({
          name: a.type
        });
      };

      a.extend(o.onEvent, {
        NotSupportedError: d,
        PermissionDeniedError: d,
        ConstraintNotSatisfiedError: d,
        onUserSuccess: function onUserSuccess(a, b) {
          c(b), m[b._usermedia].success(new j(b, b.api, b._usermedia));
        }
      });
    }
  }, b.ready("mediaelement-jaris", _k), b.getUserMedia = g, navigator.wsGetUserMedia = g, b.isReady("usermedia-api", !0);
});