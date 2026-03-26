# NationsHub

Mini aplicación desarrollada con **Next.js + React + TailwindCSS** para consultar países usando la API de **Rest Countries**.

## Funcionalidades

- Página de inicio con descripción del proyecto
- Página de funcionalidad con consumo de API
- Header y Footer reutilizables
- Uso de `useState`
- Uso de `useEffect`
- Consumo de API con `fetch`
- Renderizado dinámico de datos
- Búsqueda de países por nombre
- Manejo de `loading`
- Manejo de error básico

## Endpoint usado

```bash
https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,region,latlng
```

## Cómo ejecutar

```bash
npm install
npm run dev
```

Luego abre `http://localhost:3000`.

## Estructura principal

```bash
app/
  countries/page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  CountryCard.tsx
  Footer.tsx
  Header.tsx
  SearchBar.tsx
```

## Qué se eliminó del proyecto base

- Boilerplate visual de Create Next App
- SVGs por defecto que no se usan
- Metadatos genéricos del proyecto
- Estructura duplicada del zip original
