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
app.service('actividadService', function ($http, $httpParamSerializerJQLike) {
    this.crearActividad = function (actividad) {
        var promise = $http({
            method: "POST",
            url: "/crearActividad",
            data: $httpParamSerializerJQLike({
                nombre: actividad.nombre,
                descripcion: actividad.descripcion,
                fecha_inicio:actividad.fecha_inicio,
                fecha_fin:actividad.fecha_fin,
                comentario: actividad.comentario,
                proyecto:actividad.proyecto,
                responsable: actividad.responsable}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });
        return promise;
    };

    this.editarActividad = function (actividad) {
        var promise = $http({
            method: "post",
            url: "/editarActividad",
            data: $httpParamSerializerJQLike({
              id:actividad.id,
              nombre: actividad.nombre,
              descripcion: actividad.descripcion,
              fecha_inicio:actividad.fecha_inicio,
              fecha_fin:actividad.fecha_fin,
              comentario: actividad.comentario,
              proyecto:actividad.proyecto,
              responsable: actividad.responsable}),
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
    this.listarResponsables = function () {
        var promise = $http({
            method: "get",
            url: "/listarResponsables"
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });
        return promise;
    };

    this.eliminarActividad = function (actividad) {
        var promise = $http({
            method: "delete",
            url: "/eliminarActividad",
            data: $httpParamSerializerJQLike({
                id: actividad.id}),
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
