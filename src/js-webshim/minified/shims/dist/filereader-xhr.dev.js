"use strict";

webshim.register("filereader-xhr", function (a, b, c, d, e, f) {
  "use strict";

  var g,
      h,
      i,
      j = 'input[type="file"].ws-filereader, input[type="file"].ws-capture',
      k = swfmini.hasFlashPlayerVersion("10.3"),
      l = function l() {
    b.loader.loadList(["moxie"]);
  },
      m = function m() {
    var c,
        d,
        e,
        f,
        h = this;
    b.implement(h, "filepicker") && (h = this, c = a(this), e = c.parent(), f = function f() {
      h.value || c.prop("value", "");
    }, c.attr("tabindex", "-1").on("mousedown.filereaderwaiting click.filereaderwaiting", !1), e.addClass("ws-loading"), d = new g.FileInput({
      browse_button: this,
      accept: a.prop(this, "accept"),
      multiple: a.prop(this, "multiple")
    }), c.jProp("form").on("reset", function () {
      setTimeout(f);
    }), d.onready = function () {
      c.off(".fileraderwaiting"), e.removeClass("ws-waiting");
    }, d.onchange = function (a) {
      b.data(h, "fileList", a.target.files), c.trigger("change");
    }, d.onmouseenter = function () {
      c.trigger("mouseover"), e.addClass("ws-mouseenter");
    }, d.onmouseleave = function () {
      c.trigger("mouseout"), e.removeClass("ws-mouseenter");
    }, d.onmousedown = function () {
      c.trigger("mousedown"), e.addClass("ws-active");
    }, d.onmouseup = function () {
      c.trigger("mouseup"), e.removeClass("ws-active");
    }, b.data(h, "filePicker", d), b.ready("WINDOWLOAD", function () {
      var a;
      c.onWSOff("updateshadowdom", function () {
        var b = h.offsetWidth;
        b && a != b && (a = b, d.refresh());
      });
    }), b.addShadowDom(), d.init(), h.disabled && d.disable(!0));
  },
      n = function n(a) {
    return a.name;
  },
      _o = function o() {
    var c = this;
    l(), a(c).on("mousedown.filereaderwaiting click.filereaderwaiting", !1).parent().addClass("ws-loading"), b.ready("moxie", function () {
      _o.call(c);
    });
  },
      p = /^(?:script|jsonp)$/i,
      q = function q() {
    l(), b.error('filereader/formdata not ready yet. please wait for moxie to load `webshim.ready("moxie", callbackFn);`` or wait for the first change event on input[type="file"].ws-filereader.');
  },
      r = b.defineNodeNameProperty("input", "value", {
    prop: {
      get: function get() {
        var a = b.data(this, "fileList");
        return a && a.map ? a.map(n).join(", ") : r.prop._supget.call(this);
      }
    }
  }),
      s = b.cfg.basePath + "moxie/",
      t = 'You nedd a crossdomain.xml to get all "filereader" / "XHR2" / "CORS" features to work. Or host moxie.swf on your server an configure filereader options: "swfpath"',
      u = function u(b) {
    return "moxie" == b.wsType || b.data && b.data instanceof g.FormData || b.crossDomain && a.support.cors !== !1 && "no" != i && !p.test(b.dataType || "");
  },
      v = function v(c) {
    if (u(c)) {
      var d;
      return b.info("moxie transfer used for $.ajax"), "no" == i && b.error(t), {
        send: function send(b, e) {
          var g = function g(a, b) {
            if (c[b]) {
              var e = !1;
              d.addEventListener("load", function () {
                e ? e.lengthComputable && e.total > e.loaded && c[b]({
                  type: "progress",
                  lengthComputable: !0,
                  total: e.total,
                  loaded: e.total
                }) : c[b]({
                  type: "progress",
                  lengthComputable: !0,
                  total: 1,
                  loaded: 1
                });
              }), a.addEventListener("progress", function (a) {
                e = a, c[b](a);
              });
            }
          };

          d = new h.xhr.XMLHttpRequest(), d.open(c.type, c.url, c.async, c.username, c.password), g(d.upload, f.uploadprogress), g(d.upload, f.progress), d.addEventListener("load", function () {
            var a = {
              text: d.responseText,
              xml: d.responseXML
            };
            e(d.status, d.statusText, a, d.getAllResponseHeaders());
          }), c.xhrFields && c.xhrFields.withCredentials && (d.withCredentials = !0), c.timeout && (d.timeout = c.timeout), a.each(b, function (a, b) {
            d.setRequestHeader(a, b);
          }), d.send(c.data);
        },
        abort: function abort() {
          d && d.abort();
        }
      };
    }
  },
      w = {
    xdomain: function () {
      var c = /^https?:\/\//i,
          d = /^get|post$/i,
          e = new RegExp("^" + location.protocol, "i");
      return function (f, h) {
        if (!(!f.crossDomain || f.username || f.xhrFields && f.xhrFields.withCredentials || !f.async || !d.test(f.type) || !c.test(f.url) || !e.test(f.url) || f.data && f.data instanceof g.FormData || p.test(f.dataType || ""))) {
          var i = null;
          return b.info("xdomain transport used."), {
            send: function send(b, c) {
              var d = "",
                  e = (h.dataType || "").toLowerCase();
              i = new XDomainRequest(), /^\d+$/.test(h.timeout) && (i.timeout = h.timeout), i.ontimeout = function () {
                c(500, "timeout");
              }, i.onload = function () {
                var b = "Content-Length: " + i.responseText.length + "\r\nContent-Type: " + i.contentType,
                    d = {
                  code: i.status || 200,
                  message: i.statusText || "OK"
                },
                    f = {
                  text: i.responseText,
                  xml: i.responseXML
                };

                try {
                  if ("html" === e || /text\/html/i.test(i.contentType)) f.html = i.responseText;else if ("json" === e || "text" !== e && /\/json/i.test(i.contentType)) try {
                    f.json = a.parseJSON(i.responseText);
                  } catch (g) {} else if ("xml" === e && !i.responseXML) {
                    var h;

                    try {
                      h = new ActiveXObject("Microsoft.XMLDOM"), h.async = !1, h.loadXML(i.responseText);
                    } catch (g) {}

                    f.xml = h;
                  }
                } catch (j) {}

                c(d.code, d.message, f, b);
              }, i.onprogress = function () {}, i.onerror = function () {
                c(500, "error", {
                  text: i.responseText
                });
              }, h.data && (d = "string" === a.type(h.data) ? h.data : a.param(h.data)), i.open(f.type, f.url), i.send(d);
            },
            abort: function abort() {
              i && i.abort();
            }
          };
        }
      };
    }(),
    moxie: function moxie(a, c, d) {
      if (u(a)) {
        l(a);
        var e,
            f = {
          send: function send(g, h) {
            e = !0, b.ready("moxie", function () {
              e && (e = v(a, c, d), f.send = e.send, f.abort = e.abort, e.send(g, h));
            });
          },
          abort: function abort() {
            e = !1;
          }
        };
        return f;
      }
    }
  };

  b.loader.addModule("moxie", {
    src: "moxie/js/moxie-" + (k ? "swf" : "html4")
  }), f.progress || (f.progress = "onprogress"), f.uploadprogress || (f.uploadprogress = "onuploadprogress"), f.swfpath || (f.swfpath = s + "flash/Moxie.min.swf"), a.support.cors === !1 && c.XDomainRequest || delete w.xdomain, a.ajaxTransport("+*", function (a, b, c) {
    var d, e;
    if ((a.wsType || w[w]) && (d = w[w](a, b, c)), !d) for (e in w) {
      if (d = w[e](a, b, c)) break;
    }
    return d;
  }), b.defineNodeNameProperty("input", "files", {
    prop: {
      writeable: !1,
      get: function get() {
        return "file" != this.type ? null : (a(this).is(".ws-filereader, .ws-capture") || b.info("please add the 'ws-filereader'/'ws-capture' class to your input[type='file'] to implement files-property"), b.data(this, "fileList") || []);
      }
    }
  }), b.reflectProperties(["input"], ["accept"]), null == a("<input />").prop("multiple") && b.defineNodeNamesBooleanProperty(["input"], ["multiple"]), b.onNodeNamesPropertyModify("input", "disabled", function (a, c) {
    var d = b.data(this, "filePicker");
    d && d.disable(c);
  }), b.onNodeNamesPropertyModify("input", "value", function (c) {
    "" === c && "file" == this.type && a(this).is(".ws-filereader, .ws-capture") && b.data(this, "fileList", []);
  }), d.createElement("canvas").toBlob || (b.defineNodeNameProperty("canvas", "toBlob", {
    prop: {
      value: function value(c, d, e) {
        var f,
            h = a(this);
        d || (d = "image/jpeg"), "image/jpeg" != d || e || (e = .8), l(), b.ready("moxie", function () {
          var a = new g.Image();
          f = h.callProp("getAsDataURL", [d, e]), a.onload = function () {
            var d = a.getAsBlob();
            b.defineProperty(d, "_wsDataURL", {
              value: f,
              enumerable: !1
            }), c(d);
          }, a.load(f);
        });
      }
    }
  }), b.ready("url", function () {
    var a = URL.createObjectURL,
        b = URL.revokeObjectURL;
    URL.createObjectURL = function (b) {
      var c = b;
      if (b._wsimgDataURL) c = b._wsimgDataURL;else if (a) return a.apply(this, arguments);
      return c;
    }, URL.revokeObjectURL = function () {
      return b ? b.apply(this, arguments) : void 0;
    };
  })), c.FileReader = q, c.FormData = q, b.ready("moxie", function () {
    var d = "application/xml,xml";
    h = c.moxie, g = c.mOxie, g.Env.swf_url = f.swfpath, c.FileReader = g.FileReader, c.FormData = function (c) {
      var d,
          e,
          f,
          h,
          i,
          j,
          k,
          l = new g.FormData();

      if (c && a.nodeName(c, "form")) {
        for (d = a(c).serializeArray(), e = 0; e < d.length; e++) {
          Array.isArray(d[e].value) ? d[e].value.forEach(function (a) {
            l.append(d[e].name, a);
          }) : l.append(d[e].name, d[e].value);
        }

        for (d = c.querySelectorAll('input[type="file"][name]'), e = 0, f = d.length; e < d.length; e++) {
          if (k = d[e].name, k && !a(d[e]).is(":disabled") && (h = a.prop(d[e], "files") || [], h.length)) for ((h.length > 1 || l.hasBlob && l.hasBlob()) && b.error("FormData shim can only handle one file per ajax. Use multiple ajax request. One per file."), i = 0, j = h.length; j > i; i++) {
            l.append(k, h[i]);
          }
        }
      }

      return l;
    }, _o = m, w.moxie = v, f.mimeTypes = f.mimeTypes ? d + "," + f.mimeTypes : d;

    try {
      g.Mime.addMimeType(f.mimeTypes);
    } catch (e) {
      b.warn("mimetype to moxie error: " + e);
    }
  }), b.addReady(function (b, c) {
    a(b.querySelectorAll(j)).add(c.filter(j)).each(_o);
  }), b.ready("WINDOWLOAD", l), b.cfg.debug !== !1 && f.swfpath.indexOf(location.protocol + "//" + location.hostname) && f.swfpath.indexOf("https://" + location.hostname) && b.ready("WINDOWLOAD", function () {
    var c = function c() {
      "no" == i && b.error(t);
    };

    try {
      i = sessionStorage.getItem("wsXdomain.xml");
    } catch (d) {}

    if (c(), null == i) try {
      a.ajax({
        url: "crossdomain.xml",
        type: "HEAD",
        dataType: "xml",
        success: function success() {
          i = "yes";
        },
        error: function error() {
          i = "no";
        },
        complete: function complete() {
          try {
            sessionStorage.setItem("wsXdomain.xml", i);
          } catch (a) {}

          c();
        }
      });
    } catch (d) {}
  }), "complete" == d.readyState && webshims.isReady("WINDOWLOAD", !0);
});