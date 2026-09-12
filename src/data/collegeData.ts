import { CoverPageData, FacultyItem } from '../types';

export interface AffiliatedCollege {
  id: string;
  name: string;
  estd?: string;
  shortName?: string;
  aliases?: string[];
  logo: string;
}

export const SEVEN_COLLEGES: AffiliatedCollege[] = [
  {
    id: 'dhaka-college',
    name: 'Dhaka College',
    estd: '1841',
    shortName: 'DC',
    aliases: ['Dhaka College'],
    logo: '/colleges/dhaka-college.png',
  },
  {
    id: 'eden-mohila',
    name: 'Eden Mohila College',
    estd: '1873',
    shortName: 'EMC',
    aliases: ['Eden Mohila College', 'Eden College'],
    logo: '/colleges/eden-mohila.png',
  },
  {
    id: 'badrunnessa',
    name: 'Begum Badrunnessa Govt. Mahila College',
    estd: '1948',
    shortName: 'BBGMC',
    aliases: [
      'Begum Badrunnessa Govt. Mahila College',
      'Begum Badrunnessa Govt. Girls College',
      'Begum Badrunnesa Government Girls College',
      'Badrunnessa College',
      'Badrunnesa College',
    ],
    logo: '/colleges/badrunnessa.png',
  },
  {
    id: 'kabi-nazrul',
    name: 'Kabi Nazrul Govt. College',
    estd: '1874',
    shortName: 'KNGC',
    aliases: [
      'Kabi Nazrul Govt. College',
      'Kabi Nazrul Government College',
      'Kabi Nazrul College',
    ],
    logo: '/colleges/kabi-nazrul.png',
  },
  {
    id: 'suhrawardy',
    name: 'Govt. Shaheed Suhrawardy College',
    estd: '1949',
    shortName: 'GSSC',
    aliases: [
      'Govt. Shaheed Suhrawardy College',
      'Government Shaheed Suhrawardy College',
      'Shaheed Suhrawardy College',
      'Suhrawardy College',
    ],
    logo: '/colleges/suhrawardy.png',
  },
  {
    id: 'bangla-college',
    name: 'Govt. Bangla College',
    estd: '1962',
    shortName: 'GBC',
    aliases: [
      'Govt. Bangla College',
      'Government Bangla College',
      'Bangla College',
    ],
    logo: '/colleges/bangla-college.png',
  },
  {
    id: 'titumir-college',
    name: 'Govt. Titumir College',
    estd: '1968',
    shortName: 'GTC',
    aliases: [
      'Govt. Titumir College',
      'Government Titumir College',
      'Titumir College',
    ],
    logo: '/colleges/titumir-college.png',
  },
];

export function findCollege(collegeName?: string): AffiliatedCollege | null {
  if (!collegeName) return null;
  const lower = collegeName.trim().toLowerCase();
  return (
    SEVEN_COLLEGES.find(
      (c) =>
        c.name.toLowerCase() === lower ||
        c.aliases?.some((alias) => alias.toLowerCase() === lower)
    ) || null
  );
}

export function getCollegeLogo(collegeName?: string): string {
  const college = findCollege(collegeName);
  return college ? college.logo : '/logo.png';
}

export function getCollegeShortName(collegeName?: string): string {
  const college = findCollege(collegeName);
  if (college?.shortName) return college.shortName;
  if (!collegeName) return 'GTC';
  return collegeName
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 5);
}

export function getCollegeEstd(collegeName?: string): string {
  const college = findCollege(collegeName);
  return college?.estd || '';
}

export const TITUMIR_FACULTIES: FacultyItem[] = [
  {
    id: 'arts-social-science',
    name: 'Faculty of Arts & Social Science',
    departments: [
      'Bangla',
      'English',
      'History',
      'Islamic History & Culture',
      'Islamic Studies',
      'Philosophy',
      'Economics',
      'Political Science',
      'Sociology',
      'Social Work',
    ],
  },
  {
    id: 'science',
    name: 'Faculty of Science',
    departments: [
      'Physics',
      'Chemistry',
      'Mathematics',
      'Statistics',
      'Botany',
      'Zoology',
      'Psychology',
      'Geography & Environment',
    ],
  },
  {
    id: 'business',
    name: 'Faculty of Business',
    departments: [
      'Accounting',
      'Management',
      'Marketing',
      'Finance & Banking',
    ],
  },
  {
    id: 'other',
    name: 'Other Departments / Subjects',
    departments: [
      'ICT',
      'Physical Education',
    ],
  },
];

export function normalizeFaculty(facultyName?: string): string {
  if (!facultyName) return '';
  const trimmed = facultyName.trim();
  if (
    trimmed === 'Faculty of Arts & Humanities' ||
    trimmed === 'Faculty of Social Science' ||
    trimmed === 'Faculty of Arts and Social Science'
  ) {
    return 'Faculty of Arts & Social Science';
  }
  if (trimmed === 'Faculty of Business Studies') {
    return 'Faculty of Business';
  }
  const found = TITUMIR_FACULTIES.find(
    (f) => f.name.toLowerCase() === trimmed.toLowerCase()
  );
  return found ? found.name : '';
}

export function getFacultyByName(facultyName?: string): FacultyItem | null {
  const normalized = normalizeFaculty(facultyName);
  const found = TITUMIR_FACULTIES.find((f) => f.name === normalized);
  return found || null;
}

export function getDepartmentsForFaculty(facultyName?: string): string[] {
  const faculty = getFacultyByName(facultyName);
  return faculty ? faculty.departments : [];
}

export const INITIAL_SAMPLE_DATA: CoverPageData = {
  institution: {
    collegeName: 'Govt. Titumir College',
    faculty: '',
    department: '',
  },
  course: {
    courseCode: '',
    courseTitle: '',
    assignmentNo: '',
    assignmentTitle: '',
  },
  student: {
    name: '',
    studentId: '',
    department: '',
    roll: '',
    year: '',
    semester: '',
    batch: '',
  },
  teacher: {
    name: '',
    designation: '',
    department: '',
  },
  dates: {
    submissionDate: '',
  },
};

export const BLANK_COVER_DATA: CoverPageData = {
  institution: {
    collegeName: 'Govt. Titumir College',
    faculty: '',
    department: '',
  },
  course: {
    courseCode: '',
    courseTitle: '',
    assignmentNo: '',
    assignmentTitle: '',
  },
  student: {
    name: '',
    studentId: '',
    department: '',
    roll: '',
    year: '',
    semester: '',
    batch: '',
  },
  teacher: {
    name: '',
    designation: '',
    department: '',
  },
  dates: {
    submissionDate: '',
  },
};
