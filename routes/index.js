var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/hadoop', function(req, res, next) {
  var request = require("request");

  var serviceResponse="";
  var options = {
    //url: "http://localhost:8080/ws/v1/cluster/apps?states=NEW,NEW_SAVING,SUBMITTED,ACCEPTED,RUNNING",
    url: "http://bigdata-cluster1-18.virtual.uniandes.edu.co:8088/ws/v1/cluster/apps?states=NEW,NEW_SAVING,SUBMITTED,ACCEPTED,RUNNING",
    headers: {
      //"Origin" : "http://localhost:8080"
      "Origin" : "http://bigdata-cluster1-18.virtual.uniandes.edu.co:8088"
    }
  };
  request(options, (error, response, body) => {
    if(error) {
      serviceResponse = error;
    }
    else {
      serviceResponse = body;
    }
    res.set({'Content-Type': 'application/json'});
    res.send(serviceResponse);
  });
});

module.exports = router;
