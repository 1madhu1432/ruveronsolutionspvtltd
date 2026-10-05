import type {
  CompanyInfo,
  HomeContent,
  AboutContent,
  SolutionItem,
  ServiceItem,
  TestimonialItem,
  TeamItem,
  LeadItem,
  SEOSettings,
  MediaItem,
} from '../types';

export const initialCompanyInfo: CompanyInfo = {
  companyName: 'RUVERON SOLUTIONS PRIVATE LIMITED',
  tagline: 'Integrated HR & Payroll Management Partner',
  street: '61-9/1-26, 2nd Lane',
  line2: '',
  area: 'Kalanagar',
  landmark: 'Near Skewbridge, Krishnalanka',
  city: 'Vijayawada (Urban)',
  district: 'Krishna District',
  pincode: '520013',
  state: 'Andhra Pradesh',
  fullAddress: '61-9/1-26, 2nd Lane, Kalanagar, Near Skewbridge, Krishnalanka, Vijayawada (Urban), Krishna District - 520013, Andhra Pradesh.',
  phone: '+91-9985965566',
  email: 'RUVERONSOLUTIONSPVTLTD@GMAIL.COM',
  mapsIframeUrl: 'https://maps.google.com/maps?q=Krishnalanka,%20Vijayawada,%20Andhra%20Pradesh%20520013&t=&z=15&ie=UTF8&iwloc=&output=embed',
};

export const initialHomeContent: HomeContent = {
  heroHeading: 'Integrated HR & Payroll Management Partner',
  heroSubtitle: 'Empowering organizations with agile workforce solutions, efficient payroll management, compliance expertise, and technology-enabled HR execution.',
  heroPrimaryBtnText: 'Talk to Our Experts',
  heroSecondaryBtnText: 'Explore Our Services',
  whoWeAreTitle: 'Who We Are',
  whoWeAreContent: 'RUVERON SOLUTIONS is a fully integrated HR solutions and payroll management services provider with a strong presence across industries and growth stages. We operate at the intersection of people strategy, process excellence, and technology-enabled execution.',
  missionHeading: 'Our Mission',
  missionStatement: 'We are committed to empowering organizations with agile and efficient payroll management solutions tailored to their unique business needs.',
  missionPoints: [
    { title: 'Agile Solutions', desc: 'Flexible HR structures adaptable to evolving business requirements.' },
    { title: 'Efficient Payroll Management', desc: 'Accurate, timely, and compliant payroll processing frameworks.' },
    { title: 'Business-Focused HR Support', desc: 'Strategic alignment of workforce initiatives with core commercial goals.' },
    { title: 'Employee Experience', desc: 'Enhanced worker satisfaction through reliable HR service delivery.' },
  ],
  promiseHeading: 'Our Promise',
  promiseContent: 'RUVERON SOLUTIONS is positioned as a strategic partner for organizations seeking to optimize HR operations, ensure compliance, and unlock workforce potential with future-ready technology.',
  ctaHeading: 'Looking for a trusted HR & Payroll partner?',
  ctaSubtitle: "Let's build stronger, smarter and more people-centric organizations together.",
};

export const initialAboutContent: AboutContent = {
  heroTitle: 'About Ruveron Solutions',
  heroSubtitle: 'People. Process. Technology.',
  companyOverview: 'RUVERON SOLUTIONS PRIVATE LIMITED is a dedicated human resources and payroll management partner built to solve complex workforce challenges. We deliver end-to-end recruitment, staffing, payroll processing, and statutory compliance management across diverse industry sectors.',
  mission: 'We are committed to empowering organizations with agile and efficient payroll management solutions tailored to their unique business needs.',
  vision: 'To be the most trusted strategic partner for integrated workforce and payroll transformation, driving operational excellence and sustainable organizational growth.',
  approachPoints: [
    { title: 'Client-Centric Customization', desc: 'We design service delivery blueprints tailored to each client operational model and corporate culture.' },
    { title: 'Technology-Enabled Execution', desc: 'Modern tools and structured workflows ensure error-free processing and fast turnaround.' },
    { title: 'Zero-Tolerance Compliance', desc: 'Rigorous monitoring of statutory regulations keeps your business risk-free and fully compliant.' },
  ],
  strengths: [
    { title: 'Specialized Expertise', desc: 'Deep domain proficiency in pan-India statutory compliance, labor laws, and multi-tier payroll.' },
    { title: 'End-to-End Capabilities', desc: 'Single point of accountability from candidate sourcing to final settlement and statutory returns.' },
    { title: 'Scalable Operations', desc: 'Flexibility to support startups, growing SMBs, and large enterprise workforces smoothly.' },
  ],
  whyRuveron: [
    { title: 'Proven Track Record of Execution', desc: 'Consistent delivery of high-volume payroll and staffing operations with precision.' },
    { title: 'Long-Term Client Partnerships', desc: 'Building enduring relationships grounded in transparent governance and measurable outcome.' },
    { title: 'Trusted Workforce Transformation Partner', desc: 'Enhancing employee lifecycle operations to boost engagement and retention.' },
    { title: 'Operational Excellence & Sustainable Growth', desc: 'Standardized operational frameworks designed to scale alongside your organization.' },
  ],
};

export const initialSolutions: SolutionItem[] = [
  {
    id: 'sol-1',
    title: 'Workforce Solutions',
    category: 'Workforce Management',
    description: 'Comprehensive workforce planning, talent structuring, and deployment frameworks engineered to optimize operational capacity.',
    benefits: [
      'Agile talent deployment',
      'Optimized manpower costs',
      'Improved workforce productivity',
      'Strategic skill gap alignment'
    ],
    iconName: 'Users',
    status: 'published',
    updatedAt: '2026-10-01',
  },
  {
    id: 'sol-2',
    title: 'Staffing Solutions',
    category: 'Talent Acquisition',
    description: 'Flexible contract and temporary staffing models providing fast access to pre-screened, industry-ready personnel.',
    benefits: [
      'Rapid ramp-up capability',
      'Reduced hiring overhead',
      'Flexible contract durations',
      'Full administrative relief'
    ],
    iconName: 'UserCheck',
    status: 'published',
    updatedAt: '2026-10-01',
  },
  {
    id: 'sol-3',
    title: 'Payroll Solutions',
    category: 'Payroll & Compensation',
    description: 'End-to-end payroll architecture ensuring 100% computational accuracy, timely disbursement, and statutory deductions.',
    benefits: [
      'Zero-error salary computation',
      'Automated tax & PF/ESI calculation',
      'Direct deposit processing support',
      'Detailed ledger & reporting'
    ],
    iconName: 'Calculator',
    status: 'published',
    updatedAt: '2026-10-01',
  },
  {
    id: 'sol-4',
    title: 'HR Solutions',
    category: 'Corporate HR Ops',
    description: 'Strategic HR operational design covering onboarding, employee relations, performance framework, and documentation.',
    benefits: [
      'Standardized HR policies',
      'Seamless onboarding experience',
      'Clear job roles & grading',
      'Employee lifecycle management'
    ],
    iconName: 'Briefcase',
    status: 'published',
    updatedAt: '2026-10-01',
  },
  {
    id: 'sol-5',
    title: 'Compliance Support',
    category: 'Statutory & Regulatory',
    description: 'Proactive regulatory audit, statutory filings management, and legal compliance advisory for state and central labor mandates.',
    benefits: [
      'PF, ESI, LWF & PT compliance',
      'Statutory register maintenance',
      'Audit readiness guarantee',
      'Mitigated legal penalty risks'
    ],
    iconName: 'ShieldCheck',
    status: 'published',
    updatedAt: '2026-10-01',
  },
];

export const initialServices: ServiceItem[] = [
  {
    id: 'srv-1',
    name: 'Recruitment & Talent Acquisition',
    category: 'Sourcing & Hiring',
    shortDesc: 'End-to-end talent sourcing, candidate screening, executive placement, and workforce requirements fulfillment.',
    features: [
      'Executive Search & Direct Sourcing',
      'Volume & Bulk Hiring Campaigns',
      'Technical & Functional Skill Assessment',
      'End-to-End Interview Scheduling',
      'Offer Management & Onboarding Support'
    ],
    iconName: 'UserPlus',
    status: 'published',
    updatedAt: '2026-10-02',
  },
  {
    id: 'srv-2',
    name: 'Contract & Temporary Staffing',
    category: 'Staffing Services',
    shortDesc: 'Flexible staffing solutions for project-based demands, seasonal surges, and business continuity needs.',
    features: [
      'Flexi-Staffing & Short-Term Contracts',
      'Third-Party Payroll Staffing',
      'Project-Based Team Deployment',
      'Replacement Guarantee & Continuity',
      'Complete HR & Compliance Management'
    ],
    iconName: 'Clock',
    status: 'published',
    updatedAt: '2026-10-02',
  },
  {
    id: 'srv-3',
    name: 'Payroll Management Services',
    category: 'Payroll Operations',
    shortDesc: 'Turnkey payroll computation, tax deduction management, payslip generation, and direct bank payout support.',
    features: [
      'Gross-to-Net Salary Calculations',
      'Statutory Deductions (PF, ESI, PT, TDS)',
      'Digital Payslip Generation & Distribution',
      'Reimbursement & Bonus Processing',
      'Comprehensive MIS & Payroll Audits'
    ],
    iconName: 'DollarSign',
    status: 'published',
    updatedAt: '2026-10-02',
  },
  {
    id: 'srv-4',
    name: 'HR Solutions & Compliance',
    category: 'HR & Regulatory',
    shortDesc: 'Complete statutory compliance administration, labor law adherence, employee benefits, and policy design.',
    features: [
      'Statutory Returns & Filings (PF/ESI/PT)',
      'Labor Inspectorate Audit Support',
      'Employee Handbook & Policy Drafting',
      'Grievance Redressal & Disciplinary Frameworks',
      'Exit Management & Full & Final Settlement'
    ],
    iconName: 'FileCheck',
    status: 'published',
    updatedAt: '2026-10-02',
  },
  {
    id: 'srv-5',
    name: 'Industry-Focused HR Solutions',
    category: 'Sector Advisory',
    shortDesc: 'Customized HR frameworks designed for Manufacturing, IT/ITeS, Healthcare, Retail, and Logistics sectors.',
    features: [
      'Manufacturing Shift & Factory Compliance',
      'IT Talent Acquisition & Retention',
      'Retail Store & Field Staffing Management',
      'Healthcare Specialized Staffing',
      'Logistics & Distribution Manpower'
    ],
    iconName: 'Building2',
    status: 'published',
    updatedAt: '2026-10-02',
  },
];

export const initialTestimonials: TestimonialItem[] = []; // Empty state by default per requirement

export const initialTeam: TeamItem[] = []; // Empty state by default per requirement

export const initialMedia: MediaItem[] = [
  {
    id: 'med-1',
    title: 'Ruveron Brand Banner',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    size: '1.2 MB',
    type: 'image/jpeg',
    createdAt: '2026-10-03',
  },
  {
    id: 'med-2',
    title: 'Payroll Dashboard Mockup',
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    size: '890 KB',
    type: 'image/jpeg',
    createdAt: '2026-10-03',
  },
];

export const initialLeads: LeadItem[] = [
  {
    id: 'LEAD-1001',
    fullName: 'Rajesh Verma',
    phone: '+91-9876543210',
    email: 'r.verma@vanguardtech.in',
    company: 'Vanguard Tech Solutions',
    location: 'Hyderabad',
    requirement: 'Looking for contract staffing for 25 IT professionals and payroll outsourcing for 150 employees.',
    source: 'Website',
    status: 'New',
    createdAt: '2026-10-05T09:30:00Z',
    updatedAt: '2026-10-05T09:30:00Z',
    notes: [
      {
        id: 'note-1',
        date: '2026-10-05T09:30:00Z',
        author: 'System',
        text: 'Enquiry submitted via Website Contact Form.',
      },
    ],
    history: [
      {
        id: 'hist-1',
        date: '2026-10-05T09:30:00Z',
        action: 'Lead Created from Contact Form',
      },
    ],
  },
  {
    id: 'LEAD-1002',
    fullName: 'Ananya Sharma',
    phone: '+91-9944332211',
    email: 'ananya.sharma@apexhealth.com',
    company: 'Apex Health Systems',
    location: 'Vijayawada',
    requirement: 'Need statutory compliance audit and monthly payroll management for hospital staff.',
    source: 'Campaign',
    status: 'Contacted',
    createdAt: '2026-10-04T14:15:00Z',
    updatedAt: '2026-10-04T16:00:00Z',
    notes: [
      {
        id: 'note-2',
        date: '2026-10-04T16:00:00Z',
        author: 'Account Manager',
        text: 'Initial introductory call completed. Sent service catalog.',
      },
    ],
    history: [
      {
        id: 'hist-2',
        date: '2026-10-04T14:15:00Z',
        action: 'Lead Captured via Q4 Campaign',
      },
      {
        id: 'hist-3',
        date: '2026-10-04T16:00:00Z',
        action: 'Status updated to Contacted',
      },
    ],
  },
  {
    id: 'LEAD-1003',
    fullName: 'Vikram Reddy',
    phone: '+91-9123456789',
    email: 'vikram.r@deccanlogistics.com',
    company: 'Deccan Logistics Pvt Ltd',
    location: 'Visakhapatnam',
    requirement: 'Temporary staffing for 50 warehouse operators and labor law compliance support.',
    source: 'Website',
    status: 'Follow-up',
    createdAt: '2026-10-03T11:20:00Z',
    updatedAt: '2026-10-04T10:00:00Z',
    notes: [
      {
        id: 'note-3',
        date: '2026-10-04T10:00:00Z',
        author: 'Sales Specialist',
        text: 'Follow-up scheduled for contract rate negotiation.',
      },
    ],
    history: [
      {
        id: 'hist-4',
        date: '2026-10-03T11:20:00Z',
        action: 'Lead Created from Contact Form',
      },
      {
        id: 'hist-5',
        date: '2026-10-04T10:00:00Z',
        action: 'Status updated to Follow-up',
      },
    ],
  },
  {
    id: 'LEAD-1004',
    fullName: 'Priya Nair',
    phone: '+91-9811223344',
    email: 'priya@indusretail.com',
    company: 'Indus Retail Group',
    location: 'Bengaluru',
    requirement: 'Full HR outsourcing for 80 store staff including payroll, ESI/PF filings, and attendance tracking.',
    source: 'Facebook',
    status: 'Qualified',
    createdAt: '2026-10-02T16:45:00Z',
    updatedAt: '2026-10-03T11:30:00Z',
    notes: [
      {
        id: 'note-4',
        date: '2026-10-03T11:30:00Z',
        author: 'Business Lead',
        text: 'Qualified lead. Proposal submitted for review.',
      },
    ],
    history: [
      {
        id: 'hist-6',
        date: '2026-10-02T16:45:00Z',
        action: 'Lead Captured via Social Ads',
      },
      {
        id: 'hist-7',
        date: '2026-10-03T11:30:00Z',
        action: 'Status updated to Qualified',
      },
    ],
  },
  {
    id: 'LEAD-1005',
    fullName: 'Suresh Kumar',
    phone: '+91-9700112233',
    email: 'suresh@coastalmfg.co.in',
    company: 'Coastal Manufacturing Ltd',
    location: 'Vijayawada',
    requirement: 'Factory workforce recruitment and monthly payroll execution.',
    source: 'Website',
    status: 'Converted',
    createdAt: '2026-09-28T10:00:00Z',
    updatedAt: '2026-10-01T15:00:00Z',
    notes: [
      {
        id: 'note-5',
        date: '2026-10-01T15:00:00Z',
        author: 'Managing Director',
        text: 'SLA signed. Onboarding started.',
      },
    ],
    history: [
      {
        id: 'hist-8',
        date: '2026-09-28T10:00:00Z',
        action: 'Lead Created from Contact Form',
      },
      {
        id: 'hist-9',
        date: '2026-10-01T15:00:00Z',
        action: 'Status updated to Converted',
      },
    ],
  },
  {
    id: 'LEAD-1006',
    fullName: 'Meera Joshi',
    phone: '+91-9650123456',
    email: 'm.joshi@zenithsoft.io',
    company: 'Zenith Softwares',
    location: 'Chennai',
    requirement: 'Seeking overseas recruitment services.',
    source: 'Advertisement',
    status: 'Lost',
    createdAt: '2026-09-25T11:00:00Z',
    updatedAt: '2026-09-27T14:20:00Z',
    notes: [
      {
        id: 'note-6',
        date: '2026-09-27T14:20:00Z',
        author: 'Sales Support',
        text: 'Requirement outside domestic HR scope.',
      },
    ],
    history: [
      {
        id: 'hist-10',
        date: '2026-09-25T11:00:00Z',
        action: 'Lead Created',
      },
      {
        id: 'hist-11',
        date: '2026-09-27T14:20:00Z',
        action: 'Status updated to Lost',
      },
    ],
  },
];

export const initialSEOSettings: SEOSettings = {
  home: {
    title: 'RUVERON SOLUTIONS PRIVATE LIMITED | Integrated HR & Payroll Management Partner',
    description: 'RUVERON SOLUTIONS PRIVATE LIMITED provides end-to-end recruitment, contract staffing, payroll processing, statutory compliance, and HR solutions across India.',
    keywords: 'RUVERON SOLUTIONS, HR solutions, payroll management, contract staffing, statutory compliance, Vijayawada HR company, Andhra Pradesh payroll partner',
    ogTitle: 'RUVERON SOLUTIONS - Strategic HR & Payroll Partner',
    ogDescription: 'Empowering organizations with agile workforce solutions, efficient payroll management, and compliance expertise.',
  },
  about: {
    title: 'About Us | RUVERON SOLUTIONS PRIVATE LIMITED',
    description: 'Learn about Ruveron Solutions Private Limited - People. Process. Technology. Our mission, values, and strategic workforce capabilities.',
    keywords: 'About Ruveron, HR company Vijayawada, payroll provider India, workforce solutions company',
  },
  solutions: {
    title: 'Workforce & Payroll Solutions | RUVERON SOLUTIONS',
    description: 'Explore our modular solutions: Workforce Solutions, Staffing Solutions, Payroll Processing, HR Operations, and Statutory Compliance Support.',
    keywords: 'workforce solutions, staffing solutions, payroll processing, compliance support, HR operations',
  },
  services: {
    title: 'HR & Payroll Services | RUVERON SOLUTIONS',
    description: 'Discover our core services: Recruitment & Talent Acquisition, Contract Staffing, Payroll Management, Statutory Compliance, and Sector HR Solutions.',
    keywords: 'recruitment services, contract staffing, payroll management services, HR compliance',
  },
  contact: {
    title: 'Contact Us | RUVERON SOLUTIONS PRIVATE LIMITED',
    description: 'Get in touch with RUVERON SOLUTIONS PRIVATE LIMITED in Vijayawada, Andhra Pradesh. Phone: +91-9985965566, Email: RUVERONSOLUTIONSPVTLTD@GMAIL.COM.',
    keywords: 'Contact Ruveron, Ruveron Vijayawada office, HR helpline, payroll inquiry',
  },
};
