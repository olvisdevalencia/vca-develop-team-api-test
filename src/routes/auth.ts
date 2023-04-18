import express, { Router } from "express";
const router: Router = express();
import * as path from "path";
const { userController } = require(path.resolve(__dirname, "../controllers"));

router.post("/login", userController.login);

module.exports = router;
