import dotenv from "dotenv"
import { app } from "./app"
import dbConnection from "./db/db"

dotenv.config({
    path: "./env"
})

const port = process.env.PORT || 5000

dbConnection().then(()=>{
    console.log("connection successful");
}).catch((err)=>{console.log(err);
})

app.listen(port,()=>{
    console.log(`Server is running: ${port}`);
})

app.get("/",(req, res)=>{
    res.send("Hello")
})