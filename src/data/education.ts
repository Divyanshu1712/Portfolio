export interface EducationItem {
  degree: string;
  major: string;
  institution: string;
  period: string;
  location: string;
  achievements: string[];
}

export const education: EducationItem[] = [
  {
    degree: 'Bachelor of Technology',
    major: 'Computer Science and Engineering (Internet Of Things)',
    institution: 'Greater Noida Institute of Technology',
    period: '2020 - 2024',
    location: 'Greater Noida',
    achievements: [
      'Specialized in Internet of Things (IoT)',
      'Completed coursework in advanced programming, data structures, and algorithms',
      'Participated in various technical workshops and hackathons',
      'Received Best Project Award from the Central Project & Research Committee for the Blockchain Lottery System project',
    ],
  },
];
