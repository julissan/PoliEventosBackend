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
        res.status(400).send({
            message: "El body se encuentra vacio."
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
            contraseñaOrganizadorDirectivo: req.body.contraseñaOrganizadorDirectivo,
            esOrganizador: req.body.esOrganizador,
            esDirectivo: req.body.esDirectivo
        }

        /**
         * insertar nuevo organizador/directivo
         */
        dbManager.OrganizadorDirectivo.create(newOrganizadorDirectivoObject).then(
            data => {
                res.send(data);
            }
        ).catch(
            error => {
                console.log(error);
                res.status(400).send({
                    message: "El organizador/directivo ya existe"
                });
            }
        );      
    }
}


/**
 * devuelve todos los organizadores/directivos
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos los organizadores/directivos
 */
async function getOrganizadoresDirectivos(req, res){

    try {

        const organizadoresDirectivos = await dbManager.OrganizadorDirectivo.findAll();
        res.json(
            {
                data: organizadoresDirectivos
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar organizadores/directivos"
            }
        );
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
        res.json(organizadorDirectivo);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar organizador/directivo"
            }
        );
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
            res.send(
                {
                    message:"El organizador/directivo no existe"
                }
            );
        }else{

            await OrganizadorDirectivo.destroy({
                where: {
                  idOrganizadorDirectivo: idOrganizadorDirectivo
                }
            });
    
            res.send(
                {
                    message:"Organizador/Directivo Eliminado"
                }
            );

        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar organizador/directivo"
            }
        );
    }

}

/**
 * Recibe un objeto JSon con la misma estructura que la de creación de organizador/directivo

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
        contraseñaOrganizadorDirectivo: req.body.contraseñaOrganizadorDirectivo,
        esOrganizador: req.body.esOrganizador,
        esDirectivo: req.body.esDirectivo
    }

    dbManager.OrganizadorDirectivo.update(updateOrganizadorDirectivo, {where: {idOrganizadorDirectivo: idOrganizadorDirectivo}}).then(result => {
        res.status(200).json({
            message: "Organizador/Directivo actualizada satisfactoriamente",
            post: result
        })
    }).catch(error => {
        res.status(500).json({
            message: "Hubo un problema al actualizar el organizador/directivo",
            error: result
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
            res.status(400).send({
                message: "Correo incorrecto"
            });
        }else{
            
            const contraseñaValida = await dbManager.OrganizadorDirectivo.findOne(
                {
                    where: {
                        correoOrganizadorDirectivo: req.body.correoOrganizadorDirectivo,
                        contraseñaOrganizadorDirectivo: req.body.contraseñaOrganizadorDirectivo
                    }
                }
            );

            if(!contraseñaValida) {
                res.status(400).send({
                    message: "Contraseña incorrecta"
                });
            }else{
                res.status(200).send({
                    message: "Se ha iniciado sesión satisfactoriamente"
                });
            }
        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al intenar iniciar sesión"
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