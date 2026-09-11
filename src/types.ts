export interface InstitutionInfo {
  collegeName: string;
  faculty: string;
  department: string;
}

export interface CourseInfo {
  courseCode: string;
  courseTitle: string;
  assignmentNo: string;
  assignmentTitle: string;
}

export interface StudentInfo {
  name: string;
  studentId?: string;
  department: string;
  roll: string;
  year?: string;
  batch?: string;
  semester?: string;
}

export interface TeacherInfo {
  name: string;
  designation: string;
  department: string;
}

export interface DatesInfo {
  submissionDate: string;
}

export interface CoverPageData {
  institution: InstitutionInfo;
  course: CourseInfo;
  student: StudentInfo;
  teacher: TeacherInfo;
  dates: DatesInfo;
}

export interface FacultyItem {
  id: string;
  name: string;
  departments: string[];
}
