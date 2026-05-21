import contentRouter from "./contentRoutes.js";
import Router from "express";

const router = Router();

router.use("/content", contentRouter);
export default router;
