"use strict";

webshims.validityMessages.hu = {
  typeMismatch: {
    email: "\xcdrjon be egy e-mail c\xedmet.",
    url: "\xcdrjon be egy URL-t."
  },
  badInput: {
    number: "\xc9rv\xe9nytelen \xe9rt\xe9k.",
    date: "\xc9rv\xe9nytelen \xe9rt\xe9k.",
    time: "\xc9rv\xe9nytelen \xe9rt\xe9k.",
    range: "\xc9rv\xe9nytelen \xe9rt\xe9k.",
    "datetime-local": "\xc9rv\xe9nytelen \xe9rt\xe9k."
  },
  tooLong: "\xc9rv\xe9nytelen \xe9rt\xe9k.",
  patternMismatch: "A k\xe9rt form\xe1tumban adja meg az adatot: {%title}.",
  valueMissing: {
    defaultMessage: "T\xF6ltse ki ezt a mez\u0151t.",
    checkbox: "Jel\xf6lje be ezt a n\xe9gyzetet a folytat\xe1shoz.",
    select: "Jel\xf6lj\xf6n ki egy elemet a list\xe1b\xf3l.",
    radio: "Jel\xF6lj\xF6n ki egyet a lehet\u0151s\xE9gek k\xF6z\xFCl."
  },
  rangeUnderflow: {
    defaultMessage: "Az \xE9rt\xE9k legyen nagyobb vagy egyenl\u0151, mint {%min}.",
    date: "Az \xE9rt\xE9k legyen nagyobb vagy egyenl\u0151, mint {%min}.",
    time: "Az \xE9rt\xE9k legyen nagyobb vagy egyenl\u0151, mint {%min}.",
    "datetime-local": "Az \xE9rt\xE9k legyen nagyobb vagy egyenl\u0151, mint {%min}."
  },
  rangeOverflow: {
    defaultMessage: "Az \xE9rt\xE9k legyen kisebb vagy egyenl\u0151, mint {%max}.",
    date: "Az \xE9rt\xE9k legyen kisebb vagy egyenl\u0151, mint {%max}.",
    time: "Az \xE9rt\xE9k legyen kisebb vagy egyenl\u0151, mint {%max}.",
    "datetime-local": "Az \xE9rt\xE9k legyen kisebb vagy egyenl\u0151, mint {%max}."
  },
  stepMismatch: "\xc9rv\xe9nytelen \xe9rt\xe9k."
}, webshims.formcfg.hu = {
  numberFormat: {
    ".": ".",
    ",": ","
  },
  numberSigns: ".",
  dateSigns: ".",
  timeSigns: ":. ",
  dFormat: ".",
  patterns: {
    d: "yy.mm.dd"
  },
  date: {
    closeText: "bez\xe1r",
    prevText: "vissza",
    nextText: "el\u0151re",
    currentText: "ma",
    monthNames: ["Janu\xe1r", "Febru\xe1r", "M\xe1rcius", "\xc1prilis", "M\xe1jus", "J\xfanius", "J\xfalius", "Augusztus", "Szeptember", "Okt\xf3ber", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "M\xe1r", "\xc1pr", "M\xe1j", "J\xfan", "J\xfal", "Aug", "Szep", "Okt", "Nov", "Dec"],
    dayNames: ["Vas\xe1rnap", "H\xE9tf\u0151", "Kedd", "Szerda", "Cs\xfct\xf6rt\xf6k", "P\xe9ntek", "Szombat"],
    dayNamesShort: ["Vas", "H\xe9t", "Ked", "Sze", "Cs\xfc", "P\xe9n", "Szo"],
    dayNamesMin: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
    weekHeader: "H\xe9t",
    firstDay: 1,
    isRTL: !1,
    showMonthAfterYear: !0,
    yearSuffix: ""
  }
};