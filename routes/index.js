var express = require('express');
var router = express.Router();
var app = require('../app');

var dao=require('./dao');
dao.conectardb();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',layout: false});
});

router.get('/tarea', function(req, res, next) {
  if(req.session.correo){
    res.render('tarea', { title: 'tarea',layout: "masterPage"});
  }else{
    var pagina='<!doctype html><html><head></head><body>'+
    '<p>No tiene permitido ingresar sin login</p>'+
    '<br><a href="/">Retornar</a></body></html>';
    res.send(pagina);
  }
});

router.get('/recursos', function(req, res, next) {
  if(req.session.correo){
    res.render('recursos', { title: 'recursos',layout: "masterPage"});
  }else{
    var pagina='<!doctype html><html><head></head><body>'+
    '<p>No tiene permitido ingresar sin login</p>'+
    '<br><a href="/">Retornar</a></body></html>';
    res.send(pagina);
  }
});

router.get('/inicio', function(req, res, next) {
  if(req.session.correo){
    res.render('inicio', { title: 'Inicio',layout: "masterPage"});
  }else{
    var pagina='<!doctype html><html><head></head><body>'+
    '<p>No tiene permitido ingresar sin login</p>'+
    '<br><a href="/">Retornar</a></body></html>';
    res.send(pagina);
  }
});

router.get('/proyecto', function(req, res, next) {
  if(req.session.correo){
    res.render('proyecto', { title: 'proyecto',layout: "masterPage"});
  }else{
    var pagina='<!doctype html><html><head></head><body>'+
    '<p>No tiene permitido ingresar sin login</p>'+
    '<br><a href="/">Retornar</a></body></html>';
    res.send(pagina);
  }
});
router.get('/estado', function(req, res, next) {
  if(req.session.correo){
    res.render('estado', { title: 'estado',layout: "masterPage"});
  }else{
    var pagina='<!doctype html><html><head></head><body>'+
    '<p>No tiene permitido ingresar sin login</p>'+
    '<br><a href="/">Retornar</a></body></html>';
    res.send(pagina);
  }
});

router.get('/integrantes', function(req, res, next) {
  if(req.session.correo){
    res.render('integrantes', { title: 'integrantes',layout: "masterPage"});
  }else{
    var pagina='<!doctype html><html><head></head><body>'+
    '<p>No tiene permitido ingresar sin login</p>'+
    '<br><a href="/">Retornar</a></body></html>';
    res.send(pagina);
  }
});

router.get('/reuniones', function(req, res, next) {
  if(req.session.correo){
    res.render('reuniones', { title: 'reuniones',layout: "masterPage"});
  }else{
    var pagina='<!doctype html><html><head></head><body>'+
    '<p>No tiene permitido ingresar sin login</p>'+
    '<br><a href="/">Retornar</a></body></html>';
    res.send(pagina);
  }
});

router.get('/actividad', function(req, res, next) {
  if(req.session.correo){
    res.render('actividad', { title: 'proyecto',layout: "masterPage"});
  }else{
    var pagina='<!doctype html><html><head></head><body>'+
    '<p>No tiene permitido ingresar sin login</p>'+
    '<br><a href="/">Retornar</a></body></html>';
    res.send(pagina);
  }
});
router.get('/actividadesIntegrante', function(req, res, next) {
  if(req.session.correo){
    res.render('actividadesIntegrante', { title: 'proyecto',layout: "masterPageIntegrante"});
  }else{
    var pagina='<!doctype html><html><head></head><body>'+
    '<p>No tiene permitido ingresar sin login</p>'+
    '<br><a href="/">Retornar</a></body></html>';
    res.send(pagina);
  }
});

router.get('/cargo', function(req, res, next) {
  if(req.session.correo){
    console.log(req.session.correo);
    res.render('cargo', { title: 'cargo',layout: "masterPage"});
  }else{
    var pagina='<!doctype html><html><head></head><body>'+
    '<p>No tiene permitido ingresar sin login</p>'+
    '<br><a href="/">Retornar</a></body></html>';
    res.send(pagina);
  }
});


router.get('/universidad', function(req, res, next) {
  if(req.session.correo){
    res.render('universidad', { title: 'universidad',layout: "masterPage"});
  }else{
    var pagina='<!doctype html><html><head></head><body>'+
    '<p>No tiene permitido ingresar sin login</p>'+
    '<br><a href="/">Retornar</a></body></html>';
    res.send(pagina);
  }

});

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/registro', function(req, res, next) {
  res.render('registro',{ title: 'Express',layout: false});
});

router.get('/inicioIntegrante', function(req, res, next) {
  if(req.session.correo){
    res.render('inicioIntegrante',{ title: 'Inicio Integrante',layout: "masterPageIntegrante"});
  }else{
    var pagina='<!doctype html><html><head></head><body>'+
    '<p>No tiene permitido ingresar sin login</p>'+
    '<br><a href="/">Retornar</a></body></html>';
    res.send(pagina);
  }
});

router.get('/listarTipoUsuarios', function(req, res, next) {
  dao.listarTipoUsuarios(req,res);
});
router.get('/listarActividades', function(req, res, next) {
  dao.listarActividades(req,res);
});
router.get('/listarActividadesPorRepresentante', function(req, res, next) {
  dao.listarActividadesPorRepresentante(req,res);
});
router.get('/listarResponsables', function(req, res, next) {
  dao.listarResponsables(req,res);
});
router.get('/listarDirectores', function(req, res, next) {
  dao.listarDirectores(req,res);
});
router.get('/listarEtapas', function(req, res, next) {
  dao.listarEtapas(req,res);
});
router.get('/listarTareas', function(req, res, next) {
  dao.listarTareas(req,res);
});
router.get('/listarTareasPorProyecto', function(req, res, next) {
  dao.listarTareasPorProyecto(req,res);
});
router.get('/listarTareasPorActividad', function(req, res, next) {
  dao.listarTareasPorActividad(req,res);
});
router.get('/listarProyectos', function(req, res, next) {
  dao.listarProyectos(req,res);
});
router.get('/listarProyectosIntegrante', function(req, res, next) {
  dao.listarProyectosIntegrante(req,res);
});
router.get('/listarProyectosPorId', function(req, res, next) {
  dao.listarProyectosPorId(req,res);
});
router.get('/listarIntegrantes', function(req, res, next) {
  dao.listarIntegrantes(req,res);
});
router.get('/listarReuniones', function(req, res, next) {
  dao.listarReuniones(req,res);
});
router.get('/listarCargos', function(req, res, next) {
  dao.listarCargos(req,res);
});
router.get('/listarTipoDocumentos', function(req, res, next) {
  dao.listarTipoDocumentos(req,res);
});
router.get('/listarActividadesPorId', function(req, res, next) {
  dao.listarActividadesPorId(req,res);
});
router.get('/listarRecursos', function(req, res, next) {
  dao.listarRecursos(req,res);
});
router.get('/buscarIntegrante', function(req, res, next) {
  dao.buscarIntegrante(req,res);
});

router.post('/login', function(req, res, next) {
 /*Se crea una variable de sesion llamada mail con el dato que llega*/
 dao.login(req,res);
    //req.session.mail=req.body.mail;
  });

router.post('/crearUsuario', function(req, res, next) {
 /*Se crea una variable de sesion llamada mail con el dato que llega*/
 dao.registro(req,res);
    //req.session.mail=req.body.mail;
  });
  router.post('/crearTarea', function(req, res, next) {
   /*Se crea una variable de sesion llamada mail con el dato que llega*/
   dao.crearTarea(req,res);
      //req.session.mail=req.body.mail;
    });

router.post('/crearProyecto', function(req, res, next) {
 /*Se crea una variable de sesion llamada mail con el dato que llega*/
 dao.crearProyecto(req,res);
    //req.session.mail=req.body.mail;
  });

router.post('/crearActividad', function(req, res, next) {
	/*Se crea una variable de sesion llamada mail con el dato que llega*/
  dao.crearActividad(req,res);
    //req.session.mail=req.body.mail;
  });

router.post('/crearReunion', function(req, res, next) {
  /*Se crea una variable de sesion llamada mail con el dato que llega*/
  dao.crearReunion(req,res);
    //req.session.mail=req.body.mail;
  });

router.post('/crearRecurso', function(req, res, next) {
  /*Se crea una variable de sesion llamada mail con el dato que llega*/
  dao.crearRecurso(req,res);
    //req.session.mail=req.body.mail;
  });

router.delete('/eliminarProyecto', function(req, res, next) {
	/*Se crea una variable de sesion llamada mail con el dato que llega*/
  dao.eliminarProyecto(req,res);
    //req.session.mail=req.body.mail;
  });

router.delete('/eliminarActividad', function(req, res, next) {
	/*Se crea una variable de sesion llamada mail con el dato que llega*/
  dao.eliminarActividad(req,res);
    //req.session.mail=req.body.mail;
  });
  router.delete('/eliminarTarea', function(req, res, next) {
  	/*Se crea una variable de sesion llamada mail con el dato que llega*/
    dao.eliminarTarea(req,res);
      //req.session.mail=req.body.mail;
    });

router.delete('/eliminarReunion', function(req, res, next) {
  /*Se crea una variable de sesion llamada mail con el dato que llega*/
  dao.eliminarReunion(req,res);
    //req.session.mail=req.body.mail;
  });

router.delete('/eliminarRecurso', function(req, res, next) {
  /*Se crea una variable de sesion llamada mail con el dato que llega*/
  dao.eliminarRecurso(req,res);
    //req.session.mail=req.body.mail;
  });

router.post('/editarProyecto', function(req, res, next) {
	/*Se crea una variable de sesion llamada mail con el dato que llega*/
  dao.editarProyecto(req,res);
    //req.session.mail=req.body.mail;
  });

router.post('/editarActividad', function(req, res, next) {
	/*Se crea una variable de sesion llamada mail con el dato que llega*/
  dao.editarActividad(req,res);
    //req.session.mail=req.body.mail;
  });

  router.post('/editarTarea', function(req, res, next) {
  	/*Se crea una variable de sesion llamada mail con el dato que llega*/
    dao.editarTarea(req,res);
      //req.session.mail=req.body.mail;
    });

router.post('/editarReunion', function(req, res, next) {
  /*Se crea una variable de sesion llamada mail con el dato que llega*/
  dao.editarReunion(req,res);
    //req.session.mail=req.body.mail;
  });

router.post('/editarRecurso', function(req, res, next) {
  /*Se crea una variable de sesion llamada mail con el dato que llega*/
  dao.editarRecurso(req,res);
    //req.session.mail=req.body.mail;
  });

router.post('/crearCargo', function(req, res, next) {
	/*Se crea una variable de sesion llamada mail con el dato que llega*/
  dao.crearCargo(req,res);
    //req.session.mail=req.body.mail;
  });

router.delete('/eliminarCargo', function(req, res, next) {
	/*Se crea una variable de sesion llamada mail con el dato que llega*/
  dao.eliminarCargo(req,res);
    //req.session.mail=req.body.mail;
  });

router.post('/editarCargo', function(req, res, next) {
	/*Se crea una variable de sesion llamada mail con el dato que llega*/
  dao.editarCargo(req,res);
    //req.session.mail=req.body.mail;
  });

router.post('/asignarIntegrante', function(req, res, next) {
  /*Se crea una variable de sesion llamada mail con el dato que llega*/
  dao.asignarIntegrante(req,res);
    //req.session.mail=req.body.mail;
  });

router.delete('/eliminarIntegrante', function(req, res, next) {
  /*Se crea una variable de sesion llamada mail con el dato que llega*/
  dao.eliminarIntegrante(req,res);
    //req.session.mail=req.body.mail;
  });

router.get('/logout', function(req, res, next) {
	/*Se destruye las variables de sesion*/
  req.session.destroy();
  res.end();
});

module.exports = router;
