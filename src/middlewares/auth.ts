import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import * as path from "path";
import jwt from "jsonwebtoken";
import fs from "fs";
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "./private_key.pem")
);
import { mockUsers } from '../utils/mock-users';

export const authVerifier = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, privateKey, async (err: any, decoded: any) => {
    if (err) {
      console.log("Error on token validation: ", err);
      return res
        .status(StatusCodes.FORBIDDEN)
        .send({ auth: false, message: "Failed to authenticate token." });
    }

    const { email } = decoded;

    if (mockUsers.find((x:any) => x.email === email)) {
      next();
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send("You are not authorized.");
    }
  });
};
