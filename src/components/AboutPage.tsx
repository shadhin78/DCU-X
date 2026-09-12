import React from 'react';
import {
  ArrowLeft,
  GraduationCap,
  Building2,
  ExternalLink,
  Sparkles,
  Globe,
  FileText,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

interface CollegeInfo {
  sl: number;
  name: string;
  url?: string;
  badge?: string;
}

const SEVEN_COLLEGES: CollegeInfo[] = [
  {
    sl: 1,
    name: 'Dhaka College',
    url: 'https://www.dhakacollege.edu.bd/?utm_source=chatgpt.com',
    badge: 'Estd. 1841',
  },
  {
    sl: 2,
    name: 'Eden Mohila College',
    url: 'https://emc.edu.bd/?utm_source=chatgpt.com',
    badge: 'Estd. 1873',
  },
  {
    sl: 3,
    name: 'Begum Badrunnessa Govt. Mahila College',
    url: 'https://bbgmc.gov.bd/',
    badge: 'Estd. 1948',
  },
  {
    sl: 4,
    name: 'Kabi Nazrul Govt. College',
    url: 'https://kabinazrulcollege.gov.bd/?utm_source=chatgpt.com',
    badge: 'Estd. 1874',
  },
  {
    sl: 5,
    name: 'Govt. Shaheed Suhrawardy College',
    url: 'https://gssc.edu.bd/?utm_source=chatgpt.com',
    badge: 'Estd. 1949',
  },
  {
    sl: 6,
    name: 'Govt. Bangla College',
    url: 'https://banglacollege.gov.bd/',
    badge: 'Estd. 1962',
  },
  {
    sl: 7,
    name: 'Govt. Titumir College',
    url: 'https://titumircollege.gov.bd/?utm_source=chatgpt.com',
    badge: 'Estd. 1968',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-100/70 font-sans text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900 pb-16">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-3.5 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            id="btn-about-back-to-generator"
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
              About Us &amp; 7 Colleges
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
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
          <span className="text-slate-800 font-medium">About Us</span>
        </nav>

        {/* Hero Header Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shrink-0 shadow-md mt-1">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                About DCU Assignment Cover Generator
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                A dedicated, student-first digital utility designed to generate standard, print-ready, professional A4 assignment cover pages for Dhaka Central University (DCU) and its 7 Affiliated Colleges.
              </p>

              {/* Badges */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Free &amp; Open Student Tool
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 font-semibold border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  100% Client-Side Privacy
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 font-semibold border border-purple-200">
                  <FileText className="w-3.5 h-3.5 text-purple-600" />
                  Pixel-Perfect A4 PDF
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: About the Site & Mission */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs mb-8">
          <div className="flex items-center gap-2.5 mb-3 text-slate-900">
            <Sparkles className="w-5 h-5 text-emerald-700 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold">About the Site</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            DCU-X was created to solve a persistent daily challenge faced by university students: formatting and printing clean assignment cover pages. Instead of struggling with misaligned Microsoft Word templates or distorted margins, DCU-X provides an instantaneous, interactive generator with real-time A4 sheet preview.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
              <Zap className="w-4 h-4 text-amber-500 mb-1.5" />
              <strong className="text-slate-900 block font-bold mb-0.5">Real-Time A4 Preview</strong>
              <span className="text-slate-500">Live preview scaled to exact 210mm &times; 297mm dimensions as you type.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
              <FileText className="w-4 h-4 text-blue-500 mb-1.5" />
              <strong className="text-slate-900 block font-bold mb-0.5">Departmental Templates</strong>
              <span className="text-slate-500">Modern Blue, Classic Black, and specialized department frames like Accounting Sheet.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1.5" />
              <strong className="text-slate-900 block font-bold mb-0.5">Zero Data Collection</strong>
              <span className="text-slate-500">Operates 100% in your browser. No server uploads or personal data harvesting.</span>
            </div>
          </div>
        </section>

        {/* Section 2: Dhaka Central University & Seven Colleges Portals */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs mb-8">
          <div className="flex items-center gap-2.5 mb-3 text-slate-900">
            <Building2 className="w-5 h-5 text-blue-700 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold">Dhaka Central University &amp; Official Portals</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Explore the official portals of Dhaka Central University and the centralized Seven Colleges administration:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* DCU Main */}
            <a
              href="https://dcu.ac.bd/?utm_source=chatgpt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50/70 hover:bg-emerald-50/40 transition-all flex items-start justify-between gap-3 cursor-pointer"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    Dhaka Central University (DCU)
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Official University Portal</p>
                <span className="text-[11px] font-mono text-emerald-700 font-semibold mt-1 inline-block">
                  dcu.ac.bd &rarr;
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0 mt-0.5 transition-colors" />
            </a>

            {/* DCU Seven Colleges Page */}
            <a
              href="https://dcu.ac.bd/colleges?utm_source=chatgpt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50/70 hover:bg-blue-50/40 transition-all flex items-start justify-between gap-3 cursor-pointer"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                    DCU &ndash; Seven Colleges Portal
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Affiliated Colleges Directory</p>
                <span className="text-[11px] font-mono text-blue-700 font-semibold mt-1 inline-block">
                  dcu.ac.bd/colleges &rarr;
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5 transition-colors" />
            </a>
          </div>
        </section>

        {/* Section 3: The 7 Colleges Directory */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs mb-8">
          <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-2.5 text-slate-900">
              <span className="text-lg">🏫</span>
              <h2 className="text-base sm:text-lg font-bold">The 7 Affiliated Colleges</h2>
            </div>
            <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
              Official Institutional Websites
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-700">
                  <th className="py-2.5 px-3 font-bold w-12 text-center">#</th>
                  <th className="py-2.5 px-3 font-bold">College Name</th>
                  <th className="py-2.5 px-3 font-bold text-right">Official Website Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SEVEN_COLLEGES.map((college) => (
                  <tr key={college.sl} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3 text-center font-mono text-slate-400 font-semibold">
                      {college.sl}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-slate-900">{college.name}</span>
                        {college.badge && (
                          <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                            {college.badge}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {college.url ? (
                        <a
                          href={college.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-medium text-xs transition-colors cursor-pointer border border-emerald-200"
                        >
                          <Globe className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Visit Website</span>
                          <ExternalLink className="w-3 h-3 text-emerald-600 ml-0.5" />
                        </a>
                      ) : (
                        <span className="text-slate-400 italic text-xs">Official Portal</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom Actions Banner */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Ready to generate your assignment cover?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Return to the editor to preview and download your single-page A4 cover page.
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Editor</span>
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Dhaka Central University Assignment Cover Generator (DCU-X).</p>
          <p className="mt-1 text-slate-500">
            Developed by{' '}
            <a
              href="https://www.facebook.com/shadhin.78/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-900 underline font-semibold transition-colors"
              title="Connect with Shadhin on Facebook"
            >
              shadhin
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
};
