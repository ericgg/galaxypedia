// Planet model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var planetSchema = new Schema({
	nome: {
	 	type: String,
	 	required: true 
	},
	clima: { 
		type: String,
		required: true
	},
	terreno: {
		type: String,
		required: true
	},
	qtdfilme: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Planet', planetSchema);