export interface HeroStat {
  label: string;
  value?: string;
}

export interface AboutHeroData {
  kickerLeft: string; // e.g., ABOUT / FULL STACK WEB DEVELOPER
  kickerRight?: string; // e.g., EST. 2020
  titleTop: string; // e.g., FULL STACK
  titleBottom: string; // e.g., DEVELOPER
  subtitle: string; // short tagline
  ctaLabel: string; // button text
  stats?: HeroStat[]; // optional hero stats
}

export interface BioColumn {
  title: string;
  items: string[];
}

export interface BioSidebarStat {
  value: string; // display value (can be numeric or text)
  label: string;
}

export interface BioSidebar {
  stats?: BioSidebarStat[];
  photo?: { src?: string; initials: string; alt: string };
  availability?: string;
  status?: string;
}

export interface AboutBioData {
  kicker: string; // e.g., About Me / Personal
  heading: string[]; // 2-3 lines
  paragraphs: string[]; // main copy
  columns?: BioColumn[]; // optional bullet columns
  sidebar?: BioSidebar;
  quote?: { text: string; author: string };
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  category: string;
  icon?: string;
}

export interface SkillCategoryData {
  title: string;
  description: string;
  skills: SkillItem[];
  color: string; // tailwind gradient classes
  accent: string; // color key
}

export interface AboutSkillsData {
  headerKicker: string; // e.g., Skills & Expertise
  headerTitleTop: string; // Technical
  headerTitleBottom: string; // Excellence
  headerSubtitle: string;
  categories: SkillCategoryData[];
}

export interface TimelineItemData {
  id: string;
  year: string;
  title: string;
  description: string;
  skills?: string[];
  side: 'left' | 'right';
}

export interface AboutTimelineData {
  headerTitle: string;
  headerSubtitle: string;
  items: TimelineItemData[];
}

export interface AboutCTAData {
  kicker: string;
  titleLines: string[]; // 2-3 lines
  paragraphs: string[];
  buttons: { primary: string; secondary: string };
  stats?: BioSidebarStat[];
  quote?: string;
}

export interface AboutPageData {
  hero: AboutHeroData;
  bio: AboutBioData;
  skills: AboutSkillsData;
  timeline: AboutTimelineData;
  cta: AboutCTAData;
}
