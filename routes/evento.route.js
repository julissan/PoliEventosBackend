var express = require('express');
var router = express.Router();


/**
 * importar controlador
 */

const eventoController = require("../controllers/evento.controller");


/**
 * rutas **************************************************
*/

router.post('/', eventoController.crearEvento);

router.get('/', eventoController.getEventos);

router.get('/:idEvento', eventoController.getEventoById);

router.delete('/:idEvento', eventoController.deleteEventoById);

router.put('/:idEvento', eventoController.updateEvento);

router.get('/reporte/:idEvento', eventoController.getReporte);

router.get('/organo/:idOrganoInstitucional', eventoController.getEventoByOrgano);

router.get('/escuela/:idEscuela', eventoController.getEventoByEscuela);

router.get('/programa/:idPrograma', eventoController.getEventoByPrograma);

router.get('/year/:year', eventoController.getEventoByYear);

router.get('/invitados/:idEvento', eventoController.getInvitadosByEvento);

router.get('/interesados/:idEvento', eventoController.getInteresadosByEvento);

router.get('/ubicaciones/:idEvento', eventoController.getUbicacionesByEvento);

module.exports = router;