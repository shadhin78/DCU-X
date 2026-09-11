export interface DepartmentTemplate {
  id: string;
  name: string;
  displayName: string;
  imageUrl: string;
  fileName: string;
  aliases: string[];
}

export const DEPARTMENT_TEMPLATES: DepartmentTemplate[] = [
  // Faculty of Arts & Social Science
  {
    id: 'bangla',
    name: 'Bangla',
    displayName: 'Bangla',
    imageUrl: '/templates/bangla.png',
    fileName: 'bangla.png',
    aliases: ['bangla', 'bengali'],
  },
  {
    id: 'english',
    name: 'English',
    displayName: 'English',
    imageUrl: '/templates/english.png',
    fileName: 'english.png',
    aliases: ['english'],
  },
  {
    id: 'islamic-history',
    name: 'Islamic History & Culture',
    displayName: 'Islamic History',
    imageUrl: '/templates/islamic-history.png',
    fileName: 'islamic-history.png',
    aliases: [
      'islamic history & culture',
      'islamic history and culture',
      'islamic history',
      'islamic culture',
    ],
  },
  {
    id: 'islamic-studies',
    name: 'Islamic Studies',
    displayName: 'Islamic Studies',
    imageUrl: '/templates/islamic-studies.png',
    fileName: 'islamic-studies.png',
    aliases: ['islamic studies', 'islamiat', 'islamic study'],
  },
  {
    id: 'history',
    name: 'History',
    displayName: 'History',
    imageUrl: '/templates/history.png',
    fileName: 'history.png',
    aliases: ['history'],
  },
  {
    id: 'philosophy',
    name: 'Philosophy',
    displayName: 'Philosophy',
    imageUrl: '/templates/philosophy.png',
    fileName: 'philosophy.png',
    aliases: ['philosophy'],
  },
  {
    id: 'economics',
    name: 'Economics',
    displayName: 'Economics',
    imageUrl: '/templates/economics.png',
    fileName: 'economics.png',
    aliases: ['economics', 'economic'],
  },
  {
    id: 'political-science',
    name: 'Political Science',
    displayName: 'Political Science',
    imageUrl: '/templates/political-science.png',
    fileName: 'political-science.png',
    aliases: ['political science', 'pol science', 'political'],
  },
  {
    id: 'social-work',
    name: 'Social Work',
    displayName: 'Social Work',
    imageUrl: '/templates/social-work.png',
    fileName: 'social-work.png',
    aliases: ['social work'],
  },
  {
    id: 'sociology',
    name: 'Sociology',
    displayName: 'Sociology',
    imageUrl: '/templates/sociology.png',
    fileName: 'sociology.png',
    aliases: ['sociology'],
  },

  // Faculty of Science
  {
    id: 'physics',
    name: 'Physics',
    displayName: 'Physics',
    imageUrl: '/templates/physics.png',
    fileName: 'physics.png',
    aliases: ['physics'],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    displayName: 'Chemistry',
    imageUrl: '/templates/chemistry.png',
    fileName: 'chemistry.png',
    aliases: ['chemistry'],
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    displayName: 'Mathematics',
    imageUrl: '/templates/mathematics.png',
    fileName: 'mathematics.png',
    aliases: ['mathematics', 'math', 'maths'],
  },
  {
    id: 'statistics',
    name: 'Statistics',
    displayName: 'Statistics',
    imageUrl: '/templates/statistics.png',
    fileName: 'statistics.png',
    aliases: ['statistics', 'stats', 'stat'],
  },
  {
    id: 'botany',
    name: 'Botany',
    displayName: 'Botany',
    imageUrl: '/templates/botany.png',
    fileName: 'botany.png',
    aliases: ['botany'],
  },
  {
    id: 'zoology',
    name: 'Zoology',
    displayName: 'Zoology',
    imageUrl: '/templates/zoology.png',
    fileName: 'zoology.png',
    aliases: ['zoology'],
  },
  {
    id: 'psychology',
    name: 'Psychology',
    displayName: 'Psychology',
    imageUrl: '/templates/psychology.png',
    fileName: 'psychology.png',
    aliases: ['psychology'],
  },
  {
    id: 'geography',
    name: 'Geography & Environment',
    displayName: 'Geography',
    imageUrl: '/templates/geography.png',
    fileName: 'geography.png',
    aliases: [
      'geography & environment',
      'geography and environment',
      'geography',
      'environment',
    ],
  },

  // Faculty of Business
  {
    id: 'accounting',
    name: 'Accounting',
    displayName: 'Accounting',
    imageUrl: '/templates/accounting.png',
    fileName: 'accounting.png',
    aliases: ['accounting', 'ais'],
  },
  {
    id: 'management',
    name: 'Management',
    displayName: 'Management',
    imageUrl: '/templates/management.png',
    fileName: 'management.png',
    aliases: ['management'],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    displayName: 'Marketing',
    imageUrl: '/templates/marketing.png',
    fileName: 'marketing.png',
    aliases: ['marketing'],
  },
  {
    id: 'finance',
    name: 'Finance & Banking',
    displayName: 'Finance',
    imageUrl: '/templates/finance.png',
    fileName: 'finance.png',
    aliases: ['finance & banking', 'finance and banking', 'finance', 'banking'],
  },
];

/**
 * Returns the matching DepartmentTemplate for a given department string,
 * or null if no custom department template is available.
 */
export function getDepartmentTemplate(deptInput?: string): DepartmentTemplate | null {
  if (!deptInput) return null;
  const raw = deptInput
    .toLowerCase()
    .replace(/^(department|dept\.?)\s+of\s+/i, '')
    .trim();
  if (!raw) return null;

  // 1. Exact match on standard name
  const exact = DEPARTMENT_TEMPLATES.find((t) => t.name.toLowerCase() === raw);
  if (exact) return exact;

  // 2. Exact match on any alias
  for (const t of DEPARTMENT_TEMPLATES) {
    if (t.aliases.some((a) => a.toLowerCase() === raw)) {
      return t;
    }
  }

  // 3. Multi-word compound department names checked before single-word substrings
  const compoundMatches: Array<{ key: string; id: string }> = [
    { key: 'islamic history', id: 'islamic-history' },
    { key: 'islamic studies', id: 'islamic-studies' },
    { key: 'social work', id: 'social-work' },
    { key: 'political science', id: 'political-science' },
    { key: 'geography & environment', id: 'geography' },
    { key: 'geography and environment', id: 'geography' },
    { key: 'finance & banking', id: 'finance' },
    { key: 'finance and banking', id: 'finance' },
  ];

  for (const cm of compoundMatches) {
    if (raw.includes(cm.key)) {
      return DEPARTMENT_TEMPLATES.find((t) => t.id === cm.id) || null;
    }
  }

  // 4. Token matching on words
  const tokens = raw.split(/[\s,./&+-]+/).filter(Boolean);
  for (const token of tokens) {
    if (token.length < 3) continue;
    // Guard against 'physical' matching 'physics'
    if (token === 'physical') continue;

    for (const t of DEPARTMENT_TEMPLATES) {
      if (t.aliases.some((a) => a.toLowerCase() === token)) {
        return t;
      }
    }
  }

  // 5. Distinct keyword substring matching
  const distinctKeywords: Array<{ keyword: string; id: string }> = [
    { keyword: 'accounting', id: 'accounting' },
    { keyword: 'bangla', id: 'bangla' },
    { keyword: 'bengali', id: 'bangla' },
    { keyword: 'botany', id: 'botany' },
    { keyword: 'chemistry', id: 'chemistry' },
    { keyword: 'economics', id: 'economics' },
    { keyword: 'english', id: 'english' },
    { keyword: 'finance', id: 'finance' },
    { keyword: 'banking', id: 'finance' },
    { keyword: 'geography', id: 'geography' },
    { keyword: 'management', id: 'management' },
    { keyword: 'marketing', id: 'marketing' },
    { keyword: 'mathematics', id: 'mathematics' },
    { keyword: 'philosophy', id: 'philosophy' },
    { keyword: 'physics', id: 'physics' },
    { keyword: 'political', id: 'political-science' },
    { keyword: 'psychology', id: 'psychology' },
    { keyword: 'sociology', id: 'sociology' },
    { keyword: 'statistics', id: 'statistics' },
    { keyword: 'zoology', id: 'zoology' },
    { keyword: 'history', id: 'history' },
  ];

  for (const item of distinctKeywords) {
    if (raw.includes(item.keyword)) {
      return DEPARTMENT_TEMPLATES.find((t) => t.id === item.id) || null;
    }
  }

  return null;
}
