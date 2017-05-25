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
app.controller('CtlReporteActividades', function ($scope,proyectoService, actividadService,tareaService) {

    /*Se inicializa el modelo*/
    $scope.actividad = "";
    $scope.actividades = [];
    $scope.proyectos=[];
    $scope.tareas=[];


    /*Se define una funcion en el controlador*/



    $scope.editarTarea = function (form) {
        if (form) {

            actividadService.editarTarea($scope.proyecto).then(function (response) {
                if (response.exito===true) {
                    $scope.proyecto = "";
                    $scope.listar();
                    alert("Se edito con exito");
                } else if (response.exito === false) {
                    $scope.proyecto = "";
                    alert("No se edito ninguna fila");
                    $scope.listar();

                } else {
                    $scope.proyecto = "";
                    alert("Error al tratar de editar la actividad");
                    $scope.listar();

                }
            });

        } else {
            alert("Verifique los datos ingresados");
            $scope.listar();

        }

    };

    $scope.listarProyectosIntegrante = function () {
        proyectoService.listarProyectosIntegrante().then(function (response) {
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


    $scope.listarActividadesPorRepresentante = function (id) {
        actividadService.listarActividadesPorRepresentante(id).then(function (response) {
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


    $scope.listarTareasPorActividad = function (id) {
        tareaService.listarTareasPorActividad(id).then(function (response) {
            $scope.tareas = [];
            console.log(response[0]);
            if (response.length !== 0) {
                $scope.tareas.length = 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.tareas.push({id: response[i].id,nombre: response[i].nombre,
                      porcentaje: response[i].porcentaje,fecha_inicio:
                      new Date(response[i].fecha_inicio), fecha_fin: new Date(response[i].fecha_fin),
                      estado: response[i].estado,actividad: response[i].actividad,
                      idActividad: response[i].idActividad,proyecto: response[i].proyecto
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

$scope.listarProyectosIntegrante();
});
