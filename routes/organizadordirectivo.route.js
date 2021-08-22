var express = require('express');
var router = express.Router();


/**
 * importar controlador
 */

const organizadorDirectivoController = require("../controllers/organizadordirectivo.controller");


/**
 * rutas **************************************************
*/

router.post('/', organizadorDirectivoController.crearOrganizadorDirectivo);

router.get('/', organizadorDirectivoController.getOrganizadoresDirectivos);

router.get('/:idOrganizadorDirectivo', organizadorDirectivoController.getOrganizadorDirectivoById);

router.delete('/:idOrganizadorDirectivo', organizadorDirectivoController.deleteOrganizadorDirectivoById);

router.put('/:idOrganizadorDirectivo', organizadorDirectivoController.updateOrganizadorDirectivo);

router.post('/login/', organizadorDirectivoController.iniciarSesion);

module.exports = router;