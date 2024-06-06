import { body } from "express-validator";

const TASKVALIDATION = [
  body("details").trim().notEmpty().withMessage("please add details"),
  body("title").trim().notEmpty().withMessage("please add title"),
];

export { TASKVALIDATION };
