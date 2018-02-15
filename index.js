//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.  
var express = require('express'); 
var bodyParser = require('body-parser');
// Nous définissons ici les paramètres du serveur.
var hostname = 'localhost'; 
var port = 8080; 
 
// Nous créons un objet de type Express. 
var app = express(); 

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Public path
var publicPath = 'public';

// Définition du dossier public
app.use(express.static(publicPath));
 
app.get('/', function(req, res) {

  console.log("HOME");

});

// Démarrer le serveur 
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port); 
});