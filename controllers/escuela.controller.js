const { Escuela } = require("../database/db.manager");
const dbManager = require("../database/db.manager");

// Juan David Lis
/**
 * Crea una escuela en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para nueva escuela
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearEscuela (req, res){

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
        const newEscuelaObject = {
            nombreEscuela: req.body.nombreEscuela
        }

        /**
         * insertar nueva escuela
         */
        dbManager.Escuela.create(newEscuelaObject).then(
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
                    response: "La escuela ya existe"
                });
            }
        );
    }
}


/**
 * devuelve todas las escuelas
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todas las escuelas
 */
async function getEscuelas(req, res){

    try {

        const escuelas = await dbManager.Escuela.findAll();
        res.send({
            status: "200",
            response: escuelas
        });
    } catch (error) {
        res.send({
            status: "500",
            response: "Error en servidor al listar escuelas"
        });
    }
}


/**
 * Busca una escuela por su campo idEscuela
 * @param {*} req: idEscuela de la escuela que se desea buscar
 * @param {*} res: Objeto Json con datos de la escuela encontrada
 */
async function getEscuelaById(req, res){

    try {

        const {idEscuela} = req.params;

        const escuela = await dbManager.Escuela.findOne(
            {
                where: {
                    idEscuela: idEscuela
                }
            }
        );
        res.send({
            status: "200",
            response: escuela
        });
    } catch (error) {
        res.send({
            status: "500",
            response: "Error en servidor al buscar escuela"
        });
    }
}

/**
 * Elimina una escuela por su idEscuela
 * @param {*} req idEscuela de la escuela que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteEscuelaById(req, res){

    try{

        const {idEscuela} = req.params;

        const escuela = await dbManager.Escuela.findOne(
            {
                where: {
                    idEscuela: idEscuela
                }
            }
        );

        if(!escuela) {
            res.send({
                status: "400",
                response: "La escuela no existe"
            });
        }else{

            await Escuela.destroy({
                where: {
                  idEscuela: idEscuela
                }
            });

            res.send({
                status: "200",
                response: "Escuela Eliminada"
            });

        }

    }catch(error){

        res.send({
            status: "500",
            response: "Error en servidor al eliminar escuela"
        });
        
    }

}

/**
 * Recibe un objeto JSon con la misma estructura que la de creación de escuela

 * Se identifica la escuela que se desea cambiar con el idEscuela
 * los demas atributos, seran los datos que podran ser actualizados.
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res mensaje informativo
 */
async function updateEscuela (req, res){

    const {idEscuela} = req.params;
    const updateEscuela = {
        nombreEscuela: req.body.nombreEscuela
    }

    dbManager.Escuela.update(updateEscuela, {where: {idEscuela: idEscuela}}).then(result => {
        res.send({
            status: "200",
            response: result
        });
    }).catch(error => {
        res.send({
            status: "500",
            response: "Hubo un problema al actualizar la escuela"
        });
    })
    
}

exports.crearEscuela = crearEscuela;

exports.getEscuelas = getEscuelas;

exports.getEscuelaById = getEscuelaById;

exports.deleteEscuelaById = deleteEscuelaById;

exports.updateEscuela = updateEscuela;