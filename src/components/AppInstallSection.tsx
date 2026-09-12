import React from 'react';
import { Download, ShieldCheck, Zap, Laptop, Smartphone, CheckCircle2, HelpCircle, Info } from 'lucide-react';
import { usePwaInstall } from '../hooks/usePwaInstall';
import { InstallInstructionsModal } from './InstallInstructionsModal';

interface AppInstallSectionProps {
  onOpenPrivacy: () => void;
  onOpenAbout: () => void;
}

export const AppInstallSection: React.FC<AppInstallSectionProps> = ({ onOpenPrivacy, onOpenAbout }) => {
  const {
    isInstalled,
    isModalOpen,
    installStatusMessage,
    openModal,
    closeModal,
    triggerInstall,
  } = usePwaInstall();

  return (
    <>
      <section
        id="app-install-section"
        aria-label="Install DCU-X Application"
        className="w-full bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-xs print:hidden transition-all duration-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left: App Identity & Description */}
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center font-bold shadow-xs shrink-0 mt-0.5">
              <Download className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                  Install DCU-X App
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Offline Ready
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Add to your phone or PC for instant 1-click launch and offline cover generation without re-downloading.
              </p>
            </div>
          </div>

          {/* Right: Install Action Button */}
          <div className="flex items-center gap-2 sm:shrink-0 w-full sm:w-auto">
            {isInstalled ? (
              <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>App Installed</span>
              </div>
            ) : (
              <button
                type="button"
                id="btn-install-app"
                onClick={triggerInstall}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
                title="Directly install DCU-X to your device"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Install Now</span>
              </button>
            )}

            <button
              type="button"
              id="btn-install-instructions"
              onClick={openModal}
              className="p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0"
              title="View installation guide for iOS, Android, and PC"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Direct Install Notification / Status */}
        {installStatusMessage && (
          <div
            id="install-status-alert"
            className="mt-3 p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 flex items-center gap-2 text-xs font-medium animate-in fade-in"
          >
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{installStatusMessage}</span>
          </div>
        )}

        {/* Feature Highlights Pills */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5 font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Fast 1-Click Launch</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Laptop className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>Windows &amp; Mac</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Smartphone className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span>Android &amp; iOS</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>100% Private Client-Side</span>
          </div>
        </div>

        {/* Hyperlink Section: Privacy and About Us Links */}
        <div className="mt-3 bg-slate-50/80 rounded-lg p-2.5 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11.5px] text-slate-600 leading-snug">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p>
              Your information never leaves your device. Learn how your data is kept safe in our{' '}
              <a
                href="#privacy"
                id="link-privacy-policy"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenPrivacy();
                }}
                className="font-bold text-emerald-700 hover:text-emerald-900 underline underline-offset-2 decoration-emerald-500/60 hover:decoration-emerald-700 transition-colors cursor-pointer"
                title="Read the DCU-X Privacy and Data Security policy"
              >
                Privacy
              </a>{' '}
              policy.
            </p>
          </div>

          <div className="flex items-center gap-3 sm:shrink-0 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-slate-200 text-xs">
            <a
              href="#about"
              id="link-about-us"
              onClick={(e) => {
                e.preventDefault();
                onOpenAbout();
              }}
              className="font-bold text-emerald-700 hover:text-emerald-900 underline underline-offset-2 decoration-emerald-500/60 hover:decoration-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
              title="Learn About DCU-X, DCU, and the 7 Affiliated Colleges"
            >
              About Us
            </a>
          </div>
        </div>
      </section>

      {/* Device-specific instructions modal (only opens if user clicks the ? help icon) */}
      <InstallInstructionsModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};
