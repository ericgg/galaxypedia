// Controller

const Planet = require('./models/Planet');

// Adicionar um planetas
exports.create = (req, res) => {
	if(!req.body) {
		return res.status(400).send({
			message: "Erro: Dados de planeta vazio"
		});
	};

	const planet = new Planet({
		nome = req.body.nome,
		clima = req.body.clima,
		terreno = req.body.terreno,
		qtdfilme = req.body.qtdfilme
	});

    planet.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erro na criação de dado de Planeta."
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
		let planetArr = [];
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
exports.findOne = (req, res) => {
    Planet.findById(req.params._id)
    .then(planet => {
        if(!planet) {
            return res.status(404).send({
                message: "Planeta com a id " + req.params._id + " não encontrado"
            });            
        }
        res.send(planet);
    }).catch(err => {
        if(err.kind === 'Planet Id') {
            return res.status(404).send({
                message: "Planeta com a id " + req.params._id + " não encontrado"
            });                
        }
        return res.status(500).send({
            message: "Erro ao adquirir informação de planeta com id " + req.params._id
        });
    });
};

//Remover planeta
exports.delete = (req, res) => {
    Planet.findByIdAndRemove(req.params._id)
    .then(planet => {
        if(!planet) {
            return res.status(404).send({
                message: "Planeta com a id " + req.params._id + " não encontrado"
            });
        }
        res.send({message: "Planeta deletado com sucesso"});
    }).catch(err => {
        if(err.kind === 'Planet Id' || err.name === 'NãoEncontrado') {
            return res.status(404).send({
                message: "Planeta com a id " + req.params._id + " não encontrado"
            });                
        }
        return res.status(500).send({
            message: "Não foi possível deletar planeta com id " + req.params._id
        });
    });
};