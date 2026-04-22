import { ICountryRepository } from "../../../domain/repositories/ICountryRepository";
import { Country } from "../../../domain/entities/Country";

export interface GetAllCountriesOptions {
  /**
   * Limita el numero de resultados. Si es undefined o <=0, devuelve todos.
   * Esto es decision de aplicacion (paginacion/performance), no del dominio.
   */
  limit?: number;
}

export class GetAllCountriesUseCase {
  constructor(private readonly countryRepository: ICountryRepository) {}

  async execute(options: GetAllCountriesOptions = {}): Promise<Country[]> {
    const countries = await this.countryRepository.findAll();
    // Ordenamos alfabeticamente aqui para que el front no tenga que hacerlo
    const sorted = countries.sort((a, b) => a.name.localeCompare(b.name));

    const { limit } = options;
    if (typeof limit === "number" && limit > 0) {
      return sorted.slice(0, limit);
    }
    return sorted;
  }
}
