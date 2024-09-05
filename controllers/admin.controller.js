import "dotenv/config";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";
import { handleErrors } from "../database/errors.db.js";
import { Skater } from "../models/skaters.model.js";

const secretKey = process.env.secretKey;

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(409).json({ ok: false, msg: "Faltan campos" });

    try {
        const data = await Admin.findOne(email);
        if (!data) return res.status(409).json({ ok: false, msg: "Administrador no encontrado" });

        // const match = await bcryptjs.compare(password, data.password);
        // if (!match) return res.status(400).json({ ok: false, msg: "Usuario o contraseña incorrecto" });

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
            msg: "Administrador logeado con éxito",
            token,
            tipo_usuario: data.type_user,
        });
    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const getOneAdmin = async (req, res) => {
    try {
        const data = await Admin.findOne(req.email);

        return res.json({ ok: true, data });
    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const getSkaters = async (req, res) => {
    try {
        const data = await Skater.getAll();
        return res.render("admin", { data });
    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

// const getDataSkaters = async(req,res)=>{
//     try {

//     } catch (error) {

//     }
// }

export const adminController = {
    postLogin,
    getOneAdmin,
    getSkaters,
};
