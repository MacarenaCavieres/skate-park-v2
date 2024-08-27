import "dotenv/config";
import jwt from "jsonwebtoken";

const secretKey = process.env.SK;

export const validateToken = (req, res, next) => {
    console.log(req.headers);
    const token = req.headers["authorization"] || req.query.token;

    if (!token) return res.status(401).json({ ok: false, msg: "Acceso denegado" });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            res.status(401).json({ ok: false, msg: "Acceso denegado, token expirado o incorrecto" });
        } else {
            req.email = user.email;
            next();
        }
    });
};
