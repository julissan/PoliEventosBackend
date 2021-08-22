var express = require('express');
var router = express.Router();


/**
 * importar controlador
 */

const invitadoController = require("../controllers/invitado.controller");


/**
 * rutas **************************************************
*/

router.post('/', invitadoController.crearInvitado);

router.get('/', invitadoController.getInvitados);

router.get('/:idInvitado', invitadoController.getInvitadoById);

router.delete('/:idInvitado', invitadoController.deleteInvitadoById);

router.put('/:idInvitado', invitadoController.updateInvitado);

module.exports = router;