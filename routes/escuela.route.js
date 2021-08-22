var express = require('express');
var router = express.Router();


/**
 * importar controlador
 */

const escuelaController = require("../controllers/escuela.controller");


/**
 * rutas **************************************************
*/

router.post('/', escuelaController.crearEscuela);

router.get('/', escuelaController.getEscuelas);

router.get('/:idEscuela', escuelaController.getEscuelaById);

router.delete('/:idEscuela', escuelaController.deleteEscuelaById);

router.put('/:idEscuela', escuelaController.updateEscuela);

module.exports = router;