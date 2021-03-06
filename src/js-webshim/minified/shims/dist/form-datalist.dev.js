"use strict";

webshims.register("form-datalist", function (a, b, c, d, e, f) {
  "use strict";

  var g = function g(a) {
    a && "string" == typeof a || (a = "DOM"), g[a + "Loaded"] || (g[a + "Loaded"] = !0, b.ready(a, function () {
      b.loader.loadList(["form-datalist-lazy"]);
    }));
  },
      h = {
    submit: 1,
    button: 1,
    reset: 1,
    hidden: 1,
    range: 1,
    date: 1,
    month: 1
  };

  b.modules["form-number-date-ui"].loaded && a.extend(h, {
    number: 1,
    time: 1
  }), b.propTypes.element = function (c, e) {
    b.createPropDefault(c, "attr"), c.prop || (c.prop = {
      get: function get() {
        var b = a.attr(this, e);
        return b && (b = d.getElementById(b), b && c.propNodeName && !a.nodeName(b, c.propNodeName) && (b = null)), b || null;
      },
      writeable: !1
    });
  }, function () {
    var i = b.cfg.forms,
        j = b.support.datalist;

    if (!j || i.customDatalist) {
      var k = function k() {
        var c = function c() {
          var b;
          !a.data(this, "datalistWidgetData") && (b = a.prop(this, "id")) ? a('input[list="' + b + '"], input[data-wslist="' + b + '"]').eq(0).attr("list", b) : a(this).triggerHandler("updateDatalist");
        },
            d = {
          autocomplete: {
            attr: {
              get: function get() {
                var b = this,
                    c = a.data(b, "datalistWidget");
                return c ? c._autocomplete : "autocomplete" in b ? b.autocomplete : b.getAttribute("autocomplete");
              },
              set: function set(b) {
                var c = this,
                    d = a.data(c, "datalistWidget");
                d ? (d._autocomplete = b, "off" == b && d.hideList()) : "autocomplete" in c ? c.autocomplete = b : c.setAttribute("autocomplete", b);
              }
            }
          }
        };

        j ? ((a("<datalist><select><option></option></select></datalist>").prop("options") || []).length || b.defineNodeNameProperty("datalist", "options", {
          prop: {
            writeable: !1,
            get: function get() {
              var b = this.options || [];

              if (!b.length) {
                var c = this,
                    d = a("select", c);
                d[0] && d[0].options && d[0].options.length && (b = d[0].options);
              }

              return b;
            }
          }
        }), d.list = {
          attr: {
            get: function get() {
              var c = b.contentAttr(this, "list");
              return null != c ? (a.data(this, "datalistListAttr", c), h[a.prop(this, "type")] || h[a.attr(this, "type")] || this.removeAttribute("list")) : c = a.data(this, "datalistListAttr"), null == c ? e : c;
            },
            set: function set(c) {
              var d = this;
              a.data(d, "datalistListAttr", c), h[a.prop(this, "type")] || h[a.attr(this, "type")] ? d.setAttribute("list", c) : (b.objectCreate(l, e, {
                input: d,
                id: c,
                datalist: a.prop(d, "list")
              }), d.setAttribute("data-wslist", c)), a(d).triggerHandler("listdatalistchange");
            }
          },
          initAttr: !0,
          reflect: !0,
          propType: "element",
          propNodeName: "datalist"
        }) : b.defineNodeNameProperties("input", {
          list: {
            attr: {
              get: function get() {
                var a = b.contentAttr(this, "list");
                return null == a ? e : a;
              },
              set: function set(c) {
                var d = this;
                b.contentAttr(d, "list", c), b.objectCreate(f.shadowListProto, e, {
                  input: d,
                  id: c,
                  datalist: a.prop(d, "list")
                }), a(d).triggerHandler("listdatalistchange");
              }
            },
            initAttr: !0,
            reflect: !0,
            propType: "element",
            propNodeName: "datalist"
          }
        }), b.defineNodeNameProperties("input", d), b.addReady(function (a, b) {
          b.filter("datalist > select, datalist, datalist > option, datalist > select > option").closest("datalist").each(c);
        });
      },
          l = {
        _create: function _create(d) {
          if (!h[a.prop(d.input, "type")] && !h[a.attr(d.input, "type")]) {
            var e = d.datalist,
                f = a.data(d.input, "datalistWidget"),
                i = this;
            return e && f && f.datalist !== e ? (f.datalist = e, f.id = d.id, a(f.datalist).off("updateDatalist.datalistWidget").on("updateDatalist.datalistWidget", a.proxy(f, "_resetListCached")), void f._resetListCached()) : e ? void (f && f.datalist === e || (this.datalist = e, this.id = d.id, this.hasViewableData = !0, this._autocomplete = a.attr(d.input, "autocomplete"), a.data(d.input, "datalistWidget", this), a.data(e, "datalistWidgetData", this), g("WINDOWLOAD"), b.isReady("form-datalist-lazy") ? c.QUnit ? i._lazyCreate(d) : setTimeout(function () {
              i._lazyCreate(d);
            }, 9) : (a(d.input).one("focus", g), b.ready("form-datalist-lazy", function () {
              i._destroyed || i._lazyCreate(d);
            })))) : void (f && f.destroy());
          }
        },
        destroy: function destroy(b) {
          var f,
              g = a.attr(this.input, "autocomplete");
          a(this.input).off(".datalistWidget").removeData("datalistWidget"), this.shadowList.remove(), a(d).off(".datalist" + this.id), a(c).off(".datalist" + this.id), this.input.form && this.input.id && a(this.input.form).off("submit.datalistWidget" + this.input.id), this.input.removeAttribute("aria-haspopup"), g === e ? this.input.removeAttribute("autocomplete") : a(this.input).attr("autocomplete", g), b && "beforeunload" == b.type && (f = this.input, setTimeout(function () {
            a.attr(f, "list", a.attr(f, "list"));
          }, 9)), this._destroyed = !0;
        }
      };

      b.loader.addModule("form-datalist-lazy", {
        noAutoCallback: !0,
        options: a.extend(f, {
          shadowListProto: l
        })
      }), f.list || (f.list = {}), k();
    }
  }();
});