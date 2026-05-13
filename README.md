# 🚀 Protipark Create Landing

Sistema modular de cotización y dashboard analytics para Protipark Create.

## 📋 Características

- **Aplicación de Cotización**: Formulario profesional con generación de PDFs
- **Dashboard Analytics**: Panel de control con visualización de datos
- **Almacenamiento Local**: Sincronización entre componentes
- **Diseño Responsive**: Optimizado para desktop y mobile
- **Arquitectura Modular**: Código separado por componentes

## 🗂️ Estructura del Proyecto

```
public/                     # Páginas y archivos estáticos listos para publicar
├── index.html              # Landing / menú de navegación
├── quotation.html          # Página de cotización
└── dashboard.html          # Página de dashboard

src/                        # Código fuente compartido y utilidades
├── shared/
│   ├── styles/
│   │   ├── global.css      # Estilos globales
│   │   └── variables.css   # Variables CSS
│   └── utils/
│       └── storage.js      # Utilidades de almacenamiento
└── assets/                  # Recursos estáticos
    ├── images/
    └── fonts/

archive/                     # Versiones antiguas o copias legacy
dist/                        # Archivos compilados (generado)
docs/                        # Documentación
```

## 🚀 Inicio Rápido

### Desarrollo local

```bash
# Instalar dependencias (si las hay)
npm install

# Iniciar servidor de desarrollo
npm run dev

# Ver en http://localhost:3000
```

### Compilar para producción

```bash
npm run build
```

Esto genera archivos optimizados en `dist/`

## 📦 Publicación

### Opción 1: Netlify Drop (MÁS FÁCIL)
1. Ve a https://app.netlify.com/drop
2. Arrastra la carpeta `dist/` a la página
3. ¡Listo! Netlify genera una URL pública

### Opción 2: Vercel
1. Ve a https://vercel.com/new
2. Sube la carpeta `dist/`
3. URL instantánea

### Opción 3: GitHub Pages
1. Crea un repo en GitHub
2. Sube contenido de `dist/`
3. Activa Pages en Settings
4. URL: https://tu-usuario.github.io/tu-repo

### Opción 4: Cloudflare Pages
1. Ve a https://pages.cloudflare.com
2. "Upload assets" → sube `dist/`
3. URL tipo: https://tu-proyecto.pages.dev

## 🔧 Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsivo y variables
- **Vanilla JavaScript** - Sin dependencias
- **localStorage** - Persistencia de datos
- **XLSX** - Generación de reportes

## 📚 Documentación Adicional

- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - Diseño técnico y patrones
- [DEVELOPMENT.md](docs/DEVELOPMENT.md) - Guía de desarrollo
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) - Instrucciones de despliegue

## 🤝 Contribuir

1. Crea una rama para tu feature
2. Realiza tus cambios
3. Asegúrate de que todo compile
4. Crea un Pull Request

## 📄 Licencia

MIT © 2024 Protipark Team
