"use client";

import { useEffect, useMemo, useState } from "react";
import CountryCard from "@/components/CountryCard";
import SearchBar from "@/components/SearchBar";

type Country = {
  name: {
    common: string;
  };
  capital?: string[];
  flags?: {
    svg?: string;
    png?: string;
    alt?: string;
  };
  currencies?: Record<string, { name: string; symbol?: string }>;
  region?: string;
  latlng?: number[];
};

const endpoint =
  "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,region,latlng";

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("No fue posible consultar la API.");
        }

        const data: Country[] = await response.json();
        const orderedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        setCountries(orderedCountries);
      } catch (err) {
        setError("Ocurrió un error cargando los países. Intenta nuevamente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
  }, [countries, search]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Página 2 - Funcionalidad principal
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-white">
            Explorador de países
          </h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Busca países por nombre y revisa su capital, región, moneda y ubicación.
            Esta página usa <span className="font-semibold text-white">useState</span>,
            <span className="font-semibold text-white"> useEffect</span> y consumo de API con fetch.
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
          Endpoint: <span className="font-semibold">/v3.1/all?fields=name,capital,currencies,flags,region,latlng</span>
        </div>
      </div>

      <SearchBar value={search} onChange={setSearch} total={filteredCountries.length} />

      {loading && (
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center text-slate-200">
          Cargando países...
        </div>
      )}

      {error && (
        <div className="mt-8 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-center text-rose-200">
          {error}
        </div>
      )}

      {!loading && !error && filteredCountries.length === 0 && (
        <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-center text-amber-100">
          No se encontraron países con esa búsqueda.
        </div>
      )}

      {!loading && !error && filteredCountries.length > 0 && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCountries.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </div>
      )}
    </section>
  );
}
