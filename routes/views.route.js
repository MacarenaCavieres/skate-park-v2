import { Router } from "express";
import { skatersController } from "../controllers/skaters.controller.js";

const router = Router();

router.get("/", skatersController.getAllSkaters);

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register/skater", skatersController.postOneSkater);

router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/data", (req, res) => {
    res.render("data");
});
router.get("/admin", (req, res) => {
    res.render("admin");
});

export default router;
