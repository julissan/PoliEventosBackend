const { InvitadoEvento } = require("../database/db.manager");
const dbManager = require("../database/db.manager");

// Juan David Lis
/**
 * Crea un invitadoevento en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para nuevo invitadoevento
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearInvitadoEvento (req, res){

    /**
     * validar request vacio
     */
    if(!req.body){
        res.send({
            status: "400",
            response: "El body se encuentra vacio."
        });
        return;
    }else{

        /**
         * creacion objeto con datos de entrada
         */
        const newInvitadoEventoObject = {
            idInvitado: req.body.idInvitado,
            idEvento: req.body.idEvento
        }

        /**
         * insertar nuevo invitadoevento
         */
        dbManager.InvitadoEvento.create(newInvitadoEventoObject).then(
            data => {
                res.send({
                    status: "200",
                    response: data
                });
            }
        ).catch(
            error => {
                console.log(error);
                res.send({
                    status: "400",
                    response: "El invitadoevento ya existe"
                });
            }
        );
    }
}


/**
 * devuelve todos los invitadoevento
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos los invitadoevento
 */
async function getInvitadosEventos(req, res){

    try {

        const invitadoseventos = await dbManager.InvitadoEvento.findAll();
        res.send({
            status: "200",
            response: invitadoseventos
        });
    } catch (error) {
        res.send({
            status: "500",
            response: "Error en servidor al listar invitadoseventos"
        });
    }
}


/**
 * Busca un invitadoevento por su campo idInvitadoEvento
 * @param {*} req: idInvitadoEvento del invitadoevento que se desea buscar
 * @param {*} res: Objeto Json con datos del invitadoevento encontrado
 */
async function getInvitadoEventoById(req, res){

    try {

        const {idInvitadoEvento} = req.params;

        const invitadoevento = await dbManager.InvitadoEvento.findOne(
            {
                where: {
                    idInvitadoEvento: idInvitadoEvento
                }
            }
        );
        res.send({
            status: "200",
            response: invitadoevento
        });
    } catch (error) {
        res.send({
            status: "500",
            response: "Error en servidor al buscar invitadoevento"
        });
    }
}

/**
 * Elimina un invitadoevento por su idInvitadoEvento
 * @param {*} req idInvitadoEvento del invitadoevento que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteInvitadoEventoById(req, res){

    try{

        const {idInvitadoEvento} = req.params;

        const invitadoevento = await dbManager.InvitadoEvento.findOne(
            {
                where: {
                    idInvitadoEvento: idInvitadoEvento
                }
            }
        );

        if(!invitadoevento) {
            res.send({
                status: "400",
                response: "El invitadoevento no existe"
            });
        }else{

            await InvitadoEvento.destroy({
                where: {
                  idInvitadoEvento: idInvitadoEvento
                }
            });
    
            res.send({
                status: "200",
                response: "Invitadoevento Eliminado"
            });

        }

    }catch(error){
        res.send({
            status: "500",
            response: "Error en servidor al eliminar invitadoevento"
        });
    }

}

/**
 * Recibe un objeto JSon con la misma estructura que la de creación de invitadoevento

 * Se identifica el invitadoevento que se desea cambiar con el idInvitadoEvento
 * los demas atributos, seran los datos que podran ser actualizados.
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res mensaje informativo
 */
async function updateInvitadoEvento (req, res){

    const {idInvitadoEvento} = req.params;
    const updateInvitadoEvento = {
        idInvitado: req.body.idInvitado,
        idEvento: req.body.idEvento
    }

    dbManager.InvitadoEvento.update(updateInvitadoEvento, {where: {idInvitadoEvento: idInvitadoEvento}}).then(result => {
        res.send({
            status: "200",
            response: result
        });
    }).catch(error => {
        res.send({
            status: "500",
            response: "Hubo un problema al actualizar el invitadoevento"
        });
    })
    
}

exports.crearInvitadoEvento = crearInvitadoEvento;

exports.getInvitadosEventos = getInvitadosEventos;

exports.getInvitadoEventoById = getInvitadoEventoById;

exports.deleteInvitadoEventoById = deleteInvitadoEventoById;

exports.updateInvitadoEvento = updateInvitadoEvento;

