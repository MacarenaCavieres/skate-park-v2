import { Router } from "express";
import { skatersController } from "../controllers/skaters.controller.js";
import { validateToken } from "../middlewares/token.middleware.js";

const router = Router();

router.post("/register/skater", skatersController.register);
router.post("/login", skatersController.postLogin);
router.get("/data", validateToken, skatersController.getDataSkater);
router.put("/skater/update", skatersController.putOneSkater);
router.delete("/skater/delete", skatersController.deleteOneSkater);

export default router;
