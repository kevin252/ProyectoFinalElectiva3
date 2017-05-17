/*Modulo para la captura de variables GET y POST*/
var querystring = require('querystring');
/*Se importa el modulo npm MYSQL*/
var mysql = require('mysql');
var id;
function conectardb() {

    //Se hace una conexion a la base de datos
    conexion = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'proyecto_electiva'
    });
    //Se conecta a la base de datos
    conexion.connect(function (error) {
      if (error) {
        console.log('Problemas de conexion con mysql');
      } else {
        console.log('Conexion exitosa');
      }
    });
  }

  function login(pedido,respuesta) {
    console.log('llegie');

    var sql = "select id,tipo_usuario,correo,password from tb_usuarios where correo='"+pedido.body.mail+"' AND password='"+pedido.body.clave+"'";
    conexion.query(sql, function (error, filas) {
      if (error) {
        console.log("error");
        console.log('error en la consulta');
        respuesta.write(null);
        respuesta.end();
      }else{
        var res='[';
        if(filas.length > 0){
          pedido.session.correo=pedido.body.mail;
          var ide=filas[0].id;
          console.log(id);
          pedido.session.ide=ide;
          id=filas[0].id;

          console.log(filas[0].id);
          for(var i=0;i<filas.length;i++){
            res+='{';
            res+='"id":"'+filas[i].id+'",';
            res+='"tipo_usuario":"'+filas[i].tipo_usuario+'",';
            res+='"correo":"'+filas[i].correo+'",';
            res+='"password":"'+filas[i].password+'"},';
          }
          res=res.slice(0,-1);
        }
        res+=']';
        console.log(res);

        console.log(pedido.session.id);


        respuesta.write(res);
        /*Se responde*/
        respuesta.end();

      }
    });

  }

  function registro(pedido,respuesta) {
    var fecha=new Date(pedido.body.fecha);

    var registro = {
      num_documento: pedido.body.documento,
      nombres: pedido.body.nombres,
      apellidos: pedido.body.apellidos,
      fecha_nacimiento: fecha.toLocaleDateString(),
      password:pedido.body.password,
      correo:pedido.body.correo,
      tipo_usuario:pedido.body.tipoUsuario,
      tipo_documento:pedido.body.tipoDocumento


    };
    console.log(registro);
    var sql = 'insert into tb_usuarios set ?';
    conexion.query(sql, registro, function (error, resultado) {
      if (error) {
        console.log("error");
        console.log('error en la consulta');
        respuesta.write('{"exito":false}');
        respuesta.end();
      }else{
        respuesta.write('{"exito":true}');
        respuesta.end();
      }
    });

  }


  function crearRecurso(pedido,respuesta) {

    var registro = {
      nombre: pedido.body.nombre,
      cantidad: pedido.body.cantidad,
      descripcion: pedido.body.descripcion,
      ubicacion: pedido.body.ubicacion
    };
    console.log(registro);
    var sql = 'insert into tb_recursos set ?';
    conexion.query(sql, registro, function (error, resultado) {
      if (error) {
        console.log("error");
        console.log('error en la consulta');
        respuesta.write('{"exito":false}');
        respuesta.end();
      }else{
        respuesta.write('{"exito":true}');
        respuesta.end();
      }
    });

  }
//Crud proyecto
function crearProyecto(pedido,respuesta) {
  var fecha_i=new Date(pedido.body.fecha_inicio);
  var fecha_f=new Date(pedido.body.fecha_fin);
  var registro = {
    nombre: pedido.body.nombre,
    fecha_inicio: fecha_i.toLocaleDateString(),
    fecha_fin: fecha_f.toLocaleDateString(),
    director: id,
    etapa: pedido.body.etapa
  };
  console.log(registro);
  var sql = 'insert into tb_proyectos set ?';
  conexion.query(sql, registro, function (error, resultado) {
    if (error) {
      console.log("error");
      console.log('error en la consulta');
      respuesta.write('{"exito":false}');
      respuesta.end();
    }else{
      respuesta.write('{"exito":true}');
      respuesta.end();
    }
  });

}

function editarProyecto(pedido,respuesta) {

  var fecha_inicio=new Date(pedido.body.fecha_inicio);
  var fecha_fin=new Date(pedido.body.fecha_fin);

  var sql = "update tb_proyectos set nombre='"+pedido.body.nombre+"', fecha_inicio='"+fecha_inicio.toLocaleDateString()+"', fecha_fin='"+fecha_fin.toLocaleDateString()+
  "', director="+pedido.body.director+", etapa="+pedido.body.etapa+" where id=?";
  console.log(sql);
  conexion.query(sql, pedido.body.id,function (error, resultado) {
    if (error) {
      console.log("error");
      console.log('error en la consulta');
      respuesta.write('{"exito":"error"}');
      respuesta.end();
    }else{
      console.log(resultado.affectedRows);
      if(resultado.affectedRows>0){

        respuesta.write('{"exito":true}');
        respuesta.end();
      }else{
        respuesta.write('{"exito":false}');
        respuesta.end();
      }

    }
  });

}

function eliminarProyecto(pedido, respuesta) {

  var id = pedido.body.id;
  var sql = 'delete from tb_proyectos  where id=?';
  conexion.query(sql, id, function (error, resultado) {
    if (error) {
      console.log('error en la consulta');
      console.log(resultado.affectedRows);
      respuesta.write('{"exito":"error"}');
      respuesta.end();
    }else{
      console.log(resultado.affectedRows);
      if(resultado.affectedRows>0){
        respuesta.write('{"exito":true}');
        respuesta.end();
      }else{
        respuesta.write('{"exito":false}');
        respuesta.end();
      }

    }

  });

}
//Fin Crud Proyecto
//Crud actividades
function crearActividad(pedido,respuesta) {
  var fecha_i=new Date(pedido.body.fecha_inicio);
  var fecha_f=new Date(pedido.body.fecha_fin);
      var registro = {
          nombre: pedido.body.nombre,
          descripcion: pedido.body.descripcion,
          fecha_inicio: fecha_i.toLocaleDateString(),
          fecha_fin: fecha_f.toLocaleDateString(),
          comentario: pedido.body.comentario,
          proyecto: pedido.body.proyecto,
          responsable: pedido.body.responsable
      };
      console.log(registro);
      var sql = 'insert into tb_actividades set ?';
      conexion.query(sql, registro, function (error, resultado) {
          if (error) {
            console.log("error");
              console.log('error en la consulta');
              respuesta.write('{"exito":false}');
              respuesta.end();
          }else{
            respuesta.write('{"exito":true}');
            respuesta.end();
          }
        });

}

function editarActividad(pedido,respuesta) {
      var fecha_inicio=new Date(pedido.body.fecha_inicio);
      var fecha_fin=new Date(pedido.body.fecha_fin);
      var sql = "update tb_actividades set nombre='"+pedido.body.nombre+"', fecha_inicio='"+fecha_inicio.toLocaleDateString()+"', fecha_fin='"+fecha_fin.toLocaleDateString()+
        "', descripcion='"+pedido.body.descripcion+"', comentario='"+pedido.body.comentario+"',proyecto="+pedido.body.proyecto+", responsable="+pedido.body.responsable+" where id=?";
      console.log(sql);
      conexion.query(sql, pedido.body.id,function (error, resultado) {
          if (error) {
            console.log("error");
              console.log('error en la consulta');
              respuesta.write('{"exito":"error"}');
              respuesta.end();
          }else{
            console.log(resultado.affectedRows);
            if(resultado.affectedRows>0){

              respuesta.write('{"exito":true}');
              respuesta.end();
            }else{
              respuesta.write('{"exito":false}');
              respuesta.end();
            }

          }
        });

}

function eliminarActividad(pedido, respuesta) {

        var id = pedido.body.id;
        var sql = 'delete from tb_actividades  where id=?';
        conexion.query(sql, id, function (error, resultado) {
            if (error) {
                console.log('error en la consulta');
                console.log(resultado.affectedRows);
                respuesta.write('{"exito":"error"}');
                respuesta.end();
            }else{
              console.log(resultado.affectedRows);
              if(resultado.affectedRows>0){
                respuesta.write('{"exito":true}');
                respuesta.end();
              }else{
                respuesta.write('{"exito":false}');
                respuesta.end();
              }

            }

        });

}

function listarActividades(pedido,respuesta) {

    var sql = 'select a.id,a.nombre,a.descripcion,a.comentario,a.fecha_inicio,a.fecha_fin,a.proyecto as idProyecto,p.nombre as proyecto,u.id as idResponsable,u.nombres as responsable from tb_actividades as a join tb_proyectos as p on a.proyecto=p.id join tb_usuarios as u on a.responsable=u.id where p.director='+id;

    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.
    conexion.query(sql, function (error, filas) {
        if (error) {
            console.log('error en el listado');
            respuesta.write(null);
            respuesta.end();
            return;
        }else{
          var res='[';
          if(filas.length > 0){
            for(var i=0;i<filas.length;i++){
              res+='{';
              res+='"id":"'+filas[i].id+'",';
              res+='"nombre":"'+filas[i].nombre+'",';
              res+='"descripcion":"'+filas[i].descripcion+'",';
              res+='"comentario":"'+filas[i].comentario+'",';
              res+='"fecha_inicio":"'+filas[i].fecha_inicio+'",';
              res+='"fecha_fin":"'+filas[i].fecha_fin+'",';
              res+='"idResponsable":"'+filas[i].idResponsable+'",';
              res+='"responsable":"'+filas[i].responsable+'",';
              res+='"idProyecto":"'+filas[i].idProyecto+'",';
              res+='"proyecto":"'+filas[i].proyecto+'"},';

            }
            res=res.slice(0,-1);
          }
          res+=']';
          console.log(res);
          respuesta.write(res);
          respuesta.end();
        }
    });
}
function listarActividadesPorId(pedido,respuesta) {
console.log(pedido.query.id);
    var sql = 'select a.id,a.nombre,a.descripcion,a.comentario,a.fecha_inicio,a.fecha_fin,a.proyecto as idProyecto,p.nombre as proyecto,u.id as idResponsable,u.nombres as responsable from tb_actividades as a join tb_proyectos as p on a.proyecto=p.id join tb_usuarios as u on a.responsable=u.id where p.director='+id+' AND p.id='+pedido.query.id;

    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.
    conexion.query(sql, function (error, filas) {
        if (error) {
            console.log('error en el listado');
            respuesta.write(null);
            respuesta.end();
            return;
        }else{
          var res='[';
          if(filas.length > 0){
            for(var i=0;i<filas.length;i++){
              res+='{';
              res+='"id":"'+filas[i].id+'",';
              res+='"nombre":"'+filas[i].nombre+'",';
              res+='"descripcion":"'+filas[i].descripcion+'",';
              res+='"comentario":"'+filas[i].comentario+'",';
              res+='"fecha_inicio":"'+filas[i].fecha_inicio+'",';
              res+='"fecha_fin":"'+filas[i].fecha_fin+'",';
              res+='"idResponsable":"'+filas[i].idResponsable+'",';
              res+='"responsable":"'+filas[i].responsable+'",';
              res+='"idProyecto":"'+filas[i].idProyecto+'",';
              res+='"proyecto":"'+filas[i].proyecto+'"},';

            }
            res=res.slice(0,-1);
          }
          res+=']';
          console.log(res);
          respuesta.write(res);
          respuesta.end();
        }
    });
}
function listarResponsables(pedido,respuesta) {

    var sql = 'select u.id,u.nombres from tb_integrantes_proyectos as ip join tb_usuarios as u  on u.id=ip.integrante join tb_proyectos as p on ip.proyecto=p.id join tb_tipos_usuario as tp on u.tipo_usuario=tp.id where p.director='+id+' AND u.tipo_usuario=1';

    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.
    conexion.query(sql, function (error, filas) {
        if (error) {
            console.log('error en el listado');
            respuesta.write(null);
            respuesta.end();
            return;
        }else{
          var res='[';
          if(filas.length > 0){
            for(var i=0;i<filas.length;i++){
              res+='{';
              res+='"id":"'+filas[i].id+'",';
              res+='"nombre":"'+filas[i].nombres+'"},';

            }
            res=res.slice(0,-1);
          }
          res+=']';
          console.log(res);
          respuesta.write(res);
          respuesta.end();
        }
    });
}
//Fin Crud Actividades
//Crud Tareas
function crearTarea(pedido,respuesta) {
  var fecha_i=new Date(pedido.body.fecha_inicio);
  var fecha_f=new Date(pedido.body.fecha_fin);
      var registro = {
          nombre: pedido.body.nombre,
          porcentaje: pedido.body.porcentaje,
          fecha_inicio: fecha_i.toLocaleDateString(),
          fecha_fin: fecha_f.toLocaleDateString(),
          estado: pedido.body.estado,
          actividad: pedido.body.actividad
      };
      console.log(registro);
      var sql = 'insert into tb_tareas set ?';
      conexion.query(sql, registro, function (error, resultado) {
          if (error) {
            console.log("error");
              console.log('error en la consulta');
              respuesta.write('{"exito":false}');
              respuesta.end();
          }else{
            respuesta.write('{"exito":true}');
            respuesta.end();
          }
        });

}

function editarTarea(pedido,respuesta) {
      var fecha_inicio=new Date(pedido.body.fecha_inicio);
      var fecha_fin=new Date(pedido.body.fecha_fin);
      var sql = "update tb_tareas set nombre='"+pedido.body.nombre+"', fecha_inicio='"+fecha_inicio.toLocaleDateString()+"', fecha_fin='"+fecha_fin.toLocaleDateString()+
        "', porcentaje="+pedido.body.porcentaje+", estado="+pedido.body.estado+",actividad="+pedido.body.actividad+" where id=?";
      console.log(sql);
      conexion.query(sql, pedido.body.id,function (error, resultado) {
          if (error) {
            console.log("error");
              console.log('error en la consulta');
              respuesta.write('{"exito":"error"}');
              respuesta.end();
          }else{
            console.log(resultado.affectedRows);
            if(resultado.affectedRows>0){

              respuesta.write('{"exito":true}');
              respuesta.end();
            }else{
              respuesta.write('{"exito":false}');
              respuesta.end();
            }

          }
        });

}

function eliminarTarea(pedido, respuesta) {

        var id = pedido.body.id;
        var sql = 'delete from tb_tareas  where id=?';
        conexion.query(sql, id, function (error, resultado) {
            if (error) {
                console.log('error en la consulta');
                console.log(resultado.affectedRows);
                respuesta.write('{"exito":"error"}');
                respuesta.end();
            }else{
              console.log(resultado.affectedRows);
              if(resultado.affectedRows>0){
                respuesta.write('{"exito":true}');
                respuesta.end();
              }else{
                respuesta.write('{"exito":false}');
                respuesta.end();
              }

            }

        });

}

function listarTareas(pedido,respuesta) {

    var sql = 'select t.id,t.nombre,t.porcentaje,t.fecha_inicio,t.fecha_fin,t.estado,a.nombre as actividad,a.id as idActividad from tb_tareas as t join tb_actividades as a on t.actividad=a.id join tb_proyectos as p on a.proyecto=p.id where p.director='+id;

    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.
    conexion.query(sql, function (error, filas) {
        if (error) {
            console.log('error en el listado');
            respuesta.write(null);
            respuesta.end();
            return;
        }else{
          var res='[';
          if(filas.length > 0){
            for(var i=0;i<filas.length;i++){
              res+='{';
              res+='"id":"'+filas[i].id+'",';
              res+='"nombre":"'+filas[i].nombre+'",';
              res+='"porcentaje":"'+filas[i].porcentaje+'",';
              res+='"fecha_inicio":"'+filas[i].fecha_inicio+'",';
              res+='"fecha_fin":"'+filas[i].fecha_fin+'",';
              res+='"idActividad":"'+filas[i].idActividad+'",';
              res+='"actividad":"'+filas[i].actividad+'",';
              res+='"estado":"'+filas[i].estado+'"},';

            }
            res=res.slice(0,-1);
          }
          res+=']';
          console.log(res);
          respuesta.write(res);
          respuesta.end();
        }
    });
}


//Fin Crud Tareas
//Crud cargos
function crearCargo(pedido,respuesta) {
  var registro = {
    nombre: pedido.body.nombre,
    descripcion: pedido.body.descripcion,
    salario:  pedido.body.salario,
    horario: pedido.body.horario,
    proyecto: pedido.body.proyecto
  };
  console.log(registro);
  var sql = 'insert into tb_cargos set ?';
  conexion.query(sql, registro, function (error, resultado) {
    if (error) {
      console.log("error");
      console.log('error en la consulta');
      respuesta.write('{"exito":false}');
      respuesta.end();
    }else{
      respuesta.write('{"exito":true}');
      respuesta.end();
    }
  });

}

function editarCargo(pedido,respuesta) {
  var sql = "update tb_cargos set nombre='"+pedido.body.nombre+"', descripcion='"+ pedido.body.descripcion+"', salario="+ pedido.body.salario+
  ", horario='"+pedido.body.horario+"', proyecto="+pedido.body.proyecto+" where id=?";
  console.log(sql);
  conexion.query(sql, pedido.body.id,function (error, resultado) {
    if (error) {
      console.log("error");
      console.log('error en la consulta');
      respuesta.write('{"exito":"error"}');
      respuesta.end();
    }else{
      console.log(resultado.affectedRows);
      if(resultado.affectedRows>0){

        respuesta.write('{"exito":true}');
        respuesta.end();
      }else{
        respuesta.write('{"exito":false}');
        respuesta.end();
      }

    }
  });

}

function eliminarCargo(pedido, respuesta) {

  var id = pedido.body.id;
  var sql = 'delete from tb_cargos  where id=?';
  conexion.query(sql, id, function (error, resultado) {
    if (error) {
      console.log('error en la consulta');
      console.log(resultado.affectedRows);
      respuesta.write('{"exito":"error"}');
      respuesta.end();
    }else{
      console.log(resultado.affectedRows);
      if(resultado.affectedRows>0){
        respuesta.write('{"exito":true}');
        respuesta.end();
      }else{
        respuesta.write('{"exito":false}');
        respuesta.end();
      }

    }

  });

}

function listarCargos(pedido,respuesta) {

  var sql = 'select c.id,c.nombre,c.descripcion,c.salario,c.horario,c.proyecto as idProyecto,p.nombre as proyecto from tb_cargos as c join tb_proyectos as p on c.proyecto=p.id where p.director='+id;

    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.
    conexion.query(sql, function (error, filas) {
      if (error) {
        console.log('error en el listado');
        respuesta.write(null);
        respuesta.end();
        return;
      }else{
        var res='[';
        if(filas.length > 0){
          for(var i=0;i<filas.length;i++){
            res+='{';
            res+='"id":"'+filas[i].id+'",';
            res+='"nombre":"'+filas[i].nombre+'",';
            res+='"descripcion":"'+filas[i].descripcion+'",';
            res+='"salario":"'+filas[i].salario+'",';
            res+='"horario":"'+filas[i].horario+'",';
            res+='"idProyecto":"'+filas[i].idProyecto+'",';
            res+='"proyecto":"'+filas[i].proyecto+'"},';

          }
          res=res.slice(0,-1);
        }
        res+=']';
        console.log(res);
        respuesta.write(res);
        respuesta.end();
      }
    });
  }

//Fin Crud cargos
function listarTipoUsuarios(pedido,respuesta) {

  var sql = 'select id,descripcion from tb_tipos_usuario';

    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.
    conexion.query(sql, function (error, filas) {
      if (error) {
        console.log('error en el listado');
        respuesta.write(null);
        respuesta.end();
        return;
      }else{
        var res='[';
        if(filas.length > 0){
          for(var i=0;i<filas.length;i++){
            res+='{';
            res+='"id":"'+filas[i].id+'",';
            res+='"descripcion":"'+filas[i].descripcion+'"},';

          }
          res=res.slice(0,-1);
        }
        res+=']';
        console.log(res);
        respuesta.write(res);
        respuesta.end();
      }
    });
  }

  function listarProyectos(pedido,respuesta) {

    var sql = 'select p.id,p.nombre,p.fecha_inicio,p.fecha_fin,p.director as idDirector,u.nombres as director,p.etapa as idEtapa, e.etapa  from tb_proyectos as p '+
    ' join tb_etapas as e on p.etapa=e.id join tb_usuarios as u on p.director=u.id where p.director='+id;


    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.
    conexion.query(sql, function (error, filas) {
      console.log(filas);
      if (error) {
        console.log('error en el listado');
        respuesta.write(null);
        respuesta.end();
        return;
      }else{
        var res='[';
        if(filas.length > 0){
          for(var i=0;i<filas.length;i++){
            res+='{';
            res+='"id":"'+filas[i].id+'",';
            res+='"nombre":"'+filas[i].nombre+'",';
            res+='"fecha_inicio":"'+filas[i].fecha_inicio+'",';
            res+='"fecha_fin":"'+filas[i].fecha_fin+'",';
            res+='"idDirector":"'+filas[i].idDirector+'",';
            res+='"director":"'+filas[i].director+'",';
            res+='"idEtapa":"'+filas[i].idEtapa+'",';
            res+='"etapa":"'+filas[i].etapa+'"},';

          }
          res=res.slice(0,-1);
        }
        res+=']';
        console.log(res);
        respuesta.write(res);
        respuesta.end();
      }
    });
  }

  function listarIntegrantes(pedido,respuesta) {

    var sql = 'SELECT u.id, u.num_documento, u.nombres, u.apellidos, u.fecha_nacimiento, u.correo, u.tipo_documento, ' +
    'td.descripcion FROM tb_usuarios u JOIN tb_tipos_documento td ON u.tipo_documento = td.id JOIN  ' +
    'tb_integrantes_proyectos i ON i.integrante=u.id WHERE i.proyecto = ?';
    console.log(sql);
    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.
    conexion.query(sql, pedido.query.proyecto, function (error, filas) {
      if (error) {
        console.log('error en el listado');
        respuesta.write(null);
        respuesta.end();
        return;
      }else{
        var res='[';
        if(filas.length > 0){
          for(var i=0;i<filas.length;i++){
            res+='{';
            res+='"id":"'+filas[i].id+'",';
            res+='"descripcion":"'+filas[i].descripcion+'",';
            res+='"num_documento":"'+filas[i].num_documento+'",';
            res+='"nombres":"'+filas[i].nombres+'",';
            res+='"apellidos":"'+filas[i].apellidos+'",';
            res+='"fecha_nacimiento":"'+filas[i].fecha_nacimiento+'",';
            res+='"correo":"'+filas[i].correo+'",';
            res+='"tipo_documento":"'+filas[i].tipo_documento+'"},';
          }
          res=res.slice(0,-1);
        }
        res+=']';
        console.log(res);
        respuesta.write(res);
        respuesta.end();
      }
    });
  }

  function buscarIntegrante(pedido,respuesta) {

    var sql = 'SELECT u.id, u.num_documento, u.nombres, u.apellidos, u.fecha_nacimiento, u.correo, u.tipo_documento, ' +
    'td.descripcion FROM tb_usuarios u JOIN tb_tipos_documento td ON u.tipo_documento = td.id WHERE u.tipo_documento = 1' +
    ' AND u.num_documento = ?';
    console.log(sql);
    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.
    conexion.query(sql, pedido.query.numDocumento, function (error, filas) {
      if (error) {
        console.log('error en el listado');
        respuesta.write(null);
        respuesta.end();
        return;
      }else{
        res='{';
        if(filas.length > 0){
          res+='"id":"'+filas[0].id+'",';
          res+='"descripcion":"'+filas[0].descripcion+'",';
          res+='"num_documento":"'+filas[0].num_documento+'",';
          res+='"nombres":"'+filas[0].nombres+'",';
          res+='"apellidos":"'+filas[0].apellidos+'",';
          res+='"fecha_nacimiento":"'+filas[0].fecha_nacimiento+'",';
          res+='"correo":"'+filas[0].correo+'",';
          res+='"tipo_documento":"'+filas[0].tipo_documento+'"';
        }
        res+='}';
        console.log(res);
        respuesta.write(res);
        respuesta.end();
      }
    });
  }

  function eliminarIntegrante(pedido, respuesta) {
    var sql = 'DELETE FROM tb_integrantes_proyectos WHERE integrante = ? AND proyecto = ?';
    conexion.query(sql, [pedido.body.integrante, pedido.body.proyecto], function (error, resultado) {
      if (error) {
        console.log("error");
        console.log('error en la consulta');
        respuesta.write('{"exito":false}');
        respuesta.end();
      }else{
        respuesta.write('{"exito":true}');
        respuesta.end();
      }
    });

  }

  function asignarIntegrante(pedido, respuesta) {
    var registro = {
      integrante: pedido.body.integrante,
      proyecto: pedido.body.proyecto
    }
    var sql = 'INSERT INTO tb_integrantes_proyectos SET ?';
    conexion.query(sql, registro, function (error, resultado) {
      if (error) {
        console.log("error");
        console.log('error en la consulta');
        respuesta.write('{"exito":false}');
        respuesta.end();
      }else{
        respuesta.write('{"exito":true}');
        respuesta.end();
      }
    });

  }

  function listarDirectores(pedido,respuesta) {

    var sql = 'select id,nombres from tb_usuarios where tipo_usuario=2';

    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.
    conexion.query(sql, function (error, filas) {
      if (error) {
        console.log('error en el listado');
        respuesta.write(null);
        respuesta.end();
        return;
      }else{
        var res='[';
        if(filas.length > 0){
          for(var i=0;i<filas.length;i++){
            res+='{';
            res+='"id":"'+filas[i].id+'",';
            res+='"nombre":"'+filas[i].nombres+'"},';

          }
          res=res.slice(0,-1);
        }
        res+=']';
        console.log(res);
        respuesta.write(res);
        respuesta.end();
      }
    });
  }


  function listarEtapas(pedido,respuesta) {

    var sql = 'select id,etapa from tb_etapas ';

    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.
    conexion.query(sql, function (error, filas) {
      if (error) {
        console.log('error en el listado');
        respuesta.write(null);
        respuesta.end();
        return;
      }else{
        var res='[';
        if(filas.length > 0){
          for(var i=0;i<filas.length;i++){
            res+='{';
            res+='"id":"'+filas[i].id+'",';
            res+='"etapa":"'+filas[i].etapa+'"},';

          }
          res=res.slice(0,-1);
        }
        res+=']';
        console.log(res);
        respuesta.write(res);
        respuesta.end();
      }
    });
  }

  function listarTipoDocumentos(pedido,respuesta) {

    var sql = 'select id,descripcion from tb_tipos_documento';

    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.
    conexion.query(sql, function (error, filas) {
      if (error) {
        console.log('error en el listado');
        respuesta.write(null);
        respuesta.end();
        return;
      }else{
        var res='[';
        if(filas.length > 0){
          for(var i=0;i<filas.length;i++){
            res+='{';
            res+='"id":"'+filas[i].id+'",';
            res+='"descripcion":"'+filas[i].descripcion+'"},';

          }
          res=res.slice(0,-1);
        }
        res+=']';
        console.log(res);
        respuesta.write(res);
        respuesta.end();
      }
    });
  }

  function crearPresentacion(pedido,respuesta) {

    var registro = {
      ml: pedido.body.ml,
      valor: pedido.body.valor
    };
    var sql = 'insert into presentacion set ?';
    conexion.query(sql, registro, function (error, resultado) {
      if (error) {
        console.log("error");
        console.log('error en la consulta');
        respuesta.write('{"exito":false}');
        respuesta.end();
      }else{
        respuesta.write('{"exito":true}');
        respuesta.end();
      }
    });

  }

  function crearProduccion (pedido,respuesta) {


    var fecha=new Date(pedido.body.fecha);
    var registro = {
      codigo: pedido.body.codigo,
      tipo: pedido.body.tipo,
      presentacion: pedido.body.presentacion,
      fecha: fecha.toLocaleDateString(),
      comentarios: pedido.body.descripcion
    };
    console.log(registro);
    var sql = 'insert into produccion set ?';
    conexion.query(sql, registro, function (error, resultado) {
      if (error) {
        console.log("error");
        console.log('error en la consulta');
        respuesta.write('{"exito":false}');
        respuesta.end();
      }else{
        respuesta.write('{"exito":true}');
        respuesta.end();
      }
    });

  }

  function listarCervezas(respuesta) {

    var sql = 'select nombre,descripcion,porcentaje_alcohol from tipocerveza';

    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.
    conexion.query(sql, function (error, filas) {
      if (error) {
        console.log('error en el listado');
        respuesta.write(null);
        respuesta.end();
        return;
      }else{
        var res='[';
        if(filas.length > 0){
          for(var i=0;i<filas.length;i++){
            res+='{';
            res+='"nombre":"'+filas[i].nombre+'",';
            res+='"descripcion":"'+filas[i].descripcion+'",';
            res+='"porcentaje_alcohol":"'+filas[i].porcentaje_alcohol+'"},';
          }
          res=res.slice(0,-1);
        }
        res+=']';
        console.log(res);
        respuesta.write(res);
        respuesta.end();
      }
    });
  }

  function listarPresentaciones(respuesta) {

    var sql = 'select ml,valor from presentacion';

    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.
    conexion.query(sql, function (error, filas) {
      if (error) {
        console.log('error en el listado');
        respuesta.write(null);
        respuesta.end();
        return;
      }else{
        var res='[';
        if(filas.length > 0){
          for(var i=0;i<filas.length;i++){
            res+='{';
            res+='"ml":"'+filas[i].ml+'",';
            res+='"valor":"'+filas[i].valor+'"},';

          }
          res=res.slice(0,-1);
        }
        res+=']';
        console.log(res);
        respuesta.write(res);
        respuesta.end();
      }
    });
  }

  function listarProducciones(respuesta) {

    var sql = 'select codigo,fecha,comentarios,tipo,presentacion from produccion';

    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.
    conexion.query(sql, function (error, filas) {
      if (error) {
        console.log('error en el listado');
        respuesta.write(null);
        respuesta.end();
        return;
      }else{
        var res='[';
        if(filas.length > 0){
          for(var i=0;i<filas.length;i++){
            res+='{';
            res+='"codigo":"'+filas[i].codigo+'",';
            res+='"fecha":"'+filas[i].fecha+'",';
            res+='"descripcion":"'+filas[i].comentarios+'",';
            res+='"tipo":"'+filas[i].tipo+'",';
            res+='"presentacion":"'+filas[i].presentacion+'"},';
          }
          res=res.slice(0,-1);
        }
        res+=']';
        console.log(res);
        respuesta.write(res);
        respuesta.end();
      }
    });
  }

  function editarCerveza(pedido,respuesta) {


    var sql = "update tipocerveza  set nombre='"+pedido.body.nombre+"',descripcion='"+pedido.body.descripcion+"',porcentaje_alcohol="+pedido.body.porcentaje_alcohol+" where nombre=?";
    console.log(sql);
    conexion.query(sql, pedido.body.nombre,function (error, resultado) {
      if (error) {
        console.log("error");
        console.log('error en la consulta');
        respuesta.write('{"exito":"error"}');
        respuesta.end();
      }else{
        console.log(resultado.affectedRows);
        if(resultado.affectedRows>0){

          respuesta.write('{"exito":true}');
          respuesta.end();
        }else{
          respuesta.write('{"exito":false}');
          respuesta.end();
        }

      }
    });

  }

  function editarPresentacion(pedido,respuesta) {


    var sql = "update presentacion  set ml="+pedido.body.ml+",valor="+pedido.body.valor+" where ml=?";
    console.log(sql);
    conexion.query(sql, pedido.body.ml,function (error, resultado) {
      if (error) {
        console.log("error");
        console.log('error en la consulta');
        respuesta.write('{"exito":"error"}');
        respuesta.end();
      }else{
        console.log(resultado.affectedRows);
        if(resultado.affectedRows>0){

          respuesta.write('{"exito":true}');
          respuesta.end();
        }else{
          respuesta.write('{"exito":false}');
          respuesta.end();
        }

      }
    });

  }

  function editarProduccion(pedido,respuesta) {

    var fecha=new Date(pedido.body.fecha);

    var sql = "update produccion  set codigo="+pedido.body.codigo+", fecha='"+fecha.toLocaleDateString()+"', comentarios='"+pedido.body.descripcion+
    "', tipo='"+pedido.body.tipo+"', presentacion="+pedido.body.presentacion+" where codigo=?";
    console.log(sql);
    conexion.query(sql, pedido.body.codigo,function (error, resultado) {
      if (error) {
        console.log("error");
        console.log('error en la consulta');
        respuesta.write('{"exito":"error"}');
        respuesta.end();
      }else{
        console.log(resultado.affectedRows);
        if(resultado.affectedRows>0){

          respuesta.write('{"exito":true}');
          respuesta.end();
        }else{
          respuesta.write('{"exito":false}');
          respuesta.end();
        }

      }
    });

  }

  function eliminarCerveza(pedido, respuesta) {

    var nombre = pedido.body.nombre;
    var sql = 'delete from tipocerveza  where nombre=?';
    conexion.query(sql, nombre, function (error, resultado) {
      if (error) {
        console.log('error en la consulta');
        console.log(resultado.affectedRows);
        respuesta.write('{"exito":"error"}');
        respuesta.end();
      }else{
        console.log(resultado.affectedRows);
        if(resultado.affectedRows>0){
          respuesta.write('{"exito":true}');
          respuesta.end();
        }else{
          respuesta.write('{"exito":false}');
          respuesta.end();
        }

      }

    });

  }

  function eliminarPresentacion(pedido, respuesta) {

    var ml = pedido.body.ml;
    var sql = 'delete from presentacion  where ml=?';
    conexion.query(sql, ml, function (error, resultado) {
      if (error) {
        console.log('error en la consulta');
        console.log(resultado.affectedRows);
        respuesta.write('{"exito":"error"}');
        respuesta.end();
      }else{
        console.log(resultado.affectedRows);
        if(resultado.affectedRows>0){
          respuesta.write('{"exito":true}');
          respuesta.end();
        }else{
          respuesta.write('{"exito":false}');
          respuesta.end();
        }

      }

    });

  }

  function eliminarProduccion(pedido, respuesta) {

    var codigo = pedido.body.codigo;
    var sql = 'delete from produccion  where codigo=?';
    conexion.query(sql, codigo, function (error, resultado) {
      if (error) {
        console.log('error en la consulta');
        console.log(resultado.affectedRows);
        respuesta.write('{"exito":"error"}');
        respuesta.end();
      }else{
        console.log(resultado.affectedRows);
        if(resultado.affectedRows>0){
          respuesta.write('{"exito":true}');
          respuesta.end();
        }else{
          respuesta.write('{"exito":false}');
          respuesta.end();
        }

      }

    });

  }

//Habilita a las funciones para que sean llamadas o exportadas desde otros archivos
exports.conectardb = conectardb;
exports.crearRecurso = crearRecurso;
exports.crearProyecto = crearProyecto;
exports.editarProyecto = editarProyecto;
exports.eliminarProyecto = eliminarProyecto;
exports.crearActividad = crearActividad;
exports.editarActividad = editarActividad;
exports.eliminarActividad = eliminarActividad;
exports.listarActividades = listarActividades;
exports.crearTarea = crearTarea;
exports.editarTarea = editarTarea;
exports.eliminarTarea = eliminarTarea;
exports.listarTareas = listarTareas;
exports.listarResponsables = listarResponsables;
exports.crearCargo = crearCargo;
exports.editarCargo = editarCargo;
exports.eliminarCargo = eliminarCargo;
exports.listarCargos=listarCargos;
exports.listarProyectos=listarProyectos;
exports.listarIntegrantes=listarIntegrantes;
exports.buscarIntegrante=buscarIntegrante;
exports.eliminarIntegrante=eliminarIntegrante;
exports.asignarIntegrante=asignarIntegrante;
exports.listarDirectores=listarDirectores;
exports.listarEtapas=listarEtapas;
exports.listarActividadesPorId=listarActividadesPorId;
exports.login=login;
exports.registro=registro;
exports.listarTipoDocumentos=listarTipoDocumentos;
exports.listarTipoUsuarios=listarTipoUsuarios;
exports.crearPresentacion=crearPresentacion;
exports.crearProduccion=crearProduccion;
exports.eliminarCerveza=eliminarCerveza;
exports.eliminarPresentacion=eliminarPresentacion;
exports.eliminarProduccion=eliminarProduccion;
exports.editarCerveza=editarCerveza;
exports.editarPresentacion=editarPresentacion;
exports.editarProduccion=editarProduccion;
exports.listarCervezas=listarCervezas;
exports.listarPresentaciones=listarPresentaciones;
exports.listarProducciones=listarProducciones;
