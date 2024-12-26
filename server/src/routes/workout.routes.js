import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addWorkout } from "../controllers/workout.controller.js";

const router = new Router();

router.route("/add-workout").post(verifyJWT, addWorkout)

export default router;
