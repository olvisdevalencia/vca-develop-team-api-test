import express, { Router } from "express";
import * as path from "path";
const router: Router = express();
const swaggerUI = require("swagger-ui-express");
const swaggerConfig = require(path.resolve(__dirname, "../config/swagger"));

router.use("/api-docs", swaggerUI.serve);
router.get("/api-docs", swaggerUI.setup(swaggerConfig));

module.exports = router;
