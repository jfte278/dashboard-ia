const { agregarRegistro, obtenerRegistros } = require("./store");

if (obtenerRegistros().length === 0) {
  agregarRegistro({ empresa: "TechSolutions", producto: "Software Cloud", ventas: 25, ingresos: 35000000, costos: 20000000, empleados: 10, fecha: "2026-10-01" });
  agregarRegistro({ empresa: "TechSolutions", producto: "SST", ventas: 40, ingresos: 18000000, costos: 11000000, empleados: 10, fecha: "2026-10-10" });
  console.log("🌱 Datos de prueba agregados con éxito.");
} else {
  console.log("ℹ️ Ya existen registros previos.");
}