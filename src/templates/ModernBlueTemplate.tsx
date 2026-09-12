import React from 'react';
import { TemplateProps, formatDdMmYyyy } from './types';
import { getCollegeLogo, getCollegeShortName, getCollegeEstd } from '../data/collegeData';

export const ModernBlueTemplate: React.FC<TemplateProps> = ({
  data,
  layoutStyle,
  logoError,
  onLogoError,
}) => {
  const formattedDate = formatDdMmYyyy(data.dates.submissionDate);

  return (
    <>
      {/* Precision Academic Blue Frame */}
      <div className="absolute inset-[9mm] border-2 border-[#1e3a8a] pointer-events-none z-10">
        {/* Inner Accent Line */}
        <div className="absolute inset-[2.5mm] border border-[#60a5fa]" />

        {/* Ornate Corner Architectural Accents */}
        {/* Top-Left */}
        <div className="absolute -top-[1px] -left-[1px] w-3.5 h-3.5 border-t-2 border-l-2 border-[#1e3a8a]" />
        <div className="absolute top-[1.5mm] left-[1.5mm] w-1.5 h-1.5 bg-[#1e3a8a]" />

        {/* Top-Right */}
        <div className="absolute -top-[1px] -right-[1px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#1e3a8a]" />
        <div className="absolute top-[1.5mm] right-[1.5mm] w-1.5 h-1.5 bg-[#1e3a8a]" />

        {/* Bottom-Left */}
        <div className="absolute -bottom-[1px] -left-[1px] w-3.5 h-3.5 border-b-2 border-l-2 border-[#1e3a8a]" />
        <div className="absolute bottom-[1.5mm] left-[1.5mm] w-1.5 h-1.5 bg-[#1e3a8a]" />

        {/* Bottom-Right */}
        <div className="absolute -bottom-[1px] -right-[1px] w-3.5 h-3.5 border-b-2 border-r-2 border-[#1e3a8a]" />
        <div className="absolute bottom-[1.5mm] right-[1.5mm] w-1.5 h-1.5 bg-[#1e3a8a]" />
      </div>

      {/* Inner Margin Border and Scaled Frame Padding */}
      <div className="page-frame relative z-20 w-full h-full px-[18mm] pt-[17mm] pb-[14mm] flex flex-col justify-between box-border">
        {/* TOP SECTION: Centered College Crest + Academic Header */}
        <div className="flex flex-col items-center text-center shrink-0">
          {/* Logo Area */}
          <div className="h-[66px] flex items-center justify-center mb-1.5">
            {!logoError ? (
              <img
                src={getCollegeLogo(data.institution.collegeName)}
                alt={`${data.institution.collegeName || 'College'} Logo`}
                crossOrigin="anonymous"
                onError={onLogoError}
                className="h-[64px] w-auto max-w-[90px] object-contain drop-shadow-2xs"
              />
            ) : (
              <div className="w-[62px] h-[62px] rounded-full border-2 border-[#1e3a8a] flex flex-col items-center justify-center bg-blue-50 text-[#1e3a8a] shadow-2xs">
                <span className="font-cinzel text-[11px] font-bold">
                  {getCollegeShortName(data.institution.collegeName)}
                </span>
                <span className="text-[7.5px] uppercase tracking-wider font-semibold">
                  {getCollegeEstd(data.institution.collegeName) || '1968'}
                </span>
              </div>
            )}
          </div>

          {/* College Title */}
          <h1 className="font-academic font-black text-[21px] tracking-[0.04em] text-[#1e3a8a] uppercase leading-tight">
            {data.institution.collegeName || 'GOVERNMENT TITUMIR COLLEGE'}
          </h1>
          {data.institution.collegeName !== 'Dhaka Central University' && (
            <p className="font-sans text-[11px] tracking-[0.22em] font-bold text-[#2563eb] uppercase mt-0.5">
              Dhaka Central University
            </p>
          )}

          {/* Faculty and Department */}
          <div className="mt-1.5 space-y-0.5">
            {data.institution.faculty && (
              <p className="font-sans text-[11.5px] font-semibold text-[#475569] uppercase tracking-widest">
                {data.institution.faculty}
              </p>
            )}
            <h2 className="font-academic font-bold text-[16px] text-[#0f172a] tracking-wide">
              Department of {data.institution.department || '____________________'}
            </h2>
          </div>

          {/* Horizontal Divider with Centered Diamond Motif */}
          <div className="w-full max-w-[380px] mx-auto flex items-center justify-center my-2">
            <div className="h-[1px] bg-[#1e3a8a]/35 flex-1" />
            <div className="mx-2.5 flex items-center gap-1 text-[#1e3a8a]">
              <div className="w-1.5 h-1.5 rotate-45 border border-[#1e3a8a] bg-white" />
              <div className="w-2.5 h-2.5 rotate-45 bg-[#1e3a8a]" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#1e3a8a] bg-white" />
            </div>
            <div className="h-[1px] bg-[#1e3a8a]/35 flex-1" />
          </div>
        </div>

        {/* MIDDLE SECTION: Assignment Title, Course Card */}
        <div className="w-full max-w-[490px] mx-auto box-border flex flex-col">
          {/* ASSIGNMENT HEADER */}
          <div className="assignment-header w-full box-border flex flex-col items-center justify-center m-0 text-center">
            <h3 className="font-academic font-black text-[23px] tracking-[0.25em] text-[#0f172a] uppercase mx-auto">
              A S S I G N M E N T
            </h3>

            <div className="mt-3.5 mb-7 inline-block border-2 border-[#1e3a8a] rounded-lg px-6 py-0.5 bg-blue-50/60 shadow-2xs mx-auto">
              <span className="font-sans text-[13.5px] font-bold text-[#1e3a8a] tracking-wide">
                {data.course.assignmentNo
                  ? `Assignment No: ${data.course.assignmentNo}`
                  : 'Assignment No: 01'}
              </span>
            </div>
          </div>

          {/* COURSE DETAILS CARD */}
          <div className="course-card w-full box-border bg-[#f8fafc] rounded-xl px-5 py-2 border border-blue-200/90 shadow-2xs divide-y divide-slate-200/75">
            <div className="grid grid-cols-[125px_12px_1fr] items-baseline py-1 text-[13.5px]">
              <span className="font-bold text-[#334155]">Course Code</span>
              <span className="font-bold text-[#64748b]">:</span>
              <span className="font-mono font-bold text-[#0f172a] text-[14.5px]">
                {data.course.courseCode || ''}
              </span>
            </div>
            <div className="grid grid-cols-[125px_12px_1fr] items-baseline py-1 text-[13.5px]">
              <span className="font-bold text-[#334155]">Course Title</span>
              <span className="font-bold text-[#64748b]">:</span>
              <span className="font-semibold text-[#0f172a] text-[14.5px]">
                {data.course.courseTitle || ''}
              </span>
            </div>
            <div className="grid grid-cols-[125px_12px_1fr] items-baseline py-1 text-[13.5px]">
              <span className="font-bold text-[#334155]">Assignment Title</span>
              <span className="font-bold text-[#64748b]">:</span>
              <span className="font-bold text-[#0f172a] text-[14.5px] leading-snug">
                {data.course.assignmentTitle || ''}
              </span>
            </div>
          </div>
        </div>

        {/* LOWER SECTION: SUBMISSION SECTION */}
        <div className="submission-section w-full my-1.5 box-border">
          {layoutStyle === 'side-by-side' ? (
            <div className="grid grid-cols-2 gap-5 items-stretch">
              {/* Left Column: SUBMITTED BY */}
              <div className="submitted-by min-w-0 w-full h-full box-border border border-blue-200/90 rounded-xl p-4.5 bg-white shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="border-b-2 border-blue-200 pb-1.5 mb-2.5">
                    <h4 className="font-sans font-bold text-[15px] text-[#1e3a8a] uppercase tracking-wider">
                      SUBMITTED BY
                    </h4>
                  </div>
                  <div className="space-y-2 font-sans text-[14.5px] leading-snug">
                    <div className="grid grid-cols-[108px_14px_1fr] items-baseline">
                      <span className="text-[#475569] font-bold">Name</span>
                      <span className="text-[#64748b] font-bold">:</span>
                      <span className="font-bold text-[#0f172a] text-[15.5px] leading-tight break-words min-w-0">
                        {data.student.name || ''}
                      </span>
                    </div>
                    <div className="grid grid-cols-[108px_14px_1fr] items-baseline">
                      <span className="text-[#475569] font-bold">Roll</span>
                      <span className="text-[#64748b] font-bold">:</span>
                      <span className="font-mono font-bold text-[#0f172a] text-[15px] break-words min-w-0">
                        {data.student.roll || ''}
                      </span>
                    </div>
                    <div className="grid grid-cols-[108px_14px_1fr] items-baseline">
                      <span className="text-[#475569] font-bold">Department</span>
                      <span className="text-[#64748b] font-bold">:</span>
                      <span className="text-[#0f172a] font-medium text-[14.5px] break-words min-w-0">
                        {data.student.department || data.institution.department || ''}
                      </span>
                    </div>
                    <div className="grid grid-cols-[108px_14px_1fr] items-baseline">
                      <span className="text-[#475569] font-bold">Year</span>
                      <span className="text-[#64748b] font-bold">:</span>
                      <span className="text-[#0f172a] font-medium text-[14.5px] break-words min-w-0">
                        {data.student.year || data.student.semester || ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: SUBMITTED TO */}
              <div className="submitted-to min-w-0 w-full h-full box-border border border-blue-200/90 rounded-xl p-4.5 bg-white shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="border-b-2 border-blue-200 pb-1.5 mb-2.5">
                    <h4 className="font-sans font-bold text-[15px] text-[#1e3a8a] uppercase tracking-wider">
                      SUBMITTED TO
                    </h4>
                  </div>
                  <div className="space-y-2 font-sans text-[14.5px] leading-snug">
                    <div className="grid grid-cols-[108px_14px_1fr] items-baseline">
                      <span className="text-[#475569] font-bold">Name</span>
                      <span className="text-[#64748b] font-bold">:</span>
                      <span className="font-bold text-[#0f172a] text-[15.5px] leading-tight break-words min-w-0">
                        {data.teacher.name || ''}
                      </span>
                    </div>
                    <div className="grid grid-cols-[108px_14px_1fr] items-baseline">
                      <span className="text-[#475569] font-bold">Designation</span>
                      <span className="text-[#64748b] font-bold">:</span>
                      <span className="text-[#0f172a] font-medium text-[14.5px] break-words min-w-0">
                        {data.teacher.designation || ''}
                      </span>
                    </div>
                    <div className="grid grid-cols-[108px_14px_1fr] items-baseline">
                      <span className="text-[#475569] font-bold">Department</span>
                      <span className="text-[#64748b] font-bold">:</span>
                      <span className="text-[#0f172a] font-medium text-[14.5px] leading-snug break-words min-w-0">
                        {data.teacher.department
                          ? `Department of ${data.teacher.department}`
                          : ''}
                      </span>
                    </div>
                    <div className="grid grid-cols-[108px_14px_1fr] items-baseline">
                      <span className="text-[#475569] font-bold">College</span>
                      <span className="text-[#64748b] font-bold">:</span>
                      <span className="text-[#475569] text-[13px] break-words min-w-0">
                        {data.institution.collegeName || ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Stacked Mode */
            <div className="space-y-2.5 max-w-[480px] mx-auto w-full">
              <div className="submitted-by min-w-0 w-full box-border border border-blue-200/90 rounded-xl p-3.5 bg-white shadow-2xs">
                <div className="border-b-2 border-blue-200 pb-1 mb-2">
                  <h4 className="font-sans font-bold text-[14px] text-[#1e3a8a] uppercase tracking-wider">
                    SUBMITTED BY
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 font-sans text-[13.5px]">
                  <div className="grid grid-cols-[54px_10px_1fr] items-baseline">
                    <span className="text-[#475569] font-bold">Name</span>
                    <span className="text-[#64748b] font-bold">:</span>
                    <span className="font-bold text-[#0f172a] text-[14.5px]">{data.student.name || ''}</span>
                  </div>
                  <div className="grid grid-cols-[54px_10px_1fr] items-baseline">
                    <span className="text-[#475569] font-bold">Roll</span>
                    <span className="text-[#64748b] font-bold">:</span>
                    <span className="font-mono font-bold text-[#0f172a] text-[14px]">{data.student.roll || ''}</span>
                  </div>
                  <div className="grid grid-cols-[54px_10px_1fr] items-baseline">
                    <span className="text-[#475569] font-bold">Dept</span>
                    <span className="text-[#64748b] font-bold">:</span>
                    <span className="text-[#0f172a] font-medium text-[13.5px]">
                      {data.student.department || data.institution.department || ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-[54px_10px_1fr] items-baseline">
                    <span className="text-[#475569] font-bold">Year</span>
                    <span className="text-[#64748b] font-bold">:</span>
                    <span className="text-[#0f172a] font-medium text-[13.5px]">
                      {data.student.year || data.student.semester || ''}
                    </span>
                  </div>
                </div>
              </div>

              <div className="submitted-to min-w-0 w-full box-border border border-blue-200/90 rounded-xl p-3.5 bg-white shadow-2xs">
                <div className="border-b-2 border-blue-200 pb-1 mb-2">
                  <h4 className="font-sans font-bold text-[14px] text-[#1e3a8a] uppercase tracking-wider">
                    SUBMITTED TO
                  </h4>
                </div>
                <div className="space-y-1.5 font-sans text-[13.5px]">
                  <div className="grid grid-cols-[92px_10px_1fr] items-baseline">
                    <span className="text-[#475569] font-bold">Name</span>
                    <span className="text-[#64748b] font-bold">:</span>
                    <span className="font-bold text-[#0f172a] text-[14.5px]">{data.teacher.name || ''}</span>
                  </div>
                  <div className="grid grid-cols-[92px_10px_1fr] items-baseline">
                    <span className="text-[#475569] font-bold">Designation</span>
                    <span className="text-[#64748b] font-bold">:</span>
                    <span className="text-[#0f172a] font-medium text-[13.5px]">{data.teacher.designation || ''}</span>
                  </div>
                  <div className="grid grid-cols-[92px_10px_1fr] items-baseline">
                    <span className="text-[#475569] font-bold">Department</span>
                    <span className="text-[#64748b] font-bold">:</span>
                    <span className="text-[#0f172a] font-medium text-[13.5px]">
                      {data.teacher.department ? `Department of ${data.teacher.department}` : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-[92px_10px_1fr] items-baseline">
                    <span className="text-[#475569] font-bold">College</span>
                    <span className="text-[#64748b] font-bold">:</span>
                    <span className="text-[#475569] text-[13px]">
                      {data.institution.collegeName || ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM SECTION: Full-Width Separator + Submission Date */}
        <div className="w-full max-w-[535px] mx-auto pt-2 pb-0.5 border-t border-[#1e3a8a]/20 text-center shrink-0">
          <p className="font-sans text-[13.5px] text-[#475569]">
            Date of Submission:{' '}
            <span className="font-bold text-[#0f172a] text-[14px]">
              {formattedDate || '___/____/______'}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
