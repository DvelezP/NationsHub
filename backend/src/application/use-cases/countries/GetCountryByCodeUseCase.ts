import { ICountryRepository } from "../../../domain/repositories/ICountryRepository";
import { Country } from "../../../domain/entities/Country";

export class GetCountryByCodeUseCase {
  constructor(private readonly countryRepository: ICountryRepository) {}

  async execute(code: string): Promise<Country> {
    const country = await this.countryRepository.findByCode(code);
    if (!country) {
      throw new Error(`Pais con codigo ${code} no encontrado`);
    }
    return country;
  }
}
