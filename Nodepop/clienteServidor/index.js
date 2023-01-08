"use strict";
const createError = require("http-errors");

module.exports.error404Handler = function (req, res, next) {
    next(createError(404));
};

module.exports.generalErrorHandler = function (err, req, res, next) {
    if (err.array) {
        err.status = 422;
        const errInfo = err.array({ onlyFirstError: true })[0];
        err.message = isAPI(req)
            ? { message: "Not valid", errors: err.mapped() }
            : `Not valid - ${errInfo.param} ${errInfo.msg}`;
    }
    res.status(err.status || 500);
    if (isAPI(req)) {
        res.json({ success: false, error: err.message });
        return;
    }
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.render("error");
};
function isAPI(req) {
    return req.originalUrl.indexOf("/api") === 0;
}
