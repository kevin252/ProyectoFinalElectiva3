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
app.controller('CtlIntegrante', function ($scope, integranteService, proyectoService) {

    /*Se inicializa el modelo*/
    $scope.integrante = {};
    $scope.integrantes = [];
    $scope.proyectos = [];

    $scope.listarIntegrantes = function () {        
        integranteService.listarIntegrantes($scope.integrante.proyecto).then(function (response) {
            var proyecto = $scope.integrante.proyecto;
            $scope.integrante = {};
            $scope.integrante.proyecto = proyecto;
            $scope.integrantes = [];
            console.log(response[0]);
            if (response.length !== 0) {
                $scope.integrantes.length = 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.integrantes.push({
                    	id: response[i].id,
                    	descripcion: response[i].descripcion,
                    	numDocumento: response[i].num_documento,
                    	nombres: response[i].nombres,
                    	apellidos: response[i].apellidos,
                    	fechaNacimiento: new Date(response[i].fecha_nacimiento),                    	
						correo: response[i].correo,
						tipoDocumento: response[i].tipo_documento
                    });
                }
            }
        });
    };

    $scope.buscarIntegrante = function(form){
        if(form){
            integranteService.buscarIntegrante($scope.integrante.numDocumento).then(function (response) {
                var proyecto = $scope.integrante.proyecto;
                if(typeof response.id !== "undefined"){                    
                    response.fecha_nacimiento = new Date(response.fecha_nacimiento);
                    $scope.integrante = response;
                    $scope.integrante.proyecto = proyecto;
                }else{
                    $scope.integrante = {};
                    $scope.integrante.proyecto = proyecto;
                    alert("No existe un integrante con esa cedula");
                }
            });
        }else{
            alert("Diligensie el campo");
        }
    }

    $scope.eliminarIntegrante = function(integrante) {
        integranteService.eliminarIntegrante(integrante.id, $scope.integrante.proyecto).then(function (response) {
            if(response.exito){
                $scope.listarIntegrantes();
                alert("Se eliminó con exito el integrante");
            }else{

            }
        });
    }

    $scope.asignarIntegrante = function() {
        integranteService.asignarIntegrante($scope.integrante).then(function (response) {
            $scope.listarIntegrantes();
            if(response.exito){                
                alert("Se asignó con exito el integrante");
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

    $scope.ordenarPor = function (tipo) {
        $scope.ordenarSeleccionado = tipo;
    };
    
});

