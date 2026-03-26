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

function formatCurrency(currencies?: Country["currencies"]) {
  if (!currencies) return "No disponible";

  return Object.entries(currencies)
    .map(([code, currency]) => `${currency.name} (${code}${currency.symbol ? ` - ${currency.symbol}` : ""})`)
    .join(", ");
}

export default function CountryCard({ country }: { country: Country }) {
  const capital = country.capital?.[0] ?? "No disponible";
  const coordinates = country.latlng?.length
    ? `${country.latlng[0]}, ${country.latlng[1]}`
    : "No disponible";

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-lg shadow-slate-950/20 transition hover:-translate-y-1 hover:border-cyan-400/40">
      <div className="aspect-video bg-slate-950">
        <img
          src={country.flags?.png || country.flags?.svg || "https://placehold.co/640x360?text=Bandera"}
          alt={country.flags?.alt || `Bandera de ${country.name.common}`}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-2xl font-bold text-white">{country.name.common}</h3>
          <p className="mt-1 text-sm text-cyan-300">{country.region || "Región no disponible"}</p>
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
