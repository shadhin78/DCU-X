import { CoverPageData, FacultyItem } from '../types';

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
  if (!facultyName) return TITUMIR_FACULTIES[1].name; // Default: Faculty of Science
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
  return found ? found.name : TITUMIR_FACULTIES[1].name;
}

export function getFacultyByName(facultyName?: string): FacultyItem {
  const normalized = normalizeFaculty(facultyName);
  const found = TITUMIR_FACULTIES.find((f) => f.name === normalized);
  return found || TITUMIR_FACULTIES[1];
}

export function getDepartmentsForFaculty(facultyName?: string): string[] {
  return getFacultyByName(facultyName).departments;
}

export const INITIAL_SAMPLE_DATA: CoverPageData = {
  institution: {
    collegeName: 'Government Titumir College',
    faculty: 'Faculty of Science',
    department: 'Physics',
  },
  course: {
    courseCode: 'PHY-201',
    courseTitle: 'Classical Mechanics & Thermal Physics',
    assignmentNo: '01',
    assignmentTitle: 'Mathematical Analysis of Damped and Forced Harmonic Oscillations',
  },
  student: {
    name: 'Md. Tanvir Hossain',
    studentId: '2022-PHY-045',
    department: 'Physics',
    roll: '723849',
    year: '2nd Year',
    semester: '2nd Year',
    batch: '',
  },
  teacher: {
    name: 'Prof. Dr. Mohammad Rafiqul Islam',
    designation: 'Associate Professor',
    department: 'Physics',
  },
  dates: {
    submissionDate: new Date().toISOString().split('T')[0],
  },
};

export const BLANK_COVER_DATA: CoverPageData = {
  institution: {
    collegeName: 'Government Titumir College',
    faculty: 'Faculty of Science',
    department: 'Physics',
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
    department: 'Physics',
    roll: '',
    year: '1st Year',
    semester: '1st Year',
    batch: '',
  },
  teacher: {
    name: '',
    designation: '',
    department: 'Physics',
  },
  dates: {
    submissionDate: '',
  },
};
