import { HeaderData } from './headerTypes';

export const headerEn: HeaderData = {
  menuItems: [
    { label: 'Home', action: '/', hasSubmenu: true },
    { label: 'About', action: '/about', hasSubmenu: true },
    { label: 'Projects', action: '/projects', hasSubmenu: true },
    { label: 'Contact', action: '/contact', hasSubmenu: true },
    { label: 'BlackHole', action: '/blackhole', hasSubmenu: true }
  ],
  sectionContent: {
    Home: {
      title: 'Home Page',
      description: 'Welcome to my interactive 3D portfolio. Explore my work and learn about my experience as a full stack developer.',
      buttonText: 'Go Home',
      tips: [
        'Touch the table or screen to get closer',
        'Touch the printer',
        'Interactive keys with the keyboard',
        'Type or touch a section (e.g. windows) to access its content',
        'To exit windows, it\'s similar to a normal operating system'
      ]
    },
    About: {
      title: 'About Me',
      description: 'Full Stack Developer specialized in React, TypeScript, and Node.js. Passionate about creating innovative web experiences.',
      buttonText: 'View Profile'
    },
    Projects: {
      title: 'My Projects',
      description: 'Discover my most outstanding projects, from web applications to interactive 3D experiences.',
      buttonText: 'View Projects'
    },
    Contact: {
      title: 'Contact',
      description: 'Let\'s work together. Contact me to be your next developer.',
      buttonText: 'Get in Touch'
    },
    BlackHole: {
      title: 'Black Hole',
      description: 'If you want to see the black hole animation you can go directly from here. A unique visual experience that demonstrates advanced animation and effects capabilities in your browser.',
      buttonText: 'View Black Hole'
    }
  },
  accessibility: {
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    navigateTo: 'Navigate to'
  },
  labels: {
    navigationTips: '💡 Navigation Tips:'
  },
  footer: {
    session: 'SESSION: portfolio', 
    status: 'STATUS: READY',
    escHint: '[ESC] to close'
  }
};