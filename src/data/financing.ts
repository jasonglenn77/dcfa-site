export interface Lender {
  name: string;
  url: string;
  description: string;
}

export const lenders: Lender[] = [
  {
    name: 'Stratus Financial',
    url: 'https://apply.stratus.finance',
    description: 'Hassle-free flight school loan program designed specifically for aspiring pilots. Stratus understands the aviation industry and the timeline of professional flight training.',
  },
  {
    name: 'AOPA Finance',
    url: 'https://finance.aopa.org/flight-training-finance',
    description: 'The Aircraft Owners and Pilots Association — the largest general aviation organization — offers training financing alongside its broader aviation member resources.',
  },
];

export interface Scholarship {
  organization: string;
  award: string;
  eligibility: string;
  notes?: string;
  url?: string;
}

export const scholarships: Scholarship[] = [
  {
    organization: 'Colorado Pilots Association',
    award: 'Varies',
    eligibility: 'All pilots',
    notes: 'Focus on safe flying in the Rocky Mountains.',
  },
  {
    organization: 'EAA (Experimental Aircraft Association)',
    award: 'Varies',
    eligibility: 'Various — check local chapter',
    notes: 'Includes the "Young Eagles" program.',
  },
  {
    organization: 'NATA Navigate Your Future',
    award: '$2,500',
    eligibility: 'High school graduates',
    notes: 'Annual; one award per year.',
  },
  {
    organization: 'NBAA',
    award: 'Varies',
    eligibility: 'Student pilots and mechanics',
    notes: 'Multiple scholarships with rolling deadlines.',
  },
  {
    organization: 'The Ninety-Nines',
    award: 'Up to $20,000',
    eligibility: 'Women pilots',
    notes: 'Founded by Amelia Earhart. Supports both initial and advanced ratings.',
  },
  {
    organization: 'Tuskegee Airmen — Hubert L. Jones Chapter',
    award: 'Varies',
    eligibility: 'Minority HS seniors / recent graduates',
    notes: 'Colorado-based chapter. National-level scholarship also available.',
  },
  {
    organization: 'Women in Aviation International',
    award: 'Varies',
    eligibility: 'WAI members only',
    notes: 'Annual program; membership required.',
  },
];

export const vaBenefits = {
  acceptedChapters: [
    { code: 'Chapter 30', name: 'Montgomery GI Bill — Active Duty' },
    { code: 'Chapter 33', name: 'Post-9/11 GI Bill' },
    { code: 'Chapter 1606', name: 'Montgomery GI Bill — Selected Reserve' },
    { code: 'Chapter 1607', name: 'Reserve Educational Assistance Program' },
  ],
  approvedPrograms: [
    'Instrument Rating',
    'Commercial Single-Engine Land',
  ],
  notEligible: ['Private Pilot certificate'],
  fundingWindow: 'August 1 – July 31 annually',
  applicationSteps: [
    {
      title: 'Obtain your Certificate of Eligibility (COE)',
      detail: 'Apply at va.gov/education/how-to-apply before beginning flight training.',
      url: 'https://www.va.gov/education/how-to-apply/',
    },
    {
      title: 'Get an FAA Class I or II medical certificate',
      detail: 'We recommend Dr. Jerome Limoge in Colorado Springs, or use the FAA AME locator to find an Aviation Medical Examiner near you.',
      url: 'https://www.faa.gov/pilots/amelocator',
    },
    {
      title: 'Apply to DCFA',
      detail: 'Submit our information request form, selecting the program option that matches your goal.',
      url: '/contact',
    },
  ],
};
