var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();
var Menciones = require('../model/menciones');
var Coyunturas = require('../model/coyunturas');
var Clasificados = require('../model/clasificados');
var Actividades = require('../model/actividades');

router.get('/', function(req, res, next) {
  res.render('taller-2', {page:'Taller 2'});
});

router.get('/personajes', function(req, res, next) {
  res.render('t2-personajes', {page:'Personajes'});
});

router.get('/tagcloud', function(req, res, next) {
  Clasificados.aggregate([{
      $sample: {size: 5},
    },{
      $match : {AUTHOR : { "$exists": true, "$ne": null }
    }
  }],function(error, twitts) {
    res.render('t2-tagcloud', {
      page:'Tagcloud',
      twitts: twitts
    });
  });
});

router.get('/heatmap', function(req, res, next) {
  res.render('t2-heatmap', {page:'Tagcloud'});
});

router.get('/relaciones', function(req, res, next) {
  res.render('t2-heatmap', {page:'Relaciones'});
});

/* apis */

router.get('/heatmap-mongo', function(req, res, next) {
  Actividades.find({},
    ['AUTHOR', 'CATEGORY_NUMBER', 'ACTIVIDAD'],{
      skip:0, // Starting Row
      limit:30, // Ending Row
      sort:{
        ACTIVIDAD: -1 //Sort by Date Added DESC
      }
    },function(error, actividades) {
    res.set({'Content-Type': 'application/json; charset=utf-8'});
    res.send(actividades);
  });
});

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

router.get('/personajes-wikipedia/:personaje', function(req, res, next) {
  var personaje = req.params.personaje;
  fetch("https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + personaje + "&utf8=&format=json")
    .then(data => data.json())
    .then(json => {
      res.set({'Content-Type': 'application/json; charset=utf-8'});
      res.send(json);
    });
});

router.get('/tagcloud-mongo/:id', function(req, res, next) {
  var id = req.params.id;
  Coyunturas.find({
    CATEGORY_NUMBER: id,
    HASHTAG_NAME: { $ne: null }
  },
  ['HASHTAG_NAME', 'CANTIDAD'], 
  {
    skip:0, // Starting Row
    limit:30, // Ending Row
    sort:{
      CANTIDAD: -1 //Sort by Date Added DESC
    }
  },function(error, tagcloud) {
    res.set({'Content-Type': 'application/json; charset=utf-8'});
    res.send(tagcloud);
  });
});

router.get('/coyuntura-mongo', function(req, res, next) {
  Clasificados.aggregate([{
    $group: { 
      _id: "$CATEGORY_NUMBER", 
      count: {$sum: 1} 
    }
  }],function(error, coyunturas) {
    res.set({'Content-Type': 'application/json; charset=utf-8'});
    res.send(coyunturas);
  });
});

module.exports = router;