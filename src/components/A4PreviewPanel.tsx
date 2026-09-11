import React, { useState, useEffect, useRef } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Columns,
  Rows,
  Sparkles,
  Award,
  FileSpreadsheet,
} from 'lucide-react';
import { CoverPageData } from '../types';
import {
  TemplateStyle,
  LayoutStyle,
  ModernBlueTemplate,
  ClassicBlackTemplate,
  SpecialDepartmentTemplate,
  getDepartmentTemplate,
} from '../templates';

export type { TemplateStyle };

interface A4PreviewPanelProps {
  data: CoverPageData;
  onPrint?: () => void;
  onDownloadPdf?: () => void;
  isGeneratingPdf?: boolean;
}

export const A4PreviewPanel: React.FC<A4PreviewPanelProps> = ({
  data,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 480) return 0.42;
      if (window.innerWidth < 768) return 0.55;
      if (window.innerWidth < 1280) return 0.75;
    }
    return 0.82;
  });
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>(() => {
    if (typeof window !== 'undefined') {
      const urlLayout = new URLSearchParams(window.location.search).get('layout');
      if (urlLayout === 'stacked' || urlLayout === 'side-by-side') return urlLayout;
    }
    return 'side-by-side';
  });
  const [logoError, setLogoError] = useState<boolean>(false);

  // Resolve current department and its custom template if available
  const currentDept = (data.institution.department || data.student.department || '').trim();
  const deptTemplate = getDepartmentTemplate(currentDept);
  const hasDeptTemplate = !!deptTemplate;

  // Active template state:
  // Default to 'special' if current department has a special template, otherwise 'modern-blue'
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateStyle>(() => {
    if (typeof window !== 'undefined') {
      const urlTemplate = new URLSearchParams(window.location.search).get('template') as TemplateStyle | null;
      if (
        urlTemplate === 'modern-blue' ||
        urlTemplate === 'classic-black' ||
        urlTemplate === 'special' ||
        urlTemplate === 'accounting-sheet'
      ) {
        return urlTemplate;
      }
    }
    return deptTemplate ? 'special' : 'modern-blue';
  });

  // Track department changes to automatically show the selected department's template
  const prevDeptRef = useRef<string>(currentDept);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlTemplate = new URLSearchParams(window.location.search).get('template');
      if (urlTemplate) return;
    }
    if (prevDeptRef.current !== currentDept) {
      prevDeptRef.current = currentDept;
      if (deptTemplate) {
        // Automatically switch to this department's special template
        setSelectedTemplate('special');
      } else if (selectedTemplate === 'special' || selectedTemplate === 'accounting-sheet') {
        // Fallback to modern-blue if the department has no custom template
        setSelectedTemplate('modern-blue');
      }
    } else {
      // If template was set to 'special' or 'accounting-sheet' but no template exists
      if (!deptTemplate && (selectedTemplate === 'special' || selectedTemplate === 'accounting-sheet')) {
        setSelectedTemplate('modern-blue');
      }
    }
  }, [currentDept, deptTemplate, selectedTemplate]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(1.4, +(prev + 0.1).toFixed(2)));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(0.35, +(prev - 0.1).toFixed(2)));
  const handleResetZoom = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 480) return setZoomLevel(0.42);
      if (window.innerWidth < 768) return setZoomLevel(0.55);
      if (window.innerWidth < 1280) return setZoomLevel(0.75);
    }
    setZoomLevel(0.82);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Preview Control Bar */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs mb-3 space-y-2.5 print:hidden">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              A4 Assignment Cover
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
              210mm × 297mm
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-[11px] text-slate-600 font-mono font-semibold">
              {Math.round(zoomLevel * 100)}%
            </span>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Zoom Controls */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              <button
                type="button"
                id="preview-btn-zoom-out"
                onClick={handleZoomOut}
                className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                id="preview-btn-zoom-reset"
                onClick={handleResetZoom}
                className="px-1.5 py-0.5 text-[11px] text-slate-600 hover:text-slate-900 hover:bg-white rounded font-mono font-medium transition-colors cursor-pointer"
                title="Fit to Screen"
              >
                Fit
              </button>
              <button
                type="button"
                id="preview-btn-zoom-in"
                onClick={handleZoomIn}
                className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Template Selector Row */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-[11.5px] text-slate-600 font-medium">
            <span>Template Design:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Template 1: Blue frame */}
            <button
              type="button"
              id="template-btn-modern-blue"
              onClick={() => setSelectedTemplate('modern-blue')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                selectedTemplate === 'modern-blue'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Blue frame</span>
            </button>

            {/* Template 2: Classic */}
            <button
              type="button"
              id="template-btn-classic-black"
              onClick={() => setSelectedTemplate('classic-black')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                selectedTemplate === 'classic-black'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Classic</span>
            </button>

            {/* Template 3: Special Department Template - ONLY available when selected department has a custom template */}
            {hasDeptTemplate && (
              <button
                type="button"
                id="template-btn-special"
                onClick={() => setSelectedTemplate('special')}
                title={`Special ${deptTemplate.displayName} Department Template`}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedTemplate === 'special' || selectedTemplate === 'accounting-sheet'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Special</span>
                <span className="text-[10px] opacity-90 font-normal hidden sm:inline">
                  [{deptTemplate.displayName}]
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Layout Row - Below Template Design */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-[11.5px] text-slate-600 font-medium">
            <span>Layout:</span>
          </div>

          {/* Layout Mode Toggle (Side-by-Side 2-Col vs Stacked) */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              type="button"
              id="preview-btn-layout-side"
              onClick={() => setLayoutStyle('side-by-side')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer ${
                layoutStyle === 'side-by-side'
                  ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Side-by-Side 2 Columns (Standard)"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>2-Col</span>
            </button>
            <button
              type="button"
              id="preview-btn-layout-stacked"
              onClick={() => setLayoutStyle('stacked')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer ${
                layoutStyle === 'stacked'
                  ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Stacked Layout"
            >
              <Rows className="w-3.5 h-3.5" />
              <span>Stacked</span>
            </button>
          </div>
        </div>
      </div>

      {/* A4 Workspace Stage */}
      <div
        id="a4-cover-stage"
        className="flex-1 overflow-auto bg-slate-200/80 rounded-xl p-4 sm:p-6 lg:p-8 flex justify-center items-start border border-slate-300 shadow-inner min-h-[600px] print:p-0 print:m-0 print:border-none print:bg-transparent print:min-h-0 print:shadow-none"
      >
        <div
          id="a4-cover-sheet-wrapper"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
          className="transition-transform duration-150 ease-out print:transform-none print:p-0 print:m-0"
        >
          {/* ====================================================================
              ACTUAL A4 DOCUMENT SHEET (210mm × 297mm True A4 Aspect Ratio)
             ==================================================================== */}
          {(() => {
            const isSpecialActive =
              (selectedTemplate === 'special' || selectedTemplate === 'accounting-sheet') &&
              Boolean(deptTemplate);

            return (
              <div
                id="a4-cover-sheet"
                style={
                  isSpecialActive && deptTemplate
                    ? {
                        backgroundImage: `url("${deptTemplate.imageUrl}")`,
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: '#ffffff',
                      }
                    : {
                        backgroundColor: '#ffffff',
                      }
                }
                className="w-[210mm] h-[297mm] min-h-[297mm] max-h-[297mm] text-slate-950 shadow-2xl mx-auto relative box-border overflow-hidden select-text flex flex-col justify-between print:shadow-none print:m-0 print:w-[210mm] print:h-[297mm] print:min-h-[297mm] print:max-h-[297mm]"
              >
                {/* Background template image layer for guaranteed crisp PDF export & print rendering */}
                {isSpecialActive && deptTemplate && (
                  <img
                    src={deptTemplate.imageUrl}
                    alt={`${deptTemplate.displayName} Template Background`}
                    crossOrigin="anonymous"
                    className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0"
                  />
                )}

                {/* TEMPLATE 1: Modern Blue */}
                {selectedTemplate === 'modern-blue' && (
                  <ModernBlueTemplate
                    data={data}
                    layoutStyle={layoutStyle}
                    logoError={logoError}
                    onLogoError={() => setLogoError(true)}
                  />
                )}

                {/* TEMPLATE 2: Classic Black */}
                {selectedTemplate === 'classic-black' && (
                  <ClassicBlackTemplate
                    data={data}
                    layoutStyle={layoutStyle}
                    logoError={logoError}
                    onLogoError={() => setLogoError(true)}
                  />
                )}

                {/* TEMPLATE 3: Special Department Template */}
                {isSpecialActive && (
                  <SpecialDepartmentTemplate
                    data={data}
                    layoutStyle={layoutStyle}
                    logoError={logoError}
                    onLogoError={() => setLogoError(true)}
                  />
                )}

                {/* Fallback to Modern Blue if special template was active but department has no template */}
                {!isSpecialActive &&
                  selectedTemplate !== 'modern-blue' &&
                  selectedTemplate !== 'classic-black' && (
                    <ModernBlueTemplate
                      data={data}
                      layoutStyle={layoutStyle}
                      logoError={logoError}
                      onLogoError={() => setLogoError(true)}
                    />
                  )}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};
