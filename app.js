var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


/**
 * importar enrutadores
 */

var indexRouter = require('./routes/index');
var programaRouter = require('./routes/programa.route');
var escuelaRouter = require('./routes/escuela.route');
var organoInstitucionalRouter = require('./routes/organoinstitucional.route');
var invitadoRouter = require('./routes/invitado.route');
var interesadoRouter = require('./routes/interesado.route');
var ubicacionRouter = require('./routes/ubicacion.route');
var organizadorDirectivoRouter = require('./routes/organizadordirectivo.route');
var eventoRouter = require('./routes/evento.route');
var registroRouter = require('./routes/registro.route');
var invitadoEventoRouter = require('./routes/invitadoevento.route');
var interesadoEventoRouter = require('./routes/interesadoevento.route');
var ubicacionEventoRouter = require('./routes/ubicacionevento.route');

var app = express();

// Import dbManager
const dbManager = require("./database/db.manager");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * usar enrutadores
 */

app.use('/', indexRouter);
app.use('/programa', programaRouter);
app.use('/escuela', escuelaRouter);
app.use('/organoinstitucional', organoInstitucionalRouter);
app.use('/invitado', invitadoRouter);
app.use('/interesado', interesadoRouter);
app.use('/ubicacion', ubicacionRouter);
app.use('/organizadordirectivo', organizadorDirectivoRouter);
app.use('/evento', eventoRouter);
app.use('/registro', registroRouter);
app.use('/invitadoevento', invitadoEventoRouter);
app.use('/interesadoevento', interesadoEventoRouter);
app.use('/ubicacionevento', ubicacionEventoRouter);



/**
 * conexion y creación DB
 */
dbManager.sequelizeConnection.authenticate().then(
    () => {
        console.log("***** Connection has been stablished *******");
        dbManager.sequelizeConnection.sync ().then(
            () => {
                console.log ("Database Synced");
            }
        );
    }
  ).catch(
    err => {
        console.log("Unable to connect to the database...", err)
    }
  );

module.exports = app;
