var express = require('express');
var router = express.Router();
var dao=require('./dao');
dao.conectardb();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',layout: false});
});

router.get('/estudiante', function(req, res, next) {
  res.render('estudiante', { title: 'estudiante'});
});
router.get('/inicio', function(req, res, next) {
  res.render('inicio', { title: 'Inicio'});

});

router.get('/universidad', function(req, res, next) {
  if(req.session.correo){
    res.render('universidad', { title: 'univercidad'});
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

router.post('/login', function(req, res, next) {
	/*Se crea una variable de sesion llamada mail con el dato que llega*/
dao.login(req,res);
    //req.session.mail=req.body.mail;


});

router.get('/logout', function(req, res, next) {
	/*Se destruye las variables de sesion*/
      req.session.destroy();
      res.end();
});
module.exports = router;
