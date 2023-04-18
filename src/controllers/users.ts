import { Request, Response, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import * as path from "path";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { mockUsers } from '../utils/mock-users';


const tokenExpiration = 60 * 60 * 24;
import fs from "fs";
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../middlewares/private_key.pem")
);

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const authFail = {
      auth: false,
      message: "No authenticated, verify username and password.",
    };

    const userFound: any = mockUsers.find((x: any) => x.email === email);

    if (!userFound) {
      return res.status(StatusCodes.BAD_REQUEST).send(authFail);
    }

    const hashedPassword: string = await bcryptjs.hash(userFound.password, 10);

    const matchPassword: any = await bcryptjs.compare(
      password,
      hashedPassword
    );


    if (!matchPassword) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ReasonPhrases.BAD_REQUEST);
    }

    const payload: object = {
      email: userFound.email
    };

    const token: any = jwt.sign(payload, privateKey, {
      expiresIn: tokenExpiration,
    });

    const response: any = {
      auth: true,
      token,
      method: "app",
    };

    const statusCode: number = response.auth
      ? StatusCodes.OK
      : StatusCodes.UNAUTHORIZED;

    res.status(statusCode).send(response);
  } catch (error) {
    console.log("Error on: login method", error);
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};
module.exports = {
  login,
};
