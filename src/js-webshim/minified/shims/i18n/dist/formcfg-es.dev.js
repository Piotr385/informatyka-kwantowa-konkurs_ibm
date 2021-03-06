"use strict";

webshims.validityMessages.es = {
  typeMismatch: {
    email: "Por favor, introduzca una direcci\xf3n de correo.",
    url: "Por favor, introduzca una URL."
  },
  badInput: {
    number: "Valor no v\xe1lido",
    date: "Valor no v\xe1lido",
    time: "Valor no v\xe1lido",
    range: "Valor no v\xe1lido",
    "datetime-local": "Valor no v\xe1lido"
  },
  tooLong: "Valor no v\xe1lido",
  patternMismatch: "Por favor, aj\xfastese al formato solicitado: {%title}.",
  valueMissing: {
    defaultMessage: "Por favor, rellene este campo.",
    checkbox: "Por favor, marque esta casilla si desea continuar.",
    select: "Por favor, seleccione un elemento de la lista.",
    radio: "Por favor, seleccione una de estas opciones."
  },
  rangeUnderflow: {
    defaultMessage: "El valor debe superior o igual a {%min}.",
    date: "El valor debe superior o igual a {%min}.",
    time: "El valor debe superior o igual a {%min}.",
    "datetime-local": "El valor debe superior o igual a {%min}."
  },
  rangeOverflow: {
    defaultMessage: "El valor debe inferior o igual a {%max}.",
    date: "El valor debe inferior o igual a {%max}.",
    time: "El valor debe inferior o igual a {%max}.",
    "datetime-local": "El valor debe inferior o igual a {%max}."
  },
  stepMismatch: "Valor no v\xe1lido"
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
    closeText: "Cerrar",
    prevText: "&#x3C;Ant",
    nextText: "Sig&#x3E;",
    currentText: "Hoy",
    monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    dayNames: ["Domingo", "Lunes", "Martes", "Mi\xe9rcoles", "Jueves", "Viernes", "S\xe1bado"],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mi\xe9", "Juv", "Vie", "S\xe1b"],
    dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "S\xe1"],
    weekHeader: "Sm",
    firstDay: 1,
    isRTL: !1,
    showMonthAfterYear: !1,
    yearSuffix: ""
  }
};