// Modules
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// App
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB
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