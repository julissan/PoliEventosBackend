const { UbicacionEvento } = require("../database/db.manager");
const dbManager = require("../database/db.manager");

// Juan David Lis
/**
 * Crea una ubicacionevento en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para nueva ubicacionevento
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearUbicacionEvento (req, res){

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
        const newUbicacionEventoObject = {
            idUbicacion: req.body.idUbicacion,
            idEvento: req.body.idEvento
        }

        /**
         * insertar nueva ubicacionevento
         */
        dbManager.UbicacionEvento.create(newUbicacionEventoObject).then(
            data => {
                res.send(data);
            }
        ).catch(
            error => {
                console.log(error);
                res.status(400).send({
                    message: "La ubicacionevento ya existe"
                });
            }
        );
    }
}


/**
 * devuelve todas las ubicacioneseventos
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todas las ubicacioneseventos
 */
async function getUbicacionesEventos(req, res){

    try {

        const ubicacioneseventos = await dbManager.UbicacionEvento.findAll();
        res.json(
            {
                data: ubicacioneseventos
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar ubicacioneseventos"
            }
        );
    }
}


/**
 * Busca una ubicacionevento por su campo idUbicacionEvento
 * @param {*} req: idUbicacionEvento de la ubicacionevento que se desea buscar
 * @param {*} res: Objeto Json con datos de la ubicacionevento encontrada
 */
async function getUbicacionEventoById(req, res){

    try {

        const {idUbicacionEvento} = req.params;

        const ubicacionevento = await dbManager.UbicacionEvento.findOne(
            {
                where: {
                    idUbicacionEvento: idUbicacionEvento
                }
            }
        );
        res.json(ubicacionevento);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar ubicacionevento"
            }
        );
    }
}

/**
 * Elimina una ubicacionevento por su idUbicacionEvento
 * @param {*} req idUbicacionEvento de la ubicacionevento que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteUbicacionEventoById(req, res){

    try{

        const {idUbicacionEvento} = req.params;

        const ubicacionevento = await dbManager.UbicacionEvento.findOne(
            {
                where: {
                    idUbicacionEvento: idUbicacionEvento
                }
            }
        );

        if(!ubicacionevento) {
            res.send(
                {
                    message:"La ubicacionevento no existe"
                }
            );
        }else{

            await UbicacionEvento.destroy({
                where: {
                  idUbicacionEvento: idUbicacionEvento
                }
            });
    
            res.send(
                {
                    message:"ubicacionevento Eliminada"
                }
            );

        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar ubicacionevento"
            }
        );
    }

}

/**
 * Recibe un objeto JSon con la misma estructura que la de creación de ubicacionevento

 * Se identifica la ubicacionevento que se desea cambiar con el idUbicacionEvento
 * los demas atributos, seran los datos que podran ser actualizados.
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res mensaje informativo
 */
async function updateUbicacionEvento (req, res){

    const {idUbicacionEvento} = req.params;
    const updateUbicacionEvento = {
        idUbicacion: req.body.idUbicacion,
        idEvento: req.body.idEvento
    }

    dbManager.UbicacionEvento.update(updateUbicacionEvento, {where: {idUbicacionEvento: idUbicacionEvento}}).then(result => {
        res.status(200).json({
            message: "UbicacionEvento actualizada satisfactoriamente",
            post: result
        })
    }).catch(error => {
        res.status(500).json({
            message: "Hubo un problema al actualizar la ubicacionevento",
            error: result
        })
    })
    
}

exports.crearUbicacionEvento = crearUbicacionEvento;

exports.getUbicacionesEventos = getUbicacionesEventos;

exports.getUbicacionEventoById = getUbicacionEventoById;

exports.deleteUbicacionEventoById = deleteUbicacionEventoById;

exports.updateUbicacionEvento = updateUbicacionEvento;