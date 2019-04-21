var express = require('express');
var router = express.Router();
var Menciones = require('../model/menciones');
var Coyunturas = require('../model/coyunturas');
var Clasificados = require('../model/clasificados');

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