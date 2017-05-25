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
app.controller('CtlLogin', function ($scope,$window, loginService) {

    /*Se inicializa el modelo*/
    $scope.login = "";

    /*Se define una funcion en el controlador*/
    $scope.login = function (form) {

        if (form) {
            loginService.login($scope.login).then(function (response) {
                if (response.length!==0) {
                  if(response[0].tipo_usuario==="1"){
                    $window.location.href="/inicioIntegrante";

                  }else if(response[0].tipo_usuario==="2"){
                    $window.location.href="/inicio";

                  }

                }else{
                  alert("Los datos ingresados no coinciden");
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };

    $scope.logOut = function () {

            loginService.logOut().then(function (response) {
              $window.location.href="/";

            });

    };

    $scope.registro = function () {
      $window.location.href="/registro";

    };



    //  $scope.redireccionar = function (pagina) {
    //     alert(pagina);
    //           loginService.redireccionar(pagina).then(function (response) {
     //
    //           });
     //
    //   };








});
