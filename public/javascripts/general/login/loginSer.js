"use strict";


/*El use strict hace que se deba codificar de manera correcta, siendo estricto
 * a la hora de compilar el codigo ejemplo:
 * x = 3.14; // This will cause an error (x is not defined)*/



/* global app */


/*************servicio vs factory vs provider***************/
/*Todas son SINGLETON (Unicamente puede ser instanciada una vez en el contexto
 * en el cual se encuentre)*/


/*Se define el servicio (app.service(nombre servicio, funcionalidad))*/
/*El $http es un servicio por defecto para consumir GET,POST,ETC. El
 * $httpParamSerializerJQLike es necesario, debido a que angular empaqueta los
 * datos diferente a como se hacia en jquery  y muchos webservices no encuentran
 * los datos que les llega, por lo que se hace necesario serializarlos como
 * jquery para que lleguen al servidor*/
app.service('loginService', function ($http, $httpParamSerializerJQLike) {
    this.login = function (login) {
        var promise = $http({
            method: "POST",
            url: "/login",
            data: $httpParamSerializerJQLike({
                mail: login.mail,
                clave:login.clave}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });
        return promise;
    };

    // this.redireccionar = function (pagina) {
    //     var promise = $http({
    //         method: "GE",
    //         url: "/inicio"
    //     }).then(function mySucces(response) {
    //         return response.data;
    //     }, function myError(response) {
    //         alert("Error");
    //         alert(response.statusText);
    //     });
    //     return promise;
    // };


    this.logOut = function () {
        var promise = $http({
            method: "GET",
            url: "/logout"
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });
        return promise;
    };






});
