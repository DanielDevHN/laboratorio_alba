import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import router from "./interfaces/routes";
import { requestLogger } from "./interfaces/middlewares/logger.middleware";
import { errorMiddleware } from "./interfaces/middlewares/error.middleware";

export const startServer = () => {
  const app = express();

  // Middlewares
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.json());
  app.use(requestLogger);

  // Routes
  app.use("/api", router);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Error handler
  app.use(errorMiddleware);

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API documentation is running on http://localhost:${PORT}/api-docs`);
  });

  console.log("Server has been initialized.");
};
