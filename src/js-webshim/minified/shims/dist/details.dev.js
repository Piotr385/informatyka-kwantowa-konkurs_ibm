"use strict";

webshims.register("details", function (a, b, c, d, e, f) {
  var g = function g(b) {
    var c = a(b).parent("details");
    return c[0] && c.children(":first").get(0) === b ? c : void 0;
  },
      h = function h(b, c) {
    b = a(b), c = a(c);
    var d = a.data(c[0], "summaryElement");
    a.data(b[0], "detailsElement", c), d && b[0] === d[0] || (d && (d.hasClass("fallback-summary") ? d.remove() : d.off(".summaryPolyfill").removeData("detailsElement").removeAttr("role").removeAttr("tabindex").removeAttr("aria-expanded").removeClass("summary-button").find("span.details-open-indicator").remove()), a.data(c[0], "summaryElement", b), c.prop("open", c.prop("open")));
  },
      i = function i(b) {
    var c = a.data(b, "summaryElement");
    return c || (c = a(b).children("summary:first-child"), c[0] ? h(c, b) : (a(b).prependPolyfill('<summary class="fallback-summary">' + f.text + "</summary>"), c = a.data(b, "summaryElement"))), c;
  };

  b.createElement("summary", function () {
    var c = g(this);

    if (c && !a.data(this, "detailsElement")) {
      var d,
          e,
          f = a.attr(this, "tabIndex") || "0";
      h(this, c), a(this).on({
        "focus.summaryPolyfill": function focusSummaryPolyfill() {
          a(this).addClass("summary-has-focus");
        },
        "blur.summaryPolyfill": function blurSummaryPolyfill() {
          a(this).removeClass("summary-has-focus");
        },
        "mouseenter.summaryPolyfill": function mouseenterSummaryPolyfill() {
          a(this).addClass("summary-has-hover");
        },
        "mouseleave.summaryPolyfill": function mouseleaveSummaryPolyfill() {
          a(this).removeClass("summary-has-hover");
        },
        "click.summaryPolyfill": function clickSummaryPolyfill(b) {
          var c = g(this);

          if (c) {
            if (!e && b.originalEvent) return e = !0, b.stopImmediatePropagation(), b.preventDefault(), a(this).trigger("click"), e = !1, !1;
            clearTimeout(d), d = setTimeout(function () {
              b.isDefaultPrevented() || c.prop("open", !c.prop("open"));
            }, 0);
          }
        },
        "keydown.summaryPolyfill": function keydownSummaryPolyfill(b) {
          13 != b.keyCode && 32 != b.keyCode || b.isDefaultPrevented() || (e = !0, b.preventDefault(), a(this).trigger("click"), e = !1);
        }
      }).attr({
        tabindex: f,
        role: "button"
      }).prepend('<span class="details-open-indicator" />'), b.moveToFirstEvent(this, "click");
    }
  });
  var j;
  b.defineNodeNamesBooleanProperty("details", "open", function (b) {
    var c = a(a.data(this, "summaryElement"));

    if (c) {
      var d = b ? "removeClass" : "addClass",
          e = a(this);

      if (!j && f.animate) {
        e.stop().css({
          width: "",
          height: ""
        });
        var g = {
          width: e.width(),
          height: e.height()
        };
      }

      if (c.attr("aria-expanded", "" + b), e[d]("closed-details-summary").children().not(c[0])[d]("closed-details-child"), !j && f.animate) {
        var h = {
          width: e.width(),
          height: e.height()
        };
        e.css(g).animate(h, {
          complete: function complete() {
            a(this).css({
              width: "",
              height: ""
            });
          }
        });
      }
    }
  }), b.createElement("details", function () {
    j = !0;
    i(this);
    a.prop(this, "open", a.prop(this, "open")), j = !1;
  });
});