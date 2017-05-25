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
app.controller('CtlTarea', function ($scope,proyectoService,actividadService, tareaService) {

    /*Se inicializa el modelo*/
    $scope.tarea = "";
    $scope.tareas = [];

    /*Se define una funcion en el controlador*/
    $scope.crearTarea = function (form) {
        if (form) {
          var i = new Date($scope.tarea.fecha_inicio);
          var f = new Date($scope.tarea.fecha_fin);
          var a= new Date();
          if(i>=a&i<=f){
            tareaService.crearTarea($scope.tarea).then(function (response) {
                console.log(response);
                if (response.exito) {
                    alert("Tarea creada con exito");
                    $scope.tarea = "";
                    $scope.listar();
                } else {
                    alert("No se pudo crear la tarea");
                    $scope.tarea = "";
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
    $scope.eliminarTarea = function (tarea) {
        tareaService.eliminarTarea(tarea).then(function (response) {
            if (response.exito) {
                $scope.tarea = "";
                $scope.listar();
                alert("Se elimino con exito");
            } else if (response.exito === false) {
                $scope.tarea = "";
                alert("No se elimino ninguna fila");
                $scope.listar();

            } else {
                $scope.tarea = "";
                alert("Error al tratar de eliminar la tarea");
                $scope.listar();

            }
        });
    };

    $scope.editarTarea = function (form) {
        if (form) {
          var i = new Date($scope.tarea.fecha_inicio);
          var f = new Date($scope.tarea.fecha_fin);
          var a= new Date();
          if(i>=a&i<=f){
            tareaService.editarTarea($scope.tarea).then(function (response) {
                if (response.exito===true) {
                    $scope.tarea = "";
                    $scope.listar();
                    alert("Se edito con exito");
                } else if (response.exito === false) {
                    $scope.tarea = "";
                    alert("No se edito ninguna fila");
                    $scope.listar();

                } else {
                    $scope.tarea = "";
                    alert("Error al tratar de editar la tarea");
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


    $scope.listarActividades = function (id) {
        actividadService.listarActividadesPorId(id).then(function (response) {
            $scope.actividades = [];
            console.log(response[0]);
            if (response.length !== 0) {
                $scope.actividades.length = 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.actividades.push({id: response[i].id,nombre: response[i].nombre
                    });
                }
            }
        });
    };

    $scope.listar = function () {
        tareaService.listarTareas().then(function (response) {
            $scope.tareas = [];
            console.log(response[0]);
            if (response.length !== 0) {
                $scope.tareas.length = 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.tareas.push({id: response[i].id,nombre: response[i].nombre,
                      porcentaje: response[i].porcentaje,fecha_inicio:
                      new Date(response[i].fecha_inicio), fecha_fin: new Date(response[i].fecha_fin),
                      estado: response[i].estado,actividad: response[i].actividad,
                      idActividad: response[i].idActividad
                    });
                }
            }
        });
    };
    
    $scope.listarProyectos = function () {
        proyectoService.listarProyectos().then(function (response) {
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




    $scope.llenarCampos = function (obj) {
      obj.fecha_inicio = new Date(obj.fecha_inicio);
      obj.fecha_fin = new Date(obj.fecha_fin);
      obj.porcentaje=parseInt(obj.porcentaje);
      obj.estado=parseInt(obj.estado);
        $scope.tarea = obj;
        $scope.tarea.actividad=obj.idActividad;



    };

    $scope.ordenarPor = function (tipo) {
        $scope.ordenarSeleccionado = tipo;
    };
    $scope.listarProyectos();
    $scope.listar();

});
