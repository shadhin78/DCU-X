import React, { useState } from 'react';
import { Header } from './components/Header';
import { FormPanel } from './components/FormPanel';
import { A4PreviewPanel } from './components/A4PreviewPanel';
import { useAssignmentCover } from './hooks/useAssignmentCover';
import { downloadCoverPagePdf } from './utils/pdfExport';
import { CheckCircle2, ArrowUp } from 'lucide-react';

export default function App() {
  const {
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
  } = useAssignmentCover();

  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleScrollToPreview = () => {
    const previewEl = document.getElementById('a4-preview-section');
    if (previewEl) {
      previewEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToForm = () => {
    const formEl = document.getElementById('assignment-cover-editor-section');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadPdf = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    setDownloadNotice(null);

    try {
      await downloadCoverPagePdf({
        studentName: data.student.name,
        assignmentNo: data.course.assignmentNo,
      });
      const name = data.student.name?.trim() || 'Student';
      setDownloadNotice(`Cover page for ${name} exported to A4 PDF successfully!`);
      setTimeout(() => setDownloadNotice(null), 4500);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Unable to generate PDF. Please try again or use the Print button to Save as PDF.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleResetWithConfirm = () => {
    if (
      window.confirm(
        'Are you sure you want to reset the form? This will clear all entered information and cannot be undone.'
      )
    ) {
      resetForm();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Main Header with Required Buttons and "Saved locally" Status */}
      <Header
        onPrint={handlePrint}
        onDownloadPdf={handleDownloadPdf}
        onPreview={handleScrollToPreview}
        isGeneratingPdf={isGeneratingPdf}
        onReset={handleResetWithConfirm}
        onLoadSample={fillSampleData}
        lastSaved={lastSaved}
      />

      {/* Success Notification Banner */}
      {downloadNotice && (
        <div
          id="pdf-download-toast"
          className="fixed bottom-5 right-5 z-50 bg-emerald-800 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2.5 text-xs font-medium border border-emerald-700 animate-in fade-in slide-in-from-bottom-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Floating "Back to Top / Form" button on mobile */}
      <button
        type="button"
        id="btn-scroll-to-form-mobile"
        onClick={handleScrollToForm}
        className="lg:hidden fixed bottom-5 left-5 z-40 bg-white/95 backdrop-blur text-slate-700 hover:text-slate-950 border border-slate-300 shadow-md p-2.5 rounded-full flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
        title="Scroll to Form Editor"
      >
        <ArrowUp className="w-4 h-4 text-emerald-700" />
        <span className="text-[11px]">Edit Form</span>
      </button>

      {/* Main Layout:
          DESKTOP: Two-column grid (Editor on Left, Sticky A4 Preview on Right)
          MOBILE: Stacked vertically (Form on top ↓ A4 Preview below)
      */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3.5 sm:p-5 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Assignment Cover Editor */}
          <div
            id="assignment-cover-editor-section"
            className="lg:col-span-5 xl:col-span-5 w-full print:hidden"
          >
            <FormPanel
              data={data}
              onUpdateInstitution={updateInstitution}
              onUpdateCourse={updateCourse}
              onUpdateStudent={updateStudent}
              onUpdateTeacher={updateTeacher}
              onUpdateDates={updateDates}
              onSyncStudentDept={syncStudentDepartment}
              onSyncTeacherDept={syncTeacherDepartment}
              onReset={handleResetWithConfirm}
              onLoadSample={fillSampleData}
              onPreview={handleScrollToPreview}
              onPrint={handlePrint}
              onDownloadPdf={handleDownloadPdf}
              isGeneratingPdf={isGeneratingPdf}
            />
          </div>

          {/* Right Column: Live A4 Preview (Sticky on desktop, stacked below on mobile) */}
          <div
            id="a4-preview-section"
            className="lg:col-span-7 xl:col-span-7 w-full lg:sticky lg:top-4 self-start"
          >
            <A4PreviewPanel
              data={data}
              onPrint={handlePrint}
              onDownloadPdf={handleDownloadPdf}
              isGeneratingPdf={isGeneratingPdf}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
