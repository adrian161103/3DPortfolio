# 🌟 3D Portfolio - Experiencia Retro Windows 98

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.180.0-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.13-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Un portfolio innovador que combina una experiencia 3D inmersiva con una interfaz nostálgica de Windows 98. Este proyecto ofrece una navegación única a través de diferentes modalidades: una escena 3D interactiva, una consola de comandos y un entorno de escritorio retro completamente funcional.

## 🎮 Características Principales

### 🌍 Escena 3D Interactiva
- **Entorno de escritorio 3D** con modelo GLB personalizado
- **Iluminación dinámica** con efectos de parpadeo realistas
- **Audio ambiental** (sonido de lluvia) para mayor inmersión
- **Controles de cámara** fluidos con OrbitControls
- **Efectos post-procesado** con Bloom y Vignette
- **Animaciones GSAP** suaves y profesionales

### 💻 Consola Interactiva
- **Interfaz de terminal** retro completamente funcional
- **Comandos navegables**: `windows`, `about`, `projects`, `contact`
- **Autocompletado** de comandos con sugerencias
- **Historial de comandos** navegable con flechas
- **Efectos de escritura** realistas tipo máquina de escribir
- **Soporte táctil** optimizado para dispositivos móviles

### 🖥️ Entorno Windows 98
- **Escritorio retro** pixel-perfect con iconos auténticos
- **Ventanas arrastables** con funcionalidad completa
- **Barra de tareas** funcional con menú inicio
- **Internet Explorer retro** para navegación interna
- **Efectos visuales** auténticos de Windows 98
- **Gestión de ventanas** con minimizar, maximizar y cerrar

### 🌐 Navegador Retro (Internet Explorer)
- **Interfaz authentic** de Internet Explorer 98
- **Barra de herramientas** completamente funcional
- **Navegación interna** entre secciones del portfolio
- **Barra de progreso** animada
- **Responsive design** adaptado a dispositivos móviles

## 🛠️ Tecnologías Utilizadas

### Frontend Core
- **React 19.1.1** - Biblioteca principal de UI
- **TypeScript 5.8.3** - Tipado estático
- **Vite 7.1.2** - Build tool y dev server
- **React Router DOM 7.9.1** - Enrutamiento SPA

### 3D y Animaciones
- **Three.js 0.180.0** - Motor gráfico 3D
- **@react-three/fiber 9.3.0** - React renderer para Three.js
- **@react-three/drei 10.7.6** - Helpers y componentes 3D
- **@react-three/postprocessing 3.0.4** - Efectos post-procesado
- **GSAP 3.13.0** - Animaciones profesionales

### Estilos y UI
- **Tailwind CSS 4.1.13** - Framework CSS utility-first
- **CSS personalizado** - Estilos auténticos Windows 98
- **Responsive design** - Adaptado a todos los dispositivos

### Estado y Utilidades
- **Zustand 5.0.8** - Gestión de estado ligera
- **react-draggable 4.5.0** - Funcionalidad drag & drop

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/adrian161103/3DPortfolio.git

# Navegar al directorio
cd 3DPortfolio

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── 3d/              # Componentes Three.js
│   │   ├── MainScene.tsx        # Escena principal 3D
│   │   ├── CameraController.tsx # Control de cámara
│   │   └── ...
│   ├── ui/              # Componentes de interfaz
│   │   ├── Console.tsx          # Consola interactiva
│   │   ├── BlackHole.tsx        # Efectos especiales
│   │   └── ...
│   ├── windows/         # Sistema Windows 98
│   │   ├── RetroWindow.tsx      # Ventana base
│   │   ├── RetroBrowser.tsx     # Internet Explorer
│   │   └── pages/              # Páginas del navegador
│   └── sections/        # Secciones principales
├── data/                # Datos de contenido (i18n)
├── context/             # Contextos React
├── hooks/               # Custom hooks
├── lib/                 # Utilidades y configuraciones
├── pages/               # Páginas de la aplicación
├── routes/              # Configuración de rutas
├── styles/              # Estilos CSS personalizados
└── types/               # Definiciones TypeScript
```

## 🎨 Características Técnicas

### Arquitectura 3D
- **Scene Graph** optimizado con Three.js
- **Material System** con materiales PBR
- **Lighting System** dinámico con múltiples fuentes de luz
- **Asset Loading** eficiente con useGLTF
- **Performance** optimizado para web

### Sistema de Ventanas
- **Window Management** completo con z-index dinámico
- **Drag & Drop** con restricciones de área
- **State Management** centralizado con Zustand
- **Event Handling** robusto para interacciones

### Internacionalización
- **Soporte multiidioma** (Español/Inglés)
- **Context API** para gestión de idioma
- **LocalStorage** para persistencia de preferencias
- **Contenido dinámico** en tiempo real

### Responsive Design
- **Mobile First** approach
- **Touch Gestures** optimizados
- **Adaptive Layout** para diferentes pantallas
- **Performance** optimizado para dispositivos móviles

## 🎯 Navegación y Funcionalidades

### Modalidades de Navegación
1. **Modo 3D**: Explora el escritorio 3D interactivo
2. **Modo Consola**: Navega usando comandos de terminal
3. **Modo Windows**: Usa el entorno de escritorio completo

### Comandos de Consola
- `windows` - Acceder al entorno Windows 98
- `about` - Información personal y profesional  
- `projects` - Portafolio de proyectos
- `contact` - Información de contacto
- `help` - Lista de comandos disponibles
- `clear` - Limpiar consola

### Funcionalidades Windows 98
- **Mi PC**: Explorador de archivos retro
- **Papelera**: Gestión de archivos eliminados
- **Internet Explorer**: Navegador interno del portfolio
- **Mis Documentos**: Archivos y documentación
- **Menú Inicio**: Acceso a aplicaciones y opciones

## 🔧 Personalización

### Configuración de la Escena 3D
```typescript
// src/config/camera.config.ts
export const cameraConfig = {
  position: [0, 2, 5],
  fov: 75,
  near: 0.1,
  far: 1000
};
```

### Personalización de Estilos
```typescript
// tailwind.config.ts - Tema Windows 98
theme: {
  extend: {
    colors: {
      win98: {
        blue: '#000080',
        silver: '#c0c0c0',
        desktop: '#008080'
      }
    }
  }
}
```

## 🚀 Despliegue

El proyecto está configurado para desplegarse fácilmente en:

- **Vercel** (recomendado)
- **Netlify** 
- **GitHub Pages**
- **Cualquier hosting estático**

### Configuración de Vercel
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📧 Contacto

**Adrián** - [Tu información de contacto]

Enlace del Proyecto: [https://github.com/adrian161103/3DPortfolio](https://github.com/adrian161103/3DPortfolio)

---

⭐ ¡No olvides dar una estrella al proyecto si te gustó!
