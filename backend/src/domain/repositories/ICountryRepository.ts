import { Country } from "../entities/Country";

/**
 * Contrato del repositorio de paises. El caso de uso no sabe (ni le importa)
 * si los datos vienen de restcountries.com, de un archivo JSON, o de un cache.
 */
export interface ICountryRepository {
  /** Obtiene todos los paises (equivalente al /v3.1/all con fields). */
  findAll(): Promise<Country[]>;

  /** Busca un pais por su codigo ISO (cca2 o cca3). */
  findByCode(code: string): Promise<Country | null>;

  /** Busca paises cuyo nombre contenga el termino (full-text simple). */
  searchByName(name: string): Promise<Country[]>;
}
