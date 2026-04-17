import { Request, Response, NextFunction } from "express";
import { GetAllCountriesUseCase } from "../../../application/use-cases/countries/GetAllCountriesUseCase";
import { GetCountryByCodeUseCase } from "../../../application/use-cases/countries/GetCountryByCodeUseCase";
import { SearchCountriesUseCase } from "../../../application/use-cases/countries/SearchCountriesUseCase";

export class CountryController {
  constructor(
    private readonly getAll: GetAllCountriesUseCase,
    private readonly getByCode: GetCountryByCodeUseCase,
    private readonly search: SearchCountriesUseCase
  ) {}

  /**
   * GET /countries
   * GET /countries?search=col  -> usa QUERY PARAM para filtrar
   */
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Ejemplo de QUERY PARAM: ?search=colombia -> req.query.search
      const searchTerm = typeof req.query.search === "string" ? req.query.search : "";

      let countries;
      if (searchTerm.trim().length > 0) {
        countries = await this.search.execute(searchTerm);
      } else {
        countries = await this.getAll.execute();
      }

      res.json({ data: countries, total: countries.length });
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
