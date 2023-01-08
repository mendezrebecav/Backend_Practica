"use strict";

const config = require("config");
const mongoose = require("mongoose");
const conn = mongoose.connection;

mongoose.set("useFindAndModify", false);
n
conn.on("error", err => {
    console.log("Error de conexión", err);
    process.exit(1);
});

conn.once("open", () =>  {
    console.log("Conectado a MongoDB en", conn.name);
});

mongoose.connect(config.get("MongoDB.connectionString"),{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

module.exports = conn;