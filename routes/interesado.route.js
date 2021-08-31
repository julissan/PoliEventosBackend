var express = require('express');
var router = express.Router();


/**
 * importar controlador
 */

const interesadoController = require("../controllers/interesado.controller");


/**
 * rutas **************************************************
*/

router.post('/', interesadoController.crearInteresado);

router.get('/', interesadoController.getInteresados);

router.get('/:idInteresado', interesadoController.getInteresadoById);

router.delete('/:idInteresado', interesadoController.deleteInteresadoById);

router.put('/:idInteresado', interesadoController.updateInteresado);

router.get('/codigo/:codigoInteresado', interesadoController.getInteresadoByCodigo);

module.exports = router;