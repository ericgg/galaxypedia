// Planet model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planetSchema = new Schema({
	nome: { type: String, required: true },
	clima: { type: String, required: true },
	terreno: { type: String, required: true },
	qtdfilme: { type: Number, required: true }
});

module.exports = mongoose.model('Planet', planetSchema);