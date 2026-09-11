import React from 'react';
import { TemplateProps, formatLongDate } from './types';

export const ClassicBlackTemplate: React.FC<TemplateProps> = ({
  data,
  layoutStyle,
  logoError,
  onLogoError,
}) => {
  const formattedDate = formatLongDate(data.dates.submissionDate);

  return (
    <>
      {/* Thin Decorative Border Around The Page */}
      <div className="absolute inset-[10mm] border-[1.5px] border-slate-950 pointer-events-none z-10">
        <div className="absolute inset-[2.5mm] border-[0.75px] border-slate-900" />
        <div className="absolute top-[-1px] left-[-1px] w-3 h-3 border-t-2 border-l-2 border-slate-950" />
        <div className="absolute top-[-1px] right-[-1px] w-3 h-3 border-t-2 border-r-2 border-slate-950" />
        <div className="absolute bottom-[-1px] left-[-1px] w-3 h-3 border-b-2 border-l-2 border-slate-950" />
        <div className="absolute bottom-[-1px] right-[-1px] w-3 h-3 border-b-2 border-r-2 border-slate-950" />
        <div className="absolute top-[2mm] left-[2mm] w-1.5 h-1.5 bg-slate-950" />
        <div className="absolute top-[2mm] right-[2mm] w-1.5 h-1.5 bg-slate-950" />
        <div className="absolute bottom-[2mm] left-[2mm] w-1.5 h-1.5 bg-slate-950" />
        <div className="absolute bottom-[2mm] right-[2mm] w-1.5 h-1.5 bg-slate-950" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full h-full px-[18mm] py-[16mm] flex flex-col justify-between">
        {/* Top Section */}
        <div className="text-center pt-2 flex flex-col items-center">
          <div className="mb-2.5 h-[72px] flex items-center justify-center">
            {!logoError ? (
              <img
                src="/logo.png"
                alt="Government Titumir College Logo"
                crossOrigin="anonymous"
                onError={onLogoError}
                className="h-[70px] w-auto max-w-[100px] object-contain drop-shadow-2xs"
              />
            ) : (
              <div className="w-[66px] h-[66px] rounded-full border-2 border-slate-900 flex flex-col items-center justify-center bg-emerald-50 text-slate-900 shadow-2xs">
                <div className="w-[58px] h-[58px] rounded-full border border-dashed border-slate-700 flex flex-col items-center justify-center p-1 text-center">
                  <span className="font-cinzel text-[11px] font-bold leading-tight">GTC</span>
                  <span className="text-[7.5px] font-sans font-semibold tracking-wider text-slate-700 uppercase">
                    Estd 1968
                  </span>
                </div>
              </div>
            )}
          </div>

          <h1 className="font-cinzel font-black text-[22px] tracking-[0.06em] text-slate-950 uppercase leading-tight">
            {data.institution.collegeName || 'Government Titumir College'}
          </h1>
          <p className="font-sans text-[10.5px] tracking-[0.2em] font-semibold text-slate-700 uppercase mt-1">
            Dhaka Central University
          </p>

          <div className="mt-2.5 space-y-0.5">
            {data.institution.faculty && (
              <p className="font-sans text-[12px] font-semibold text-slate-800 uppercase tracking-widest">
                {data.institution.faculty}
              </p>
            )}
            {data.institution.department && (
              <p className="font-academic font-bold text-[16px] text-slate-950 tracking-wide">
                Department of {data.institution.department}
              </p>
            )}
          </div>

          <div className="w-full max-w-[340px] mx-auto my-3 flex items-center justify-center">
            <div className="h-[1px] bg-slate-950 flex-1" />
            <div className="mx-3 flex items-center gap-1 text-slate-950">
              <span className="w-1.5 h-1.5 rotate-45 border border-slate-950 inline-block" />
              <span className="w-2.5 h-2.5 rotate-45 bg-slate-950 inline-block" />
              <span className="w-1.5 h-1.5 rotate-45 border border-slate-950 inline-block" />
            </div>
            <div className="h-[1px] bg-slate-950 flex-1" />
          </div>
        </div>

        {/* Middle Section */}
        <div className="text-center my-auto flex flex-col items-center py-2">
          <h2 className="font-cinzel font-black text-[26px] tracking-[0.28em] text-slate-950 uppercase">
            A S S I G N M E N T
          </h2>

          <div className="mt-2 mb-4 inline-block border-2 border-slate-950 rounded-lg px-6 py-1.5 bg-white shadow-2xs">
            <span className="font-sans text-[13.5px] font-bold tracking-wider text-slate-950 uppercase">
              {data.course.assignmentNo
                ? `Assignment No : ${data.course.assignmentNo}`
                : 'Assignment No : ____'}
            </span>
          </div>

          <div className="w-full max-w-[460px] mx-auto text-left font-academic text-[14px] leading-relaxed border-t border-b border-slate-300 py-3 my-1">
            <div className="grid grid-cols-[135px_14px_1fr] items-baseline py-1">
              <span className="font-bold text-slate-950">Course Code</span>
              <span className="font-bold text-slate-950">:</span>
              <span className="font-mono font-bold text-slate-950">
                {data.course.courseCode || ''}
              </span>
            </div>
            <div className="grid grid-cols-[135px_14px_1fr] items-baseline py-1">
              <span className="font-bold text-slate-950">Course Title</span>
              <span className="font-bold text-slate-950">:</span>
              <span className="font-serif font-semibold text-slate-900">
                {data.course.courseTitle || ''}
              </span>
            </div>
            {data.course.assignmentTitle && (
              <div className="grid grid-cols-[135px_14px_1fr] items-baseline py-1">
                <span className="font-bold text-slate-950">Assignment Title</span>
                <span className="font-bold text-slate-950">:</span>
                <span className="font-serif font-bold italic text-slate-950 leading-snug">
                  {data.course.assignmentTitle}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Lower Section */}
        <div className="my-2">
          {layoutStyle === 'side-by-side' ? (
            <div className="grid grid-cols-2 gap-6 items-start">
              {/* Left: Submitted To */}
              <div className="border border-slate-900/90 rounded-lg p-3.5 bg-white shadow-2xs min-h-[168px] flex flex-col justify-between">
                <div>
                  <div className="border-b-2 border-slate-950 pb-1 mb-2.5">
                    <h3 className="font-cinzel font-bold text-[13px] text-slate-950 uppercase tracking-wider">
                      Submitted To :
                    </h3>
                  </div>
                  <div className="space-y-1.5 font-academic text-[12.5px] leading-snug">
                    <div className="grid grid-cols-[72px_10px_1fr] items-baseline">
                      <span className="font-bold text-slate-950">Name</span>
                      <span className="font-bold text-slate-950">:</span>
                      <span className="font-bold text-slate-950">{data.teacher.name || ''}</span>
                    </div>
                    <div className="grid grid-cols-[72px_10px_1fr] items-baseline">
                      <span className="font-bold text-slate-950">Designation</span>
                      <span className="font-bold text-slate-950">:</span>
                      <span className="text-slate-900">{data.teacher.designation || ''}</span>
                    </div>
                    <div className="grid grid-cols-[72px_10px_1fr] items-baseline">
                      <span className="font-bold text-slate-950">Department</span>
                      <span className="font-bold text-slate-950">:</span>
                      <span className="text-slate-900">
                        {data.teacher.department
                          ? `Department of ${data.teacher.department}`
                          : ''}
                      </span>
                    </div>
                    <div className="grid grid-cols-[72px_10px_1fr] items-baseline">
                      <span className="font-bold text-slate-950">College</span>
                      <span className="font-bold text-slate-950">:</span>
                      <span className="text-slate-800 text-[11.5px]">
                        {data.institution.collegeName || ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Submitted By */}
              <div className="border border-slate-900/90 rounded-lg p-3.5 bg-white shadow-2xs min-h-[168px] flex flex-col justify-between">
                <div>
                  <div className="border-b-2 border-slate-950 pb-1 mb-2.5">
                    <h3 className="font-cinzel font-bold text-[13px] text-slate-950 uppercase tracking-wider">
                      Submitted By :
                    </h3>
                  </div>
                  <div className="space-y-1.5 font-academic text-[12.5px] leading-snug">
                    <div className="grid grid-cols-[80px_10px_1fr] items-baseline">
                      <span className="font-bold text-slate-950">Name</span>
                      <span className="font-bold text-slate-950">:</span>
                      <span className="font-bold text-slate-950">{data.student.name || ''}</span>
                    </div>
                    <div className="grid grid-cols-[80px_10px_1fr] items-baseline">
                      <span className="font-bold text-slate-950">Student ID</span>
                      <span className="font-bold text-slate-950">:</span>
                      <span className="font-mono font-semibold text-slate-950">
                        {data.student.studentId || ''}
                      </span>
                    </div>
                    <div className="grid grid-cols-[80px_10px_1fr] items-baseline">
                      <span className="font-bold text-slate-950">Department</span>
                      <span className="font-bold text-slate-950">:</span>
                      <span className="text-slate-900">{data.student.department || ''}</span>
                    </div>
                    <div className="grid grid-cols-[80px_10px_1fr] items-baseline">
                      <span className="font-bold text-slate-950">Roll</span>
                      <span className="font-bold text-slate-950">:</span>
                      <span className="font-mono text-slate-900">{data.student.roll || ''}</span>
                    </div>
                    <div className="grid grid-cols-[80px_10px_1fr] items-baseline">
                      <span className="font-bold text-slate-950">Year</span>
                      <span className="font-bold text-slate-950">:</span>
                      <span className="text-slate-900">{data.student.year || data.student.semester || ''}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Stacked */
            <div className="space-y-3 max-w-[480px] mx-auto">
              <div className="border border-slate-900 rounded-lg p-3 bg-white shadow-2xs">
                <div className="border-b border-slate-950 pb-1 mb-2">
                  <h3 className="font-cinzel font-bold text-[12.5px] text-slate-950 uppercase tracking-wider">
                    Submitted By :
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-academic text-[12px]">
                  <div className="flex gap-1.5">
                    <span className="font-bold text-slate-950">Name:</span>
                    <span className="font-bold text-slate-950">{data.student.name || ''}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="font-bold text-slate-950">ID:</span>
                    <span className="font-mono text-slate-950">{data.student.studentId || ''}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="font-bold text-slate-950">Dept:</span>
                    <span className="text-slate-900">{data.student.department || ''}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="font-bold text-slate-950">Roll:</span>
                    <span className="font-mono text-slate-900">{data.student.roll || ''}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="font-bold text-slate-950">Year:</span>
                    <span className="text-slate-900">{data.student.year || data.student.semester || ''}</span>
                  </div>
                </div>
              </div>

              <div className="border border-slate-900 rounded-lg p-3 bg-white shadow-2xs">
                <div className="border-b border-slate-950 pb-1 mb-2">
                  <h3 className="font-cinzel font-bold text-[12.5px] text-slate-950 uppercase tracking-wider">
                    Submitted To :
                  </h3>
                </div>
                <div className="space-y-1 font-academic text-[12px]">
                  <div className="flex gap-2">
                    <span className="font-bold text-slate-950 min-w-[80px]">Teacher:</span>
                    <span className="font-bold text-slate-950">{data.teacher.name || ''}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold text-slate-950 min-w-[80px]">Designation:</span>
                    <span className="text-slate-900">{data.teacher.designation || ''}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold text-slate-950 min-w-[80px]">Department:</span>
                    <span className="text-slate-900">
                      {data.teacher.department ? `Department of ${data.teacher.department}` : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Date */}
        <div className="text-center pt-2 pb-1 border-t border-slate-200">
          <p className="font-academic text-[13px] font-bold text-slate-950 tracking-wider">
            Date of Submission :{' '}
            <span className="font-mono font-semibold text-slate-900">
              {formattedDate || '_______________________'}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
