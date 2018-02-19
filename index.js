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

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/', function (req, res) {

  console.log("HOME");
  res.setHeader('Content-Type', 'application/json');
  //res.send(JSON.stringify({ a: 1 }));
  res.send("Welcome !\nYou can try :\n- /units\n- /units/nameoftheunit");

});

// Units List
app.get('/units', function (req, res) {

  console.log("Sending the JSON Units");
  res.setHeader('Content-Type', 'application/json');
  res.send(jsonContent.units);

});

//Units List for specify structure
app.get('/units/structures/:structures', function(req, res) {

  console.log("Sending the JSON Units for specify structure");
  res.setHeader('Content-Type', 'application/json');
  res.send(jsonContent.units[req.params.structures]);

});

//Unit with specify name
app.get('/units/:name', function (req, res) {
  var found = false;
  console.log("Sending the JSON Units");
  res.setHeader('Content-Type', 'application/json');
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

// Get an array of all units who have their stat "query" equal to "value"
app.get('/units/query/:query/:value', function (req, res) {
  var found = false;
  var allUnits = [];
  console.log("Sending the JSON Units");
  res.setHeader('Content-Type', 'application/json');
  
  for (bat in jsonContent.units) {
    for (unit in jsonContent.units[bat]) {
      var query = req.params.query
      var value = req.params.value
      //console.log(query);
      //console.log(jsonContent.units[bat][unit][query]);
      if (jsonContent.units[bat][unit][query] == value) {
      allUnits.push(jsonContent.units[bat][unit]);
      }
    }
  }
  if (allUnits.length != 0) {
   var toto = JSON.stringify(allUnits);
    res.send("{\"Units\" : " + toto + "}");
  } else {
    res.send("error not found");
  }

});

//Structure with specify name
app.get('/structures/:name', function (req, res) {

  var found = false;
  console.log("Sending the JSON Structures");
  res.setHeader('Content-Type', 'application/json');
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

//Structures List
app.get('/structures', function (req, res) {

  console.log("Sending the JSON Units");
  res.setHeader('Content-Type', 'application/json');
  res.send(jsonContent.structures);

});

// Démarrer le serveur 
app.listen(port, hostname, function () {
  console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port);
});