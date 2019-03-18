var express = require('express');
var model = require('../model/hadoop');
const uuidv1 = require('uuid/v1');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('taller-1', {page:'Taller 1'});
});

router.post('/ra-2', function(req, res, next) {
  var data = req.body;
  var id = uuidv1();;
  model.send(id);

  res.render('t1-ra2', {
    page: 'RA 2',
    fi: data['ra2_fi'],
    ff: data.ra2_ff,
    id: id
  });
});

router.get('/ra-2/:id', function(req, res, next) {
  var id = req.params.id;
  model.read(id, function(data) {
    res.set({'Content-Type': 'application/text'});
    res.send(data);
  });
});

module.exports = router;