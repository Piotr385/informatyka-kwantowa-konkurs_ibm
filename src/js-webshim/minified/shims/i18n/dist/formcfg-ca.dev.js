"use strict";

webshims.validityMessages.es = {
  typeMismatch: {
    email: "Si us plau, introdu\xefu una adre\xe7a de correu.",
    url: "Si us plau, introdu\xefu un URL."
  },
  badInput: {
    number: "Valor no v\xe1lid",
    date: "Valor no v\xe1lid",
    time: "Valor no v\xe1lid",
    range: "Valor no v\xe1lid",
    "datetime-local": "Valor no v\xe1lid"
  },
  tooLong: "Valor no v\xe1lid",
  patternMismatch: "Si us plau, ajusteu-vos al format sol\xb7licitat: {%title}.",
  valueMissing: {
    defaultMessage: "Si us plau, ompliu aquest camp.",
    checkbox: "Si us plau, marqueu aquesta casella si voleu continuar.",
    select: "Si us plau, seleccioneu un element de la llista.",
    radio: "Si us plau, seleccioneu una de les opcions."
  },
  rangeUnderflow: {
    defaultMessage: "El valor ha de superior o igual a {%min}.",
    date: "El valor ha de superior o igual a {%min}.",
    time: "El valor ha de superior o igual a {%min}.",
    "datetime-local": "El valor ha de superior o igual a {%min}."
  },
  rangeOverflow: {
    defaultMessage: "El valor ha de inferior o igual a {%max}.",
    date: "El valor ha de inferior o igual a {%max}.",
    time: "El valor ha de inferior o igual a {%max}.",
    "datetime-local": "El valor ha de inferior o igual a {%max}."
  },
  stepMismatch: "Valor no v\xe1lid"
}, webshims.formcfg.es = {
  numberFormat: {
    ".": ".",
    ",": ","
  },
  numberSigns: ".",
  dateSigns: "/",
  timeSigns: ":. ",
  dFormat: "/",
  patterns: {
    d: "dd/mm/yy"
  },
  date: {
    closeText: "Tanca",
    prevText: "&#x3C;Ant",
    nextText: "Seg&#x3E;",
    currentText: "Avui",
    monthNames: ["gener", "gebrer", "mar\xe7", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
    monthNamesShort: ["gen", "febr", "mar\xe7", "abr", "maig", "juny", "jul", "ag", "set", "oct", "nov", "des"],
    dayNames: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"],
    dayNamesShort: ["dg", "dl", "dt", "dc", "dj", "dv", "ds"],
    dayNamesMin: ["dg", "dl", "dt", "dc", "dj", "dv", "ds"],
    weekHeader: "St",
    firstDay: 1,
    isRTL: !1,
    showMonthAfterYear: !1,
    yearSuffix: ""
  }
};