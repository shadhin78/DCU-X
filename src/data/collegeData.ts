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
    collegeName: '',
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
    collegeName: '',
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
