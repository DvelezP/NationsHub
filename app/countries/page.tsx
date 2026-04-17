"use client";

import { useEffect, useMemo, useState } from "react";
import CountryCard, { type Country } from "@/components/CountryCard";
import SearchBar from "@/components/SearchBar";

/**
 * IMPORTANTE: ahora la app consume NUESTRO backend (puerto 3001),
 * no la API externa directamente. El backend es el "puente" hacia
 * restcountries.com. Si cambiamos la fuente de datos, el frontend ni se entera.
 *
 * Para produccion, cambiar por una variable de entorno:
 *   process.env.NEXT_PUBLIC_API_URL
 */
const API_BASE = "http://localhost:3001/api";

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

        // GET http://localhost:3001/api/countries
        const response = await fetch(`${API_BASE}/countries`);

        if (!response.ok) {
          throw new Error("No fue posible consultar la API.");
        }

        const json: { data: Country[]; total: number } = await response.json();
        setCountries(json.data); // el backend devuelve { data: [...], total: N }
      } catch (err) {
        setError(
          "Ocurrió un error cargando los países. Verifica que el backend este corriendo en el puerto 3001."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(search.toLowerCase())
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
            <span className="font-semibold text-white"> useEffect</span> y consume
            <span className="font-semibold text-white"> nuestro backend</span> (puerto 3001),
            que a su vez consulta la API pública de países.
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
          Endpoint: <span className="font-semibold">GET http://localhost:3001/api/countries</span>
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
            <CountryCard key={country.cca3 ?? country.name} country={country} />
          ))}
        </div>
      )}
    </section>
  );
}
