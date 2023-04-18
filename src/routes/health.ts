import express, { Router, Request, Response, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
const router: Router = express();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
