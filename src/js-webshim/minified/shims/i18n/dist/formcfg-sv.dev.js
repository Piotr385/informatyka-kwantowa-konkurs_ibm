"use strict";

webshims.validityMessages.sv = {
  typeMismatch: {
    defaultMessage: "Fyll i det h\xe4r f\xe4ltet.",
    email: "Fyll i en e-postadress.",
    url: "Fyll i en URL."
  },
  badInput: {
    defaultMessage: "Fyll i det h\xe4r f\xe4ltet.",
    number: "Fyll i ett nummer.",
    date: "Fyll i en datum.",
    time: "Fyll i en tid.",
    range: "Felaktig inmatning.",
    month: "Fyll i en m\xe5nad.",
    "datetime-local": "Fyll i datum och tid."
  },
  tooLong: "Fyll i max {%maxlength} tecken. Du fyllde i {%valueLen}.",
  tooShort: "Fyll i minst {%minlength} tecken. Du fyllde i {%valueLen}.",
  patternMismatch: "Felaktig inmatning. {%title}",
  valueMissing: {
    defaultMessage: "Fyll i detta f\xe4lt.",
    checkbox: "Bocka denna ruta f\xf6r att g\xe5 vidare.",
    select: "V\xe4lj n\xe5got ur listan.",
    radio: "V\xe4lj ett av valen."
  },
  rangeUnderflow: {
    defaultMessage: "V\xe4rdet m\xe5ste vara st\xf6rre eller lika med {%min}.",
    date: "Datumet m\xe5ste vara efter eller lika med {%min}.",
    time: "Tiden m\xe5ste vara efter eller lika med {%min}.",
    "datetime-local": "V\xe4rdet m\xe5ste vara efter eller lika med {%min}.",
    month: "V\xe4rdet m\xe5ste vara efter eller lika med {%min}."
  },
  rangeOverflow: {
    defaultMessage: "V\xe4rdet m\xe5ste vara mindre eller lika med {%max}.",
    date: "Datumet m\xe5ste vara f\xf6re eller lika med {%max}.",
    time: "Tiden m\xe5ste vara f\xf6re eller lika med {%max}.",
    "datetime-local": "V\xe4rdet m\xe5ste vara f\xf6re eller lika med {%max}.",
    month: "V\xe4rdet m\xe5ste vara f\xf6re eller lika med {%max}."
  },
  stepMismatch: "Felaktig inmatning."
}, webshims.formcfg.sv = {
  numberFormat: {
    ".": ".",
    ",": ","
  },
  numberSigns: ".",
  dateSigns: "-",
  timeSigns: ":. ",
  dFormat: "-",
  patterns: {
    d: "yy-mm-dd"
  },
  date: {
    closeText: "St\xe4ng",
    clear: "Rensa",
    prevText: "&#xAB;F\xf6rra",
    nextText: "N\xe4sta&#xBB;",
    currentText: "Idag",
    monthNames: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
    dayNamesShort: ["S\xf6n", "M\xe5n", "Tis", "Ons", "Tor", "Fre", "L\xf6r"],
    dayNames: ["S\xf6ndag", "M\xe5ndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "L\xf6rdag"],
    dayNamesMin: ["S\xf6", "M\xe5", "Ti", "On", "To", "Fr", "L\xf6"],
    weekHeader: "Ve",
    dateFormat: "yy-mm-dd",
    firstDay: 1,
    isRTL: !1,
    showMonthAfterYear: !1,
    yearSuffix: ""
  }
};