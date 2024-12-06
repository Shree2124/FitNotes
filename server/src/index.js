import dotenv from "dotenv"
import { app } from "./app.js"
import dbConnection from "./db/db.js"

dotenv.config({
    path: "./env"
})

const port = process.env.PORT || 5000

dbConnection().then(()=>{
    console.log("connection successful");
}).catch((err)=>{console.log(err);
})


app.listen(port,()=>{
    console.log(`app listening ${port}`);
})