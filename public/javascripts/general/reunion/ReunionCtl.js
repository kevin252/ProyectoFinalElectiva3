"use strict";

/*El use strict hace que se deba codificar de manera correcta, siendo estricto
 * a la hora de compilar el codigo ejemplo:
 * x = 3.14; // This will cause an error (x is not defined)*/


 /* global app */

/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
* los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('CtlReunion', function ($scope, $location, reunionService, proyectoService) {

    /*Se inicializa el modelo*/
    $scope.reunion = {};
    $scope.reuniones = [];
    $scope.proyectos = [];

    $scope.listarReuniones = function () {        
        reunionService.listarReuniones($scope.reunion.proyecto).then(function (response) {
            var proyecto = $scope.reunion.proyecto;
            $scope.reunion = {};
            $scope.reunion.proyecto = proyecto;
            $scope.reuniones = [];
            console.log(response[0]);
            if (response.length !== 0) {
                $scope.reuniones.length = 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.reuniones.push({
                    	id: response[i].id,
                    	ubicacion: response[i].ubicacion,
                    	tematica: response[i].tematica
                    });
                }
            }
        });
    };

    $scope.listarReunionesIntegrante = function () {           
        var proyecto = $location.absUrl().split("?");
        proyecto = proyecto[1].split("=");
        reunionService.listarReuniones(proyecto[1]).then(function (response) {
            var proyecto = $scope.reunion.proyecto;
            $scope.reunion = {};
            $scope.reunion.proyecto = proyecto;
            $scope.reuniones = [];
            console.log(response[0]);
            if (response.length !== 0) {
                $scope.reuniones.length = 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.reuniones.push({
                        id: response[i].id,
                        ubicacion: response[i].ubicacion,
                        tematica: response[i].tematica
                    });
                }
            }
        });
    };

    $scope.eliminarReunion = function(reunion) {
        reunionService.eliminarReunion(reunion.id, $scope.reunion.proyecto).then(function (response) {
            if(response.exito){
                $scope.listarReuniones();
                alert("Se eliminó con exito la reunion");
            }else{

            }
        });
    }

    $scope.crearReunion = function() {
        reunionService.crearReunion($scope.reunion).then(function (response) {
            $scope.listarReuniones();
            if(response.exito){                
                alert("Se creo con exito la reunion");
            }else{
                alert("Ya se encuentra en este proyecto");
            }
        });
    }

    $scope.editarReunion = function() {
        reunionService.editarReunion($scope.reunion).then(function (response) {
            $scope.listarReuniones();
            if(response.exito){                
                alert("Se edito con exito el reunion");
            }else{
                alert("Ya se encuentra en este proyecto");
            }
        });
    }

    $scope.listarProyectos = function () {
        proyectoService.listarProyectos().then(function (response) {
            $scope.proyectos = [];
            console.log(response[0]);
            if (response.length !== 0) {
                $scope.proyectos.length = 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.proyectos.push({
                        id: response[i].id,
                        nombre: response[i].nombre
                    });
                }
            }
        });
    };

    $scope.llenarCampos = function (obj){
        var proyecto = $scope.reunion.proyecto;
        $scope.reunion = obj;
        $scope.reunion.proyecto = proyecto;
    }

    $scope.ordenarPor = function (tipo) {
        $scope.ordenarSeleccionado = tipo;
    };
    
});

