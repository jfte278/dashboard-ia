
# Dashboard Empresarial Inteligente

## Objetivo
Registrar datos empresariales, visualizar indicadores y utilizar
agentes de análisis para apoyar la toma de decisiones.

## Tecnologías
- HTML5 y CSS3
- JavaScript
- Node.js
- Express
- Chart.js

## Agentes
1. Agente de ventas: analiza las unidades vendidas y su evolución.
2. Agente de rentabilidad: calcula utilidad y margen.
3. Agente de recomendaciones: propone acciones basadas en los datos.

## Instalación

Requiere Node.js instalado.

```bash
npm install
npm run seed
npm start
```

Abrir http://localhost:3000

## Registro desde la consola

En otra terminal, ejecutar:

```bash
npm run cli
```

## API

- GET /api/registros
- GET /api/dashboard
- POST /api/registros
- DELETE /api/registros

## Almacenamiento

Los datos se guardan localmente en data/registros.json.
Para publicar la aplicación se necesita almacenamiento persistente
en el servidor de alojamiento.

## URL pública

Pendiente de desplegar la aplicación.
