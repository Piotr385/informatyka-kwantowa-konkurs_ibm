"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

webshims.register("form-message", function (a, b, c, d, e, f) {
  "use strict";

  f.lazyCustomMessages && (f.customMessages = !0);
  var g = b.validityMessages,
      h = f.customMessages ? ["customValidationMessage"] : [];
  g.en = a.extend(!0, {
    typeMismatch: {
      defaultMessage: "Please enter a valid value.",
      email: "Please enter an email address.",
      url: "Please enter a URL."
    },
    badInput: {
      defaultMessage: "Please enter a valid value.",
      number: "Please enter a number.",
      date: "Please enter a date.",
      time: "Please enter a time.",
      range: "Invalid input.",
      month: "Please enter a valid value.",
      "datetime-local": "Please enter a datetime."
    },
    rangeUnderflow: {
      defaultMessage: "Value must be greater than or equal to {%min}."
    },
    rangeOverflow: {
      defaultMessage: "Value must be less than or equal to {%max}."
    },
    stepMismatch: "Invalid input.",
    tooLong: "Please enter at most {%maxlength} character(s). You entered {%valueLen}.",
    tooShort: "Please enter at least {%minlength} character(s). You entered {%valueLen}.",
    patternMismatch: "Invalid input. {%title}",
    valueMissing: {
      defaultMessage: "Please fill out this field.",
      checkbox: "Please check this box if you want to proceed."
    }
  }, g.en || g["en-US"] || {}), "object" == _typeof(g.en.valueMissing) && ["select", "radio"].forEach(function (a) {
    g.en.valueMissing[a] = g.en.valueMissing[a] || "Please select an option.";
  }), "object" == _typeof(g.en.rangeUnderflow) && ["date", "time", "datetime-local", "month"].forEach(function (a) {
    g.en.rangeUnderflow[a] = g.en.rangeUnderflow[a] || "Value must be at or after {%min}.";
  }), "object" == _typeof(g.en.rangeOverflow) && ["date", "time", "datetime-local", "month"].forEach(function (a) {
    g.en.rangeOverflow[a] = g.en.rangeOverflow[a] || "Value must be at or before {%max}.";
  }), g["en-US"] || (g["en-US"] = a.extend(!0, {}, g.en)), g["en-GB"] || (g["en-GB"] = a.extend(!0, {}, g.en)), g["en-AU"] || (g["en-AU"] = a.extend(!0, {}, g.en)), g[""] = g[""] || g["en-US"], g.de = a.extend(!0, {
    typeMismatch: {
      defaultMessage: "{%value} ist in diesem Feld nicht zul\xe4ssig.",
      email: "{%value} ist keine g\xfcltige E-Mail-Adresse.",
      url: "{%value} ist kein(e) g\xfcltige(r) Webadresse/Pfad."
    },
    badInput: {
      defaultMessage: "Geben Sie einen zul\xe4ssigen Wert ein.",
      number: "Geben Sie eine Nummer ein.",
      date: "Geben Sie ein Datum ein.",
      time: "Geben Sie eine Uhrzeit ein.",
      month: "Geben Sie einen Monat mit Jahr ein.",
      range: "Geben Sie eine Nummer.",
      "datetime-local": "Geben Sie ein Datum mit Uhrzeit ein."
    },
    rangeUnderflow: {
      defaultMessage: "{%value} ist zu niedrig. {%min} ist der unterste Wert, den Sie benutzen k\xf6nnen."
    },
    rangeOverflow: {
      defaultMessage: "{%value} ist zu hoch. {%max} ist der oberste Wert, den Sie benutzen k\xf6nnen."
    },
    stepMismatch: "Der Wert {%value} ist in diesem Feld nicht zul\xe4ssig. Hier sind nur bestimmte Werte zul\xe4ssig. {%title}",
    tooLong: "Der eingegebene Text ist zu lang! Sie haben {%valueLen} Zeichen eingegeben, dabei sind {%maxlength} das Maximum.",
    tooShort: "Der eingegebene Text ist zu kurz! Sie haben {%valueLen} Zeichen eingegeben, dabei sind {%minlength} das Minimum.",
    patternMismatch: "{%value} hat f\xfcr dieses Eingabefeld ein falsches Format. {%title}",
    valueMissing: {
      defaultMessage: "Bitte geben Sie einen Wert ein.",
      checkbox: "Bitte aktivieren Sie das K\xe4stchen."
    }
  }, g.de || {}), "object" == _typeof(g.de.valueMissing) && ["select", "radio"].forEach(function (a) {
    g.de.valueMissing[a] = g.de.valueMissing[a] || "Bitte w\xe4hlen Sie eine Option aus.";
  }), "object" == _typeof(g.de.rangeUnderflow) && ["date", "time", "datetime-local", "month"].forEach(function (a) {
    g.de.rangeUnderflow[a] = g.de.rangeUnderflow[a] || "{%value} ist zu fr\xfch. {%min} ist die fr\xfcheste Zeit, die Sie benutzen k\xf6nnen.";
  }), "object" == _typeof(g.de.rangeOverflow) && ["date", "time", "datetime-local", "month"].forEach(function (a) {
    g.de.rangeOverflow[a] = g.de.rangeOverflow[a] || "{%value} ist zu sp\xe4t. {%max} ist die sp\xe4teste Zeit, die Sie benutzen k\xf6nnen.";
  });

  var i = g[""],
      j = function j(b, c) {
    return b && "string" != typeof b && (b = b[a.prop(c, "type")] || b[(c.nodeName || "").toLowerCase()] || b.defaultMessage), b || "";
  },
      k = /</g,
      l = />/g,
      m = {
    value: 1,
    min: 1,
    max: 1
  },
      n = function () {
    var d,
        e = {
      number: function number(a) {
        var b = 1 * a;
        return b.toLocaleString && !isNaN(b) && (a = b.toLocaleString() || a), a;
      }
    },
        f = function f(b, c, d) {
      var f, g;
      return m[d] && (f = a.prop(c, "type"), g = a(c).getShadowElement().data("wsWidget" + f), g && g.formatValue ? b = g.formatValue(b, !1) : e[f] && (b = e[f](b))), b;
    };

    return [{
      n: "date",
      f: "toLocaleDateString"
    }, {
      n: "time",
      f: "toLocaleTimeString"
    }, {
      n: "datetime-local",
      f: "toLocaleString"
    }].forEach(function (a) {
      e[a.n] = function (b) {
        var c = new Date(b);
        return c && c[a.f] && (b = c[a.f]() || b), b;
      };
    }), c.Intl && Intl.DateTimeFormat && (d = new Intl.DateTimeFormat(navigator.browserLanguage || navigator.language, {
      year: "numeric",
      month: "2-digit"
    }).format(new Date()), d && d.format && (e.month = function (a) {
      var b = new Date(a);
      return b && (a = d.format(b) || a), a;
    })), b.format = {}, ["date", "number", "month", "time", "datetime-local"].forEach(function (a) {
      b.format[a] = function (c, d) {
        return d && d.nodeType ? f(c, d, a) : ("number" == a && d && d.toFixed && (c = 1 * c, (!d.fixOnlyFloat || c % 1) && (c = c.toFixed(d.toFixed))), b._format && b._format[a] ? b._format[a](c, d) : e[a](c));
      };
    }), f;
  }();

  b.replaceValidationplaceholder = function (c, d, e) {
    var f = a.prop(c, "title");
    return d && ("patternMismatch" != e || f || b.error("no title for patternMismatch provided. Always add a title attribute."), f && (f = '<span class="ws-titlevalue">' + f.replace(k, "&lt;").replace(l, "&gt;") + "</span>"), -1 != d.indexOf("{%title}") ? d = d.replace("{%title}", f) : f && (d = d + " " + f)), d && -1 != d.indexOf("{%") && ["value", "min", "max", "maxlength", "minlength", "label"].forEach(function (b) {
      if (-1 !== d.indexOf("{%" + b)) {
        var e = ("label" == b ? a.trim(a('label[for="' + c.id + '"]', c.form).text()).replace(/\*$|:$/, "") : a.prop(c, b) || a.attr(c, b) || "") || "";
        e = "" + e, e = n(e, c, b), d = d.replace("{%" + b + "}", e.replace(k, "&lt;").replace(l, "&gt;")), "value" == b && (d = d.replace("{%valueLen}", e.length));
      }
    }), d;
  }, b.createValidationMessage = function (c, d) {
    var e = j(i[d], c);
    return e || "badInput" != d || (e = j(i.typeMismatch, c)), e || "typeMismatch" != d || (e = j(i.badInput, c)), e || (e = j(g[""][d], c) || (a.prop(c, "validationMessage") || "").replace(k, "&lt;").replace(l, "&gt;"), "customError" != d && b.info("could not find errormessage for: " + d + " / " + a.prop(c, "type") + ". in language: " + b.activeLang())), e = b.replaceValidationplaceholder(c, e, d), e || "";
  }, (!b.support.formvalidation || b.bugs.bustedValidity) && h.push("validationMessage"), i = b.activeLang(g), a(g).on("change", function () {
    i = g.__active;
  }), h.forEach(function (c) {
    b.defineNodeNamesProperty(["fieldset", "output", "button"], c, {
      prop: {
        value: "",
        writeable: !1
      }
    }), ["input", "select", "textarea"].forEach(function (d) {
      var e = b.defineNodeNameProperty(d, c, {
        prop: {
          get: function get() {
            var c = this,
                d = "";
            if (!a.prop(c, "willValidate")) return d;
            var f = a.prop(c, "validity") || {
              valid: 1
            };
            return f.valid ? d : (d = b.getContentValidationMessage(c, f)) ? d : f.customError && c.nodeName && (d = b.support.formvalidation && !b.bugs.bustedValidity && e.prop._supget ? e.prop._supget.call(c) : b.data(c, "customvalidationMessage")) ? d : (a.each(f, function (a, e) {
              return "valid" != a && e ? (d = b.createValidationMessage(c, a), d ? !1 : void 0) : void 0;
            }), d || "");
          },
          writeable: !1
        }
      });
    });
  });
});