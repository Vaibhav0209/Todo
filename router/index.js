import { Router } from "express";
const router = Router();
import task from "./task.js";

router.use("/api", task);

export default router;
