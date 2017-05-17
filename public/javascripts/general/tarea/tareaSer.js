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
app.service('tareaService', function ($http, $httpParamSerializerJQLike) {
    this.crearTarea = function (tarea) {
        var promise = $http({
            method: "POST",
            url: "/crearTarea",
            data: $httpParamSerializerJQLike({
                nombre: tarea.nombre,
                porcentaje: tarea.porcentaje,
                fecha_inicio:tarea.fecha_inicio,
                fecha_fin:tarea.fecha_fin,
                estado: tarea.estado,
                actividad: tarea.actividad}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });
        return promise;
    };

    this.editarTarea = function (tarea) {
        var promise = $http({
            method: "post",
            url: "/editarTarea",
            data: $httpParamSerializerJQLike({
              id:tarea.id,
              nombre: tarea.nombre,
              porcentaje: tarea.porcentaje,
              fecha_inicio:tarea.fecha_inicio,
              fecha_fin:tarea.fecha_fin,
              estado: tarea.estado,
              actividad: tarea.actividad}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });
        return promise;
    };


    this.listarActividades = function () {
        var promise = $http({
            method: "get",
            url: "/listarActividades"
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });
        return promise;
    };
    this.listarTareas = function () {
        var promise = $http({
            method: "get",
            url: "/listarTareas"
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });
        return promise;
    };

    this.eliminarTarea = function (tarea) {
        var promise = $http({
            method: "delete",
            url: "/eliminarTarea",
            data: $httpParamSerializerJQLike({
                id: tarea.id}),
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
