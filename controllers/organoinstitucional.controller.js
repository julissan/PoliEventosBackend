const { OrganoInstitucional } = require("../database/db.manager");
const dbManager = require("../database/db.manager");

// Juan David Lis
/**
 * Crea un organo institucional en la base de datos y lo retorna
 * @param {*} req : objeto json con atributos para nuevo organo institucional
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearOrganoInstitucional (req, res){

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
        const newOrganoInstitucionalObject = {
            nombreOrganoInstitucional: req.body.nombreOrganoInstitucional
        }

        /**
         * insertar nuevo organo institucional
         */
        dbManager.OrganoInstitucional.create(newOrganoInstitucionalObject).then(
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
                    response: "El organo institucional ya existe"
                });
            }
        );
    }
}


/**
 * devuelve todos los organos institucionales
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos los organos institucionales
 */
async function getOrganosInstitucionales(req, res){

    try {

        const organosInstitucionales = await dbManager.OrganoInstitucional.findAll();
        res.send({
            status: "200",
            response: organosInstitucionales
        });
    } catch (error) {
        res.send({
            status: "500",
            response: "Error en servidor al listar organos institucionales"
        });
    }
}


/**
 * Busca un organo institucional por su campo idOrganoInstitucional
 * @param {*} req: idOrganoInstitucional del organo institucional que se desea buscar
 * @param {*} res: Objeto Json con datos del organo institucional encontrado
 */
async function getOrganoInstitucionalById(req, res){

    try {

        const {idOrganoInstitucional} = req.params;

        const organoInstitucional = await dbManager.OrganoInstitucional.findOne(
            {
                where: {
                    idOrganoInstitucional: idOrganoInstitucional
                }
            }
        );
        res.send({
            status: "200",
            response: organoInstitucional
        });
    } catch (error) {
        res.send({
            status: "500",
            response: "Error en servidor al buscar organo institucional"
        });
    }
}

/**
 * Elimina un organo institucional por su idOrganoInstitucional
 * @param {*} req idOrganoInstitucional del organo institucional que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteOrganoInstitucionalById(req, res){

    try{

        const {idOrganoInstitucional} = req.params;

        const organoInstitucional = await dbManager.OrganoInstitucional.findOne(
            {
                where: {
                    idOrganoInstitucional: idOrganoInstitucional
                }
            }
        );

        if(!organoInstitucional) {
            res.send({
                status: "400",
                response: "El organo institucional no existe"
            });
        }else{

            await OrganoInstitucional.destroy({
                where: {
                  idOrganoInstitucional: idOrganoInstitucional
                }
            });

            res.send({
                status: "200",
                response: "Organo Institucional Eliminado"
            });

        }

    }catch(error){

        res.send({
            status: "500",
            response: "Error en servidor al eliminar organo institucional"
        });

    }

}

/**
 * Recibe un objeto JSon con la misma estructura que la de creación de organo institucional

 * Se identifica el organo institucional que se desea cambiar con el idOrganoInstitucional
 * los demas atributos, seran los datos que podran ser actualizados.
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res mensaje informativo
 */
async function updateOrganoInstitucional (req, res){

    const {idOrganoInstitucional} = req.params;
    const updateOrganoInstitucional = {
        nombreOrganoInstitucional: req.body.nombreOrganoInstitucional
    }

    dbManager.OrganoInstitucional.update(updateOrganoInstitucional, {where: {idOrganoInstitucional: idOrganoInstitucional}}).then(result => {
        res.send({
            status: "200",
            response: result
        });
    }).catch(error => {
        res.send({
            status: "500",
            response: "Hubo un problema al actualizar el organo institucional"
        });
    })
    
}

exports.crearOrganoInstitucional = crearOrganoInstitucional;

exports.getOrganosInstitucionales = getOrganosInstitucionales;

exports.getOrganoInstitucionalById = getOrganoInstitucionalById;

exports.deleteOrganoInstitucionalById = deleteOrganoInstitucionalById;

exports.updateOrganoInstitucional = updateOrganoInstitucional;