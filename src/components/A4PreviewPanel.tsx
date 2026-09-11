import React, { useState, useEffect } from 'react';
import {
  Printer,
  ZoomIn,
  ZoomOut,
  Columns,
  Rows,
  Sparkles,
  Award,
  FileSpreadsheet,
  Download,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { CoverPageData } from '../types';
import { downloadCoverPagePdf } from '../utils/pdfExport';
import {
  TemplateStyle,
  LayoutStyle,
  ModernBlueTemplate,
  ClassicBlackTemplate,
  AccountingSheetTemplate,
} from '../templates';

export type { TemplateStyle };

interface A4PreviewPanelProps {
  data: CoverPageData;
  onPrint: () => void;
  onDownloadPdf?: () => void;
  isGeneratingPdf?: boolean;
}

export const A4PreviewPanel: React.FC<A4PreviewPanelProps> = ({
  data,
  onPrint,
  onDownloadPdf,
  isGeneratingPdf = false,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 480) return 0.42;
      if (window.innerWidth < 768) return 0.55;
      if (window.innerWidth < 1280) return 0.75;
    }
    return 0.82;
  });
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>('side-by-side');
  const [logoError, setLogoError] = useState<boolean>(false);
  const [localDownloading, setLocalDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const prevGeneratingRef = React.useRef(isGeneratingPdf);
  useEffect(() => {
    if (prevGeneratingRef.current && !isGeneratingPdf) {
      setDownloadSuccess(true);
      const timer = setTimeout(() => setDownloadSuccess(false), 3500);
      return () => clearTimeout(timer);
    }
    prevGeneratingRef.current = isGeneratingPdf;
  }, [isGeneratingPdf]);

  const isDownloading = isGeneratingPdf || localDownloading;

  const handleInternalDownloadPdf = async () => {
    if (isDownloading) return;
    if (onDownloadPdf) {
      onDownloadPdf();
      return;
    }

    setLocalDownloading(true);
    setDownloadSuccess(false);
    try {
      await downloadCoverPagePdf({
        studentName: data.student.name,
        assignmentNo: data.course.assignmentNo,
      });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to export PDF:', err);
      alert('Could not generate PDF. Please try again.');
    } finally {
      setLocalDownloading(false);
    }
  };

  // Detect if current department is Accounting
  const isAccountingDept =
    (data.institution.department || '').trim().toLowerCase().includes('accounting') ||
    (data.student.department || '').trim().toLowerCase().includes('accounting');

  // Active template state:
  // Default to 'accounting-sheet' for Accounting, 'modern-blue' for others
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateStyle>(() => {
    return isAccountingDept ? 'accounting-sheet' : 'modern-blue';
  });

  // Strict enforcement:
  // If department is NOT Accounting, the accounting template must not be active
  useEffect(() => {
    if (isAccountingDept) {
      setSelectedTemplate('accounting-sheet');
    } else if (selectedTemplate === 'accounting-sheet') {
      setSelectedTemplate('modern-blue');
    }
  }, [isAccountingDept]);

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

            {/* Download PDF Button */}
            <button
              type="button"
              id="preview-btn-download-pdf"
              onClick={handleInternalDownloadPdf}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg transition-all shadow-xs cursor-pointer"
              title="Download A4 Cover Page as PDF (Single Page)"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            {/* Print Button */}
            <button
              type="button"
              id="preview-btn-print"
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg transition-all border border-slate-200 shadow-2xs cursor-pointer"
              title="Print Cover via Browser Dialog"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print</span>
            </button>
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

            {/* Template 3: acc-x - ONLY available for Accounting department */}
            {isAccountingDept && (
              <button
                type="button"
                id="template-btn-accounting"
                onClick={() => setSelectedTemplate('accounting-sheet')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedTemplate === 'accounting-sheet'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>acc-x</span>
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
          <div
            id="a4-cover-sheet"
            style={
              isAccountingDept && selectedTemplate === 'accounting-sheet'
                ? {
                    backgroundImage: 'url("/accountingdept-template.png")',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#ffffff',
                  }
                : {
                    backgroundColor: '#ffffff',
                  }
            }
            className="w-[210mm] h-[297mm] min-h-[297mm] max-h-[297mm] text-slate-950 shadow-2xl mx-auto relative box-border overflow-hidden select-text flex flex-col justify-between print:shadow-none print:m-0"
          >
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

            {/* TEMPLATE 3: Accounting Sheet (Accounting Department only) */}
            {isAccountingDept && selectedTemplate === 'accounting-sheet' && (
              <AccountingSheetTemplate
                data={data}
                layoutStyle={layoutStyle}
                logoError={logoError}
                onLogoError={() => setLogoError(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
