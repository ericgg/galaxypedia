// Modules
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// App
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// DB

require('./planet.routes.js')(app);

mongoose.connect('mongodb://localhost/dbgalaxy', {
    useNewUrlParser: true
	}).then(() => {
    	console.log("Conectado no banco de dados");    
	}).catch(err => {
    	console.log('Erro ao conectar no banco de dados', err);
    	process.exit();
	});

var db = mongoose.connection;


//Server port
var port = process.env.PORT || '8080';

//
app.get('/', function(req, res) {
	res.send("Hello world!! Utilizando express");
});

// Launch app
app.listen(port, () => console.log(`Servidor rodando na porta:${port}`));

// Importar routes
let apiRoutes = require("./api-routes");

// Usar api routes no app
app.use('/api', apiRoutes);