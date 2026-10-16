const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "registros.json");

function inicializar() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf8");
  }
}

function obtenerRegistros() {
  inicializar();
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function guardarRegistros(registros) {
  inicializar();
  fs.writeFileSync(DATA_FILE, JSON.stringify(registros, null, 2), "utf8");
}

function agregarRegistro(datos) {
  const registros = obtenerRegistros();
  const registro = {
    id: Date.now().toString(),
    empresa: String(datos.empresa).trim(),
    producto: String(datos.producto).trim(),
    ventas: Number(datos.ventas),
    ingresos: Number(datos.ingresos),
    costos: Number(datos.costos),
    empleados: Number(datos.empleados),
    fecha: datos.fecha || new Date().toISOString().slice(0, 10),
    creadoEn: new Date().toISOString()
  };
  registros.push(registro);
  guardarRegistros(registros);
  return registro;
}

function eliminarRegistros() {
  guardarRegistros([]);
}

module.exports = {
  obtenerRegistros,
  agregarRegistro,
  eliminarRegistros
};