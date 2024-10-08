import bcryptjs from "bcryptjs";
import path from "path";
import jwt from "jsonwebtoken";
import { Skater } from "../models/skaters.model.js";
import { handleErrors } from "../database/errors.db.js";

const __dirname = import.meta.dirname;
const pathFile = path.join(__dirname, "../public/assets/imgs");
const secretKey = process.env.secretKey;

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

const register = async (req, res) => {
    const { email, nombre, password, rePassword, years_experience, specialty } = req.body;
    const { photo } = req.files;

    if (!email || !nombre || !password || !years_experience || !specialty || !photo)
        return res.status(409).json({ ok: false, msg: "Faltan campos" });

    if (password !== rePassword) return res.status(400).json({ ok: false, msg: "Contraseñas no coinciden" });

    const name = `${nombre.split(" ").join("")}.jpg`;

    try {
        const skater = await Skater.findOne(email);

        if (skater) return res.status(400).json({ ok: false, msg: "Usuario ya existe" });

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

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(409).json({ ok: false, msg: "Faltan campos" });

    try {
        const data = await Skater.findOne(email);
        if (!data) return res.status(409).json({ ok: false, msg: "Usuario no encontrado" });

        const match = await bcryptjs.compare(password, data.password);
        if (!match) return res.status(400).json({ ok: false, msg: "Usuario o contraseña incorrecto" });

        const token = jwt.sign(
            {
                email: data.email,
                type_user: data.type_user,
            },
            secretKey,
            {
                expiresIn: "1h",
            }
        );

        return res.json({
            ok: true,
            msg: "Usuario logeado con éxito",
            token,
            tipo_usuario: data.type_user,
        });
    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const getDataSkater = async (req, res) => {
    try {
        const data = await Skater.findOne(req.email);
        return res.json({ ok: true, data });
    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const putOneSkater = async (req, res) => {
    const { email, nombre, password, rePassword, years_experience, specialty } = req.body;

    if (!email || !nombre || !password || !years_experience || !specialty)
        return res.status(409).json({ ok: false, msg: "Faltan campos" });

    if (password !== rePassword) return res.status(400).json({ ok: false, msg: "Contraseñas no coinciden" });

    try {
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const data = await Skater.putOne(email, nombre, hashPassword, years_experience, specialty);

        return res.json({ ok: true, data });
    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const deleteOneSkater = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ ok: false, msg: "Faltan campos" });

    try {
        const skater = await Skater.findOne(email);
        if (!skater) return res.status(409).json({ ok: false, msg: "Usuario no encontrado" });

        const match = await bcryptjs.compare(password, skater.password);
        if (!match) return res.status(400).json({ ok: false, msg: "Usuario o contraseña incorrecta" });

        await Skater.deleteOne(skater.id);

        return res.json({ ok: true, msg: "Registro eliminado con éxito" });
    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const putOneState = async (req, res) => {
    const { id, state } = req.body;
    if (!id) return res.json({ ok: false, msg: "Faltan campos" });

    try {
        const data = await Skater.putState(id, state);

        return res.json({ ok: true, msg: "Registro actualizado con éxito", data });
    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

export const skatersController = {
    register,
    getAllSkaters,
    postLogin,
    getDataSkater,
    putOneSkater,
    deleteOneSkater,
    putOneState,
};
