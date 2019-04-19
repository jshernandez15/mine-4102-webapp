var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('taller-2', {page:'Taller 2'});
});

router.get('/personajes', function(req, res, next) {
  res.render('t2-personajes', {page:'Personajes'});
});

router.get('/tagcloud', function(req, res, next) {
  res.render('t2-tagcloud', {page:'Tagcloud'});
});

module.exports = router;