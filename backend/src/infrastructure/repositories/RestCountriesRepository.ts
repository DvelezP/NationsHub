import { ICountryRepository } from "../../domain/repositories/ICountryRepository";
import { Country, CountryCurrency } from "../../domain/entities/Country";

/**
 * INFRASTRUCTURE LAYER - Adaptador para restcountries.com.
 *
 * Aqui hacemos 2 cosas:
 *   1. Llamar a la API externa con fetch nativo de Node 18+.
 *   2. Mapear el payload (que es feo y lleno de campos innecesarios) al
 *      modelo limpio "Country" del dominio.
 *
 * Tambien cacheamos en memoria durante CACHE_TTL_MS para no martillar la API
 * externa en cada request del front. Esto es una decision de infraestructura
 * y no afecta al dominio.
 */

interface RawRestCountry {
  name?: { common?: string; official?: string };
  capital?: string[];
  region?: string;
  subregion?: string;
  flags?: { png?: string; svg?: string; alt?: string };
  currencies?: Record<string, { name?: string; symbol?: string }>;
  latlng?: number[];
  cca2?: string;
  cca3?: string;
}

const FIELDS = "name,capital,currencies,flags,region,subregion,latlng,cca2,cca3";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

export class RestCountriesRepository implements ICountryRepository {
  private cache: { data: Country[]; expiresAt: number } | null = null;

  constructor(private readonly baseUrl: string) {}

  private mapToDomain(raw: RawRestCountry): Country {
    const currencies: Record<string, CountryCurrency> = {};
    if (raw.currencies) {
      for (const [code, cur] of Object.entries(raw.currencies)) {
        currencies[code] = { name: cur?.name ?? code, symbol: cur?.symbol };
      }
    }

    return {
      name: raw.name?.common ?? "Desconocido",
      officialName: raw.name?.official,
      capital: raw.capital && raw.capital.length > 0 ? raw.capital[0] : null,
      region: raw.region ?? null,
      subregion: raw.subregion ?? null,
      flagPng: raw.flags?.png ?? null,
      flagSvg: raw.flags?.svg ?? null,
      flagAlt: raw.flags?.alt ?? null,
      currencies,
      latlng:
        raw.latlng && raw.latlng.length >= 2
          ? [raw.latlng[0], raw.latlng[1]]
          : null,
      cca2: raw.cca2,
      cca3: raw.cca3,
    };
  }

  async findAll(): Promise<Country[]> {
    // Cache hit
    if (this.cache && Date.now() < this.cache.expiresAt) {
      return this.cache.data;
    }

    const url = `${this.baseUrl}/all?fields=${FIELDS}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Error consultando API externa (${response.status} ${response.statusText})`
      );
    }

    const raw = (await response.json()) as RawRestCountry[];
    const mapped = raw.map((c) => this.mapToDomain(c));

    this.cache = { data: mapped, expiresAt: Date.now() + CACHE_TTL_MS };
    return mapped;
  }

  async findByCode(code: string): Promise<Country | null> {
    const normalized = code.toUpperCase();
    // Intentamos primero el endpoint especifico /alpha/{code} para ser eficientes
    try {
      const url = `${this.baseUrl}/alpha/${encodeURIComponent(
        normalized
      )}?fields=${FIELDS}`;
      const response = await fetch(url);
      if (response.status === 404) return null;
      if (!response.ok) {
        throw new Error(
          `Error consultando API externa (${response.status} ${response.statusText})`
        );
      }
      const data = (await response.json()) as RawRestCountry | RawRestCountry[];
      const raw = Array.isArray(data) ? data[0] : data;
      return raw ? this.mapToDomain(raw) : null;
    } catch {
      // Fallback: filtrar desde findAll() si el endpoint directo falla
      const all = await this.findAll();
      return (
        all.find((c) => c.cca2 === normalized || c.cca3 === normalized) ?? null
      );
    }
  }

  async searchByName(name: string): Promise<Country[]> {
    const all = await this.findAll();
    const q = name.toLowerCase();
    return all.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.officialName?.toLowerCase().includes(q) ?? false)
    );
  }
}
