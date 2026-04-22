import { ICountryRepository } from "../../../domain/repositories/ICountryRepository";
import { Country } from "../../../domain/entities/Country";

export interface SearchCountriesOptions {
  /**
   * Limita el numero de resultados. Si es undefined o <=0, devuelve todos los matches.
   */
  limit?: number;
}

export class SearchCountriesUseCase {
  constructor(private readonly countryRepository: ICountryRepository) {}

  async execute(
    name: string,
    options: SearchCountriesOptions = {}
  ): Promise<Country[]> {
    if (!name || name.trim().length === 0) {
      throw new Error("Debe proporcionar un nombre para buscar");
    }
    const results = await this.countryRepository.searchByName(name.trim());
    // Orden alfabetico consistente con GetAll
    const sorted = results.sort((a, b) => a.name.localeCompare(b.name));

    const { limit } = options;
    if (typeof limit === "number" && limit > 0) {
      return sorted.slice(0, limit);
    }
    return sorted;
  }
}
