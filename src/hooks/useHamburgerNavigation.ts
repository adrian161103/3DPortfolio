import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export interface MenuItem {
  label: string;
  action: () => void;
  icon?: string;
  disabled?: boolean;
}

export const useHamburgerNavigation = () => {
  const navigate = useNavigate();

  const navigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const navigateToAbout = useCallback(() => {
    navigate('/about');
  }, [navigate]);

  const navigateToProjects = useCallback(() => {
    navigate('/projects');
  }, [navigate]);

  const navigateToContact = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  const navigateToBlackHole = useCallback(() => {
    navigate('/blackhole');
  }, [navigate]);

  const openConsole = useCallback(() => {
    window.dispatchEvent(new CustomEvent("setConsoleMode", { detail: true }));
  }, []);

  const menuItems: MenuItem[] = [
    { 
      label: 'Home', 
      action: navigateToHome,
      icon: '🏠'
    },
    { 
      label: 'About', 
      action: navigateToAbout,
      icon: '👤'
    },
    { 
      label: 'Projects', 
      action: navigateToProjects,
      icon: '💼'
    },
    { 
      label: 'Contact', 
      action: navigateToContact,
      icon: '📧'
    },
    { 
      label: 'BlackHole', 
      action: navigateToBlackHole,
      icon: '⚫'
    }
  ];

  return {
    menuItems,
    navigateToHome,
    navigateToAbout,
    navigateToProjects,
    navigateToContact,
    navigateToBlackHole,
    openConsole
  };
};