import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addMuscle } from "../controllers/muscle.controller.js";

const router = new Router();

router.route("/add-muscle").post(verifyJWT, addMuscle);

export default router;
