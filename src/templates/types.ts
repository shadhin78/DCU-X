import { CoverPageData } from '../types';

export type TemplateStyle = 'modern-blue' | 'classic-black' | 'accounting-sheet';
export type LayoutStyle = 'side-by-side' | 'stacked';

export interface TemplateProps {
  data: CoverPageData;
  layoutStyle: LayoutStyle;
  logoError: boolean;
  onLogoError: () => void;
}

/**
 * Formats a date string (YYYY-MM-DD) into DD/MM/YYYY
 */
export function formatDdMmYyyy(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const [y, m, d] = parts;
      return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
    }
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }
  } catch {
    // Fallback
  }
  return dateStr;
}

/**
 * Formats a date string into standard long date format (e.g. September 11, 2026)
 */
export function formatLongDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
