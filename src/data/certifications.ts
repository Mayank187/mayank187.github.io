export interface Certification {
  title: string;
  issuer: string;
  icon: string;
}

export interface Award {
  title: string;
  org: string;
  year: string;
}

export const certifications: Certification[] = [
  { title: 'Google Data Analytics', issuer: 'Coursera / Google', icon: 'GraduationCap' },
  { title: 'Deep Learning Specialization', issuer: 'Coursera / Andrew Ng', icon: 'BrainCircuit' },
  { title: 'Machine Learning', issuer: 'Coursera / Andrew Ng', icon: 'Brain' },
  { title: 'TensorFlow Developer', issuer: 'DeepLearning.AI', icon: 'Cpu' },
  {title: 'MTA: Programming using Python', issuer: 'Microsoft', icon: 'Python'},
];

export const awards: Award[] = [
  { title: 'Value Creator', org: 'Samsung Research India', year: '2025' },
  { title: 'Team Awesome', org: 'Samsung Research India', year: '2025' },
  { title: 'Outstanding Contributor', org: 'Camcom', year: '2023' },
  { title: 'On-the-Spot Best Performer', org: 'Tata Consultancy Services', year: '2023' },
];
