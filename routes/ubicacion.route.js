var express = require('express');
var router = express.Router();


/**
 * importar controlador
 */

const ubicacionController = require("../controllers/ubicacion.controller");


/**
 * rutas **************************************************
*/

router.post('/', ubicacionController.crearUbicacion);

router.get('/', ubicacionController.getUbicaciones);

router.get('/:idUbicacion', ubicacionController.getUbicacionById);

router.delete('/:idUbicacion', ubicacionController.deleteUbicacionById);

router.put('/:idUbicacion', ubicacionController.updateUbicacion);

module.exports = router;