import { Router } from "express";
import Homeruta from "./home.routes.js";

const ruta = Router();

ruta.use("/", Homeruta);
ruta.use("/home", Homeruta);

export default ruta;
