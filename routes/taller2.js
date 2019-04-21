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

router.get('/heatmap', function(req, res, next) {
  res.render('t2-heatmap', {page:'Tagcloud'});
});

/* apis */

router.get('/personajes-mongo', function(req, res, next) {
  res.set({'Content-Type': 'application/json'});
  res.send({
    data: [
      {source: "Microsoft", target: "Amazon", type: "licensing"},
      {source: "Microsoft", target: "HTC", type: "licensing"},
      {source: "Samsung", target: "Apple", type: "suit"},
      {source: "Motorola", target: "Apple", type: "suit"},
      {source: "Nokia", target: "Apple", type: "resolved"},
      {source: "HTC", target: "Apple", type: "suit"},
      {source: "Kodak", target: "Apple", type: "suit"},
      {source: "Microsoft", target: "Barnes & Noble", type: "suit"},
      {source: "Microsoft", target: "Foxconn", type: "suit"},
      {source: "Oracle", target: "Google", type: "suit"},
      {source: "Apple", target: "HTC", type: "suit"},
      {source: "Microsoft", target: "Inventec", type: "suit"},
      {source: "Samsung", target: "Kodak", type: "resolved"},
      {source: "LG", target: "Kodak", type: "resolved"},
      {source: "RIM", target: "Kodak", type: "suit"},
      {source: "Sony", target: "LG", type: "suit"},
      {source: "Kodak", target: "LG", type: "resolved"},
      {source: "Apple", target: "Nokia", type: "resolved"},
      {source: "Qualcomm", target: "Nokia", type: "resolved"},
      {source: "Apple", target: "Motorola", type: "suit"},
      {source: "Microsoft", target: "Motorola", type: "suit"},
      {source: "Motorola", target: "Microsoft", type: "suit"},
      {source: "Huawei", target: "ZTE", type: "suit"},
      {source: "Ericsson", target: "ZTE", type: "suit"},
      {source: "Kodak", target: "Samsung", type: "resolved"},
      {source: "Apple", target: "Samsung", type: "suit"},
      {source: "Kodak", target: "RIM", type: "suit"},
      {source: "Nokia", target: "Qualcomm", type: "suit"}
    ]
  });
});

module.exports = router;