import "dotenv/config";
import jwt from "jsonwebtoken";
import fileUpload from "express-fileupload";

const fileConfig = fileUpload({
    limits: { fieldSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo es superior al limite permitido",
});

const secretKey = process.env.secretKey;

export const generateToken = (email, type_user) => {
    return jwt.sign({ email, type_user }, secretKey, { expiresIn: "1h" });
};

export default fileConfig;
