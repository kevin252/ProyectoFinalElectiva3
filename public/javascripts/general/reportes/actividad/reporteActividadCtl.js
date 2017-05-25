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
app.controller('CtlReporteActividades', function ($scope,proyectoService, actividadService,tareaService,reporteActividadService) {

    /*Se inicializa el modelo*/
    $scope.actividad = "";
    $scope.actividades = [];
    $scope.proyectos=[];
    $scope.tareas=[];
    $scope.tarea="";
    $scope.porc=true;


    /*Se define una funcion en el controlador*/



    $scope.editarPorcentaje = function (form) {
        if (form) {

          if(($scope.tarea.porcentaje>=0)&&($scope.tarea.porcentaje<=100)){
            reporteActividadService.editarPorcentaje($scope.tarea).then(function (response) {
                if (response.exito===true) {
                    $scope.listarTareasPorActividad($scope.tarea.id);

                    alert("Se edito con exito");
                    $scope.tarea.porcentaje=0;
                } else if (response.exito === false) {

                    alert("No se edito ninguna fila");
                    $scope.listarTareasPorActividad($scope.tarea.id);

                } else {

                    alert("Error al tratar de editar la tarea");
                    $scope.listarTareasPorActividad($scope.tarea.id);

                }
            });
          }else{
            alert("el valor del porcentaje debe estar en un rango de 0 a 100");
            $scope.listarTareasPorActividad($scope.tarea.id);
          }


        } else {
            alert("Por favor ingrese un porcentaje");
            $scope.listarTareasPorActividad($scope.tarea.id);

        }

    };


    $scope.comentar = function (form) {
        if (form) {

            reporteActividadService.comentar($scope.reporte).then(function (response) {
                if (response.exito===true) {
                    alert("Se edito con exito");
                    $scope.reporte.comentario="";
                } else if (response.exito === false) {
                    alert("No se edito ninguna fila");

                } else {
                    alert("Error al tratar de comentar");

                }
            });

        } else {
            alert("Ingrese un comentario");

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
                      idActividad: response[i].idActividad,proyecto: response[i].proyecto,
                      idProyecto: response[i].idProyecto
                    });
                }
            }
        });
    };




    $scope.llenarCampos = function (obj) {
      obj.fecha_inicio = new Date(obj.fecha_inicio);
      obj.fecha_fin = new Date(obj.fecha_fin);
      obj.porcentaje=parseInt(obj.porcentaje);
      obj.estado=parseInt(obj.estado);
      $scope.reporte.id=obj.id;
        $scope.tarea = obj;

    };

    $scope.editarTarea=function(){
      console.log($scope.tarea);
    }

    $scope.ordenarPor = function (tipo) {
        $scope.ordenarSeleccionado = tipo;
    };

$scope.listarProyectosIntegrante();
});
