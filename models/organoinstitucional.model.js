const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const OrganoInstitucional = sequelize.define(
        "OrganoInstitucional",
        {
            idOrganoInstitucional: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            nombreOrganoInstitucional: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            tableName: "organoinstitucional",
            timestamps: false
        }
    );
        return OrganoInstitucional;
}