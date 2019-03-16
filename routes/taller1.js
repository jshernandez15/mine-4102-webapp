var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('taller-1', {page:'Taller 1'});
});

router.post('/ra-2', function(req, res, next) {
  var data = req.body;
  res.render('t1-ra2', {
    page: 'RA 2',
    fi: data['ra2_fi'],
    ff: data.ra2_ff
  });
});

module.exports = router;