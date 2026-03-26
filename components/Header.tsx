import Link from "next/link";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/countries", label: "Funcionalidad" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-black tracking-tight text-white">
          Nations<span className="text-cyan-300">Hub</span>
        </Link>

        <nav className="flex items-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
