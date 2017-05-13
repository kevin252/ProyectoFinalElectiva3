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
app.controller('CtlCargo', function ($scope, cargoService) {

    /*Se inicializa el modelo*/
    $scope.cargo = "";
    $scope.cargos = [];

    /*Se define una funcion en el controlador*/
    $scope.crearCargo = function (form) {
        if (form) {
              cargoService.crearCargo($scope.cargo).then(function (response) {
                  console.log(response);
                  if (response.exito) {
                      alert("cargo creado con exito");
                      $scope.cargo = "";
                      $scope.listar();
                  } else {
                      alert("No se pudo crear el cargo");
                      $scope.cargo = "";
                      $scope.listar();

                  }
              });


        } else {
            alert("Verifique los datos ingresados");
            $scope.listar();
        }
    };
    $scope.eliminarCargo = function (cargo) {
        cargoService.eliminarCargo(cargo).then(function (response) {
            if (response.exito) {
                $scope.cargo = "";
                $scope.listar();
                alert("Se elimino con exito");
            } else if (response.exito === false) {
                $scope.cargo = "";
                alert("No se elimino ninguna fila");
                $scope.listar();

            } else {
                $scope.cargo = "";
                alert("Error al tratar de eliminar el cargo");
                $scope.listarProyectos();

            }
        });
    };

    $scope.editarCargo = function (form) {
        if (form) {
            cargoService.editarCargo($scope.cargo).then(function (response) {
                if (response.exito===true) {
                    $scope.cargo = "";
                    $scope.listar();
                    alert("Se edito con exito");
                } else if (response.exito === false) {
                    $scope.cargo = "";
                    alert("No se edito ninguna fila");
                    $scope.listar();

                } else {
                    $scope.cargo = "";
                    alert("Error al tratar de editar el cargo");
                    $scope.listar();

                }
            });

        } else {
            alert("Verifique los datos ingresados");
            $scope.listar();

        }

    };

    $scope.listarProyectos = function () {
        cargoService.listarProyectos().then(function (response) {
            $scope.proyectos = [];
            console.log(response[0]);
            if (response.length !== 0) {
                $scope.proyectos.length = 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.proyectos.push({id: response[i].id,nombre: response[i].nombre
                    });
                }
            }
        });
    };

    $scope.listar = function () {
        cargoService.listar().then(function (response) {
            $scope.cargos = [];
            console.log(response[0]);
            if (response.length !== 0) {
                $scope.cargos.length = 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.cargos.push({id: response[i].id,nombre: response[i].nombre,
                      descripcion: response[i].descripcion,salario: response[i].salario,
                      horario: response[i].horario,proyecto: response[i].proyecto,
                      idProyecto: response[i].idProyecto
                    });
                }
            }
        });
    };




    $scope.llenarCampos = function (obj) {
      obj.salario = parseInt(obj.salario);
        $scope.cargo = obj;
        $scope.cargo.proyecto=obj.idProyecto;


    };

    $scope.ordenarPor = function (tipo) {
        $scope.ordenarSeleccionado = tipo;
    };

    $scope.listarProyectos();
    $scope.listar();

});
