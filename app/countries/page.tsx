"use client";

import { useEffect, useState } from "react";
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

/**
 * Limite por defecto para la carga inicial. Debe coincidir con el default
 * del backend (ver CountryController.DEFAULT_LIMIT). Lo expresamos aca para
 * que el UI muestre un mensaje coherente.
 */
const DEFAULT_LIMIT = 50;

/**
 * Debounce en milisegundos para las busquedas: evita pegarle al backend
 * en cada tecla. Si el usuario esta escribiendo rapido, solo disparamos
 * el fetch cuando para de escribir por 350ms.
 */
const SEARCH_DEBOUNCE_MS = 350;

type CountriesApiResponse = {
  data: Country[];
  total: number;
  limit: number | null;
};

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * Un unico efecto que escucha el valor de `search`:
   *  - Si search esta vacio  -> GET /api/countries          (trae DEFAULT_LIMIT paises)
   *  - Si search tiene texto -> GET /api/countries?search=X (el backend filtra)
   *
   * Aplicamos debounce con setTimeout + cleanup para cancelar la llamada
   * previa si el usuario sigue tecleando. Ademas, AbortController para
   * cancelar la request en vuelo si el termino cambia antes de que responda.
   */
  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const term = search.trim();
        const url =
          term.length > 0
            ? `${API_BASE}/countries?search=${encodeURIComponent(term)}`
            : `${API_BASE}/countries`;

        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          // Para search, el backend puede devolver 404 si no hay matches.
          // Lo tratamos como "lista vacia", no como error.
          if (response.status === 404 && term.length > 0) {
            setCountries([]);
            return;
          }
          throw new Error(`HTTP ${response.status}`);
        }

        const json: CountriesApiResponse = await response.json();
        setCountries(json.data);
      } catch (err) {
        // AbortError no es un error real: paso el usuario siguio tecleando.
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error(err);
        setError(
          "Ocurrió un error consultando los países. Verifica que el backend esté corriendo en el puerto 3001."
        );
      } finally {
        setLoading(false);
      }
    }, search.trim().length > 0 ? SEARCH_DEBOUNCE_MS : 0);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  const hasSearch = search.trim().length > 0;

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
            que a su vez consulta la API pública de países. La búsqueda se hace
            <span className="font-semibold text-white"> en el backend</span> vía query param.
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
          Endpoint:{" "}
          <span className="font-semibold">
            {hasSearch
              ? `GET /api/countries?search=${search.trim()}`
              : `GET /api/countries (limit=${DEFAULT_LIMIT})`}
          </span>
        </div>
      </div>

      <SearchBar value={search} onChange={setSearch} total={countries.length} />

      {loading && (
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center text-slate-200">
          {hasSearch ? `Buscando "${search.trim()}"...` : "Cargando países..."}
        </div>
      )}

      {error && !loading && (
        <div className="mt-8 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-center text-rose-200">
          {error}
        </div>
      )}

      {!loading && !error && countries.length === 0 && (
        <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-center text-amber-100">
          {hasSearch
            ? `No se encontraron países que coincidan con "${search.trim()}".`
            : "No hay países para mostrar."}
        </div>
      )}

      {!loading && !error && countries.length > 0 && (
        <>
          {!hasSearch && (
            <p className="mt-6 text-sm text-slate-400">
              Mostrando los primeros {countries.length} países (limit={DEFAULT_LIMIT}).
              Escribe en el buscador para filtrar desde el backend.
            </p>
          )}
          <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {countries.map((country) => (
              <CountryCard key={country.cca3 ?? country.name} country={country} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
