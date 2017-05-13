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
app.service('cargoService', function ($http, $httpParamSerializerJQLike) {
    this.crearCargo = function (cargo) {
        var promise = $http({
            method: "POST",
            url: "/crearCargo",
            data: $httpParamSerializerJQLike({
                nombre: cargo.nombre,
                descripcion: cargo.descripcion,
                salario:cargo.salario,
                horario:cargo.horario,
                proyecto: cargo.proyecto}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });
        return promise;
    };

    this.editarCargo = function (cargo) {
        var promise = $http({
            method: "post",
            url: "/editarCargo",
            data: $httpParamSerializerJQLike({
              id:cargo.id,
              nombre: cargo.nombre,
              descripcion: cargo.descripcion,
              salario:cargo.salario,
              horario:cargo.horario,
              proyecto: cargo.proyecto}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });
        return promise;
    };

    this.listarProyectos = function () {
        var promise = $http({
            method: "get",
            url: "/listarProyectos"
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });
        return promise;
    };



    this.listar = function () {
        var promise = $http({
            method: "get",
            url: "/listarCargos"
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });
        return promise;
    };

    this.eliminarCargo = function (cargo) {
        var promise = $http({
            method: "delete",
            url: "/eliminarCargo",
            data: $httpParamSerializerJQLike({
                id: cargo.id}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });
        return promise;
    };
});
