const { OrganizadorDirectivo } = require("../database/db.manager");
const dbManager = require("../database/db.manager");

// Juan David Lis
/***
 * Crea un organizador/directivo en la base de datos y lo retorna
 * @param {*} req : objeto json con atributos para nuevo organizador/directivo
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearOrganizadorDirectivo (req, res){

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
        const newOrganizadorDirectivoObject = {
            nombreOrganizadorDirectivo: req.body.nombreOrganizadorDirectivo,
            cedulaOrganizadorDirectivo: req.body.cedulaOrganizadorDirectivo,
            correoOrganizadorDirectivo: req.body.correoOrganizadorDirectivo,
            contrase├▒aOrganizadorDirectivo: req.body.contrase├▒aOrganizadorDirectivo,
            esOrganizador: req.body.esOrganizador,
            esDirectivo: req.body.esDirectivo
        }

        /**
         * insertar nuevo organizador/directivo
         */
        dbManager.OrganizadorDirectivo.create(newOrganizadorDirectivoObject).then(
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
                    response: "El organizador/directivo ya existe"
                });
            }
        );      
    }
}


/**
 * devuelve todos los organizadores/directivos
 * @param {*} req petici├│n
 * @param {*} res: retorna un objeto Json con todos los organizadores/directivos
 */
async function getOrganizadoresDirectivos(req, res){

    try {

        const organizadoresDirectivos = await dbManager.OrganizadorDirectivo.findAll();
        res.send({
            status: "200",
            response: organizadoresDirectivos 
        });
    } catch (error) {
        res.send({
            status: "500",
            response: "Error en servidor al listar organizadores/directivos"
        });
    }
}


/**
 * Busca un organizador/directivo por su campo idOrganizadorDirectivo
 * @param {*} req: idOrganizadorDirectivo del organizador/directivo que se desea buscar
 * @param {*} res: Objeto Json con datos del organizador/directivo encontrado
 */
async function getOrganizadorDirectivoById(req, res){

    try {

        const {idOrganizadorDirectivo} = req.params;

        const organizadorDirectivo = await dbManager.OrganizadorDirectivo.findOne(
            {
                where: {
                    idOrganizadorDirectivo: idOrganizadorDirectivo
                }
            }
        );
        res.send({
            status: "200",
            response: organizadorDirectivo
        });
    } catch (error) {
        res.send({
            status: "500",
            response: "Error en servidor al buscar organizador/directivo"
        });
    }
}

/**
 * Elimina un organizador/directivo por su idOrganizadorDirectivo
 * @param {*} req idOrganizadorDirectivo del organizador/directivo que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteOrganizadorDirectivoById(req, res){

    try{

        const {idOrganizadorDirectivo} = req.params;

        const organizadorDirectivo = await dbManager.OrganizadorDirectivo.findOne(
            {
                where: {
                    idOrganizadorDirectivo: idOrganizadorDirectivo
                }
            }
        );

        if(!organizadorDirectivo) {
            res.send({
                status: "400",
                response: "El organizador/directivo no existe"
            });
        }else{

            await OrganizadorDirectivo.destroy({
                where: {
                  idOrganizadorDirectivo: idOrganizadorDirectivo
                }
            });
    
            res.send({
                status: "200",
                response:"Organizador/Directivo Eliminado"
            });

        }

    }catch(error){
        res.send({
            status: "500",
            response: "Error en servidor al eliminar organizador/directivo"
        });
    }

}

/**
 * Recibe un objeto JSon con la misma estructura que la de creaci├│n de organizador/directivo

 * Se identifica el organizador/directivo que se desea cambiar con el idOrganizadorDirectivo
 * los demas atributos, seran los datos que podran ser actualizados.
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res mensaje informativo
 */
async function updateOrganizadorDirectivo (req, res){

    const {idOrganizadorDirectivo} = req.params;
    const updateOrganizadorDirectivo = {
        nombreOrganizadorDirectivo: req.body.nombreOrganizadorDirectivo,
        cedulaOrganizadorDirectivo: req.body.cedulaOrganizadorDirectivo,
        correoOrganizadorDirectivo: req.body.correoOrganizadorDirectivo,
        contrase├▒aOrganizadorDirectivo: req.body.contrase├▒aOrganizadorDirectivo,
        esOrganizador: req.body.esOrganizador,
        esDirectivo: req.body.esDirectivo
    }

    dbManager.OrganizadorDirectivo.update(updateOrganizadorDirectivo, {where: {idOrganizadorDirectivo: idOrganizadorDirectivo}}).then(result => {
        res.send({
            status: "200",
            response: result
        })
    }).catch(error => {
        res.send({
            status: "500",
            response: "Hubo un problema al actualizar el organizador/directivo"
        })
    })
    
}

async function iniciarSesion(req, res){
    try{

        const correoValido = await dbManager.OrganizadorDirectivo.findOne(
            {
                where: {
                    correoOrganizadorDirectivo: req.body.correoOrganizadorDirectivo
                }
            }
        );

        if(!correoValido) {
            res.send({
                status: "400",
                response: "Correo incorrecto"
            });
        }else{
            
            const contrase├▒aValida = await dbManager.OrganizadorDirectivo.findOne(
                {
                    where: {
                        correoOrganizadorDirectivo: req.body.correoOrganizadorDirectivo,
                        contrase├▒aOrganizadorDirectivo: req.body.contrase├▒aOrganizadorDirectivo
                    }
                }
            );

            if(!contrase├▒aValida) {
                res.send({
                    status: "400",
                    response: "Contrase├▒a incorrecta"
                });
            }else{
                res.send({
                    status: "200",
                    response: "Se ha iniciado sesi├│n satisfactoriamente",
                    esOrganizador: contrase├▒aValida.esOrganizador,
                    esDirectivo: contrase├▒aValida.esDirectivo
                });
            }
        }

    }catch(error){
        res.send(
            {
                status: "500",
                response: "Error en servidor al intenar iniciar sesi├│n"
            }
        );
    }
}


exports.crearOrganizadorDirectivo = crearOrganizadorDirectivo;

exports.getOrganizadoresDirectivos = getOrganizadoresDirectivos;

exports.getOrganizadorDirectivoById = getOrganizadorDirectivoById;

exports.deleteOrganizadorDirectivoById = deleteOrganizadorDirectivoById;

exports.updateOrganizadorDirectivo = updateOrganizadorDirectivo;

exports.iniciarSesion = iniciarSesion;