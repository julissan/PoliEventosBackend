const dbconfig = {
    HOST: "localhost",
    USER: "userpoli",
    PASSWORD: "Poli-1234",
    DB: "dbPoliEventos",
    dialect: "mysql",
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = dbconfig;