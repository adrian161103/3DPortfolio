export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  demo?: string;
  imageAlt?: string;
}

export interface ProjectsData {
  title: string;
  filterLabel: string;
  filterAll: string;
  filterAriaLabel: string;
  previewAlt: string;
  viewDemo: string;
  statusReady: string;
  projects: Project[];
}
