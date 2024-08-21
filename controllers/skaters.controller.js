import { Skater } from "../models/skaters.model.js";
import { handleErrors } from "../database/errors.db.js";
import path from "path";

const __dirname = import.meta.dirname;
const pathFile = path.join(__dirname, "../public/assets/imgs");

const postOneSkater = async (req, res) => {
    const { email, nombre, password, years_experience, specialty } = req.body;
    const { photo } = req.files;

    if (!email || !nombre || !password || !years_experience || !specialty || !photo)
        return res.status(409).json({ ok: false, msg: "Faltan campos" });

    const name = `${nombre.split(" ").join("")}.jpg`;
    // const profileFoto = `${name}`;

    try {
        photo.mv(path.join(pathFile, name), (err) => {
            if (err) {
                return res.status(500).json({ ok: false, msg: "Error de servidor" });
            }
        });

        const data = await Skater.postOne(email, name, password, years_experience, specialty, name);
        return res.redirect("regSuccess");
    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

export const skatersController = {
    postOneSkater,
};
