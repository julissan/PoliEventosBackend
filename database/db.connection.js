const dbconfig = require("./db.config");

const Sequelize = require("sequelize");

const sequelizeConnection = new Sequelize (
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD,
    {
        host: dbconfig.HOST,
        dialect: dbconfig.dialect,
        operatorAliases: false,
        pool:{
            max: dbconfig.pool.max,
            min: dbconfig.pool.min,
            acquire: dbconfig.pool.acquire,
            idle: dbconfig.pool.idle
        }
    }
);

module.exports = sequelizeConnection;