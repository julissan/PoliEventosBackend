const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const Evento = sequelize.define(
        "Evento",
        {
            idEvento: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            nombreEvento: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            fechaInicio: {
                type: DataTypes.DATE,
                allowNull: false
            },
            fechaFin: {
                type: DataTypes.DATE,
                allowNull: false
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            fueRealizado: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            motivoDeNoRealizacion: {
                type: DataTypes.STRING(500)
            },
            encuestaEvento: {
                type: DataTypes.STRING(500)
            },
            resultadosEncuesta: {
                type: DataTypes.STRING(500)
            }
        },
        {
            tableName: "evento",
            timestamps: false
        }
    );
        return Evento;
}