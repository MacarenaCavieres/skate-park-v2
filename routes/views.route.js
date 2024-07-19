import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("home");
});
router.get("/register", (req, res) => {
    res.render("register");
});
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
