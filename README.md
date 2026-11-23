# AleCade — Dulce Herencia

Sitio web de panadería y repostería artesanal con tradición familiar en Cochabamba, Bolivia.

## Requisitos

- Node.js 18 o posterior
- npm

## Instalación

Desde la carpeta del proyecto, instala las dependencias:

```sh
npm install
```

## Abrir el sitio en local

Inicia el servidor de desarrollo:

```sh
npm run dev
```

Abre en el navegador la dirección local que indique Vite (normalmente `http://localhost:5173`). Para abrirla automáticamente, ejecuta `npm run dev -- --open`.

## Generar y previsualizar el build

Genera la versión de producción en `dist/`:

```sh
npm run build
```

El build también copia las imágenes de `img/` a `dist/img/`, donde las espera el sitio.

Para previsualizarlo localmente:

```sh
npm run preview
```
