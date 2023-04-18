#!/usr/bin/env node
import express, { Application, Request, Response, NextFunction } from "express";
import * as path from "path";
import * as bodyParser from "body-parser";

require("dotenv").config();
const {
  server: { PORT },
} = require(path.resolve(__dirname, "./config"));
const routes = require(path.resolve(__dirname, "./modules/express"));

const app: Application = express();
const httpServer = require("http").Server(app);

const removePoweredBy = (req: Request, res: Response, next: NextFunction) => {
  const send = res.send;
  res.send = (data: any) => {
    res.removeHeader("X-Powered-By");
    return send.call(res, data);
  };

  next();
};

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/", removePoweredBy, routes);

httpServer.listen(PORT, () => (process: any) => {
  process.send("ready");
});

console.log(`🌍 Server listening on port http://localhost:${PORT}/api/health`);
console.log('💡 Probar directamente en swagger ya cuenta con ejemplo de uso:');
console.log(
  `🚀 Swagger UI available http://localhost:${PORT}/api/swagger/api-docs`
);
console.log(`💡 Running on ${process.env.NODE_ENV || 'dev'} mode`);
/**
 *
 *
 * Handling to avoid crash Errors
 */
const serverGracefulShutdown = () => {
  console.info(
    "🔥 Got SIGTERM. Graceful shutdown start 🔥",
    new Date().toISOString()
  );
  const promises = [
    new Promise((resolve, reject) =>
      httpServer.close(() => {
        resolve("HTTP server closed");
      })
    ),
  ];

  return Promise.all(promises)
    .then(() => {
      console.info("Application closed");
      process.exit(0);
    })
    .catch((error: any) => {
      console.info("UNKNOWN ERROR" + error);
    });
};

process.on("SIGINT", serverGracefulShutdown);
process.on("SIGTERM", serverGracefulShutdown);

module.exports = app;
