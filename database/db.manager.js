const Sequelize = require('sequelize');

const sequelizeConnection = require("./db.connection");


/**
 * importar modelos
 */
const ProgramaModel = require("../models/programa.model");
const EscuelaModel = require("../models/escuela.model");
const OrganoInstitucionalModel = require("../models/organoinstitucional.model");
const InvitadoModel = require("../models/invitado.model");
const InteresadoModel = require("../models/interesado.model");
const UbicacionModel = require("../models/ubicacion.model");
const RegistroModel = require("../models/registro.model");
const OrganizadorDirectivoModel = require("../models/organizadordirectivo.model");
const EventoModel = require("../models/evento.model");
const InvitadoEventoModel = require("../models/invitadoevento.model");
const InteresadoEventoModel = require("../models/interesadoevento.model");
const UbicacionEventoModel = require("../models/ubicacionevento.model");

 /**
 * crear modelos *******************************************************
 */
const Programa = ProgramaModel(sequelizeConnection, Sequelize);
const Escuela = EscuelaModel(sequelizeConnection, Sequelize);
const OrganoInstitucional = OrganoInstitucionalModel(sequelizeConnection, Sequelize);
const Invitado = InvitadoModel(sequelizeConnection, Sequelize);
const Interesado = InteresadoModel(sequelizeConnection, Sequelize);
const Ubicacion = UbicacionModel(sequelizeConnection, Sequelize);
const Registro = RegistroModel(sequelizeConnection, Sequelize);
const OrganizadorDirectivo = OrganizadorDirectivoModel(sequelizeConnection, Sequelize);
const Evento = EventoModel(sequelizeConnection, Sequelize);
const InvitadoEvento = InvitadoEventoModel(sequelizeConnection, Sequelize);
const InteresadoEvento = InteresadoEventoModel(sequelizeConnection, Sequelize);
const UbicacionEvento = UbicacionEventoModel(sequelizeConnection, Sequelize);

 /**
 * Relaciones **********************************************************
 */

Programa.hasMany(Evento, {
    foreignKey: {
        name: 'idPrograma'
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});
Evento.belongsTo (Programa, {
    foreignKey: {
        name: 'idPrograma'
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});

Escuela.hasMany(Evento, {
    foreignKey: {
        name: 'idEscuela'
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});
Evento.belongsTo (Escuela, {
    foreignKey: {
        name: 'idEscuela'
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});

OrganoInstitucional.hasMany(Evento, { 
    foreignKey: {
        name: 'idOrganoInstitucional',
        allowNull: false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});
Evento.belongsTo (OrganoInstitucional, {
    foreignKey: {
        name: 'idOrganoInstitucional',
        allowNull: false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});

Invitado.hasMany(InvitadoEvento, { 
    foreignKey: {
        name: 'idInvitado',
        allowNull: false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});
InvitadoEvento.belongsTo (Invitado, {
    foreignKey: {
        name: 'idInvitado',
        allowNull: false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});

Evento.hasMany(InvitadoEvento, { 
    foreignKey: {
        name: 'idEvento',
        allowNull: false
    },
    foreignKey: 'idEvento',
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});
InvitadoEvento.belongsTo (Evento, {
    foreignKey: {
        name: 'idEvento',
        allowNull: false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});

Interesado.hasMany(InteresadoEvento, { 
    foreignKey: {
        name: 'idInteresado',
        allowNull: false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});
InteresadoEvento.belongsTo (Interesado, {
    foreignKey: {
        name: 'idInteresado',
        allowNull: false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});

Evento.hasMany(InteresadoEvento, { 
    foreignKey: {
        name: 'idEvento',
        allowNull: false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});
InteresadoEvento.belongsTo (Evento, {
    foreignKey: {
        name: 'idEvento',
        allowNull: false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});

Ubicacion.hasMany(UbicacionEvento, { 
    foreignKey: {
        name: 'idUbicacion',
        allowNull: false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});
UbicacionEvento.belongsTo (Ubicacion, {
    foreignKey: {
        name: 'idUbicacion',
        allowNull: false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});

Evento.hasMany(UbicacionEvento, { 
    foreignKey: {
        name: 'idEvento',
        allowNull: false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});
UbicacionEvento.belongsTo (Evento, {
    foreignKey: {
        name: 'idEvento',
        allowNull: false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});

Evento.hasMany(Registro, { 
    foreignKey: {
        name: 'idEvento',
        allowNull: false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});
Registro.belongsTo (Evento, {
    foreignKey: {
        name: 'idEvento',
        allowNull: false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});

OrganizadorDirectivo.hasMany(Evento, { 
    foreignKey: {
        name: 'idOrganizadorEvento',
        allowNull: false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});
Evento.belongsTo (OrganizadorDirectivo, {
    foreignKey: {
        name: 'idOrganizadorEvento',
        allowNull: false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
}); 

const db = {
    Programa,
    Escuela,
    OrganoInstitucional,
    Invitado,
    Interesado,
    Ubicacion,
    Registro,
    OrganizadorDirectivo,
    Evento,
    InvitadoEvento,
    InteresadoEvento,
    UbicacionEvento,
    sequelizeConnection 
}

module.exports = db;