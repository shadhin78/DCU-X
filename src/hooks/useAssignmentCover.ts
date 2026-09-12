import { useState, useEffect, useCallback, useRef } from 'react';
import {
  CoverPageData,
  InstitutionInfo,
  CourseInfo,
  StudentInfo,
  TeacherInfo,
  DatesInfo,
} from '../types';
import { INITIAL_SAMPLE_DATA, BLANK_COVER_DATA, normalizeFaculty } from '../data/collegeData';

const STORAGE_KEY = 'titumir_assignment_cover_data_v2';
const LEGACY_STORAGE_KEY = 'titumir_assignment_cover_data_v1';

function parseSavedData(jsonStr: string): CoverPageData | null {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== 'object') return null;

    // Check if it's already v2 schema
    if (parsed.course || parsed.dates) {
      return {
        institution: {
          collegeName: parsed.institution?.collegeName || 'Government Titumir College',
          faculty: normalizeFaculty(parsed.institution?.faculty),
          department: parsed.institution?.department ?? '',
        },
        course: {
          courseCode: parsed.course?.courseCode ?? '',
          courseTitle: parsed.course?.courseTitle ?? '',
          assignmentNo: parsed.course?.assignmentNo ?? '',
          assignmentTitle: parsed.course?.assignmentTitle ?? '',
        },
        student: {
          name: parsed.student?.name ?? '',
          studentId: parsed.student?.studentId ?? '',
          department: parsed.student?.department || parsed.institution?.department || '',
          roll: parsed.student?.roll || parsed.student?.studentId || '',
          year: parsed.student?.year || parsed.student?.semester || '',
          semester: parsed.student?.year || parsed.student?.semester || '',
          batch: '',
        },
        teacher: {
          name: parsed.teacher?.name ?? '',
          designation: parsed.teacher?.designation ?? '',
          department: parsed.teacher?.department || parsed.institution?.department || '',
        },
        dates: {
          submissionDate: parsed.dates?.submissionDate ?? '',
        },
      };
    }

    // Migrate from v1 schema if present
    if (parsed.assignment) {
      return {
        institution: {
          collegeName: parsed.institution?.collegeName || 'Government Titumir College',
          faculty: normalizeFaculty(parsed.institution?.faculty),
          department: parsed.institution?.department || '',
        },
        course: {
          courseCode: parsed.assignment?.courseCode ?? '',
          courseTitle: parsed.assignment?.courseTitle ?? '',
          assignmentNo: '01',
          assignmentTitle: parsed.assignment?.title || parsed.assignment?.topic || '',
        },
        student: {
          name: parsed.student?.name ?? '',
          studentId: parsed.student?.classRoll || parsed.student?.examRoll || '',
          department: parsed.institution?.department || '',
          roll: parsed.student?.classRoll || parsed.student?.examRoll || '',
          year: parsed.student?.year || parsed.student?.yearSemester || '',
          semester: parsed.student?.year || parsed.student?.yearSemester || '',
          batch: '',
        },
        teacher: {
          name: parsed.teacher?.name ?? '',
          designation: parsed.teacher?.designation ?? '',
          department: parsed.teacher?.department || parsed.institution?.department || '',
        },
        dates: {
          submissionDate: parsed.assignment?.submissionDate ?? '',
        },
      };
    }
  } catch (e) {
    console.warn('Failed to parse saved cover data', e);
  }
  return null;
}

export function useAssignmentCover() {
  const [data, setData] = useState<CoverPageData>(() => {
    try {
      const savedV2 = localStorage.getItem(STORAGE_KEY);
      if (savedV2) {
        const parsed = parseSavedData(savedV2);
        if (parsed) return parsed;
      }
      const savedV1 = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (savedV1) {
        const parsed = parseSavedData(savedV1);
        if (parsed) return parsed;
      }
    } catch (e) {
      console.warn('Could not load cover data from localStorage', e);
    }
    return INITIAL_SAMPLE_DATA;
  });

  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const isFirstRender = useRef(true);

  // Auto-save to localStorage on every change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setLastSaved(new Date());
    } catch (e) {
      console.error('Failed to auto-save to localStorage', e);
    }
  }, [data]);

  const updateInstitution = useCallback((fields: Partial<InstitutionInfo>) => {
    setData((prev) => {
      const newInstitution = { ...prev.institution, ...fields };

      // If department changed in institution:
      // student department and teacher department normally follow it unless customized
      let newStudentDept = prev.student.department;
      let newTeacherDept = prev.teacher.department;

      if (fields.department !== undefined && fields.department !== prev.institution.department) {
        // If student's department was matching the old institution department or was blank, sync it
        if (!prev.student.department || prev.student.department === prev.institution.department) {
          newStudentDept = fields.department;
        }
        // If teacher's department was matching the old institution department or was blank, sync it
        if (!prev.teacher.department || prev.teacher.department === prev.institution.department) {
          newTeacherDept = fields.department;
        }
      }

      return {
        ...prev,
        institution: newInstitution,
        student: { ...prev.student, department: newStudentDept },
        teacher: { ...prev.teacher, department: newTeacherDept },
      };
    });
  }, []);

  const updateCourse = useCallback((fields: Partial<CourseInfo>) => {
    setData((prev) => ({
      ...prev,
      course: { ...prev.course, ...fields },
    }));
  }, []);

  const updateStudent = useCallback((fields: Partial<StudentInfo>) => {
    setData((prev) => ({
      ...prev,
      student: { ...prev.student, ...fields },
    }));
  }, []);

  const updateTeacher = useCallback((fields: Partial<TeacherInfo>) => {
    setData((prev) => ({
      ...prev,
      teacher: { ...prev.teacher, ...fields },
    }));
  }, []);

  const updateDates = useCallback((fields: Partial<DatesInfo>) => {
    setData((prev) => ({
      ...prev,
      dates: { ...prev.dates, ...fields },
    }));
  }, []);

  const syncStudentDepartment = useCallback(() => {
    setData((prev) => ({
      ...prev,
      student: { ...prev.student, department: prev.institution.department },
    }));
  }, []);

  const syncTeacherDepartment = useCallback(() => {
    setData((prev) => ({
      ...prev,
      teacher: { ...prev.teacher, department: prev.institution.department },
    }));
  }, []);

  const resetForm = useCallback(() => {
    setData(BLANK_COVER_DATA);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(BLANK_COVER_DATA));
      setLastSaved(new Date());
    } catch (e) {
      console.error('Failed to reset localStorage', e);
    }
  }, []);

  const fillSampleData = useCallback(() => {
    setData(INITIAL_SAMPLE_DATA);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_DATA));
      setLastSaved(new Date());
    } catch (e) {
      console.error('Failed to save sample data to localStorage', e);
    }
  }, []);

  return {
    data,
    updateInstitution,
    updateCourse,
    updateStudent,
    updateTeacher,
    updateDates,
    syncStudentDepartment,
    syncTeacherDepartment,
    resetForm,
    fillSampleData,
    lastSaved,
  };
}
