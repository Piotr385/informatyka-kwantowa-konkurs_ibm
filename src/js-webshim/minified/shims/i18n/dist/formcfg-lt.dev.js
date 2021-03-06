"use strict";

webshims.validityMessages.lt = {
  typeMismatch: {
    defaultMessage: "Pra\u0161om \u012Fvesti teising\u0105 reik\u0161m\u0119.",
    email: "Pra\u0161om \u012Fvesti el. pa\u0161to adres\u0105.",
    url: "Pra\u0161om \u012Fvesti nuorod\u0105 (URL)."
  },
  badInput: {
    defaultMessage: "Pra\u0161om \u012Fvesti teising\u0105 reik\u0161m\u0119.",
    number: "Pra\u0161om \u012Fvesti skai\u010Di\u0173.",
    date: "Pra\u0161om \u012Fvesti dat\u0105.",
    time: "Pra\u0161om \u012Fvesti laik\u0105.",
    range: "Neteisingas skai\u010Di\u0173 r\u0117\u017Eis.",
    month: "Pra\u0161om \u012Fvesti m\u0117nes\u012F.",
    "datetime-local": "Pra\u0161om \u012Fvesti dat\u0105 ir laik\u0105."
  },
  rangeUnderflow: {
    defaultMessage: "Reik\u0161m\u0117 privalo b\u016Bti didesn\u0117 arba lygi {%min}.",
    date: "Data turi b\u016Bti ne ankstesn\u0117 negu {%min}.",
    time: "Laikas turi b\u016Bti ne ankstesnis negu {%min}.",
    "datetime-local": "Data ir laikas turi b\u016Bti ne ankstesni negu {%min}.",
    month: "M\u0117nuo turi b\u016Bti {%min} arba v\u0117lesnis."
  },
  rangeOverflow: {
    defaultMessage: "Reik\u0161m\u0117 privalo b\u016Bti ma\u017Eesn\u0117 arba lygi {%max}.",
    date: "Data turi b\u016Bti ne v\u0117lesn\u0117 negu {%max}.",
    time: "Laikas turi b\u016Bti ne v\u0117lesnis negu {%max}.",
    "datetime-local": "Data ir laikas turi b\u016Bti ne v\u0117lesni negu {%max}.",
    month: "M\u0117nuo turi b\u016Bti {%max} arba ankstesnis."
  },
  stepMismatch: "Neteisinga reik\u0161m\u0117.",
  tooLong: "Pra\u0161om \u012Fvesti ne daugiau negu {%maxlength} simboli\u0173. J\u016Bs \u012Fved\u0117te {%valueLen}.",
  patternMismatch: "Neteisinga lauko {%title} reik\u0161m\u0117.",
  valueMissing: {
    defaultMessage: "\u0160is laukas yra privalomas.",
    checkbox: "Pra\u0161ome pa\u017Eym\u0117ti \u0161\u012F \u017Eymim\u0105j\u012F laukel\u012F, jis yra privalomas.",
    select: "Pra\u0161om pasirinkti reik\u0161m\u0119 i\u0161 s\u0105ra\u0161o.",
    radio: "Pra\u0161om pasirinkti vien\u0105 i\u0161 reik\u0161mi\u0173."
  }
}, webshims.formcfg.lt = {
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
  month: {
    currentText: "\u0161\u012F m\u0117nes\u012F"
  },
  date: {
    closeText: "U\u017Edaryti",
    clear: "Tu\u0161tinti",
    prevText: "Atgal",
    nextText: "Kitas",
    currentText: "\u0160iandien",
    monthNames: ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegu\u017E\u0117", "Bir\u017Eelis", "Liepa", "Rugpj\u016Btis", "Rugs\u0117jis", "Spalis", "Lapkritis", "Gruodis"],
    monthNamesShort: ["Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rugp", "Rugs", "Spa", "Lap", "Gruo"],
    dayNames: ["Sekmadienis", "Pirmadienis", "Antradienis", "Tre\u010Diadienis", "Ketvirtadienis", "Penktadienis", "\u0160e\u0161tadienis"],
    dayNamesShort: ["Sek", "Pir", "Ant", "Tre", "Ket", "Pen", "\u0160e\u0161"],
    dayNamesMin: ["S", "P", "A", "T", "K", "Pn", "\u0160"],
    weekHeader: "Sav.",
    firstDay: 1,
    isRTL: !1,
    showMonthAfterYear: !0,
    yearSuffix: ""
  }
}, webshims.validityMessages["lt-LT"] = webshims.validityMessages.lt, webshims.formcfg["lt-LT"] = webshims.formcfg.lt;