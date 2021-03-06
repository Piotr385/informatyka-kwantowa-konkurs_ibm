"use strict";

webshims.register("form-datalist-lazy", function (a, b, c, d, e, f) {
  var g = 0,
      h = a.webshims.cfg.forms,
      i = {},
      j = function j(a) {
    if (!a) return [];
    if (i[a]) return i[a];
    var b;

    try {
      b = JSON.parse(localStorage.getItem("storedDatalistOptions" + a));
    } catch (c) {}

    return i[a] = b || [], b || [];
  },
      k = function k(a, b) {
    if (a) {
      b = b || [];

      try {
        localStorage.setItem("storedDatalistOptions" + a, JSON.stringify(b));
      } catch (c) {}
    }
  },
      l = /</g,
      m = />/g,
      n = /\s*,\s*/g;

  b.getDataListVal = function (b) {
    var c = a.data(b, "datalistWidget");
    return c ? c.getPartialValue() : a.prop(b, "value");
  }, a.extend(f.shadowListProto, {
    _lazyCreate: function _lazyCreate(d) {
      var e = this;
      this.hideList = a.proxy(e, "hideList"), this.index = -1, this.input = d.input, this.arrayOptions = [], this._updateOptions(), this.popover = b.objectCreate(b.wsPopover, {}, this.options.popover), this.shadowList = this.popover.element.addClass("datalist-polyfill"), this.shadowList.on("mouseenter.datalistWidget mousedown.datalistWidget click.datalistWidget", "li", function (b) {
        if (!e._stopMouseOver || !b || "mouseenter" != b.type) {
          var c = a("li:not(.hidden-item)", e.shadowList),
              f = "mousedown" == b.type || "click" == b.type;
          return f && a(d.input).getNativeElement().triggerHandler("beforeselect", [a(b.currentTarget).find(".option-value").text()]) === !1 ? "mousedown" != b.type : (e.markItem(c.index(b.currentTarget), f, c), "click" == b.type && (e.hideList(), h.customDatalist && a(d.input).getNativeElement().trigger("datalistselect")), "mousedown" != b.type);
        }
      }), d.input.setAttribute("autocomplete", "off"), this.lastCompletedValue = "", a(d.input).attr({
        "aria-haspopup": "true",
        "aria-autocomplete": "both"
      }).on({
        "input.datalistWidget": function inputDatalistWidget() {
          e.triggeredByDatalist || (e.changedValue = !1, e.showHideOptions());
        },
        "keydown.datalistWidget": function keydownDatalistWidget(b) {
          var c,
              f,
              g = b.keyCode,
              i = !!e.options.inlineValue || "onlyScroll";
          if (40 == g && !e.showList()) return e.markItem(e.index + 1, i), !1;

          if (e.popover.isVisible) {
            if (38 == g) return e.markItem(e.index - 1, i), !1;
            if (!b.shiftKey && (33 == g || 36 == g)) return e.markItem(0, i), !1;
            if (!b.shiftKey && (34 == g || 35 == g)) return f = a("li:not(.hidden-item)", e.shadowList), e.markItem(f.length - 1, !0, f), !1;

            if (13 == g || 27 == g) {
              if (13 == g) {
                if (c = a("li.active-item:not(.hidden-item)", e.shadowList), e.isCompleted && (a.prop(d.input, "selectionStart", a.prop(d.input, "value").length), e.lastCompletedValue && !c[0] && (e.lastCompletedValue = "", e.isCompleted = !1)), a(d.input).getNativeElement().triggerHandler("beforeselect", [c.find(".option-value").text()]) === !1) return;
                e.changeValue(c);
              }

              if (e.hideList(), h.customDatalist && c && c[0] && a(d.input).getNativeElement().trigger("datalistselect"), 13 != b.keyCode || c && c[0]) return !1;
            }
          }
        },
        "focus.datalistWidget": function focusDatalistWidget() {
          e.lastCompletedValue = "", e.options.focus && e.showList();
        },
        "mousedown.datalistWidget": function mousedownDatalistWidget() {
          a(this).is(":focus") && e.showList();
        }
      }), a(this.datalist).off("updateDatalist.datalistWidget").on("updateDatalist.datalistWidget", a.proxy(this, "_resetListCached")).on("remove", function (a) {
        a.originalEvent || e.destroy();
      }), this._resetListCached(), d.input.form && (d.input.name || d.input.id) && a(d.input.form).on("submit.datalistWidget" + d.input.id, function () {
        if (!a(d.input).hasClass("no-datalist-cache") && "off" != e._autocomplete) {
          var b = a.prop(d.input, "value"),
              c = (d.input.name || d.input.id) + a.prop(d.input, "type");
          e.storedOptions || (e.storedOptions = j(c)), b && -1 == e.storedOptions.indexOf(b) && (e.storedOptions.push(b), k(c, e.storedOptions));
        }
      }), a(c).on("unload.datalist" + this.id + " beforeunload.datalist" + this.id, function (a) {
        e.destroy(a);
      });
    },
    _resetListCached: function _resetListCached() {
      var b,
          d = this;
      this.needsUpdate = !0, this.lastUpdatedValue = !1, this.lastUnfoundValue = "", this.updateTimer || (c.QUnit || (b = a(d.input).is(":focus") && (d.options.focus || a.prop(d.input, "value"))) ? d.updateListOptions(b) : d.updateTimer = setTimeout(function () {
        d.updateListOptions(), d = null;
      }, 200));
    },
    _updateOptions: function _updateOptions() {
      this.options = b.getOptions(this.input, "list", f.list), a(this.input).prop("multiple") && ("email" != a(this.input).prop("type") ? b.warn("multiple only used on email and file type. Use data-list-multiple instead.") : this.options.multiple = !0), this.options.inlineValue || this.options.valueCompletion || (a.attr(this.input, "aria-autocomplete", "list"), a.attr(this.input, "aria-expanded", "false")), this.options.getOptionContent && !a.isFunction(this.options.getOptionContent) && (this.options.getOptionContent = !1);
    },
    updateListOptions: function updateListOptions(b) {
      this.needsUpdate = !1, clearTimeout(this.updateTimer), this.updateTimer = !1;
      var c,
          d,
          e,
          f,
          h,
          i,
          k,
          n = [],
          o = [],
          p = [];

      for (e = a.prop(this.datalist, "options"), f = 0, h = e.length; h > f; f++) {
        c = e[f], !c.disabled && (k = a(c).val()) && (d = {
          value: this.options.noHtmlEscape ? k : k.replace(l, "&lt;").replace(m, "&gt;"),
          label: a.trim(a.attr(c, "label")) || "",
          className: c.className || "",
          elem: c
        }, d.label && (d.className += " has-option-label"), o.push(d.value), p.push(d));
      }

      for (this.storedOptions || (this.storedOptions = a(this.input).hasClass("no-datalist-cache") || "off" == this._autocomplete ? [] : j((this.input.name || this.input.id) + a.prop(this.input, "type"))), this.storedOptions.forEach(function (a) {
        -1 == o.indexOf(a) && p.push({
          value: a,
          label: "",
          className: "stored-suggest",
          style: ""
        });
      }), f = 0, h = p.length; h > f; f++) {
        i = p[f], n[f] = '<li class="' + i.className + '" tabindex="-1" role="listitem" id="wsoption-' + g++ + '">' + this.getOptionContent(i) + "</li>";
      }

      this.arrayOptions = p, this.popover.contentElement.html('<div class="datalist-box"><ul role="listbox">' + n.join("\n") + "</ul></div>"), a(this.input).removeAttr("aria-activedescendant").triggerHandler("datalistcreated", [{
        instance: this
      }]), b || this.popover.isVisible ? (this.options.valueCompletion && this.lastCompletedValue && (k = a.prop(this.input, "value")) && !k.indexOf(this.lastCompletedValue) && (a.prop(this.input, "value", this.lastCompletedValue), a(this.input).triggerHandler("updateInput")), k != this.lastCompletedValue && (this.lastCompletedValue = ""), this.showHideOptions()) : (this.lastCompletedValue = "", this.isCompleted = !1);
    },
    getOptionContent: function getOptionContent(b) {
      var c,
          d = [{
        instance: this,
        item: b
      }];
      return (c = a(this.input).triggerHandler("getoptioncontent", d)) && c.indexOf && -1 == c.indexOf("option-value") && (c += '<span class="option-value" style="display: none;">' + b.value + "</span>"), null == c && (c = '<span class="option-value">' + b.value + "</span>", b.label && (c += ' <span class="option-label">' + b.label + "</span>")), c || "";
    },
    setCompletedValue: function setCompletedValue(b, c, d) {
      if (this.isCompleted = !1, !this.options.valueCompletion || !c || this.lastCompletedValue.length >= b.length) return void (this.lastCompletedValue = b);
      var e,
          f = this.input,
          g = a.prop(f, "selectionEnd");
      this.lastCompletedValue = b, b.length == g && (e = b + c.value.substr(d.length), a(f).triggerHandler("triggerinput"), a.prop(f, "value", e), a(f).triggerHandler("updateInput"), a(f).callProp("setSelectionRange", [b.length, e.length]), setTimeout(function () {
        e == a.prop(f, "value") && a.prop(f, "selectionEnd") != e.length && a.prop(f, "selectionEnd", e.length);
      }, 0), this.isCompleted = !0);
    },
    getPartialValue: function getPartialValue() {
      var b = a.prop(this.input, "value");
      return this.options.valueCompletion && this.lastCompletedValue && !a.prop(this.input, "value").indexOf(this.lastCompletedValue) && (b = this.lastCompletedValue), this.options.multiple && (b = b.split(n), b = b[b.length - 1] || ""), b;
    },
    showHideOptions: function showHideOptions(b) {
      var c,
          d,
          e = a.prop(this.input, "value"),
          f = e.toLowerCase(),
          g = !1,
          h = "^" == this.options.filter,
          i = this;

      if (f !== this.lastUpdatedValue) {
        if (this.options.multiple && (f = f.split(n), f = f[f.length - 1] || ""), this.lastUnfoundValue && 0 === f.indexOf(this.lastUnfoundValue)) return void this.hideList();
        this.lastUpdatedValue = f, c = a("li", this.shadowList), f && "!" != this.options.filter ? this.arrayOptions.forEach(function (b, e) {
          var j, k, l;
          "lowerValue" in b || (b.lowerValue = b.value.toLowerCase(), b.label && b.label != b.value && (b.lowerLabel = b.label.toLowerCase())), f != b.lowerValue && b.lowerLabel != f && (k = b.lowerValue.indexOf(f), j = h ? !k : -1 !== k, j ? (l = "value", d || k || (d = b)) : b.lowerLabel && (k = b.lowerLabel.indexOf(f), j = h ? !k : -1 !== k, l = "label")), j ? (i.addMark(a(c[e]).removeClass("hidden-item"), b, l, k, f.length), g = !0) : a(c[e]).addClass("hidden-item");
        }) : c.length && (this.removeMark(c.removeClass("hidden-item")), g = !0), this.hasViewableData = g, !b && g && (this.popover.isVisible && "bottom" == this.popover.element.attr("data-vertical") && (i._stopMouseOver = !0, this.popover.element.triggerHandler("pospopover"), setTimeout(function () {
          i._stopMouseOver = !1;
        }, 9)), this.showList()), g ? (a(this.input).removeAttr("aria-activedescendant"), this.setCompletedValue(e, d, f), this.lastUnfoundValue = !1) : (this.lastUnfoundValue = f, this.hideList());
      }
    },
    otherType: {
      value: "label",
      label: "value"
    },
    addMark: function addMark(b, c, d, e, f) {
      if (this.options.highlight) {
        var g = c[d].substr(e, f);
        g = c[d].replace(g, "<mark>" + g + "</mark>"), a(".option-" + this.otherType[d] + " > mark", b).each(this._replaceMark), a(".option-" + d, b).html(g);
      }
    },
    _replaceMark: function _replaceMark() {
      var b = a(this).html();
      a(this).replaceWith(b);
    },
    removeMark: function removeMark(b) {
      this.options.highlight && a("mark", b).each(this._replaceMark);
    },
    showList: function showList() {
      if (this.popover.isVisible) return !1;
      if (this.needsUpdate && this.updateListOptions(), this.showHideOptions(!0), !this.hasViewableData) return !1;
      var b = this;
      return b.shadowList.find("li.active-item").removeClass("active-item"), b.popover.show(this.input), a(this.input).attr({
        "aria-expanded": "true"
      }), !0;
    },
    hideList: function hideList() {
      if (!this.popover.isVisible) return !1;
      var b = this;
      return a(this.input).attr({
        "aria-expanded": "false"
      }).removeAttr("aria-activedescendant"), this.popover.hide(), b.shadowList.removeClass("datalist-visible list-item-active"), b.index = -1, b.changedValue && (b.triggeredByDatalist = !0, a(b.input).trigger("input").trigger("change"), b.changedValue = !1, b.triggeredByDatalist = !1), !0;
    },
    scrollIntoView: function scrollIntoView(b) {
      var c,
          d = a("ul", this.shadowList),
          e = a("div.datalist-box", this.shadowList),
          f = b.position();
      return f.top -= (parseInt(d.css("paddingTop"), 10) || 0) + (parseInt(d.css("marginTop"), 10) || 0) + (parseInt(d.css("borderTopWidth"), 10) || 0), f.top < 0 ? void e.scrollTop(e.scrollTop() + f.top - 2) : (f.top += b.outerHeight(), c = e.height(), void (f.top > c && e.scrollTop(e.scrollTop() + (f.top - c) + 2)));
    },
    changeValue: function changeValue(b) {
      if (b[0]) {
        var c,
            d,
            e = a("span.option-value", b).text(),
            f = a.prop(this.input, "value");
        this.options.multiple && (d = f.split(n), d[d.length - 1] = e, e = d.join(", ")), this.options.valueCompletion && this.lastCompletedValue && !f.indexOf(this.lastCompletedValue) && (f = this.lastCompletedValue, this.lastCompletedValue = ""), e != f && (a(this.input).prop("value", e).triggerHandler("updateInput"), this.changedValue = !0, (c = a.data(this.input, "wsspinner")) && c.setInput && c.setInput(e));
      }
    },
    markItem: function markItem(b, c, d) {
      var e;
      d = d || a("li:not(.hidden-item)", this.shadowList), d.length && (0 > b ? b = d.length - 1 : b >= d.length && (b = 0), d.removeClass("active-item"), this.shadowList.addClass("list-item-active"), e = d.eq(b).addClass("active-item"), c && ("onlyScroll" != c ? this.changeValue(e) : a(this.input).attr("aria-activedescendant", e.prop("id")), this.scrollIntoView(e)), this.index = b);
    }
  });
});