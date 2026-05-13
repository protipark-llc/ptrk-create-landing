# 💻 Guía de Desarrollo

## Setup Inicial

### Requisitos

- Node.js 18+
- Git
- Un editor de código (VS Code recomendado)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/protipark/create-landing.git
cd protipark-create-landing

# Instalar dependencias (si las hay)
npm install

# Iniciar en modo desarrollo
npm run dev
```

## Estructura de Trabajo

### Crear un nuevo componente

1. Crear carpeta en `src/components/`

```bash
mkdir src/components/my-component
touch src/components/my-component/{index.html,styles.css,script.js}
```

2. Template básico de `index.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Componente - Protipark</title>
  <link rel="stylesheet" href="../../shared/styles/variables.css">
  <link rel="stylesheet" href="../../shared/styles/global.css">
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <div class="component-container">
    <!-- Contenido aquí -->
  </div>
  <script src="../../shared/utils/storage.js"></script>
  <script src="./script.js"></script>
</body>
</html>
```

3. Template básico de `styles.css`:

```css
/* Mi Componente */

.component-container {
  padding: var(--spacing-lg);
  background: var(--color-background);
}

.component-section {
  margin-bottom: var(--spacing-xl);
}

.component-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
}
```

4. Template básico de `script.js`:

```javascript
(function() {
  'use strict';

  // Estado privado
  const state = {
    isLoading: false,
    data: null
  };

  // Métodos privados
  function handleInit() {
    console.log('Componente inicializado');
    loadData();
  }

  function loadData() {
    // Lógica de carga
  }

  // Inicialización
  document.addEventListener('DOMContentLoaded', handleInit);

  // Exports públicos (si es necesario)
  window.MyComponent = {
    refresh: loadData
  };
})();
```

## Convenciones de Código

### CSS

1. **Usar variables CSS** para colores y espaciado

```css
/* ✅ Correcto */
color: var(--blue);
padding: var(--spacing-md);

/* ❌ Evitar */
color: #3b47d4;
padding: 16px;
```

2. **Nombres de clases semánticas**

```css
/* ✅ Correcto */
.card-title
.button-primary
.sidebar-nav

/* ❌ Evitar */
.blue-text
.big-padding
.left-column
```

3. **Agrupar por secciones**

```css
/* ─ HEADER ─ */
.header { }
.header-title { }

/* ─ MAIN ─ */
.main { }
.main-content { }

/* ─ FOOTER ─ */
.footer { }
```

### JavaScript

1. **Usar módulos IIFE** para encapsulación

```javascript
(function() {
  'use strict';
  // Código privado
})();
```

2. **Nombres descriptivos**

```javascript
// ✅ Correcto
const handleButtonClick = () => {};
const formatDate = (date) => {};
const userData = {};

// ❌ Evitar
const click = () => {};
const fmt = () => {};
const data = {};
```

3. **Comentarios solo cuando sea necesario**

```javascript
// ✅ Buen comentario (WHY)
// localStorage.clear() aquí porque cambiamos el schema de datos
const resetUserData = () => { };

// ❌ Mal comentario (WHAT)
// Limpiar localStorage
const resetUserData = () => { };
```

## Testing

### Manual Testing

1. Abre varios navegadores (Chrome, Firefox, Safari)
2. Prueba en dispositivos reales o DevTools (mobile mode)
3. Verifica localStorage en DevTools > Application > Storage

### Checklist de QA

- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Accesibilidad (teclado, screen readers)
- [ ] Performance (< 2s LCP)
- [ ] Cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] localStorage sin errores

## Debugging

### En DevTools

```javascript
// Ver estado en consola
console.log('Mi variable:', variable);

// Inspeccionar localStorage
JSON.parse(localStorage.getItem('key'));

// Profiler
performance.mark('inicio');
// código
performance.mark('fin');
performance.measure('mi-medida', 'inicio', 'fin');
console.log(performance.getEntriesByName('mi-medida')[0]);
```

## Build y Deploy

### Build local

```bash
npm run build
```

Esto genera archivos en `dist/`

### Ver localmente

```bash
npm run preview
```

Abre http://localhost:3000

### Deploy a Netlify

```bash
npm run build
# Arrastra la carpeta 'dist/' a https://app.netlify.com/drop
```

### Deploy a Vercel

```bash
npm run build
# Sube 'dist/' a https://vercel.com/new
```

## Troubleshooting

### localStorage lleno

```javascript
// Limpiar todo
localStorage.clear();

// Limpiar una clave
localStorage.removeItem('key');

// Ver tamaño actual
JSON.stringify(localStorage).length; // en bytes
```

### Estilos no aplican

1. Verificar ruta de import
2. Verificar especificidad CSS
3. Usar DevTools para inspeccionar

### Script no ejecuta

1. Ver console (F12)
2. Verificar que DOM esté listo
3. Usar `document.addEventListener('DOMContentLoaded', ...)`

## Recursos

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [XLSX Docs](https://docs.sheetjs.com)
- [Web.dev Performance](https://web.dev/performance/)

## Preguntas?

Crea una issue en el repositorio o contacta al equipo de desarrollo.
