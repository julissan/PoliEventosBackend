const { Interesado } = require("../database/db.manager");
const dbManager = require("../database/db.manager");

// Juan David Lis
/**
 * Crea un interesado en la base de datos y lo retorna
 * @param {*} req : objeto json con atributos para nuevo interesado
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearInteresado (req, res){

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
        const newInteresadoObject = {
            nombreInteresado: req.body.nombreInteresado,
            codigoInteresado: req.body.codigoInteresado,
            correoInteresado: req.body.correoInteresado
        }

        /**
         * insertar nuevo interesado
         */
        dbManager.Interesado.create(newInteresadoObject).then(
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
                    response: "El interesado ya existe"
                });
            }
        );
    }
}


/**
 * devuelve todos los interesados
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos los interesados
 */
async function getInteresados(req, res){

    try {

        const interesados = await dbManager.Interesado.findAll();
        res.send({
            status: "200",
            response: interesados
        });
    } catch (error) {
        res.send({
            status: "500",
            response: "Error en servidor al listar intereados"
        });
    }
}


/**
 * Busca un interesado por su campo idInteresado
 * @param {*} req: idInteresado del interesado que se desea buscar
 * @param {*} res: Objeto Json con datos del interesado
 */
async function getInteresadoById(req, res){

    try {

        const {idInteresado} = req.params;

        const interesado = await dbManager.Interesado.findOne(
            {
                where: {
                    idInteresado: idInteresado
                }
            }
        );
        res.send({
            status: "200",
            response: interesado
        });
    } catch (error) {
        res.send({
            status: "500",
            response: "Error en servidor al buscar interesado"
        });
    }
}

/**
 * Elimina un interesado por su idInteresado
 * @param {*} req idInteresado del interesado que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteInteresadoById(req, res){

    try{

        const {idInteresado} = req.params;

        const interesado = await dbManager.Interesado.findOne(
            {
                where: {
                    idInteresado: idInteresado
                }
            }
        );

        if(!interesado) {
            res.send({
                status: "400",
                response: "El interesado no existe"
            });
        }else{

            await Interesado.destroy({
                where: {
                  idInteresado: idInteresado
                }
            });
    
            res.send({
                status: "200",
                response: "Interesado Eliminado"
            });

        }

    }catch(error){
        res.send({
            status: "500",
            response: "Error en servidor al eliminar interesado"
        });
    }

}

/**
 * Recibe un objeto JSon con la misma estructura que la de creación de interesado

 * Se identifica el interesado que se desea cambiar con el idInteresado
 * los demas atributos, seran los datos que podran ser actualizados.
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res mensaje informativo
 */
async function updateInteresado (req, res){

    const {idInteresado} = req.params;
    const updateInteresado = {
        nombreInteresado: req.body.nombreInteresado,
        codigoInteresado: req.body.codigoInteresado,
        correoInteresado: req.body.correoInteresado
    }

    dbManager.Interesado.update(updateInteresado, {where: {idInteresado: idInteresado}}).then(result => {
        res.send({
            status: "200",
            response: result
        });
    }).catch(error => {
        res.send({
            status: "500",
            response: "Hubo un problema al actualizar el interesado"
        });
    })
    
}

async function getInteresadoIdByCodigo(req, res){

    try {

        const {codigoInteresado} = req.params;

        const interesado = await dbManager.Interesado.findOne(
            {
                where: {
                    codigoInteresado: codigoInteresado
                }
            }
        );
        res.json(interesado.idInteresado);
    } catch (error) {
        res.send({
            status: "500",
            response: "Error en servidor al buscar interesado"
        });
    }
}

exports.crearInteresado = crearInteresado;

exports.getInteresados = getInteresados;

exports.getInteresadoById = getInteresadoById;

exports.deleteInteresadoById = deleteInteresadoById;

exports.updateInteresado = updateInteresado;

exports.getInteresadoIdByCodigo = getInteresadoIdByCodigo;