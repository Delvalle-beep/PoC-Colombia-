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
        server_url:"bolt://81be9d2a.databases.neo4j.io",
        server_user: "neo4j",
        server_password: "YwDLFYIdfoKfFZUcbOIKRwh-7xtZC8bz1hbrzgNpUKs",
        labels: {
            "Producto": {
                "caption": "producto",
                "size": "pagerank",
                "community": "community"
            },
            "Tipo_Reporte_Precio":{
                "caption": "tipo_reporte_precio",
                "community": "community"
            },
            "Unidades":{
                "caption": "unidades",
                "size":"pagerank",
                "community": "community"
            },
            "Fecha":{
                "caption":"fecha",
                "community":"community"
            },
            "Pais":{
                "caption":"pais"
            },
            "Departamento":{
                "caption":"departamento"
            },
            "Municipio":{
                "caption":"departamento"
            },
            "Estado_Cum":{
                "caption":"estado_cum"
            },
            "Estado_del_Registro":{
                "caption":"estado_del_registro"
            },
            "Tercer_Nivel":{
                "caption":"tercer_nivel"
            },
            "Via_de_Administracion":{
                "caption":"via_administracion"
            },
            "Grupo_Anatomico":{
                "caption":"grupo_anatomico"
            },
            "Medicamento":{
                "caption":"medicamento"
            },
            "Principio_Activo":{
                "caption":"principio_activo"
            },
            "Subgrupo_Farmacologico":{
                "caption":"subgrupo_farmacologico"
            },
            "Subgrupo_Quimico":{
                "caption":"subgrupo_quimico"
            },
            "Subgrupo_Terapeutico":{
                "caption":"subgrupo_terapeutico"
            },
            "Tipo Entidad":{
                "caption":"tipo entidad"
            },
            "Normalizado":{
                "caption":"normalizado"
            },
            "Valor_Total":{
                "caption":"valor_total",
                "size":"pagerank"
            },
            "Valor_Medio":{
                "caption":"valor_medio",
                "size":"pagerank"
            }
        },
        relationships: {
            "CONTIENE": {
                "thickness": "weight"
            }   
        },
        initial_cypher: `LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/LadyWinehouse/PoC-Colombia-/main/CSV/L%20-%20AGENTES%20ANTINEOPLASICOS%20E%20INMUNOMODULADORES%20-%20TRATADO%20-%20NEO4J.xlsx%20-%20Sheet1.csv" AS row
        MATCH (n) RETURN (n) `,
        encrypted: "ENCRYPTION_OFF",
        trust: "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES"
    };

    res.render('index', {configs: config});
})

app.listen(3000);

module.exports = app;

