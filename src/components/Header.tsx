import React from 'react';
import {
  FileText,
  Printer,
  RotateCcw,
  Download,
  Loader2,
  Eye,
} from 'lucide-react';

interface HeaderProps {
  onPrint: () => void;
  onDownloadPdf: () => void;
  onPreview?: () => void;
  isGeneratingPdf?: boolean;
  onReset: () => void;
  onLoadSample?: () => void;
  lastSaved?: Date | null;
}

export const Header: React.FC<HeaderProps> = ({
  onPrint,
  onDownloadPdf,
  onPreview,
  isGeneratingPdf = false,
  onReset,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-3.5 sm:px-6 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left: Branding */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-base font-bold text-slate-900 leading-tight truncate">
                Titumir Assignment Cover Generator
              </h1>
              <span className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                GTC Dhaka
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
              Government Titumir College • Dhaka Central University
            </p>
          </div>
        </div>

        {/* Right: Actions: Reset, Preview, Print, Download PDF - Single Row on Phone */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap justify-between md:justify-end w-full md:w-auto">
          {/* Reset Button */}
          <button
            type="button"
            id="btn-reset-form"
            onClick={onReset}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-medium text-slate-600 hover:text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-lg transition-colors cursor-pointer shrink-0"
            title="Reset form fields with confirmation"
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0" />
            <span>Reset</span>
          </button>

          {/* Preview Button */}
          {onPreview && (
            <button
              type="button"
              id="btn-preview-cover"
              onClick={onPreview}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-300 rounded-lg transition-colors cursor-pointer shrink-0"
              title="Jump to live A4 Preview"
            >
              <Eye className="w-3.5 h-3.5 text-slate-700 shrink-0" />
              <span>Preview</span>
            </button>
          )}

          {/* Print Button */}
          <button
            type="button"
            id="btn-print-cover"
            onClick={onPrint}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer shrink-0"
            title="Open browser print dialog"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span>Print</span>
          </button>

          {/* Download PDF Button */}
          <button
            type="button"
            id="btn-download-pdf"
            onClick={onDownloadPdf}
            disabled={isGeneratingPdf}
            className="flex-[1.2] md:flex-initial inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 rounded-lg shadow-xs transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            title="Generate and download exact single-page A4 PDF"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                <span className="hidden sm:inline">Generating...</span>
                <span className="sm:hidden">...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">Download</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
