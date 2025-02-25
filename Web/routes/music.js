var express = require('express');
var router = express.Router();

var file = "/album_triples.owl";
var queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                    "PREFIX ont: <http://www.semanticweb.org/matteo/ontologies/project#> " +
                    "SELECT ?uri ?title ?artist ?year " +
                    "WHERE { " +
                    "	?uri rdf:type ont:Album . " +
                    "	?uri ont:album_title ?title . " +
                    "	?uri ont:recordedBy ?arturi . " +
                    "	?arturi ont:person_name ?artist . " +
                    "   ?uri ont:album_year ?year . " +
                    "} ";

var myquery = require('../public/javascripts/query');
var queryResults = myquery(file, queryString);


router.get('/', function(req, res, next) {
    res.render('table', {data: queryResults});
});


router.get('/*', function(req, res, next) {
    var album = req.url.substring(1, req.url.length);
    var data = {};

    for (var i = 0; i < queryResults.length; i++)
        if (album === queryResults[i].uri)
            data = queryResults[i];

    res.render('info', {data: data});
});

module.exports = router;
