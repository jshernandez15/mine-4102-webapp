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
  //model.sendRF3(id);

  res.render('t1-ra2', {
    page: 'RA 2',
    fi: data['ra2_fi'],
    ff: data.ra2_ff,
    id: id
  });
});

router.get('/rf-3/:id', function(req, res, next) {
  var id = req.params.id;
  model.readRF3(id, function(data) {
    res.set({'Content-Type': 'application/text'});
    res.send(data);
  });
});

router.get('/ra-2/:id', function(req, res, next) {
  var id = req.params.id;
  model.readRA2(id, function(data) {
    if( data.includes('No such file or directory') ) res.status(404).send();
    var positions = [
      {
        name: 'green',
        pos: data.indexOf("green")
      },
      {
        name: 'blue',
        pos: data.indexOf("blue")
      },
      {
        name: 'yellow',
        pos: data.indexOf("yellow")
      }
    ];

    var initPos = positions
      .filter(type => type.pos >= 0) // if not found then skiped it
      .map(type => type.pos) // just take the numbers
      .reduce(function(valorAnterior, valorActual, indice, vector) {
        return valorAnterior < valorActual ? valorAnterior : valorActual; // check which value is minor
      }, data.length); // reduce begins with size

    var result = {};
    data
      .substring(initPos) // goes to yellow, blue or green first occurrence
      .substring(0, data.lastIndexOf("\n")).substring(0, data.lastIndexOf("\n")) // remove last two lines
      .split(";") // split data by ;
      .map(reglon => 
        reglon.split(" ").filter(t => t !== "" && t !== "," ) 
      )
      .forEach(element => {
        if(typeof result[element[0]] == "undefined") result[element[0]] = [];
        result[element[0]].push({
          date: element[1],
          count: element[2]
        });
      });
    res.send(result);
  });
});

module.exports = router;