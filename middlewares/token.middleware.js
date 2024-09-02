import "dotenv/config";
import jwt from "jsonwebtoken";

const secretKey = process.env.secretKey;

export const validateToken = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ ok: false, msg: "Acceso denegado" });
    }

    token = token.split(" ")[1];

    try {
        const { email, type_user } = jwt.verify(token, secretKey);

        req.email = email;
        req.type_user = type_user;
        next();
    } catch (error) {
        console.error("Error en la verificación del token:", error);
        return res.status(400).json({ ok: false, msg: "Token no válido" });
    }
};

export const verifyAdmin = (req, res, next) => {
    if (req.type_user === 1) {
        return next();
    }
    return res.status(403).json({ ok: false, error: "No autorizado" });
};
