import Router from "express"
import { UserAuth } from "../middlewares/userMiddleware.js";
import { contentController } from "../controllers/content.controller.js";

const router = Router();

router.post("/add",UserAuth,contentController.addContent);
router.get("/my",contentController.getContent);
router.get("/linktype",UserAuth,contentController.getContentWithType);
router.delete("/my",UserAuth,contentController.deleteContent);

export default router;