import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Option } from '../definitions/options';

export const MAX_OPTIONS = 10;

export const postRandomOption = (
  req: Request,
  res: Response
) => {
  const options: { [name: string]: number } = {};

  const requestBody: Option[] = req.body;

  if (!Array.isArray(requestBody)) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${ReasonPhrases.INTERNAL_SERVER_ERROR} Request body must be an array` });
  }

  if (requestBody.length > MAX_OPTIONS) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${ReasonPhrases.INTERNAL_SERVER_ERROR} Too many options (maximum is ${MAX_OPTIONS})` });
  }

  let totalPercentage = 0;

  for (const option of requestBody) {
    const name = option.name;
    const percentage = option.percentage;

    if (typeof name !== "string" || name.trim().length === 0) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${ReasonPhrases.INTERNAL_SERVER_ERROR}, ${name} must be a non-empty string` });
    }

    if (typeof percentage !== "number" || percentage < 0) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${ReasonPhrases.INTERNAL_SERVER_ERROR}, ${name} percentage must be a non-negative number` });
    }

    totalPercentage += percentage;

    const cleanOptionName: string = name.trim();

    if (options[cleanOptionName]) {
      options[cleanOptionName] += percentage;
    } else {
      options[cleanOptionName] = percentage;
    }
  }

  if (totalPercentage > 100) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${ReasonPhrases.INTERNAL_SERVER_ERROR} Total percentage cannot be greater than 100%` });
  }

  if (totalPercentage < 100) {
    options["Indeterminado"] = 100 - totalPercentage;
  }

  let newTotalPercentage = 0;

  for (const [, percentage] of Object.entries(options)) {
    newTotalPercentage += percentage;
  }

  const randomNumber = Math.random() * newTotalPercentage;

  let percentageSum = 0;

  for (const [name, percentage] of Object.entries(options)) {
    percentageSum += percentage;
    if (percentageSum > randomNumber) {
      return res.json({ name, percentage });
    }
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${ReasonPhrases.INTERNAL_SERVER_ERROR} Failed to choose a random option` });
};

module.exports = {
  postRandomOption,
  MAX_OPTIONS
};
