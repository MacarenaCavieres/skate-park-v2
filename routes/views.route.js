import { Router } from "express";
import { skatersController } from "../controllers/skaters.controller.js";
import { adminController } from "../controllers/admin.controller.js";
// import { verifyAdmin } from "../middlewares/token.middleware.js";

const router = Router();

router.get("/", skatersController.getAllSkaters);

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/data", (req, res) => {
    res.render("data");
});

router.get("/admin", adminController.getSkaters);

export default router;
