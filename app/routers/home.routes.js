import express from "express";
import { agregarProducto, eliminarProducto, exportToExcel, obtenerProductos } from "../controllers/home.controller.js";

const Homeruta = express.Router();

Homeruta.get("/", async (req, res) => {
    res.send("Bienvenidos");
});
Homeruta.post("/api/agregar-producto", agregarProducto);
Homeruta.delete("/api/eliminar-producto/:codigo", eliminarProducto);
Homeruta.get("/api/exportar", exportToExcel);
Homeruta.get("/api/productos", obtenerProductos);

export default Homeruta;
