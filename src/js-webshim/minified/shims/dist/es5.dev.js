"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function () {
  function a(a) {
    return a = +a, a !== a ? a = 0 : 0 !== a && a !== 1 / 0 && a !== -(1 / 0) && (a = (a > 0 || -1) * Math.floor(Math.abs(a))), a;
  }

  function b(a) {
    var b = _typeof(a);

    return null === a || "undefined" === b || "boolean" === b || "number" === b || "string" === b;
  }

  function c(a) {
    var c, d, e;
    if (b(a)) return a;
    if (d = a.valueOf, p(d) && (c = d.call(a), b(c))) return c;
    if (e = a.toString, p(e) && (c = e.call(a), b(c))) return c;
    throw new TypeError();
  }

  function d() {}

  setTimeout(function () {
    webshims.isReady("es5", !0);
  });

  var e,
      f = Array.prototype,
      g = Object.prototype,
      h = Function.prototype,
      i = String.prototype,
      j = Number.prototype,
      k = f.slice,
      l = f.splice,
      m = (f.push, f.unshift),
      n = h.call,
      o = g.toString,
      p = function p(a) {
    return "[object Function]" === g.toString.call(a);
  },
      q = function q(a) {
    return "[object RegExp]" === g.toString.call(a);
  },
      r = function r(a) {
    return "[object Array]" === o.call(a);
  },
      s = function s(a) {
    return "[object String]" === o.call(a);
  },
      t = function t(a) {
    var b = o.call(a),
        c = "[object Arguments]" === b;
    return c || (c = !r(a) && null !== a && "object" == _typeof(a) && "number" == typeof a.length && a.length >= 0 && p(a.callee)), c;
  },
      u = Object.defineProperty && function () {
    try {
      return Object.defineProperty({}, "x", {}), !0;
    } catch (a) {
      return !1;
    }
  }();

  e = u ? function (a, b, c, d) {
    !d && b in a || Object.defineProperty(a, b, {
      configurable: !0,
      enumerable: !1,
      writable: !0,
      value: c
    });
  } : function (a, b, c, d) {
    !d && b in a || (a[b] = c);
  };

  var v = function v(a, b, c) {
    for (var d in b) {
      g.hasOwnProperty.call(b, d) && e(a, d, b[d], c);
    }
  },
      w = function w(a) {
    if (null == a) throw new TypeError("can't convert " + a + " to object");
    return Object(a);
  },
      x = function x(a) {
    return a >>> 0;
  };

  v(h, {
    bind: function bind(a) {
      var b = this;
      if (!p(b)) throw new TypeError("Function.prototype.bind called on incompatible " + b);

      for (var c = k.call(arguments, 1), e = function e() {
        if (this instanceof i) {
          var d = b.apply(this, c.concat(k.call(arguments)));
          return Object(d) === d ? d : this;
        }

        return b.apply(a, c.concat(k.call(arguments)));
      }, f = Math.max(0, b.length - c.length), g = [], h = 0; f > h; h++) {
        g.push("$" + h);
      }

      var i = Function("binder", "return function (" + g.join(",") + "){return binder.apply(this,arguments)}")(e);
      return b.prototype && (d.prototype = b.prototype, i.prototype = new d(), d.prototype = null), i;
    }
  });
  var y,
      z,
      A,
      B,
      C,
      D = n.bind(g.hasOwnProperty);
  (C = D(g, "__defineGetter__")) && (y = n.bind(g.__defineGetter__), z = n.bind(g.__defineSetter__), A = n.bind(g.__lookupGetter__), B = n.bind(g.__lookupSetter__));

  var E = function () {
    var a = [1, 2],
        b = a.splice();
    return 2 === a.length && r(b) && 0 === b.length;
  }();

  v(f, {
    splice: function splice() {
      return 0 === arguments.length ? [] : l.apply(this, arguments);
    }
  }, E);

  var F = function () {
    var a = {};
    return f.splice.call(a, 0, 0, 1), 1 === a.length;
  }();

  v(f, {
    splice: function splice(b, c) {
      if (0 === arguments.length) return [];
      var d = arguments;
      return this.length = Math.max(a(this.length), 0), arguments.length > 0 && "number" != typeof c && (d = k.call(arguments), d.length < 2 ? d.push(this.length - b) : d[1] = a(c)), l.apply(this, d);
    }
  }, !F);
  var G = 1 !== [].unshift(0);
  v(f, {
    unshift: function unshift() {
      return m.apply(this, arguments), this.length;
    }
  }, G), v(Array, {
    isArray: r
  });

  var H = Object("a"),
      I = "a" !== H[0] || !(0 in H),
      J = function J(a) {
    var b = !0,
        c = !0;
    return a && (a.call("foo", function (a, c, d) {
      "object" != _typeof(d) && (b = !1);
    }), a.call([1], function () {
      "use strict";

      c = "string" == typeof this;
    }, "x")), !!a && b && c;
  };

  v(f, {
    forEach: function forEach(a) {
      var b = w(this),
          c = I && s(this) ? this.split("") : b,
          d = arguments[1],
          e = -1,
          f = c.length >>> 0;
      if (!p(a)) throw new TypeError();

      for (; ++e < f;) {
        e in c && a.call(d, c[e], e, b);
      }
    }
  }, !J(f.forEach)), v(f, {
    map: function map(a) {
      var b = w(this),
          c = I && s(this) ? this.split("") : b,
          d = c.length >>> 0,
          e = Array(d),
          f = arguments[1];
      if (!p(a)) throw new TypeError(a + " is not a function");

      for (var g = 0; d > g; g++) {
        g in c && (e[g] = a.call(f, c[g], g, b));
      }

      return e;
    }
  }, !J(f.map)), v(f, {
    filter: function filter(a) {
      var b,
          c = w(this),
          d = I && s(this) ? this.split("") : c,
          e = d.length >>> 0,
          f = [],
          g = arguments[1];
      if (!p(a)) throw new TypeError(a + " is not a function");

      for (var h = 0; e > h; h++) {
        h in d && (b = d[h], a.call(g, b, h, c) && f.push(b));
      }

      return f;
    }
  }, !J(f.filter)), v(f, {
    every: function every(a) {
      var b = w(this),
          c = I && s(this) ? this.split("") : b,
          d = c.length >>> 0,
          e = arguments[1];
      if (!p(a)) throw new TypeError(a + " is not a function");

      for (var f = 0; d > f; f++) {
        if (f in c && !a.call(e, c[f], f, b)) return !1;
      }

      return !0;
    }
  }, !J(f.every)), v(f, {
    some: function some(a) {
      var b = w(this),
          c = I && s(this) ? this.split("") : b,
          d = c.length >>> 0,
          e = arguments[1];
      if (!p(a)) throw new TypeError(a + " is not a function");

      for (var f = 0; d > f; f++) {
        if (f in c && a.call(e, c[f], f, b)) return !0;
      }

      return !1;
    }
  }, !J(f.some));
  var K = !1;
  f.reduce && (K = "object" == _typeof(f.reduce.call("es5", function (a, b, c, d) {
    return d;
  }))), v(f, {
    reduce: function reduce(a) {
      var b = w(this),
          c = I && s(this) ? this.split("") : b,
          d = c.length >>> 0;
      if (!p(a)) throw new TypeError(a + " is not a function");
      if (!d && 1 === arguments.length) throw new TypeError("reduce of empty array with no initial value");
      var e,
          f = 0;
      if (arguments.length >= 2) e = arguments[1];else for (;;) {
        if (f in c) {
          e = c[f++];
          break;
        }

        if (++f >= d) throw new TypeError("reduce of empty array with no initial value");
      }

      for (; d > f; f++) {
        f in c && (e = a.call(void 0, e, c[f], f, b));
      }

      return e;
    }
  }, !K);
  var L = !1;
  f.reduceRight && (L = "object" == _typeof(f.reduceRight.call("es5", function (a, b, c, d) {
    return d;
  }))), v(f, {
    reduceRight: function reduceRight(a) {
      var b = w(this),
          c = I && s(this) ? this.split("") : b,
          d = c.length >>> 0;
      if (!p(a)) throw new TypeError(a + " is not a function");
      if (!d && 1 === arguments.length) throw new TypeError("reduceRight of empty array with no initial value");
      var e,
          f = d - 1;
      if (arguments.length >= 2) e = arguments[1];else for (;;) {
        if (f in c) {
          e = c[f--];
          break;
        }

        if (--f < 0) throw new TypeError("reduceRight of empty array with no initial value");
      }
      if (0 > f) return e;

      do {
        f in c && (e = a.call(void 0, e, c[f], f, b));
      } while (f--);

      return e;
    }
  }, !L);
  var M = Array.prototype.indexOf && -1 !== [0, 1].indexOf(1, 2);
  v(f, {
    indexOf: function indexOf(b) {
      var c = I && s(this) ? this.split("") : w(this),
          d = c.length >>> 0;
      if (!d) return -1;
      var e = 0;

      for (arguments.length > 1 && (e = a(arguments[1])), e = e >= 0 ? e : Math.max(0, d + e); d > e; e++) {
        if (e in c && c[e] === b) return e;
      }

      return -1;
    }
  }, M);
  var N = Array.prototype.lastIndexOf && -1 !== [0, 1].lastIndexOf(0, -3);
  v(f, {
    lastIndexOf: function lastIndexOf(b) {
      var c = I && s(this) ? this.split("") : w(this),
          d = c.length >>> 0;
      if (!d) return -1;
      var e = d - 1;

      for (arguments.length > 1 && (e = Math.min(e, a(arguments[1]))), e = e >= 0 ? e : d - Math.abs(e); e >= 0; e--) {
        if (e in c && b === c[e]) return e;
      }

      return -1;
    }
  }, N);

  var O = !{
    toString: null
  }.propertyIsEnumerable("toString"),
      P = function () {}.propertyIsEnumerable("prototype"),
      Q = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
      R = Q.length;

  v(Object, {
    keys: function keys(a) {
      var b = p(a),
          c = t(a),
          d = null !== a && "object" == _typeof(a),
          e = d && s(a);

      if (!d && !b && !c) throw new TypeError("Object.keys called on a non-object");
      var f = [],
          g = P && b;
      if (e || c) for (var h = 0; h < a.length; ++h) {
        f.push(String(h));
      } else for (var i in a) {
        g && "prototype" === i || !D(a, i) || f.push(String(i));
      }
      if (O) for (var j = a.constructor, k = j && j.prototype === a, l = 0; R > l; l++) {
        var m = Q[l];
        k && "constructor" === m || !D(a, m) || f.push(m);
      }
      return f;
    }
  });

  var S = Object.keys && function () {
    return 2 === Object.keys(arguments).length;
  }(1, 2),
      T = Object.keys;

  v(Object, {
    keys: function keys(a) {
      return T(t(a) ? f.slice.call(a) : a);
    }
  }, !S);
  var U = -621987552e5,
      V = "-000001",
      W = Date.prototype.toISOString && -1 === new Date(U).toISOString().indexOf(V);
  v(Date.prototype, {
    toISOString: function toISOString() {
      var a, b, c, d, e;
      if (!isFinite(this)) throw new RangeError("Date.prototype.toISOString called on non-finite value.");

      for (d = this.getUTCFullYear(), e = this.getUTCMonth(), d += Math.floor(e / 12), e = (e % 12 + 12) % 12, a = [e + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()], d = (0 > d ? "-" : d > 9999 ? "+" : "") + ("00000" + Math.abs(d)).slice(d >= 0 && 9999 >= d ? -4 : -6), b = a.length; b--;) {
        c = a[b], 10 > c && (a[b] = "0" + c);
      }

      return d + "-" + a.slice(0, 2).join("-") + "T" + a.slice(2).join(":") + "." + ("000" + this.getUTCMilliseconds()).slice(-3) + "Z";
    }
  }, W);
  var X = !1;

  try {
    X = Date.prototype.toJSON && null === new Date(0 / 0).toJSON() && -1 !== new Date(U).toJSON().indexOf(V) && Date.prototype.toJSON.call({
      toISOString: function toISOString() {
        return !0;
      }
    });
  } catch (Y) {}

  X || (Date.prototype.toJSON = function () {
    var a,
        b = Object(this),
        d = c(b);
    if ("number" == typeof d && !isFinite(d)) return null;
    if (a = b.toISOString, "function" != typeof a) throw new TypeError("toISOString property is not callable");
    return a.call(b);
  });

  var Z = 1e15 === Date.parse("+033658-09-27T01:46:40.000Z"),
      $ = !isNaN(Date.parse("2012-04-04T24:00:00.500Z")) || !isNaN(Date.parse("2012-11-31T23:59:59.000Z")),
      _ = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));

  (!Date.parse || _ || $ || !Z) && (Date = function (a) {
    function b(c, d, e, f, g, h, i) {
      var j = arguments.length;

      if (this instanceof a) {
        var k = 1 === j && String(c) === c ? new a(b.parse(c)) : j >= 7 ? new a(c, d, e, f, g, h, i) : j >= 6 ? new a(c, d, e, f, g, h) : j >= 5 ? new a(c, d, e, f, g) : j >= 4 ? new a(c, d, e, f) : j >= 3 ? new a(c, d, e) : j >= 2 ? new a(c, d) : j >= 1 ? new a(c) : new a();
        return k.constructor = b, k;
      }

      return a.apply(this, arguments);
    }

    function c(a, b) {
      var c = b > 1 ? 1 : 0;
      return f[b] + Math.floor((a - 1969 + c) / 4) - Math.floor((a - 1901 + c) / 100) + Math.floor((a - 1601 + c) / 400) + 365 * (a - 1970);
    }

    function d(b) {
      return Number(new a(1970, 0, 1, 0, 0, 0, b));
    }

    var e = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),
        f = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

    for (var g in a) {
      b[g] = a[g];
    }

    return b.now = a.now, b.UTC = a.UTC, b.prototype = a.prototype, b.prototype.constructor = b, b.parse = function (b) {
      var f = e.exec(b);

      if (f) {
        var g,
            h = Number(f[1]),
            i = Number(f[2] || 1) - 1,
            j = Number(f[3] || 1) - 1,
            k = Number(f[4] || 0),
            l = Number(f[5] || 0),
            m = Number(f[6] || 0),
            n = Math.floor(1e3 * Number(f[7] || 0)),
            o = Boolean(f[4] && !f[8]),
            p = "-" === f[9] ? 1 : -1,
            q = Number(f[10] || 0),
            r = Number(f[11] || 0);
        return (l > 0 || m > 0 || n > 0 ? 24 : 25) > k && 60 > l && 60 > m && 1e3 > n && i > -1 && 12 > i && 24 > q && 60 > r && j > -1 && j < c(h, i + 1) - c(h, i) && (g = 60 * (24 * (c(h, i) + j) + k + q * p), g = 1e3 * (60 * (g + l + r * p) + m) + n, o && (g = d(g)), g >= -864e13 && 864e13 >= g) ? g : 0 / 0;
      }

      return a.parse.apply(this, arguments);
    }, b;
  }(Date)), Date.now || (Date.now = function () {
    return new Date().getTime();
  });
  var ab = j.toFixed && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0)),
      bb = {
    base: 1e7,
    size: 6,
    data: [0, 0, 0, 0, 0, 0],
    multiply: function multiply(a, b) {
      for (var c = -1; ++c < bb.size;) {
        b += a * bb.data[c], bb.data[c] = b % bb.base, b = Math.floor(b / bb.base);
      }
    },
    divide: function divide(a) {
      for (var b = bb.size, c = 0; --b >= 0;) {
        c += bb.data[b], bb.data[b] = Math.floor(c / a), c = c % a * bb.base;
      }
    },
    numToString: function numToString() {
      for (var a = bb.size, b = ""; --a >= 0;) {
        if ("" !== b || 0 === a || 0 !== bb.data[a]) {
          var c = String(bb.data[a]);
          "" === b ? b = c : b += "0000000".slice(0, 7 - c.length) + c;
        }
      }

      return b;
    },
    pow: function nb(a, b, c) {
      return 0 === b ? c : b % 2 === 1 ? nb(a, b - 1, c * a) : nb(a * a, b / 2, c);
    },
    log: function log(a) {
      for (var b = 0; a >= 4096;) {
        b += 12, a /= 4096;
      }

      for (; a >= 2;) {
        b += 1, a /= 2;
      }

      return b;
    }
  };
  v(j, {
    toFixed: function toFixed(a) {
      var b, c, d, e, f, g, h, i;
      if (b = Number(a), b = b !== b ? 0 : Math.floor(b), 0 > b || b > 20) throw new RangeError("Number.toFixed called with invalid number of decimals");
      if (c = Number(this), c !== c) return "NaN";
      if (-1e21 >= c || c >= 1e21) return String(c);
      if (d = "", 0 > c && (d = "-", c = -c), e = "0", c > 1e-21) if (f = bb.log(c * bb.pow(2, 69, 1)) - 69, g = 0 > f ? c * bb.pow(2, -f, 1) : c / bb.pow(2, f, 1), g *= 4503599627370496, f = 52 - f, f > 0) {
        for (bb.multiply(0, g), h = b; h >= 7;) {
          bb.multiply(1e7, 0), h -= 7;
        }

        for (bb.multiply(bb.pow(10, h, 1), 0), h = f - 1; h >= 23;) {
          bb.divide(1 << 23), h -= 23;
        }

        bb.divide(1 << h), bb.multiply(1, 1), bb.divide(2), e = bb.numToString();
      } else bb.multiply(0, g), bb.multiply(1 << -f, 0), e = bb.numToString() + "0.00000000000000000000".slice(2, 2 + b);
      return b > 0 ? (i = e.length, e = b >= i ? d + "0.0000000000000000000".slice(0, b - i + 2) + e : d + e.slice(0, i - b) + "." + e.slice(i - b)) : e = d + e, e;
    }
  }, ab);
  var cb = i.split;
  2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || 4 !== "test".split(/(?:)/, -1).length || "".split(/.?/).length || ".".split(/()()/).length > 1 ? !function () {
    var a = void 0 === /()??/.exec("")[1];

    i.split = function (b, c) {
      var d = this;
      if (void 0 === b && 0 === c) return [];
      if ("[object RegExp]" !== o.call(b)) return cb.call(this, b, c);
      var e,
          g,
          h,
          i,
          j = [],
          k = (b.ignoreCase ? "i" : "") + (b.multiline ? "m" : "") + (b.extended ? "x" : "") + (b.sticky ? "y" : ""),
          l = 0;

      for (b = new RegExp(b.source, k + "g"), d += "", a || (e = new RegExp("^" + b.source + "$(?!\\s)", k)), c = void 0 === c ? -1 >>> 0 : x(c); (g = b.exec(d)) && (h = g.index + g[0].length, !(h > l && (j.push(d.slice(l, g.index)), !a && g.length > 1 && g[0].replace(e, function () {
        for (var a = 1; a < arguments.length - 2; a++) {
          void 0 === arguments[a] && (g[a] = void 0);
        }
      }), g.length > 1 && g.index < d.length && f.push.apply(j, g.slice(1)), i = g[0].length, l = h, j.length >= c)));) {
        b.lastIndex === g.index && b.lastIndex++;
      }

      return l === d.length ? (i || !b.test("")) && j.push("") : j.push(d.slice(l)), j.length > c ? j.slice(0, c) : j;
    };
  }() : "0".split(void 0, 0).length && (i.split = function (a, b) {
    return void 0 === a && 0 === b ? [] : cb.call(this, a, b);
  });

  var db = i.replace,
      eb = function () {
    var a = [];
    return "x".replace(/x(.)?/g, function (b, c) {
      a.push(c);
    }), 1 === a.length && "undefined" == typeof a[0];
  }();

  eb || (i.replace = function (a, b) {
    var c = p(b),
        d = q(a) && /\)[*?]/.test(a.source);

    if (c && d) {
      var e = function e(c) {
        var d = arguments.length,
            e = a.lastIndex;
        a.lastIndex = 0;
        var f = a.exec(c);
        return a.lastIndex = e, f.push(arguments[d - 2], arguments[d - 1]), b.apply(this, f);
      };

      return db.call(this, a, e);
    }

    return db.call(this, a, b);
  });
  var fb = i.substr,
      gb = "".substr && "b" !== "0b".substr(-1);
  v(i, {
    substr: function substr(a, b) {
      return fb.call(this, 0 > a && (a = this.length + a) < 0 ? 0 : a, b);
    }
  }, gb);
  var hb = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF",
      ib = "\u200B",
      jb = "[" + hb + "]",
      kb = new RegExp("^" + jb + jb + "*"),
      lb = new RegExp(jb + jb + "*$"),
      mb = i.trim && (hb.trim() || !ib.trim());
  v(i, {
    trim: function trim() {
      if (void 0 === this || null === this) throw new TypeError("can't convert " + this + " to object");
      return String(this).replace(kb, "").replace(lb, "");
    }
  }, mb), (8 !== parseInt(hb + "08") || 22 !== parseInt(hb + "0x16")) && (parseInt = function (a) {
    var b = /^0[xX]/;
    return function (c, d) {
      return c = String(c).trim(), Number(d) || (d = b.test(c) ? 16 : 10), a(c, d);
    };
  }(parseInt));
}(), function (a, b) {
  var c = "defineProperty",
      d = !!(Object.create && Object.defineProperties && Object.getOwnPropertyDescriptor);
  d && Object[c] && Object.prototype.__defineGetter__ && !function () {
    try {
      var a = document.createElement("foo");
      Object[c](a, "bar", {
        get: function get() {
          return !0;
        }
      }), d = !!a.bar;
    } catch (b) {
      d = !1;
    }

    a = null;
  }();
  var e = webshims.support;

  if (e.objectAccessor = !!(d || Object.prototype.__defineGetter__ && Object.prototype.__lookupSetter__), e.advancedObjectProperties = d, !(d && Object.create && Object.defineProperties && Object.getOwnPropertyDescriptor && Object.defineProperty)) {
    var f = Function.prototype.call,
        g = Object.prototype,
        h = f.bind(g.hasOwnProperty);
    b.objectCreate = function (c, d, f, g) {
      var h,
          i = function i() {};

      return i.prototype = c, h = new i(), g || "__proto__" in h || e.objectAccessor || (h.__proto__ = c), d && b.defineProperties(h, d), f && (h.options = a.extend(!0, {}, h.options || {}, f), f = h.options), h._create && a.isFunction(h._create) && h._create(f), h;
    }, b.defineProperties = function (a, c) {
      for (var d in c) {
        h(c, d) && b.defineProperty(a, d, c[d]);
      }

      return a;
    };
    b.defineProperty = function (a, b, c) {
      if ("object" != _typeof(c) || null === c) return a;
      if (Object.defineProperty) try {
        return Object.defineProperty(a, b, c);
      } catch (d) {}
      return h(c, "value") ? (a[b] = c.value, a) : (a.__defineGetter__ && ("function" == typeof c.get && a.__defineGetter__(b, c.get), "function" == typeof c.set && a.__defineSetter__(b, c.set)), a);
    }, b.getPrototypeOf = function (a) {
      return Object.getPrototypeOf && Object.getPrototypeOf(a) || a.__proto__ || a.constructor && a.constructor.prototype;
    }, b.getOwnPropertyDescriptor = function (a, b) {
      if ("object" != _typeof(a) && "function" != typeof a || null === a) throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object");
      var c;
      if (Object.defineProperty && Object.getOwnPropertyDescriptor) try {
        return c = Object.getOwnPropertyDescriptor(a, b);
      } catch (d) {}
      c = {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        value: void 0
      };

      var e = a.__lookupGetter__ && a.__lookupGetter__(b),
          f = a.__lookupSetter__ && a.__lookupSetter__(b);

      if (!e && !f) {
        if (!h(a, b)) return;
        return c.value = a[b], c;
      }

      return delete c.writable, delete c.value, c.get = c.set = void 0, e && (c.get = e), f && (c.set = f), c;
    };
  }

  webshims.isReady("es5", !0);
}(webshims.$, webshims);