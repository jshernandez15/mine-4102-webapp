var SparqlClient = require('sparql-client');
var util = require('util');

module.exports = {
    personal: function(input, callback) {
        var client = new SparqlClient('http://dbpedia.org/sparql');

        var query = `PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        
        SELECT ?name ?person ?birthDate ?birthPlace ?livingPlace ?occupation ?style ?currentPartner ?parent ?son ?spouse ?relative
        WHERE {
         { ?person rdfs:label ?name. }
         UNION
         { ?person dbo:birthName ?name. }
         UNION
         { ?person foaf:name ?name. }
         FILTER(?name = "${input}"@en)
         OPTIONAL { ?person dbo:birthDate ?birthDate }
         OPTIONAL { ?person dbo:birthPlace ?birthPlace }
         OPTIONAL { ?person dbo:livingPlace ?livingPlace }
         OPTIONAL { ?person dbo:occupation ?occupation }
         OPTIONAL { ?person dbo:style ?style }
         OPTIONAL { ?person dbo:currentPartner ?currentPartner }
         OPTIONAL { ?person dbo:parent ?parent }
         OPTIONAL { ?person dbo:child ?son }
         OPTIONAL { ?person dbo:spouse ?spouse }
         OPTIONAL { ?person dbo:relative ?relative }
        }
        LIMIT 3
        `;

        client.query(query)
            .execute({format: 'resource', resource: 'person'}, function(error, results) {
                callback(results);
            });
    },

    nacimientos: function(personas, inicio, fin, callback) {
        var client = new SparqlClient('http://dbpedia.org/sparql');

        var names = '"' + personas.join('"@en, "') + '"@en';

        var query = `PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                
        SELECT ?person ?name ?birthdate
        WHERE {
         ?person a dbo:Person.
         { ?person rdfs:label ?name. }
         UNION
         { ?person dbo:birthName ?name. }
         UNION
         { ?person foaf:name ?name. }        
         FILTER(?name in (${names}))
         ?person dbo:birthDate ?birthdate.
         FILTER (xsd:date(?birthdate) > "${inicio}"^^xsd:date).
         FILTER (xsd:date(?birthdate) < "${fin}"^^xsd:date).
        }`;

        client.query(query)
            .execute(function(error, results) {
                callback(results);
            });
    },

    muertes: function(personas, inicio, fin, callback) {
        var client = new SparqlClient('http://dbpedia.org/sparql');

        var names = '"' + personas.join('"@en, "') + '"@en';

        var query = `PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        
        SELECT ?person ?name ?deathdate
        WHERE {
         ?person a dbo:Person.
         { ?person rdfs:label ?name. }
         UNION
         { ?person dbo:birthName ?name. }
         UNION
         { ?person foaf:name ?name. }.
         FILTER(?name in (${names}))
         ?person dbo:deathDate ?deathdate.
         FILTER (xsd:date(?deathdate) > "${inicio}"^^xsd:date).
         FILTER (xsd:date(?deathdate) < "${fin}"^^xsd:date).
        }
        `;

        client.query(query)
            .execute(function(error, results) {
                callback(results);
            });
    },

    lugaresRelacionados: function(arregloLugares, callback) {

        var client = new SparqlClient('http://dbpedia.org/sparql');

        var lugares = '"' + arregloLugares.join('"@en, "') + '"@en';

        var query = `PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX dbr: <http://dbpedia.org/resource/>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        
        SELECT DISTINCT ?place1_name ?place2_name ?relationship
        WHERE {
         ?place1 a dbo:Place.
         ?place2 a dbo:Place.
         ?place1 ?relationship ?place2.
         ?relationship a rdf:Property.
         ?place1 foaf:name ?place1_name.
         ?place2 foaf:name ?place2_name.
         FILTER(?place1_name in (${lugares})).
         FILTER(?place2_name in (${lugares})).
         FILTER(?place1_name != ?place2_name).
        }
        `;

        client.query(query)
            .execute(function(error, results) {
                callback(results);
            });
    },

    premios: function(arregloNombres, callback) {
        
        var client = new SparqlClient('http://dbpedia.org/sparql');

        var names = '"' + arregloNombres.join('"@en, "') + '"@en';

        var query = `PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

        SELECT ?person ?name ?starredIn ?producerOf ?extraOf ?hostOf ?awards
        WHERE {
        ?person a dbo:Person.
        { ?person rdfs:label ?name. }
        UNION
        { ?person dbo:birthName ?name. }
        UNION
        { ?person foaf:name ?name. }
        FILTER(?name in (${names}))
        OPTIONAL { ?starredIn dbo:starring ?person }
        OPTIONAL { ?producerOf dbo:producer ?person }
        OPTIONAL { ?extraOf dbp:extra ?person }
        OPTIONAL { ?hostOf dbo:host ?person }
        OPTIONAL { ?person dbp:awards ?awards }
        }`;

        client.query(query)
            .execute({format: 'resource', resource: 'person'}, function(error, results) {
                callback(results);
            });

    },

    lugarCaracterizado: function(arregloLugares, callback){
        var client = new SparqlClient('http://dbpedia.org/sparql');

        var lugares = '"' + arregloLugares.join('"@en, "') + '"@en';

        var query = `PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX dbr: <http://dbpedia.org/resource/>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX geo:  <http://www.w3.org/2003/01/geo/wgs84_pos#>
        
        SELECT DISTINCT(SAMPLE(?place_name) as ?place_name) (SAMPLE(?lat) as ?lat) (SAMPLE(?lon) as ?lon) (SAMPLE(?country) as ?country) (SAMPLE(?city) as ?city) (SAMPLE(?type) as ?type) ?place
        WHERE {
         ?place a dbo:Place.
         { ?place rdfs:label ?place_name. }
         UNION
         { ?place foaf:name ?place_name. }
         UNION
         { ?place dbo:longName ?place_name. }
         FILTER(?place_name in (${lugares})).
         FILTER NOT EXISTS { ?place dbo:dissolutionYear ?yearEnd }.
         OPTIONAL { ?place geo:lat ?lat. }.
         OPTIONAL { ?place geo:lat ?lat. }.
         OPTIONAL { ?place geo:long ?lon. }.
         OPTIONAL { ?place dbo:country ?country. }.
         OPTIONAL { ?place dbo:city ?city. }.
         OPTIONAL { ?place dbo:type ?type. }.
        } GROUP BY ?place
        `;

        client.query(query)
            .execute(function(error, results) {
                callback(results);
            });
    },

    personasRelacionadas: function(arregloNombres, callback){
        var client = new SparqlClient('http://dbpedia.org/sparql');

        var names = '"' + arregloNombres.join('"@en, "') + '"@en';

        var query = `PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        
        SELECT ?name ?person ?birthDate ?birthPlace ?livingPlace ?occupation ?style ?currentPartner ?parent ?son ?spouse ?relative
        WHERE {
         ?person a dbo:Person.
         { ?person rdfs:label ?name. }
         UNION
         { ?person dbo:birthName ?name. }
         UNION
         { ?person foaf:name ?name. }
         FILTER(?name in (${names}))
         OPTIONAL { ?person dbo:birthDate ?birthDate }
         OPTIONAL { ?person dbo:birthPlace ?birthPlace }
         OPTIONAL { ?person dbo:livingPlace ?livingPlace }
         OPTIONAL { ?person dbo:occupation ?occupation }
         OPTIONAL { ?person dbo:style ?style }
         OPTIONAL { ?person dbo:currentPartner ?currentPartner }
         OPTIONAL { ?person dbo:parent ?parent }
         OPTIONAL { ?person dbo:child ?son }
         OPTIONAL { ?person dbo:spouse ?spouse }
         OPTIONAL { ?person dbo:relative ?relative }
        }`;

        client.query(query)
            .execute(function(error, results) {
                callback(results);
            });
    },

    personasRelacionadas: function(arregloNombres, callback){
        var client = new SparqlClient('http://dbpedia.org/sparql');

        var names = '"' + arregloNombres.join('"@en, "') + '"@en';

        var query = `PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        
        SELECT ?name ?relationship_label ?name2
        WHERE {
         ?person a dbo:Person.
         ?person2 a dbo:Person.
         ?person2 dbo:birthDate ?actualPerson.
         ?person ?relationship ?person2.
         ?relationship rdfs:label ?relationship_label.
         FILTER(?relationship_label not in ("child"@en, "spouse"@en, "parent"@en)).
         FILTER(?relationship_label != "before"@en).
         FILTER(?relationship_label != "after"@en).
         FILTER(LANG(?relationship_label) = "en").
         { ?person rdfs:label ?name. }
         UNION
         { ?person dbo:birthName ?name. }
         UNION
         { ?person foaf:name ?name. }
         FILTER(?name in (${names}))
         { ?person2 rdfs:label ?name2. }
         UNION
         { ?person2 dbo:birthName ?name2. }
         UNION
         { ?person2 foaf:name ?name2. }
         FILTER(?name != ?name2).
         FILTER(LANG(?name2) = "en").
        }`;

        client.query(query)
            .execute(function(error, results) {
                callback(results);
            });
    },

    personasRelacionadas2: function(arregloNombres, callback){
        var client = new SparqlClient('http://dbpedia.org/sparql');

        var names = '"' + arregloNombres.join('"@en, "') + '"@en';

        var query = `PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        
        SELECT ?name ?relationship_label ?name2
        WHERE {
         ?person a dbo:Person.
         ?person2 a dbo:Person.
         ?person2 dbo:birthDate ?actualPerson.
         ?person ?relationship ?person2.
         ?relationship rdfs:label ?relationship_label.
         FILTER(?relationship_label not in ("child"@en, "spouse"@en, "parent"@en)).
         FILTER(?relationship_label != "before"@en).
         FILTER(?relationship_label != "after"@en).
         FILTER(LANG(?relationship_label) = "en").
         { ?person rdfs:label ?name. }
         UNION
         { ?person dbo:birthName ?name. }
         UNION
         { ?person foaf:name ?name. }
         FILTER(?name in (${names})).
         { ?person2 rdfs:label ?name2. }
         UNION
         { ?person2 dbo:birthName ?name2. }
         UNION
         { ?person2 foaf:name ?name2. }
         FILTER(?name != ?name2).
         FILTER(LANG(?name2) = "en").
        }`;

        client.query(query)
            .execute(function(error, results) {
                callback(results);
            });
    }
};



