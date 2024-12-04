import mongoose from "mongoose"
import { db_name, monogdb_url } from "../config/variables.js";

const dbConnection = async () => {
    try {
        // console.log(`${monogdb_url}/${db_name}`);

        const connection = await mongoose.connect(`${monogdb_url}/${db_name}`)
        console.log("db connected successfully");

    } catch (error) {
        console.log(error);
    }
}

export default dbConnection