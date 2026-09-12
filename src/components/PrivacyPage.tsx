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
  AlertCircle,
  WifiOff,
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
              DCU Assignment Cover Generator
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Privacy & Data Security
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
          <span className="text-slate-800 font-medium">Privacy Policy & Data Security</span>
        </nav>

        {/* Hero Header Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md mt-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Privacy Policy & Data Management
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                Learn how the DCU Assignment Cover Generator safeguards your student information, manages draft storage locally, and guarantees 100% client-side privacy.
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
            At DCU-X, student privacy and data sovereignty are our foundational values. We believe that generating an academic assignment cover page should never require transmitting sensitive academic records, student identification numbers, teacher names, or course information across remote servers or third-party databases.
          </p>
          <div className="mt-4 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
            <p className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              Direct Student Guarantee:
            </p>
            <p className="leading-relaxed">
              We do not collect, monetize, log, or sell your personal details. Everything you type into this generator exists solely in your current browser session and your device&apos;s local memory.
            </p>
          </div>
        </section>

        {/* Section 2: How User Data is Safe */}
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
                All form computations, text validation, date formatting, and live A4 preview renderings are calculated directly on your device by your browser&apos;s JavaScript engine.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2 mb-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Local PDF Generation
              </h3>
              <p className="text-slate-600 leading-relaxed">
                When you click &quot;Download PDF&quot;, the PDF file is generated locally using client-side libraries. No document is ever sent to an external server or cloud conversion API.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2 mb-1.5">
                <EyeOff className="w-4 h-4 text-purple-600" />
                No User Accounts or Passwords
              </h3>
              <p className="text-slate-600 leading-relaxed">
                You do not need to register, sign in, or provide an email address to use DCU-X. We have no user accounts or password databases that could be compromised.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Encrypted Asset Delivery (HTTPS)
              </h3>
              <p className="text-slate-600 leading-relaxed">
                All application files, fonts, and template graphics are served with SSL/TLS encryption to prevent eavesdropping or tampering in transit.
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
              <h3 className="font-bold text-slate-900 mb-1">A. Local Browser Storage (Auto-Save Drafts)</h3>
              <p className="leading-relaxed">
                To protect you from losing your work if your browser window closes or your laptop battery dies, DCU-X automatically stores your form values in your browser&apos;s <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded font-mono text-[11px]">localStorage</code> under the key <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded font-mono text-[11px]">dcu_assignment_cover_draft</code>.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600 pl-1">
                <li>This draft remains isolated inside your browser on your physical machine.</li>
                <li>No other website or user on the internet can read your local storage draft.</li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-red-500" />
                B. One-Click Instant Data Wiping
              </h3>
              <p className="leading-relaxed">
                If you are using a shared or public computer (such as a cyber cafe or university lab), click the <strong>&quot;Reset&quot;</strong> button in the top navigation bar. Confirming the reset prompt immediately purges all draft information from your computer&apos;s local storage, leaving no residual traces.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1">C. Service Worker &amp; PWA Offline Cache</h3>
              <p className="leading-relaxed">
                The DCU-X Progressive Web App (PWA) uses a Service Worker (<code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded font-mono text-[11px]">sw.js</code>) to store static website resources (HTML, JavaScript, CSS, institutional logos, and layout templates) in your device&apos;s browser cache. This allows the application to launch and function 100% offline. <strong>The Service Worker never caches your student inputs or personal data.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Analytics Transparency */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs mb-6">
          <div className="flex items-center gap-2.5 mb-3 text-slate-900">
            <EyeOff className="w-5 h-5 text-slate-700 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold">4. Analytics &amp; Cookies</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            DCU-X uses Google Analytics 4 (GA4) solely to collect anonymous technical telemetry, such as total page views, general device categories (desktop vs. mobile), and performance health.
          </p>
          <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
            <div className="font-semibold text-slate-900">What is NEVER tracked:</div>
            <p>&bull; Student names, roll numbers, or contact details.</p>
            <p>&bull; Teacher designations or department assignments.</p>
            <p>&bull; Assignment titles or course codes.</p>
            <p>&bull; Downloaded cover page documents or PDF contents.</p>
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
                Does Dhaka Central University or any admin see my draft?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                No. The generator runs completely within your own browser sandbox. No draft or generated cover is sent to university servers or administrator panels.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1">
                What should I do if I use a shared computer in a campus library or cafe?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                After downloading your PDF, click the <strong>&quot;Reset&quot;</strong> button in the top menu and confirm. This immediately wipes your draft from the browser&apos;s local storage so subsequent users cannot view your information.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1">
                Can I use DCU-X without an active internet connection?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Yes! Once installed or loaded once, the PWA service worker caches the editor, allowing you to generate and export covers anytime offline.
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
          <p>&copy; {new Date().getFullYear()} Dhaka Central University Assignment Cover Generator (DCU-X). Built with student privacy by design.</p>
        </footer>
      </main>
    </div>
  );
};
