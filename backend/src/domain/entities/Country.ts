/**
 * DOMAIN LAYER - Entidad Country
 * -----------------------------------------------------------------------------
 * Representa un pais tal como lo necesita NUESTRO front. Es un DTO de dominio
 * adaptado al contrato que consume el componente <CountryCard />.
 *
 * Importante: no es identico al payload de restcountries.com. Aqui definimos
 * que campos exponemos y en que forma, para que si la API externa cambia,
 * solo toquemos el mapper en infrastructure, no el front ni los casos de uso.
 */
export interface CountryCurrency {
  name: string;
  symbol?: string;
}

export interface Country {
  name: string;                               // name.common de la API externa
  officialName?: string;                      // name.official
  capital: string | null;                     // primer elemento de capital[]
  region: string | null;
  subregion?: string | null;
  flagPng: string | null;
  flagSvg: string | null;
  flagAlt: string | null;
  currencies: Record<string, CountryCurrency>;
  latlng: [number, number] | null;            // [lat, lng]
  cca2?: string;                              // codigo ISO 2 letras
  cca3?: string;                              // codigo ISO 3 letras
}
