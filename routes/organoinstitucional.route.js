var express = require('express');
var router = express.Router();


/**
 * importar controlador
 */

const organoInstitucionalController = require("../controllers/organoinstitucional.controller");


/**
 * rutas **************************************************
*/

router.post('/', organoInstitucionalController.crearOrganoInstitucional);

router.get('/', organoInstitucionalController.getOrganosInstitucionales);

router.get('/:idOrganoInstitucional', organoInstitucionalController.getOrganoInstitucionalById);

router.delete('/:idOrganoInstitucional', organoInstitucionalController.deleteOrganoInstitucionalById);

router.put('/:idOrganoInstitucional', organoInstitucionalController.updateOrganoInstitucional);

module.exports = router;