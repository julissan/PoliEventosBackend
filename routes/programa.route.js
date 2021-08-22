var express = require('express');
var router = express.Router();


/**
 * importar controlador
 */

const programaController = require("../controllers/programa.controller");


/**
 * rutas **************************************************
*/

router.post('/', programaController.crearPrograma);

router.get('/', programaController.getProgramas);

router.get('/:idPrograma', programaController.getProgramaById);

router.delete('/:idPrograma', programaController.deleteProgramaById);

router.put('/:idPrograma', programaController.updatePrograma);

module.exports = router;