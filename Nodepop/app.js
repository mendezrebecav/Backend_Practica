
const logger = require("morgan");
const { error404Handler, generalErrorHandler } = require("./peticiones");
const routes = require("./Ruta_servidor");
const config = require("config");
const cors = require("cors");
const app = express();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").__express);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors);

require("./servicios_generales/baseDatoMongoDB");


app.use(config.get("App.restApiEndpoint.version1AnunciosPath"), routes);

app.locals.title = "NodePop";

/**
 * Rutas de mi aplicación web
 */
app.use("/", require("./Ruta_servidor/index"));
app.use(error404Handler); // catch 404 and forward to error handler
app.use(generalErrorHandler); // error handler

module.exports = app;