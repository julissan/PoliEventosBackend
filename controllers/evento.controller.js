const { Evento } = require("../database/db.manager");
const dbManager = require("../database/db.manager");


// Juan David Lis
/**
 * Crea un evento en la base de datos y lo retorna
 * @param {*} req : objeto json con atributos para nuevo evento
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearEvento (req, res){

    /**
     * validar request vacio
     */
    if(!req.body){
        res.status(400).send({
            message: "El body se encuentra vacio."
        });
        return;
    }else{

        /**
         * creacion objeto con datos de entrada
         */
        const date = new Date(req.body.fechaInicio);
        const year = date.getFullYear();
        const newEventoObject = {
            nombreEvento: req.body.nombreEvento,
            fechaInicio: req.body.fechaInicio,
            fechaFin: req.body.fechaFin,
            year: year,
            fueRealizado: req.body.fueRealizado,
            motivoDeNoRealizacion: req.body.motivoDeNoRealizacion,
            encuestaEvento: req.body.encuestaEvento,
            resultadosEncuesta: req.body.resultadosEncuesta,
            idOrganoInstitucional: req.body.idOrganoInstitucional,
            idEscuela: req.body.idEscuela,
            idPrograma: req.body.idPrograma,
            idOrganizadorEvento: req.body.idOrganizadorEvento
        }

        /**
         * insertar nuevo evento
         */
        dbManager.Evento.create(newEventoObject).then(
            data => {
                res.send(data);
            }
        ).catch(
            error => {
                console.log(error);
                res.status(400).send({
                    message: "El evento ya existe"
                });
            }
        );
    }
}


/**
 * devuelve todos los eventos
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos los eventos
 */
async function getEventos(req, res){

    try {

        const eventos = await dbManager.Evento.findAll();
        res.json(
            {
                data: eventos
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar eventos"
            }
        );
    }
}


/**
 * Busca un evento por su campo idEvento
 * @param {*} req: idEvento del evento que se desea buscar
 * @param {*} res: Objeto Json con datos del evento encontrado
 */
async function getEventoById(req, res){

    try {

        const {idEvento} = req.params;

        const evento = await dbManager.Evento.findOne(
            {
                where: {
                    idEvento: idEvento
                }
            }
        );
        res.json(evento);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar evento"
            }
        );
    }
}

/**
 * Elimina un evento por su idEvento
 * @param {*} req idEvento del evento que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteEventoById(req, res){

    try{

        const {idEvento} = req.params;

        const evento = await dbManager.Evento.findOne(
            {
                where: {
                    idEvento: idEvento
                }
            }
        );

        if(!evento) {
            res.send(
                {
                    message:"El evento no existe"
                }
            );
        }else{

            await Evento.destroy({
                where: {
                  idEvento: idEvento
                }
            });
    
            res.send(
                {
                    message:"Evento Eliminado"
                }
            );

        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar evento"
            }
        );
    }

}

/**
 * Recibe un objeto JSon con la misma estructura que la de creación de evento

 * Se identifica el evento que se desea cambiar con el idEvento
 * los demas atributos, seran los datos que podran ser actualizados.
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res mensaje informativo
 */
async function updateEvento (req, res){

    const {idEvento} = req.params;
    const date = new Date(req.body.fechaInicio);
    const year = date.getFullYear();
    const updateEvento = {
        nombreEvento: req.body.nombreEvento,
        fechaInicio: req.body.fechaInicio,
        fechaFin: req.body.fechaFin,
        year: year,
        fueRealizado: req.body.fueRealizado,
        motivoDeNoRealizacion: req.body.motivoDeNoRealizacion,
        encuestaEvento: req.body.encuestaEvento,
        resultadosEncuesta: req.body.resultadosEncuesta,
        idOrganoInstitucional: req.body.idOrganoInstitucional,
        idEscuela: req.body.idEscuela,
        idPrograma: req.body.idPrograma,
        idOrganizadorEvento: req.body.idOrganizadorEvento
    }

    dbManager.Evento.update(updateEvento, {where: {idEvento: idEvento}}).then(result => {
        res.status(200).json({
            message: "Evento actualizado satisfactoriamente",
            post: result
        })
    }).catch(error => {
        res.status(500).json({
            message: "Hubo un problema al actualizar el evento",
            error: result
        })
    })
    
}

async function getReporte (req, res){
    const {idEvento} = req.params;
    try {

        const evento = await dbManager.Evento.findOne(
            {
                where: {
                    idEvento: idEvento
                }
            }
        );
        
        const programa = await dbManager.Programa.findOne(
            {
                where: {
                    idPrograma: evento.idPrograma
                }
            }
        );

        const escuela = await dbManager.Escuela.findOne(
            {
                where: {
                    idEscuela: evento.idEscuela
                }
            }
        );

        const organoInstitucional = await dbManager.OrganoInstitucional.findOne(
            {
                where: {
                    idOrganoInstitucional: evento.idOrganoInstitucional
                }
            }
        );

        const organizadorEvento = await dbManager.OrganizadorDirectivo.findOne(
            {
                where: {
                    idOrganizadorDirectivo: evento.idOrganizadorEvento
                }
            }
        );
        
        var registrados = await dbManager.InteresadoEvento.findAll(
            {
                where: {
                    idEvento: idEvento
                }
            }
        );

        const reporteEvento = {
            Nombre: evento.nombreEvento,
            FechaDeInicio: evento.fechaInicio,
            FechaDeFin: evento.fechaFin,
            FueRealizado: evento.fueRealizado,
            MotivoDeNoRealizacion: evento.motivoDeNoRealizacion,
            EncuestaEvento: evento.encuestaEvento,
            ResultadosEncuesta: evento.resultadosEncuesta,
            NumeroDeRegistrados: registrados.length,
            OrganoInstitucional: organoInstitucional.nombreOrganoInstitucional,
            Escuela: escuela.nombreEscuela,
            Programa: programa.nombrePrograma,
            CreadoPor: organizadorEvento.nombreOrganizadorDirectivo
        }

        res.json(
            {
                data: reporteEvento
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error al generar el reporte"
            }
        );
    }
}

async function getEventoByOrgano(req, res){

    try {

        const {idOrganoInstitucional} = req.params;

        const eventos = await dbManager.Evento.findAll(
            {
                where: {
                    idOrganoInstitucional: idOrganoInstitucional
                }
            }
        );
        res.json(
            {
                data: eventos
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar eventos por organo institucional"
            }
        );
    }
}

async function getEventoByEscuela(req, res){

    try {

        const {idEscuela} = req.params;

        const eventos = await dbManager.Evento.findAll(
            {
                where: {
                    idEscuela: idEscuela
                }
            }
        );
        res.json(
            {
                data: eventos
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar eventos por escuela"
            }
        );
    }
}

async function getEventoByPrograma(req, res){

    try {

        const {idPrograma} = req.params;

        const eventos = await dbManager.Evento.findAll(
            {
                where: {
                    idPrograma: idPrograma
                }
            }
        );
        res.json(
            {
                data: eventos
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar eventos por programa"
            }
        );
    }
}

async function getEventoByYear(req, res){
    try {

        const {year} = req.params;

        const eventos = await dbManager.Evento.findAll(
            {
                where: {
                    year: year
                }
            }
        );
        res.json(
            {
                data: eventos
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar eventos por año"
            }
        );
    }
}

async function getInvitadosByEvento(req, res){

    const {idEvento} = req.params;

    try {

        var invitadoseventos = await dbManager.InvitadoEvento.findAll(
            {
                attributes: ['idInvitado'],
                where: {
                    idEvento: idEvento
                }
            }
        );

        var array = [];
        invitadoseventos.forEach(function(item){
        
        if(array.indexOf(item.idInvitado) == -1)
        {
            array.push(item.idInvitado);
        }
        });

        const invitados = await dbManager.Invitado.findAll(
            {
                where: {
                    idInvitado: array
                }
            }
        );

        res.json(
            {
                data: invitados
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar invitados"
            }
        );
    }
}

async function getInteresadosByEvento(req, res){

    const {idEvento} = req.params;

    try {

        var interesadoseventos = await dbManager.InteresadoEvento.findAll(
            {
                attributes: ['idInteresado'],
                where: {
                    idEvento: idEvento
                }
            }
        );

        var array = [];
        interesadoseventos.forEach(function(item){
        
        if(array.indexOf(item.idInteresado) == -1)
        {
            array.push(item.idInteresado);
        }
        });

        const interesados = await dbManager.Interesado.findAll(
            {
                where: {
                    idInteresado: array
                }
            }
        );

        res.json(
            {
                data: interesados
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar interesados"
            }
        );
    }
}

async function getUbicacionesByEvento(req, res){

    const {idEvento} = req.params;

    try {

        var ubicacioneseventos = await dbManager.UbicacionEvento.findAll(
            {
                attributes: ['idUbicacion'],
                where: {
                    idEvento: idEvento
                }
            }
        );

        var array = [];
        ubicacioneseventos.forEach(function(item){
        
        if(array.indexOf(item.idUbicacion) == -1)
        {
            array.push(item.idUbicacion);
        }
        });

        const ubicaciones = await dbManager.Ubicacion.findAll(
            {
                where: {
                    idUbicacion: array
                }
            }
        );

        res.json(
            {
                data: ubicaciones
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar ubicaciones"
            }
        );
    }
}

exports.crearEvento = crearEvento;

exports.getEventos = getEventos;

exports.getEventoById = getEventoById;

exports.deleteEventoById = deleteEventoById;

exports.updateEvento = updateEvento;

exports.getReporte  = getReporte;

exports.getEventoByOrgano  = getEventoByOrgano;

exports.getEventoByEscuela  = getEventoByEscuela;

exports.getEventoByPrograma  = getEventoByPrograma;

exports.getEventoByYear  = getEventoByYear;

exports.getInvitadosByEvento = getInvitadosByEvento;

exports.getInteresadosByEvento = getInteresadosByEvento;

exports.getUbicacionesByEvento = getUbicacionesByEvento;



