import React, { useState } from 'react';
import { X, Smartphone, Monitor, Apple, CheckCircle2, ArrowRight } from 'lucide-react';

interface InstallInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DeviceTab = 'desktop' | 'android' | 'ios';

export const InstallInstructionsModal: React.FC<InstallInstructionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<DeviceTab>(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) return 'ios';
      if (/android/.test(ua)) return 'android';
    }
    return 'desktop';
  });

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg shadow-xs">
              📥
            </div>
            <div>
              <h2 id="install-modal-title" className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                How to Install DCU-X
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Install as a standalone app for instant offline access
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Device selector tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 mt-4">
          <button
            type="button"
            onClick={() => setActiveTab('desktop')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'desktop'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>PC / Mac</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('android')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'android'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ios')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'ios'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Apple className="w-3.5 h-3.5" />
            <span>iPhone / iPad</span>
          </button>
        </div>

        {/* Instructions Body */}
        <div className="py-4">
          {activeTab === 'desktop' && (
            <ol className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-slate-900 block">Look at the browser address bar:</strong>
                  In Google Chrome or Microsoft Edge, click the <strong>Install icon</strong> (computer screen with a down arrow) at the right end of the URL bar.
                </div>
              </li>
              <li className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-slate-900 block">Or via browser menu:</strong>
                  Click the <strong>three dots (⋮)</strong> at the top right of your browser &rarr; select <strong>&quot;Save and share&quot;</strong> or <strong>&quot;Install DCU-X&quot;</strong>.
                </div>
              </li>
              <li className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-slate-900 block">Click Install:</strong>
                  Confirm the prompt. DCU-X will now launch as a dedicated desktop app with full offline support.
                </div>
              </li>
            </ol>
          )}

          {activeTab === 'android' && (
            <ol className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-slate-900 block">Open Chrome Menu:</strong>
                  Tap the <strong>three vertical dots (⋮)</strong> in the top-right corner of Chrome.
                </div>
              </li>
              <li className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-slate-900 block">Select Install:</strong>
                  Tap <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
                </div>
              </li>
              <li className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-slate-900 block">Confirm Installation:</strong>
                  Tap <strong>Install</strong>. An app icon will be added to your phone&apos;s home screen.
                </div>
              </li>
            </ol>
          )}

          {activeTab === 'ios' && (
            <ol className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-slate-900 block">Open in Safari:</strong>
                  Make sure you are browsing in Apple Safari on your iPhone or iPad.
                </div>
              </li>
              <li className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-slate-900 block">Tap the Share Button:</strong>
                  Tap the <strong>Share icon</strong> (a square with an upward arrow) in the bottom toolbar.
                </div>
              </li>
              <li className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-slate-900 block">Add to Home Screen:</strong>
                  Scroll down the share sheet and tap <strong>&quot;Add to Home Screen&quot;</strong>, then tap <strong>Add</strong> in the top-right corner.
                </div>
              </li>
            </ol>
          )}
        </div>

        {/* Benefits reminder */}
        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3 flex items-center gap-2.5 text-xs text-emerald-900 mb-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Works offline without an internet connection once installed.</span>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Got It</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
