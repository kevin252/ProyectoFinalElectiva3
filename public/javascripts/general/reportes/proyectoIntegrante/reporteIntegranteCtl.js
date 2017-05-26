app.controller('CtlReporte', function ($scope,reporteIntegranteService,proyectoService,tareaService,actividadService) {
    $scope.tareas = [];
    $scope.tareass= [];
    $scope.actividades = [];
    $scope.actividadesTareas=[];
    $scope.act=[];
    $scope.proyectos=[];
    $scope.project="";
    $scope.proyectosPorId = [];
    $scope.porc=0;
    $scope.estado="";
  $scope.pintarGrafica = function(){
  		var labels = [];
  		var data = [];
  		for(var i = 0; i < $scope.actividadesTareas.length; i++){
        for(var j = 0; j < $scope.actividadesTareas[i].tars.length; j++){

  			labels.push($scope.actividadesTareas[i].tars[j].tarea+' '+$scope.actividadesTareas[i].tars[j].porcentaje+'%');
  			data.push(parseInt($scope.actividadesTareas[i].tars[j].porcentaje));
      }
  		}
  		$scope.labels = labels;
  		$scope.data = data;
  		$scope.options = {
  			title: {
  				text: "Titulo"
  			},
  			legend: {
  				display: true,
  				position: 'top'
  			}
  		};
      $scope.actividadesTareas=[];
      $scope.act=[];
  	};

    $scope.listarProyectos = function () {
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
$scope.consultaReferenciaCruzada();            }
        });
    };

    $scope.listar = function (id) {
        tareaService.listarTareasPorProyecto(id).then(function (response) {
            $scope.proyectosPorId = [];
            console.log(response[0]);
            if (response.length !== 0) {
                $scope.proyectosPorId.length = 0;
                for (var i = 0; i < response.length; i++) {

                    $scope.proyectosPorId.push({id: response[i].id,nombre: response[i].nombre,
                      porcentaje: response[i].porcentaje,fecha_inicio:
                      new Date(response[i].fecha_inicio), fecha_fin: new Date(response[i].fecha_fin),
                      etapa: response[i].etapa,director: response[i].director
                    });
                }
                console.log($scope.proyectosPorId);
                $scope.validarPorcentajes($scope.proyectosPorId);

            }

        });
    };

    $scope.consultaReferenciaCruzada=function(){
      $scope.act=[];
      for (var i = 0; i < $scope.actividades.length; i++) {
        for (var j = 0; j < $scope.tareas.length; j++) {

          if($scope.tareas[j].idActividad===$scope.actividades[i].id){
            $scope.act.push({tarea:$scope.tareas[j].nombre,porcentaje:$scope.tareas[j].porcentaje});
          }

        }
        $scope.actividadesTareas.push({
          actividad:$scope.actividades[i].nombre,tars:$scope.act
        });
      }
      console.log($scope.actividadesTareas);
      console.log($scope.act);
      $scope.pintarGrafica();

    };

    $scope.validarPorcentajes=function(projects){
      $scope.porc=0;
      console.log(projects);
      for (var i = 0; i < projects.length; i++) {
        $scope.porc=$scope.porc+parseInt(projects[i].porcentaje);
}
console.log($scope.porc);
$scope.project=projects[0];


$scope.porc=$scope.porc/projects.length;

var a= new Date();

if((projects[0].fecha_fin<=a&&$scope.porc===100)||projects[0].fecha_fin>a){
$scope.estado="Al dia";
}else{
  $scope.estado="Retrasado";

}
if($scope.porc==='NaN'){
  $scope.porc=0+"%"

}
$scope.porc=$scope.porc+"%"
console.log($scope.porc);
};
$scope.listarProyectos();









});
