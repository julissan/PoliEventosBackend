var express = require('express');
var router = express.Router();


/**
 * importar controlador
 */

const registroController = require("../controllers/registro.controller");


/**
 * rutas **************************************************
*/

router.post('/', registroController.crearRegistro);

router.get('/', registroController.getRegistros);

router.get('/:idRegistro', registroController.getRegistroById);

router.delete('/:idRegistro', registroController.deleteRegistroById);

router.put('/:idRegistro', registroController.updateRegistro);

router.get('/evento/:idEvento', registroController.getRegistrosByEvento);

module.exports = router;