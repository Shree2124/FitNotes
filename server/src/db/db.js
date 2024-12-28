import mongoose from "mongoose"
import { db_name, mongodb_url } from "../config/variables.js";
const dbConnection = async () => {
    try {
        console.log(`${mongodb_url}/${db_name}`);
        const connection = await mongoose.connect(`${process.env.MONGODB_URl}/${db_name}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        })
        console.log("db connected successfully");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
export default dbConnection