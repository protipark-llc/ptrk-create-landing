# 🚀 Guía de Despliegue

## Preparación

### 1. Compilar para producción

```bash
npm run build
```

Esto optimiza y compila todo en la carpeta `dist/`

### 2. Verificar archivos

```bash
ls -la dist/
```

Deberías ver:
- `quotation/index.html`
- `dashboard/index.html`
- `404.html` (opcional)

## Opciones de Despliegue

### 🟢 Opción 1: Netlify Drop (MÁS FÁCIL - 30 segundos)

**Mejor para**: Pruebas rápidas, prototipos

1. Ve a https://app.netlify.com/drop
2. Arrastra la carpeta `dist/` completa
3. Netlify genera una URL: `https://amazing-name-12345.netlify.app`
4. ¡Listo! Tu sitio está vivo

**Ventajas**:
- ✅ Súper rápido
- ✅ No necesita cuenta
- ✅ HTTPS automático
- ✅ Actualizaciones instantáneas

**Limitaciones**:
- ❌ URL aleatoria
- ❌ Sin control de dominio

---

### 🟢 Opción 2: Vercel (RECOMENDADO - 30 segundos)

**Mejor para**: Producción, dominio personalizado

1. Ve a https://vercel.com/new
2. Arrastra la carpeta `dist/`
3. Vercel genera una URL: `https://protipark-xyz.vercel.app`
4. Conecta tu dominio en Settings

**Ventajas**:
- ✅ Performance excelente
- ✅ Dominio personalizado
- ✅ HTTPS automático
- ✅ Analytics gratis
- ✅ Deployes automáticos con GitHub

**Pasos con GitHub**:

```bash
# 1. Sube a GitHub
git push origin main

# 2. Ve a https://vercel.com/new
# 3. Conecta tu repo

# 4. Vercel deployará automáticamente cada push
```

---

### 🟡 Opción 3: GitHub Pages (URL personalizable)

**Mejor para**: Proyectos de código abierto, documentación

1. Crea un repo en GitHub (o usa uno existente)

```bash
git remote add origin https://github.com/tu-usuario/protipark-create.git
git branch -M main
git push -u origin main
```

2. Ve a Settings → Pages
3. Source: Deploy from a branch
4. Branch: main, Folder: / (o crea una carpeta `docs` con tu contenido)
5. Tu sitio estará en: `https://tu-usuario.github.io/protipark-create`

**Opcionalmente, conéctalo a un dominio propio**:

1. Compra un dominio (Namecheap, GoDaddy, etc.)
2. En los DNS, crea un CNAME apuntando a `tu-usuario.github.io`
3. En GitHub Pages settings, añade el dominio personalizado

---

### 🟡 Opción 4: Cloudflare Pages

**Mejor para**: Despliegue global ultrarrápido

1. Ve a https://pages.cloudflare.com
2. Crea un proyecto o sube archivos
3. "Upload assets" → sube tu carpeta `dist/`
4. Tu sitio: `https://tu-proyecto.pages.dev`

**Ventajas**:
- ✅ CDN global de Cloudflare
- ✅ Muy rápido
- ✅ Gratis
- ✅ Dominio personalizado

**Con GitHub**:

```bash
# Conecta tu repo
# Cloudflare deployará automáticamente
```

---

### 🔴 Opción 5: Servidor Propio (Advanced)

**Mejor para**: Control total, backend personalizado

```bash
# Copiar archivos a tu servidor
scp -r dist/* usuario@tu-servidor.com:/var/www/protipark/

# O con SFTP
sftp usuario@tu-servidor.com
put -r dist/* /var/www/protipark/
```

**Con Nginx**:

```nginx
server {
    listen 80;
    server_name protipark.com;
    root /var/www/protipark;
    
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

**Con Apache**:

```apache
<Directory /var/www/protipark>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```

---

## Configuración de Dominios Personalizados

### Con Vercel

1. En Vercel Dashboard → Settings → Domains
2. Añade tu dominio
3. Vercel te da los registros DNS
4. En tu registrador (Namecheap, GoDaddy, etc.):
   - Ve a DNS settings
   - Copia los registros de Vercel
   - Espera a que se propague (1-48h)

### Con GitHub Pages

1. GitHub → Settings → Pages
2. En "Custom domain" añade tu dominio
3. En tu registrador:
   - Crea un CNAME a `tu-usuario.github.io`
   - O usa una dirección A si lo prefieres

### Con Cloudflare Pages

1. Cloudflare → Pages → Proyecto → Settings → Domains
2. Añade tu dominio
3. Sigue las instrucciones de Cloudflare

---

## Checklist Pre-Deploy

Antes de publicar:

- [ ] `npm run build` completa sin errores
- [ ] Contenido en `dist/` está correcto
- [ ] Links internos funcionan
- [ ] Formularios submitean correctamente
- [ ] localStorage funciona
- [ ] Archivos cargan (XLSX, Three.js, etc.)
- [ ] Responsive se ve bien en mobile
- [ ] Performance > 90 en Lighthouse

### Ejecutar Lighthouse

```bash
# Chrome DevTools
1. Abre el sitio en Chrome
2. F12 → Lighthouse
3. Genera report
```

---

## Post-Deploy

### Monitoreo

**Vercel**:
- Analytics automático
- Dashboard de error reporting

**Cloudflare**:
- Real User Monitoring (RUM)
- Analytics

**GitHub Pages**:
- Usa Google Analytics u otro

### CDN y Caché

Todos los servicios (Vercel, Cloudflare, Netlify) manejan esto automáticamente.

Para control manual con headers:

```
Cache-Control: public, max-age=31536000  (1 año)
Cache-Control: public, max-age=3600      (1 hora)
```

---

## Rollback (Revertir Deploy)

### Con Vercel

1. Dashboard → Deployments
2. Busca el deployment anterior
3. Click en "..." → Promote to Production

### Con Netlify

1. Dashboard → Deploys
2. Selecciona una versión anterior
3. Click "Publish deploy"

### Con GitHub Pages

```bash
git revert <commit-hash>
git push origin main
# GitHub Pages se actualiza automáticamente
```

---

## Troubleshooting

### Sitio en blanco después del deploy

```
Verificar:
1. ¿Los archivos están en dist/?
2. ¿index.html está en la raíz?
3. ¿Las rutas de assets son relativas?
4. ¿Hay errores en console (F12)?
```

### localStorage no funciona

```javascript
// localStorage no funciona en file:// protocol
// Debes servir vía HTTP/HTTPS
// Usa: npm run preview
```

### 404 en rutas

Asegúrate que tu servidor redirige a `index.html`:

**Vercel**: Automático ✅
**Netlify**: Automático ✅
**GitHub Pages**: Debes crear `404.html` con contenido de `index.html`
**Cloudflare**: Configura redirección en _redirects

---

## Costos

| Servicio | Precio | Límite |
|----------|--------|--------|
| Netlify | Gratis | 100GB/mes |
| Vercel | Gratis | 100GB/mes |
| GitHub Pages | Gratis | Ilimitado |
| Cloudflare Pages | Gratis | 500 deploys/mes |
| Servidor propio | Variable | - |

---

## Recomendación Final

### Para empezar:
**Netlify Drop** - Prueba en 30 segundos

### Para producción:
**Vercel** - Mejor rendimiento y dominio personalizado

### Para dominio propio barato:
**GitHub Pages** + dominio en Namecheap

### Para máximo rendimiento global:
**Cloudflare Pages** - CDN de Cloudflare

---

¿Preguntas? Crea una issue en el repositorio.
