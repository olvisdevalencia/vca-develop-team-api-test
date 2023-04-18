import express, { Application, Request, Response } from "express";
import * as path from "path";
import cors from "cors";
import logger from "morgan";
import helmet from "helmet";

const router = require(path.resolve(__dirname, "../../routes"));
const {
  server: { LOGGER },
} = require(path.resolve(__dirname, "../../config"));

const security: object = require(path.resolve(
  __dirname,
  "../../middlewares/security"
));

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(helmet(security));
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());
app.use(cors());
app.use(logger(LOGGER));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.use("/api", router);

module.exports = app;
