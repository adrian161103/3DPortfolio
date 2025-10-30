// Interfaz para los proyectos
export interface Project {
  id: string | number;
  year?: string;
  name: string;
  agency: string;
  type: string;
  image?: string; // URL de la imagen
  url?: string; // URL del proyecto
  description?: string;
  technologies?: string[];
  status?: 'completed' | 'in-progress' | 'planned';
}

// Interfaz para los textos de la UI
export interface ProjectsUIText {
  title: string;
  searchPlaceholder: string;
  filterAll: string;
  projectsFound: string;
  systemOnline: string;
  year: string;
  project: string;
  agency: string;
  type: string;
  status: string;
  previous: string;
  next: string;
  noResults: string;
  visitProject: string;
  close: string;
  readMore: string;
  readLess: string;
  loading: string;
  statusCompleted: string;
  statusInProgress: string;
  statusPlanned: string;
  clearFilters: string;
  viewDetails: string;
  agencyLabel: string;
  typeLabel: string;
  databaseRecords: string;
  systemConnected: string;
}

// Interfaz para los datos completos
export interface ProjectsData {
  uiText: ProjectsUIText;
  projects: Project[];
}
