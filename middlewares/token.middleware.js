import "dotenv/config";
import jwt from "jsonwebtoken";

const secretKey = process.env.secretKey;

export const validateToken = (req, res, next) => {
    let token = req.headers.authorization;
    console.log(req.tipo_usuario);

    if (!token) return res.status(401).json({ ok: false, msg: "Acceso denegado" });

    token = token.split(" ")[1];

    try {
        const { email, type_user } = jwt.verify(token, secretKey);

        req.email = email;
        req.tipo_usuario = type_user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(400).json({ ok: false, msg: "Token no válido" });
    }
};
