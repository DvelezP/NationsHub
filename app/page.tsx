import Link from "next/link";

const members = [
  "Santiago Gonzalez Marin",
  "Luis Miguel Giraldo",
  "Integrante 3",
];

export default function Home() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-6xl flex-col justify-center px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-300">
            Evento evaluativo 3 - Mini app en React con Next.js
          </span>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            NationsHub
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            NationsHub es una mini aplicación construida con Next.js, React y TailwindCSS
            para consultar información de países de forma visual y rápida.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <h2 className="text-lg font-semibold text-white">Qué hace la app</h2>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Consume la API de Rest Countries y muestra tarjetas dinámicas con bandera,
                nombre, capital, región, moneda y coordenadas.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <h2 className="text-lg font-semibold text-white">Problema que resuelve</h2>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Evita buscar datos de países en varias fuentes. Todo queda reunido en una
                sola interfaz con búsqueda instantánea.
              </p>
            </article>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/countries"
              className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Ir a funcionalidad
            </Link>
            <a
              href="https://restcountries.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-slate-500 hover:bg-slate-800"
            >
              Ver API usada
            </a>
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900 to-slate-950 p-8">
          <h2 className="text-2xl font-bold text-white">Integrantes del grupo</h2>
          <ul className="mt-6 space-y-3">
            {members.map((member) => (
              <li
                key={member}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-slate-200"
              >
                {member}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-7 text-cyan-100">
            <strong>Endpoint aplicado:</strong> /v3.1/all?fields=name,capital,currencies,flags,region,latlng
          </div>
        </aside>
      </div>
    </section>
  );
}
