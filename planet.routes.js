module.exports = (app) => {
	const planets = require('./planet.controller.js');

	//Adicionar planeta
	app.post('/planets', planets.create);
	//Listar planetas
	app.get('/planets', planets.findAll);
	//Buscar por nome
	app.get('/planets/:nome', planets.find)
	//Buscar por ID
	app.get('/planetsid/:planetId', planets.findById);
	//Remover planeta
	app.delete('/planetsid/:planetId', planets.delete);
}