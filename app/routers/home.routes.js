import express from "express";
import { agregarProducto, eliminarProducto, exportToExcel } from "../controllers/home.controller.js";

const Homeruta = express.Router();

Homeruta.get("/", async (req, res) => {
    res.send("Bienvenidos");
});
Homeruta.post("/api/agregar-producto", agregarProducto);
Homeruta.delete("/api/eliminar-producto/:codigo", eliminarProducto);
Homeruta.get("/api/exportar", exportToExcel);

export default Homeruta;
