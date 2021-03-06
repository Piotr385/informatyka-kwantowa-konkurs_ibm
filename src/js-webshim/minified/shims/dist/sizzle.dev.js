"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
!function (a) {
  function b(a, b, c, d) {
    var e, f, g, h, i, j, l, n, o, p;
    if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], !a || "string" != typeof a) return c;
    if (1 !== (h = b.nodeType) && 9 !== h) return [];

    if (I && !d) {
      if (e = sb.exec(a)) if (g = e[1]) {
        if (9 === h) {
          if (f = b.getElementById(g), !f || !f.parentNode) return c;
          if (f.id === g) return c.push(f), c;
        } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), c;
      } else {
        if (e[2]) return _.apply(c, b.getElementsByTagName(a)), c;
        if ((g = e[3]) && v.getElementsByClassName && b.getElementsByClassName) return _.apply(c, b.getElementsByClassName(g)), c;
      }

      if (v.qsa && (!J || !J.test(a))) {
        if (n = l = N, o = b, p = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
          for (j = z(a), (l = b.getAttribute("id")) ? n = l.replace(ub, "\\$&") : b.setAttribute("id", n), n = "[id='" + n + "'] ", i = j.length; i--;) {
            j[i] = n + m(j[i]);
          }

          o = tb.test(a) && k(b.parentNode) || b, p = j.join(",");
        }

        if (p) try {
          return _.apply(c, o.querySelectorAll(p)), c;
        } catch (q) {} finally {
          l || b.removeAttribute("id");
        }
      }
    }

    return B(a.replace(ib, "$1"), b, c, d);
  }

  function c() {
    function a(c, d) {
      return b.push(c + " ") > w.cacheLength && delete a[b.shift()], a[c + " "] = d;
    }

    var b = [];
    return a;
  }

  function d(a) {
    return a[N] = !0, a;
  }

  function e(a) {
    var b = G.createElement("div");

    try {
      return !!a(b);
    } catch (c) {
      return !1;
    } finally {
      b.parentNode && b.parentNode.removeChild(b), b = null;
    }
  }

  function f(a, b) {
    for (var c = a.split("|"), d = a.length; d--;) {
      w.attrHandle[c[d]] = b;
    }
  }

  function g(a, b) {
    var c = b && a,
        d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || W) - (~a.sourceIndex || W);
    if (d) return d;
    if (c) for (; c = c.nextSibling;) {
      if (c === b) return -1;
    }
    return a ? 1 : -1;
  }

  function h(a) {
    return function (b) {
      var c = b.nodeName.toLowerCase();
      return "input" === c && b.type === a;
    };
  }

  function i(a) {
    return function (b) {
      var c = b.nodeName.toLowerCase();
      return ("input" === c || "button" === c) && b.type === a;
    };
  }

  function j(a) {
    return d(function (b) {
      return b = +b, d(function (c, d) {
        for (var e, f = a([], c.length, b), g = f.length; g--;) {
          c[e = f[g]] && (c[e] = !(d[e] = c[e]));
        }
      });
    });
  }

  function k(a) {
    return a && _typeof(a.getElementsByTagName) !== V && a;
  }

  function l() {}

  function m(a) {
    for (var b = 0, c = a.length, d = ""; c > b; b++) {
      d += a[b].value;
    }

    return d;
  }

  function n(a, b, c) {
    var d = b.dir,
        e = c && "parentNode" === d,
        f = Q++;
    return b.first ? function (b, c, f) {
      for (; b = b[d];) {
        if (1 === b.nodeType || e) return a(b, c, f);
      }
    } : function (b, c, g) {
      var h,
          i,
          j = [P, f];

      if (g) {
        for (; b = b[d];) {
          if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
        }
      } else for (; b = b[d];) {
        if (1 === b.nodeType || e) {
          if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2];
          if (i[d] = j, j[2] = a(b, c, g)) return !0;
        }
      }
    };
  }

  function o(a) {
    return a.length > 1 ? function (b, c, d) {
      for (var e = a.length; e--;) {
        if (!a[e](b, c, d)) return !1;
      }

      return !0;
    } : a[0];
  }

  function p(a, c, d) {
    for (var e = 0, f = c.length; f > e; e++) {
      b(a, c[e], d);
    }

    return d;
  }

  function q(a, b, c, d, e) {
    for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) {
      (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
    }

    return g;
  }

  function r(a, b, c, e, f, g) {
    return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function (d, g, h, i) {
      var j,
          k,
          l,
          m = [],
          n = [],
          o = g.length,
          r = d || p(b || "*", h.nodeType ? [h] : h, []),
          s = !a || !d && b ? r : q(r, m, a, h, i),
          t = c ? f || (d ? a : o || e) ? [] : g : s;
      if (c && c(s, t, h, i), e) for (j = q(t, n), e(j, [], h, i), k = j.length; k--;) {
        (l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
      }

      if (d) {
        if (f || a) {
          if (f) {
            for (j = [], k = t.length; k--;) {
              (l = t[k]) && j.push(s[k] = l);
            }

            f(null, t = [], j, i);
          }

          for (k = t.length; k--;) {
            (l = t[k]) && (j = f ? bb.call(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l));
          }
        }
      } else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : _.apply(g, t);
    });
  }

  function s(a) {
    for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function (a) {
      return a === b;
    }, g, !0), j = n(function (a) {
      return bb.call(b, a) > -1;
    }, g, !0), k = [function (a, c, d) {
      return !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
    }]; e > h; h++) {
      if (c = w.relative[a[h].type]) k = [n(o(k), c)];else {
        if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
          for (d = ++h; e > d && !w.relative[a[d].type]; d++) {
            ;
          }

          return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
            value: " " === a[h - 2].type ? "*" : ""
          })).replace(ib, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a));
        }

        k.push(c);
      }
    }

    return o(k);
  }

  function t(a, c) {
    var e = c.length > 0,
        f = a.length > 0,
        g = function g(d, _g, h, i, j) {
      var k,
          l,
          m,
          n = 0,
          o = "0",
          p = d && [],
          r = [],
          s = C,
          t = d || f && w.find.TAG("*", j),
          u = P += null == s ? 1 : Math.random() || .1,
          v = t.length;

      for (j && (C = _g !== G && _g); o !== v && null != (k = t[o]); o++) {
        if (f && k) {
          for (l = 0; m = a[l++];) {
            if (m(k, _g, h)) {
              i.push(k);
              break;
            }
          }

          j && (P = u);
        }

        e && ((k = !m && k) && n--, d && p.push(k));
      }

      if (n += o, e && o !== n) {
        for (l = 0; m = c[l++];) {
          m(p, r, _g, h);
        }

        if (d) {
          if (n > 0) for (; o--;) {
            p[o] || r[o] || (r[o] = Z.call(i));
          }
          r = q(r);
        }

        _.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i);
      }

      return j && (P = u, C = s), p;
    };

    return e ? d(g) : g;
  }

  var u,
      v,
      w,
      x,
      y,
      z,
      A,
      B,
      C,
      D,
      E,
      F,
      G,
      H,
      I,
      J,
      K,
      L,
      M,
      N = "sizzle" + -new Date(),
      O = a.document,
      P = 0,
      Q = 0,
      R = c(),
      S = c(),
      T = c(),
      U = function U(a, b) {
    return a === b && (E = !0), 0;
  },
      V = "undefined",
      W = 1 << 31,
      X = {}.hasOwnProperty,
      Y = [],
      Z = Y.pop,
      $ = Y.push,
      _ = Y.push,
      ab = Y.slice,
      bb = Y.indexOf || function (a) {
    for (var b = 0, c = this.length; c > b; b++) {
      if (this[b] === a) return b;
    }

    return -1;
  },
      cb = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      db = "[\\x20\\t\\r\\n\\f]",
      eb = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      fb = eb.replace("w", "w#"),
      gb = "\\[" + db + "*(" + eb + ")(?:" + db + "*([*^$|!~]?=)" + db + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + fb + "))|)" + db + "*\\]",
      hb = ":(" + eb + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + gb + ")*)|.*)\\)|)",
      ib = new RegExp("^" + db + "+|((?:^|[^\\\\])(?:\\\\.)*)" + db + "+$", "g"),
      jb = new RegExp("^" + db + "*," + db + "*"),
      kb = new RegExp("^" + db + "*([>+~]|" + db + ")" + db + "*"),
      lb = new RegExp("=" + db + "*([^\\]'\"]*?)" + db + "*\\]", "g"),
      mb = new RegExp(hb),
      nb = new RegExp("^" + fb + "$"),
      ob = {
    ID: new RegExp("^#(" + eb + ")"),
    CLASS: new RegExp("^\\.(" + eb + ")"),
    TAG: new RegExp("^(" + eb.replace("w", "w*") + ")"),
    ATTR: new RegExp("^" + gb),
    PSEUDO: new RegExp("^" + hb),
    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + db + "*(even|odd|(([+-]|)(\\d*)n|)" + db + "*(?:([+-]|)" + db + "*(\\d+)|))" + db + "*\\)|)", "i"),
    bool: new RegExp("^(?:" + cb + ")$", "i"),
    needsContext: new RegExp("^" + db + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + db + "*((?:-\\d)?\\d*)" + db + "*\\)|)(?=[^-]|$)", "i")
  },
      pb = /^(?:input|select|textarea|button)$/i,
      qb = /^h\d$/i,
      rb = /^[^{]+\{\s*\[native \w/,
      sb = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      tb = /[+~]/,
      ub = /'|\\/g,
      vb = new RegExp("\\\\([\\da-f]{1,6}" + db + "?|(" + db + ")|.)", "ig"),
      wb = function wb(a, b, c) {
    var d = "0x" + b - 65536;
    return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
  };

  try {
    _.apply(Y = ab.call(O.childNodes), O.childNodes), Y[O.childNodes.length].nodeType;
  } catch (xb) {
    _ = {
      apply: Y.length ? function (a, b) {
        $.apply(a, ab.call(b));
      } : function (a, b) {
        for (var c = a.length, d = 0; a[c++] = b[d++];) {
          ;
        }

        a.length = c - 1;
      }
    };
  }

  v = b.support = {}, y = b.isXML = function (a) {
    var b = a && (a.ownerDocument || a).documentElement;
    return b ? "HTML" !== b.nodeName : !1;
  }, F = b.setDocument = function (a) {
    var b,
        c = a ? a.ownerDocument || a : O,
        d = c.defaultView;
    return c !== G && 9 === c.nodeType && c.documentElement ? (G = c, H = c.documentElement, I = !y(c), d && d !== d.top && (d.addEventListener ? d.addEventListener("unload", function () {
      F();
    }, !1) : d.attachEvent && d.attachEvent("onunload", function () {
      F();
    })), v.attributes = e(function (a) {
      return a.className = "i", !a.getAttribute("className");
    }), v.getElementsByTagName = e(function (a) {
      return a.appendChild(c.createComment("")), !a.getElementsByTagName("*").length;
    }), v.getElementsByClassName = rb.test(c.getElementsByClassName) && e(function (a) {
      return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length;
    }), v.getById = e(function (a) {
      return H.appendChild(a).id = N, !c.getElementsByName || !c.getElementsByName(N).length;
    }), v.getById ? (w.find.ID = function (a, b) {
      if (_typeof(b.getElementById) !== V && I) {
        var c = b.getElementById(a);
        return c && c.parentNode ? [c] : [];
      }
    }, w.filter.ID = function (a) {
      var b = a.replace(vb, wb);
      return function (a) {
        return a.getAttribute("id") === b;
      };
    }) : (delete w.find.ID, w.filter.ID = function (a) {
      var b = a.replace(vb, wb);
      return function (a) {
        var c = _typeof(a.getAttributeNode) !== V && a.getAttributeNode("id");
        return c && c.value === b;
      };
    }), w.find.TAG = v.getElementsByTagName ? function (a, b) {
      return _typeof(b.getElementsByTagName) !== V ? b.getElementsByTagName(a) : void 0;
    } : function (a, b) {
      var c,
          d = [],
          e = 0,
          f = b.getElementsByTagName(a);

      if ("*" === a) {
        for (; c = f[e++];) {
          1 === c.nodeType && d.push(c);
        }

        return d;
      }

      return f;
    }, w.find.CLASS = v.getElementsByClassName && function (a, b) {
      return _typeof(b.getElementsByClassName) !== V && I ? b.getElementsByClassName(a) : void 0;
    }, K = [], J = [], (v.qsa = rb.test(c.querySelectorAll)) && (e(function (a) {
      a.innerHTML = "<select msallowclip=''><option selected=''></option></select>", a.querySelectorAll("[msallowclip^='']").length && J.push("[*^$]=" + db + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + db + "*(?:value|" + cb + ")"), a.querySelectorAll(":checked").length || J.push(":checked");
    }), e(function (a) {
      var b = c.createElement("input");
      b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + db + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:");
    })), (v.matchesSelector = rb.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function (a) {
      v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", hb);
    }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = rb.test(H.compareDocumentPosition), M = b || rb.test(H.contains) ? function (a, b) {
      var c = 9 === a.nodeType ? a.documentElement : a,
          d = b && b.parentNode;
      return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
    } : function (a, b) {
      if (b) for (; b = b.parentNode;) {
        if (b === a) return !0;
      }
      return !1;
    }, U = b ? function (a, b) {
      if (a === b) return E = !0, 0;
      var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
      return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !v.sortDetached && b.compareDocumentPosition(a) === d ? a === c || a.ownerDocument === O && M(O, a) ? -1 : b === c || b.ownerDocument === O && M(O, b) ? 1 : D ? bb.call(D, a) - bb.call(D, b) : 0 : 4 & d ? -1 : 1);
    } : function (a, b) {
      if (a === b) return E = !0, 0;
      var d,
          e = 0,
          f = a.parentNode,
          h = b.parentNode,
          i = [a],
          j = [b];
      if (!f || !h) return a === c ? -1 : b === c ? 1 : f ? -1 : h ? 1 : D ? bb.call(D, a) - bb.call(D, b) : 0;
      if (f === h) return g(a, b);

      for (d = a; d = d.parentNode;) {
        i.unshift(d);
      }

      for (d = b; d = d.parentNode;) {
        j.unshift(d);
      }

      for (; i[e] === j[e];) {
        e++;
      }

      return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0;
    }, c) : G;
  }, b.matches = function (a, c) {
    return b(a, null, null, c);
  }, b.matchesSelector = function (a, c) {
    if ((a.ownerDocument || a) !== G && F(a), c = c.replace(lb, "='$1']"), !(!v.matchesSelector || !I || K && K.test(c) || J && J.test(c))) try {
      var d = L.call(a, c);
      if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
    } catch (e) {}
    return b(c, G, null, [a]).length > 0;
  }, b.contains = function (a, b) {
    return (a.ownerDocument || a) !== G && F(a), M(a, b);
  }, b.attr = function (a, b) {
    (a.ownerDocument || a) !== G && F(a);
    var c = w.attrHandle[b.toLowerCase()],
        d = c && X.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
    return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
  }, b.error = function (a) {
    throw new Error("Syntax error, unrecognized expression: " + a);
  }, b.uniqueSort = function (a) {
    var b,
        c = [],
        d = 0,
        e = 0;

    if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) {
      for (; b = a[e++];) {
        b === a[e] && (d = c.push(e));
      }

      for (; d--;) {
        a.splice(c[d], 1);
      }
    }

    return D = null, a;
  }, x = b.getText = function (a) {
    var b,
        c = "",
        d = 0,
        e = a.nodeType;

    if (e) {
      if (1 === e || 9 === e || 11 === e) {
        if ("string" == typeof a.textContent) return a.textContent;

        for (a = a.firstChild; a; a = a.nextSibling) {
          c += x(a);
        }
      } else if (3 === e || 4 === e) return a.nodeValue;
    } else for (; b = a[d++];) {
      c += x(b);
    }

    return c;
  }, w = b.selectors = {
    cacheLength: 50,
    createPseudo: d,
    match: ob,
    attrHandle: {},
    find: {},
    relative: {
      ">": {
        dir: "parentNode",
        first: !0
      },
      " ": {
        dir: "parentNode"
      },
      "+": {
        dir: "previousSibling",
        first: !0
      },
      "~": {
        dir: "previousSibling"
      }
    },
    preFilter: {
      ATTR: function ATTR(a) {
        return a[1] = a[1].replace(vb, wb), a[3] = (a[3] || a[4] || a[5] || "").replace(vb, wb), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
      },
      CHILD: function CHILD(a) {
        return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a;
      },
      PSEUDO: function PSEUDO(a) {
        var b,
            c = !a[6] && a[2];
        return ob.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && mb.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3));
      }
    },
    filter: {
      TAG: function TAG(a) {
        var b = a.replace(vb, wb).toLowerCase();
        return "*" === a ? function () {
          return !0;
        } : function (a) {
          return a.nodeName && a.nodeName.toLowerCase() === b;
        };
      },
      CLASS: function CLASS(a) {
        var b = R[a + " "];
        return b || (b = new RegExp("(^|" + db + ")" + a + "(" + db + "|$)")) && R(a, function (a) {
          return b.test("string" == typeof a.className && a.className || _typeof(a.getAttribute) !== V && a.getAttribute("class") || "");
        });
      },
      ATTR: function ATTR(a, c, d) {
        return function (e) {
          var f = b.attr(e, a);
          return null == f ? "!=" === c : c ? (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0;
        };
      },
      CHILD: function CHILD(a, b, c, d, e) {
        var f = "nth" !== a.slice(0, 3),
            g = "last" !== a.slice(-4),
            h = "of-type" === b;
        return 1 === d && 0 === e ? function (a) {
          return !!a.parentNode;
        } : function (b, c, i) {
          var j,
              k,
              l,
              m,
              n,
              o,
              p = f !== g ? "nextSibling" : "previousSibling",
              q = b.parentNode,
              r = h && b.nodeName.toLowerCase(),
              s = !i && !h;

          if (q) {
            if (f) {
              for (; p;) {
                for (l = b; l = l[p];) {
                  if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                }

                o = p = "only" === a && !o && "nextSibling";
              }

              return !0;
            }

            if (o = [g ? q.firstChild : q.lastChild], g && s) {
              for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();) {
                if (1 === l.nodeType && ++m && l === b) {
                  k[a] = [P, n, m];
                  break;
                }
              }
            } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];else for (; (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b));) {
              ;
            }

            return m -= e, m === d || m % d === 0 && m / d >= 0;
          }
        };
      },
      PSEUDO: function PSEUDO(a, c) {
        var e,
            f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
        return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function (a, b) {
          for (var d, e = f(a, c), g = e.length; g--;) {
            d = bb.call(a, e[g]), a[d] = !(b[d] = e[g]);
          }
        }) : function (a) {
          return f(a, 0, e);
        }) : f;
      }
    },
    pseudos: {
      not: d(function (a) {
        var b = [],
            c = [],
            e = A(a.replace(ib, "$1"));
        return e[N] ? d(function (a, b, c, d) {
          for (var f, g = e(a, null, d, []), h = a.length; h--;) {
            (f = g[h]) && (a[h] = !(b[h] = f));
          }
        }) : function (a, d, f) {
          return b[0] = a, e(b, null, f, c), !c.pop();
        };
      }),
      has: d(function (a) {
        return function (c) {
          return b(a, c).length > 0;
        };
      }),
      contains: d(function (a) {
        return function (b) {
          return (b.textContent || b.innerText || x(b)).indexOf(a) > -1;
        };
      }),
      lang: d(function (a) {
        return nb.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(vb, wb).toLowerCase(), function (b) {
          var c;

          do {
            if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
          } while ((b = b.parentNode) && 1 === b.nodeType);

          return !1;
        };
      }),
      target: function target(b) {
        var c = a.location && a.location.hash;
        return c && c.slice(1) === b.id;
      },
      root: function root(a) {
        return a === H;
      },
      focus: function focus(a) {
        return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
      },
      enabled: function enabled(a) {
        return a.disabled === !1;
      },
      disabled: function disabled(a) {
        return a.disabled === !0;
      },
      checked: function checked(a) {
        var b = a.nodeName.toLowerCase();
        return "input" === b && !!a.checked || "option" === b && !!a.selected;
      },
      selected: function selected(a) {
        return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
      },
      empty: function empty(a) {
        for (a = a.firstChild; a; a = a.nextSibling) {
          if (a.nodeType < 6) return !1;
        }

        return !0;
      },
      parent: function parent(a) {
        return !w.pseudos.empty(a);
      },
      header: function header(a) {
        return qb.test(a.nodeName);
      },
      input: function input(a) {
        return pb.test(a.nodeName);
      },
      button: function button(a) {
        var b = a.nodeName.toLowerCase();
        return "input" === b && "button" === a.type || "button" === b;
      },
      text: function text(a) {
        var b;
        return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
      },
      first: j(function () {
        return [0];
      }),
      last: j(function (a, b) {
        return [b - 1];
      }),
      eq: j(function (a, b, c) {
        return [0 > c ? c + b : c];
      }),
      even: j(function (a, b) {
        for (var c = 0; b > c; c += 2) {
          a.push(c);
        }

        return a;
      }),
      odd: j(function (a, b) {
        for (var c = 1; b > c; c += 2) {
          a.push(c);
        }

        return a;
      }),
      lt: j(function (a, b, c) {
        for (var d = 0 > c ? c + b : c; --d >= 0;) {
          a.push(d);
        }

        return a;
      }),
      gt: j(function (a, b, c) {
        for (var d = 0 > c ? c + b : c; ++d < b;) {
          a.push(d);
        }

        return a;
      })
    }
  }, w.pseudos.nth = w.pseudos.eq;

  for (u in {
    radio: !0,
    checkbox: !0,
    file: !0,
    password: !0,
    image: !0
  }) {
    w.pseudos[u] = h(u);
  }

  for (u in {
    submit: !0,
    reset: !0
  }) {
    w.pseudos[u] = i(u);
  }

  l.prototype = w.filters = w.pseudos, w.setFilters = new l(), z = b.tokenize = function (a, c) {
    var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k = S[a + " "];
    if (k) return c ? 0 : k.slice(0);

    for (h = a, i = [], j = w.preFilter; h;) {
      (!d || (e = jb.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = kb.exec(h)) && (d = e.shift(), f.push({
        value: d,
        type: e[0].replace(ib, " ")
      }), h = h.slice(d.length));

      for (g in w.filter) {
        !(e = ob[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
          value: d,
          type: g,
          matches: e
        }), h = h.slice(d.length));
      }

      if (!d) break;
    }

    return c ? h.length : h ? b.error(a) : S(a, i).slice(0);
  }, A = b.compile = function (a, b) {
    var c,
        d = [],
        e = [],
        f = T[a + " "];

    if (!f) {
      for (b || (b = z(a)), c = b.length; c--;) {
        f = s(b[c]), f[N] ? d.push(f) : e.push(f);
      }

      f = T(a, t(e, d)), f.selector = a;
    }

    return f;
  }, B = b.select = function (a, b, c, d) {
    var e,
        f,
        g,
        h,
        i,
        j = "function" == typeof a && a,
        l = !d && z(a = j.selector || a);

    if (c = c || [], 1 === l.length) {
      if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
        if (b = (w.find.ID(g.matches[0].replace(vb, wb), b) || [])[0], !b) return c;
        j && (b = b.parentNode), a = a.slice(f.shift().value.length);
      }

      for (e = ob.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]);) {
        if ((i = w.find[h]) && (d = i(g.matches[0].replace(vb, wb), tb.test(f[0].type) && k(b.parentNode) || b))) {
          if (f.splice(e, 1), a = d.length && m(f), !a) return _.apply(c, d), c;
          break;
        }
      }
    }

    return (j || A(a, l))(d, b, !I, c, tb.test(a) && k(b.parentNode) || b), c;
  }, v.sortStable = N.split("").sort(U).join("") === N, v.detectDuplicates = !!E, F(), v.sortDetached = e(function (a) {
    return 1 & a.compareDocumentPosition(G.createElement("div"));
  }), e(function (a) {
    return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
  }) || f("type|href|height|width", function (a, b, c) {
    return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
  }), v.attributes && e(function (a) {
    return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
  }) || f("value", function (a, b, c) {
    return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;
  }), e(function (a) {
    return null == a.getAttribute("disabled");
  }) || f(cb, function (a, b, c) {
    var d;
    return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
  }), a.Sizzle = b, function (a) {
    a.find = b, a.expr = b.selectors, a.expr[":"] = a.expr.pseudos, a.unique = b.uniqueSort, a.text = b.getText, a.isXMLDoc = b.isXML, a.contains = b.contains, webshims.isReady("sizzle", !0);
  }(a.webshims && a.webshims.$ || a.jQuery, a.Sizzle);
}(window);