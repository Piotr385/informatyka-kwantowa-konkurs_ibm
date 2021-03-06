"use strict";

webshim.register("sticky", function (a, b, c, d, e, f) {
  "use strict";

  function g(a, b, c) {
    var e = a + ":",
        f = d.createElement("test"),
        g = f.style;
    return g.cssText = c ? e + b : e + ["-webkit-", "-moz-", "-ms-", "-o-", ""].join(b + ";" + e) + b + ";", g[a];
  }

  function h() {
    return {
      top: a.css(this, "top"),
      bottom: a.css(this, "bottom")
    };
  }

  function i(b) {
    k++, l++, this.evtid = ".wsstickyid" + k, this.$el = a(b).data("wsSticky", this), this.isTable = this.$el.is("thead, tbody, tfoot"), this.$parent = this.$el.parent(), this.elStyle = b.style, this.ankered = "", this.isSticky = !1, this.$placeholder = null, this.stickyData = {
      inline: {}
    }, this.parentData = {}, this.getParentData = this.getCommonParentData, this.addEvents(), this.update(!0);
  }

  function j(b) {
    k++, l++, this.evtid = ".wsstickyid" + k, this.$el = a(b).data("wsSticky", this), this.isTable = this.$el.is("thead, tbody, tfoot"), this.$parent = this.$el.parent(), this.elStyle = b.style, this.ankered = "", this.isSticky = !1, this.$placeholder = null, this.stickyData = {
      inline: {}
    }, this.parentData = {}, "static" == this.$parent.css("position") && this.$parent.css("position", "relative"), this.updatePos2 = this.updatePos2.bind(this), this.addEvents(), this.update(!0);
  }

  var k = 0,
      l = 0,
      m = a(c),
      n = function () {
    var a,
        b = "pageYOffset";
    return b in c ? function () {
      return c[b];
    } : (a = d.documentElement, function () {
      return a.scrollTop;
    });
  }(),
      o = "ontouchstart" in c || c.matchMedia("(max-device-width: 721px)").matches,
      p = {
    fixed: g("position", "fixed", !0),
    sticky: g("position", "sticky")
  },
      q = {
    getPosition: function getPosition() {
      this.isSticky || (this.position = {
        top: this.$el.css("top"),
        bottom: this.$el.css("bottom")
      }, ("auto" != this.position.top && "auto" != this.position.bottom || "auto" == this.position.top && "auto" == this.position.bottom) && "static" == this.$el.css("position") && (this.position = a.swap(this.$el[0], {
        position: "absolute"
      }, h)), "auto" !== this.position.top ? this.ankered = "top" : "auto" !== this.position.bottom && (this.ankered = "bottom"), "top" == this.ankered ? this.position.top = parseFloat(this.position.top, 10) || 0 : "bottom" == this.ankered && (this.position.bottom = parseFloat(this.position.bottom, 10) || 0));
    },
    update: function update(a) {
      !this.disabled && this.$el[0].offsetWidth && (a && (this.isSticky && this.removeSticky(), this.getPosition()), this.updateDimension());
    },
    setTdWidth: function setTdWidth() {
      this.isTable && this.$el.find("td, th").each(this._setInlineWidth);
    },
    _setInlineWidth: function _setInlineWidth() {
      a.data(this, "inlineWidth", this.style.width), a(this).innerWidth(a(this).innerWidth());
    },
    _restoreInlineWidth: function _restoreInlineWidth() {
      this.style.width = a.data(this, "inlineWidth") || "", a.removeData(this, "inlineWidth");
    },
    removeSticky: function removeSticky() {
      this.$el.removeClass("ws-sticky-on"), this.$el.css(this.stickyData.inline), this.$placeholder.detach(), this.isSticky = !1, this.isTable && this.$el.find("td, th").each(this._restoreInlineWidth);
    },
    commonAddEvents: function commonAddEvents() {
      var b,
          e = this,
          f = function f() {
        e.update();
      },
          g = this.$el.data("stickymedia"),
          h = c.matchMedia && g ? matchMedia(g) : !1;

      m.one("load", f), a(d).on("updateshadowdom" + this.evtid, f), this.$el.on("updatesticky" + this.evtid, function (a) {
        e.update(!0), a.stopPropagation();
      }), this.$el.on("disablesticky" + this.evtid, function (a) {
        e.disable(!0), a.stopPropagation();
      }), this.$el.on("enablesticky" + this.evtid, function (a) {
        e.disable(!1), a.stopPropagation();
      }), this.$el.on("remove" + this.evtid + " destroysticky" + this.evtid, function (b) {
        m.off(e.evtid), a(d).off(e.evtid), e.$el.off(e.evtid), e.$parent.off(e.evtid), e.$el.removeData("wsSticky").removeClass("ws-sticky"), e.$placeholder && (e.$el.removeClass("ws-sticky-on"), e.$placeholder.remove()), l--, b.stopPropagation();
      }), h && h.addListener && (b = function b() {
        e.disable(!h.matches);
      }, h.addListener(b), b());
    },
    disable: function disable(a) {
      return arguments.length ? void (this.disabled != a && (this.disabled = !!a, this.disabled ? this.isSticky && this.removeSticky() : this.update(!0))) : this.disabled;
    },
    setSticky: function setSticky() {
      this.$placeholder || (this.$placeholder = a(this.isTable ? this.$el[0].cloneNode(!0) : d.createElement(this.$el[0].nodeName || "div")), this.$placeholder.addClass("ws-fixedsticky-placeholder").removeClass("ws-sticky")), this.setTdWidth(), this.$placeholder.insertAfter(this.$el).outerHeight(this.stickyData.outerHeight, !0).outerWidth(this.stickyData.outerWidth), this.isSticky = !0, this.$el.addClass("ws-sticky-on"), this.isTable || this.stickyData.width != this.$el.width() && this.$el.width(this.stickyData.width);
    },
    getCommonStickyData: function getCommonStickyData() {
      var a = parseFloat(this.$el.css("marginTop"), 10) || 0;
      this.stickyData.scrollTop = this.stickyData.top - a, this.stickyData.outerHeight = this.$el.outerHeight(!0), this.stickyData.bottom = this.stickyData.top + this.stickyData.outerHeight - a, this.stickyData.width = this.$el.width(), this.stickyData.outerWidth = this.$el.outerWidth(), this.stickyData.marginLeft = parseFloat(this.$el.css("marginLeft"), 10) || 0, this.stickyData.offsetLeft = this.$el[0].offsetLeft, this.stickyData.inline.width = this.elStyle.width, this.stickyData.inline.marginLeft = this.elStyle.marginLeft, "top" == this.ankered ? this.stickyData.inline.top = this.elStyle.top : "bottom" == this.ankered && (this.stickyData.inline.bottom = this.elStyle.bottom);
    },
    getCommonParentData: function getCommonParentData() {
      this.parentData.paddingTop = parseFloat(this.$parent.css("paddingTop"), 10) || 0, this.parentData.offsetTop = this.$parent.offset().top, this.parentData.top = this.parentData.offsetTop + (parseFloat(this.$parent.css("borderTopWidth"), 10) || 0) + this.parentData.paddingTop, this.parentData.height = this.$parent.height(), this.parentData.bottom = this.parentData.top + this.parentData.height;
    }
  };

  if (!o || "disable" != f.touchStrategy) {
    a.extend(i.prototype, q, {
      addEvents: function addEvents() {
        var a = this;
        this.commonAddEvents(), m.on("scroll" + this.evtid, function () {
          !a.disabled && a.ankered && a.$el[0].offsetWidth && a.updatePos();
        });
      },
      getStickyData: function getStickyData() {
        this.stickyData.top = this.$el.offset().top, this.getCommonStickyData();
      },
      updateDimension: function updateDimension(a) {
        this.isSticky && this.removeSticky(), this.getParentData(), this.getStickyData(), "bottom" == this.ankered && (this.viewportBottomAnker = m.height() - this.position.bottom), !a && this.ankered && this.updatePos(!0);
      },
      updatePos: function updatePos(a) {
        var b,
            c,
            d,
            e = n();
        "top" == this.ankered ? (b = e + this.position.top, this.stickyData.scrollTop < b && e - 9 <= this.parentData.bottom && (d = -1 * (b + this.stickyData.outerHeight - this.parentData.bottom), c = !0)) : "bottom" == this.ankered && (b = e + this.viewportBottomAnker, this.stickyData.bottom > b && b + 9 >= this.parentData.top && (c = !0, d = b - this.parentData.top - this.stickyData.outerHeight)), c ? (this.isSticky || (a || this.updateDimension(!0), this.setSticky()), 0 > d && ("top" == this.ankered ? this.elStyle.top = this.position.top + d + "px" : "bottom" == this.ankered && (this.elStyle.bottom = this.position.bottom + d + "px"))) : this.isSticky && this.removeSticky();
      }
    }), a.extend(j.prototype, q, {
      addEvents: function addEvents() {
        var a = this;
        this.commonAddEvents(), this.$parent.on("scroll" + this.evtid, function () {
          a.ankered && a.$el[0].offsetWidth && a.updatePos();
        });
      },
      getStickyData: function getStickyData() {
        this.stickyData.top = this.$el[0].offsetTop, this.getCommonStickyData();
      },
      getParentData: function getParentData() {
        this.getCommonParentData(), this.parentData.offsetBottom = this.parentData.top + this.$parent.outerHeight();
      },
      updateDimension: function updateDimension(a) {
        var b;
        this.isSticky && this.removeSticky(), this.getParentData(), this.getStickyData(), this.viewport = m.height(), "top" == this.ankered ? b = Math.abs(this.position.top) + 9 : "bottom" == this.ankered && (b = Math.abs(this.position.bottom) + 9, this.viewportBottomAnker = this.viewport - this.parentData.bottom, this.compareBottom = this.stickyData.bottom + this.position.bottom, this.addBottom = this.parentData.bottom - this.parentData.paddingTop - this.viewport), this.viewPortMax = this.parentData.offsetBottom + b + 10, this.viewPortMin = this.parentData.offsetTop - b - this.viewport, a || this.updatePos(!0);
      },
      updatePos: function updatePos(a) {
        var b,
            c,
            d = this.$parent[0].scrollTop;
        "top" == this.ankered ? (b = d + this.position.top, this.stickyData.scrollTop - this.parentData.paddingTop < b && (c = !0)) : "bottom" == this.ankered && d + this.parentData.height < this.compareBottom && (c = !0), c ? this.isSticky || (a || this.updateDimension(!0), this.setSticky(), m.off("scroll" + this.evtid, this.updatePos2).on("scroll" + this.evtid, this.updatePos2), this.updatePos2(!0)) : this.isSticky && (this.removeSticky(), m.off("scroll" + this.evtid, this.updatePos2));
      },
      updatePos2: function updatePos2(a) {
        var b = n();
        (a === !0 || this.viewPortMax > b && b > this.viewPortMin) && ("top" == this.ankered ? (a === !0 || this.viewPortMax > b && b > this.viewPortMin) && (this.elStyle.top = this.position.top + this.parentData.top - b + "px") : "bottom" == this.ankered && (this.elStyle.bottom = this.position.bottom + (b - this.addBottom) + "px"));
      }
    });

    var _r = function r() {
      _r = a.noop, b.ready("WINDOWLOAD", function () {
        b.loader.loadList(["dom-extend"]), b.ready("dom-extend", function () {
          b.addShadowDom();
        });
      });
    },
        s = function s() {
      var b = a.data(this, "wsSticky");
      if (b) b.disable && b.disable(!1);else {
        var c = a(this).parent();
        a(this).addClass("ws-sticky"), "visible" == (c.css("overflowY") || c.css("overflow") || "visible") ? new i(this) : new j(this), _r();
      }
    };

    if (!p.sticky && p.fixed) {
      var t = {},
          u = function u(c, d) {
        var e,
            f,
            g,
            h = [];

        for (t[c] || (t[c] = {
          sels: {},
          string: "",
          fn: function fn(b, d) {
            var e = a(t[c].string, b).add(d.filter(t[c].string));
            c && e.data("stickymedia", c), e.each(s);
          }
        }, f = !0), e = 0; e < d.length; e++) {
          t[c].sels[d[e]] || (t[c].sels[d[e]] = !0, h.push(d[e]));
        }

        (f || h.length) && (t[c].string = Object.keys(t[c].sels).join(", "), f ? a(function () {
          b.addReady(t[c].fn);
        }) : a.isReady && (g = a(h.join(", ")), c && g.data("stickymedia", c), g.each(s)));
      };

      if (u("", [".ws-sticky"]), a(function () {
        a(d).on("wssticky", function (a) {
          s.call(a.target);
        });
      }), f.parseCSS) if (c.Polyfill && Polyfill.prototype && Polyfill.prototype.doMatched) {
        var v = function v(a) {
          var b = a.getSelectors().split(/\,\s*/g),
              c = a._rule.media && a._rule.media.length ? a.getMedia() : "";
          u(c || "", b);
        };

        Polyfill({
          declarations: ["position:sticky"]
        }).doMatched(function (a) {
          a.each(v);
        });
      } else b.warn("Polyfill for CSS polyfilling made easy has to be included");
    }

    "complete" == d.readyState && b.isReady("WINDOWLOAD", !0);
  }
});