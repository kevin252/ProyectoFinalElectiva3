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
app.controller('CtlProyecto', function ($scope, proyectoService) {

    /*Se inicializa el modelo*/
    $scope.proyecto = "";
    $scope.proyectos = [];

    /*Se define una funcion en el controlador*/
    $scope.crearProyecto = function (form) {
        if (form) {
            var i = new Date($scope.proyecto.fecha_inicio);
            var f = new Date($scope.proyecto.fecha_fin);
            var a= new Date();
            if(i>=a&i<=f){
              proyectoService.crearProyecto($scope.proyecto).then(function (response) {
                  console.log(response);
                  if (response.exito) {
                      alert("Proyecto creado con exito");
                      $scope.proyecto = "";
                      $scope.listarProyectos();
                  } else {
                      alert("No se pudo crear el proyecto");
                      $scope.proyecto = "";
                      $scope.listarProyectos();

                  }
              });
            }else{
              alert("por favor ingrese un rango de fechas valido");
              $scope.listarProyectos();
            }

        } else {
            alert("Verifique los datos ingresados");
            $scope.listarProyectos();
        }
    };
    $scope.eliminarProyecto = function (proyecto) {
        proyectoService.eliminarProyecto(proyecto).then(function (response) {
            if (response.exito) {
                $scope.proyecto = "";
                $scope.listarProyectos();
                alert("Se elimino con exito");
            } else if (response.exito === false) {
                $scope.proyecto = "";
                alert("No se elimino ninguna fila");
                $scope.listarProyectos();

            } else {
                $scope.proyecto = "";
                alert("Error al tratar de eliminar el Proyecto");
                $scope.listarProyectos();

            }
        });
    };

    $scope.editarProyecto = function (form) {
        if (form) {
          var i = new Date($scope.proyecto.fecha_inicio);
          var f = new Date($scope.proyecto.fecha_fin);
          var a= new Date();
          if(i>=a&i<=f){
            proyectoService.editarProyecto($scope.proyecto).then(function (response) {
                if (response.exito===true) {
                    $scope.proyecto = "";
                    $scope.listarProyectos();
                    alert("Se edito con exito");
                } else if (response.exito === false) {
                    $scope.proyecto = "";
                    alert("No se edito ninguna fila");
                    $scope.listarProyectos();

                } else {
                    $scope.proyecto = "";
                    alert("Error al tratar de editar el proyecto");
                    $scope.listarProyectos();

                }
            });
          }else{
            alert("por favor ingrese un rango de fechas valido");
            $scope.listarProyectos();
          }
        } else {
            alert("Verifique los datos ingresados");
            $scope.listarProyectos();

        }

    };

    $scope.listarProyectos = function () {
        proyectoService.listarProyectos().then(function (response) {
            $scope.proyectos = [];
            console.log(response[0]);
            if (response.length !== 0) {
                $scope.proyectos.length = 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.proyectos.push({id: response[i].id,nombre: response[i].nombre, fecha_inicio:
                                new Date(response[i].fecha_inicio), fecha_fin: new Date(response[i].fecha_fin),
                                director: response[i].director,idDirector: response[i].idDirector,
                                etapa: response[i].etapa,idEtapa: response[i].idEtapa
                    });
                }
            }
        });
    };

    $scope.listarProyectosIntegrante = function () {
        proyectoService.listarProyectosIntegrante().then(function (response) {
            $scope.proyectos = [];
            console.log(response[0]);
            if (response.length !== 0) {
                $scope.proyectos.length = 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.proyectos.push({id: response[i].id,nombre: response[i].nombre, fecha_inicio:
                                new Date(response[i].fecha_inicio), fecha_fin: new Date(response[i].fecha_fin),
                                director: response[i].director,idDirector: response[i].idDirector,
                                etapa: response[i].etapa,idEtapa: response[i].idEtapa
                    });
                }
            }
        });
    };

    $scope.listarDirectores = function () {
        proyectoService.listarDirectores().then(function (response) {
            $scope.directores = [];
            console.log(response[0]);
            if (response.length !== 0) {
                $scope.directores.length = 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.directores.push({id: response[i].id,nombre: response[i].nombre
                    });
                }
            }
        });
    };


    $scope.listarEtapas = function () {
        proyectoService.listarEtapas().then(function (response) {
            $scope.etapas = [];
            console.log(response[0]);
            if (response.length !== 0) {
                $scope.etapas.length = 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.etapas.push({id: response[i].id,etapa: response[i].etapa
                    });
                }
            }
        });
    };

    $scope.llenarCampos = function (obj) {
      obj.fecha_inicio = new Date(obj.fecha_inicio);
      obj.fecha_fin = new Date(obj.fecha_fin);

        $scope.proyecto = obj;
        $scope.proyecto.director=obj.idDirector;
        $scope.proyecto.etapa=obj.idEtapa;


    };

    $scope.ordenarPor = function (tipo) {
        $scope.ordenarSeleccionado = tipo;
    };

    $scope.listarProyectos();
    $scope.listarDirectores();
    $scope.listarEtapas();

});
