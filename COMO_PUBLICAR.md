# 🚀 Cómo publicar Protipark Create en 2 minutos (gratis)

## Opción 1 — Netlify Drop (MÁS FÁCIL, 30 segundos)
1. Ve a → https://app.netlify.com/drop
2. Arrastra el archivo `protipark-cotizacion-v4.html` a la página
3. Netlify genera automáticamente una URL pública tipo:
   → https://amazing-name-12345.netlify.app
4. Comparte esa URL con cualquier persona en el mundo

## Opción 2 — GitHub Pages (URL personalizable)
1. Crea un repo en github.com (puede ser privado con Pages activado)
2. Sube `protipark-cotizacion-v4.html`
3. Renómbralo a `index.html` en el repo
4. Ve a Settings → Pages → Source: main branch
5. URL pública: https://TU_USUARIO.github.io/TU_REPO

## Opción 3 — Vercel (también 30 segundos)
1. Ve a → https://vercel.com/new
2. Arrastra la carpeta con el archivo
3. URL instantánea tipo: https://protipark-xyz.vercel.app

## Opción 4 — Cloudflare Pages
1. Ve a → https://pages.cloudflare.com
2. "Upload assets" → sube el archivo
3. URL tipo: https://protipark.pages.dev

---
Recomendación: **Netlify Drop** para pruebas rápidas,
**Vercel o Cloudflare Pages** para producción.

Para el dashboard, sube también `protipark-dashboard.html`
y ambos compartirán la base de datos (window.storage es por dominio).
