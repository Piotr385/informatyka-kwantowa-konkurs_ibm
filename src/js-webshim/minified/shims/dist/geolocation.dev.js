"use strict";

!function (a) {
  var b = window.webshims;
  setTimeout(function () {
    b.isReady("geolocation", !0);
  });

  var c = function c() {
    setTimeout(function () {
      throw "document.write is overwritten by geolocation shim. This method is incompatible with this plugin";
    }, 1);
  },
      d = 0,
      e = b.cfg.geolocation || {};

  navigator.geolocation || (navigator.geolocation = {}), a.extend(navigator.geolocation, function () {
    var f,
        g = {
      getCurrentPosition: function getCurrentPosition(d, g, h) {
        var i,
            j,
            k,
            l = 2,
            m = function m() {
          if (!k) if (f) {
            if (k = !0, d(a.extend({
              timestamp: new Date().getTime()
            }, f)), o(), window.JSON && window.sessionStorage) try {
              sessionStorage.setItem("storedGeolocationData654321", JSON.stringify(f));
            } catch (b) {}
          } else g && !l && (k = !0, o(), g({
            code: 2,
            message: "POSITION_UNAVAILABLE"
          }));
        },
            n = function n() {
          l--, p(), m();
        },
            o = function o() {
          a(document).off("google-loader", o), clearTimeout(j), clearTimeout(i);
        },
            p = function p() {
          if (f || !window.google || !google.loader || !google.loader.ClientLocation) return !1;
          var b = google.loader.ClientLocation;
          return f = {
            coords: {
              latitude: b.latitude,
              longitude: b.longitude,
              altitude: null,
              accuracy: 43e3,
              altitudeAccuracy: null,
              heading: parseInt("NaN", 10),
              velocity: null
            },
            address: a.extend({
              streetNumber: "",
              street: "",
              premises: "",
              county: "",
              postalCode: ""
            }, b.address)
          }, !0;
        },
            q = function q() {
          if (!f && (p(), !f && window.JSON && window.sessionStorage)) try {
            f = sessionStorage.getItem("storedGeolocationData654321"), f = f ? JSON.parse(f) : !1, f.coords || (f = !1);
          } catch (a) {
            f = !1;
          }
        };

        return q(), f ? void setTimeout(m, 1) : e.confirmText && !confirm(e.confirmText.replace("{location}", location.hostname)) ? void (g && g({
          code: 1,
          message: "PERMISSION_DENIED"
        })) : (a.ajax({
          url: "http://freegeoip.net/json/",
          dataType: "jsonp",
          cache: !0,
          jsonp: "callback",
          success: function success(a) {
            l--, a && (f = f || {
              coords: {
                latitude: a.latitude,
                longitude: a.longitude,
                altitude: null,
                accuracy: 43e3,
                altitudeAccuracy: null,
                heading: parseInt("NaN", 10),
                velocity: null
              },
              address: {
                city: a.city,
                country: a.country_name,
                countryCode: a.country_code,
                county: "",
                postalCode: a.zipcode,
                premises: "",
                region: a.region_name,
                street: "",
                streetNumber: ""
              }
            }, m());
          },
          error: function error() {
            l--, m();
          }
        }), clearTimeout(j), window.google && window.google.loader ? l-- : j = setTimeout(function () {
          e.destroyWrite && (document.write = c, document.writeln = c), a(document).one("google-loader", n), b.loader.loadScript("http://www.google.com/jsapi", !1, "google-loader");
        }, 800), void (i = h && h.timeout ? setTimeout(function () {
          o(), g && g({
            code: 3,
            message: "TIMEOUT"
          });
        }, h.timeout) : setTimeout(function () {
          l = 0, m();
        }, 1e4)));
      },
      clearWatch: a.noop
    };
    return g.watchPosition = function (a, b, c) {
      return g.getCurrentPosition(a, b, c), d++, d;
    }, g;
  }()), b.isReady("geolocation", !0);
}(webshims.$);