var express = require('express');
var router = express.Router();
var app = require('../app');

var dao=require('./dao');
dao.conectardb();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',layout: false});
});

router.get('/estudiante', function(req, res, next) {
  if(req.session.correo){
    res.render('estudiante', { title: 'estudiante',layout: "masterPage"});
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
router.get('/listarDirectores', function(req, res, next) {
  dao.listarDirectores(req,res);
});
router.get('/listarEtapas', function(req, res, next) {
  dao.listarEtapas(req,res);
});
router.get('/listarProyectos', function(req, res, next) {
  dao.listarProyectos(req,res);
});
router.get('/listarCargos', function(req, res, next) {
  dao.listarCargos(req,res);
});
router.get('/listarTipoDocumentos', function(req, res, next) {
  dao.listarTipoDocumentos(req,res);
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
router.post('/crearProyecto', function(req, res, next) {
	/*Se crea una variable de sesion llamada mail con el dato que llega*/
dao.crearProyecto(req,res);
    //req.session.mail=req.body.mail;


});
router.delete('/eliminarProyecto', function(req, res, next) {
	/*Se crea una variable de sesion llamada mail con el dato que llega*/
dao.eliminarProyecto(req,res);
    //req.session.mail=req.body.mail;


});
router.post('/editarProyecto', function(req, res, next) {
	/*Se crea una variable de sesion llamada mail con el dato que llega*/
dao.editarProyecto(req,res);
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



router.get('/logout', function(req, res, next) {
	/*Se destruye las variables de sesion*/
      req.session.destroy();
      res.end();
});
module.exports = router;
