"use strict";

webshims.validityMessages.de = {
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
    defaultMessage: "{%value} ist zu niedrig. {%min} ist der unterste Wert, den Sie benutzen k\xf6nnen.",
    date: "{%value} ist zu fr\xfch. {%min} ist die fr\xfcheste Zeit, die Sie benutzen k\xf6nnen.",
    time: "{%value} ist zu fr\xfch. {%min} ist die fr\xfcheste Zeit, die Sie benutzen k\xf6nnen.",
    "datetime-local": "{%value} ist zu fr\xfch. {%min} ist die fr\xfcheste Zeit, die Sie benutzen k\xf6nnen.",
    month: "{%value} ist zu fr\xfch. {%min} ist die fr\xfcheste Zeit, die Sie benutzen k\xf6nnen."
  },
  rangeOverflow: {
    defaultMessage: "{%value} ist zu hoch. {%max} ist der oberste Wert, den Sie benutzen k\xf6nnen.",
    date: "{%value} ist zu sp\xe4t. {%max} ist die sp\xe4teste Zeit, die Sie benutzen k\xf6nnen.",
    time: "{%value} ist zu sp\xe4t. {%max} ist die sp\xe4teste Zeit, die Sie benutzen k\xf6nnen.",
    "datetime-local": "{%value} ist zu sp\xe4t. {%max} ist die sp\xe4teste Zeit, die Sie benutzen k\xf6nnen.",
    month: "{%value} ist zu sp\xe4t. {%max} ist die sp\xe4teste Zeit, die Sie benutzen k\xf6nnen."
  },
  stepMismatch: "Der Wert {%value} ist in diesem Feld nicht zul\xe4ssig. Hier sind nur bestimmte Werte zul\xe4ssig. {%title}",
  tooLong: "Der eingegebene Text ist zu lang! Sie haben {%valueLen} Zeichen eingegeben, dabei sind {%maxlength} das Maximum.",
  tooShort: "Der eingegebene Text ist zu kurz! Sie haben {%valueLen} Zeichen eingegeben, dabei sind {%minlength} das Minimum.",
  patternMismatch: "{%value} hat f\xfcr dieses Eingabefeld ein falsches Format. {%title}",
  valueMissing: {
    defaultMessage: "Bitte geben Sie einen Wert ein.",
    checkbox: "Bitte aktivieren Sie das K\xe4stchen.",
    select: "Bitte w\xe4hlen Sie eine Option aus.",
    radio: "Bitte w\xe4hlen Sie eine Option aus."
  }
}, webshims.formcfg.de = {
  numberFormat: {
    ",": ".",
    ".": ","
  },
  timeSigns: ":. ",
  numberSigns: ",",
  dateSigns: ".",
  dFormat: ".",
  patterns: {
    d: "dd.mm.yy"
  },
  month: {
    currentText: "Aktueller Monat"
  },
  time: {
    currentText: "Jetzt"
  },
  date: {
    close: "schlie\xdfen",
    clear: "L\xf6schen",
    prevText: "Zur\xfcck",
    nextText: "Vor",
    currentText: "Heute",
    monthNames: ["Januar", "Februar", "M\xe4rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    monthNamesShort: ["Jan", "Feb", "M\xe4r", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
    dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    weekHeader: "KW",
    firstDay: 1,
    isRTL: !1,
    showMonthAfterYear: !1,
    yearSuffix: ""
  }
};