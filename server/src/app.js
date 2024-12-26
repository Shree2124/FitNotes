import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173","*",   process.env.CORS_ORIGIN],
        credentials: true,
    })
);


app.use(
    express.json({
        limit: "16kb",
    })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import muscleRouter from "./routes/muscle.routes.js";
import workoutRouter from "./routes/workout.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/muscle", muscleRouter);
app.use("/api/v1/workout", workoutRouter);


export { app };
