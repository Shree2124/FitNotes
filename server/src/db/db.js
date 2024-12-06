import mongoose from "mongoose"
import { db_name, mongodb_url } from "../config/variables.js";
const dbConnection = async () => {
    try {
        // console.log(`${mongodb_url}/${db_name}`);
        const connection = await mongoose.connect(`${mongodb_url}/${db_name}`)
        console.log("db connected successfully");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
export default dbConnection