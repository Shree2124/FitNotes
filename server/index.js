import dotenv from "dotenv"
import { app } from "./src/app.js"
import dbConnection from "./src/db/db.js"

dotenv.config({
    path: "./env"
})

const port = process.env.PORT || 5000

dbConnection().then(()=>{
    console.log("connection successful");
}).catch((err)=>{console.log(err);
})

app.get("/",(req, res)=>{res.send("hello")})


app.listen(port,()=>{
    console.log(`app listening ${port}`);
})