var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('taller-1', {page:'Taller 1'});
});

router.post('/ra-2', function(req, res, next) {
  var Request = require("request");

  var serviceResponse;
  Request.get("http://bigdata-cluster1-18.virtual.uniandes.edu.co:8088/ws/v1/cluster/apps?states=NEW,NEW_SAVING,SUBMITTED,ACCEPTED,RUNNING", (error, response, body) => {
      if(error) {
        serviceResponse = error;
      }
      else {
        serviceResponse = body;
      }
  });

  var data = req.body;
  res.render('t1-ra2', {
    page: 'RA 2',
    fi: data['ra2_fi'],
    ff: data.ra2_ff,
    respuesta: serviceResponse
  });
});

module.exports = router;