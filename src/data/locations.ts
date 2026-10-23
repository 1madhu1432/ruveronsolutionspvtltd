import type { LocationItem } from '../types';

export const initialLocations: LocationItem[] = [
  // Andhra Pradesh (Core Operating State)
  {
    id: 'loc-ap-vijayawada',
    state: 'Andhra Pradesh',
    district: 'Vijayawada (NTR)',
    isHQ: true,
    status: 'Active',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'loc-ap-guntur',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-02T00:00:00.000Z',
  },
  {
    id: 'loc-ap-vizag',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-02T00:00:00.000Z',
  },
  {
    id: 'loc-ap-amaravati',
    state: 'Andhra Pradesh',
    district: 'Amaravati (Capital Region)',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-03T00:00:00.000Z',
  },
  {
    id: 'loc-ap-tirupati',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-03T00:00:00.000Z',
  },
  {
    id: 'loc-ap-rajahmundry',
    state: 'Andhra Pradesh',
    district: 'Rajahmundry (East Godavari)',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-04T00:00:00.000Z',
  },
  {
    id: 'loc-ap-kakinada',
    state: 'Andhra Pradesh',
    district: 'Kakinada',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-04T00:00:00.000Z',
  },
  {
    id: 'loc-ap-nellore',
    state: 'Andhra Pradesh',
    district: 'Nellore (SPSR Nellore)',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-05T00:00:00.000Z',
  },
  {
    id: 'loc-ap-kurnool',
    state: 'Andhra Pradesh',
    district: 'Kurnool',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-05T00:00:00.000Z',
  },
  {
    id: 'loc-ap-anantapur',
    state: 'Andhra Pradesh',
    district: 'Anantapur',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-06T00:00:00.000Z',
  },
  {
    id: 'loc-ap-kadapa',
    state: 'Andhra Pradesh',
    district: 'Kadapa (YSR District)',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-06T00:00:00.000Z',
  },
  {
    id: 'loc-ap-ongole',
    state: 'Andhra Pradesh',
    district: 'Ongole (Prakasam)',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-07T00:00:00.000Z',
  },
  {
    id: 'loc-ap-eluru',
    state: 'Andhra Pradesh',
    district: 'Eluru',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-07T00:00:00.000Z',
  },

  // Telangana
  {
    id: 'loc-ts-hyderabad',
    state: 'Telangana',
    district: 'Hyderabad',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-08T00:00:00.000Z',
  },
  {
    id: 'loc-ts-secunderabad',
    state: 'Telangana',
    district: 'Secunderabad',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-08T00:00:00.000Z',
  },
  {
    id: 'loc-ts-warangal',
    state: 'Telangana',
    district: 'Warangal (Hanamkonda)',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-09T00:00:00.000Z',
  },
  {
    id: 'loc-ts-karimnagar',
    state: 'Telangana',
    district: 'Karimnagar',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-09T00:00:00.000Z',
  },
  {
    id: 'loc-ts-nizamabad',
    state: 'Telangana',
    district: 'Nizamabad',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-10T00:00:00.000Z',
  },
  {
    id: 'loc-ts-khammam',
    state: 'Telangana',
    district: 'Khammam',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-10T00:00:00.000Z',
  },
  {
    id: 'loc-ts-rangareddy',
    state: 'Telangana',
    district: 'Rangareddy',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-11T00:00:00.000Z',
  },

  // Karnataka
  {
    id: 'loc-ka-bengaluru',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-12T00:00:00.000Z',
  },
  {
    id: 'loc-ka-mysuru',
    state: 'Karnataka',
    district: 'Mysuru',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-12T00:00:00.000Z',
  },
  {
    id: 'loc-ka-mangaluru',
    state: 'Karnataka',
    district: 'Mangaluru (Dakshina Kannada)',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-13T00:00:00.000Z',
  },

  // Tamil Nadu
  {
    id: 'loc-tn-chennai',
    state: 'Tamil Nadu',
    district: 'Chennai',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-14T00:00:00.000Z',
  },
  {
    id: 'loc-tn-coimbatore',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-14T00:00:00.000Z',
  },
  {
    id: 'loc-tn-madurai',
    state: 'Tamil Nadu',
    district: 'Madurai',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-15T00:00:00.000Z',
  },

  // Maharashtra
  {
    id: 'loc-mh-mumbai',
    state: 'Maharashtra',
    district: 'Mumbai',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-16T00:00:00.000Z',
  },
  {
    id: 'loc-mh-pune',
    state: 'Maharashtra',
    district: 'Pune',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-16T00:00:00.000Z',
  },
  {
    id: 'loc-mh-nagpur',
    state: 'Maharashtra',
    district: 'Nagpur',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-17T00:00:00.000Z',
  },

  // Delhi NCR
  {
    id: 'loc-dl-delhi',
    state: 'Delhi NCR',
    district: 'New Delhi',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-18T00:00:00.000Z',
  },
  {
    id: 'loc-dl-gurugram',
    state: 'Delhi NCR',
    district: 'Gurugram',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-18T00:00:00.000Z',
  },
  {
    id: 'loc-dl-noida',
    state: 'Delhi NCR',
    district: 'Noida (Gautam Buddha Nagar)',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-19T00:00:00.000Z',
  },

  // Kerala
  {
    id: 'loc-kl-kochi',
    state: 'Kerala',
    district: 'Kochi (Ernakulam)',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-20T00:00:00.000Z',
  },

  // Gujarat
  {
    id: 'loc-gj-ahmedabad',
    state: 'Gujarat',
    district: 'Ahmedabad',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-21T00:00:00.000Z',
  },

  // West Bengal
  {
    id: 'loc-wb-kolkata',
    state: 'West Bengal',
    district: 'Kolkata',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-22T00:00:00.000Z',
  },

  // Pan-India / Remote
  {
    id: 'loc-all-remote',
    state: 'Pan-India / Remote',
    district: 'All Operating Territories',
    isHQ: false,
    status: 'Active',
    createdAt: '2026-01-23T00:00:00.000Z',
  },
];

/** Formats a LocationItem into a clean display label (e.g. "Vijayawada (NTR), Andhra Pradesh (HQ)") */
export const formatLocationLabel = (loc: LocationItem): string => {
  return `${loc.district}, ${loc.state}${loc.isHQ ? ' (Corporate HQ)' : ''}`;
};

/** Groups a list of LocationItem by State name */
export const groupLocationsByState = (locations: LocationItem[]): Record<string, LocationItem[]> => {
  return locations.reduce<Record<string, LocationItem[]>>((acc, loc) => {
    const stateName = loc.state || 'Other Regions';
    if (!acc[stateName]) {
      acc[stateName] = [];
    }
    acc[stateName].push(loc);
    return acc;
  }, {});
};

/** Extracts unique sorted list of States */
export const getDistinctStates = (locations: LocationItem[]): string[] => {
  const states = Array.from(new Set(locations.map((l) => l.state))).filter(Boolean);
  return states.sort((a, b) => {
    // Prioritize Andhra Pradesh & Telangana
    if (a === 'Andhra Pradesh') return -1;
    if (b === 'Andhra Pradesh') return 1;
    if (a === 'Telangana') return -1;
    if (b === 'Telangana') return 1;
    return a.localeCompare(b);
  });
};

/** Fallback static list for legacy compatibility */
export const corporateLocations = [
  'Vijayawada (Headquarters)',
  'Hyderabad',
  'Visakhapatnam',
  'Guntur',
  'Amaravati',
  'Tirupati',
  'Rajahmundry',
  'Nellore',
  'Bengaluru',
  'Chennai',
  'Mumbai',
  'Pune',
  'Delhi NCR',
  'Kolkata',
  'Ahmedabad',
  'Coimbatore',
  'Kochi',
  'Pan-India / Remote',
  'Other Location',
] as const;

export type CorporateLocation = typeof corporateLocations[number];
