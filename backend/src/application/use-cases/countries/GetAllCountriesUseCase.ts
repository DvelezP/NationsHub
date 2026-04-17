import { ICountryRepository } from "../../../domain/repositories/ICountryRepository";
import { Country } from "../../../domain/entities/Country";

export class GetAllCountriesUseCase {
  constructor(private readonly countryRepository: ICountryRepository) {}

  async execute(): Promise<Country[]> {
    const countries = await this.countryRepository.findAll();
    // Ordenamos alfabeticamente aqui para que el front no tenga que hacerlo
    return countries.sort((a, b) => a.name.localeCompare(b.name));
  }
}
