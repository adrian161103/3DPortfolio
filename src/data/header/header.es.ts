import { HeaderData } from './headerTypes';

export const headerEs: HeaderData = {
  menuItems: [
    { label: 'Home', action: '/', hasSubmenu: true },
    { label: 'About', action: '/about', hasSubmenu: true },
    { label: 'Projects', action: '/projects', hasSubmenu: true },
    { label: 'Contact', action: '/contact', hasSubmenu: true },
    { label: 'BlackHole', action: '/blackhole', hasSubmenu: true }
  ],
  sectionContent: {
    Home: {
      title: 'Página Principal',
      description: 'Bienvenido a mi portafolio interactivo en 3D. Explora mi trabajo y conoce mi experiencia como desarrollador full stack.',
      buttonText: 'Ir al Inicio',
      tips: [
        'Toca la mesa o la pantalla para acercarte',
        'Toca la impresora',
        'Teclas interactivas con el teclado',
        'Escribe o toca una sección (ej windows) para acceder a su contenido',
        'Windows para salir es similar a un sistema operativo normal'
      ]
    },
    About: {
      title: 'Acerca de Mí',
      description: 'Desarrollador Full Stack especializado en React, TypeScript y Node.js. Apasionado por crear experiencias web innovadoras.',
      buttonText: 'Ver Perfil'
    },
    Projects: {
      title: 'Mis Proyectos',
      description: 'Descubre mis proyectos más destacados, desde aplicaciones web hasta experiencias interactivas en 3D.',
      buttonText: 'Ver Proyectos'
    },
    Contact: {
      title: 'Contacto',
      description: 'Trabajemos juntos. Contáctame para ser tu próximo developer.',
      buttonText: 'Contactar'
    },
    BlackHole: {
      title: 'Agujero Negro',
      description: 'Si querés ver la animación de agujero negro podés ir directamente desde acá. Una experiencia visual única que demuestra las capacidades de animación y efectos avanzados en tu navegador.',
      buttonText: 'Ver Agujero Negro'
    }
  },
  accessibility: {
    openMenu: 'Abrir menú de navegación',
    closeMenu: 'Cerrar menú de navegación',
    navigateTo: 'Navegar a'
  },
  labels: {
    navigationTips: '💡 Tips de Navegación:'
  },
  footer: {
    session: 'SESIÓN: portfolio',
    status: 'ESTADO: LISTO',
    escHint: '[ESC] para cerrar'
  }
};