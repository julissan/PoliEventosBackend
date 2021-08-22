const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const Interesado = sequelize.define(
        "Interesado",
        {
            idInteresado: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            nombreInteresado: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            codigoInteresado: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true
            },
            correoInteresado: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            tableName: "interesado",
            timestamps: false
        }
    );
        return Interesado;
}