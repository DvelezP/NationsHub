import { ICountryRepository } from "../../../domain/repositories/ICountryRepository";
import { Country } from "../../../domain/entities/Country";

export class SearchCountriesUseCase {
  constructor(private readonly countryRepository: ICountryRepository) {}

  async execute(name: string): Promise<Country[]> {
    if (!name || name.trim().length === 0) {
      throw new Error("Debe proporcionar un nombre para buscar");
    }
    return this.countryRepository.searchByName(name.trim());
  }
}
