import express, { Router } from "express";
import * as path from "path";
const router: Router = express();

const authRouter = require(path.resolve(__dirname, "./auth"));
const optionsRouter = require(path.resolve(__dirname, "./options"));
const healthRouter = require(path.resolve(__dirname, "./health"));

const swaggerRouter = require(path.resolve(__dirname, "./swagger"));

const { authVerifier } = require(path.resolve(
  __dirname,
  "../middlewares/auth"
));

router.use("/auth", authRouter);
router.use("/options",authVerifier, optionsRouter);
router.use("/health", healthRouter);
router.use("/swagger", swaggerRouter);

module.exports = router;
