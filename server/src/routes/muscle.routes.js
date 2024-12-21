import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addMuscle, editMuscle } from "../controllers/muscle.controller.js";

const router = new Router();

router.route("/add-muscle").post(verifyJWT, addMuscle);
router.route("/edit-muscle/:muscleId").put(verifyJWT, editMuscle);

export default router;
