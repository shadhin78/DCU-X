import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FormPanel } from './components/FormPanel';
import { A4PreviewPanel } from './components/A4PreviewPanel';
import { AppInstallSection } from './components/AppInstallSection';
import { PrivacyPage } from './components/PrivacyPage';
import { AboutPage } from './components/AboutPage';
import { useAssignmentCover } from './hooks/useAssignmentCover';
import { downloadCoverPagePdf } from './utils/pdfExport';
import { CheckCircle2, ArrowUp, RefreshCw, WifiOff, ShieldCheck } from 'lucide-react';
import type { PwaUpdateEventDetail } from './registerServiceWorker';

type ViewMode = 'generator' | 'privacy' | 'about';

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
  const [updateApplyFn, setUpdateApplyFn] = useState<(() => void) | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(() => (typeof navigator !== 'undefined' ? !navigator.onLine : false));

  // Navigation view state (URL hash synced: #privacy, #about)
  const [currentView, setCurrentView] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const page = new URLSearchParams(window.location.search).get('page');
      if (hash === '#privacy' || hash === '#/privacy' || page === 'privacy') {
        return 'privacy';
      }
      if (hash === '#about' || hash === '#/about' || page === 'about') {
        return 'about';
      }
    }
    return 'generator';
  });

  useEffect(() => {
    const handleUrlChange = () => {
      const hash = window.location.hash.toLowerCase();
      const page = new URLSearchParams(window.location.search).get('page');
      if (hash === '#privacy' || hash === '#/privacy' || page === 'privacy') {
        setCurrentView('privacy');
      } else if (hash === '#about' || hash === '#/about' || page === 'about') {
        setCurrentView('about');
      } else {
        setCurrentView('generator');
      }
    };

    const handleUpdate = (e: CustomEvent<PwaUpdateEventDetail>) => {
      if (e.detail && typeof e.detail.applyUpdate === 'function') {
        setUpdateApplyFn(() => e.detail.applyUpdate);
      }
    };

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('pwa-update-available', handleUpdate as EventListener);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('pwa-update-available', handleUpdate as EventListener);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navigateToPrivacy = () => {
    if (window.location.hash !== '#privacy') {
      window.history.pushState(null, '', '#privacy');
    }
    setCurrentView('privacy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAbout = () => {
    if (window.location.hash !== '#about') {
      window.history.pushState(null, '', '#about');
    }
    setCurrentView('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToGenerator = () => {
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
    setCurrentView('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        collegeName: data.institution.collegeName,
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

  // If user is viewing the Privacy page
  if (currentView === 'privacy') {
    return <PrivacyPage onBack={navigateToGenerator} />;
  }

  // If user is viewing the About Us page
  if (currentView === 'about') {
    return <AboutPage onBack={navigateToGenerator} />;
  }

  // Primary Generator View
  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Main Header with Action Buttons */}
      <Header
        onPrint={handlePrint}
        onDownloadPdf={handleDownloadPdf}
        onPreview={handleScrollToPreview}
        isGeneratingPdf={isGeneratingPdf}
        onReset={handleResetWithConfirm}
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

      {/* PWA Update Notification Banner */}
      {updateApplyFn && (
        <div
          id="pwa-update-banner"
          className="fixed bottom-16 sm:bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-medium border border-slate-700 animate-in fade-in slide-in-from-bottom-2"
        >
          <RefreshCw className="w-4 h-4 text-emerald-400 shrink-0 animate-spin-reverse" />
          <span>A new version of DCU-X is available.</span>
          <div className="flex items-center gap-2 ml-1">
            <button
              type="button"
              onClick={() => updateApplyFn()}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setUpdateApplyFn(null)}
              className="text-slate-400 hover:text-slate-200 text-[11px] px-1.5 py-0.5 rounded transition-colors cursor-pointer"
            >
              Later
            </button>
          </div>
        </div>
      )}

      {/* Offline Status Badge */}
      {isOffline && (
        <aside
          aria-label="Offline Mode Notification"
          id="pwa-offline-badge"
          className="fixed bottom-16 sm:bottom-5 left-5 z-40 bg-amber-950/90 text-amber-100 backdrop-blur px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 text-[11px] font-medium border border-amber-800/80 animate-in fade-in"
        >
          <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Offline mode (saved locally)</span>
        </aside>
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
              onPrint={handlePrint}
              onDownloadPdf={handleDownloadPdf}
              isGeneratingPdf={isGeneratingPdf}
            />
          </div>

          {/* Right Column: Live A4 Preview & App Install Section */}
          <div
            id="a4-preview-section"
            className="lg:col-span-7 xl:col-span-7 w-full self-start flex flex-col gap-4"
          >
            {/* Live A4 Sheet Preview */}
            <A4PreviewPanel data={data} />

            {/* App Install Now Section with Privacy & About Us Hyperlinks */}
            <AppInstallSection
              onOpenPrivacy={navigateToPrivacy}
              onOpenAbout={navigateToAbout}
            />
          </div>
        </div>
      </main>

      {/* Footer with About Us & Privacy Policy */}
      <footer className="w-full py-5 text-xs text-slate-500 border-t border-slate-200 mt-8 print:hidden bg-white/50 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} Dhaka Central University Assignment Cover Generator (DCU-X).</p>

          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
            <button
              type="button"
              id="footer-link-about"
              onClick={navigateToAbout}
              className="text-slate-600 hover:text-emerald-700 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
            >
              About Us
            </button>
            <span className="text-slate-300">|</span>
            <button
              type="button"
              id="footer-link-privacy"
              onClick={navigateToPrivacy}
              className="text-slate-600 hover:text-emerald-700 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-300">|</span>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Client-Side
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
