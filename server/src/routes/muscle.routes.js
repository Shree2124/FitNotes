import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addMuscle, deleteMuscle, editMuscle } from "../controllers/muscle.controller.js";

const router = new Router();

router.route("/add-muscle").post(verifyJWT, addMuscle);
router.route("/edit-muscle/:muscleId").put(verifyJWT, editMuscle);
router.route("/delete-muscle").delete(verifyJWT, deleteMuscle)

export default router;
