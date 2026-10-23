export interface ExpertiseItem {
  id: string;
  title: string;
  category: string;
  image: string;
  iconType: string;
  description: string;
  features: string[];
}

export interface ProjectSectorItem {
  id: string;
  title: string;
  iconType: string;
  image: string;
  bullets: string[];
  description: string;
}

export const areasOfExpertise: ExpertiseItem[] = [
  {
    id: 'exp-vrv-vrf',
    title: 'VRV / VRF Air-Conditioning Systems',
    category: 'Commercial & Multi-Zone',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    iconType: 'vrv',
    description: 'Advanced Variable Refrigerant Volume / Flow technology delivering simultaneous multi-zone cooling, intelligent load modulation, and maximum energy efficiency for modern towers.',
    features: [
      'Inverter-driven scroll compressors',
      'Individual temperature control per zone',
      'Extended piping lengths up to 1000m',
      'Up to 45% lower operational energy cost',
    ],
  },
  {
    id: 'exp-cassette',
    title: 'Cassette AC',
    category: 'Architectural Cooling',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    iconType: 'cassette',
    description: 'Ceiling-embedded 4-way and circular blow cassette systems engineered for high-ceiling retail, modern open offices, and premium executive conference suites.',
    features: [
      '360-degree draft-free air circulation',
      'Flush architectural ceiling integration',
      'Ultra-silent acoustic performance',
      'Integrated high-lift drain pumps',
    ],
  },
  {
    id: 'exp-split',
    title: 'Split AC',
    category: 'High-Efficiency Units',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80',
    iconType: 'split',
    description: 'Premium inverter wall-mounted split units with advanced multi-stage allergen filtration, rapid turbo chilling, and high 5-star ISEER ratings.',
    features: [
      'Heavy-duty copper heat exchangers',
      'Anti-bacterial & PM 2.5 air filtration',
      'Dual inverter stabilizer-free operation',
      'Smart Wi-Fi IoT scheduling support',
    ],
  },
  {
    id: 'exp-ductable',
    title: 'Ductable AC Systems',
    category: 'Central Concealed',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    iconType: 'ductable',
    description: 'Concealed central ductable air-conditioning engineered with precision sheet metal ducting, acoustic insulation, and aerodynamic linear slot diffusers.',
    features: [
      'Invisible ceiling aesthetics with linear grilles',
      'High external static pressure (ESP)',
      'Uniform thermal distribution across wide spans',
      'Fresh air intake with energy recovery options',
    ],
  },
  {
    id: 'exp-floor-standing',
    title: 'Floor Standing Units',
    category: 'High-Capacity Column',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&q=80',
    iconType: 'floor',
    description: 'Powerful vertical floor-mounted column units designed for rapid, high-volume air throw in expansive lobbies, banquet halls, airports, and exhibition centers.',
    features: [
      'Long-distance directional air throw (up to 20m)',
      'Touch LED control with auto-swing louvers',
      'Rapid cooling for high-occupancy crowds',
      'Compact footprint with high tonnage capacity',
    ],
  },
  {
    id: 'exp-package',
    title: 'Package Units',
    category: 'Central Rooftop',
    image: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=600&q=80',
    iconType: 'package',
    description: 'Self-contained rooftop packaged systems combining compressor, condenser, evaporator, and air handler into a single weatherized central unit.',
    features: [
      'Zero indoor plant room footprint required',
      'Factory-assembled and pre-charged reliability',
      'Heavy-gauge galvanized steel weatherproofing',
      'Easy ground or roof crane serviceability',
    ],
  },
  {
    id: 'exp-maintenance',
    title: 'Preventive & Breakdown Maintenance',
    category: 'Technical Services',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    iconType: 'maintenance',
    description: 'Round-the-clock emergency breakdown support and proactive preventive lifecycle maintenance executed by certified HVAC refrigeration technicians.',
    features: [
      '2-hour emergency response SLA for critical setups',
      'Refrigerant leak detection & coil descaling',
      'Electrical control panel thermal auditing',
      '100% genuine OEM spare replacements',
    ],
  },
  {
    id: 'exp-amc',
    title: 'AMC Services',
    category: 'Contracts & SLA',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    iconType: 'amc',
    description: 'Tailored Comprehensive & Non-Comprehensive Annual Maintenance Contracts ensuring 99.8% uptime, seasonal efficiency optimization, and fixed operational budgets.',
    features: [
      'Quarterly comprehensive wet & dry service routines',
      'Dedicated on-site facility resident engineers',
      'Priority spare part procurement discounts',
      'Digital health compliance audit certificates',
    ],
  },
];

export const projectSectors: ProjectSectorItem[] = [
  {
    id: 'sector-corporate',
    title: 'Corporate Offices',
    iconType: 'building',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    bullets: [
      'VRV / VRF Systems',
      'Cassette & Split AC',
      'AMC & Maintenance',
    ],
    description: 'Delivering precision multi-zone thermal comfort, silent acoustics, and green building LEED compliance for IT parks, corporate towers, and BFSI headquarters.',
  },
  {
    id: 'sector-retail',
    title: 'Retail & Shopping Malls',
    iconType: 'shopping',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Ductable AC Systems',
      'Package Units',
      'Preventive Maintenance',
    ],
    description: 'High-volume airflow management, uniform cooling across high-traffic atriums, and energy-optimized rooftop package units for hypermarkets and luxury retail.',
  },
  {
    id: 'sector-manufacturing',
    title: 'Manufacturing Units',
    iconType: 'factory',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Industrial AC Solutions',
      'Floor Standing Units',
      'Breakdown Support',
    ],
    description: 'Heavy-duty industrial cooling, precision temperature/humidity control for clean rooms, machine shop ventilation, and 24/7 mission-critical breakdown support.',
  },
  {
    id: 'sector-hospitals',
    title: 'Hospitals & Healthcare',
    iconType: 'hospital',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Clean & Efficient Cooling',
      'Cassette & Split AC',
      'AMC Services',
    ],
    description: 'Specialized healthcare climate engineering: sterile positive pressure operation for Operation Theatres, ICU laminar airflow, HEPA filtration, and strict zero-downtime AMCs.',
  },
  {
    id: 'sector-education',
    title: 'Educational Institutions',
    iconType: 'education',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Split & Cassette AC',
      'Ductable Systems',
      'Annual Maintenance Contracts',
    ],
    description: 'Energy-conscious cooling for auditorium complexes, university libraries, research laboratories, and smart lecture theaters with centralized scheduling.',
  },
];
