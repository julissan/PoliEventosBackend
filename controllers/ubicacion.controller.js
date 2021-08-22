const { Ubicacion } = require("../database/db.manager");
const dbManager = require("../database/db.manager");

// Juan David Lis
/**
 * Crea una ubicacion en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para nueva ubicacion
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearUbicacion (req, res){

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
        const newUbicacionObject = {
            nombreUbicacion: req.body.nombreUbicacion,
            direccion: req.body.direccion
        }

        /**
         * insertar nueva ubicacion
         */
        dbManager.Ubicacion.create(newUbicacionObject).then(
            data => {
                res.send(data);
            }
        ).catch(
            error => {
                console.log(error);
                res.status(400).send({
                    message: "La ubicacion ya existe"
                });
            }
        );
    }
}


/**
 * devuelve todas las ubicaciones
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todas las ubicaciones
 */
async function getUbicaciones(req, res){

    try {

        const ubicaciones = await dbManager.Ubicacion.findAll();
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


/**
 * Busca una ubicacion por su campo idUbicacion
 * @param {*} req: idUbicacion de la ubicacion que se desea buscar
 * @param {*} res: Objeto Json con datos de la ubicacion encontrada
 */
async function getUbicacionById(req, res){

    try {

        const {idUbicacion} = req.params;

        const ubicacion = await dbManager.Ubicacion.findOne(
            {
                where: {
                    idUbicacion: idUbicacion
                }
            }
        );
        res.json(ubicacion);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar ubicacion"
            }
        );
    }
}

/**
 * Elimina una ubicacion por su idUbicacion
 * @param {*} req idUbicacion de la ubicacionque se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteUbicacionById(req, res){

    try{

        const {idUbicacion} = req.params;

        const ubicacion = await dbManager.Ubicacion.findOne(
            {
                where: {
                    idUbicacion: idUbicacion
                }
            }
        );

        if(!ubicacion) {
            res.send(
                {
                    message:"La ubicacion no existe"
                }
            );
        }else{

            await Ubicacion.destroy({
                where: {
                  idUbicacion: idUbicacion
                }
            });
    
            res.send(
                {
                    message:"Ubicacion Eliminada"
                }
            );

        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar ubicacion"
            }
        );
    }

}

/**
 * Recibe un objeto JSon con la misma estructura que la de creación de ubicacion

 * Se identifica la ubicacion que se desea cambiar con el idUbicacion
 * los demas atributos, seran los datos que podran ser actualizados.
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res mensaje informativo
 */
async function updateUbicacion (req, res){

    const {idUbicacion} = req.params;
    const updateUbicacion = {
        nombreUbicacion: req.body.nombreUbicacion,
        direccion: req.body.direccion
    }

    dbManager.Ubicacion.update(updateUbicacion, {where: {idUbicacion: idUbicacion}}).then(result => {
        res.status(200).json({
            message: "Ubicacion actualizada satisfactoriamente",
            post: result
        })
    }).catch(error => {
        res.status(500).json({
            message: "Hubo un problema al actualizar la ubicacion",
            error: result
        })
    })
    
}

exports.crearUbicacion = crearUbicacion;

exports.getUbicaciones = getUbicaciones;

exports.getUbicacionById = getUbicacionById;

exports.deleteUbicacionById = deleteUbicacionById;

exports.updateUbicacion = updateUbicacion;