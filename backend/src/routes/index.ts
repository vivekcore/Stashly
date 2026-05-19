import userRouter from "./userRoutes.js"
import contentRouter from "./contentRoutes.js"
import Router from "express"

const router = Router();

router.use("/user",userRouter);
router.use("/content",contentRouter);
export default router;