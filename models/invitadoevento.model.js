const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const InvitadoEvento = sequelize.define(
        "InvitadoEvento",
        {
            idInvitadoEvento: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            }
        },
        {
            tableName: "invitadoevento",
            timestamps: false
        }
    );
        return InvitadoEvento;
}