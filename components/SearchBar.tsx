type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  total: number;
};

export default function SearchBar({ value, onChange, total }: SearchBarProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Buscar país</h2>
          <p className="text-sm text-slate-400">Escribe el nombre del país que deseas filtrar.</p>
        </div>

        <div className="flex w-full flex-col gap-3 lg:max-w-xl">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ejemplo: Colombia"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
          />
          <p className="text-sm text-slate-400">Resultados visibles: {total}</p>
        </div>
      </div>
    </div>
  );
}
