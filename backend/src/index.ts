import express, { Application } from "express";
import getConfig from "./utils/config.js";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import { ConnectDB } from "./db/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app: Application = express();

const env = getConfig();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.listen(env.PORT, async () => {
  ConnectDB();
  //app.use(errorHandler);
  console.log(`Server Listning at port ${env.PORT}`);
});
