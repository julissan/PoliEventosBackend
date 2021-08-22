const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const InteresadoEvento = sequelize.define(
        "InteresadoEvento",
        {
            idInteresadoEvento: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            }
        },
        {
            tableName: "interesadoevento",
            timestamps: false
        }
    );
        return InteresadoEvento;
}