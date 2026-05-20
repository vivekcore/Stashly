import express, { Application } from "express";
import cors from "cors";
import rootRouter from "./routes/index.js";
import { ConnectDB } from "./db/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { getAuth } from "./auth/auth.js";
import { toNodeHandler } from "better-auth/node";
import dotenv from "dotenv"

dotenv.config();

const app: Application = express();

const startServer = async () => {
  try {
    await ConnectDB();
    const auth = getAuth();
    console.log("DB connected");

    const allowedOrigins = [
      "http://localhost:5173",
      process.env.FRONTEND_URL
    ].filter(Boolean) as string[];

    app.use(
      cors({
        origin: allowedOrigins,
        credentials: true,
      }),
    );

    // 1. Better Auth handler must come BEFORE express.json() for Express 5
    // Use *splat for Express 5 wildcard support
    app.all("/api/v1/auth/*splat", toNodeHandler(auth));

    // 2. Body parsers and other routes
    app.use(express.json());
    app.use("/api/v1", rootRouter);

    // 3. Error handler should be last
    app.use(errorHandler);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    process.exit(1);
  }
};

startServer();
