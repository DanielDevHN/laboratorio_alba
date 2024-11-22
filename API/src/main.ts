import "reflect-metadata";
import dotenv from "dotenv";
import { AppDataSource } from "./infrastructure/env/config";
import { startServer } from "./server";

dotenv.config();

const startApplication = async () => {
  try {
    console.log("Initializing database connection...");
    await AppDataSource.initialize();
    console.log("Database connected successfully!");

    console.log("Starting server...");
    startServer();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during application startup:", error.message);
    } else {
      console.error("Error during application startup:", error);
    }
    process.exit(1);
  }
};

startApplication();
