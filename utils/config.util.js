import fileUpload from "express-fileupload";

const fileConfig = fileUpload({
    limits: { fieldSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo es superior al limite permitido",
});
export default fileConfig;
