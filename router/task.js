import express, { Router } from "express";
import {
  DeleteTask,
  addTask,
  changeDetails,
  completeTask,
  veiwAllTask,
} from "../controller/task.js";
import { body } from "express-validator";
import { TASKVALIDATION } from "../validation/validation.js";

const router = Router();

router.post("/add-task", TASKVALIDATION, addTask);
router.get("/get-task", veiwAllTask);
router.put("/complete-task", completeTask);
router.put("/change-details", changeDetails);
router.delete("/delete-task", DeleteTask);

export default router;
