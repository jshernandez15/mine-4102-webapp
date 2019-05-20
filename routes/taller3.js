var express = require('express');
var router = express.Router();

var sparql = require('../model/sparql');

router.get('/', function(req, res, next) {
  res.render('taller-3', {page:'Taller 3'});
});

router.post('/2.2.1/nacieron', function(req, res, next) {
  var data = req.body;

  sparql.nacimientos(["Will Smith"], data.persona_fi, data.persona_ff, function(quienes) {
    res.render('t3-221', {
      page: 'Punto 2',
      personas: quienes.results.bindings || [],
      fi:data.persona_fi,
      ff:data.persona_ff,
      queHicieron: 'nacieron'
    })
  });

});

router.post('/2.2.1/murieron', function(req, res, next) {
  var data = req.body;

  sparql.muertes(["Will Smith"], data.persona_fi, data.persona_ff, function(quienes) {
    res.render('t3-221', {
      page: 'Punto 2',
      personas: quienes.results.bindings || [],
      fi:data.persona_fi,
      ff:data.persona_ff,
      queHicieron: 'murieron'
    })
  });

});

router.get('/2.2.2', function(req, res, next) {
  sparql.lugaresRelacionados(["Cairo", "Egypt"], function(lugares) {
    // res.set({'Content-Type': 'application/json; charset=utf-8'});
    // res.send(lugares);
    res.render('t3-222', {
      page: 'Punto 2',
      lugares: lugares.results.bindings || [],
    })
  });
});

router.get('/2.2.3', function(req, res, next) {
  sparql.premios(["Will Smith"], function(personas) {
    // res.set({'Content-Type': 'application/json; charset=utf-8'});
    // res.send(personas);
    res.render('t3-223', {
      page: 'Punto 2',
      personas: personas.results.bindings || [],
      combinaciones: [
        {llave: "starredIn", valor: "Protagonizó"},
        {llave: "producerOf", valor: "Productor"},
        {llave: "extraOf", valor: "Extra en"},
        {llave: "hostOf", valor: "Condujo"},
        {llave: "awards", valor: "Premiado"}
      ]
    })
  });
});

router.get('/3.1', function(req, res, next) {
  sparql.lugarCaracterizado(["Mansoura", "Egypt"], function(lugares) {
    // res.set({'Content-Type': 'application/json; charset=utf-8'});
    // res.send(lugares);
    res.render('t3-31', {
      page: 'Punto 3',
      lugares: lugares.results.bindings || [],
      combinaciones: [
        {llave: "place_name", valor: "Nombre" },
        {llave: "lat", valor: "Latitud" },
        {llave: "lon", valor: "Longitud" },
        {llave: "country", valor: "País" },
        {llave: "city", valor: "Ciudad" },
        {llave: "type", valor: "Tipo" },
        {llave: "place", valor: "Lugar" }
      ]
    })
  });
});

router.get('/3.2', function(req, res, next) {
  sparql.personasRelacionadas(["Will Smith"], function(personas) {
    // res.set({'Content-Type': 'application/json; charset=utf-8'});
    // res.send(personas.results.bindings);
    res.render('t3-32', {
      page: 'Punto 3',
      personas: personas.results.bindings || [],
      combinaciones: [
        {llave: "name", valor: "Nombre"},
        {llave: "person", valor: "URI"},
        {llave: "birthDate", valor: "Fecha de nacimiento"},
        {llave: "birthPlace", valor: "Lugar de nacimiento"},
        {llave: "livingPlace", valor: "Lugar de vivienda"},
        {llave: "occupation", valor: "Ocupación"},
        {llave: "style", valor: "Estilo"},
        {llave: "currentPartner", valor: "Asociado"},
        {llave: "parent", valor: "Padres"},
        {llave: "son", valor: "Hijos"},
        {llave: "spouse", valor: "Esposa(o)"},
        {llave: "relative", valor: "Relativo"}
      ]
    })
  });
});

router.get('/3.3', function(req, res, next) {
  sparql.personasRelacionadas2(["Will Smith"], function(personas) {
    // res.set({'Content-Type': 'application/json; charset=utf-8'});
    // res.send(personas.results.bindings);
    res.render('t3-33', {
      page: 'Punto 3',
      personas: personas.results.bindings || [],
      combinaciones: [
        {llave: "name", valor: "Persona"},
        {llave: "relationship_label", valor: "Relación"},
        {llave: "name2", valor: "Con"}
      ]
    })
  });
});

router.get('/3.4', function(req, res, next) {
  sparql.personasRelacionadas2(["Will Smith"], function(personas) {
    // res.set({'Content-Type': 'application/json; charset=utf-8'});
    // res.send(personas.results.bindings);
    res.render('t3-34', {
      page: 'Punto 3',
      personas: personas.results.bindings || [],
      combinaciones: [
        {llave: "name", valor: "Persona"},
        {llave: "relationship_label", valor: "Relación"},
        {llave: "name2", valor: "Con"}
      ]
    })
  });
});

router.get('/preguntas/familia/:persona', function(req, res, next) {
  var persona = req.params.persona;
  sparql.personal(persona, function(informacionPersonal){
    res.set({'Content-Type': 'application/json; charset=utf-8'});
    res.send(informacionPersonal);
  });
});

module.exports = router;