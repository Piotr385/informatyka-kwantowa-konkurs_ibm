"use strict";

webshims.validityMessages.fi = {
  typeMismatch: {
    defaultMessage: "Ole hyv\xe4 ja sy\xf6t\xe4 kelvollinen arvo.",
    email: "Sy\xf6t\xe4 kelvollinen s\xe4hk\xf6postiosoite.",
    url: "Sy\xf6t\xe4 kelvollinen URL-osoite."
  },
  badInput: {
    defaultMessage: "Ole hyv\xe4 ja sy\xf6t\xe4 kelvollinen arvo.",
    number: "Sy\xf6t\xe4 numero.",
    date: "Sy\xf6t\xe4 p\xe4iv\xe4m\xe4\xe4r\xe4.",
    time: "Sy\xf6t\xe4 kellonaika.",
    month: "Sy\xf6t\xe4 kuukausi.",
    range: "Sy\xf6t\xe4 oikea arvo.",
    "datetime-local": "Sy\xf6t\xe4 oikea ajankohta."
  },
  rangeUnderflow: {
    defaultMessage: "Arvon on oltava isompi tai yht\xe4 kuin {%min}.",
    date: "Arvon on oltava {%min} tai suurempi.",
    time: "Arvon on oltava {%min} tai suurempi.",
    "datetime-local": "Arvon on oltava {%min} tai suurempi.",
    month: "Arvon on oltava {%min} tai suurempi."
  },
  rangeOverflow: {
    defaultMessage: "Arvon on oltava pienempi tai yht\xe4 kuin {%min}.",
    date: "Arvon on oltava {%min} tai pienempi.",
    time: "Arvon on oltava {%min} tai pienempi.",
    "datetime-local": "Arvon on oltava {%min} tai pienempi.",
    month: "Arvon on oltava {%min} tai pienempi."
  },
  stepMismatch: "Virheellinen arvo.",
  tooLong: "Sy\xf6t\xe4 enint\xe4\xe4n {%maxlength} merkki\xe4. Nykyinen {%valueLen} on liikaa.",
  tooShort: "Sy\xf6t\xe4 v\xe4hint\xe4\xe4n {%minlength} merkki\xe4. Nykyinen {%valueLen} on liikaa.",
  patternMismatch: "Virheellinen arvo. {%title}",
  valueMissing: {
    defaultMessage: "Ole hyv\xe4 ja t\xe4yt\xe4 t\xe4m\xe4 kentt\xe4.",
    checkbox: "Ole hyv\xe4 ja valitse t\xe4m\xe4 kentt\xe4 jatkaaksesi.",
    select: "Ole hyv\xe4 ja tee valinta.",
    radio: "Ole hyv\xe4 ja tee valinta."
  }
}, webshims.formcfg.fi = {
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
    currentText: "Kuluva kuukausi"
  },
  time: {
    currentText: "Nyt"
  },
  date: {
    close: "Sulje",
    clear: "Tyhjenn\xe4",
    prevText: "Edellinen",
    nextText: "Seuraava",
    currentText: "T\xe4n\xe4\xe4n",
    monthNames: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes\xe4kuu", "Hein\xe4kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"],
    monthNamesShort: ["Tam", "Hel", "Maa", "Huht", "Tou", "Kes", "Hei", "Elo", "Syys", "Lok", "Mar", "Jou"],
    dayNames: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"],
    dayNamesShort: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
    dayNamesMin: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
    weekHeader: "Vko",
    firstDay: 1,
    isRTL: !1,
    showMonthAfterYear: !1,
    yearSuffix: ""
  }
};