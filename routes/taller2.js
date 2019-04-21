var express = require('express');
var router = express.Router();
var Menciones = require('../model/Menciones');

router.get('/', function(req, res, next) {
  res.render('taller-2', {page:'Taller 2'});
});

router.get('/personajes', function(req, res, next) {
  res.render('t2-personajes', {page:'Personajes'});
});

router.get('/tagcloud', function(req, res, next) {
  res.render('t2-tagcloud', {page:'Tagcloud'});
});

router.get('/heatmap', function(req, res, next) {
  res.render('t2-heatmap', {page:'Tagcloud'});
});

/* apis */

router.get('/personajes-mongo/:personaje', function(req, res, next) {
  var personaje = req.params.personaje;
  Menciones.find({
    $or: [
      {AUTHOR: personaje},{MENTIONED_NAME: personaje}
    ]
  }, function(error, menciones) {
    res.set({'Content-Type': 'application/json; charset=utf-8'});
    res.send(menciones);
  });
});

module.exports = router;