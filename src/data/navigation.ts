export interface NavItem {
  id: string;
  label: string;
  prefix: string;
}

export const navItems: NavItem[] = [
  { id: 'about', label: 'About', prefix: '01' },
  { id: 'experience', label: 'Experience', prefix: '02' },
  { id: 'skills', label: 'Stack', prefix: '03' },
  { id: 'projects', label: 'Projects', prefix: '04' },
  { id: 'publications', label: 'Research', prefix: '05' },
  { id: 'certifications', label: 'Recognitions', prefix: '06' },
  { id: 'contact', label: 'Contact', prefix: '07' },
];
