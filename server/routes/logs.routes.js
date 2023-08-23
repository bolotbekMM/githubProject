const logController = require("../controllers/log.controller");
const { Router } = require("express");
const logRoutes = Router();

logRoutes.get("/logs", logController.getLogs);

module.exports = logRoutes;
