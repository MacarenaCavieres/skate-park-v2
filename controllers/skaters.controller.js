import bcryptjs from "bcryptjs";
import path from "path";
import { Skater } from "../models/skaters.model.js";
import { handleErrors } from "../database/errors.db.js";

const __dirname = import.meta.dirname;
const pathFile = path.join(__dirname, "../public/assets/imgs");

const postOneSkater = async (req, res) => {
    const { email, nombre, password, rePassword, years_experience, specialty } = req.body;
    const { photo } = req.files;

    if (!email || !nombre || !password || !years_experience || !specialty || !photo)
        return res.status(409).json({ ok: false, msg: "Faltan campos" });

    if (password !== rePassword) return res.status(400).json({ ok: false, msg: "Contraseñas no coinciden" });

    const name = `${nombre.split(" ").join("")}.jpg`;
    // const profileFoto = `${name}`;

    try {
        photo.mv(path.join(pathFile, name), (err) => {
            if (err) {
                return res.status(500).json({ ok: false, msg: "Error de servidor" });
            }
        });

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const data = await Skater.postOne(email, nombre, hashPassword, years_experience, specialty, name);
        return res.render("regSuccessful", { data });
    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const getAllSkaters = async (req, res) => {
    try {
        const data = await Skater.getAll();

        res.render("home", { data });
    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

export const skatersController = {
    postOneSkater,
    getAllSkaters,
};
