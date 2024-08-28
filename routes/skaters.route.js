import { Router } from "express";
import { skatersController } from "../controllers/skaters.controller.js";
import { validateToken } from "../middlewares/token.middleware.js";

const router = Router();

router.post("/register/skater", skatersController.postOneSkater);
// router.post("/login", Usercontrollers.login);
router.get("/data", validateToken, skatersController.getDataSkater);
// router.get("/proyecto", verifyToken, Usercontrollers.profile);

export default router;
