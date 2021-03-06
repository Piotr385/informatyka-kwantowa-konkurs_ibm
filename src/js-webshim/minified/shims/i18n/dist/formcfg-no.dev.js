"use strict";

webshims.validityMessages.no = {
  typeMismatch: {
    defaultMessage: "Vennligst skriv en gyldig verdi.",
    email: "Vennligst skriv inn en e-postadresse.",
    url: "Vennligst skriv inn en URL."
  },
  badInput: {
    defaultMessage: "Vennligst skriv en gyldig verdi.",
    number: "Vennligst skriv inn et tall.",
    date: "Vennligst skriv inn en dato.",
    time: "Vennligst skriv inn et klokkeslett.",
    range: "Ugyldig data.",
    month: "Vennligst skriv en gyldig verdi.",
    "datetime-local": "Vennligst skriv inn dato & tid"
  },
  rangeUnderflow: {
    defaultMessage: "Verdi m\xe5 v\xe6re st\xf8rre eller lik {%min}.",
    date: "Verdi m\xe5 v\xe6re p\xe5 eller etter {%min}.",
    time: "Verdi m\xe5 v\xe6re p\xe5 eller etter {%min}.",
    "datetime-local": "Verdi m\xe5 v\xe6re p\xe5 eller etter {%min}.",
    month: "Verdi m\xe5 v\xe6re p\xe5 eller etter {%min}."
  },
  rangeOverflow: {
    defaultMessage: "Verdi m\xe5 v\xe6re mindre eller lik {%max}.",
    date: "Verdi m\xe5 v\xe6re p\xe5 eller f\xf8r {%max}.",
    time: "Verdi m\xe5 v\xe6re p\xe5 eller f\xf8r {%max}.",
    "datetime-local": "Verdi m\xe5 v\xe6re p\xe5 eller f\xf8r {%max}.",
    month: "Verdi m\xe5 v\xe6re p\xe5 eller f\xf8r {%max}."
  },
  stepMismatch: "Ugyldig inndata.",
  tooLong: "Vennligst fyll inn maks {%maxlength} tegn. Du skrev inn {%valueLen}.",
  tooShort: "Vennlist fyll inn minst {%minlength} tegn. Du skrev inn {%valueLen}.",
  patternMismatch: "Ugyldig data. {%title}",
  valueMissing: {
    defaultMessage: "Vennligst fyll inn dette feltet.",
    checkbox: "Vennligst kryss av i denne boksen om du \xf8nsker \xe5 fortsette.",
    select: "Vennligst velg.",
    radio: "Vennligst velg."
  }
}, webshims.formcfg.no = {
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
  meridian: ["AM", "PM"],
  month: {
    currentText: "Denne m\xe5ned"
  },
  time: {
    currentText: "N\xe5"
  },
  date: {
    closeText: "Ferdig",
    clear: "T\xf8m",
    prevText: "Forrige",
    nextText: "Neste",
    currentText: "I dag",
    monthNames: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
    dayNames: ["S\xf8ndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "L\xf8rdag"],
    dayNamesShort: ["S\xf8n", "Man", "Tir", "Ons", "Tor", "Fre", "L\xf8r"],
    dayNamesMin: ["S\xf8", "Ma", "Ti", "On", "To", "Fr", "L\xf8"],
    weekHeader: "Uke",
    firstDay: 1,
    isRTL: !1,
    showMonthAfterYear: !1,
    yearSuffix: ""
  }
};