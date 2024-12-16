import data from "../data/data.js";
import ExcelJS from "exceljs";

export const agregarProducto = (req, res) => {
    const { pareja, zona, codigo, conteo } = req.body;

    if (!pareja || !zona || !codigo || !conteo) {
        return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
    }

    const talla = codigo.slice(-2);
    const nuevoProducto = { pareja, zona, codigo, conteo, talla, fecha: new Date().toLocaleString() };
    data.push(nuevoProducto);

    res.json({ success: true, productos: data }); // Retorna todos los productos para el frontend
};

export const obtenerProductos = (req, res) => {
    res.json({ success: true, productos: data }); // Retorna los productos actuales
};


export const eliminarProducto = (req, res) => {
    const { codigo } = req.params;

    const index = data.findIndex(producto => producto.codigo === codigo);
    if (index === -1) {
        return res.status(404).json({ success: false, message: "Producto no encontrado" });
    }

    data.splice(index, 1);
    res.json({ success: true, productos: data });
};

export const exportToExcel = (req, res) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Inventario");

    worksheet.columns = [
        { header: "Pareja", key: "pareja", width: 10 },
        { header: "Zona", key: "zona", width: 20 },
        { header: "Código", key: "codigo", width: 20 },
        { header: "Fecha", key: "fecha", width: 20 },
        { header: "Talla", key: "talla", width: 10 },
        { header: "Conteo", key: "conteo", width: 10 },
    ];

    data.forEach(item => worksheet.addRow(item));

    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
        "Content-Disposition",
        'attachment; filename="inventario.xlsx"'
    );

    workbook.xlsx.writeBuffer().then(buffer => {
        res.send(buffer); // Enviar el archivo como un buffer
        data.length = 0; // Limpia los datos después de exportar
    }).catch(err => {
        console.error("Error al generar el archivo de Excel:", err);
        res.status(500).send("Error al generar el archivo de Excel.");
    });
};

