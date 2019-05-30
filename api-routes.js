// Inicializar router
let router = require('express').Router();

// API resposta padrão
router.get('/', function(req,res) {
	res.json({
		status: 'API funcionando',
		message: 'Bem vindo',
	});
});

// Export API routes
module.exports = router;