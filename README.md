## NationsHub

Una mini aplicación web desarrollada con **Next.js** y **TailwindCSS** que permite explorar información de todos los países del mundo: banderas, capitales y monedas.

## Descripción

NationsHub es una aplicación web que consume la API pública de países [RestCountries](https://restcountries.com/) para mostrar información detallada de cada nación del mundo de forma visual e interactiva.

## ¿Qué problema resuelve?

Centraliza la información geográfica y económica de los países del mundo en un solo lugar, permitiendo buscar y filtrar países de forma rápida y sencilla, sin necesidad de buscar en múltiples fuentes.

##  Integrantes del grupo

| Nombre               |
|----------------------|
| David Vélez          |
| Luiz Miguel Giraldo  |
| Santiago González    |

## Tecnologías utilizadas

- [Next.js](https://nextjs.org/) — Framework de React
- [TailwindCSS](https://tailwindcss.com/) — Estilos y diseño
- [RestCountries API](https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,latlng) — Fuente de datos

## 🧩 Componentes

- `Header` — Barra de navegación visible en todas las páginas
- `Footer` — Pie de página visible en todas las páginas

## 🌐 API utilizada

**RestCountries v3.1**
```
https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,latlng
```

Campos usados:
- `name.common` — Nombre del país
- `flags.svg` — Bandera
- `capital` — Capital
- `currencies` — Moneda
- `latlng` — Ubicación geográfica


