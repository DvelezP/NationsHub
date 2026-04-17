import dotenv from "dotenv";

dotenv.config();

/**
 * Centraliza variables de entorno tipadas. Si falta una variable critica,
 * fallamos temprano en lugar de romper a las 2am en produccion.
 */
export const env = {
  PORT: parseInt(process.env.PORT || "3001", 10),
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  COUNTRIES_API_URL: process.env.COUNTRIES_API_URL || "https://restcountries.com/v3.1",
};
