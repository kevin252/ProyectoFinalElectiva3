"use strict";

/*El use strict hace que se deba codificar de manera correcta, siendo estricto
 * a la hora de compilar el codigo ejemplo:
 * x = 3.14; // This will cause an error (x is not defined)*/

/*Se definen las depenciencias que seran utilizadas por el sistema, son varias
 * se separan asi: ['ngRoute', 'ngCookies', 'xxxxx']*/
var app = angular.module("appMasterPage",['ngRoute']);

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
