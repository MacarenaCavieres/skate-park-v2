import { Router } from "express";
import { skatersController } from "../controllers/skaters.controller.js";
import { validateToken } from "../middlewares/token.middleware.js";

const router = Router();

router.get("/", skatersController.getAllSkaters);

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/register/success", (req, res) => {
    res.render("regSuccessful");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", skatersController.postLogin);

router.get("/data", (req, res) => {
    res.render("data");
});

router.get("/admin", (req, res) => {
    res.render("admin");
});

export default router;
