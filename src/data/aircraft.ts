export interface Aircraft {
  tailNumber: string;
  type: string;
  category: 'single' | 'multi';
  hourlyRate: number;
  description?: string;
  image?: string;
}

export const aircraft: Aircraft[] = [
  {
    tailNumber: 'N342T',
    type: 'Multi-Engine Twin',
    category: 'multi',
    hourlyRate: 400,
    description: 'Twin-engine trainer for multi-engine ratings, ATP preparation, and time-building toward the 25-hour multi-engine ATP requirement.',
    image: '/images/aircraft/da42-air.png',
  },
  {
    tailNumber: 'N7206C',
    type: 'Single-Engine',
    category: 'single',
    hourlyRate: 165,
    description: 'Entry-rate single-engine trainer.',
  },
  {
    tailNumber: 'N29230',
    type: 'Single-Engine',
    category: 'single',
    hourlyRate: 198,
  },
  {
    tailNumber: 'N555PB',
    type: 'Single-Engine',
    category: 'single',
    hourlyRate: 198,
  },
  {
    tailNumber: 'N38989',
    type: 'Single-Engine',
    category: 'single',
    hourlyRate: 198,
  },
  {
    tailNumber: 'N8650E',
    type: 'Single-Engine',
    category: 'single',
    hourlyRate: 198,
  },
];

export const instructionRate = 70;
