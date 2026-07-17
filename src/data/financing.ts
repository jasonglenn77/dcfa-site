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

// Scholarships moved to src/data/scholarships/scholarships.json (editable in Tina).

export const vaBenefits = {
  acceptedChapters: [
    { code: 'Chapter 30', name: 'Montgomery GI Bill — Active Duty' },
    { code: 'Chapter 33', name: 'Post-9/11 GI Bill' },
    { code: 'Chapter 1606', name: 'Montgomery GI Bill — Selected Reserve' },
    { code: 'Chapter 1607', name: 'Reserve Educational Assistance Program' },
  ],
  // Sources, newest first — do not trim this list to match flydcfa.com, which is
  // out of date (it lists only Instrument + Commercial). See docs/feedback/backlog.md.
  //   BJ,    2026-06-24: add Multi-Engine Commercial Add-On.
  //   Frank, 2026-06-15: add ATP-CTP (simulator time only; $650 VA ground school).
  // Pending: DCFA to confirm the definitive list, then restore a hard count to the
  // va-benefits subtitle + home band (worded count-free until he does).
  approvedPrograms: [
    'Instrument Rating',
    'Commercial Single-Engine Land',
    'Multi-Engine Commercial Add-On',
    'ATP-CTP (simulator time only)',
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
