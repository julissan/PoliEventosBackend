const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const Registro = sequelize.define(
        "Registro",
        {
            idRegistro: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            imagenRegistro: {
                type: DataTypes.STRING(500)
            },
            urlRegistro: {
                type: DataTypes.STRING(500)
            },
            observacionRegistro: {
                type: DataTypes.STRING(500)
            }
        },
        {
            tableName: "registro",
            timestamps: false
        }
    );
        return Registro;
}