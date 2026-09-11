import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Accurately converts an OKLCH color to sRGB string (rgb(...) or rgba(...)).
 * Math based on CSS Color Module Level 4 specification.
 */
function oklchToRgb(lStr: string, cStr: string, hStr: string, aStr?: string): string {
  let l = parseFloat(lStr);
  if (lStr && lStr.endsWith('%')) l = parseFloat(lStr) / 100;
  if (l > 1) l = l / 100;

  const c = parseFloat(cStr) || 0;
  const h = parseFloat(hStr) || 0;

  let a = 1;
  if (aStr !== undefined && aStr !== null && aStr !== '') {
    a = aStr.endsWith('%') ? parseFloat(aStr) / 100 : parseFloat(aStr);
    if (isNaN(a)) a = 1;
  }

  if (isNaN(l)) return 'rgb(0, 0, 0)';

  const hRad = (h * Math.PI) / 180;
  const aCoord = c * Math.cos(hRad);
  const bCoord = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * aCoord + 0.2158037573 * bCoord;
  const m_ = l - 0.1055613458 * aCoord - 0.0638541728 * bCoord;
  const s_ = l - 0.0894841775 * aCoord - 1.2914855480 * bCoord;

  const lLin = l_ * l_ * l_;
  const mLin = m_ * m_ * m_;
  const sLin = s_ * s_ * s_;

  const rLin = +4.0767416621 * lLin - 3.3077115913 * mLin + 0.2309699292 * sLin;
  const gLin = -1.2684380046 * lLin + 2.6097574011 * mLin - 0.3413193965 * sLin;
  const bLin = -0.0041960863 * lLin - 0.7034186147 * mLin + 1.7076147010 * sLin;

  const toSrgb = (x: number) => {
    if (x <= 0.0031308) return 12.92 * x;
    return 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
  };

  const r = Math.round(Math.min(255, Math.max(0, toSrgb(rLin) * 255)));
  const g = Math.round(Math.min(255, Math.max(0, toSrgb(gLin) * 255)));
  const bVal = Math.round(Math.min(255, Math.max(0, toSrgb(bLin) * 255)));

  if (a < 1) {
    return `rgba(${r}, ${g}, ${bVal}, ${Number(a.toFixed(3))})`;
  }
  return `rgb(${r}, ${g}, ${bVal})`;
}

/**
 * Accurately converts an OKLAB color to sRGB string (rgb(...) or rgba(...)).
 */
function oklabToRgb(lStr: string, aCoordStr: string, bCoordStr: string, aStr?: string): string {
  let l = parseFloat(lStr);
  if (lStr && lStr.endsWith('%')) l = parseFloat(lStr) / 100;
  if (l > 1) l = l / 100;

  const aCoord = parseFloat(aCoordStr) || 0;
  const bCoord = parseFloat(bCoordStr) || 0;

  let a = 1;
  if (aStr !== undefined && aStr !== null && aStr !== '') {
    a = aStr.endsWith('%') ? parseFloat(aStr) / 100 : parseFloat(aStr);
    if (isNaN(a)) a = 1;
  }

  if (isNaN(l)) return 'rgb(0, 0, 0)';

  const l_ = l + 0.3963377774 * aCoord + 0.2158037573 * bCoord;
  const m_ = l - 0.1055613458 * aCoord - 0.0638541728 * bCoord;
  const s_ = l - 0.0894841775 * aCoord - 1.2914855480 * bCoord;

  const lLin = l_ * l_ * l_;
  const mLin = m_ * m_ * m_;
  const sLin = s_ * s_ * s_;

  const rLin = +4.0767416621 * lLin - 3.3077115913 * mLin + 0.2309699292 * sLin;
  const gLin = -1.2684380046 * lLin + 2.6097574011 * mLin - 0.3413193965 * sLin;
  const bLin = -0.0041960863 * lLin - 0.7034186147 * mLin + 1.7076147010 * sLin;

  const toSrgb = (x: number) => {
    if (x <= 0.0031308) return 12.92 * x;
    return 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
  };

  const r = Math.round(Math.min(255, Math.max(0, toSrgb(rLin) * 255)));
  const g = Math.round(Math.min(255, Math.max(0, toSrgb(gLin) * 255)));
  const bVal = Math.round(Math.min(255, Math.max(0, toSrgb(bLin) * 255)));

  if (a < 1) {
    return `rgba(${r}, ${g}, ${bVal}, ${Number(a.toFixed(3))})`;
  }
  return `rgb(${r}, ${g}, ${bVal})`;
}

let helperCanvas: HTMLCanvasElement | null = null;
let helperCtx: CanvasRenderingContext2D | null = null;

function convertColorViaCanvas(colorExpr: string): string | null {
  if (typeof document === 'undefined') return null;
  try {
    if (!helperCanvas) {
      helperCanvas = document.createElement('canvas');
      helperCanvas.width = 1;
      helperCanvas.height = 1;
      helperCtx = helperCanvas.getContext('2d', { willReadFrequently: true });
    }
    if (!helperCtx) return null;
    helperCtx.clearRect(0, 0, 1, 1);
    helperCtx.fillStyle = '#000000';
    helperCtx.fillStyle = colorExpr;
    helperCtx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = helperCtx.getImageData(0, 0, 1, 1).data;
    if (a === 255) {
      return `rgb(${r}, ${g}, ${b})`;
    }
    return `rgba(${r}, ${g}, ${b}, ${Number((a / 255).toFixed(3))})`;
  } catch {
    return null;
  }
}

/**
 * Replaces any oklch(...) or oklab(...) occurrences in a CSS string with standard rgb(...) / rgba(...).
 */
export function replaceOklchInString(str: string): string {
  if (!str || typeof str !== 'string') return str;
  const lower = str.toLowerCase();
  if (!lower.includes('oklch') && !lower.includes('oklab')) return str;

  let result = str;

  // 1. OKLCH replacement
  if (lower.includes('oklch')) {
    result = result.replace(/oklch\(\s*([^)]+)\s*\)/gi, (match, inner) => {
      const fromCanvas = convertColorViaCanvas(match);
      if (fromCanvas && fromCanvas.startsWith('rgb')) return fromCanvas;

      try {
        if (inner.includes('/')) {
          const [lchPart, alphaPart] = inner.split('/');
          const lchTokens = lchPart.trim().split(/\s+/);
          return oklchToRgb(lchTokens[0], lchTokens[1], lchTokens[2], alphaPart.trim());
        }
        const parts = inner.trim().split(/\s+/);
        return oklchToRgb(parts[0], parts[1], parts[2], parts[3]);
      } catch {
        return 'rgb(0, 0, 0)';
      }
    });
  }

  // 2. OKLAB replacement
  if (result.toLowerCase().includes('oklab')) {
    result = result.replace(/oklab\(\s*([^)]+)\s*\)/gi, (match, inner) => {
      const fromCanvas = convertColorViaCanvas(match);
      if (fromCanvas && fromCanvas.startsWith('rgb')) return fromCanvas;

      try {
        if (inner.includes('/')) {
          const [labPart, alphaPart] = inner.split('/');
          const labTokens = labPart.trim().split(/\s+/);
          return oklabToRgb(labTokens[0], labTokens[1], labTokens[2], alphaPart.trim());
        }
        const parts = inner.trim().split(/\s+/);
        return oklabToRgb(parts[0], parts[1], parts[2], parts[3]);
      } catch {
        return 'rgb(0, 0, 0)';
      }
    });
  }

  return result;
}

/**
 * Temporarily wraps a Window's getComputedStyle so that any oklch color returned
 * by the browser (from Tailwind v4 or modern CSS variables) is mapped to standard rgb(...)
 * before html2canvas parses it.
 */
function patchWindowGetComputedStyle(targetWindow: Window): () => void {
  const originalGetComputedStyle = targetWindow.getComputedStyle;
  if (!originalGetComputedStyle) return () => {};

  targetWindow.getComputedStyle = function (elt: Element, pseudoElt?: string | null) {
    const originalDecl = originalGetComputedStyle.call(targetWindow, elt, pseudoElt);
    return new Proxy(originalDecl, {
      get(target, prop) {
        if (typeof prop === 'symbol') {
          return (target as any)[prop];
        }
        if (prop === 'getPropertyValue') {
          return (propertyName: string) => {
            const val = target.getPropertyValue(propertyName);
            return typeof val === 'string' ? replaceOklchInString(val) : val;
          };
        }
        const val = (target as any)[prop];
        if (typeof val === 'string') {
          return replaceOklchInString(val);
        }
        if (typeof val === 'function') {
          return val.bind(target);
        }
        return val;
      },
    });
  };

  return () => {
    targetWindow.getComputedStyle = originalGetComputedStyle;
  };
}

/**
 * Generates the standardized filename:
 * Titumir_Assignment_Cover_[StudentName]_[AssignmentNo].pdf
 *
 * If Student Name or Assignment No is empty, uses safe fallback values.
 * Removes filesystem-prohibited characters across Windows, macOS, Linux, and mobile filesystems
 * while safely preserving Unicode (including Bengali script).
 */
export function getPdfFileName(studentName?: string, assignmentNo?: string): string {
  // Remove filesystem-unsafe characters: / \ ? % * : | " < > # and control codes
  const cleanStudent = (studentName || '')
    .trim()
    .replace(/[/\\?%*:|"<>#\x00-\x1f\x80-\x9f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');

  const cleanAssignment = (assignmentNo || '')
    .trim()
    .replace(/[/\\?%*:|"<>#\x00-\x1f\x80-\x9f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');

  const finalStudent = cleanStudent || 'Student';
  const finalAssignment = cleanAssignment || '1';

  return `Titumir_Assignment_Cover_${finalStudent}_${finalAssignment}.pdf`;
}

/**
 * Captures the #a4-cover-sheet element and generates a pristine 1-page A4 PDF.
 * - 100% local in the browser: zero server requests, zero cloud storage.
 * - Exactly one A4 portrait page (210mm x 297mm).
 * - Visually matches the live A4 preview with high resolution (~240 DPI print clarity).
 * - Excludes editor UI, browser controls, and extraneous backgrounds.
 * - Accurately renders Bengali and Unicode text via browser-native canvas font shaping.
 */
export async function downloadCoverPagePdf(options: {
  elementId?: string;
  wrapperId?: string;
  studentName?: string;
  assignmentNo?: string;
}): Promise<void> {
  const {
    elementId = 'a4-cover-sheet',
    wrapperId = 'a4-cover-sheet-wrapper',
    studentName,
    assignmentNo,
  } = options;

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Target sheet element with id "${elementId}" not found in DOM.`);
  }

  const wrapper = document.getElementById(wrapperId);
  const originalTransform = wrapper ? wrapper.style.transform : '';
  const originalTransition = wrapper ? wrapper.style.transition : '';

  try {
    // 1. Ensure all fonts (including Bengali fonts) are fully loaded in the browser
    if (document.fonts) {
      try {
        await Promise.all([
          document.fonts.load('16px "Hind Siliguri"').catch(() => {}),
          document.fonts.load('16px "Noto Serif Bengali"').catch(() => {}),
          document.fonts.load('16px "Cinzel"').catch(() => {}),
          document.fonts.load('16px "Merriweather"').catch(() => {}),
          document.fonts.load('16px "Plus Jakarta Sans"').catch(() => {}),
        ]);
        await document.fonts.ready;
      } catch {
        // Non-blocking fallback if document.fonts.ready rejects
      }
    }

    // 2. Ensure all images and background assets inside the element are loaded & decoded
    const images = Array.from(element.querySelectorAll('img'));
    await Promise.all(
      images.map(async (img) => {
        try {
          if (!img.complete) {
            await new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            });
          }
          if ('decode' in img) {
            await img.decode().catch(() => {});
          }
        } catch {
          // Non-fatal
        }
      })
    );

    if (element.style.backgroundImage) {
      const bgMatch = element.style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
      if (bgMatch && bgMatch[1]) {
        try {
          const bgImg = new Image();
          bgImg.src = bgMatch[1];
          if (!bgImg.complete) {
            await new Promise((resolve) => {
              bgImg.onload = resolve;
              bgImg.onerror = resolve;
            });
          }
          if ('decode' in bgImg) {
            await bgImg.decode().catch(() => {});
          }
        } catch {
          // Non-fatal
        }
      }
    }

    // 3. Temporarily reset zoom scale on preview wrapper so dimensions are true 1:1 A4 (210mm x 297mm)
    if (wrapper) {
      wrapper.style.transition = 'none';
      wrapper.style.transform = 'none';
    }

    // Give browser a brief tick to recalculate geometry at 100% scale
    await new Promise((resolve) => setTimeout(resolve, 60));

    // Intercept window.getComputedStyle to translate any modern oklch colors to sRGB
    const unpatchGlobalWindow = patchWindowGetComputedStyle(window);

    let canvas: HTMLCanvasElement;
    try {
      // 4. Render element to high-res canvas (2.5x pixel ratio for ~240 DPI crisp print clarity)
      canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 15000,
        windowWidth: 1200,
        windowHeight: 1600,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          // 1. Patch cloned iframe's window getComputedStyle
          if (clonedDoc.defaultView) {
            patchWindowGetComputedStyle(clonedDoc.defaultView);
          }

          const clonedWrapper = clonedDoc.getElementById(wrapperId);
          if (clonedWrapper) {
            clonedWrapper.style.transform = 'none';
            clonedWrapper.style.margin = '0';
            clonedWrapper.style.padding = '0';
          }
          const clonedEl = clonedDoc.getElementById(elementId);
          if (clonedEl) {
            // Remove preview-only shadow and ensure pure A4 margins
            clonedEl.style.boxShadow = 'none';
            clonedEl.style.margin = '0 auto';
            clonedEl.style.transform = 'none';
            clonedEl.style.width = '210mm';
            clonedEl.style.height = '297mm';
            clonedEl.style.minHeight = '297mm';
            clonedEl.style.maxHeight = '297mm';
            clonedEl.style.overflow = 'hidden';
          }

          // 2. Sanitize any style tags in clonedDoc that contain oklch
          try {
            const styles = Array.from(clonedDoc.querySelectorAll('style'));
            for (const s of styles) {
              if (s.textContent && s.textContent.toLowerCase().includes('oklch')) {
                s.textContent = replaceOklchInString(s.textContent);
              }
            }
          } catch {
            // Non-fatal
          }

          // 3. Sanitize any inline style attributes in clonedDoc that contain oklch
          try {
            const allElements = clonedDoc.querySelectorAll('*');
            allElements.forEach((el) => {
              const htmlEl = el as HTMLElement;
              if (htmlEl.getAttribute) {
                const styleAttr = htmlEl.getAttribute('style');
                if (styleAttr && styleAttr.toLowerCase().includes('oklch')) {
                  htmlEl.setAttribute('style', replaceOklchInString(styleAttr));
                }
              }
            });
          } catch {
            // Non-fatal
          }
        },
      });
    } finally {
      unpatchGlobalWindow();
    }

    const imgDataUrl = canvas.toDataURL('image/png', 1.0);
    if (!imgDataUrl || imgDataUrl === 'data:,') {
      throw new Error('Canvas render produced empty image.');
    }

    // 5. Build single A4 portrait PDF (210mm x 297mm)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // Exactly 210mm x 297mm full A4 page, exactly 1 page
    pdf.addImage(imgDataUrl, 'PNG', 0, 0, 210, 297, undefined, 'FAST');

    // Guarantee strictly one single page
    while (pdf.getNumberOfPages() > 1) {
      pdf.deletePage(pdf.getNumberOfPages());
    }

    // 6. Filename formatting with safe fallbacks and Unicode support
    const fileName = getPdfFileName(studentName, assignmentNo);

    // 7. Download directly in browser via local Blob object URL
    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);
  } finally {
    // 8. Always restore original preview zoom level
    if (wrapper) {
      wrapper.style.transform = originalTransform;
      wrapper.style.transition = originalTransition;
    }
  }
}
