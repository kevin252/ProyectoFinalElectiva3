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
app.controller('CtlUsuario', function ($scope,$window, usuarioService) {

    /*Se inicializa el modelo*/
    $scope.usuario = "";

    /*Se define una funcion en el controlador*/
    $scope.crearUsuario = function (form) {
        if (form) {
          var f = new Date($scope.usuario.fecha);
          var a= new Date();
          if(f<a){
            if($scope.usuario.password===$scope.usuario.password1){
              usuarioService.crearUsuario($scope.usuario).then(function (response) {

                  if (response.exito) {
                      alert("Se ha registrado con exito");
                      $window.location.href="/";

                      $scope.usuario = "";
                  } else {
                      alert("No se pudo registrar");
                      $scope.usuario = "";

                  }
              });
            }else{
              alert("el password no coincide");
            }
          }else{
            alert("Fecha de nacimiento no valida");
          }


        } else {
            alert("Verifique los datos ingresados");
        }
    };

    $scope.listarTipoUsuarios = function () {
            usuarioService.listarTipoUsuarios().then(function (response) {
                $scope.tipoUsuarios = [];
                console.log(response[0]);
                if (response.length !== 0) {
                    $scope.tipoUsuarios.length = 0;
                    for (var i = 0; i < response.length; i++) {
                        $scope.tipoUsuarios.push({id: response[i].id, descripcion:
                                    response[i].descripcion
                        });
                    }
                }
            });
        };
        $scope.listarTipoDocumentos = function () {
                usuarioService.listarTipoDocumentos().then(function (response) {
                    $scope.tipoDocumentos = [];
                    console.log(response[0]);
                    if (response.length !== 0) {
                        $scope.tipoDocumentos.length = 0;
                        for (var i = 0; i < response.length; i++) {
                            $scope.tipoDocumentos.push({id: response[i].id, descripcion:
                                        response[i].descripcion
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

        $scope.listarTipoDocumentos();
        $scope.listarTipoUsuarios();





});
