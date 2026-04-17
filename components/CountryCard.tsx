/**
 * Forma de pais que devuelve NUESTRO backend (no la API externa).
 * El backend hace el mapeo feo -> limpio, por eso aqui los campos son planos.
 */
export type Country = {
  name: string;
  officialName?: string;
  capital: string | null;
  region: string | null;
  subregion?: string | null;
  flagPng: string | null;
  flagSvg: string | null;
  flagAlt: string | null;
  currencies: Record<string, { name: string; symbol?: string }>;
  latlng: [number, number] | null;
  cca2?: string;
  cca3?: string;
};

function formatCurrency(currencies?: Country["currencies"]) {
  if (!currencies || Object.keys(currencies).length === 0) return "No disponible";

  return Object.entries(currencies)
    .map(
      ([code, currency]) =>
        `${currency.name} (${code}${currency.symbol ? ` - ${currency.symbol}` : ""})`
    )
    .join(", ");
}

export default function CountryCard({ country }: { country: Country }) {
  const capital = country.capital ?? "No disponible";
  const coordinates = country.latlng
    ? `${country.latlng[0]}, ${country.latlng[1]}`
    : "No disponible";

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-lg shadow-slate-950/20 transition hover:-translate-y-1 hover:border-cyan-400/40">
      <div className="aspect-video bg-slate-950">
        <img
          src={country.flagPng || country.flagSvg || "https://placehold.co/640x360?text=Bandera"}
          alt={country.flagAlt || `Bandera de ${country.name}`}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-2xl font-bold text-white">{country.name}</h3>
          <p className="mt-1 text-sm text-cyan-300">
            {country.region || "Region no disponible"}
            {country.subregion ? ` - ${country.subregion}` : ""}
          </p>
        </div>

        <div className="grid gap-3 text-sm text-slate-300">
          <p>
            <span className="font-semibold text-white">Capital:</span> {capital}
          </p>
          <p>
            <span className="font-semibold text-white">Moneda:</span> {formatCurrency(country.currencies)}
          </p>
          <p>
            <span className="font-semibold text-white">Lat/Lng:</span> {coordinates}
          </p>
        </div>
      </div>
    </article>
  );
}
