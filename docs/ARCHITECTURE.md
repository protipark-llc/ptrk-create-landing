# 🏗️ Arquitectura - Protipark Create Landing

## Visión General

Protipark Create Landing es una aplicación modular y escalable compuesta por dos componentes principales:
1. **Aplicación de Cotización** - Formulario de captura y generación de PDFs
2. **Dashboard Analytics** - Panel de visualización de datos

Ambas comparten una capa común de servicios y estilos.

## Componentes

### 📋 Quotation (`src/components/quotation/`)

**Responsabilidad**: Captura de datos de cotización y generación de documentos

**Archivos**:
- `index.html` - Estructura HTML
- `styles.css` - Estilos específicos del componente
- `script.js` - Lógica de negocio

**Funcionalidades**:
- Captura de información del cliente
- Cálculo de presupuestos
- Generación de archivos Excel
- Exportación de PDFs

**Dependencias Externas**:
- XLSX 0.18.5 (generación de Excel)
- Three.js (efectos 3D opcionales)

### 📊 Dashboard (`src/components/dashboard/`)

**Responsabilidad**: Visualización y análisis de datos

**Archivos**:
- `index.html` - Estructura HTML
- `styles.css` - Estilos específicos del componente
- `script.js` - Lógica de visualización

**Funcionalidades**:
- Visualización de KPIs
- Gráficos analíticos
- Filtros y búsquedas
- Exportación de reportes

## Código Compartido

### 🎨 Estilos Globales (`src/shared/styles/`)

- **variables.css** - Variables CSS reutilizables
  - Colores (navy, blue, cyan, etc.)
  - Espaciado
  - Tipografía
  - Radios y sombras

- **global.css** - Reset y estilos base
  - Normalización
  - Tipografía
  - Selectores universales

### 🛠️ Utilidades (`src/shared/utils/`)

- **storage.js** - Gestión de localStorage
  - Save, Load, Clear
  - Sincronización entre componentes
  - Manejo de cuotas

## Sistema de Diseño

### Paleta de Colores

```css
--navy:      #0d1240 (Azul muy oscuro - Fondos)
--navy2:     #161b55 (Azul oscuro - Variante)
--blue:      #3b47d4 (Azul principal - CTAs)
--blue2:     #4f5ce0 (Azul claro - Acentos)
--cyan:      #00d4ff (Cian - Énfasis)
--green:     #00c896 (Verde - Success)
--off:       #f0f1fa (Off-white - Fondo claro)
--muted:     #8892c8 (Gris azulado - Texto secundario)
```

### Tipografía

- **Outfit** (sans-serif) - UI y textos
- **JetBrains Mono** (monospace) - Números y datos

### Espaciado

Basado en un grid de 4px:
- 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px...

### Radios

- `--radius: 14px` - Grandes (cards)
- `--radius2: 10px` - Medianos (buttons)

## Flujo de Datos

```
localStorage
    ↓
┌─────────────────────────────────┐
│    Quotation Component          │
│   (Captura de datos)            │
└─────────────────────────────────┘
    ↓
localStorage (sync)
    ↓
┌─────────────────────────────────┐
│    Dashboard Component          │
│   (Visualización)               │
└─────────────────────────────────┘
```

## Build Process

El script `build.js` realiza:

1. **Lectura de componentes** - Desde `src/`
2. **Inyección de estilos** - Desde `src/shared/styles/`
3. **Compilación de scripts** - Desde `src/`
4. **Generación de HTML** - En `dist/`
5. **Optimización** - Minificación (opcional)

## Patrones y Convenciones

### Módulos JavaScript

```javascript
// Patrón IIFE para encapsulación
(function() {
  const state = {};
  
  const init = () => { /* ... */ };
  const handle = () => { /* ... */ };
  
  return { init, handle };
})();
```

### Selectores CSS

- `.component-section` - Secciones principales
- `.component-element` - Elementos
- `.component-state` - Estados (.active, .error)

### Variables CSS

```css
:root {
  --color-primary: var(--blue);
  --spacing-sm: 8px;
  --shadow-sm: 0 4px 24px rgba(...);
}
```

## Performance

### Optimizaciones

- Estilos inline en componentes
- Carga asíncrona de librerías externas
- Caché de localStorage
- Lazy loading de imágenes (cuando aplique)

### Métricas Objetivo

- FCP (First Contentful Paint): < 1.5s
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1

## Seguridad

- ✅ CSP (Content Security Policy) compatible
- ✅ No ejecución de código dinámico (eval)
- ✅ Sanitización de datos en localStorage
- ✅ CORS-ready para APIs externas

## Escalabilidad Futura

### Posibles mejoras

1. **Monorepo** - Para múltiples proyectos Protipark
2. **Web Components** - Encapsulación y reusabilidad
3. **Testing** - Vitest + Testing Library
4. **CI/CD** - GitHub Actions para deploy automático
5. **I18n** - Soporte multiidioma
6. **Analytics** - Tracking de eventos
7. **Backend** - API para persistencia

## Referencias

- [MDN Web Docs](https://developer.mozilla.org)
- [XLSX Documentation](https://docs.sheetjs.com)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
