import  express, { Application }  from "express";
import mongoose from "mongoose";
import getConfig from "./config.js";
import cors from "cors"
import userRouter from "./routes/userRouter.js"

const app:Application = express()

const env = getConfig();
app.use(cors());
app.use(express.json());
app.use('/user',userRouter)
app.listen(env.PORT,async() => {
    await mongoose.connect(env.DATABASE_URL)
    console.log("Server Listning at port 3000");
})