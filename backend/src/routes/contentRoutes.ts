import Router from "express"
import { UserAuth } from "../middlewares/userMiddleware.js";
import { contentController } from "../controllers/content.controller.js";

const router = Router();

router.post("/add",UserAuth,contentController.addContent);
router.get("/my",UserAuth,contentController.getMyContent);
router.get("/websitetype",UserAuth,contentController.getContentWithWebsiteType);
router.delete("/My",UserAuth,contentController.deleteContent);

export default router;