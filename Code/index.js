var express = require('express');
var path = require('path');
var logger = require('morgan');
var fs = require('fs').promises;
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');
// var neovis = require('neovis.js');


var app = express();

//View Engine 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));

//neo4j.driver(Url do DataBase)
//Aonde está neo4j.auth.basic('login','senha') alterar os campos

app.get('/', async function(req, res){
         var config = {
        container_id: "viz",
        server_url:"bolt://329d7fe5.databases.neo4j.io",
        server_user: "neo4j",
        server_password: "ODTh9yjO_OwR0cZxNy5oY8hkLOt84dDpFw1A9-ibuLA",
        labels: {
            "Producto":{
                caption:"producto",
                size:"pagerank",
                community:"community"
            },
            "Administracion":{
                caption: "via administracion",
            }
        },
        relationships: {
            "IS_CONTAINED":{
                thickness:"weight"
            }
       
        },
        initial_cypher: `LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/LadyWinehouse/PoC-Colombia-/main/CSV/L%20-%20AGENTES%20ANTINEOPLASICOS%20E%20INMUNOMODULADORES%20-%20TRATADO%20-%20NEO4J.xlsx%20-%20Sheet1.csv" AS row
        MATCH (p:Producto {producto:row.producto})
        RETURN p`,

        encrypted: "ENCRYPTION_OFF",
        trust: "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES"
    };
//SET linhas após o titulo, renomear label atual 
    res.render('index', {configs: config});
})

app.listen(3000);

module.exports = app;

