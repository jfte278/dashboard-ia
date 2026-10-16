const readline = require("readline");
const { agregarRegistro } = require("./store");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const preguntar = (texto) => new Promise(resolve => rl.question(texto, resolve));

async function iniciar() {
  console.log("\n=== REGISTRO EMPRESARIAL POR CONSOLA ===");
  try {
    const empresa = (await preguntar("Nombre de la empresa: ")).trim();
    const producto = (await preguntar("Producto o servicio: ")).trim();
    const ventas = Number(await preguntar("Unidades vendidas: "));
    const ingresos = Number(await preguntar("Ingresos (COP): "));
    const costos = Number(await preguntar("Costos (COP): "));
    const empleados = Number(await preguntar("Número de empleados: "));
    const fecha = (await preguntar("Fecha (AAAA-MM-DD, enter para hoy): ")).trim() || new Date().toISOString().slice(0, 10);

    if (!empresa || !producto) throw new Error("Empresa y producto obligatorios.");

    agregarRegistro({ empresa, producto, ventas, ingresos, costos, empleados, fecha });
    console.log("\n✅ ¡Registro guardado exitosamente en el sistema!");
  } catch (e) {
    console.error("\n❌ Error:", e.message);
  } finally {
    rl.close();
  }
}

iniciar();