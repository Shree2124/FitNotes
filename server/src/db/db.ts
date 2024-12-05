import mongoose from "mongoose";
import { db_name, mongodb_url } from "../config/variables";

const dbConnection = async (): Promise<void> => {
  try {
    const connectionString = `${mongodb_url}/${db_name}`;
    await mongoose.connect(connectionString, {
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

export default dbConnection;
