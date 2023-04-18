import express, { Router } from "express";
const router: Router = express();
import * as path from "path";
const { optionsController } = require(path.resolve(__dirname, "../controllers"));

router.post("/", optionsController.postRandomOption);

module.exports = router;
