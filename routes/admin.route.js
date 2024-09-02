import { Router } from "express";
import { adminController } from "../controllers/admin.controller.js";
import { validateToken, verifyAdmin } from "../middlewares/token.middleware.js";

const router = Router();

router.get("/login", (req, res) => {
    res.render("adminLogin");
});

router.post("/auth", adminController.postLogin);
router.get("/data", validateToken, verifyAdmin, adminController.getOneAdmin);

export default router;
