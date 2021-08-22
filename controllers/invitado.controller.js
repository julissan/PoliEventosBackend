const { Invitado } = require("../database/db.manager");
const dbManager = require("../database/db.manager");

// Juan David Lis
/**
 * Crea un invitado en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para nuevo invitado
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearInvitado (req, res){

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
        const newInvitadoObject = {
            nombreInvitado: req.body.nombreInvitado,
            correoInvitado: req.body.correoInvitado,
            credencialesInvitado: req.body.credencialesInvitado

        }

        /**
         * insertar nuevo invitado
         */
        dbManager.Invitado.create(newInvitadoObject).then(
            data => {
                res.send(data);
            }
        ).catch(
            error => {
                console.log(error);
                res.status(400).send({
                    message: "El invitado ya existe"
                });
            }
        );
    }
}


/**
 * devuelve todos los invitados
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos los invitados
 */
async function getInvitados(req, res){

    try {

        const invitados = await dbManager.Invitado.findAll();
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


/**
 * Busca un invitado por su campo idInvitado
 * @param {*} req: idInvitado del invitado que se desea buscar
 * @param {*} res: Objeto Json con datos del invitado encontrada
 */
async function getInvitadoById(req, res){

    try {

        const {idInvitado} = req.params;

        const invitado = await dbManager.Invitado.findOne(
            {
                where: {
                    idInvitado: idInvitado
                }
            }
        );
        res.json(invitado);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar invitado"
            }
        );
    }
}

/**
 * Elimina un invitado por su idInvitado
 * @param {*} req idInvitado del invitado que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteInvitadoById(req, res){

    try{

        const {idInvitado} = req.params;

        const invitado = await dbManager.Invitado.findOne(
            {
                where: {
                    idInvitado: idInvitado
                }
            }
        );

        if(!invitado) {
            res.send(
                {
                    message:"El invitado no existe"
                }
            );
        }else{

            await Invitado.destroy({
                where: {
                  idInvitado: idInvitado
                }
            });
    
            res.send(
                {
                    message:"Invitado Eliminado"
                }
            );

        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar invitado"
            }
        );
    }

}

/**
 * Recibe un objeto JSon con la misma estructura que la de creación de invitado
 * Se identifica el invitado que se desea cambiar con el idInvitado
 * los demas atributos, seran los datos que podran ser actualizados.
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res mensaje informativo
 */
async function updateInvitado (req, res){

    const {idInvitado} = req.params;
    const updateInvitado = {
        nombreInvitado: req.body.nombreInvitado,
        correoInvitado: req.body.correoInvitado,
        credencialesInvitado: req.body.credencialesInvitado
    }

    dbManager.Invitado.update(updateInvitado, {where: {idInvitado: idInvitado}}).then(result => {
        res.status(200).json({
            message: "Invitado actualizado satisfactoriamente",
            post: result
        })
    }).catch(error => {
        res.status(500).json({
            message: "Hubo un problema al actualizar el invitado",
            error: result
        })
    })
    
}

exports.crearInvitado = crearInvitado;

exports.getInvitados = getInvitados;

exports.getInvitadoById = getInvitadoById;

exports.deleteInvitadoById = deleteInvitadoById;

exports.updateInvitado = updateInvitado;