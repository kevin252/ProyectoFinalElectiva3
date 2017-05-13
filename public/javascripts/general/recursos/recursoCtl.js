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
app.controller('CtlRecurso', function ($scope, recursoService) {

    /*Se inicializa el modelo*/
    $scope.recurso = "";

    /*Se define una funcion en el controlador*/
    $scope.crearRecurso = function (form) {
        if (form) {
            recursoService.crearRecurso($scope.recurso).then(function (response) {
                console.log(response);
                if (response.exito) {
                    alert("Recurso creado con exito");
                    $scope.recurso = "";
                    //$scope.listar();
                } else {
                    alert("No se pudo crear al recurso");
                    $scope.recurso = "";
                    //$scope.listar();

                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };
    $scope.eliminarRecurso = function (recurso) {
        recursoService.eliminarRecurso(recurso).then(function (response) {
            if (response.exito) {
                $scope.recurso = "";
                $scope.listar();
                alert("Se elimino con exito");
            } else if (response.exito === false) {
                $scope.recurso = "";
                alert("No se elimino ninguna fila");
                $scope.listar();

            } else {
                $scope.recurso = "";
                alert("Error al tratar de eliminar el recurso");
                $scope.listar();

            }
        });
    };

    $scope.editarRecurso = function (form) {
        if (form) {
            cervezaRecurso.editarRecurso($scope.recurso).then(function (response) {
                if (response.exito) {
                    $scope.recurso = "";
                    $scope.listar();
                    alert("Se edito con exito");
                } else if (response.exito === false) {
                    $scope.recurso = "";
                    alert("No se edito ninguna fila");
                    $scope.listar();

                } else {
                    $scope.recurso = "";
                    alert("Error al tratar de editar el recurso");
                    $scope.listar();

                }
            });
        } else {
            alert("Verifique los datos ingresados");
            $scope.listar();

        }

    };

    $scope.listar = function () {
        recursoService.listar().then(function (response) {
            $scope.recursos = [];
            console.log(response[0]);
            if (response.length !== 0) {
                $scope.recursos.length = 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.recursos.push({nombre: response[i].nombre, descripcion:
                                response[i].descripcion, porcentaje_alcohol: response[i].porcentaje_alcohol
                    });
                }
            }
        });
    };
    $scope.llenarCampos = function (obj) {
        obj.porcentaje_alcohol = parseInt(obj.porcentaje_alcohol);
        $scope.cerveza = obj;

    };

    $scope.ordenarPor = function (tipo) {
        $scope.ordenarSeleccionado = tipo;
    };

  //  $scope.listar();

});
