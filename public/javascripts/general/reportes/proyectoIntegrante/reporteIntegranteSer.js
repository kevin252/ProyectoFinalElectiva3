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
app.service('reporteIntegranteService', function ($http, $httpParamSerializerJQLike) {
    this.crearProyecto = function (proyecto) {
        var promise = $http({
            method: "POST",
            url: "/crearProyecto",
            data: $httpParamSerializerJQLike({
                nombre: proyecto.nombre,
                fecha_inicio: proyecto.fecha_inicio,
                fecha_fin:proyecto.fecha_fin,
                director:proyecto.director,
                etapa: proyecto.etapa}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });
        return promise;
    };

    this.editarProyecto = function (proyecto) {
        var promise = $http({
            method: "post",
            url: "/editarProyecto",
            data: $httpParamSerializerJQLike({
              id:proyecto.id,
              nombre: proyecto.nombre,
              fecha_inicio: proyecto.fecha_inicio,
              fecha_fin:proyecto.fecha_fin,
              director:proyecto.director,
              etapa: proyecto.etapa}),
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

    this.listarDirectores = function () {
        var promise = $http({
            method: "get",
            url: "/listarDirectores"
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });
        return promise;
    };

    this.listarEtapas = function () {
        var promise = $http({
            method: "get",
            url: "/listarEtapas"
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });
        return promise;
    };

    this.eliminarProyecto = function (proyecto) {
        var promise = $http({
            method: "delete",
            url: "/eliminarProyecto",
            data: $httpParamSerializerJQLike({
                id: proyecto.id}),
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
