"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (a, b) {
  "use strict";

  function c(a, b) {
    for (var c, d = [], f = 0; f < a.length; ++f) {
      if (c = g[a[f]] || e(a[f]), !c) throw "module definition dependecy not found: " + a[f];
      d.push(c);
    }

    b.apply(null, d);
  }

  function d(a, d, e) {
    if ("string" != typeof a) throw "invalid module definition, module id must be defined and be a string";
    if (d === b) throw "invalid module definition, dependencies must be specified";
    if (e === b) throw "invalid module definition, definition function must be specified";
    c(d, function () {
      g[a] = e.apply(null, arguments);
    });
  }

  function e(b) {
    for (var c = a, d = b.split(/[.\/]/), e = 0; e < d.length; ++e) {
      if (!c[d[e]]) return;
      c = c[d[e]];
    }

    return c;
  }

  function f(c) {
    for (var d = 0; d < c.length; d++) {
      for (var e = a, f = c[d], h = f.split(/[.\/]/), i = 0; i < h.length - 1; ++i) {
        e[h[i]] === b && (e[h[i]] = {}), e = e[h[i]];
      }

      e[h[h.length - 1]] = g[f];
    }
  }

  var g = {};
  d("moxie/core/utils/Basic", [], function () {
    var a = function a(_a) {
      var b;
      return _a === b ? "undefined" : null === _a ? "null" : _a.nodeType ? "node" : {}.toString.call(_a).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
    },
        b = function b(d) {
      var e;
      return c(arguments, function (f, h) {
        h > 0 && c(f, function (c, f) {
          c !== e && (a(d[f]) === a(c) && ~g(a(c), ["array", "object"]) ? b(d[f], c) : d[f] = c);
        });
      }), d;
    },
        c = function c(a, b) {
      var c, d, e, f;

      if (a) {
        try {
          c = a.length;
        } catch (g) {
          c = f;
        }

        if (c === f) {
          for (d in a) {
            if (a.hasOwnProperty(d) && b(a[d], d) === !1) return;
          }
        } else for (e = 0; c > e; e++) {
          if (b(a[e], e) === !1) return;
        }
      }
    },
        d = function d(b) {
      var c;
      if (!b || "object" !== a(b)) return !0;

      for (c in b) {
        return !1;
      }

      return !0;
    },
        e = function e(b, c) {
      function d(e) {
        "function" === a(b[e]) && b[e](function (a) {
          ++e < f && !a ? d(e) : c(a);
        });
      }

      var e = 0,
          f = b.length;
      "function" !== a(c) && (c = function c() {}), b && b.length || c(), d(e);
    },
        f = function f(a, b) {
      var d = 0,
          e = a.length,
          f = new Array(e);
      c(a, function (a, c) {
        a(function (a) {
          if (a) return b(a);
          var g = [].slice.call(arguments);
          g.shift(), f[c] = g, d++, d === e && (f.unshift(null), b.apply(this, f));
        });
      });
    },
        g = function g(a, b) {
      if (b) {
        if (Array.prototype.indexOf) return Array.prototype.indexOf.call(b, a);

        for (var c = 0, d = b.length; d > c; c++) {
          if (b[c] === a) return c;
        }
      }

      return -1;
    },
        h = function h(b, c) {
      var d = [];
      "array" !== a(b) && (b = [b]), "array" !== a(c) && (c = [c]);

      for (var e in b) {
        -1 === g(b[e], c) && d.push(b[e]);
      }

      return d.length ? d : !1;
    },
        i = function i(a, b) {
      var d = [];
      return c(a, function (a) {
        -1 !== g(a, b) && d.push(a);
      }), d.length ? d : null;
    },
        j = function j(a) {
      var b,
          c = [];

      for (b = 0; b < a.length; b++) {
        c[b] = a[b];
      }

      return c;
    },
        k = function () {
      var a = 0;
      return function (b) {
        var c,
            d = new Date().getTime().toString(32);

        for (c = 0; 5 > c; c++) {
          d += Math.floor(65535 * Math.random()).toString(32);
        }

        return (b || "o_") + d + (a++).toString(32);
      };
    }(),
        l = function l(a) {
      return a ? String.prototype.trim ? String.prototype.trim.call(a) : a.toString().replace(/^\s*/, "").replace(/\s*$/, "") : a;
    },
        m = function m(a) {
      if ("string" != typeof a) return a;
      var b,
          c = {
        t: 1099511627776,
        g: 1073741824,
        m: 1048576,
        k: 1024
      };
      return a = /^([0-9]+)([mgk]?)$/.exec(a.toLowerCase().replace(/[^0-9mkg]/g, "")), b = a[2], a = +a[1], c.hasOwnProperty(b) && (a *= c[b]), a;
    };

    return {
      guid: k,
      typeOf: a,
      extend: b,
      each: c,
      isEmptyObj: d,
      inSeries: e,
      inParallel: f,
      inArray: g,
      arrayDiff: h,
      arrayIntersect: i,
      toArray: j,
      trim: l,
      parseSizeStr: m
    };
  }), d("moxie/core/I18n", ["moxie/core/utils/Basic"], function (a) {
    var b = {};
    return {
      addI18n: function addI18n(c) {
        return a.extend(b, c);
      },
      translate: function translate(a) {
        return b[a] || a;
      },
      _: function _(a) {
        return this.translate(a);
      },
      sprintf: function sprintf(b) {
        var c = [].slice.call(arguments, 1);
        return b.replace(/%[a-z]/g, function () {
          var b = c.shift();
          return "undefined" !== a.typeOf(b) ? b : "";
        });
      }
    };
  }), d("moxie/core/utils/Mime", ["moxie/core/utils/Basic", "moxie/core/I18n"], function (a, b) {
    var c = "application/msword,doc dot,application/pdf,pdf,application/pgp-signature,pgp,application/postscript,ps ai eps,application/rtf,rtf,application/vnd.ms-excel,xls xlb,application/vnd.ms-powerpoint,ppt pps pot,application/zip,zip,application/x-shockwave-flash,swf swfl,application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,application/vnd.openxmlformats-officedocument.presentationml.template,potx,application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,application/x-javascript,js,application/json,json,audio/mpeg,mp3 mpga mpega mp2,audio/x-wav,wav,audio/x-m4a,m4a,audio/ogg,oga ogg,audio/aiff,aiff aif,audio/flac,flac,audio/aac,aac,audio/ac3,ac3,audio/x-ms-wma,wma,image/bmp,bmp,image/gif,gif,image/jpeg,jpg jpeg jpe,image/photoshop,psd,image/png,png,image/svg+xml,svg svgz,image/tiff,tiff tif,text/plain,asc txt text diff log,text/html,htm html xhtml,text/css,css,text/csv,csv,text/rtf,rtf,video/mpeg,mpeg mpg mpe m2v,video/quicktime,qt mov,video/mp4,mp4,video/x-m4v,m4v,video/x-flv,flv,video/x-ms-wmv,wmv,video/avi,avi,video/webm,webm,video/3gpp,3gpp 3gp,video/3gpp2,3g2,video/vnd.rn-realvideo,rv,video/ogg,ogv,video/x-matroska,mkv,application/vnd.oasis.opendocument.formula-template,otf,application/octet-stream,exe",
        d = {
      mimes: {},
      extensions: {},
      addMimeType: function addMimeType(a) {
        var b,
            c,
            d,
            e = a.split(/,/);

        for (b = 0; b < e.length; b += 2) {
          for (d = e[b + 1].split(/ /), c = 0; c < d.length; c++) {
            this.mimes[d[c]] = e[b];
          }

          this.extensions[e[b]] = d;
        }
      },
      extList2mimes: function extList2mimes(b, c) {
        var d,
            e,
            f,
            g,
            h = this,
            i = [];

        for (e = 0; e < b.length; e++) {
          for (d = b[e].extensions.split(/\s*,\s*/), f = 0; f < d.length; f++) {
            if ("*" === d[f]) return [];
            if (g = h.mimes[d[f]]) -1 === a.inArray(g, i) && i.push(g);else {
              if (!c || !/^\w+$/.test(d[f])) return [];
              i.push("." + d[f]);
            }
          }
        }

        return i;
      },
      mimes2exts: function mimes2exts(b) {
        var c = this,
            d = [];
        return a.each(b, function (b) {
          if ("*" === b) return d = [], !1;
          var e = b.match(/^(\w+)\/(\*|\w+)$/);
          e && ("*" === e[2] ? a.each(c.extensions, function (a, b) {
            new RegExp("^" + e[1] + "/").test(b) && [].push.apply(d, c.extensions[b]);
          }) : c.extensions[b] && [].push.apply(d, c.extensions[b]));
        }), d;
      },
      mimes2extList: function mimes2extList(c) {
        var d = [],
            e = [];
        return "string" === a.typeOf(c) && (c = a.trim(c).split(/\s*,\s*/)), e = this.mimes2exts(c), d.push({
          title: b.translate("Files"),
          extensions: e.length ? e.join(",") : "*"
        }), d.mimes = c, d;
      },
      getFileExtension: function getFileExtension(a) {
        var b = a && a.match(/\.([^.]+)$/);
        return b ? b[1].toLowerCase() : "";
      },
      getFileMime: function getFileMime(a) {
        return this.mimes[this.getFileExtension(a)] || "";
      }
    };
    return d.addMimeType(c), d;
  }), d("moxie/core/utils/Env", ["moxie/core/utils/Basic"], function (a) {
    function b(a, b, c) {
      var d = 0,
          e = 0,
          f = 0,
          g = {
        dev: -6,
        alpha: -5,
        a: -5,
        beta: -4,
        b: -4,
        RC: -3,
        rc: -3,
        "#": -2,
        p: 1,
        pl: 1
      },
          h = function h(a) {
        return a = ("" + a).replace(/[_\-+]/g, "."), a = a.replace(/([^.\d]+)/g, ".$1.").replace(/\.{2,}/g, "."), a.length ? a.split(".") : [-8];
      },
          i = function i(a) {
        return a ? isNaN(a) ? g[a] || -7 : parseInt(a, 10) : 0;
      };

      for (a = h(a), b = h(b), e = Math.max(a.length, b.length), d = 0; e > d; d++) {
        if (a[d] != b[d]) {
          if (a[d] = i(a[d]), b[d] = i(b[d]), a[d] < b[d]) {
            f = -1;
            break;
          }

          if (a[d] > b[d]) {
            f = 1;
            break;
          }
        }
      }

      if (!c) return f;

      switch (c) {
        case ">":
        case "gt":
          return f > 0;

        case ">=":
        case "ge":
          return f >= 0;

        case "<=":
        case "le":
          return 0 >= f;

        case "==":
        case "=":
        case "eq":
          return 0 === f;

        case "<>":
        case "!=":
        case "ne":
          return 0 !== f;

        case "":
        case "<":
        case "lt":
          return 0 > f;

        default:
          return null;
      }
    }

    var c = function (a) {
      var b = "",
          c = "?",
          d = "function",
          e = "undefined",
          f = "object",
          g = "major",
          h = "name",
          i = "version",
          j = {
        has: function has(a, b) {
          return -1 !== b.toLowerCase().indexOf(a.toLowerCase());
        },
        lowerize: function lowerize(a) {
          return a.toLowerCase();
        }
      },
          k = {
        rgx: function rgx() {
          for (var b, c, g, h, i, j, k, l = 0, m = arguments; l < m.length; l += 2) {
            var n = m[l],
                o = m[l + 1];

            if (_typeof(b) === e) {
              b = {};

              for (h in o) {
                i = o[h], _typeof(i) === f ? b[i[0]] = a : b[i] = a;
              }
            }

            for (c = g = 0; c < n.length; c++) {
              if (j = n[c].exec(this.getUA())) {
                for (h = 0; h < o.length; h++) {
                  k = j[++g], i = o[h], _typeof(i) === f && i.length > 0 ? 2 == i.length ? b[i[0]] = _typeof(i[1]) == d ? i[1].call(this, k) : i[1] : 3 == i.length ? b[i[0]] = _typeof(i[1]) !== d || i[1].exec && i[1].test ? k ? k.replace(i[1], i[2]) : a : k ? i[1].call(this, k, i[2]) : a : 4 == i.length && (b[i[0]] = k ? i[3].call(this, k.replace(i[1], i[2])) : a) : b[i] = k ? k : a;
                }

                break;
              }
            }

            if (j) break;
          }

          return b;
        },
        str: function str(b, d) {
          for (var e in d) {
            if (_typeof(d[e]) === f && d[e].length > 0) {
              for (var g = 0; g < d[e].length; g++) {
                if (j.has(d[e][g], b)) return e === c ? a : e;
              }
            } else if (j.has(d[e], b)) return e === c ? a : e;
          }

          return b;
        }
      },
          l = {
        browser: {
          oldsafari: {
            major: {
              1: ["/8", "/1", "/3"],
              2: "/4",
              "?": "/"
            },
            version: {
              "1.0": "/8",
              1.2: "/1",
              1.3: "/3",
              "2.0": "/412",
              "2.0.2": "/416",
              "2.0.3": "/417",
              "2.0.4": "/419",
              "?": "/"
            }
          }
        },
        device: {
          sprint: {
            model: {
              "Evo Shift 4G": "7373KT"
            },
            vendor: {
              HTC: "APA",
              Sprint: "Sprint"
            }
          }
        },
        os: {
          windows: {
            version: {
              ME: "4.90",
              "NT 3.11": "NT3.51",
              "NT 4.0": "NT4.0",
              2000: "NT 5.0",
              XP: ["NT 5.1", "NT 5.2"],
              Vista: "NT 6.0",
              7: "NT 6.1",
              8: "NT 6.2",
              8.1: "NT 6.3",
              RT: "ARM"
            }
          }
        }
      },
          m = {
        browser: [[/(opera\smini)\/((\d+)?[\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i, /(opera).+version\/((\d+)?[\w\.]+)/i, /(opera)[\/\s]+((\d+)?[\w\.]+)/i], [h, i, g], [/\s(opr)\/((\d+)?[\w\.]+)/i], [[h, "Opera"], i, g], [/(kindle)\/((\d+)?[\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?((\d+)?[\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?((\d+)?[\w\.]*)/i, /(?:ms|\()(ie)\s((\d+)?[\w\.]+)/i, /(rekonq)((?:\/)[\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron)\/((\d+)?[\w\.-]+)/i], [h, i, g], [/(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i], [[h, "IE"], i, g], [/(yabrowser)\/((\d+)?[\w\.]+)/i], [[h, "Yandex"], i, g], [/(comodo_dragon)\/((\d+)?[\w\.]+)/i], [[h, /_/g, " "], i, g], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i], [h, i, g], [/(dolfin)\/((\d+)?[\w\.]+)/i], [[h, "Dolphin"], i, g], [/((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i], [[h, "Chrome"], i, g], [/((?:android.+))version\/((\d+)?[\w\.]+)\smobile\ssafari/i], [[h, "Android Browser"], i, g], [/version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i], [i, g, [h, "Mobile Safari"]], [/version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i], [i, g, h], [/webkit.+?(mobile\s?safari|safari)((\/[\w\.]+))/i], [h, [g, k.str, l.browser.oldsafari.major], [i, k.str, l.browser.oldsafari.version]], [/(konqueror)\/((\d+)?[\w\.]+)/i, /(webkit|khtml)\/((\d+)?[\w\.]+)/i], [h, i, g], [/(navigator|netscape)\/((\d+)?[\w\.-]+)/i], [[h, "Netscape"], i, g], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?((\d+)?[\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i, /(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i, /(uc\s?browser|polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i, /(links)\s\(((\d+)?[\w\.]+)/i, /(gobrowser)\/?((\d+)?[\w\.]+)*/i, /(ice\s?browser)\/v?((\d+)?[\w\._]+)/i, /(mosaic)[\/\s]((\d+)?[\w\.]+)/i], [h, i, g]],
        engine: [[/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [h, i], [/rv\:([\w\.]+).*(gecko)/i], [i, h]],
        os: [[/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [h, [i, k.str, l.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[h, "Windows"], [i, k.str, l.os.windows.version]], [/\((bb)(10);/i], [[h, "BlackBerry"], i], [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)\/([\w\.]+)/i, /(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego)[\/\s-]?([\w\.]+)*/i], [h, i], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i], [[h, "Symbian"], i], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[h, "Firefox OS"], i], [/(nintendo|playstation)\s([wids3portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)[\/\s-]?([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i], [h, i], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[h, "Chromium OS"], i], [/(sunos)\s?([\w\.]+\d)*/i], [[h, "Solaris"], i], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i], [h, i], [/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i], [[h, "iOS"], [i, /_/g, "."]], [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i], [h, [i, /_/g, "."]], [/(haiku)\s(\w+)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(macintosh|mac(?=_powerpc)|plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos)/i, /(unix)\s?([\w\.]+)*/i], [h, i]]
      },
          n = function n(a) {
        var c = a || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : b);
        this.getBrowser = function () {
          return k.rgx.apply(this, m.browser);
        }, this.getEngine = function () {
          return k.rgx.apply(this, m.engine);
        }, this.getOS = function () {
          return k.rgx.apply(this, m.os);
        }, this.getResult = function () {
          return {
            ua: this.getUA(),
            browser: this.getBrowser(),
            engine: this.getEngine(),
            os: this.getOS()
          };
        }, this.getUA = function () {
          return c;
        }, this.setUA = function (a) {
          return c = a, this;
        }, this.setUA(c);
      };

      return new n().getResult();
    }(),
        d = function () {
      var b = {
        define_property: function () {
          return !1;
        }(),
        create_canvas: function () {
          var a = document.createElement("canvas");
          return !(!a.getContext || !a.getContext("2d"));
        }(),
        return_response_type: function return_response_type(b) {
          try {
            if (-1 !== a.inArray(b, ["", "text", "document"])) return !0;

            if (window.XMLHttpRequest) {
              var c = new XMLHttpRequest();
              if (c.open("get", "/"), "responseType" in c) return c.responseType = b, c.responseType !== b ? !1 : !0;
            }
          } catch (d) {}

          return !1;
        },
        use_data_uri: function () {
          var a = new Image();
          return a.onload = function () {
            b.use_data_uri = 1 === a.width && 1 === a.height;
          }, setTimeout(function () {
            a.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP8AAAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
          }, 1), !1;
        }(),
        use_data_uri_over32kb: function use_data_uri_over32kb() {
          return b.use_data_uri && ("IE" !== e.browser || e.version >= 9);
        },
        use_data_uri_of: function use_data_uri_of(a) {
          return b.use_data_uri && 33e3 > a || b.use_data_uri_over32kb();
        },
        use_fileinput: function use_fileinput() {
          var a = document.createElement("input");
          return a.setAttribute("type", "file"), !a.disabled;
        }
      };
      return function (c) {
        var d = [].slice.call(arguments);
        return d.shift(), "function" === a.typeOf(b[c]) ? b[c].apply(this, d) : !!b[c];
      };
    }(),
        e = {
      can: d,
      browser: c.browser.name,
      version: parseFloat(c.browser.major),
      os: c.os.name,
      osVersion: c.os.version,
      verComp: b,
      swf_url: "../flash/Moxie.swf",
      xap_url: "../silverlight/Moxie.xap",
      global_event_dispatcher: "moxie.core.EventTarget.instance.dispatchEvent"
    };

    return e.OS = e.os, e;
  }), d("moxie/core/utils/Dom", ["moxie/core/utils/Env"], function (a) {
    var b = function b(a) {
      return "string" != typeof a ? a : document.getElementById(a);
    },
        c = function c(a, b) {
      if (!a.className) return !1;
      var c = new RegExp("(^|\\s+)" + b + "(\\s+|$)");
      return c.test(a.className);
    },
        d = function d(a, b) {
      c(a, b) || (a.className = a.className ? a.className.replace(/\s+$/, "") + " " + b : b);
    },
        e = function e(a, b) {
      if (a.className) {
        var c = new RegExp("(^|\\s+)" + b + "(\\s+|$)");
        a.className = a.className.replace(c, function (a, b, c) {
          return " " === b && " " === c ? " " : "";
        });
      }
    },
        f = function f(a, b) {
      return a.currentStyle ? a.currentStyle[b] : window.getComputedStyle ? window.getComputedStyle(a, null)[b] : void 0;
    },
        g = function g(b, c) {
      function d(a) {
        var b,
            c,
            d = 0,
            e = 0;
        return a && (c = a.getBoundingClientRect(), b = "CSS1Compat" === j.compatMode ? j.documentElement : j.body, d = c.left + b.scrollLeft, e = c.top + b.scrollTop), {
          x: d,
          y: e
        };
      }

      var e,
          f,
          g,
          h = 0,
          i = 0,
          j = document;
      if (b = b, c = c || j.body, b && b.getBoundingClientRect && "IE" === a.browser && (!j.documentMode || j.documentMode < 8)) return f = d(b), g = d(c), {
        x: f.x - g.x,
        y: f.y - g.y
      };

      for (e = b; e && e != c && e.nodeType;) {
        h += e.offsetLeft || 0, i += e.offsetTop || 0, e = e.offsetParent;
      }

      for (e = b.parentNode; e && e != c && e.nodeType;) {
        h -= e.scrollLeft || 0, i -= e.scrollTop || 0, e = e.parentNode;
      }

      return {
        x: h,
        y: i
      };
    },
        h = function h(a) {
      return {
        w: a.offsetWidth || a.clientWidth,
        h: a.offsetHeight || a.clientHeight
      };
    };

    return {
      get: b,
      hasClass: c,
      addClass: d,
      removeClass: e,
      getStyle: f,
      getPos: g,
      getSize: h
    };
  }), d("moxie/core/Exceptions", ["moxie/core/utils/Basic"], function (a) {
    function b(a, b) {
      var c;

      for (c in a) {
        if (a[c] === b) return c;
      }

      return null;
    }

    return {
      RuntimeError: function () {
        function c(a) {
          this.code = a, this.name = b(d, a), this.message = this.name + ": RuntimeError " + this.code;
        }

        var d = {
          NOT_INIT_ERR: 1,
          NOT_SUPPORTED_ERR: 9,
          JS_ERR: 4
        };
        return a.extend(c, d), c.prototype = Error.prototype, c;
      }(),
      OperationNotAllowedException: function () {
        function b(a) {
          this.code = a, this.name = "OperationNotAllowedException";
        }

        return a.extend(b, {
          NOT_ALLOWED_ERR: 1
        }), b.prototype = Error.prototype, b;
      }(),
      ImageError: function () {
        function c(a) {
          this.code = a, this.name = b(d, a), this.message = this.name + ": ImageError " + this.code;
        }

        var d = {
          WRONG_FORMAT: 1,
          MAX_RESOLUTION_ERR: 2
        };
        return a.extend(c, d), c.prototype = Error.prototype, c;
      }(),
      FileException: function () {
        function c(a) {
          this.code = a, this.name = b(d, a), this.message = this.name + ": FileException " + this.code;
        }

        var d = {
          NOT_FOUND_ERR: 1,
          SECURITY_ERR: 2,
          ABORT_ERR: 3,
          NOT_READABLE_ERR: 4,
          ENCODING_ERR: 5,
          NO_MODIFICATION_ALLOWED_ERR: 6,
          INVALID_STATE_ERR: 7,
          SYNTAX_ERR: 8
        };
        return a.extend(c, d), c.prototype = Error.prototype, c;
      }(),
      DOMException: function () {
        function c(a) {
          this.code = a, this.name = b(d, a), this.message = this.name + ": DOMException " + this.code;
        }

        var d = {
          INDEX_SIZE_ERR: 1,
          DOMSTRING_SIZE_ERR: 2,
          HIERARCHY_REQUEST_ERR: 3,
          WRONG_DOCUMENT_ERR: 4,
          INVALID_CHARACTER_ERR: 5,
          NO_DATA_ALLOWED_ERR: 6,
          NO_MODIFICATION_ALLOWED_ERR: 7,
          NOT_FOUND_ERR: 8,
          NOT_SUPPORTED_ERR: 9,
          INUSE_ATTRIBUTE_ERR: 10,
          INVALID_STATE_ERR: 11,
          SYNTAX_ERR: 12,
          INVALID_MODIFICATION_ERR: 13,
          NAMESPACE_ERR: 14,
          INVALID_ACCESS_ERR: 15,
          VALIDATION_ERR: 16,
          TYPE_MISMATCH_ERR: 17,
          SECURITY_ERR: 18,
          NETWORK_ERR: 19,
          ABORT_ERR: 20,
          URL_MISMATCH_ERR: 21,
          QUOTA_EXCEEDED_ERR: 22,
          TIMEOUT_ERR: 23,
          INVALID_NODE_TYPE_ERR: 24,
          DATA_CLONE_ERR: 25
        };
        return a.extend(c, d), c.prototype = Error.prototype, c;
      }(),
      EventException: function () {
        function b(a) {
          this.code = a, this.name = "EventException";
        }

        return a.extend(b, {
          UNSPECIFIED_EVENT_TYPE_ERR: 0
        }), b.prototype = Error.prototype, b;
      }()
    };
  }), d("moxie/core/EventTarget", ["moxie/core/Exceptions", "moxie/core/utils/Basic"], function (a, b) {
    function c() {
      var c = {};
      b.extend(this, {
        uid: null,
        init: function init() {
          this.uid || (this.uid = b.guid("uid_"));
        },
        addEventListener: function addEventListener(a, d, e, f) {
          var g,
              h = this;
          return a = b.trim(a), /\s/.test(a) ? void b.each(a.split(/\s+/), function (a) {
            h.addEventListener(a, d, e, f);
          }) : (a = a.toLowerCase(), e = parseInt(e, 10) || 0, g = c[this.uid] && c[this.uid][a] || [], g.push({
            fn: d,
            priority: e,
            scope: f || this
          }), c[this.uid] || (c[this.uid] = {}), void (c[this.uid][a] = g));
        },
        hasEventListener: function hasEventListener(a) {
          return a ? !(!c[this.uid] || !c[this.uid][a]) : !!c[this.uid];
        },
        removeEventListener: function removeEventListener(a, d) {
          a = a.toLowerCase();
          var e,
              f = c[this.uid] && c[this.uid][a];

          if (f) {
            if (d) {
              for (e = f.length - 1; e >= 0; e--) {
                if (f[e].fn === d) {
                  f.splice(e, 1);
                  break;
                }
              }
            } else f = [];

            f.length || (delete c[this.uid][a], b.isEmptyObj(c[this.uid]) && delete c[this.uid]);
          }
        },
        removeAllEventListeners: function removeAllEventListeners() {
          c[this.uid] && delete c[this.uid];
        },
        dispatchEvent: function dispatchEvent(d) {
          var e,
              f,
              g,
              h,
              i,
              j = {},
              k = !0;

          if ("string" !== b.typeOf(d)) {
            if (h = d, "string" !== b.typeOf(h.type)) throw new a.EventException(a.EventException.UNSPECIFIED_EVENT_TYPE_ERR);
            d = h.type, h.total !== i && h.loaded !== i && (j.total = h.total, j.loaded = h.loaded), j.async = h.async || !1;
          }

          if (-1 !== d.indexOf("::") ? !function (a) {
            e = a[0], d = a[1];
          }(d.split("::")) : e = this.uid, d = d.toLowerCase(), f = c[e] && c[e][d]) {
            f.sort(function (a, b) {
              return b.priority - a.priority;
            }), g = [].slice.call(arguments), g.shift(), j.type = d, g.unshift(j);
            var l = [];
            b.each(f, function (a) {
              g[0].target = a.scope, l.push(j.async ? function (b) {
                setTimeout(function () {
                  b(a.fn.apply(a.scope, g) === !1);
                }, 1);
              } : function (b) {
                b(a.fn.apply(a.scope, g) === !1);
              });
            }), l.length && b.inSeries(l, function (a) {
              k = !a;
            });
          }

          return k;
        },
        bind: function bind() {
          this.addEventListener.apply(this, arguments);
        },
        unbind: function unbind() {
          this.removeEventListener.apply(this, arguments);
        },
        unbindAll: function unbindAll() {
          this.removeAllEventListeners.apply(this, arguments);
        },
        trigger: function trigger() {
          return this.dispatchEvent.apply(this, arguments);
        },
        convertEventPropsToHandlers: function convertEventPropsToHandlers(a) {
          var c;
          "array" !== b.typeOf(a) && (a = [a]);

          for (var d = 0; d < a.length; d++) {
            c = "on" + a[d], "function" === b.typeOf(this[c]) ? this.addEventListener(a[d], this[c]) : "undefined" === b.typeOf(this[c]) && (this[c] = null);
          }
        }
      });
    }

    return c.instance = new c(), c;
  }), d("moxie/core/utils/Encode", [], function () {
    var a = function a(_a2) {
      return unescape(encodeURIComponent(_a2));
    },
        b = function b(a) {
      return decodeURIComponent(escape(a));
    },
        c = function c(a, _c) {
      if ("function" == typeof window.atob) return _c ? b(window.atob(a)) : window.atob(a);
      var d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          m = 0,
          n = 0,
          o = "",
          p = [];
      if (!a) return a;
      a += "";

      do {
        g = l.indexOf(a.charAt(m++)), h = l.indexOf(a.charAt(m++)), i = l.indexOf(a.charAt(m++)), j = l.indexOf(a.charAt(m++)), k = g << 18 | h << 12 | i << 6 | j, d = k >> 16 & 255, e = k >> 8 & 255, f = 255 & k, p[n++] = 64 == i ? String.fromCharCode(d) : 64 == j ? String.fromCharCode(d, e) : String.fromCharCode(d, e, f);
      } while (m < a.length);

      return o = p.join(""), _c ? b(o) : o;
    },
        d = function d(b, c) {
      if (c && a(b), "function" == typeof window.btoa) return window.btoa(b);
      var d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          m = 0,
          n = 0,
          o = "",
          p = [];
      if (!b) return b;

      do {
        d = b.charCodeAt(m++), e = b.charCodeAt(m++), f = b.charCodeAt(m++), k = d << 16 | e << 8 | f, g = k >> 18 & 63, h = k >> 12 & 63, i = k >> 6 & 63, j = 63 & k, p[n++] = l.charAt(g) + l.charAt(h) + l.charAt(i) + l.charAt(j);
      } while (m < b.length);

      o = p.join("");
      var q = b.length % 3;
      return (q ? o.slice(0, q - 3) : o) + "===".slice(q || 3);
    };

    return {
      utf8_encode: a,
      utf8_decode: b,
      atob: c,
      btoa: d
    };
  }), d("moxie/runtime/Runtime", ["moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/EventTarget"], function (a, b, c) {
    function d(c, e, g, h, i) {
      var j,
          k = this,
          l = a.guid(e + "_"),
          m = i || "browser";
      c = c || {}, f[l] = this, g = a.extend({
        access_binary: !1,
        access_image_binary: !1,
        display_media: !1,
        do_cors: !1,
        drag_and_drop: !1,
        filter_by_extension: !0,
        resize_image: !1,
        report_upload_progress: !1,
        return_response_headers: !1,
        return_response_type: !1,
        return_status_code: !0,
        send_custom_headers: !1,
        select_file: !1,
        select_folder: !1,
        select_multiple: !0,
        send_binary_string: !1,
        send_browser_cookies: !0,
        send_multipart: !0,
        slice_blob: !1,
        stream_upload: !1,
        summon_file_dialog: !1,
        upload_filesize: !0,
        use_http_method: !0
      }, g), c.preferred_caps && (m = d.getMode(h, c.preferred_caps, m)), j = function () {
        var b = {};
        return {
          exec: function exec(a, c, d, e) {
            return j[c] && (b[a] || (b[a] = {
              context: this,
              instance: new j[c]()
            }), b[a].instance[d]) ? b[a].instance[d].apply(this, e) : void 0;
          },
          removeInstance: function removeInstance(a) {
            delete b[a];
          },
          removeAllInstances: function removeAllInstances() {
            var c = this;
            a.each(b, function (b, d) {
              "function" === a.typeOf(b.instance.destroy) && b.instance.destroy.call(b.context), c.removeInstance(d);
            });
          }
        };
      }(), a.extend(this, {
        initialized: !1,
        uid: l,
        type: e,
        mode: d.getMode(h, c.required_caps, m),
        shimid: l + "_container",
        clients: 0,
        options: c,
        can: function can(b, c) {
          var e = arguments[2] || g;

          if ("string" === a.typeOf(b) && "undefined" === a.typeOf(c) && (b = d.parseCaps(b)), "object" === a.typeOf(b)) {
            for (var f in b) {
              if (!this.can(f, b[f], e)) return !1;
            }

            return !0;
          }

          return "function" === a.typeOf(e[b]) ? e[b].call(this, c) : c === e[b];
        },
        getShimContainer: function getShimContainer() {
          var c,
              d = b.get(this.shimid);
          return d || (c = this.options.container ? b.get(this.options.container) : document.body, d = document.createElement("div"), d.id = this.shimid, d.className = "moxie-shim moxie-shim-" + this.type, a.extend(d.style, {
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "1px",
            height: "1px",
            overflow: "hidden"
          }), c.appendChild(d), c = null), d;
        },
        getShim: function getShim() {
          return j;
        },
        shimExec: function shimExec(a, b) {
          var c = [].slice.call(arguments, 2);
          return k.getShim().exec.call(this, this.uid, a, b, c);
        },
        exec: function exec(a, b) {
          var c = [].slice.call(arguments, 2);
          return k[a] && k[a][b] ? k[a][b].apply(this, c) : k.shimExec.apply(this, arguments);
        },
        destroy: function destroy() {
          if (k) {
            var a = b.get(this.shimid);
            a && a.parentNode.removeChild(a), j && j.removeAllInstances(), this.unbindAll(), delete f[this.uid], this.uid = null, l = k = j = a = null;
          }
        }
      }), this.mode && c.required_caps && !this.can(c.required_caps) && (this.mode = !1);
    }

    var e = {},
        f = {};
    return d.order = "html5,flash,silverlight,html4", d.getRuntime = function (a) {
      return f[a] ? f[a] : !1;
    }, d.addConstructor = function (a, b) {
      b.prototype = c.instance, e[a] = b;
    }, d.getConstructor = function (a) {
      return e[a] || null;
    }, d.getInfo = function (a) {
      var b = d.getRuntime(a);
      return b ? {
        uid: b.uid,
        type: b.type,
        mode: b.mode,
        can: function can() {
          return b.can.apply(b, arguments);
        }
      } : null;
    }, d.parseCaps = function (b) {
      var c = {};
      return "string" !== a.typeOf(b) ? b || {} : (a.each(b.split(","), function (a) {
        c[a] = !0;
      }), c);
    }, d.can = function (a, b) {
      var c,
          e,
          f = d.getConstructor(a);
      return f ? (c = new f({
        required_caps: b
      }), e = c.mode, c.destroy(), !!e) : !1;
    }, d.thatCan = function (a, b) {
      var c = (b || d.order).split(/\s*,\s*/);

      for (var e in c) {
        if (d.can(c[e], a)) return c[e];
      }

      return null;
    }, d.getMode = function (b, c, d) {
      var e = null;

      if ("undefined" === a.typeOf(d) && (d = "browser"), c && !a.isEmptyObj(b)) {
        if (a.each(c, function (c, d) {
          if (b.hasOwnProperty(d)) {
            var f = b[d](c);

            if ("string" == typeof f && (f = [f]), e) {
              if (!(e = a.arrayIntersect(e, f))) return e = !1;
            } else e = f;
          }
        }), e) return -1 !== a.inArray(d, e) ? d : e[0];
        if (e === !1) return !1;
      }

      return d;
    }, d.capTrue = function () {
      return !0;
    }, d.capFalse = function () {
      return !1;
    }, d.capTest = function (a) {
      return function () {
        return !!a;
      };
    }, d;
  }), d("moxie/runtime/RuntimeClient", ["moxie/core/Exceptions", "moxie/core/utils/Basic", "moxie/runtime/Runtime"], function (a, b, c) {
    return function () {
      var d;
      b.extend(this, {
        connectRuntime: function connectRuntime(e) {
          function f(b) {
            var g, i;
            return b.length ? (g = b.shift(), (i = c.getConstructor(g)) ? (d = new i(e), d.bind("Init", function () {
              d.initialized = !0, setTimeout(function () {
                d.clients++, h.trigger("RuntimeInit", d);
              }, 1);
            }), d.bind("Error", function () {
              d.destroy(), f(b);
            }), d.mode ? void d.init() : void d.trigger("Error")) : void f(b)) : (h.trigger("RuntimeError", new a.RuntimeError(a.RuntimeError.NOT_INIT_ERR)), void (d = null));
          }

          var g,
              h = this;

          if ("string" === b.typeOf(e) ? g = e : "string" === b.typeOf(e.ruid) && (g = e.ruid), g) {
            if (d = c.getRuntime(g)) return d.clients++, d;
            throw new a.RuntimeError(a.RuntimeError.NOT_INIT_ERR);
          }

          f((e.runtime_order || c.order).split(/\s*,\s*/));
        },
        getRuntime: function getRuntime() {
          return d && d.uid ? d : (d = null, null);
        },
        disconnectRuntime: function disconnectRuntime() {
          d && --d.clients <= 0 && (d.destroy(), d = null);
        }
      });
    };
  }), d("moxie/file/Blob", ["moxie/core/utils/Basic", "moxie/core/utils/Encode", "moxie/runtime/RuntimeClient"], function (a, b, c) {
    function d(f, g) {
      function h(b, c, f) {
        var g,
            h = e[this.uid];
        return "string" === a.typeOf(h) && h.length ? (g = new d(null, {
          type: f,
          size: c - b
        }), g.detach(h.substr(b, g.size)), g) : null;
      }

      c.call(this), f && this.connectRuntime(f), g ? "string" === a.typeOf(g) && (g = {
        data: g
      }) : g = {}, a.extend(this, {
        uid: g.uid || a.guid("uid_"),
        ruid: f,
        size: g.size || 0,
        type: g.type || "",
        slice: function slice(a, b, c) {
          return this.isDetached() ? h.apply(this, arguments) : this.getRuntime().exec.call(this, "Blob", "slice", this.getSource(), a, b, c);
        },
        getSource: function getSource() {
          return e[this.uid] ? e[this.uid] : null;
        },
        detach: function detach(a) {
          this.ruid && (this.getRuntime().exec.call(this, "Blob", "destroy"), this.disconnectRuntime(), this.ruid = null), a = a || "";
          var c = a.match(/^data:([^;]*);base64,/);
          c && (this.type = c[1], a = b.atob(a.substring(a.indexOf("base64,") + 7))), this.size = a.length, e[this.uid] = a;
        },
        isDetached: function isDetached() {
          return !this.ruid && "string" === a.typeOf(e[this.uid]);
        },
        destroy: function destroy() {
          this.detach(), delete e[this.uid];
        }
      }), g.data ? this.detach(g.data) : e[this.uid] = g;
    }

    var e = {};
    return d;
  }), d("moxie/file/File", ["moxie/core/utils/Basic", "moxie/core/utils/Mime", "moxie/file/Blob"], function (a, b, c) {
    function d(d, e) {
      var f, g;
      if (e || (e = {}), g = e.type && "" !== e.type ? e.type : b.getFileMime(e.name), e.name) f = e.name.replace(/\\/g, "/"), f = f.substr(f.lastIndexOf("/") + 1);else {
        var h = g.split("/")[0];
        f = a.guid(("" !== h ? h : "file") + "_"), b.extensions[g] && (f += "." + b.extensions[g][0]);
      }
      c.apply(this, arguments), a.extend(this, {
        type: g || "",
        name: f || a.guid("file_"),
        relativePath: "",
        lastModifiedDate: e.lastModifiedDate || new Date().toLocaleString()
      });
    }

    return d.prototype = c.prototype, d;
  }), d("moxie/file/FileInput", ["moxie/core/utils/Basic", "moxie/core/utils/Mime", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/core/EventTarget", "moxie/core/I18n", "moxie/file/File", "moxie/runtime/Runtime", "moxie/runtime/RuntimeClient"], function (a, b, c, d, e, f, g, h, i) {
    function j(e) {
      var j,
          l,
          m,
          n = this;
      if (-1 !== a.inArray(a.typeOf(e), ["string", "node"]) && (e = {
        browse_button: e
      }), l = c.get(e.browse_button), !l) throw new d.DOMException(d.DOMException.NOT_FOUND_ERR);
      m = {
        accept: [{
          title: f.translate("All Files"),
          extensions: "*"
        }],
        name: "file",
        multiple: !1,
        required_caps: !1,
        container: l.parentNode || document.body
      }, e = a.extend({}, m, e), "string" == typeof e.required_caps && (e.required_caps = h.parseCaps(e.required_caps)), "string" == typeof e.accept && (e.accept = b.mimes2extList(e.accept)), j = c.get(e.container), j || (j = document.body), "static" === c.getStyle(j, "position") && (j.style.position = "relative"), j = l = null, i.call(n), a.extend(n, {
        uid: a.guid("uid_"),
        ruid: null,
        shimid: null,
        files: null,
        init: function init() {
          n.convertEventPropsToHandlers(k), n.bind("RuntimeInit", function (b, d) {
            n.ruid = d.uid, n.shimid = d.shimid, n.bind("Ready", function () {
              n.trigger("Refresh");
            }, 999), n.bind("Change", function () {
              var b = d.exec.call(n, "FileInput", "getFiles");
              n.files = [], a.each(b, function (a) {
                return 0 === a.size ? !0 : void n.files.push(new g(n.ruid, a));
              });
            }, 999), n.bind("Refresh", function () {
              var b, f, g, h;
              g = c.get(e.browse_button), h = c.get(d.shimid), g && (b = c.getPos(g, c.get(e.container)), f = c.getSize(g), h && a.extend(h.style, {
                top: b.y + "px",
                left: b.x + "px",
                width: f.w + "px",
                height: f.h + "px"
              })), h = g = null;
            }), d.exec.call(n, "FileInput", "init", e);
          }), n.connectRuntime(a.extend({}, e, {
            required_caps: {
              select_file: !0
            }
          }));
        },
        disable: function disable(b) {
          var c = this.getRuntime();
          c && c.exec.call(this, "FileInput", "disable", "undefined" === a.typeOf(b) ? !0 : b);
        },
        refresh: function refresh() {
          n.trigger("Refresh");
        },
        destroy: function destroy() {
          var b = this.getRuntime();
          b && (b.exec.call(this, "FileInput", "destroy"), this.disconnectRuntime()), "array" === a.typeOf(this.files) && a.each(this.files, function (a) {
            a.destroy();
          }), this.files = null;
        }
      });
    }

    var k = ["ready", "change", "cancel", "mouseenter", "mouseleave", "mousedown", "mouseup"];
    return j.prototype = e.instance, j;
  }), d("moxie/runtime/RuntimeTarget", ["moxie/core/utils/Basic", "moxie/runtime/RuntimeClient", "moxie/core/EventTarget"], function (a, b, c) {
    function d() {
      this.uid = a.guid("uid_"), b.call(this), this.destroy = function () {
        this.disconnectRuntime(), this.unbindAll();
      };
    }

    return d.prototype = c.instance, d;
  }), d("moxie/file/FileReader", ["moxie/core/utils/Basic", "moxie/core/utils/Encode", "moxie/core/Exceptions", "moxie/core/EventTarget", "moxie/file/Blob", "moxie/file/File", "moxie/runtime/RuntimeTarget"], function (a, b, c, d, e, f, g) {
    function h() {
      function d(a, d) {
        function k(a) {
          j.readyState = h.DONE, j.error = a, j.trigger("error"), l();
        }

        function l() {
          f.destroy(), f = null, j.trigger("loadend");
        }

        function m(b) {
          f.bind("Error", function (a, b) {
            k(b);
          }), f.bind("Progress", function (a) {
            j.result = b.exec.call(f, "FileReader", "getResult"), j.trigger(a);
          }), f.bind("Load", function (a) {
            j.readyState = h.DONE, j.result = b.exec.call(f, "FileReader", "getResult"), j.trigger(a), l();
          }), b.exec.call(f, "FileReader", "read", a, d);
        }

        if (f = new g(), this.convertEventPropsToHandlers(i), this.readyState === h.LOADING) return k(new c.DOMException(c.DOMException.INVALID_STATE_ERR));
        if (this.readyState = h.LOADING, this.trigger("loadstart"), d instanceof e) {
          if (d.isDetached()) {
            var n = d.getSource();

            switch (a) {
              case "readAsText":
              case "readAsBinaryString":
                this.result = n;
                break;

              case "readAsDataURL":
                this.result = "data:" + d.type + ";base64," + b.btoa(n);
            }

            this.readyState = h.DONE, this.trigger("load"), l();
          } else m(f.connectRuntime(d.ruid));
        } else k(new c.DOMException(c.DOMException.NOT_FOUND_ERR));
      }

      var f,
          j = this;
      a.extend(this, {
        uid: a.guid("uid_"),
        readyState: h.EMPTY,
        result: null,
        error: null,
        readAsBinaryString: function readAsBinaryString(a) {
          d.call(this, "readAsBinaryString", a);
        },
        readAsDataURL: function readAsDataURL(a) {
          d.call(this, "readAsDataURL", a);
        },
        readAsText: function readAsText(a) {
          d.call(this, "readAsText", a);
        },
        abort: function abort() {
          this.result = null, -1 === a.inArray(this.readyState, [h.EMPTY, h.DONE]) && (this.readyState === h.LOADING && (this.readyState = h.DONE), f && f.getRuntime().exec.call(this, "FileReader", "abort"), this.trigger("abort"), this.trigger("loadend"));
        },
        destroy: function destroy() {
          this.abort(), f && (f.getRuntime().exec.call(this, "FileReader", "destroy"), f.disconnectRuntime()), j = f = null;
        }
      });
    }

    var i = ["loadstart", "progress", "load", "abort", "error", "loadend"];
    return h.EMPTY = 0, h.LOADING = 1, h.DONE = 2, h.prototype = d.instance, h;
  }), d("moxie/core/utils/Url", [], function () {
    var a = function a(b, c) {
      for (var d = ["source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory", "file", "query", "fragment"], e = d.length, f = {
        http: 80,
        https: 443
      }, g = {}, h = /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\\?([^#]*))?(?:#(.*))?)/, i = h.exec(b || ""); e--;) {
        i[e] && (g[d[e]] = i[e]);
      }

      if (!g.scheme) {
        c && "string" != typeof c || (c = a(c || document.location.href)), g.scheme = c.scheme, g.host = c.host, g.port = c.port;
        var j = "";
        /^[^\/]/.test(g.path) && (j = c.path, /(\/|\/[^\.]+)$/.test(j) ? j += "/" : j = j.replace(/\/[^\/]+$/, "/")), g.path = j + (g.path || "");
      }

      return g.port || (g.port = f[g.scheme] || 80), g.port = parseInt(g.port, 10), g.path || (g.path = "/"), delete g.source, g;
    },
        b = function b(_b) {
      var c = {
        http: 80,
        https: 443
      },
          d = a(_b);
      return d.scheme + "://" + d.host + (d.port !== c[d.scheme] ? ":" + d.port : "") + d.path + (d.query ? d.query : "");
    },
        c = function c(b) {
      function c(a) {
        return [a.scheme, a.host, a.port].join("/");
      }

      return "string" == typeof b && (b = a(b)), c(a()) === c(b);
    };

    return {
      parseUrl: a,
      resolveUrl: b,
      hasSameOrigin: c
    };
  }), d("moxie/file/FileReaderSync", ["moxie/core/utils/Basic", "moxie/runtime/RuntimeClient", "moxie/core/utils/Encode"], function (a, b, c) {
    return function () {
      function d(a, b) {
        if (!b.isDetached()) {
          var d = this.connectRuntime(b.ruid).exec.call(this, "FileReaderSync", "read", a, b);
          return this.disconnectRuntime(), d;
        }

        var e = b.getSource();

        switch (a) {
          case "readAsBinaryString":
            return e;

          case "readAsDataURL":
            return "data:" + b.type + ";base64," + c.btoa(e);

          case "readAsText":
            for (var f = "", g = 0, h = e.length; h > g; g++) {
              f += String.fromCharCode(e[g]);
            }

            return f;
        }
      }

      b.call(this), a.extend(this, {
        uid: a.guid("uid_"),
        readAsBinaryString: function readAsBinaryString(a) {
          return d.call(this, "readAsBinaryString", a);
        },
        readAsDataURL: function readAsDataURL(a) {
          return d.call(this, "readAsDataURL", a);
        },
        readAsText: function readAsText(a) {
          return d.call(this, "readAsText", a);
        }
      });
    };
  }), d("moxie/xhr/FormData", ["moxie/core/Exceptions", "moxie/core/utils/Basic", "moxie/file/Blob"], function (a, b, c) {
    function d() {
      var a,
          d = [];
      b.extend(this, {
        append: function append(e, f) {
          var g = this,
              h = b.typeOf(f);
          f instanceof c ? a = {
            name: e,
            value: f
          } : "array" === h ? (e += "[]", b.each(f, function (a) {
            g.append(e, a);
          })) : "object" === h ? b.each(f, function (a, b) {
            g.append(e + "[" + b + "]", a);
          }) : "null" === h || "undefined" === h || "number" === h && isNaN(f) ? g.append(e, "false") : d.push({
            name: e,
            value: f.toString()
          });
        },
        hasBlob: function hasBlob() {
          return !!this.getBlob();
        },
        getBlob: function getBlob() {
          return a && a.value || null;
        },
        getBlobName: function getBlobName() {
          return a && a.name || null;
        },
        each: function each(c) {
          b.each(d, function (a) {
            c(a.value, a.name);
          }), a && c(a.value, a.name);
        },
        destroy: function destroy() {
          a = null, d = [];
        }
      });
    }

    return d;
  }), d("moxie/xhr/XMLHttpRequest", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/core/EventTarget", "moxie/core/utils/Encode", "moxie/core/utils/Url", "moxie/runtime/Runtime", "moxie/runtime/RuntimeTarget", "moxie/file/Blob", "moxie/file/FileReaderSync", "moxie/xhr/FormData", "moxie/core/utils/Env", "moxie/core/utils/Mime"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    function m() {
      this.uid = a.guid("uid_");
    }

    function n() {
      function c(a, b) {
        return A.hasOwnProperty(a) ? 1 === arguments.length ? k.can("define_property") ? A[a] : z[a] : void (k.can("define_property") ? A[a] = b : z[a] = b) : void 0;
      }

      function i(b) {
        function d() {
          x && (x.destroy(), x = null), h.dispatchEvent("loadend"), h = null;
        }

        function e(e) {
          x.bind("LoadStart", function (a) {
            c("readyState", n.LOADING), h.dispatchEvent("readystatechange"), h.dispatchEvent(a), H && h.upload.dispatchEvent(a);
          }), x.bind("Progress", function (a) {
            c("readyState") !== n.LOADING && (c("readyState", n.LOADING), h.dispatchEvent("readystatechange")), h.dispatchEvent(a);
          }), x.bind("UploadProgress", function (a) {
            H && h.upload.dispatchEvent({
              type: "progress",
              lengthComputable: !1,
              total: a.total,
              loaded: a.loaded
            });
          }), x.bind("Load", function (b) {
            c("readyState", n.DONE), c("status", Number(e.exec.call(x, "XMLHttpRequest", "getStatus") || 0)), c("statusText", o[c("status")] || ""), c("response", e.exec.call(x, "XMLHttpRequest", "getResponse", c("responseType"))), ~a.inArray(c("responseType"), ["text", ""]) ? c("responseText", c("response")) : "document" === c("responseType") && c("responseXML", c("response")), O = e.exec.call(x, "XMLHttpRequest", "getAllResponseHeaders"), h.dispatchEvent("readystatechange"), c("status") > 0 ? (H && h.upload.dispatchEvent(b), h.dispatchEvent(b)) : (J = !0, h.dispatchEvent("error")), d();
          }), x.bind("Abort", function (a) {
            h.dispatchEvent(a), d();
          }), x.bind("Error", function (a) {
            J = !0, c("readyState", n.DONE), h.dispatchEvent("readystatechange"), I = !0, h.dispatchEvent(a), d();
          }), e.exec.call(x, "XMLHttpRequest", "send", {
            url: r,
            method: s,
            async: B,
            user: t,
            password: u,
            headers: C,
            mimeType: E,
            encoding: D,
            responseType: h.responseType,
            withCredentials: h.withCredentials,
            options: N
          }, b);
        }

        var h = this;
        v = new Date().getTime(), x = new g(), "string" == typeof N.required_caps && (N.required_caps = f.parseCaps(N.required_caps)), N.required_caps = a.extend({}, N.required_caps, {
          return_response_type: h.responseType
        }), b instanceof j && (N.required_caps.send_multipart = !0), K || (N.required_caps.do_cors = !0), N.ruid ? e(x.connectRuntime(N)) : (x.bind("RuntimeInit", function (a, b) {
          e(b);
        }), x.bind("RuntimeError", function (a, b) {
          h.dispatchEvent("RuntimeError", b);
        }), x.connectRuntime(N));
      }

      function q() {
        c("responseText", ""), c("responseXML", null), c("response", null), c("status", 0), c("statusText", ""), v = w = null;
      }

      var r,
          s,
          t,
          u,
          v,
          w,
          x,
          y,
          z = this,
          A = {
        timeout: 0,
        readyState: n.UNSENT,
        withCredentials: !1,
        status: 0,
        statusText: "",
        responseType: "",
        responseXML: null,
        responseText: null,
        response: null
      },
          B = !0,
          C = {},
          D = null,
          E = null,
          F = !1,
          G = !1,
          H = !1,
          I = !1,
          J = !1,
          K = !1,
          L = null,
          M = null,
          N = {},
          O = "";
      a.extend(this, A, {
        uid: a.guid("uid_"),
        upload: new m(),
        open: function open(f, g, h, i, j) {
          var k;
          if (!f || !g) throw new b.DOMException(b.DOMException.SYNTAX_ERR);
          if (/[\u0100-\uffff]/.test(f) || d.utf8_encode(f) !== f) throw new b.DOMException(b.DOMException.SYNTAX_ERR);
          if (~a.inArray(f.toUpperCase(), ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT", "TRACE", "TRACK"]) && (s = f.toUpperCase()), ~a.inArray(s, ["CONNECT", "TRACE", "TRACK"])) throw new b.DOMException(b.DOMException.SECURITY_ERR);
          if (g = d.utf8_encode(g), k = e.parseUrl(g), K = e.hasSameOrigin(k), r = e.resolveUrl(g), (i || j) && !K) throw new b.DOMException(b.DOMException.INVALID_ACCESS_ERR);
          if (t = i || k.user, u = j || k.pass, B = h || !0, B === !1 && (c("timeout") || c("withCredentials") || "" !== c("responseType"))) throw new b.DOMException(b.DOMException.INVALID_ACCESS_ERR);
          F = !B, G = !1, C = {}, q.call(this), c("readyState", n.OPENED), this.convertEventPropsToHandlers(["readystatechange"]), this.dispatchEvent("readystatechange");
        },
        setRequestHeader: function setRequestHeader(e, f) {
          var g = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "content-transfer-encoding", "date", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "user-agent", "via"];
          if (c("readyState") !== n.OPENED || G) throw new b.DOMException(b.DOMException.INVALID_STATE_ERR);
          if (/[\u0100-\uffff]/.test(e) || d.utf8_encode(e) !== e) throw new b.DOMException(b.DOMException.SYNTAX_ERR);
          return e = a.trim(e).toLowerCase(), ~a.inArray(e, g) || /^(proxy\-|sec\-)/.test(e) ? !1 : (C[e] ? C[e] += ", " + f : C[e] = f, !0);
        },
        getAllResponseHeaders: function getAllResponseHeaders() {
          return O || "";
        },
        getResponseHeader: function getResponseHeader(b) {
          return b = b.toLowerCase(), J || ~a.inArray(b, ["set-cookie", "set-cookie2"]) ? null : O && "" !== O && (y || (y = {}, a.each(O.split(/\r\n/), function (b) {
            var c = b.split(/:\s+/);
            2 === c.length && (c[0] = a.trim(c[0]), y[c[0].toLowerCase()] = {
              header: c[0],
              value: a.trim(c[1])
            });
          })), y.hasOwnProperty(b)) ? y[b].header + ": " + y[b].value : null;
        },
        overrideMimeType: function overrideMimeType(d) {
          var e, f;
          if (~a.inArray(c("readyState"), [n.LOADING, n.DONE])) throw new b.DOMException(b.DOMException.INVALID_STATE_ERR);
          if (d = a.trim(d.toLowerCase()), /;/.test(d) && (e = d.match(/^([^;]+)(?:;\scharset\=)?(.*)$/)) && (d = e[1], e[2] && (f = e[2])), !l.mimes[d]) throw new b.DOMException(b.DOMException.SYNTAX_ERR);
          L = d, M = f;
        },
        send: function send(c, e) {
          if (N = "string" === a.typeOf(e) ? {
            ruid: e
          } : e ? e : {}, this.convertEventPropsToHandlers(p), this.upload.convertEventPropsToHandlers(p), this.readyState !== n.OPENED || G) throw new b.DOMException(b.DOMException.INVALID_STATE_ERR);
          if (c instanceof h) N.ruid = c.ruid, E = c.type || "application/octet-stream";else if (c instanceof j) {
            if (c.hasBlob()) {
              var f = c.getBlob();
              N.ruid = f.ruid, E = f.type || "application/octet-stream";
            }
          } else "string" == typeof c && (D = "UTF-8", E = "text/plain;charset=UTF-8", c = d.utf8_encode(c));
          this.withCredentials || (this.withCredentials = N.required_caps && N.required_caps.send_browser_cookies && !K), H = !F && this.upload.hasEventListener(), J = !1, I = !c, F || (G = !0), i.call(this, c);
        },
        abort: function abort() {
          if (J = !0, F = !1, ~a.inArray(c("readyState"), [n.UNSENT, n.OPENED, n.DONE])) c("readyState", n.UNSENT);else {
            if (c("readyState", n.DONE), G = !1, !x) throw new b.DOMException(b.DOMException.INVALID_STATE_ERR);
            x.getRuntime().exec.call(x, "XMLHttpRequest", "abort", I), I = !0;
          }
        },
        destroy: function destroy() {
          x && ("function" === a.typeOf(x.destroy) && x.destroy(), x = null), this.unbindAll(), this.upload && (this.upload.unbindAll(), this.upload = null);
        }
      });
    }

    var o = {
      100: "Continue",
      101: "Switching Protocols",
      102: "Processing",
      200: "OK",
      201: "Created",
      202: "Accepted",
      203: "Non-Authoritative Information",
      204: "No Content",
      205: "Reset Content",
      206: "Partial Content",
      207: "Multi-Status",
      226: "IM Used",
      300: "Multiple Choices",
      301: "Moved Permanently",
      302: "Found",
      303: "See Other",
      304: "Not Modified",
      305: "Use Proxy",
      306: "Reserved",
      307: "Temporary Redirect",
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Timeout",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Request Entity Too Large",
      414: "Request-URI Too Long",
      415: "Unsupported Media Type",
      416: "Requested Range Not Satisfiable",
      417: "Expectation Failed",
      422: "Unprocessable Entity",
      423: "Locked",
      424: "Failed Dependency",
      426: "Upgrade Required",
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Timeout",
      505: "HTTP Version Not Supported",
      506: "Variant Also Negotiates",
      507: "Insufficient Storage",
      510: "Not Extended"
    };
    m.prototype = c.instance;
    var p = ["loadstart", "progress", "abort", "error", "load", "timeout", "loadend"];
    return n.UNSENT = 0, n.OPENED = 1, n.HEADERS_RECEIVED = 2, n.LOADING = 3, n.DONE = 4, n.prototype = c.instance, n;
  }), d("moxie/runtime/Transporter", ["moxie/core/utils/Basic", "moxie/core/utils/Encode", "moxie/runtime/RuntimeClient", "moxie/core/EventTarget"], function (a, b, c, d) {
    function e() {
      function d() {
        k = l = 0, j = this.result = null;
      }

      function f(b, c) {
        var d = this;
        i = c, d.bind("TransportingProgress", function (b) {
          l = b.loaded, k > l && -1 === a.inArray(d.state, [e.IDLE, e.DONE]) && g.call(d);
        }, 999), d.bind("TransportingComplete", function () {
          l = k, d.state = e.DONE, j = null, d.result = i.exec.call(d, "Transporter", "getAsBlob", b || "");
        }, 999), d.state = e.BUSY, d.trigger("TransportingStarted"), g.call(d);
      }

      function g() {
        var a,
            c = this,
            d = k - l;
        m > d && (m = d), a = b.btoa(j.substr(l, m)), i.exec.call(c, "Transporter", "receive", a, k);
      }

      var h, i, j, k, l, m;
      c.call(this), a.extend(this, {
        uid: a.guid("uid_"),
        state: e.IDLE,
        result: null,
        transport: function transport(b, c, e) {
          var g = this;
          if (e = a.extend({
            chunk_size: 204798
          }, e), (h = e.chunk_size % 3) && (e.chunk_size += 3 - h), m = e.chunk_size, d.call(this), j = b, k = b.length, "string" === a.typeOf(e) || e.ruid) f.call(g, c, this.connectRuntime(e));else {
            var i = function i(a, b) {
              g.unbind("RuntimeInit", i), f.call(g, c, b);
            };

            this.bind("RuntimeInit", i), this.connectRuntime(e);
          }
        },
        abort: function abort() {
          var a = this;
          a.state = e.IDLE, i && (i.exec.call(a, "Transporter", "clear"), a.trigger("TransportingAborted")), d.call(a);
        },
        destroy: function destroy() {
          this.unbindAll(), i = null, this.disconnectRuntime(), d.call(this);
        }
      });
    }

    return e.IDLE = 0, e.BUSY = 1, e.DONE = 2, e.prototype = d.instance, e;
  }), d("moxie/image/Image", ["moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/file/FileReaderSync", "moxie/xhr/XMLHttpRequest", "moxie/runtime/Runtime", "moxie/runtime/RuntimeClient", "moxie/runtime/Transporter", "moxie/core/utils/Env", "moxie/core/EventTarget", "moxie/file/Blob", "moxie/file/File", "moxie/core/utils/Encode"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    function n() {
      function d(a) {
        a || (a = this.getRuntime().exec.call(this, "Image", "getInfo")), this.size = a.size, this.width = a.width, this.height = a.height, this.type = a.type, this.meta = a.meta, "" === this.name && (this.name = a.name);
      }

      function j(b) {
        var d = a.typeOf(b);

        try {
          if (b instanceof n) {
            if (!b.size) throw new c.DOMException(c.DOMException.INVALID_STATE_ERR);
            p.apply(this, arguments);
          } else if (b instanceof k) {
            if (!~a.inArray(b.type, ["image/jpeg", "image/png"])) throw new c.ImageError(c.ImageError.WRONG_FORMAT);
            q.apply(this, arguments);
          } else if (-1 !== a.inArray(d, ["blob", "file"])) j.call(this, new l(null, b), arguments[1]);else if ("string" === d) /^data:[^;]*;base64,/.test(b) ? j.call(this, new k(null, {
            data: b
          }), arguments[1]) : r.apply(this, arguments);else {
            if ("node" !== d || "img" !== b.nodeName.toLowerCase()) throw new c.DOMException(c.DOMException.TYPE_MISMATCH_ERR);
            j.call(this, b.src, arguments[1]);
          }
        } catch (e) {
          this.trigger("error", e.code);
        }
      }

      function p(b, c) {
        var d = this.connectRuntime(b.ruid);
        this.ruid = d.uid, d.exec.call(this, "Image", "loadFromImage", b, "undefined" === a.typeOf(c) ? !0 : c);
      }

      function q(b, c) {
        function d(a) {
          e.ruid = a.uid, a.exec.call(e, "Image", "loadFromBlob", b);
        }

        var e = this;
        e.name = b.name || "", b.isDetached() ? (this.bind("RuntimeInit", function (a, b) {
          d(b);
        }), c && "string" == typeof c.required_caps && (c.required_caps = f.parseCaps(c.required_caps)), this.connectRuntime(a.extend({
          required_caps: {
            access_image_binary: !0,
            resize_image: !0
          }
        }, c))) : d(this.connectRuntime(b.ruid));
      }

      function r(a, b) {
        var c,
            d = this;
        c = new e(), c.open("get", a), c.responseType = "blob", c.onprogress = function (a) {
          d.trigger(a);
        }, c.onload = function () {
          q.call(d, c.response, !0);
        }, c.onerror = function (a) {
          d.trigger(a);
        }, c.onloadend = function () {
          c.destroy();
        }, c.bind("RuntimeError", function (a, b) {
          d.trigger("RuntimeError", b);
        }), c.send(null, b);
      }

      g.call(this), a.extend(this, {
        uid: a.guid("uid_"),
        ruid: null,
        name: "",
        size: 0,
        width: 0,
        height: 0,
        type: "",
        meta: {},
        clone: function clone() {
          this.load.apply(this, arguments);
        },
        load: function load() {
          this.bind("Load Resize", function () {
            d.call(this);
          }, 999), this.convertEventPropsToHandlers(o), j.apply(this, arguments);
        },
        downsize: function downsize(b) {
          var d = {
            width: this.width,
            height: this.height,
            crop: !1,
            preserveHeaders: !0
          };
          b = "object" == _typeof(b) ? a.extend(d, b) : a.extend(d, {
            width: arguments[0],
            height: arguments[1],
            crop: arguments[2],
            preserveHeaders: arguments[3]
          });

          try {
            if (!this.size) throw new c.DOMException(c.DOMException.INVALID_STATE_ERR);
            if (this.width > n.MAX_RESIZE_WIDTH || this.height > n.MAX_RESIZE_HEIGHT) throw new c.ImageError(c.ImageError.MAX_RESOLUTION_ERR);
            this.getRuntime().exec.call(this, "Image", "downsize", b.width, b.height, b.crop, b.preserveHeaders);
          } catch (e) {
            this.trigger("error", e.code);
          }
        },
        crop: function crop(a, b, c) {
          this.downsize(a, b, !0, c);
        },
        getAsCanvas: function getAsCanvas() {
          if (!i.can("create_canvas")) throw new c.RuntimeError(c.RuntimeError.NOT_SUPPORTED_ERR);
          var a = this.connectRuntime(this.ruid);
          return a.exec.call(this, "Image", "getAsCanvas");
        },
        getAsBlob: function getAsBlob(a, b) {
          if (!this.size) throw new c.DOMException(c.DOMException.INVALID_STATE_ERR);
          return a || (a = "image/jpeg"), "image/jpeg" !== a || b || (b = 90), this.getRuntime().exec.call(this, "Image", "getAsBlob", a, b);
        },
        getAsDataURL: function getAsDataURL(a, b) {
          if (!this.size) throw new c.DOMException(c.DOMException.INVALID_STATE_ERR);
          return this.getRuntime().exec.call(this, "Image", "getAsDataURL", a, b);
        },
        getAsBinaryString: function getAsBinaryString(a, b) {
          var c = this.getAsDataURL(a, b);
          return m.atob(c.substring(c.indexOf("base64,") + 7));
        },
        embed: function embed(d) {
          function e() {
            if (i.can("create_canvas")) {
              var b = f.getAsCanvas();
              if (b) return d.appendChild(b), b = null, f.destroy(), void o.trigger("embedded");
            }

            var e = f.getAsDataURL(g, j);
            if (!e) throw new c.ImageError(c.ImageError.WRONG_FORMAT);
            if (i.can("use_data_uri_of", e.length)) d.innerHTML = '<img src="' + e + '" width="' + f.width + '" height="' + f.height + '" />', f.destroy(), o.trigger("embedded");else {
              var k = new h();
              k.bind("TransportingComplete", function () {
                l = o.connectRuntime(this.result.ruid), o.bind("Embedded", function () {
                  a.extend(l.getShimContainer().style, {
                    top: "0px",
                    left: "0px",
                    width: f.width + "px",
                    height: f.height + "px"
                  }), l = null;
                }, 999), l.exec.call(o, "ImageView", "display", this.result.uid, q, r), f.destroy();
              }), k.transport(m.atob(e.substring(e.indexOf("base64,") + 7)), g, a.extend({}, p, {
                required_caps: {
                  display_media: !0
                },
                runtime_order: "flash,silverlight",
                container: d
              }));
            }
          }

          var f,
              g,
              j,
              k,
              l,
              o = this,
              p = arguments[1] || {},
              q = this.width,
              r = this.height;

          try {
            if (!(d = b.get(d))) throw new c.DOMException(c.DOMException.INVALID_NODE_TYPE_ERR);
            if (!this.size) throw new c.DOMException(c.DOMException.INVALID_STATE_ERR);
            if (this.width > n.MAX_RESIZE_WIDTH || this.height > n.MAX_RESIZE_HEIGHT) throw new c.ImageError(c.ImageError.MAX_RESOLUTION_ERR);
            if (g = p.type || this.type || "image/jpeg", j = p.quality || 90, k = "undefined" !== a.typeOf(p.crop) ? p.crop : !1, p.width) q = p.width, r = p.height || q;else {
              var s = b.getSize(d);
              s.w && s.h && (q = s.w, r = s.h);
            }
            return f = new n(), f.bind("Resize", function () {
              e.call(o);
            }), f.bind("Load", function () {
              f.downsize(q, r, k, !1);
            }), f.clone(this, !1), f;
          } catch (t) {
            this.trigger("error", t.code);
          }
        },
        destroy: function destroy() {
          this.ruid && (this.getRuntime().exec.call(this, "Image", "destroy"), this.disconnectRuntime()), this.unbindAll();
        }
      });
    }

    var o = ["progress", "load", "error", "resize", "embedded"];
    return n.MAX_RESIZE_WIDTH = 6500, n.MAX_RESIZE_HEIGHT = 6500, n.prototype = j.instance, n;
  }), d("moxie/runtime/html4/Runtime", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/runtime/Runtime", "moxie/core/utils/Env"], function (a, b, c, d) {
    function e(b) {
      var e = this,
          h = c.capTest,
          i = c.capTrue;
      c.call(this, b, f, {
        access_binary: h(window.FileReader || window.File && File.getAsDataURL),
        access_image_binary: !1,
        display_media: h(g.Image && (d.can("create_canvas") || d.can("use_data_uri_over32kb"))),
        do_cors: !1,
        drag_and_drop: !1,
        filter_by_extension: h(function () {
          return "Chrome" === d.browser && d.version >= 28 || "IE" === d.browser && d.version >= 10;
        }()),
        resize_image: function resize_image() {
          return g.Image && e.can("access_binary") && d.can("create_canvas");
        },
        report_upload_progress: !1,
        return_response_headers: !1,
        return_response_type: function return_response_type(b) {
          return "json" === b && window.JSON ? !0 : !!~a.inArray(b, ["text", "document", ""]);
        },
        return_status_code: function return_status_code(b) {
          return !a.arrayDiff(b, [200, 404]);
        },
        select_file: function select_file() {
          return d.can("use_fileinput");
        },
        select_multiple: !1,
        send_binary_string: !1,
        send_custom_headers: !1,
        send_multipart: !0,
        slice_blob: !1,
        stream_upload: function stream_upload() {
          return e.can("select_file");
        },
        summon_file_dialog: h(function () {
          return "Firefox" === d.browser && d.version >= 4 || "Opera" === d.browser && d.version >= 12 || !!~a.inArray(d.browser, ["Chrome", "Safari"]);
        }()),
        upload_filesize: i,
        use_http_method: function use_http_method(b) {
          return !a.arrayDiff(b, ["GET", "POST"]);
        }
      }), a.extend(this, {
        init: function init() {
          this.trigger("Init");
        },
        destroy: function (a) {
          return function () {
            a.call(e), a = e = null;
          };
        }(this.destroy)
      }), a.extend(this.getShim(), g);
    }

    var f = "html4",
        g = {};
    return c.addConstructor(f, e), g;
  }), d("moxie/core/utils/Events", ["moxie/core/utils/Basic"], function (a) {
    function b() {
      this.returnValue = !1;
    }

    function c() {
      this.cancelBubble = !0;
    }

    var d = {},
        e = "moxie_" + a.guid(),
        f = function f(_f, g, h, i) {
      var j, k;
      g = g.toLowerCase(), _f.addEventListener ? (j = h, _f.addEventListener(g, j, !1)) : _f.attachEvent && (j = function j() {
        var a = window.event;
        a.target || (a.target = a.srcElement), a.preventDefault = b, a.stopPropagation = c, h(a);
      }, _f.attachEvent("on" + g, j)), _f[e] || (_f[e] = a.guid()), d.hasOwnProperty(_f[e]) || (d[_f[e]] = {}), k = d[_f[e]], k.hasOwnProperty(g) || (k[g] = []), k[g].push({
        func: j,
        orig: h,
        key: i
      });
    },
        g = function g(b, c, f) {
      var g, h;

      if (c = c.toLowerCase(), b[e] && d[b[e]] && d[b[e]][c]) {
        g = d[b[e]][c];

        for (var i = g.length - 1; i >= 0 && (g[i].orig !== f && g[i].key !== f || (b.removeEventListener ? b.removeEventListener(c, g[i].func, !1) : b.detachEvent && b.detachEvent("on" + c, g[i].func), g[i].orig = null, g[i].func = null, g.splice(i, 1), f === h)); i--) {
          ;
        }

        if (g.length || delete d[b[e]][c], a.isEmptyObj(d[b[e]])) {
          delete d[b[e]];

          try {
            delete b[e];
          } catch (j) {
            b[e] = h;
          }
        }
      }
    },
        h = function h(b, c) {
      b && b[e] && a.each(d[b[e]], function (a, d) {
        g(b, d, c);
      });
    };

    return {
      addEvent: f,
      removeEvent: g,
      removeAllEvents: h
    };
  }), d("moxie/runtime/html4/file/FileInput", ["moxie/runtime/html4/Runtime", "moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/utils/Events", "moxie/core/utils/Mime", "moxie/core/utils/Env"], function (a, b, c, d, e, f) {
    function g() {
      function a() {
        var e,
            k,
            l,
            m,
            n,
            o,
            p = this,
            q = p.getRuntime();
        o = b.guid("uid_"), e = q.getShimContainer(), g && (l = c.get(g + "_form"), l && b.extend(l.style, {
          top: "100%"
        })), m = document.createElement("form"), m.setAttribute("id", o + "_form"), m.setAttribute("method", "post"), m.setAttribute("enctype", "multipart/form-data"), m.setAttribute("encoding", "multipart/form-data"), b.extend(m.style, {
          overflow: "hidden",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }), n = document.createElement("input"), n.setAttribute("id", o), n.setAttribute("type", "file"), n.setAttribute("name", h.name || "Filedata"), n.setAttribute("accept", j.join(",")), b.extend(n.style, {
          fontSize: "999px",
          opacity: 0
        }), m.appendChild(n), e.appendChild(m), b.extend(n.style, {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }), "IE" === f.browser && f.version < 10 && b.extend(n.style, {
          filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=0)"
        }), n.onchange = function () {
          var b;
          this.value && (b = this.files ? this.files[0] : {
            name: this.value
          }, i = [b], this.onchange = function () {}, a.call(p), p.bind("change", function d() {
            var a,
                b = c.get(o),
                e = c.get(o + "_form");
            p.unbind("change", d), p.files.length && b && e && (a = p.files[0], b.setAttribute("id", a.uid), e.setAttribute("id", a.uid + "_form"), e.setAttribute("target", a.uid + "_iframe")), b = e = null;
          }, 998), n = m = null, p.trigger("change"));
        }, q.can("summon_file_dialog") && (k = c.get(h.browse_button), d.removeEvent(k, "click", p.uid), d.addEvent(k, "click", function (a) {
          n && !n.disabled && n.click(), a.preventDefault();
        }, p.uid)), g = o, e = l = k = null;
      }

      var g,
          h,
          i = [],
          j = [];
      b.extend(this, {
        init: function init(b) {
          var f,
              g = this,
              i = g.getRuntime();
          h = b, j = b.accept.mimes || e.extList2mimes(b.accept, i.can("filter_by_extension")), f = i.getShimContainer(), function () {
            var a, e, h;
            a = c.get(b.browse_button), i.can("summon_file_dialog") && ("static" === c.getStyle(a, "position") && (a.style.position = "relative"), e = parseInt(c.getStyle(a, "z-index"), 10) || 1, a.style.zIndex = e, f.style.zIndex = e - 1), h = i.can("summon_file_dialog") ? a : f, d.addEvent(h, "mouseover", function () {
              g.trigger("mouseenter");
            }, g.uid), d.addEvent(h, "mouseout", function () {
              g.trigger("mouseleave");
            }, g.uid), d.addEvent(h, "mousedown", function () {
              g.trigger("mousedown");
            }, g.uid), d.addEvent(c.get(b.container), "mouseup", function () {
              g.trigger("mouseup");
            }, g.uid), a = null;
          }(), a.call(this), f = null, g.trigger({
            type: "ready",
            async: !0
          });
        },
        getFiles: function getFiles() {
          return i;
        },
        disable: function disable(a) {
          var b;
          (b = c.get(g)) && (b.disabled = !!a);
        },
        destroy: function destroy() {
          var a = this.getRuntime(),
              b = a.getShim(),
              e = a.getShimContainer();
          d.removeAllEvents(e, this.uid), d.removeAllEvents(h && c.get(h.container), this.uid), d.removeAllEvents(h && c.get(h.browse_button), this.uid), e && (e.innerHTML = ""), b.removeInstance(this.uid), g = i = j = h = e = b = null;
        }
      });
    }

    return a.FileInput = g;
  }), d("moxie/runtime/html5/Runtime", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/runtime/Runtime", "moxie/core/utils/Env"], function (a, b, c, d) {
    function e(b) {
      var e = this,
          h = c.capTest,
          i = c.capTrue,
          j = a.extend({
        access_binary: h(window.FileReader || window.File && window.File.getAsDataURL),
        access_image_binary: function access_image_binary() {
          return e.can("access_binary") && !!g.Image;
        },
        display_media: h(d.can("create_canvas") || d.can("use_data_uri_over32kb")),
        do_cors: h(window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest()),
        drag_and_drop: h(function () {
          var a = document.createElement("div");
          return ("draggable" in a || "ondragstart" in a && "ondrop" in a) && ("IE" !== d.browser || d.version > 9);
        }()),
        filter_by_extension: h(function () {
          return "Chrome" === d.browser && d.version >= 28 || "IE" === d.browser && d.version >= 10;
        }()),
        return_response_headers: i,
        return_response_type: function return_response_type(a) {
          return "json" === a && window.JSON ? !0 : d.can("return_response_type", a);
        },
        return_status_code: i,
        report_upload_progress: h(window.XMLHttpRequest && new XMLHttpRequest().upload),
        resize_image: function resize_image() {
          return e.can("access_binary") && d.can("create_canvas");
        },
        select_file: function select_file() {
          return d.can("use_fileinput") && window.File;
        },
        select_folder: function select_folder() {
          return e.can("select_file") && "Chrome" === d.browser && d.version >= 21;
        },
        select_multiple: function select_multiple() {
          return !(!e.can("select_file") || "Safari" === d.browser && "Windows" === d.os || "iOS" === d.os && d.verComp(d.osVersion, "7.0.4", "<"));
        },
        send_binary_string: h(window.XMLHttpRequest && (new XMLHttpRequest().sendAsBinary || window.Uint8Array && window.ArrayBuffer)),
        send_custom_headers: h(window.XMLHttpRequest),
        send_multipart: function send_multipart() {
          return !!(window.XMLHttpRequest && new XMLHttpRequest().upload && window.FormData) || e.can("send_binary_string");
        },
        slice_blob: h(window.File && (File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice)),
        stream_upload: function stream_upload() {
          return e.can("slice_blob") && e.can("send_multipart");
        },
        summon_file_dialog: h(function () {
          return "Firefox" === d.browser && d.version >= 4 || "Opera" === d.browser && d.version >= 12 || "IE" === d.browser && d.version >= 10 || !!~a.inArray(d.browser, ["Chrome", "Safari"]);
        }()),
        upload_filesize: i
      }, arguments[2]);
      c.call(this, b, arguments[1] || f, j), a.extend(this, {
        init: function init() {
          this.trigger("Init");
        },
        destroy: function (a) {
          return function () {
            a.call(e), a = e = null;
          };
        }(this.destroy)
      }), a.extend(this.getShim(), g);
    }

    var f = "html5",
        g = {};
    return c.addConstructor(f, e), g;
  }), d("moxie/runtime/html5/file/FileReader", ["moxie/runtime/html5/Runtime", "moxie/core/utils/Encode", "moxie/core/utils/Basic"], function (a, b, c) {
    function d() {
      function a(a) {
        return b.atob(a.substring(a.indexOf("base64,") + 7));
      }

      var d,
          e = !1;
      c.extend(this, {
        read: function read(a, b) {
          var f = this;
          d = new window.FileReader(), d.addEventListener("progress", function (a) {
            f.trigger(a);
          }), d.addEventListener("load", function (a) {
            f.trigger(a);
          }), d.addEventListener("error", function (a) {
            f.trigger(a, d.error);
          }), d.addEventListener("loadend", function () {
            d = null;
          }), "function" === c.typeOf(d[a]) ? (e = !1, d[a](b.getSource())) : "readAsBinaryString" === a && (e = !0, d.readAsDataURL(b.getSource()));
        },
        getResult: function getResult() {
          return d && d.result ? e ? a(d.result) : d.result : null;
        },
        abort: function abort() {
          d && d.abort();
        },
        destroy: function destroy() {
          d = null;
        }
      });
    }

    return a.FileReader = d;
  }), d("moxie/runtime/html4/file/FileReader", ["moxie/runtime/html4/Runtime", "moxie/runtime/html5/file/FileReader"], function (a, b) {
    return a.FileReader = b;
  }), d("moxie/runtime/html4/xhr/XMLHttpRequest", ["moxie/runtime/html4/Runtime", "moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/utils/Url", "moxie/core/Exceptions", "moxie/core/utils/Events", "moxie/file/Blob", "moxie/xhr/FormData"], function (a, b, c, d, e, f, g, h) {
    function i() {
      function a(a) {
        var b,
            d,
            e,
            g,
            h = this,
            i = !1;

        if (k) {
          if (b = k.id.replace(/_iframe$/, ""), d = c.get(b + "_form")) {
            for (e = d.getElementsByTagName("input"), g = e.length; g--;) {
              switch (e[g].getAttribute("type")) {
                case "hidden":
                  e[g].parentNode.removeChild(e[g]);
                  break;

                case "file":
                  i = !0;
              }
            }

            e = [], i || d.parentNode.removeChild(d), d = null;
          }

          setTimeout(function () {
            f.removeEvent(k, "load", h.uid), k.parentNode && k.parentNode.removeChild(k);
            var b = h.getRuntime().getShimContainer();
            b.children.length || b.parentNode.removeChild(b), b = k = null, a();
          }, 1);
        }
      }

      var i, j, k;
      b.extend(this, {
        send: function send(l, m) {
          function n() {
            var c = t.getShimContainer() || document.body,
                e = document.createElement("div");
            e.innerHTML = '<iframe id="' + o + '_iframe" name="' + o + '_iframe" src="javascript:&quot;&quot;" style="display:none"></iframe>', k = e.firstChild, c.appendChild(k), f.addEvent(k, "load", function () {
              var c;

              try {
                c = k.contentWindow.document || k.contentDocument || window.frames[k.id].document, /^4(0[0-9]|1[0-7]|2[2346])\s/.test(c.title) ? i = c.title.replace(/^(\d+).*$/, "$1") : (i = 200, j = b.trim(c.body.innerHTML), s.trigger({
                  type: "progress",
                  loaded: j.length,
                  total: j.length
                }), r && s.trigger({
                  type: "uploadprogress",
                  loaded: r.size || 1025,
                  total: r.size || 1025
                }));
              } catch (e) {
                if (!d.hasSameOrigin(l.url)) return void a.call(s, function () {
                  s.trigger("error");
                });
                i = 404;
              }

              a.call(s, function () {
                s.trigger("load");
              });
            }, s.uid);
          }

          var o,
              p,
              q,
              r,
              s = this,
              t = s.getRuntime();

          if (i = j = null, m instanceof h && m.hasBlob()) {
            if (r = m.getBlob(), o = r.uid, q = c.get(o), p = c.get(o + "_form"), !p) throw new e.DOMException(e.DOMException.NOT_FOUND_ERR);
          } else o = b.guid("uid_"), p = document.createElement("form"), p.setAttribute("id", o + "_form"), p.setAttribute("method", l.method), p.setAttribute("enctype", "multipart/form-data"), p.setAttribute("encoding", "multipart/form-data"), p.setAttribute("target", o + "_iframe"), t.getShimContainer().appendChild(p);

          m instanceof h && m.each(function (a, c) {
            if (a instanceof g) q && q.setAttribute("name", c);else {
              var d = document.createElement("input");
              b.extend(d, {
                type: "hidden",
                name: c,
                value: a
              }), q ? p.insertBefore(d, q) : p.appendChild(d);
            }
          }), p.setAttribute("action", l.url), n(), p.submit(), s.trigger("loadstart");
        },
        getStatus: function getStatus() {
          return i;
        },
        getResponse: function getResponse(a) {
          if ("json" === a && "string" === b.typeOf(j) && window.JSON) try {
            return JSON.parse(j.replace(/^\s*<pre[^>]*>/, "").replace(/<\/pre>\s*$/, ""));
          } catch (c) {
            return null;
          }
          return j;
        },
        abort: function abort() {
          var b = this;
          k && k.contentWindow && (k.contentWindow.stop ? k.contentWindow.stop() : k.contentWindow.document.execCommand ? k.contentWindow.document.execCommand("Stop") : k.src = "about:blank"), a.call(this, function () {
            b.dispatchEvent("abort");
          });
        }
      });
    }

    return a.XMLHttpRequest = i;
  }), d("moxie/runtime/html5/utils/BinaryReader", [], function () {
    return function () {
      function a(a, b) {
        var c,
            d = f ? 0 : -8 * (b - 1),
            g = 0;

        for (c = 0; b > c; c++) {
          g |= e.charCodeAt(a + c) << Math.abs(d + 8 * c);
        }

        return g;
      }

      function c(a, b, c) {
        c = 3 === arguments.length ? c : e.length - b - 1, e = e.substr(0, b) + a + e.substr(c + b);
      }

      function d(a, b, d) {
        var e,
            g = "",
            h = f ? 0 : -8 * (d - 1);

        for (e = 0; d > e; e++) {
          g += String.fromCharCode(b >> Math.abs(h + 8 * e) & 255);
        }

        c(g, a, d);
      }

      var e,
          f = !1;
      return {
        II: function II(a) {
          return a === b ? f : void (f = a);
        },
        init: function init(a) {
          f = !1, e = a;
        },
        SEGMENT: function SEGMENT(a, b, d) {
          switch (arguments.length) {
            case 1:
              return e.substr(a, e.length - a - 1);

            case 2:
              return e.substr(a, b);

            case 3:
              c(d, a, b);
              break;

            default:
              return e;
          }
        },
        BYTE: function BYTE(b) {
          return a(b, 1);
        },
        SHORT: function SHORT(b) {
          return a(b, 2);
        },
        LONG: function LONG(c, e) {
          return e === b ? a(c, 4) : void d(c, e, 4);
        },
        SLONG: function SLONG(b) {
          var c = a(b, 4);
          return c > 2147483647 ? c - 4294967296 : c;
        },
        STRING: function STRING(b, c) {
          var d = "";

          for (c += b; c > b; b++) {
            d += String.fromCharCode(a(b, 1));
          }

          return d;
        }
      };
    };
  }), d("moxie/runtime/html5/image/JPEGHeaders", ["moxie/runtime/html5/utils/BinaryReader"], function (a) {
    return function b(c) {
      var d,
          e,
          f,
          g = [],
          h = 0;

      if (d = new a(), d.init(c), 65496 === d.SHORT(0)) {
        for (e = 2; e <= c.length;) {
          if (f = d.SHORT(e), f >= 65488 && 65495 >= f) e += 2;else {
            if (65498 === f || 65497 === f) break;
            h = d.SHORT(e + 2) + 2, f >= 65505 && 65519 >= f && g.push({
              hex: f,
              name: "APP" + (15 & f),
              start: e,
              length: h,
              segment: d.SEGMENT(e, h)
            }), e += h;
          }
        }

        return d.init(null), {
          headers: g,
          restore: function restore(a) {
            var b, c;

            for (d.init(a), e = 65504 == d.SHORT(2) ? 4 + d.SHORT(4) : 2, c = 0, b = g.length; b > c; c++) {
              d.SEGMENT(e, 0, g[c].segment), e += g[c].length;
            }

            return a = d.SEGMENT(), d.init(null), a;
          },
          strip: function strip(a) {
            var c, e, f;

            for (e = new b(a), c = e.headers, e.purge(), d.init(a), f = c.length; f--;) {
              d.SEGMENT(c[f].start, c[f].length, "");
            }

            return a = d.SEGMENT(), d.init(null), a;
          },
          get: function get(a) {
            for (var b = [], c = 0, d = g.length; d > c; c++) {
              g[c].name === a.toUpperCase() && b.push(g[c].segment);
            }

            return b;
          },
          set: function set(a, b) {
            var c,
                d,
                e,
                f = [];

            for ("string" == typeof b ? f.push(b) : f = b, c = d = 0, e = g.length; e > c && (g[c].name === a.toUpperCase() && (g[c].segment = f[d], g[c].length = f[d].length, d++), !(d >= f.length)); c++) {
              ;
            }
          },
          purge: function purge() {
            g = [], d.init(null), d = null;
          }
        };
      }
    };
  }), d("moxie/runtime/html5/image/ExifParser", ["moxie/core/utils/Basic", "moxie/runtime/html5/utils/BinaryReader"], function (a, c) {
    return function () {
      function d(a, c) {
        var d,
            e,
            f,
            h,
            i,
            l,
            m,
            n,
            o = g.SHORT(a),
            p = [],
            q = {};

        for (d = 0; o > d; d++) {
          if (m = l = a + 12 * d + 2, f = c[g.SHORT(m)], f !== b) {
            switch (h = g.SHORT(m += 2), i = g.LONG(m += 2), m += 4, p = [], h) {
              case 1:
              case 7:
                for (i > 4 && (m = g.LONG(m) + k.tiffHeader), e = 0; i > e; e++) {
                  p[e] = g.BYTE(m + e);
                }

                break;

              case 2:
                i > 4 && (m = g.LONG(m) + k.tiffHeader), q[f] = g.STRING(m, i - 1);
                continue;

              case 3:
                for (i > 2 && (m = g.LONG(m) + k.tiffHeader), e = 0; i > e; e++) {
                  p[e] = g.SHORT(m + 2 * e);
                }

                break;

              case 4:
                for (i > 1 && (m = g.LONG(m) + k.tiffHeader), e = 0; i > e; e++) {
                  p[e] = g.LONG(m + 4 * e);
                }

                break;

              case 5:
                for (m = g.LONG(m) + k.tiffHeader, e = 0; i > e; e++) {
                  p[e] = g.LONG(m + 4 * e) / g.LONG(m + 4 * e + 4);
                }

                break;

              case 9:
                for (m = g.LONG(m) + k.tiffHeader, e = 0; i > e; e++) {
                  p[e] = g.SLONG(m + 4 * e);
                }

                break;

              case 10:
                for (m = g.LONG(m) + k.tiffHeader, e = 0; i > e; e++) {
                  p[e] = g.SLONG(m + 4 * e) / g.SLONG(m + 4 * e + 4);
                }

                break;

              default:
                continue;
            }

            n = 1 == i ? p[0] : p, q[f] = j.hasOwnProperty(f) && "object" != _typeof(n) ? j[f][n] : n;
          }
        }

        return q;
      }

      function e() {
        var a = k.tiffHeader;
        return g.II(18761 == g.SHORT(a)), 42 !== g.SHORT(a += 2) ? !1 : (k.IFD0 = k.tiffHeader + g.LONG(a += 2), i = d(k.IFD0, h.tiff), "ExifIFDPointer" in i && (k.exifIFD = k.tiffHeader + i.ExifIFDPointer, delete i.ExifIFDPointer), "GPSInfoIFDPointer" in i && (k.gpsIFD = k.tiffHeader + i.GPSInfoIFDPointer, delete i.GPSInfoIFDPointer), !0);
      }

      function f(a, b, c) {
        var d,
            e,
            f,
            i = 0;

        if ("string" == typeof b) {
          var j = h[a.toLowerCase()];

          for (var l in j) {
            if (j[l] === b) {
              b = l;
              break;
            }
          }
        }

        d = k[a.toLowerCase() + "IFD"], e = g.SHORT(d);

        for (var m = 0; e > m; m++) {
          if (f = d + 12 * m + 2, g.SHORT(f) == b) {
            i = f + 8;
            break;
          }
        }

        return i ? (g.LONG(i, c), !0) : !1;
      }

      var g,
          h,
          i,
          j,
          k = {};
      return g = new c(), h = {
        tiff: {
          274: "Orientation",
          270: "ImageDescription",
          271: "Make",
          272: "Model",
          305: "Software",
          34665: "ExifIFDPointer",
          34853: "GPSInfoIFDPointer"
        },
        exif: {
          36864: "ExifVersion",
          40961: "ColorSpace",
          40962: "PixelXDimension",
          40963: "PixelYDimension",
          36867: "DateTimeOriginal",
          33434: "ExposureTime",
          33437: "FNumber",
          34855: "ISOSpeedRatings",
          37377: "ShutterSpeedValue",
          37378: "ApertureValue",
          37383: "MeteringMode",
          37384: "LightSource",
          37385: "Flash",
          37386: "FocalLength",
          41986: "ExposureMode",
          41987: "WhiteBalance",
          41990: "SceneCaptureType",
          41988: "DigitalZoomRatio",
          41992: "Contrast",
          41993: "Saturation",
          41994: "Sharpness"
        },
        gps: {
          0: "GPSVersionID",
          1: "GPSLatitudeRef",
          2: "GPSLatitude",
          3: "GPSLongitudeRef",
          4: "GPSLongitude"
        }
      }, j = {
        ColorSpace: {
          1: "sRGB",
          0: "Uncalibrated"
        },
        MeteringMode: {
          0: "Unknown",
          1: "Average",
          2: "CenterWeightedAverage",
          3: "Spot",
          4: "MultiSpot",
          5: "Pattern",
          6: "Partial",
          255: "Other"
        },
        LightSource: {
          1: "Daylight",
          2: "Fliorescent",
          3: "Tungsten",
          4: "Flash",
          9: "Fine weather",
          10: "Cloudy weather",
          11: "Shade",
          12: "Daylight fluorescent (D 5700 - 7100K)",
          13: "Day white fluorescent (N 4600 -5400K)",
          14: "Cool white fluorescent (W 3900 - 4500K)",
          15: "White fluorescent (WW 3200 - 3700K)",
          17: "Standard light A",
          18: "Standard light B",
          19: "Standard light C",
          20: "D55",
          21: "D65",
          22: "D75",
          23: "D50",
          24: "ISO studio tungsten",
          255: "Other"
        },
        Flash: {
          0: "Flash did not fire.",
          1: "Flash fired.",
          5: "Strobe return light not detected.",
          7: "Strobe return light detected.",
          9: "Flash fired, compulsory flash mode",
          13: "Flash fired, compulsory flash mode, return light not detected",
          15: "Flash fired, compulsory flash mode, return light detected",
          16: "Flash did not fire, compulsory flash mode",
          24: "Flash did not fire, auto mode",
          25: "Flash fired, auto mode",
          29: "Flash fired, auto mode, return light not detected",
          31: "Flash fired, auto mode, return light detected",
          32: "No flash function",
          65: "Flash fired, red-eye reduction mode",
          69: "Flash fired, red-eye reduction mode, return light not detected",
          71: "Flash fired, red-eye reduction mode, return light detected",
          73: "Flash fired, compulsory flash mode, red-eye reduction mode",
          77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
          79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
          89: "Flash fired, auto mode, red-eye reduction mode",
          93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
          95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        ExposureMode: {
          0: "Auto exposure",
          1: "Manual exposure",
          2: "Auto bracket"
        },
        WhiteBalance: {
          0: "Auto white balance",
          1: "Manual white balance"
        },
        SceneCaptureType: {
          0: "Standard",
          1: "Landscape",
          2: "Portrait",
          3: "Night scene"
        },
        Contrast: {
          0: "Normal",
          1: "Soft",
          2: "Hard"
        },
        Saturation: {
          0: "Normal",
          1: "Low saturation",
          2: "High saturation"
        },
        Sharpness: {
          0: "Normal",
          1: "Soft",
          2: "Hard"
        },
        GPSLatitudeRef: {
          N: "North latitude",
          S: "South latitude"
        },
        GPSLongitudeRef: {
          E: "East longitude",
          W: "West longitude"
        }
      }, {
        init: function init(a) {
          return k = {
            tiffHeader: 10
          }, a !== b && a.length ? (g.init(a), 65505 === g.SHORT(0) && "EXIF\x00" === g.STRING(4, 5).toUpperCase() ? e() : !1) : !1;
        },
        TIFF: function TIFF() {
          return i;
        },
        EXIF: function EXIF() {
          var b;

          if (b = d(k.exifIFD, h.exif), b.ExifVersion && "array" === a.typeOf(b.ExifVersion)) {
            for (var c = 0, e = ""; c < b.ExifVersion.length; c++) {
              e += String.fromCharCode(b.ExifVersion[c]);
            }

            b.ExifVersion = e;
          }

          return b;
        },
        GPS: function GPS() {
          var b;
          return b = d(k.gpsIFD, h.gps), b.GPSVersionID && "array" === a.typeOf(b.GPSVersionID) && (b.GPSVersionID = b.GPSVersionID.join(".")), b;
        },
        setExif: function setExif(a, b) {
          return "PixelXDimension" !== a && "PixelYDimension" !== a ? !1 : f("exif", a, b);
        },
        getBinary: function getBinary() {
          return g.SEGMENT();
        },
        purge: function purge() {
          g.init(null), g = i = null, k = {};
        }
      };
    };
  }), d("moxie/runtime/html5/image/JPEG", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/runtime/html5/image/JPEGHeaders", "moxie/runtime/html5/utils/BinaryReader", "moxie/runtime/html5/image/ExifParser"], function (a, b, c, d, e) {
    function f(f) {
      function g() {
        for (var a, b, c = 0; c <= i.length;) {
          if (a = j.SHORT(c += 2), a >= 65472 && 65475 >= a) return c += 5, {
            height: j.SHORT(c),
            width: j.SHORT(c += 2)
          };
          b = j.SHORT(c += 2), c += b - 2;
        }

        return null;
      }

      function h() {
        l && k && j && (l.purge(), k.purge(), j.init(null), i = m = k = l = j = null);
      }

      var i, j, k, l, m, n;
      if (i = f, j = new d(), j.init(i), 65496 !== j.SHORT(0)) throw new b.ImageError(b.ImageError.WRONG_FORMAT);
      k = new c(f), l = new e(), n = !!l.init(k.get("app1")[0]), m = g.call(this), a.extend(this, {
        type: "image/jpeg",
        size: i.length,
        width: m && m.width || 0,
        height: m && m.height || 0,
        setExif: function setExif(b, c) {
          return n ? ("object" === a.typeOf(b) ? a.each(b, function (a, b) {
            l.setExif(b, a);
          }) : l.setExif(b, c), void k.set("app1", l.getBinary())) : !1;
        },
        writeHeaders: function writeHeaders() {
          return arguments.length ? k.restore(arguments[0]) : i = k.restore(i);
        },
        stripHeaders: function stripHeaders(a) {
          return k.strip(a);
        },
        purge: function purge() {
          h.call(this);
        }
      }), n && (this.meta = {
        tiff: l.TIFF(),
        exif: l.EXIF(),
        gps: l.GPS()
      });
    }

    return f;
  }), d("moxie/runtime/html5/image/PNG", ["moxie/core/Exceptions", "moxie/core/utils/Basic", "moxie/runtime/html5/utils/BinaryReader"], function (a, b, c) {
    function d(d) {
      function e() {
        var a, b;
        return a = g.call(this, 8), "IHDR" == a.type ? (b = a.start, {
          width: i.LONG(b),
          height: i.LONG(b += 4)
        }) : null;
      }

      function f() {
        i && (i.init(null), h = l = j = k = i = null);
      }

      function g(a) {
        var b, c, d, e;
        return b = i.LONG(a), c = i.STRING(a += 4, 4), d = a += 4, e = i.LONG(a + b), {
          length: b,
          type: c,
          start: d,
          CRC: e
        };
      }

      var h, i, j, k, l;
      h = d, i = new c(), i.init(h), function () {
        var b = 0,
            c = 0,
            d = [35152, 20039, 3338, 6666];

        for (c = 0; c < d.length; c++, b += 2) {
          if (d[c] != i.SHORT(b)) throw new a.ImageError(a.ImageError.WRONG_FORMAT);
        }
      }(), l = e.call(this), b.extend(this, {
        type: "image/png",
        size: h.length,
        width: l.width,
        height: l.height,
        purge: function purge() {
          f.call(this);
        }
      }), f.call(this);
    }

    return d;
  }), d("moxie/runtime/html5/image/ImageInfo", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/runtime/html5/image/JPEG", "moxie/runtime/html5/image/PNG"], function (a, b, c, d) {
    return function (e) {
      var f,
          g = [c, d];
      f = function () {
        for (var a = 0; a < g.length; a++) {
          try {
            return new g[a](e);
          } catch (c) {}
        }

        throw new b.ImageError(b.ImageError.WRONG_FORMAT);
      }(), a.extend(this, {
        type: "",
        size: 0,
        width: 0,
        height: 0,
        setExif: function setExif() {},
        writeHeaders: function writeHeaders(a) {
          return a;
        },
        stripHeaders: function stripHeaders(a) {
          return a;
        },
        purge: function purge() {}
      }), a.extend(this, f), this.purge = function () {
        f.purge(), f = null;
      };
    };
  }), d("moxie/runtime/html5/image/MegaPixel", [], function () {
    function a(a, d, e) {
      var f = a.naturalWidth,
          g = a.naturalHeight,
          h = e.width,
          i = e.height,
          j = e.x || 0,
          k = e.y || 0,
          l = d.getContext("2d");
      b(a) && (f /= 2, g /= 2);
      var m = 1024,
          n = document.createElement("canvas");
      n.width = n.height = m;

      for (var o = n.getContext("2d"), p = c(a, f, g), q = 0; g > q;) {
        for (var r = q + m > g ? g - q : m, s = 0; f > s;) {
          var t = s + m > f ? f - s : m;
          o.clearRect(0, 0, m, m), o.drawImage(a, -s, -q);
          var u = s * h / f + j << 0,
              v = Math.ceil(t * h / f),
              w = q * i / g / p + k << 0,
              x = Math.ceil(r * i / g / p);
          l.drawImage(n, 0, 0, t, r, u, w, v, x), s += m;
        }

        q += m;
      }

      n = o = null;
    }

    function b(a) {
      var b = a.naturalWidth,
          c = a.naturalHeight;

      if (b * c > 1048576) {
        var d = document.createElement("canvas");
        d.width = d.height = 1;
        var e = d.getContext("2d");
        return e.drawImage(a, -b + 1, 0), 0 === e.getImageData(0, 0, 1, 1).data[3];
      }

      return !1;
    }

    function c(a, b, c) {
      var d = document.createElement("canvas");
      d.width = 1, d.height = c;
      var e = d.getContext("2d");
      e.drawImage(a, 0, 0);

      for (var f = e.getImageData(0, 0, 1, c).data, g = 0, h = c, i = c; i > g;) {
        var j = f[4 * (i - 1) + 3];
        0 === j ? h = i : g = i, i = h + g >> 1;
      }

      d = null;
      var k = i / c;
      return 0 === k ? 1 : k;
    }

    return {
      isSubsampled: b,
      renderTo: a
    };
  }), d("moxie/runtime/html5/image/Image", ["moxie/runtime/html5/Runtime", "moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/core/utils/Encode", "moxie/file/File", "moxie/runtime/html5/image/ImageInfo", "moxie/runtime/html5/image/MegaPixel", "moxie/core/utils/Mime", "moxie/core/utils/Env"], function (a, b, c, d, e, f, g, h, i) {
    function j() {
      function a() {
        if (!t && !r) throw new c.ImageError(c.DOMException.INVALID_STATE_ERR);
        return t || r;
      }

      function j(a) {
        return d.atob(a.substring(a.indexOf("base64,") + 7));
      }

      function k(a, b) {
        return "data:" + (b || "") + ";base64," + d.btoa(a);
      }

      function l(a) {
        var b = this;
        r = new Image(), r.onerror = function () {
          q.call(this), b.trigger("error", c.ImageError.WRONG_FORMAT);
        }, r.onload = function () {
          b.trigger("load");
        }, r.src = /^data:[^;]*;base64,/.test(a) ? a : k(a, v.type);
      }

      function m(a, b) {
        var d,
            e = this;
        return window.FileReader ? (d = new FileReader(), d.onload = function () {
          b(this.result);
        }, d.onerror = function () {
          e.trigger("error", c.ImageError.WRONG_FORMAT);
        }, d.readAsDataURL(a), void 0) : b(a.getAsDataURL());
      }

      function n(c, d, e, f) {
        var g,
            h,
            i,
            j,
            k,
            l = this,
            m = 0,
            n = 0;

        if (y = f, k = this.meta && this.meta.tiff && this.meta.tiff.Orientation || 1, -1 !== b.inArray(k, [5, 6, 7, 8])) {
          var q = c;
          c = d, d = q;
        }

        return h = a(), e ? (c = Math.min(c, h.width), d = Math.min(d, h.height), g = Math.max(c / h.width, d / h.height)) : g = Math.min(c / h.width, d / h.height), g > 1 && !e && f ? void this.trigger("Resize") : (t || (t = document.createElement("canvas")), i = Math.round(h.width * g), j = Math.round(h.height * g), e ? (t.width = c, t.height = d, i > c && (m = Math.round((i - c) / 2)), j > d && (n = Math.round((j - d) / 2))) : (t.width = i, t.height = j), y || p(t.width, t.height, k), o.call(this, h, t, -m, -n, i, j), this.width = t.width, this.height = t.height, x = !0, void l.trigger("Resize"));
      }

      function o(a, b, c, d, e, f) {
        if ("iOS" === i.OS) g.renderTo(a, b, {
          width: e,
          height: f,
          x: c,
          y: d
        });else {
          var h = b.getContext("2d");
          h.drawImage(a, c, d, e, f);
        }
      }

      function p(a, b, c) {
        switch (c) {
          case 5:
          case 6:
          case 7:
          case 8:
            t.width = b, t.height = a;
            break;

          default:
            t.width = a, t.height = b;
        }

        var d = t.getContext("2d");

        switch (c) {
          case 2:
            d.translate(a, 0), d.scale(-1, 1);
            break;

          case 3:
            d.translate(a, b), d.rotate(Math.PI);
            break;

          case 4:
            d.translate(0, b), d.scale(1, -1);
            break;

          case 5:
            d.rotate(.5 * Math.PI), d.scale(1, -1);
            break;

          case 6:
            d.rotate(.5 * Math.PI), d.translate(0, -b);
            break;

          case 7:
            d.rotate(.5 * Math.PI), d.translate(a, -b), d.scale(-1, 1);
            break;

          case 8:
            d.rotate(-.5 * Math.PI), d.translate(-a, 0);
        }
      }

      function q() {
        s && (s.purge(), s = null), u = r = t = v = null, x = !1;
      }

      var r,
          s,
          t,
          u,
          v,
          w = this,
          x = !1,
          y = !0;
      b.extend(this, {
        loadFromBlob: function loadFromBlob(a) {
          var b = this,
              d = b.getRuntime(),
              e = arguments.length > 1 ? arguments[1] : !0;
          if (!d.can("access_binary")) throw new c.RuntimeError(c.RuntimeError.NOT_SUPPORTED_ERR);
          return v = a, a.isDetached() ? (u = a.getSource(), void l.call(this, u)) : void m.call(this, a.getSource(), function (a) {
            e && (u = j(a)), l.call(b, a);
          });
        },
        loadFromImage: function loadFromImage(a, b) {
          this.meta = a.meta, v = new e(null, {
            name: a.name,
            size: a.size,
            type: a.type
          }), l.call(this, b ? u = a.getAsBinaryString() : a.getAsDataURL());
        },
        getInfo: function getInfo() {
          var b,
              c = this.getRuntime();
          return !s && u && c.can("access_image_binary") && (s = new f(u)), b = {
            width: a().width || 0,
            height: a().height || 0,
            type: v.type || h.getFileMime(v.name),
            size: u && u.length || v.size || 0,
            name: v.name || "",
            meta: s && s.meta || this.meta || {}
          };
        },
        downsize: function downsize() {
          n.apply(this, arguments);
        },
        getAsCanvas: function getAsCanvas() {
          return t && (t.id = this.uid + "_canvas"), t;
        },
        getAsBlob: function getAsBlob(a, b) {
          return a !== this.type && n.call(this, this.width, this.height, !1), new e(null, {
            name: v.name || "",
            type: a,
            data: w.getAsBinaryString.call(this, a, b)
          });
        },
        getAsDataURL: function getAsDataURL(a) {
          var b = arguments[1] || 90;
          if (!x) return r.src;
          if ("image/jpeg" !== a) return t.toDataURL("image/png");

          try {
            return t.toDataURL("image/jpeg", b / 100);
          } catch (c) {
            return t.toDataURL("image/jpeg");
          }
        },
        getAsBinaryString: function getAsBinaryString(a, b) {
          if (!x) return u || (u = j(w.getAsDataURL(a, b))), u;
          if ("image/jpeg" !== a) u = j(w.getAsDataURL(a, b));else {
            var c;
            b || (b = 90);

            try {
              c = t.toDataURL("image/jpeg", b / 100);
            } catch (d) {
              c = t.toDataURL("image/jpeg");
            }

            u = j(c), s && (u = s.stripHeaders(u), y && (s.meta && s.meta.exif && s.setExif({
              PixelXDimension: this.width,
              PixelYDimension: this.height
            }), u = s.writeHeaders(u)), s.purge(), s = null);
          }
          return x = !1, u;
        },
        destroy: function destroy() {
          w = null, q.call(this), this.getRuntime().getShim().removeInstance(this.uid);
        }
      });
    }

    return a.Image = j;
  }), d("moxie/runtime/html4/image/Image", ["moxie/runtime/html4/Runtime", "moxie/runtime/html5/image/Image"], function (a, b) {
    return a.Image = b;
  }), f(["moxie/core/utils/Basic", "moxie/core/I18n", "moxie/core/utils/Mime", "moxie/core/utils/Env", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/core/EventTarget", "moxie/core/utils/Encode", "moxie/runtime/Runtime", "moxie/runtime/RuntimeClient", "moxie/file/Blob", "moxie/file/File", "moxie/file/FileInput", "moxie/runtime/RuntimeTarget", "moxie/file/FileReader", "moxie/core/utils/Url", "moxie/file/FileReaderSync", "moxie/xhr/FormData", "moxie/xhr/XMLHttpRequest", "moxie/runtime/Transporter", "moxie/image/Image", "moxie/core/utils/Events"]);
}(void 0), function (a) {
  "use strict";

  var b = {},
      c = a.moxie.core.utils.Basic.inArray;
  return function d(a) {
    var e, f;

    for (e in a) {
      f = _typeof(a[e]), "object" !== f || ~c(e, ["Exceptions", "Env", "Mime"]) ? "function" === f && (b[e] = a[e]) : d(a[e]);
    }
  }(a.moxie), b.Env = a.moxie.core.utils.Env, b.Mime = a.moxie.core.utils.Mime, b.Exceptions = a.moxie.core.Exceptions, a.mOxie = b, a.o || (a.o = b), b;
}(void 0);