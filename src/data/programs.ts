export interface ProgramHours {
  label: string;
  hours: number;
}

export interface Program {
  slug: string;
  name: string;
  shortName?: string;
  category: 'core' | 'specialty';
  certificateType: string;
  prerequisite: string;
  totalFlightHours: number | string;
  hoursBreakdown: ProgramHours[];
  price: string;
  deposit?: string;
  description: string;
  highlights: string[];
  enrollmentRequirements?: string[];
  vaApproved?: boolean;
}

export const programs: Program[] = [
  {
    slug: 'private-pilot',
    name: 'Private Pilot',
    shortName: 'PPL',
    category: 'core',
    certificateType: 'Part 141',
    prerequisite: 'None',
    totalFlightHours: 45,
    hoursBreakdown: [
      { label: 'Flight Instruction', hours: 37.5 },
      { label: 'Ground Instruction', hours: 58.5 },
      { label: 'Pre/Post Instruction', hours: 27 },
      { label: 'Solo', hours: 7.5 },
    ],
    price: '$16,644.50',
    description: 'Your foundational course. Basic flight operations taught with airline-style crew coordination, checklist discipline, and the standards you\'ll be expected to meet on the flight deck.',
    highlights: [
      'Crew concept training from day one',
      'Examining Authority — no DPE checkride wait',
      'Challenge / response checklist methodology',
      'Airline-developed materials and flows',
      'Foundation for every advanced rating',
    ],
    enrollmentRequirements: [
      'Read, write, speak, and understand English',
      'Provide a passport or birth certificate for proof of U.S. citizenship (international students must complete TSA registration and authorization)',
      'Obtain at least an FAA third-class medical certificate (first-class highly recommended)',
      'Obtain an FAA student pilot certificate',
      'Required course training materials, due before enrollment (student books/supplies and in-processing course if not previously attended)',
      'Secure non-owned aircraft insurance with $50,000 physical damage coverage for single-engine aircraft before your first flight',
    ],
    vaApproved: false,
  },
  {
    slug: 'transition-course',
    name: 'Transition Course',
    category: 'specialty',
    certificateType: 'Part 141',
    prerequisite: 'Private Pilot Certificate or higher rating',
    totalFlightHours: 5,
    hoursBreakdown: [
      { label: 'Dual Single-Engine', hours: 5 },
      { label: 'Ground Instruction', hours: 5 },
      { label: 'Pre/Post Instruction', hours: 3 },
    ],
    price: '$1,700',
    description: 'For pilots joining DCFA with an existing PPL or higher. Orients you to our training documentation, instructor expectations, and the academy\'s flow-based procedures. Required before aircraft rental.',
    highlights: [
      'Required to rent academy aircraft',
      'Orientation to DCFA training methodology',
      'Bridges your existing skills to airline-style flows',
    ],
    enrollmentRequirements: [
      'Required course training materials, due before enrollment (student books/supplies and in-processing course if not previously attended)',
      'Secure non-owned aircraft insurance — $75,000 physical damage coverage for multi-engine if enrolling in the Multi-Engine Commercial Add-On, or $50,000 for any other course',
    ],
  },
  {
    slug: 'instrument-rating',
    name: 'Instrument Rating',
    shortName: 'IR',
    category: 'core',
    certificateType: 'Part 141',
    prerequisite: 'Private Pilot Certificate',
    totalFlightHours: 47,
    hoursBreakdown: [
      { label: 'Flight Instruction', hours: 47 },
      { label: 'Ground Instruction', hours: 56.5 },
      { label: 'Pre/Post Instruction', hours: 27.5 },
    ],
    price: '$17,628',
    description: 'Operate in instrument meteorological conditions (IMC) with the same procedures and precision airlines require of their pilots. Heavy emphasis on commercial-operator IFR techniques.',
    highlights: [
      'Examining Authority — no DPE wait',
      'IMC procedures taught to airline standards',
      'Real-world IFR scenario training',
      'VA-approved program',
    ],
    enrollmentRequirements: [
      'Required course training materials, due before enrollment (student books/supplies and in-processing course if not previously attended)',
      'Secure non-owned aircraft insurance with $50,000 physical damage coverage for single-engine aircraft',
    ],
    vaApproved: true,
  },
  {
    slug: 'commercial-single-engine',
    name: 'Commercial Single-Engine',
    shortName: 'CSEL',
    category: 'core',
    certificateType: 'Part 141',
    prerequisite: 'Instrument Rating',
    totalFlightHours: 121,
    hoursBreakdown: [
      { label: 'Single Engine', hours: 104 },
      { label: 'Complex / Multi-Engine', hours: 17 },
      { label: 'Ground Instruction', hours: 54 },
      { label: 'Pre/Post Instruction', hours: 33 },
    ],
    price: '$36,738',
    description: 'The transition from hobby to profession. Learn the standards and decision-making expected in real-world commercial operations, with an introduction to multi-engine flying built in.',
    highlights: [
      'Professional flying standards',
      'Includes 17 hours of complex / multi-engine time',
      'Bridges to ATP qualification',
      'VA-approved program',
    ],
    enrollmentRequirements: [
      'Required course training materials, due before enrollment (student books/supplies and in-processing course if not previously attended)',
      'Secure non-owned aircraft insurance with $50,000 physical damage coverage for single-engine aircraft',
    ],
    vaApproved: true,
  },
  {
    slug: 'multi-engine-add-on',
    name: 'Multi-Engine Commercial Add-On',
    shortName: 'MEL',
    category: 'core',
    certificateType: 'Part 141',
    prerequisite: 'Commercial Single-Engine',
    totalFlightHours: '12.5 (10.5 aircraft + 2 sim)',
    hoursBreakdown: [
      { label: 'DA-42 Flight', hours: 10.5 },
      { label: 'DA-42 Simulator', hours: 2 },
      { label: 'Ground School', hours: 19 },
      { label: 'Flight Instruction', hours: 12.5 },
    ],
    price: '$6,980–$7,905',
    description: 'Earn a Multi-Engine Land rating on your Commercial certificate — advanced systems, asymmetric-thrust handling, and crew-style multi-engine operations in the Diamond DA-42.',
    highlights: [
      'Add a Multi-Engine Land rating to your Commercial certificate',
      'Advanced systems and asymmetric-thrust training in the Diamond DA-42',
      'Price varies with simulator utilization',
    ],
    enrollmentRequirements: [
      'Required course training materials, due before enrollment (student books/supplies and in-processing course if not previously attended)',
      'Secure non-owned aircraft insurance with $75,000 physical damage coverage for multi-engine aircraft before your first flight',
    ],
    vaApproved: true,
  },
  {
    slug: 'atp-multi-engine',
    name: 'ATP Multi-Engine',
    shortName: 'ATP',
    category: 'core',
    certificateType: 'Part 61',
    prerequisite: 'Commercial Multi-Engine',
    totalFlightHours: 6.5,
    hoursBreakdown: [
      { label: 'Flight Instruction', hours: 6.5 },
      { label: 'Ground Instruction', hours: 20 },
      { label: 'Pre/Post Instruction', hours: 8 },
    ],
    price: '$4,715',
    description: 'The Airline Transport Pilot certificate — the highest pilot certification the FAA issues. Covers Part 121 regulations and the crewed multi-engine protocols of airline operations.',
    highlights: [
      'Part 121 regulations and procedures',
      'Airline crew protocol training',
      'Highest pilot certification available',
    ],
    enrollmentRequirements: [
      'Required course training materials, due before enrollment (student books/supplies and in-processing course if not previously attended)',
      'Secure non-owned aircraft insurance with $75,000 physical damage coverage for multi-engine aircraft before your first flight',
    ],
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find(p => p.slug === slug);
}
