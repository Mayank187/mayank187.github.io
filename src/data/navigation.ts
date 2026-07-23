export interface NavItem {
  id: string;
  label: string;
  prefix: string;
}

export const navItems: NavItem[] = [
  { id: 'about', label: 'About', prefix: '01' },
  { id: 'projects', label: 'Case Studies', prefix: '02' },
  { id: 'experience', label: 'Experience', prefix: '03' },
  { id: 'skills', label: 'Capabilities', prefix: '04' },
  { id: 'certifications', label: 'Recognition', prefix: '05' },
  { id: 'contact', label: 'Contact', prefix: '06' },
];
