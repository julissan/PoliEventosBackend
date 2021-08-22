const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const OrganizadorDirectivo = sequelize.define(
        "OrganizadorDirectivo",
        {
            idOrganizadorDirectivo: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            nombreOrganizadorDirectivo: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            cedulaOrganizadorDirectivo: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true
            },
            correoOrganizadorDirectivo: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            contraseñaOrganizadorDirectivo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            esOrganizador: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            esDirectivo: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },
        {
            tableName: "organizadordirectivo",
            timestamps: false
        }
    );
        return OrganizadorDirectivo;
}