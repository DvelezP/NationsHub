import { Request, Response, NextFunction } from "express";
import { GetAllCountriesUseCase } from "../../../application/use-cases/countries/GetAllCountriesUseCase";
import { GetCountryByCodeUseCase } from "../../../application/use-cases/countries/GetCountryByCodeUseCase";
import { SearchCountriesUseCase } from "../../../application/use-cases/countries/SearchCountriesUseCase";

/**
 * Default + techo del parametro ?limit=. Viven aca (capa de interfaces)
 * porque son decisiones del contrato HTTP, no del dominio ni del caso de uso.
 */
const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 250;

/**
 * Parsea y normaliza ?limit=. Reglas:
 *  - Si no viene:            DEFAULT_LIMIT (50)
 *  - Si viene "all" o 0/neg: sin limite (undefined -> use case devuelve todos)
 *  - Si viene numero valido: clamp a [1, MAX_LIMIT]
 *  - Si viene basura:        DEFAULT_LIMIT
 */
function parseLimit(raw: unknown): number | undefined {
  if (typeof raw !== "string" || raw.length === 0) return DEFAULT_LIMIT;
  if (raw.toLowerCase() === "all") return undefined;

  const n = Number(raw);
  if (!Number.isFinite(n)) return DEFAULT_LIMIT;
  if (n <= 0) return undefined;
  return Math.min(Math.floor(n), MAX_LIMIT);
}

export class CountryController {
  constructor(
    private readonly getAll: GetAllCountriesUseCase,
    private readonly getByCode: GetCountryByCodeUseCase,
    private readonly search: SearchCountriesUseCase
  ) {}

  /**
   * GET /countries
   * GET /countries?search=col
   * GET /countries?limit=20
   * GET /countries?search=col&limit=10
   * GET /countries?limit=all   -> devuelve todos (util para debug)
   */
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const searchTerm =
        typeof req.query.search === "string" ? req.query.search : "";
      const limit = parseLimit(req.query.limit);

      let countries;
      if (searchTerm.trim().length > 0) {
        countries = await this.search.execute(searchTerm, { limit });
      } else {
        countries = await this.getAll.execute({ limit });
      }

      res.json({
        data: countries,
        total: countries.length,
        limit: limit ?? null, // null = sin limite
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * GET /countries/:code   (code = cca2 o cca3, ej: CO, COL)
   */
  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const country = await this.getByCode.execute(req.params.code);
      res.json({ data: country });
    } catch (err) {
      next(err);
    }
  };
}
