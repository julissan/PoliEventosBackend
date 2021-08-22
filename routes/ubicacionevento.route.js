var express = require('express');
var router = express.Router();


/**
 * importar controlador
 */

const ubicacionEventoController = require("../controllers/ubicacionevento.controller");


/**
 * rutas **************************************************
*/

router.post('/', ubicacionEventoController.crearUbicacionEvento);

router.get('/', ubicacionEventoController.getUbicacionesEventos);

router.get('/:idUbicacionEvento', ubicacionEventoController.getUbicacionEventoById);

router.delete('/:idUbicacionEvento', ubicacionEventoController.deleteUbicacionEventoById);

router.put('/:idUbicacionEvento', ubicacionEventoController.updateUbicacionEvento);

module.exports = router;