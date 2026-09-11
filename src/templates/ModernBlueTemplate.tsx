import React from 'react';
import { TemplateProps, formatDdMmYyyy } from './types';

export const ModernBlueTemplate: React.FC<TemplateProps> = ({
  data,
  layoutStyle,
  logoError,
  onLogoError,
}) => {
  const formattedDate = formatDdMmYyyy(data.dates.submissionDate);

  return (
    <>
      {/* Double Border in Light Cyan-Blue */}
      <div className="absolute inset-[8mm] border-[1.5px] border-[#38bdf8] pointer-events-none z-10">
        <div className="absolute inset-[2.5mm] border-[1px] border-[#38bdf8]" />
      </div>

      {/* Content Container (Inside Safe A4 Print Margin) */}
      <div className="relative z-20 w-full h-full px-[18mm] py-[15mm] flex flex-col justify-between">
        {/* TOP SECTION: College Logo + Name Lockup */}
        <div className="flex flex-col items-center pt-1">
          <div className="flex items-center justify-center gap-4 w-full max-w-[480px]">
            {/* Logo Area */}
            <div className="h-[74px] w-[74px] flex items-center justify-center shrink-0">
              {!logoError ? (
                <img
                  src="/logo.png"
                  alt="Government Titumir College Logo"
                  crossOrigin="anonymous"
                  onError={onLogoError}
                  className="h-[72px] w-auto max-w-[80px] object-contain drop-shadow-2xs"
                />
              ) : (
                <div className="w-[66px] h-[66px] rounded-full border-2 border-[#1e3a8a] flex flex-col items-center justify-center bg-blue-50 text-[#1e3a8a] shadow-2xs">
                  <span className="font-cinzel text-[11px] font-bold">GTC</span>
                  <span className="text-[7.5px] uppercase tracking-wider font-semibold">1968</span>
                </div>
              )}
            </div>

            {/* Titumir College Name Lockup */}
            <div className="text-left flex flex-col justify-center">
              <h1 className="font-academic font-black text-[22px] tracking-[0.03em] text-[#1e3a8a] uppercase leading-tight">
                GOVERNMENT TITUMIR
              </h1>
              <div className="font-academic font-bold text-[13px] tracking-[0.45em] text-[#1e3a8a] uppercase leading-none mt-1">
                C O L L E G E
              </div>
              <p className="font-academic italic text-[11.5px] text-[#2563eb] mt-1.5 tracking-normal">
                Dhaka Central University
              </p>
            </div>
          </div>

          {/* Department of ... */}
          <div className="text-center mt-3 mb-1">
            <h2 className="font-sans font-bold text-[15px] text-[#475569] tracking-wide">
              Department of {data.institution.department || '____________________'}
            </h2>
          </div>

          {/* Horizontal Divider with Centered Diamond Symbol */}
          <div className="w-full max-w-[440px] mx-auto flex items-center justify-center my-2.5">
            <div className="h-[1px] bg-slate-300 flex-1" />
            <div className="mx-2.5 w-2.5 h-2.5 rotate-45 border border-slate-500 bg-white shrink-0" />
            <div className="h-[1px] bg-slate-300 flex-1" />
          </div>
        </div>

        {/* MIDDLE SECTION: "ASSIGNMENT", Assignment No & Course Card */}
        <div className="text-center my-auto flex flex-col items-center py-1">
          <h3 className="font-sans font-bold text-[17px] tracking-[0.08em] text-[#1e293b] uppercase">
            ASSIGNMENT
          </h3>

          <div className="mt-2.5 mb-3 inline-block border-[1.5px] border-[#1e3a8a] rounded-lg px-8 py-1.5 bg-white shadow-2xs">
            <span className="font-sans text-[13.5px] font-semibold text-slate-800">
              {data.course.assignmentNo
                ? `Assignment No: ${data.course.assignmentNo}`
                : 'Assignment No: 1'}
            </span>
          </div>

          <div className="w-full max-w-[480px] mx-auto bg-[#f4f7fa] rounded-xl px-5 py-4 space-y-2 text-left border border-slate-200/60 shadow-2xs">
            <div className="flex items-baseline gap-2 text-[13.5px]">
              <span className="font-bold text-[#475569] min-w-[105px]">Course Code:</span>
              <span className="font-semibold text-slate-800 font-mono">
                {data.course.courseCode || ''}
              </span>
            </div>
            <div className="flex items-baseline gap-2 text-[13.5px]">
              <span className="font-bold text-[#475569] min-w-[105px]">Course Title:</span>
              <span className="font-semibold text-slate-800">
                {data.course.courseTitle || ''}
              </span>
            </div>
            {data.course.assignmentTitle && (
              <div className="flex items-baseline gap-2 text-[13.5px] pt-0.5">
                <span className="font-bold text-[#475569] min-w-[105px]">
                  Assignment Title:
                </span>
                <span className="font-medium italic text-slate-800 leading-snug">
                  {data.course.assignmentTitle}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* LOWER SECTION: SUBMITTED BY & SUBMITTED TO */}
        <div className="w-full max-w-[490px] mx-auto my-2">
          {layoutStyle === 'side-by-side' ? (
            <div className="grid grid-cols-2 gap-8 items-start">
              {/* Left Column: SUBMITTED BY */}
              <div>
                <div className="border-b border-[#64748b] pb-1 mb-2.5">
                  <h4 className="font-sans font-bold text-[12.5px] text-[#334155] uppercase tracking-wider">
                    SUBMITTED BY
                  </h4>
                </div>
                <div className="space-y-1.5 font-sans text-[12.5px] text-slate-700">
                  <div className="flex gap-1.5">
                    <span className="text-[#64748b] font-medium min-w-[58px]">Name:</span>
                    <span className="font-semibold text-slate-900">
                      {data.student.name || ''}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-[#64748b] font-medium min-w-[58px]">Roll:</span>
                    <span className="font-medium text-slate-900 font-mono">
                      {data.student.roll || ''}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-[#64748b] font-medium min-w-[58px]">ID:</span>
                    <span className="font-mono font-medium text-slate-900">
                      {data.student.studentId || ''}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-[#64748b] font-medium min-w-[58px]">Year:</span>
                    <span className="text-slate-800">{data.student.year || data.student.semester || ''}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: SUBMITTED TO */}
              <div>
                <div className="border-b border-[#64748b] pb-1 mb-2.5">
                  <h4 className="font-sans font-bold text-[12.5px] text-[#334155] uppercase tracking-wider">
                    SUBMITTED TO
                  </h4>
                </div>
                <div className="space-y-1.5 font-sans text-[12.5px] text-slate-700">
                  <div className="flex gap-1.5">
                    <span className="text-[#64748b] font-medium min-w-[80px]">Name:</span>
                    <span className="font-semibold text-slate-900">
                      {data.teacher.name || ''}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-[#64748b] font-medium min-w-[80px]">Designation:</span>
                    <span className="text-slate-800">{data.teacher.designation || ''}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-[#64748b] font-medium min-w-[80px]">Department:</span>
                    <span className="text-slate-800">
                      {data.teacher.department
                        ? `Department of ${data.teacher.department}`
                        : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Stacked Mode */
            <div className="space-y-3">
              <div>
                <div className="border-b border-[#64748b] pb-1 mb-1.5">
                  <h4 className="font-sans font-bold text-[12px] text-[#334155] uppercase tracking-wider">
                    SUBMITTED BY
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-sans text-[12px]">
                  <div className="flex gap-1.5">
                    <span className="text-[#64748b] font-medium">Name:</span>
                    <span className="font-semibold text-slate-900">{data.student.name || ''}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-[#64748b] font-medium">ID:</span>
                    <span className="font-mono text-slate-900">{data.student.studentId || ''}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-[#64748b] font-medium">Roll:</span>
                    <span className="text-slate-900 font-mono">{data.student.roll || ''}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-[#64748b] font-medium">Year:</span>
                    <span className="text-slate-900">{data.student.year || data.student.semester || ''}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="border-b border-[#64748b] pb-1 mb-1.5">
                  <h4 className="font-sans font-bold text-[12px] text-[#334155] uppercase tracking-wider">
                    SUBMITTED TO
                  </h4>
                </div>
                <div className="space-y-1 font-sans text-[12px]">
                  <div className="flex gap-2">
                    <span className="text-[#64748b] font-medium min-w-[80px]">Name:</span>
                    <span className="font-semibold text-slate-900">{data.teacher.name || ''}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#64748b] font-medium min-w-[80px]">Designation:</span>
                    <span className="text-slate-800">{data.teacher.designation || ''}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#64748b] font-medium min-w-[80px]">Department:</span>
                    <span className="text-slate-800">
                      {data.teacher.department ? `Department of ${data.teacher.department}` : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM SECTION: Full-Width Divider Line + Centered Date */}
        <div className="w-full max-w-[490px] mx-auto pt-2 pb-1 border-t border-slate-300 text-center">
          <p className="font-sans text-[13px] text-slate-600">
            Date of Submission:{' '}
            <span className="font-bold text-slate-900">
              {formattedDate || 'DD/MM/YYYY'}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
