import React from 'react';
import {
  FileText,
  Printer,
  RotateCcw,
  Sparkles,
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
  onLoadSample: () => void;
  lastSaved: Date | null;
}

export const Header: React.FC<HeaderProps> = ({
  onPrint,
  onDownloadPdf,
  onPreview,
  isGeneratingPdf = false,
  onReset,
  onLoadSample,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-3.5 sm:px-6 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left: Branding & Status */}
        <div className="flex items-center justify-between sm:justify-start gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                  Titumir Assignment Cover Generator
                </h1>
                <span className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  GTC Dhaka
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Government Titumir College • Affiliated with University of Dhaka
              </p>
            </div>
          </div>

          {/* Small Status Indicator: "Saved locally" */}
          <div
            id="header-status-saved-locally"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs"
            title="All changes are automatically saved locally in your browser storage"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="font-semibold text-[11px] sm:text-xs">Saved locally</span>
          </div>
        </div>

        {/* Right: Required Actions: Preview, Print, Download PDF, Reset */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">
          {/* Sample Data helper */}
          <button
            type="button"
            id="btn-load-sample"
            onClick={onLoadSample}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title="Populate with sample assignment information"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Sample Data</span>
            <span className="sm:hidden">Sample</span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            id="btn-reset-form"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-lg transition-colors cursor-pointer"
            title="Reset form fields with confirmation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {/* Preview Button */}
          {onPreview && (
            <button
              type="button"
              id="btn-preview-cover"
              onClick={onPreview}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-300 rounded-lg transition-colors cursor-pointer"
              title="Jump to live A4 Preview"
            >
              <Eye className="w-3.5 h-3.5 text-slate-700" />
              <span>Preview</span>
            </button>
          )}

          {/* Print Button */}
          <button
            type="button"
            id="btn-print-cover"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
            title="Open browser print dialog"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Print</span>
          </button>

          {/* Download PDF Button */}
          <button
            type="button"
            id="btn-download-pdf"
            onClick={onDownloadPdf}
            disabled={isGeneratingPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 rounded-lg shadow-xs transition-colors cursor-pointer"
            title="Generate and download exact single-page A4 PDF"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
