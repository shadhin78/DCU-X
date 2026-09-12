import React from 'react';
import { TemplateProps, formatLongDate } from './types';

export const SpecialDepartmentTemplate: React.FC<TemplateProps> = ({
  data,
  layoutStyle,
  logoError,
  onLogoError,
}) => {
  const formattedDate = formatLongDate(data.dates.submissionDate);

  return (
    <div className="relative z-20 w-full h-full px-[18mm] pt-[18mm] pb-[14mm] flex flex-col justify-between box-border">
      {/* Top Section */}
      <div className="text-center flex flex-col items-center shrink-0">
        <div className="mb-2 h-[66px] flex items-center justify-center">
          {!logoError ? (
            <img
              src="/logo.png"
              alt="Government Titumir College Logo"
              crossOrigin="anonymous"
              onError={onLogoError}
              className="h-[64px] w-auto max-w-[95px] object-contain drop-shadow-2xs"
            />
          ) : (
            <div className="w-[62px] h-[62px] rounded-full border-2 border-slate-900 flex flex-col items-center justify-center bg-emerald-50 text-slate-900 shadow-2xs">
              <div className="w-[54px] h-[54px] rounded-full border border-dashed border-slate-700 flex flex-col items-center justify-center p-1 text-center">
                <span className="font-cinzel text-[10.5px] font-bold leading-tight">GTC</span>
                <span className="text-[7px] font-sans font-semibold tracking-wider text-slate-700 uppercase">
                  Estd 1968
                </span>
              </div>
            </div>
          )}
        </div>

        <h1 className="font-cinzel font-black text-[21px] tracking-[0.06em] text-slate-950 uppercase leading-tight">
          {data.institution.collegeName || 'Government Titumir College'}
        </h1>
        <p className="font-sans text-[10px] tracking-[0.2em] font-semibold text-slate-700 uppercase mt-0.5">
          Dhaka Central University
        </p>

        <div className="mt-2 space-y-0.5">
          {data.institution.faculty && (
            <p className="font-sans text-[11.5px] font-semibold text-slate-800 uppercase tracking-widest">
              {data.institution.faculty}
            </p>
          )}
          {data.institution.department && (
            <p className="font-academic font-bold text-[15.5px] text-slate-950 tracking-wide">
              Department of {data.institution.department}
            </p>
          )}
        </div>

        <div className="w-full max-w-[340px] mx-auto my-2.5 flex items-center justify-center">
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
      <div className="text-center flex flex-col items-center py-1">
        <h2 className="font-cinzel font-black text-[24px] tracking-[0.28em] text-slate-950 uppercase">
          A S S I G N M E N T
        </h2>

        <div className="mt-3.5 mb-7 inline-block border-2 border-slate-950 rounded-lg px-5 py-1 bg-white shadow-2xs">
          <span className="font-sans text-[13px] font-bold tracking-wider text-slate-950">
            {data.course.assignmentNo
              ? `Assignment No: ${data.course.assignmentNo}`
              : 'Assignment No: ____'}
          </span>
        </div>

        <div className="w-full max-w-[460px] mx-auto text-left font-academic text-[13.5px] leading-relaxed border-t border-b border-slate-300 py-2 my-0.5">
          <div className="grid grid-cols-[135px_14px_1fr] items-baseline py-0.5">
            <span className="font-bold text-slate-950">Course Code</span>
            <span className="font-bold text-slate-950">:</span>
            <span className="font-mono font-bold text-slate-950">
              {data.course.courseCode || ''}
            </span>
          </div>
          <div className="grid grid-cols-[135px_14px_1fr] items-baseline py-0.5">
            <span className="font-bold text-slate-950">Course Title</span>
            <span className="font-bold text-slate-950">:</span>
            <span className="font-serif font-semibold text-slate-900">
              {data.course.courseTitle || ''}
            </span>
          </div>
          <div className="grid grid-cols-[135px_14px_1fr] items-baseline py-0.5">
            <span className="font-bold text-slate-950">Assignment Title</span>
            <span className="font-bold text-slate-950">:</span>
            <span className="font-serif font-bold text-slate-950 leading-snug">
              {data.course.assignmentTitle || ''}
            </span>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="my-1.5">
        {layoutStyle === 'side-by-side' ? (
          <div className="grid grid-cols-2 gap-5 items-stretch">
            {/* Left: Submitted By */}
            <div className="border border-slate-900/90 rounded-lg p-4 bg-white/95 shadow-2xs flex flex-col justify-between backdrop-blur-xs h-full min-w-0 w-full box-border">
              <div>
                <div className="border-b-2 border-slate-950 pb-1.5 mb-2.5">
                  <h3 className="font-cinzel font-bold text-[15px] text-slate-950 uppercase tracking-wider">
                    Submitted By
                  </h3>
                </div>
                <div className="space-y-2 font-academic text-[15px] leading-snug">
                  <div className="grid grid-cols-[110px_14px_1fr] items-baseline">
                    <span className="font-bold text-slate-950">Name</span>
                    <span className="font-bold text-slate-950">:</span>
                    <span className="font-bold text-slate-950 break-words min-w-0">{data.student.name || ''}</span>
                  </div>
                  <div className="grid grid-cols-[110px_14px_1fr] items-baseline">
                    <span className="font-bold text-slate-950">Roll</span>
                    <span className="font-bold text-slate-950">:</span>
                    <span className="font-mono font-bold text-slate-950 break-words min-w-0">{data.student.roll || ''}</span>
                  </div>
                  <div className="grid grid-cols-[110px_14px_1fr] items-baseline">
                    <span className="font-bold text-slate-950">Department</span>
                    <span className="font-bold text-slate-950">:</span>
                    <span className="text-slate-900 break-words min-w-0">{data.student.department || ''}</span>
                  </div>
                  <div className="grid grid-cols-[110px_14px_1fr] items-baseline">
                    <span className="font-bold text-slate-950">Year</span>
                    <span className="font-bold text-slate-950">:</span>
                    <span className="text-slate-900 break-words min-w-0">{data.student.year || data.student.semester || ''}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Submitted To */}
            <div className="border border-slate-900/90 rounded-lg p-4 bg-white/95 shadow-2xs flex flex-col justify-between backdrop-blur-xs h-full min-w-0 w-full box-border">
              <div>
                <div className="border-b-2 border-slate-950 pb-1.5 mb-2.5">
                  <h3 className="font-cinzel font-bold text-[15px] text-slate-950 uppercase tracking-wider">
                    Submitted To
                  </h3>
                </div>
                <div className="space-y-2 font-academic text-[15px] leading-snug">
                  <div className="grid grid-cols-[110px_14px_1fr] items-baseline">
                    <span className="font-bold text-slate-950">Name</span>
                    <span className="font-bold text-slate-950">:</span>
                    <span className="font-bold text-slate-950 break-words min-w-0">{data.teacher.name || ''}</span>
                  </div>
                  <div className="grid grid-cols-[110px_14px_1fr] items-baseline">
                    <span className="font-bold text-slate-950">Designation</span>
                    <span className="font-bold text-slate-950">:</span>
                    <span className="text-slate-900 break-words min-w-0">{data.teacher.designation || ''}</span>
                  </div>
                  <div className="grid grid-cols-[110px_14px_1fr] items-baseline">
                    <span className="font-bold text-slate-950">Department</span>
                    <span className="font-bold text-slate-950">:</span>
                    <span className="text-slate-900 break-words min-w-0">
                      {data.teacher.department ? `Department of ${data.teacher.department}` : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-[110px_14px_1fr] items-baseline">
                    <span className="font-bold text-slate-950">College</span>
                    <span className="font-bold text-slate-950">:</span>
                    <span className="text-slate-800 text-[13.5px] break-words min-w-0">
                      {data.institution.collegeName || ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Stacked */
          <div className="space-y-2.5 max-w-[480px] mx-auto">
            <div className="border border-slate-900 rounded-lg p-2.5 bg-white/95 shadow-2xs backdrop-blur-xs">
              <div className="border-b border-slate-950 pb-1 mb-1.5">
                <h3 className="font-cinzel font-bold text-[14.5px] text-slate-950 uppercase tracking-wider">
                  Submitted By
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-academic text-[13.5px]">
                <div className="flex gap-1.5">
                  <span className="font-bold text-slate-950">Name:</span>
                  <span className="font-bold text-slate-950">{data.student.name || ''}</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="font-bold text-slate-950">Roll:</span>
                  <span className="font-mono font-bold text-slate-950">{data.student.roll || ''}</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="font-bold text-slate-950">Dept:</span>
                  <span className="text-slate-900">{data.student.department || ''}</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="font-bold text-slate-950">Year:</span>
                  <span className="text-slate-900">{data.student.year || data.student.semester || ''}</span>
                </div>
              </div>
            </div>

            <div className="border border-slate-900 rounded-lg p-3 bg-white/95 shadow-2xs backdrop-blur-xs">
              <div className="border-b border-slate-950 pb-1 mb-1.5">
                <h3 className="font-cinzel font-bold text-[14.5px] text-slate-950 uppercase tracking-wider">
                  Submitted To
                </h3>
              </div>
              <div className="space-y-1.5 font-academic text-[13.5px]">
                <div className="flex gap-2">
                  <span className="font-bold text-slate-950 min-w-[96px]">Teacher:</span>
                  <span className="font-bold text-slate-950">{data.teacher.name || ''}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-slate-950 min-w-[96px]">Designation:</span>
                  <span className="text-slate-900">{data.teacher.designation || ''}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-slate-950 min-w-[96px]">Department:</span>
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
      <div className="text-center pt-1.5 pb-0.5 border-t border-slate-300/80 shrink-0">
        <p className="font-academic text-[13px] font-bold text-slate-950 tracking-wider">
          Date of Submission :{' '}
          <span className="font-mono font-semibold text-slate-900">
            {formattedDate || '_______________________'}
          </span>
        </p>
      </div>
    </div>
  );
};
export const AccountingSheetTemplate = SpecialDepartmentTemplate;
