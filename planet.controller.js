let got = require('got');

// Controller

const Planet = require('./models/Planet');

// Adicionar um planetas
exports.create = (req, res) => {
	if(!req.body) {
		return res.status(400).send({
			message: "Erro: Dados de planeta vazio"
		});
	};

	var resqtdFilme;

	got('https://swapi.co/api/planets/?search='+req.body.nome, { json: true })
	.then(function(response) {
  		resqtdFilme = response.body.results[0].films.length;

		const planet = new Planet({
			nome: req.body.nome,
			clima: req.body.clima,
			terreno: req.body.terreno,
			qtdfilme: resqtdFilme
		});

	    planet.save()
	    .then(data => {
	        res.send(data);
	    }).catch(err => {
	        res.status(500).send({
	            message: err.message || "Erro na criação de dado de Planeta."
	        });
	    });
   	});
	
};

//Listar planetas
exports.findAll = (req, res) => {
    Planet.find()
    .then(planets => {
        res.send(planets);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erro na busca por planetas."
        });
    });
};

//Buscar por nome
exports.find = (req, res) => {
	Planet.find({ nome: req.params.nome }, (err, planets) => {
		let planetsArr = [];
		if (err){
			return res.status(500).send({
				message: err.message || "Erro na busca por planetas por nome."
			});
		}
		if (planets) {
			planets.forEach(planets => {
				planetsArr.push(planets);
			});
		}
		res.send(planetsArr);
	});
}

//Busca por ID
exports.findById = (req, res) => {
    Planet.findById(req.params.planetId)
    .then(planet => {
        if(!planet) {
            return res.status(404).send({
                message: "Planeta com a id " + req.params.planetId + " não encontrado"
            });            
        }
        res.send(planet);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Planeta com a id " + req.params.planetId + " não encontrado"
            });                
        }
        return res.status(500).send({
            message: "Erro ao adquirir informação de planeta com id " + req.params.planetId
        });
    });
};

//Remover planeta
exports.delete = (req, res) => {
    Planet.findByIdAndRemove(req.params.planetId)
    .then(planet => {
        if(!planet) {
            return res.status(404).send({
                message: "Planeta com a id " + req.params.planetId + " não encontrado"
            });
        }
        res.send({message: "Planeta deletado com sucesso"});
    }).catch(err => {
        if(err.kind === 'Planet Id' || err.name === 'NãoEncontrado') {
            return res.status(404).send({
                message: "Planeta com a id " + req.params.planetId + " não encontrado"
            });                
        }
        return res.status(500).send({
            message: "Não foi possível deletar planeta com id " + req.params.planetId
        });
    });
};