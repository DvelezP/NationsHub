import { buildApp } from "./interfaces/http/app";
import { env } from "./infrastructure/config/env";

/**
 * Punto de entrada. Lo unico que hace es construir la app y ponerla a escuchar.
 * Separar buildApp() del listen() permite testear la app sin abrir un puerto.
 */
const app = buildApp();

app.listen(env.PORT, () => {
  console.log("");
  console.log("====================================================");
  console.log("  NationsHub Backend - Clean Architecture");
  console.log(`  Escuchando en http://localhost:${env.PORT}`);
  console.log(`  CORS origin: ${env.CORS_ORIGIN}`);
  console.log(`  API externa: ${env.COUNTRIES_API_URL}`);
  console.log("====================================================");
  console.log("  Endpoints:");
  console.log("   GET    /");
  console.log("   GET    /health");
  console.log("   GET    /api/countries                 (default limit=50)");
  console.log("   GET    /api/countries?search=col");
  console.log("   GET    /api/countries?limit=20");
  console.log("   GET    /api/countries?limit=all       (sin limite)");
  console.log("   GET    /api/countries/:code           (cca2 o cca3)");
  console.log("====================================================");
  console.log("");
});
