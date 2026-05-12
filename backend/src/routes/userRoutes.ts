import Router from "express"
import { userController } from "../controllers/user.controller.js";
import {UserAuth} from "../middlewares/userMiddleware.js"
const router = Router();

router.post('/signup',userController.signUp);
router.post('/signin',UserAuth,userController.signIn);

export default router;