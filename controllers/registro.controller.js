const { Registro } = require("../database/db.manager");
const dbManager = require("../database/db.manager");

// Juan David Lis
/**
 * Crea un registro en la base de datos y lo retorna
 * @param {*} req : objeto json con atributos para nuevo registro
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearRegistro (req, res){

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
        const newRegistroObject = {
            imagenRegistro: req.body.imagenRegistro,
            urlRegistro: req.body.urlRegistro,
            observacionRegistro: req.body.observacionRegistro,
            idEvento: req.body.idEvento
        }

        /**
         * insertar nuevo registro
         */
        dbManager.Registro.create(newRegistroObject).then(
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
                    response:  "El registro ya existe"
                });
            }
        );
    }
}


/**
 * devuelve todos los registros
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos los registros
 */
async function getRegistros(req, res){

    try {

        const registros = await dbManager.Registro.findAll();
        res.send({
            status: "200",
            response:  registros
        });
    } catch (error) {
        res.send({
            status: "500",
            response:  "Error en servidor al listar registros"
        });
    }
}


/**
 * Busca un registro por su campo idRegistro
 * @param {*} req: idRegistro del registro que se desea buscar
 * @param {*} res: Objeto Json con datos del registro encontrado
 */
async function getRegistroById(req, res){

    try {

        const {idRegistro} = req.params;

        const registro = await dbManager.Registro.findOne(
            {
                where: {
                    idRegistro: idRegistro
                }
            }
        );
        res.send({
            status: "200",
            response: registro
        });
    } catch (error) {
        res.send({
            status: "500",
            response: "Error en servidor al buscar registro"
        });
    }
}

/**
 * Elimina un registro por su idRegistro
 * @param {*} req idRegistro del registro que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteRegistroById(req, res){

    try{

        const {idRegistro} = req.params;

        const registro = await dbManager.Registro.findOne(
            {
                where: {
                    idRegistro: idRegistro
                }
            }
        );

        if(!registro) {
            res.send({
                status: "400",
                response: "El registro no existe"
            });
        }else{

            await Registro.destroy({
                where: {
                  idRegistro: idRegistro
                }
            });
            res.send({
                status: "200",
                response: "Registro Eliminado"
            });

        }

    }catch(error){

        res.send({
            status: "500",
            response: "Error en servidor al eliminar registro"
        });
    }

}

/**
 * Recibe un objeto JSon con la misma estructura que la de creación de registro

 * Se identifica el registro que se desea cambiar con el idRegistro
 * los demas atributos, seran los datos que se quieren actualizar.
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res mensaje informativo
 */
async function updateRegistro (req, res){

    const {idRegistro} = req.params;
    const updateRegistro = {
        imagenRegistro: req.body.imagenRegistro,
        urlRegistro: req.body.urlRegistro,
        observacionRegistro: req.body.observacionRegistro,
        idEvento: req.body.idEvento
    }

    dbManager.Registro.update(updateRegistro, {where: {idRegistro: idRegistro}}).then(result => {

        res.send({
            status: "200",
            response: result
        });
    }).catch(error => {
        res.send({
            status: "500",
            response: "Hubo un problema al actualizar el registro"
        });
    })
    
}

async function getRegistrosByEvento(req, res){

    const {idEvento} = req.params;

    try {

        const registros = await dbManager.Registro.findAll(
            {
                where: {
                    idEvento: idEvento
                }
            }
        );
        res.send({
            status: "200",
            response: registros
        });
    } catch (error) {
        res.send({
            status: "500",
            response: "Error en servidor al listar registros"
        });
    }
}

exports.crearRegistro = crearRegistro;

exports.getRegistros = getRegistros;

exports.getRegistroById = getRegistroById;

exports.deleteRegistroById = deleteRegistroById;

exports.updateRegistro = updateRegistro;

exports.getRegistrosByEvento = getRegistrosByEvento;