const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const Invitado = sequelize.define(
        "Invitado",
        {
            idInvitado: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            nombreInvitado: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            correoInvitado: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            credencialesInvitado: {
                type: DataTypes.STRING(500),
                allowNull: false
            }
        },
        {
            tableName: "invitado",
            timestamps: false
        }
    );
        return Invitado;
}