const express = require("express");
const path = require("path");
const store = require("./store");
const { analizar } = require("./analisis");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/registros", (req, res) => {
  res.json(store.obtenerRegistros());
});

app.get("/api/dashboard", (req, res) => {
  const registros = store.obtenerRegistros();
  const ingresos = registros.reduce((s, r) => s + r.ingresos, 0);
  const costos = registros.reduce((s, r) => s + r.costos, 0);
  const ventas = registros.reduce((s, r) => s + r.ventas, 0);
  const utilidad = ingresos - costos;

  const productos = {};
  registros.forEach((r) => {
    productos[r.producto] = (productos[r.producto] || 0) + r.ventas;
  });

  res.json({
    indicadores: {
      ingresos,
      costos,
      utilidad,
      ventas,
      registros: registros.length,
      margen: ingresos > 0 ? Number(((utilidad / ingresos) * 100).toFixed(2)) : 0
    },
    productos,
    agentes: analizar(registros),
    registros
  });
});

app.post("/api/registros", (req, res) => {
  const { empresa, producto, ventas, ingresos, costos, empleados, fecha } = req.body;
  if (!empresa || !producto) {
    return res.status(400).json({ error: "Empresa y producto son obligatorios." });
  }

  try {
    const registro = store.agregarRegistro({
      empresa,
      producto,
      ventas: Number(ventas),
      ingresos: Number(ingresos),
      costos: Number(costos),
      empleados: Number(empleados),
      fecha
    });
    res.status(201).json({ mensaje: "Guardado correctamente", registro });
  } catch (e) {
    res.status(500).json({ error: "Error al guardar el registro." });
  }
});

app.delete("/api/registros", (req, res) => {
  store.eliminarRegistros();
  res.json({ mensaje: "Registros eliminados." });
});

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});