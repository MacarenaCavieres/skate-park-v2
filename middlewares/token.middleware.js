import "dotenv/config";
import jwt from "jsonwebtoken";

const secretKey = process.env.SK;

export const validateToken = (req, res, next) => {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];

    if (!token) return res.status(401).json({ ok: false, msg: "Acceso denegado" });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            res.status(401).json({ ok: false, msg: "Acceso denegado, token expirado o incorrecto" });
        } else {
            next();
        }
    });
};
