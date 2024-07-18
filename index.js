import express from "express";
import routerViews from "./routes/views.route.js";
import { engine } from "express-handlebars";
import path from "path";

const app = express();

const __dirname = import.meta.dirname;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname + "/views"));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routerViews);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
