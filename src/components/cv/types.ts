export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  profilePicture?: string;
}

export interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  date?: string;
}

export interface CVSections {
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  customSections: CustomSection[];
}

export interface CVLayout {
  columns: 1 | 2;
  sectionOrder: string[];
  leftColumnSections: string[];
  rightColumnSections: string[];
}

export interface CVData {
  personalInfo: PersonalInfo;
  sections: CVSections;
  layout: CVLayout;
}