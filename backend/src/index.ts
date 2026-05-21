import express, { Application } from "express";
import cors from "cors";
import rootRouter from "./routes/index.js";
import { ConnectDB } from "./db/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { getAuth } from "./auth/auth.js";
import { toNodeHandler } from "better-auth/node";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

const startServer = async () => {
  try {
    await ConnectDB();
    const auth = getAuth();
    console.log("DB connected");

    app.use(
      cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
      }),
    );

    app.all("/api/v1/auth/*splat", toNodeHandler(auth));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api/v1", rootRouter);

    app.get("/", (req, res) => {
      const frontend = process.env.FRONTEND_URL as string
      res.redirect(frontend);
    });
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
