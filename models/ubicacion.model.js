const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const Ubicacion = sequelize.define(
        "Ubicacion",
        {
            idUbicacion: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            nombreUbicacion: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            direccion: {
                type: DataTypes.STRING(200),
                allowNull: false
            }
        },
        {
            tableName: "ubicacion",
            timestamps: false
        }
    );
        return Ubicacion;
}