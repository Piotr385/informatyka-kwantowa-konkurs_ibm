"use strict";

webshims.validityMessages.pt = {
  typeMismatch: {
    email: "Por favor escreva um endere\xe7o de correio.",
    url: "Por favor escreva o URL."
  },
  badInput: {
    defaultMessage: "Valor inv\xe1lido.",
    number: "Valor inv\xe1lido.",
    date: "Valor inv\xe1lido.",
    time: "Valor inv\xe1lido.",
    range: "Valor inv\xe1lido.",
    "datetime-local": "Valor inv\xe1lido."
  },
  tooLong: "Valor inv\xe1lido.",
  patternMismatch: "Por favor corresponda ao formato pedido: {%title}.",
  valueMissing: {
    defaultMessage: "Por favor preencha este campo.",
    checkbox: "Por favor seleccione esta caixa se deseja continuar.",
    select: "Por favor seleccione um item da lista.",
    radio: "Por favor seleccione uma destas op\xe7\xf5es."
  },
  rangeUnderflow: {
    defaultMessage: "O valor tem de ser superior ou igual a {%min}.",
    date: "O valor tem de ser superior ou igual a {%min}.",
    time: "O valor tem de ser superior ou igual a {%min}.",
    "datetime-local": "O valor tem de ser superior ou igual a {%min}."
  },
  rangeOverflow: {
    defaultMessage: "O valor tem de ser inferior ou igual a {%max}.",
    date: "O valor tem de ser inferior ou igual a {%max}.",
    time: "O valor tem de ser inferior ou igual a {%max}.",
    "datetime-local": "O valor tem de ser inferior ou igual a {%max}."
  },
  stepMismatch: "Valor inv\xe1lido."
}, webshims.formcfg.pt = {
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
    closeText: "Fechar",
    prevText: "&#x3C;Anterior",
    nextText: "Seguinte",
    currentText: "Hoje",
    monthNames: ["Janeiro", "Fevereiro", "Mar\xe7o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    dayNames: ["Domingo", "Segunda-feira", "Ter\xe7a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "S\xe1bado"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xe1b"],
    dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xe1b"],
    weekHeader: "Sem",
    firstDay: 0,
    isRTL: !1,
    showMonthAfterYear: !1,
    yearSuffix: ""
  }
};