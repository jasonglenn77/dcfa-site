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
  // VR&E is 38 U.S.C. Chapter 31 — a separate benefit from the GI Bill, so the
  // headings that render this list say "VA benefits", not "GI Bill chapters".
  acceptedChapters: [
    { code: 'Chapter 30', name: 'Montgomery GI Bill — Active Duty' },
    { code: 'Chapter 33', name: 'Post-9/11 GI Bill' },
    { code: 'Chapter 1606', name: 'Montgomery GI Bill — Selected Reserve' },
    { code: 'Chapter 1607', name: 'Reserve Educational Assistance Program' },
    { code: 'Chapter 31', name: 'Veteran Readiness & Employment (VR&E)' },
  ],
  // CONFIRMED by DCFA, "VA Programs listed out for Website" (2026-07): these four,
  // each with its own approved TCO. This supersedes flydcfa.com, which is out of
  // date and lists only Instrument + Commercial. See docs/feedback/backlog.md.
  approvedPrograms: [
    'Instrument Rating',
    'Commercial Single-Engine Land',
    'Multi-Engine Commercial Add-On',
    'ATP-CTP (simulator time only)',
  ],
  notEligible: ['Private Pilot certificate'],
  fundingWindow: 'August 1 – July 31 annually',

  // How VA reimbursement relates to the program price. Confirmed by Ben Dwyer
  // (2026-07): the VA reimburses only the hours it approves, which can be fewer
  // than the full course requires — e.g. it approves 15 pre/post-briefing hours
  // on the Instrument Rating while the full course runs roughly 30. So the prices
  // on the Training page (full course cost) are higher than the VA-approved amount.
  costExplainer: {
    heading: 'How VA reimbursement affects your cost',
    body:
      'The VA reimburses the hours it approves for each course, which can be fewer than the full course requires. For example, the VA approves 15 hours of pre/post-flight briefing for the Instrument Rating, while the full course includes roughly 30. You are responsible for the difference between the VA-approved hours and the full program. The prices shown on our Training page are the full course cost — talk to us and we will walk you through what your specific benefit is expected to cover.',
  },

  // Verbatim compliance statements supplied by DCFA.
  complianceNotes: [
    'DCFA is approved by the Department of Veterans Affairs to train eligible veterans using GI Bill® and Veteran Readiness & Employment (VR&E) benefits.',
    'Eligible veterans may receive reimbursement for approved training hours in accordance with 38 CFR.',
    'Only VA-approved courses listed in WEAMS are eligible for reimbursement.',
    'Students must hold a valid Class II medical certificate at enrollment to receive VA benefits.',
    'Non-reimbursable items include software, iPads, supplies, and personal equipment.',
  ],

  // Requirements common to every VA-approved program.
  commonEligibility: [
    'Current Class II Medical Certificate',
    'Ability to read, speak, and understand English',
    'A vocational objective in aviation (a VA requirement)',
  ],

  // Per-program VA detail. Pricing and hours deliberately live in programs.ts /
  // the ATP-CTP page so the site has a single source of truth for each number.
  programDetails: [
    {
      name: 'Instrument Rating',
      href: '/training#instrument-rating',
      overview:
        'Structured, FAA-approved training under 14 CFR Part 141. Veterans, service members, and reservists may use VA education benefits toward this course when they meet all VA and FAA eligibility requirements.',
      prerequisite:
        'Private Pilot Certificate — or concurrent enrollment in the Instrument Rating course',
      equipment: ['Piper Cherokee / Warrior / Archer', 'Elite DA-42 Advanced Aviation Training Device (AATD)'],
    },
    {
      name: 'Commercial Single-Engine',
      href: '/training#commercial-single-engine',
      overview:
        'A Part 141 Commercial Pilot course meeting all FAA Appendix D requirements, fully eligible for VA reimbursement when the student meets the medical and enrollment criteria.',
      prerequisite: 'Private Pilot Certificate with Instrument Rating',
      equipment: [
        'Piper Cherokee / Warrior / Archer (single-engine)',
        'Diamond DA-42 Twin Star (multi-engine)',
        'Elite DA-42 AATD',
      ],
    },
    {
      name: 'Multi-Engine Add-On Rating',
      href: '/training#multi-engine-add-on',
      overview:
        'An accelerated add-on rating for commercial pilots seeking multi-engine privileges. Fully Part 141 compliant and VA-eligible.',
      prerequisite: 'Commercial Pilot Certificate with Instrument Rating',
      equipment: ['Diamond DA-42 Twin Star', 'Elite DA-42 AATD'],
    },
    {
      name: 'ATP-CTP',
      href: '/atp-ctp',
      overview:
        "DCFA's ATP Certification Training Program provides the training required before the ATP written exam. Veterans may use VA benefits toward this course when they meet all eligibility requirements.",
      prerequisite: 'Commercial Pilot Certificate with Instrument Rating',
      equipment: ['Airbus A320-200 Flight Training Device (FSTD)', 'Airbus A320-200 full-flight simulators'],
      // Ben Dwyer (2026-07): the VA does not currently reimburse virtual ground
      // school. Our standard ATP-CTP ground school is virtual, so for VA students
      // that portion (~$600) is out of pocket; the VA covers the simulator training.
      // When a class is run in person, VA benefits can cover the full $4,995.
      note:
        'Our ATP-CTP ground school is delivered virtually, and the VA does not currently reimburse virtual ground school — so for VA students that portion (about $600) is out of pocket while the VA covers the simulator training. When we run a class in person, VA benefits can cover the full $4,995.',
    },
  ],

  applicationSteps: [
    {
      title: 'Obtain your Certificate of Eligibility (COE)',
      detail: 'Apply at va.gov/education/how-to-apply before beginning flight training.',
      url: 'https://www.va.gov/education/how-to-apply/',
    },
    {
      title: 'Get an FAA Class II medical certificate',
      detail: 'A valid Class II medical is required at enrollment to receive VA benefits. We recommend Dr. Jerome Limoge in Colorado Springs, or use the FAA AME locator to find an Aviation Medical Examiner near you.',
      url: 'https://www.faa.gov/pilots/amelocator',
    },
    {
      title: 'Apply to DCFA',
      detail: 'Submit our information request form, selecting the program option that matches your goal.',
      url: '/contact',
    },
  ],
};
