import React from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  HardDrive,
  Cpu,
  Trash2,
  FileCheck,
  HelpCircle,
  EyeOff,
  CheckCircle2,
  WifiOff,
  Database,
  Layers,
} from 'lucide-react';

interface PrivacyPageProps {
  onBack: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-100/70 font-sans text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900 pb-16">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-3.5 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            id="btn-back-to-generator"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
            title="Return to Cover Page Generator"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Generator</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 truncate">
              DCU Cover page Generator
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Privacy &amp; Data Security
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-500 flex items-center gap-1.5">
          <button
            type="button"
            onClick={onBack}
            className="hover:text-emerald-700 underline underline-offset-2 cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-800 font-medium">Privacy Policy &amp; Data Security</span>
        </nav>

        {/* Hero Header Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md mt-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Privacy Policy &amp; Data Security
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                Learn how DCU-X safeguards your student data, stores your form drafts locally, and guarantees 100% client-side privacy with zero remote telemetry.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  100% Client-Side
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 font-semibold border border-blue-200">
                  <Lock className="w-3.5 h-3.5 text-blue-600" />
                  Zero Cloud Database
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 font-semibold border border-purple-200">
                  <HardDrive className="w-3.5 h-3.5 text-purple-600" />
                  Local Device Storage Only
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                  <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                  Offline Functional
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Core Privacy Guarantee */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs mb-6">
          <div className="flex items-center gap-2.5 mb-3 text-slate-900">
            <Lock className="w-5 h-5 text-emerald-700 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold">1. Our Core Privacy Commitment</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            At DCU-X, student privacy and data sovereignty are fundamental principles. Generating an academic cover page should never require transmitting sensitive academic credentials, student roll numbers, course titles, teacher names, or institutional details across remote servers or third-party databases.
          </p>
          <div className="mt-4 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
            <p className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              Direct Student Guarantee:
            </p>
            <p className="leading-relaxed">
              We do not collect, monetize, log, track, or sell your personal or academic information. Everything you input into this generator exists solely inside your current browser session and your device&apos;s local memory.
            </p>
          </div>
        </section>

        {/* Section 2: How User Data is Kept Safe */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs mb-6">
          <div className="flex items-center gap-2.5 mb-4 text-slate-900">
            <Cpu className="w-5 h-5 text-blue-600 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold">2. How Your Data is Kept Safe</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2 mb-1.5">
                <Cpu className="w-4 h-4 text-blue-600" />
                100% In-Browser Execution
              </h3>
              <p className="text-slate-600 leading-relaxed">
                All form computations, text validation, date formatting, custom department handling, and live A4 preview renderings execute entirely on your device via client-side JavaScript.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2 mb-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Local PDF Generation
              </h3>
              <p className="text-slate-600 leading-relaxed">
                When you click &quot;Download PDF&quot;, the PDF document is compiled directly in your browser using html2canvas and jsPDF. No document or rasterized canvas is ever transmitted across the internet.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2 mb-1.5">
                <EyeOff className="w-4 h-4 text-purple-600" />
                No User Accounts or Logins
              </h3>
              <p className="text-slate-600 leading-relaxed">
                You do not need to register, log in, or provide contact information to use DCU-X. We have no accounts, authentication servers, or credential databases that could be compromised.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2 mb-1.5">
                <Layers className="w-4 h-4 text-amber-600" />
                Custom Inputs Stay Private
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Whether you select predefined colleges/document types or type custom institutions and custom document types (e.g. Research Proposal, Thesis), all custom texts remain strictly on your local machine.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: How User Data is Managed */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs mb-6">
          <div className="flex items-center gap-2.5 mb-4 text-slate-900">
            <HardDrive className="w-5 h-5 text-purple-600 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold">3. How Your Data is Managed &amp; Stored</h2>
          </div>
          
          <div className="space-y-4 text-xs sm:text-sm text-slate-600">
            <div>
              <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-purple-600" />
                A. Local Browser Storage (Auto-Save Drafts)
              </h3>
              <p className="leading-relaxed">
                To prevent accidental loss of work if your browser reloads, window closes, or laptop runs out of battery, DCU-X automatically stores your form state in your browser&apos;s <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-[11px]">localStorage</code> under the key <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-[11px]">titumir_assignment_cover_data_v2</code>.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600 pl-1">
                <li>Your draft remains sandboxed inside your device&apos;s browser profile.</li>
                <li>No other website, third party, or remote user can access or read your stored draft.</li>
                <li>Drafts automatically synchronize seamlessly whenever you make an edit.</li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-rose-500" />
                B. One-Click Instant Data Wiping
              </h3>
              <p className="leading-relaxed">
                If you are working on a shared or public computer (e.g., campus computer lab, cyber cafe, or shared library terminal), click the <strong>&quot;Reset&quot;</strong> button in the top navigation bar. Confirming the reset prompt immediately purges all entered data and deletes the stored draft from your computer&apos;s local storage, leaving zero trace behind.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <WifiOff className="w-4 h-4 text-amber-500" />
                C. Service Worker &amp; PWA Offline Cache
              </h3>
              <p className="leading-relaxed">
                The DCU-X Progressive Web App (PWA) utilizes a Service Worker (<code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-[11px]">sw.js</code>) to cache static website assets (HTML, JavaScript, CSS, institutional crests, and template graphics) in your browser cache. This enables the application to open and export covers completely offline without internet connectivity. <strong>The Service Worker never stores or caches personal student inputs or document contents.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: What is Never Collected */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs mb-6">
          <div className="flex items-center gap-2.5 mb-3 text-slate-900">
            <EyeOff className="w-5 h-5 text-slate-700 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold">4. Data We Never Collect</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
            To provide complete transparency, here is a breakdown of information that is never collected, transmitted, or logged:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-semibold text-rose-700 block mb-0.5">&times; Student Personal Details</span>
              Name, roll number, registration number, session, or batch.
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-semibold text-rose-700 block mb-0.5">&times; Academic &amp; Course Content</span>
              Course code, course title, assignment titles, or custom document types.
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-semibold text-rose-700 block mb-0.5">&times; Teacher &amp; Faculty Data</span>
              Instructor names, designations, and department assignments.
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-semibold text-rose-700 block mb-0.5">&times; Generated Files &amp; PDFs</span>
              Rendered cover pages, exported files, or print jobs.
            </div>
          </div>
        </section>

        {/* Section 5: Frequently Asked Questions */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs mb-8">
          <div className="flex items-center gap-2.5 mb-4 text-slate-900">
            <HelpCircle className="w-5 h-5 text-emerald-700 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold">5. Frequently Asked Questions (FAQ)</h2>
          </div>
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1">
                Does Dhaka Central University or any administrator see my draft?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                No. The generator operates entirely in your own browser sandbox. No draft, form value, or generated cover sheet is sent to university servers, administrators, or cloud databases.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1">
                What should I do if I use a shared computer in a campus library or cyber cafe?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                After downloading or printing your PDF, click the <strong>&quot;Reset&quot;</strong> button in the top menu and confirm. This immediately clears your draft from local storage so the next user cannot view your information.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1">
                Can I use DCU-X without an active internet connection?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Yes! Once installed or loaded once, the PWA service worker caches the core editor, templates, and fonts, allowing you to design and export covers anytime offline.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1">
                Are custom college names or custom document types sent anywhere?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                No. When you choose &quot;Other / Custom College...&quot; or &quot;Custom / Other&quot; document type, whatever you type is treated exactly like any other form field &mdash; saved only in your local browser storage and exported directly to your PDF file.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Actions Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 rounded-2xl p-6 text-white text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-4 shadow-lg">
          <div>
            <h2 className="text-base sm:text-lg font-bold">Ready to design your cover page?</h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-1">
              Your inputs are automatically saved and ready in the editor.
            </p>
          </div>
          <button
            type="button"
            id="btn-return-generator-bottom"
            onClick={onBack}
            className="mt-4 sm:mt-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-xs cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Editor</span>
          </button>
        </div>

        {/* Footer Note */}
        <footer className="mt-8 text-center text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Dhaka Central University Cover Page Generator (DCU-X). Built with student privacy by design.</p>
        </footer>
      </main>
    </div>
  );
};
