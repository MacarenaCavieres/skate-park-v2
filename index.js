import express from "express";
import routerViews from "./routes/views.route.js";
import routerSkater from "./routes/skaters.route.js";
import routerAdmin from "./routes/admin.route.js";
import path from "path";
import fileConfig from "./utils/config.util.js";
import { engine } from "express-handlebars";

const app = express();

const __dirname = import.meta.dirname;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname + "/views"));

// app.use(express.static(path.join(__dirname, "/imgs")));
app.use(express.static("public"));
app.use(fileConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routerViews);
app.use("/users", routerSkater);
app.use("/admin", routerAdmin);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
