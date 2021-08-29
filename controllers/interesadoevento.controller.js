const { InteresadoEvento } = require("../database/db.manager");
const dbManager = require("../database/db.manager");

// Juan David Lis
/**
 * Crea un interesadoevento en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para nuevo interesadoevento
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearInteresadoEvento (req, res){

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
        const newInteresadoEventoObject = {
            idInteresado: req.body.idInteresado,
            idEvento: req.body.idEvento
        }

        /**
         * insertar nuevo interesadoevento
         */
        dbManager.InteresadoEvento.create(newInteresadoEventoObject).then(
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
                    response: "El interesadoevento ya existe"
                });
            }
        );
    }
}


/**
 * devuelve todos los interesadoseventos
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos los interesadoseventos
 */
async function getInteresadosEventos(req, res){

    try {

        const interesadoseventos = await dbManager.InteresadoEvento.findAll();
        res.send({
            status: "200",
            response: interesadoseventos
        });
    } catch (error) {
        res.send({
            status: "500",
            response: "Error en servidor al listar interesadoseventos"
        });
    }
}


/**
 * Busca un interesadoevento por su campo idInteresadoEvento
 * @param {*} req: idInteresadoEvento del interesadoevento que se desea buscar
 * @param {*} res: Objeto Json con datos del interesadoevento encontrado
 */
async function getInteresadoEventoById(req, res){

    try {

        const {idInteresadoEvento} = req.params;

        const interesadoevento= await dbManager.InteresadoEvento.findOne(
            {
                where: {
                    idInteresadoEvento: idInteresadoEvento
                }
            }
        );
        res.send({
            status: "200",
            response: interesadoevento
        });
    } catch (error) {
        res.send({
            status: "500",
            response: "Error en servidor al buscar interesadoevento"
        });
    }
}

/**
 * Elimina un interesadoevento por su idInteresadoEvento
 * @param {*} req idInteresadoEvento del interesadoevento que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteInteresadoEventoById(req, res){

    try{

        const {idInteresadoEvento} = req.params;

        const interesadoevento = await dbManager.InteresadoEvento.findOne(
            {
                where: {
                    idInteresadoEvento: idInteresadoEvento
                }
            }
        );

        if(!interesadoevento) {
            res.send({
                status: "400",
                response: "El interesadoevento no existe"
            });
        }else{

            await InteresadoEvento.destroy({
                where: {
                  idInteresadoEvento: idInteresadoEvento
                }
            });
            res.send({
                status: "200",
                response: "Interesadoevento Eliminado"
            });

        }

    }catch(error){
        res.send({
            status: "500",
            response: "Error en servidor al eliminar interesadoevento"
        });
    }

}

/**
 * Recibe un objeto JSon con la misma estructura que la de creación de interesadoevento

 * Se identifica el interesadoevento que se desea cambiar con el idInteresadoEvento
 * los demas atributos, seran los datos que podran ser actualizados.
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res mensaje informativo
 */
async function updateInteresadoEvento (req, res){

    const {idInteresadoEvento} = req.params;
    const updateInteresadoEvento = {
        idInteresado: req.body.idInteresado,
        idEvento: req.body.idEvento
    }

    dbManager.InteresadoEvento.update(updateInteresadoEvento, {where: {idInteresadoEvento: idInteresadoEvento}}).then(result => {
        res.send({
            status: "200",
            response: result
        });
    }).catch(error => {
        res.send({
            status: "500",
            response: "Hubo un problema al actualizar el interesadoevento"
        });
    })
    
}

exports.crearInteresadoEvento = crearInteresadoEvento;

exports.getInteresadosEventos = getInteresadosEventos;

exports.getInteresadoEventoById = getInteresadoEventoById;

exports.deleteInteresadoEventoById = deleteInteresadoEventoById;

exports.updateInteresadoEvento = updateInteresadoEvento;
