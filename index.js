//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.  
var express = require('express');
var bodyParser = require('body-parser');
// Nous définissons ici les paramètres du serveur.
var hostname = 'localhost';
var port = 8080;

// Nous créons un objet de type Express. 
var app = express();

var fs = require("fs");
var contents = fs.readFileSync("public/data/aoe2.json");
var jsonContent = JSON.parse(contents);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Public path
var publicPath = 'public';

// Définition du dossier public
app.use(express.static(publicPath));

app.get('/', function (req, res) {

  console.log("HOME");
  res.setHeader('Content-Type', 'text/plain');
  //res.send(JSON.stringify({ a: 1 }));
  res.send(jsonContent["units"]["Archery Range"][0].Name);

});

app.get('/units', function (req, res) {

  console.log("Sending the JSON Units");
  res.setHeader('Content-Type', 'application/json');
  res.send(jsonContent.units);

});

app.get('/units/:name', function (req, res) {
  var found = false;
  console.log("Sending the JSON Units");
  res.setHeader('Content-Type', 'text/plain');
  for (bat in jsonContent.units) {
    for (unit in jsonContent.units[bat]) {
      if (req.params.name == jsonContent.units[bat][unit].Name) {
        res.send(jsonContent.units[bat][unit]);
        found = true;
        break;
      }
      if (found) break;
    }
  }
  // Not found
  if (!found)
    res.send("error not found");
});

app.get('/structures/:name', function (req, res) {

  var found = false;
  console.log("Sending the JSON Structures");
  res.setHeader('Content-Type', 'text/plain');
  for (bat in jsonContent.structures) {
    for (unit in jsonContent.structures[bat]) {
      if (req.params.name == jsonContent.structures[bat][unit].Name) {
        res.send(jsonContent.structures[bat][unit]);
        found = true;
        break;
      }
      if (found) break;
    }
  }
  // Not found
  if (!found)
    res.send("error not found");
});

app.get('/structures', function (req, res) {

  console.log("Sending the JSON Units");
  res.setHeader('Content-Type', 'application/json');
  res.send(jsonContent.structures);

});

// Démarrer le serveur 
app.listen(port, hostname, function () {
  console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port);
});