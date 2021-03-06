"use strict";

webshim.ready("jmebase es5", function () {
  function a(a) {
    return a.src || a;
  }

  function b(b, c) {
    var d = !0;
    return c && b.length === c.length ? (b = b.map(a), e.each(c, function (a, c) {
      return -1 == b.indexOf(c.src || c) ? (d = !1, !1) : void 0;
    })) : d = !1, d;
  }

  function c(a) {
    return '<li role="presentation"><label><input type="radio" name="alternate-' + g + '" value="' + a.group + '" /><span>' + a.label + "</span></label></li>";
  }

  var d = window.webshim,
      e = d.$,
      f = e.jme;
  f.defineProp("currentAlternateSrc", {
    readonly: !0,
    get: function get(a) {
      var b,
          c,
          d = f.data(a),
          g = d.media.jmeFn("getAlternateSrcData"),
          h = d.media.prop("currentSrc");
      if (h) e.each(g.groups, function (a, c) {
        -1 != c.srces.indexOf(h) && (b = c);
      });else for (c in g.groups) {
        b = g[c];
        break;
      }
      return b;
    }
  }), f.defineMethod("getAlternateSrcData", function (a) {
    var b = {
      groups: {},
      groupLength: 0
    },
        c = f.data(this);
    return a || (a = c.media.jmeProp("srces")), a.forEach(function (a) {
      var c = a["data-alternate"];
      b.groups[c] || (b.groupLength++, b.groups[c] = {
        group: c,
        label: c,
        srces: []
      }), (a["data-label"] || a.title) && (b.groups[c].label = a["data-label"] || a.title), b.groups[c].srces.push(a.src);
    }), b.srces = a, b;
  }), f.defineMethod("orderAlternateByName", function (a, b) {
    var c = f.data(this);
    return b || (b = c.media.jmeProp("srces")), Array.isArray(a) || (a = [a]), a.reverse(), b.sort(function (b, c) {
      return a.indexOf(c["data-alternate"]) - a.indexOf(b["data-alternate"]);
    }), c.media.jmeProp("srces", b), b;
  }), f.defineMethod("switchAlternateByName", function (a, b) {
    var c = f.data(this),
        d = c.media.prop("paused"),
        g = c.media.prop("currentTime");
    e(this).jmeFn("orderAlternateByName", a, b), g > 1 && (c.media.play(), c.media.one("loadedmetadata", function () {
      d && c.media.pause(), c.media.prop("currentTime", g);
    })), d || c.media.play();
  });
  var g = 0;
  f.addToConfigmenu("alternate-media", function (a, d, f, h) {
    var i,
        j,
        k,
        l = function l(a) {
      var b = e.prop(a.target, "value");
      b && k && k.groups[b] && (d.jmeFn("switchAlternateByName", b, k.srces), h.hide());
    },
        m = function m() {
      var a;
      i && (a = d.jmeProp("currentAlternateSrc"), a && a.group && e('[value="' + a.group + '"]', i).prop("checked", !0));
    },
        n = function n(d) {
      if (!i || !k || !b(d.srces, k.srces)) {
        k = d, g++;
        var f = e.map(k.groups, c);
        i && i.remove(), i = e('<div class="media-submenu"><ul>' + f.join("") + "</ul></div>").appendTo(a), i.on("change", l);
      }

      m();
    },
        o = function o() {
      var a = d.jmeFn("getAlternateSrcData");
      a.groupLength ? n(a) : i && (i.remove(), i = null, k = null);
    },
        p = function p() {
      clearTimeout(j), j = setTimeout(o);
    };

    o(), d.on("loadstart emptied", p), d.on("loadedmetadata", m);
  }), d.ready("jme-base", function () {
    d.isReady("alternate-media", !0);
  });
});