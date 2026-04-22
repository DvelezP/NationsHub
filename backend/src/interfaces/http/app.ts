import express, { Application, Request, Response } from "express";
import cors from "cors";

import { env } from "../../infrastructure/config/env";

// Repositorio (infraestructura)
import { RestCountriesRepository } from "../../infrastructure/repositories/RestCountriesRepository";

// Casos de uso (aplicacion)
import { GetAllCountriesUseCase } from "../../application/use-cases/countries/GetAllCountriesUseCase";
import { GetCountryByCodeUseCase } from "../../application/use-cases/countries/GetCountryByCodeUseCase";
import { SearchCountriesUseCase } from "../../application/use-cases/countries/SearchCountriesUseCase";

// Controllers + rutas (interfaces)
import { CountryController } from "./controllers/CountryController";
import { buildCountryRoutes } from "./routes/countryRoutes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

/**
 * Composition Root: aqui "cableamos" las dependencias. Este es el unico
 * archivo donde las capas se ven entre si. Cambiar una implementacion de
 * repositorio aqui es la unica modificacion necesaria para migrar de fuente
 * de datos (otra API externa, cache local, BD, etc.).
 */
export function buildApp(): Application {
  const app = express();

  // Middlewares globales
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(express.json());

  // --- Wiring countries (puente con la API externa de paises/mapas) ---
  const countryRepository = new RestCountriesRepository(env.COUNTRIES_API_URL);
  const countryController = new CountryController(
    new GetAllCountriesUseCase(countryRepository),
    new GetCountryByCodeUseCase(countryRepository),
    new SearchCountriesUseCase(countryRepository)
  );

  // Raiz del backend: indice de endpoints (buena DX para devs que abren /)
  app.get("/", (_req: Request, res: Response) => {
    res.json({
      service: "nationshub-backend",
      version: "1.0.0",
      description:
        "API REST que actua como puente entre el frontend (Next.js) y restcountries.com",
      endpoints: {
        health: "GET /health",
        countries: {
          list: "GET /api/countries            (default limit=50)",
          search: "GET /api/countries?search=col",
          withLimit: "GET /api/countries?limit=20",
          noLimit: "GET /api/countries?limit=all",
          byCode: "GET /api/countries/:code    (cca2 o cca3)",
        },
      },
    });
  });

  // Healthcheck
  app.get("/health", (_req: Request, res: Response) => {
    res.json({
      status: "ok",
      service: "nationshub-backend",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  // Rutas de la API
  app.use("/api/countries", buildCountryRoutes(countryController));

  // 404 + errores (siempre al final)
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
