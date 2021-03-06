"use strict";

webshims.validityMessages.fr = {
  typeMismatch: {
    defaultMessage: "Veuillez saisir une valeur valide.",
    email: "Veuillez saisir une adresse courriel valide.",
    url: "Veuillez saisir une URL."
  },
  badInput: {
    defaultMessage: "Veuillez saisir une valeur valide.",
    number: "Veuillez saisir un nombre valide.",
    date: "Veuillez saisir une date valide.",
    month: "Veuillez saisir un mois valide.",
    week: "Veuillez saisir un num\xe9ro de semaine valide.",
    time: "Veuillez saisir une heure valide.",
    range: "Veuillez saisir une borne valide.",
    "datetime-local": "Veuillez saisir une date valide."
  },
  tooLong: "Contenu saisi trop long.",
  patternMismatch: "Veuillez modifier la valeur du champ pour correspondre au format demand\xe9 : {%title}.",
  valueMissing: {
    defaultMessage: "Veuillez compl\xe9ter ce champ.",
    checkbox: "Veuillez cocher cette case si vous d\xe9sirez poursuivre.",
    select: "Veuillez s\xe9lectionner un \xe9l\xe9ment de la liste.",
    radio: "Veuillez s\xe9lectionner l'une de ces options."
  },
  rangeUnderflow: {
    defaultMessage: "Cette valeur doit \xeatre sup\xe9rieure ou \xe9gale \xe0 {%min}.",
    date: "Cette valeur doit \xeatre sup\xe9rieure ou \xe9gale \xe0 {%min}.",
    time: "Cette valeur doit \xeatre sup\xe9rieure ou \xe9gale \xe0 {%min}.",
    "datetime-local": "Cette valeur doit \xeatre sup\xe9rieure ou \xe9gale \xe0 {%min}."
  },
  rangeOverflow: {
    defaultMessage: "Cette valeur doit \xeatre inf\xe9rieure ou \xe9gale \xe0 {%max}",
    date: "Cette valeur doit \xeatre inf\xe9rieure ou \xe9gale \xe0 {%max}",
    time: "Cette valeur doit \xeatre inf\xe9rieure ou \xe9gale \xe0 {%max}",
    "datetime-local": "Cette valeur doit \xeatre inf\xe9rieure ou \xe9gale \xe0 {%max}"
  },
  stepMismatch: "Valeur incorrecte"
}, webshims.formcfg.fr = {
  numberFormat: {
    ".": ",",
    ",": " "
  },
  numberSigns: ".",
  dateSigns: "/",
  timeSigns: ":. ",
  dFormat: "/",
  patterns: {
    d: "dd/mm/yy"
  },
  month: {
    currentText: "Ce mois-ci"
  },
  week: {
    currentText: "Cette semaine-ci"
  },
  date: {
    closeText: "Fermer",
    clear: "Effacer",
    prevText: "Pr\xe9c\xe9dent",
    nextText: "Suivant",
    currentText: "Aujourd'hui",
    monthNames: ["Janvier", "F\xe9vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao\xfbt", "Septembre", "Octobre", "Novembre", "D\xe9cembre"],
    monthNamesShort: ["Janv", "F\xe9vr", "Mars", "Avril", "Mai", "Juin", "Juil", "Ao\xfbt", "Sept", "Oct", "Nov", "D\xe9c"],
    dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
    dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
    dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
    weekHeader: "Sem",
    firstDay: 1,
    isRTL: !1,
    showMonthAfterYear: !1,
    yearSuffix: ""
  }
};