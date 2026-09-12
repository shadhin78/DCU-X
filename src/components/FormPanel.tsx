import React, { useState } from 'react';
import {
  Building2,
  BookOpen,
  User,
  GraduationCap,
  Calendar,
  Link,
  ChevronDown,
  Printer,
  Download,
  Loader2,
} from 'lucide-react';
import {
  CoverPageData,
  InstitutionInfo,
  CourseInfo,
  StudentInfo,
  TeacherInfo,
  DatesInfo,
} from '../types';
import {
  TITUMIR_FACULTIES,
  normalizeFaculty,
  SEVEN_COLLEGES,
  findCollege,
} from '../data/collegeData';

interface FormPanelProps {
  data: CoverPageData;
  onUpdateInstitution: (fields: Partial<InstitutionInfo>) => void;
  onUpdateCourse: (fields: Partial<CourseInfo>) => void;
  onUpdateStudent: (fields: Partial<StudentInfo>) => void;
  onUpdateTeacher: (fields: Partial<TeacherInfo>) => void;
  onUpdateDates: (fields: Partial<DatesInfo>) => void;
  onSyncStudentDept: () => void;
  onSyncTeacherDept: () => void;
  onReset?: () => void;
  onLoadSample?: () => void;
  onPreview?: () => void;
  onPrint?: () => void;
  onDownloadPdf?: () => void;
  isGeneratingPdf?: boolean;
}

export const FormPanel: React.FC<FormPanelProps> = ({
  data,
  onUpdateInstitution,
  onUpdateCourse,
  onUpdateStudent,
  onUpdateTeacher,
  onUpdateDates,
  onSyncStudentDept,
  onSyncTeacherDept,
  onReset,
  onLoadSample,
  onPreview,
  onPrint,
  onDownloadPdf,
  isGeneratingPdf = false,
}) => {
  // Collapsible state for each requested section
  const [openSections, setOpenSections] = useState({
    institution: true,
    course: true,
    student: true,
    teacher: true,
    dates: true,
  });

  const [isCustomDeptSelected, setIsCustomDeptSelected] = useState(false);
  const [isCustomCollegeSelected, setIsCustomCollegeSelected] = useState(false);

  const matchedCollege = findCollege(data.institution.collegeName);
  const isPredefinedCollege = Boolean(matchedCollege);
  const isCustomCollegeMode =
    isCustomCollegeSelected || (!isPredefinedCollege && Boolean(data.institution.collegeName));

  const handleCollegeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '__custom__') {
      setIsCustomCollegeSelected(true);
      if (isPredefinedCollege) {
        onUpdateInstitution({ collegeName: '' });
      }
    } else {
      setIsCustomCollegeSelected(false);
      onUpdateInstitution({ collegeName: val });
    }
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const currentFacultyName = normalizeFaculty(data.institution.faculty);
  const selectedFacultyObj =
    TITUMIR_FACULTIES.find((f) => f.name === currentFacultyName) || null;

  const isPredefinedDept = selectedFacultyObj
    ? selectedFacultyObj.departments.some(
        (dept) => dept.toLowerCase() === (data.institution.department || '').toLowerCase()
      )
    : false;

  const isCustomMode =
    isCustomDeptSelected || (!isPredefinedDept && Boolean(data.institution.department));

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const facultyName = e.target.value;
    const foundFaculty =
      TITUMIR_FACULTIES.find((f) => f.name === facultyName) || null;

    if (!foundFaculty) {
      onUpdateInstitution({
        faculty: '',
        department: isCustomMode ? data.institution.department : '',
      });
      return;
    }

    const isCurrentDeptInNewFaculty = foundFaculty.departments.some(
      (dept) => dept.toLowerCase() === (data.institution.department || '').toLowerCase()
    );

    const newDepartment =
      isCurrentDeptInNewFaculty || isCustomMode
        ? data.institution.department
        : '';

    onUpdateInstitution({
      faculty: foundFaculty.name,
      department: newDepartment,
    });
  };

  const handleDepartmentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '__custom__') {
      setIsCustomDeptSelected(true);
      if (isPredefinedDept) {
        onUpdateInstitution({ department: '' });
      }
    } else {
      setIsCustomDeptSelected(false);
      onUpdateInstitution({ department: val });
    }
  };

  const isStudentDeptSynced = data.student.department === data.institution.department;
  const isTeacherDeptSynced = data.teacher.department === data.institution.department;

  return (
    <div className="space-y-4">
      {/* Editor Header Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs">
        <h2 className="text-sm sm:text-base font-bold text-slate-900">
          Assignment Cover Editor
        </h2>
        <p className="text-[11.5px] text-slate-500 mt-0.5">
          Fill in the fields below. Live A4 cover page updates instantly.
        </p>
      </div>

      {/* ====================================================================
          SECTION 1: INSTITUTION INFORMATION (Collapsible)
         ==================================================================== */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden transition-all">
        <button
          type="button"
          id="toggle-section-institution"
          onClick={() => toggleSection('institution')}
          className="w-full px-4 py-3.5 bg-white hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3 text-left cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200/60">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                Institution Information
              </span>
              {!openSections.institution && (
                <p className="text-[11px] text-slate-500 font-normal truncate max-w-[240px] sm:max-w-xs">
                  {data.institution.collegeName || 'Govt. Titumir College'} •{' '}
                  {data.institution.department || 'Department'}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              {openSections.institution ? 'Click to collapse' : 'Click to expand'}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                openSections.institution ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {openSections.institution && (
          <div className="p-4 sm:p-5 pt-1 sm:pt-2 border-t border-slate-100 space-y-3.5">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="select-college-name"
                  className="block text-xs font-semibold text-slate-700"
                >
                  College / Institution Name{' '}
                  <span className="text-rose-500 font-bold" title="Required field">
                    *
                  </span>
                </label>
                {isCustomCollegeMode && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomCollegeSelected(false);
                      onUpdateInstitution({ collegeName: 'Govt. Titumir College' });
                    }}
                    className="text-[11px] text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer"
                  >
                    Select from 7 Colleges
                  </button>
                )}
              </div>

              <select
                id="select-college-name"
                value={
                  isCustomCollegeMode
                    ? '__custom__'
                    : (matchedCollege ? matchedCollege.name : (data.institution.collegeName || ''))
                }
                onChange={handleCollegeSelect}
                className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white font-medium text-slate-800 transition-shadow"
              >
                {!data.institution.collegeName && !isCustomCollegeMode && (
                  <option value="" disabled>Select College / Institution...</option>
                )}
                {SEVEN_COLLEGES.map((col, idx) => (
                  <option key={col.id} value={col.name}>
                    {idx + 1}. {col.name} {col.estd ? `(Estd. ${col.estd})` : ''}
                  </option>
                ))}
                <option value="__custom__">Other / Custom College...</option>
              </select>

              {isCustomCollegeMode && (
                <div className="mt-2">
                  <input
                    type="text"
                    id="input-custom-college-name"
                    value={data.institution.collegeName}
                    onChange={(e) => onUpdateInstitution({ collegeName: e.target.value })}
                    placeholder="Enter custom college / institution name"
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-shadow bg-white text-slate-900"
                    autoFocus
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Type your custom institution, university, or college name.
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="select-faculty"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Faculty{' '}
                  <span className="text-rose-500 font-bold" title="Required field">
                    *
                  </span>
                </label>
                <select
                  id="select-faculty"
                  value={selectedFacultyObj ? selectedFacultyObj.name : ''}
                  onChange={handleFacultyChange}
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white font-medium text-slate-800 transition-shadow"
                >
                  {!selectedFacultyObj && (
                    <option value="" disabled>Select Faculty...</option>
                  )}
                  {TITUMIR_FACULTIES.map((fac) => (
                    <option key={fac.id} value={fac.name}>
                      {fac.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="select-department"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Department{' '}
                  <span className="text-rose-500 font-bold" title="Required field">
                    *
                  </span>
                </label>
                <select
                  id="select-department"
                  value={
                    isCustomMode
                      ? '__custom__'
                      : (isPredefinedDept ? data.institution.department : '')
                  }
                  onChange={handleDepartmentSelect}
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white text-slate-800 transition-shadow"
                >
                  {!data.institution.department && !isCustomMode && (
                    <option value="" disabled>Select Department...</option>
                  )}
                  {selectedFacultyObj && selectedFacultyObj.departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                  <option value="__custom__">Custom / Other</option>
                </select>

                {isCustomMode && (
                  <div className="mt-2">
                    <input
                      type="text"
                      id="input-custom-department"
                      value={data.institution.department}
                      onChange={(e) => onUpdateInstitution({ department: e.target.value })}
                      placeholder="Enter custom department name"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white text-slate-900 transition-shadow"
                      autoFocus
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ====================================================================
          SECTION 2: COURSE INFORMATION (Collapsible)
         ==================================================================== */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden transition-all">
        <button
          type="button"
          id="toggle-section-course"
          onClick={() => toggleSection('course')}
          className="w-full px-4 py-3.5 bg-white hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3 text-left cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200/60">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                Course Information
              </span>
              {!openSections.course && (
                <p className="text-[11px] text-slate-500 font-normal truncate max-w-[240px] sm:max-w-xs">
                  {data.course.courseCode || 'Course Code'} •{' '}
                  {data.course.assignmentNo
                    ? `Assignment #${data.course.assignmentNo}`
                    : 'Assignment'}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              {openSections.course ? 'Click to collapse' : 'Click to expand'}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                openSections.course ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {openSections.course && (
          <div className="p-4 sm:p-5 pt-1 sm:pt-2 border-t border-slate-100 space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label
                  htmlFor="input-course-code"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Course Code{' '}
                  <span className="text-rose-500 font-bold" title="Required field">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  id="input-course-code"
                  value={data.course.courseCode}
                  onChange={(e) => onUpdateCourse({ courseCode: e.target.value })}
                  placeholder="e.g. ACC-201"
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 font-mono text-slate-900 transition-shadow"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="input-course-title"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Course Title{' '}
                  <span className="text-rose-500 font-bold" title="Required field">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  id="input-course-title"
                  value={data.course.courseTitle}
                  onChange={(e) => onUpdateCourse({ courseTitle: e.target.value })}
                  placeholder="e.g. Intermediate Financial Accounting & Reporting"
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-slate-900 transition-shadow"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-1">
                <label
                  htmlFor="input-assignment-no"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Assignment No{' '}
                  <span className="text-rose-500 font-bold" title="Required field">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  id="input-assignment-no"
                  value={data.course.assignmentNo}
                  onChange={(e) => onUpdateCourse({ assignmentNo: e.target.value })}
                  placeholder="e.g. 01"
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 font-mono text-slate-900 transition-shadow"
                />
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="input-assignment-title"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Assignment Title{' '}
                  <span className="text-rose-500 font-bold" title="Required field">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  id="input-assignment-title"
                  value={data.course.assignmentTitle}
                  onChange={(e) => onUpdateCourse({ assignmentTitle: e.target.value })}
                  placeholder="e.g. Comprehensive Analysis of Working Capital Management"
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-slate-900 transition-shadow"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ====================================================================
          SECTION 3: SUBMITTED BY (Student) (Collapsible)
         ==================================================================== */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden transition-all">
        <button
          type="button"
          id="toggle-section-student"
          onClick={() => toggleSection('student')}
          className="w-full px-4 py-3.5 bg-white hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3 text-left cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 border border-indigo-200/60">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                Submitted By
              </span>
              {!openSections.student && (
                <p className="text-[11px] text-slate-500 font-normal truncate max-w-[240px] sm:max-w-xs">
                  {data.student.name || 'Student Name'} •{' '}
                  {data.student.roll ? `Roll: ${data.student.roll}` : 'Roll: Not set'}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              {openSections.student ? 'Click to collapse' : 'Click to expand'}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                openSections.student ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {openSections.student && (
          <div className="p-4 sm:p-5 pt-1 sm:pt-2 border-t border-slate-100 space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="input-student-name"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Student Name{' '}
                  <span className="text-rose-500 font-bold" title="Required field">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  id="input-student-name"
                  value={data.student.name}
                  onChange={(e) => onUpdateStudent({ name: e.target.value })}
                  placeholder="e.g. Md. Tanvir Hossain"
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-slate-900 transition-shadow"
                />
              </div>
              <div>
                <label
                  htmlFor="input-student-roll"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Roll{' '}
                  <span className="text-rose-500 font-bold" title="Required field">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  id="input-student-roll"
                  value={data.student.roll}
                  onChange={(e) => onUpdateStudent({ roll: e.target.value })}
                  placeholder="e.g. 723849"
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 font-mono text-slate-900 transition-shadow"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="input-student-dept"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Department{' '}
                    <span className="text-rose-500 font-bold" title="Required field">
                      *
                    </span>
                  </label>
                  {!isStudentDeptSynced && (
                    <button
                      type="button"
                      onClick={onSyncStudentDept}
                      className="text-[11px] text-emerald-700 hover:text-emerald-800 font-medium inline-flex items-center gap-1 hover:underline cursor-pointer"
                      title="Copy from Institution department"
                    >
                      <Link className="w-3 h-3" />
                      <span>Sync</span>
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  id="input-student-dept"
                  value={data.student.department}
                  onChange={(e) => onUpdateStudent({ department: e.target.value })}
                  placeholder="e.g. Accounting"
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-slate-900 transition-shadow"
                />
              </div>
              <div>
                <label
                  htmlFor="select-student-year"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Year{' '}
                  <span className="text-rose-500 font-bold" title="Required field">
                    *
                  </span>
                </label>
                <select
                  id="select-student-year"
                  value={data.student.year || data.student.semester || ''}
                  onChange={(e) =>
                    onUpdateStudent({
                      year: e.target.value,
                      semester: e.target.value,
                    })
                  }
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white text-slate-900 transition-shadow cursor-pointer"
                >
                  {!data.student.year && !data.student.semester && (
                    <option value="" disabled>Select Year...</option>
                  )}
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Masters 1st Year">Masters 1st Year</option>
                  <option value="Masters Final Year">Masters Final Year</option>
                  <option value="Degree 1st Year">Degree 1st Year</option>
                  <option value="Degree 2nd Year">Degree 2nd Year</option>
                  <option value="Degree 3rd Year">Degree 3rd Year</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ====================================================================
          SECTION 4: SUBMITTED TO (Teacher) (Collapsible)
         ==================================================================== */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden transition-all">
        <button
          type="button"
          id="toggle-section-teacher"
          onClick={() => toggleSection('teacher')}
          className="w-full px-4 py-3.5 bg-white hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3 text-left cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200/60">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                Submitted To
              </span>
              {!openSections.teacher && (
                <p className="text-[11px] text-slate-500 font-normal truncate max-w-[240px] sm:max-w-xs">
                  {data.teacher.name || 'Teacher Name'} •{' '}
                  {data.teacher.designation || 'Designation'}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              {openSections.teacher ? 'Click to collapse' : 'Click to expand'}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                openSections.teacher ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {openSections.teacher && (
          <div className="p-4 sm:p-5 pt-1 sm:pt-2 border-t border-slate-100 space-y-3.5">
            <div>
              <label
                htmlFor="input-teacher-name"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Teacher Name{' '}
                <span className="text-rose-500 font-bold" title="Required field">
                  *
                </span>
              </label>
              <input
                type="text"
                id="input-teacher-name"
                value={data.teacher.name}
                onChange={(e) => onUpdateTeacher({ name: e.target.value })}
                placeholder="e.g. Prof. Dr. Mohammad Rafiqul Islam"
                className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-slate-900 transition-shadow"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="input-teacher-designation"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Designation{' '}
                  <span className="text-rose-500 font-bold" title="Required field">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  id="input-teacher-designation"
                  value={data.teacher.designation}
                  onChange={(e) => onUpdateTeacher({ designation: e.target.value })}
                  placeholder="e.g. Associate Professor / Lecturer"
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-slate-900 transition-shadow"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="input-teacher-dept"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Department
                  </label>
                  {!isTeacherDeptSynced && (
                    <button
                      type="button"
                      onClick={onSyncTeacherDept}
                      className="text-[11px] text-emerald-700 hover:text-emerald-800 font-medium inline-flex items-center gap-1 hover:underline cursor-pointer"
                      title="Set to match Institution department"
                    >
                      <Link className="w-3 h-3" />
                      <span>Same as Dept</span>
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  id="input-teacher-dept"
                  value={data.teacher.department}
                  onChange={(e) => onUpdateTeacher({ department: e.target.value })}
                  placeholder="e.g. Accounting"
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-slate-900 transition-shadow"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ====================================================================
          SECTION 5: DATES (Collapsible)
         ==================================================================== */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden transition-all">
        <button
          type="button"
          id="toggle-section-dates"
          onClick={() => toggleSection('dates')}
          className="w-full px-4 py-3.5 bg-white hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3 text-left cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 border border-rose-200/60">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-900">Dates</span>
              {!openSections.dates && (
                <p className="text-[11px] text-slate-500 font-normal truncate max-w-[240px] sm:max-w-xs">
                  {data.dates.submissionDate
                    ? `Submission Date: ${data.dates.submissionDate}`
                    : 'Submission Date not set'}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              {openSections.dates ? 'Click to collapse' : 'Click to expand'}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                openSections.dates ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {openSections.dates && (
          <div className="p-4 sm:p-5 pt-1 sm:pt-2 border-t border-slate-100 space-y-3">
            <div>
              <label
                htmlFor="input-submission-date"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Submission Date{' '}
                <span className="text-rose-500 font-bold" title="Required field">
                  *
                </span>
              </label>
              <input
                type="date"
                id="input-submission-date"
                value={data.dates.submissionDate}
                onChange={(e) => onUpdateDates({ submissionDate: e.target.value })}
                className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white text-slate-900 transition-shadow"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Formatted on the cover page as Day / Month / Year
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Primary Export Actions Card */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-3">
        <div>
          <span className="text-sm font-bold text-slate-800 block">Ready to Export?</span>
          <p className="text-[11.5px] text-slate-500 mt-0.5">
            Generates a crisp, single-page A4 portrait PDF locally or prints directly.
          </p>
        </div>

        <div>
          <button
            type="button"
            id="form-bottom-btn-download-pdf"
            onClick={onPrint}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs transition-all cursor-pointer"
            title="Download A4 Cover Page as PDF or Print"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
