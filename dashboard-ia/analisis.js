function agenteVentas(registros) {
  const ventas = registros.reduce((total, r) => total + r.ventas, 0);
  const ingresos = registros.reduce((total, r) => total + r.ingresos, 0);
  let mensaje = "No hay suficientes datos para analizar.";

  if (registros.length > 0) {
    mensaje = `Se han registrado ${ventas} unidades vendidas y ${formato(ingresos)} en ingresos totales.`;
    if (registros.length >= 2) {
      const mitad = Math.floor(registros.length / 2);
      const anteriores = registros.slice(0, mitad);
      const recientes = registros.slice(mitad);
      const promAnterior = anteriores.reduce((s, r) => s + r.ventas, 0) / anteriores.length;
      const promReciente = recientes.reduce((s, r) => s + r.ventas, 0) / recientes.length;

      if (promReciente > promAnterior) {
        mensaje += " 📈 Tendencia positiva: los registros recientes muestran un incremento en ventas.";
      } else if (promReciente < promAnterior) {
        mensaje += " 📉 Alerta: los registros recientes muestran una disminución en ventas.";
      } else {
        mensaje += " ⚖️ Las ventas se mantienen estables.";
      }
    }
  }

  return { agente: "Agente de Ventas y Tendencias", resultado: mensaje };
}

function agenteRentabilidad(registros) {
  const ingresos = registros.reduce((s, r) => s + r.ingresos, 0);
  const costos = registros.reduce((s, r) => s + r.costos, 0);
  const utilidad = ingresos - costos;
  const margen = ingresos > 0 ? (utilidad / ingresos) * 100 : 0;

  let mensaje = `Utilidad acumulada: ${formato(utilidad)} (Margen: ${margen.toFixed(2)}%).`;
  if (registros.length === 0) {
    mensaje = "Registra información empresarial para evaluar la rentabilidad.";
  } else if (utilidad < 0) {
    mensaje += " ⚠️ Atención: los costos operativos superan los ingresos generados.";
  } else if (margen < 15) {
    mensaje += " 💡 El margen de ganancia es bajo (<15%). Se sugiere optimizar gastos.";
  } else {
    mensaje += " ✅ Excelente desempeño financiero con rentabilidad saludable.";
  }

  return {
    agente: "Agente de Rentabilidad Financiera",
    resultado: mensaje,
    utilidad,
    margen: Number(margen.toFixed(2))
  };
}

function agenteRecomendaciones(registros) {
  const recomendaciones = [];
  if (registros.length === 0) {
    recomendaciones.push("Registra información empresarial para generar recomendaciones automatizadas.");
  } else {
    const ingresos = registros.reduce((s, r) => s + r.ingresos, 0);
    const costos = registros.reduce((s, r) => s + r.costos, 0);
    
    if (costos > ingresos) {
      recomendaciones.push("Reducir urgentemente los costos fijos y renegociar contratos con proveedores.");
    }
    
    const productos = {};
    registros.forEach(r => {
      productos[r.producto] = (productos[r.producto] || 0) + r.ventas;
    });
    
    const mejorProducto = Object.entries(productos).sort((a, b) => b[1] - a[1])[0];
    if (mejorProducto) {
      recomendaciones.push(`Potenciar la línea de producto '${mejorProducto[0]}' ya que lidera las ventas con ${mejorProducto[1]} unidades.`);
    }
    
    recomendaciones.push("Mantener un monitoreo diario de los indicadores para respaldar las decisiones gerenciales.");
  }

  return { agente: "Agente de Recomendaciones Estratégicas", recomendaciones };
}

function formato(numero) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(numero);
}

function analizar(registros) {
  return {
    ventas: agenteVentas(registros),
    rentabilidad: agenteRentabilidad(registros),
    recomendaciones: agenteRecomendaciones(registros)
  };
}

module.exports = { analizar };