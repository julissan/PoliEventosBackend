var express = require('express');
var router = express.Router();


/**
 * importar controlador
 */

const interesadoEventoController = require("../controllers/interesadoevento.controller");


/**
 * rutas **************************************************
*/

router.post('/', interesadoEventoController.crearInteresadoEvento);

router.get('/', interesadoEventoController.getInteresadosEventos);

router.get('/:idInteresadoEvento', interesadoEventoController.getInteresadoEventoById);

router.delete('/:idInteresadoEvento', interesadoEventoController.deleteInteresadoEventoById);

router.put('/:idInteresadoEvento', interesadoEventoController.updateInteresadoEvento);

module.exports = router;