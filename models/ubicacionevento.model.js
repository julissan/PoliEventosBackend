const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const UbicacionEvento = sequelize.define(
        "UbicacionEvento",
        {
            idUbicacionEvento: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            }
        },
        {
            tableName: "ubicacionevento",
            timestamps: false
        }
    );
        return UbicacionEvento;
}