export interface HeaderSectionContent {
  title: string;
  description: string;
  buttonText: string;
  tips?: string[];
}

export interface HeaderMenuItem {
  label: string;
  action: string;
  hasSubmenu?: boolean;
}

export interface HeaderData {
  menuItems: HeaderMenuItem[];
  sectionContent: {
    Home: HeaderSectionContent;
    About: HeaderSectionContent;
    Projects: HeaderSectionContent;
    Contact: HeaderSectionContent;
    BlackHole: HeaderSectionContent;
  };
  accessibility: {
    openMenu: string;
    closeMenu: string;
    navigateTo: string;
  };
  labels: {
    navigationTips: string;
  };
  footer: {
    session: string;
    status: string;
    escHint: string;
  };
}