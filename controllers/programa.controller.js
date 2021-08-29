const { Programa } = require("../database/db.manager");
const dbManager = require("../database/db.manager");

// Juan David Lis
/**
 * Crea un programa en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para nuevo programa
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearPrograma (req, res){

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
        const newProgramaObject = {
            nombrePrograma: req.body.nombrePrograma
        }

        /**
         * insertar nuevo programa
         */
        dbManager.Programa.create(newProgramaObject).then(
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
                    response: "El programa ya existe"
                });
            }
        );
    }
}


/**
 * devuelve todos los programas
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos los programas
 */
async function getProgramas(req, res){

    try {

        const programas = await dbManager.Programa.findAll();
        res.send({
            status: "200",
            response: programas
        });
    } catch (error) {
        res.send({
            status: "500",
            response: "Error en servidor al listar programas"
        });
    }
}


/**
 * Busca un programa por su campo idPrograma
 * @param {*} req: idPrograma del programa que se desea buscar
 * @param {*} res: Objeto Json con datos del programa encontrado
 */
async function getProgramaById(req, res){

    try {

        const {idPrograma} = req.params;

        const programa = await dbManager.Programa.findOne(
            {
                where: {
                    idPrograma: idPrograma
                }
            }
        );
        res.send({
            status: "200",
            response: programa
        });
    } catch (error) {
        res.send({
            status: "500",
            response: "Error en servidor al buscar programa"
        });
    }
}

/**
 * Elimina un programa por su idPrograma
 * @param {*} req idPrograma del programa que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteProgramaById(req, res){

    try{

        const {idPrograma} = req.params;

        const programa = await dbManager.Programa.findOne(
            {
                where: {
                    idPrograma: idPrograma
                }
            }
        );

        if(!programa) {
            res.send({
                status: "400",
                response: "El programa no existe"
            });
        }else{

            await Programa.destroy({
                where: {
                  idPrograma: idPrograma
                }
            });
            res.send({
                status: "200",
                response: "Programa Eliminado"
            });
        }

    }catch(error){
        res.send({
            status: "500",
            response: "Error en servidor al eliminar programa"
        });
    }

}


/**
 * Recibe un objeto JSon con la misma estructura que la de creación de programa

 * Se identifica el programa que se desea cambiar con el idPrograma
 * los demas atributos, seran los datos que podran ser actualizados.
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res mensaje informativo
 */
async function updatePrograma (req, res){

    const {idPrograma} = req.params;
    const updatePrograma = {
        nombrePrograma: req.body.nombrePrograma
    }

    dbManager.Programa.update(updatePrograma, {where: {idPrograma: idPrograma}}).then(result => {
        res.send({
            status: "200",
            response: result
        });
    }).catch(error => {
        res.send({
            status: "500",
            response: "Hubo un problema al actualizar el programa"
        });
    })
    
}



exports.crearPrograma = crearPrograma;

exports.getProgramas = getProgramas;

exports.getProgramaById = getProgramaById;

exports.deleteProgramaById = deleteProgramaById;

exports.updatePrograma = updatePrograma;