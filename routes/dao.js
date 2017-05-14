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
exports.crearCargo = crearCargo;
exports.editarCargo = editarCargo;
exports.eliminarCargo = eliminarCargo;
exports.listarCargos=listarCargos;
exports.listarProyectos=listarProyectos;
exports.listarDirectores=listarDirectores;
exports.listarEtapas=listarEtapas;
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
