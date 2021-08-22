var express = require('express');
var router = express.Router();


/**
 * importar controlador
 */

const invitadoEventoController = require("../controllers/invitadoevento.controller");


/**
 * rutas **************************************************
*/

router.post('/', invitadoEventoController.crearInvitadoEvento);

router.get('/', invitadoEventoController.getInvitadosEventos);

router.get('/:idInvitadoEvento', invitadoEventoController.getInvitadoEventoById);

router.delete('/:idInvitadoEvento', invitadoEventoController.deleteInvitadoEventoById);

router.put('/:idInvitadoEvento', invitadoEventoController.updateInvitadoEvento);

module.exports = router;