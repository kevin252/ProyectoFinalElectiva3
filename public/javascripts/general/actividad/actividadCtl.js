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
app.controller('CtlActividad', function ($scope, actividadService) {

    /*Se inicializa el modelo*/
    $scope.actividad = "";
    $scope.actividades = [];

    /*Se define una funcion en el controlador*/
    $scope.crearActividad = function (form) {
        if (form) {
          var i = new Date($scope.actividad.fecha_inicio);
          var f = new Date($scope.actividad.fecha_fin);
          var a= new Date();
          if(i>=a&i<=f){
            actividadService.crearActividad($scope.actividad).then(function (response) {
                console.log(response);
                if (response.exito) {
                    alert("Actividad creada con exito");
                    $scope.actividad = "";
                    $scope.listar();
                } else {
                    alert("No se pudo crear la actividad");
                    $scope.actividad = "";
                    $scope.listar();

                }
            });
          }else{
            alert("por favor ingrese un rango de fechas valido");
            $scope.listar();
          }
        } else {
            alert("Verifique los datos ingresados");
            $scope.listar();
        }
    };
    $scope.eliminarActividad = function (actividad) {
        actividadService.eliminarActividad(actividad).then(function (response) {
            if (response.exito) {
                $scope.actividad = "";
                $scope.listar();
                alert("Se elimino con exito");
            } else if (response.exito === false) {
                $scope.actividad = "";
                alert("No se elimino ninguna fila");
                $scope.listar();

            } else {
                $scope.actividad = "";
                alert("Error al tratar de eliminar la actividad");
                $scope.listar();

            }
        });
    };

    $scope.editarActividad = function (form) {
        if (form) {
          var i = new Date($scope.actividad.fecha_inicio);
          var f = new Date($scope.actividad.fecha_fin);
          var a= new Date();
          if(i>=a&i<=f){
            actividadService.editarActividad($scope.actividad).then(function (response) {
                if (response.exito===true) {
                    $scope.actividad = "";
                    $scope.listar();
                    alert("Se edito con exito");
                } else if (response.exito === false) {
                    $scope.actividad = "";
                    alert("No se edito ninguna fila");
                    $scope.listar();

                } else {
                    $scope.actividad = "";
                    alert("Error al tratar de editar la actividad");
                    $scope.listar();

                }
            });
          }else{
            alert("por favor ingrese un rango de fechas valido");
            $scope.listarProyectos();
          }
        } else {
            alert("Verifique los datos ingresados");
            $scope.listar();

        }

    };

    $scope.listarProyectos = function () {
        actividadService.listarProyectos().then(function (response) {
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
    $scope.listarResponsables = function () {
        actividadService.listarResponsables().then(function (response) {
            $scope.responsables = [];
            console.log(response[0]);
            if (response.length !== 0) {
                $scope.responsables.length = 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.responsables.push({id: response[i].id,nombre: response[i].nombre
                    });
                }
            }
        });
    };

    $scope.listar = function () {
        actividadService.listarActividades().then(function (response) {
            $scope.actividades = [];
            console.log(response[0]);
            if (response.length !== 0) {
                $scope.actividades.length = 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.actividades.push({id: response[i].id,nombre: response[i].nombre,
                      descripcion: response[i].descripcion,fecha_inicio:
                      new Date(response[i].fecha_inicio), fecha_fin: new Date(response[i].fecha_fin),
                      comentario: response[i].comentario,proyecto: response[i].proyecto,
                      idProyecto: response[i].idProyecto,responsable: response[i].responsable,
                      idResponsable: response[i].idResponsable
                    });
                }
            }
        });
    };




    $scope.llenarCampos = function (obj) {
      obj.fecha_inicio = new Date(obj.fecha_inicio);
      obj.fecha_fin = new Date(obj.fecha_fin);
        $scope.actividad = obj;
        $scope.actividad.proyecto=obj.idProyecto;
        $scope.actividad.responsable=obj.idResponsable;



    };

    $scope.ordenarPor = function (tipo) {
        $scope.ordenarSeleccionado = tipo;
    };

    $scope.listarProyectos();
    $scope.listarResponsables();
    $scope.listar();

});
