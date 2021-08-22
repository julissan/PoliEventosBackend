const dbconfig = {
    HOST: "us-cdbr-east-04.cleardb.com",
    USER: "be40ef70e2d081",
    PASSWORD: "ccd5cf91",
    DB: "heroku_4bae8b19ecc8795",
    dialect: "mysql",
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = dbconfig;