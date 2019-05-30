// Express
let express = require('express')

//App
let app = express();

//Server port
var port = process.env.PORT || '8080';

//
app.get('/', function(req, res) {
	res.send("Hello world!! Utilizando express");
});

// Launch app
app.listen(port, () => console.log(`Servidor rodando na porta:${port}`));