import dotenv from "dotenv"
import { app } from "./src/app.js"

dotenv.config({
    path: "./env"
})

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server is running: ${port}`);
})

app.get("/",(req, res)=>{
    res.send("Hello")
})