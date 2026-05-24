import Router from "express";
import contentRouter from "./contentRoutes.js";
import noteRouter from "./noteRoutes.js"
const router = Router();

router.use("/content", contentRouter);
router.use("/note",noteRouter)
export default router;
