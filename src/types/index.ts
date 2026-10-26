export type LeadStatus = 'New' | 'Contacted' | 'Follow-up' | 'Qualified' | 'Converted' | 'Lost';

export type LeadSource = 'Website' | 'Instagram' | 'Facebook' | 'Campaign' | 'Advertisement' | 'Other';

export type LeadCategory = 'Service' | 'Solution';

export interface LeadNote {
  id: string;
  date: string;
  author: string;
  text: string;
}

export interface LeadHistoryItem {
  id: string;
  date: string;
  action: string;
}

export interface LeadItem {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  company: string;
  location: string;
  leadType: LeadCategory;
  serviceOrSolutionName?: string;
  requirement: string;
  source: LeadSource;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
  notes: LeadNote[];
  history: LeadHistoryItem[];
}

export interface CompanyInfo {
  companyName: string;
  tagline: string;
  street: string;
  line2: string;
  area: string;
  landmark: string;
  city: string;
  district: string;
  pincode: string;
  state: string;
  fullAddress: string;
  phone: string;
  email: string;
  mapsIframeUrl?: string;
  enableMapLocation?: boolean;
  mapHeading?: string;
  mapSubheading?: string;
  enablePublicLocations?: boolean;
  logoUrl?: string;
  logoDarkUrl?: string;
  logoType?: 'custom' | 'emblem';
  logoHeight?: number;
  showLogoTagline?: boolean;
}

export interface HomeContent {
  heroHeading: string;
  heroSubtitle: string;
  heroPrimaryBtnText: string;
  heroSecondaryBtnText: string;
  whoWeAreTitle: string;
  whoWeAreContent: string;
  missionHeading: string;
  missionStatement: string;
  missionPoints: { title: string; desc: string }[];
  promiseHeading: string;
  promiseContent: string;
  ctaHeading: string;
  ctaSubtitle: string;
}

export interface AboutContent {
  heroTitle: string;
  heroSubtitle: string;
  companyOverview: string;
  mission: string;
  vision: string;
  approachPoints: { title: string; desc: string }[];
  strengths: { title: string; desc: string }[];
  whyRuveron: { title: string; desc: string }[];
}

export interface SolutionItem {
  id: string;
  title: string;
  category: string;
  description: string;
  benefits: string[];
  iconName: string;
  imageUrl?: string;
  status: 'published' | 'draft';
  updatedAt: string;
}

export interface SolutionProject {
  id: string;
  title: string;
  sector: string;
  clientName?: string;
  imageUrl: string;
  description: string;
  bullets: string[];
  solutionId?: string;
  iconType?: string;
  status: 'published' | 'draft';
  updatedAt: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  features: string[];
  iconName: string;
  imageUrl?: string;
  status: 'published' | 'draft';
  updatedAt: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  designation: string;
  company: string;
  testimonial: string;
  photo?: string;
  status: 'published' | 'draft';
  createdAt: string;
}

export interface TeamItem {
  id: string;
  name: string;
  designation: string;
  department: string;
  photo?: string;
  linkedin?: string;
  status: 'published' | 'draft';
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  size: string;
  type: string;
  createdAt: string;
}

export interface CareerJob {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Remote';
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  status: 'published' | 'draft';
  postedDate: string;
}

export type ApplicationStatus = 'New' | 'Reviewing' | 'Shortlisted' | 'Rejected';

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  currentCompany?: string;
  coverNote: string;
  resumeFileName?: string;
  resumeFileData?: string;
  appliedAt: string;
  status: ApplicationStatus;
}

export interface PartnerItem {
  id: string;
  name: string;
  category: string;
  logoUrl: string;
  websiteUrl?: string;
  description?: string;
  status: 'published' | 'draft';
  updatedAt: string;
}

export type ClientContractStatus = 'Active' | 'Under Review' | 'On Hold' | 'Terminated' | 'Prospective';

export interface ClientRemark {
  id: string;
  date: string;
  author: string;
  text: string;
}

export interface ClientItem {
  id: string;
  name: string;
  industry: string;
  logoUrl: string;
  websiteUrl?: string;
  description?: string;
  featuredOnHome?: boolean;
  status: 'published' | 'draft';
  updatedAt: string;

  // Full Details fields
  clientCode?: string;
  contactPerson?: string;
  contactDesignation?: string;
  contactEmail?: string;
  contactPhone?: string;
  alternatePhone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  gstin?: string;
  pan?: string;
  contractStatus?: ClientContractStatus;
  contractStartDate?: string;
  contractEndDate?: string;
  servicesProvided?: string[];
  activeHeadcount?: string | number;
  accountManager?: string;
  billingCycle?: 'Monthly' | 'Quarterly' | 'Annual' | 'Bi-Weekly' | 'Custom';
  remarks?: string;
  notes?: ClientRemark[];
}

export interface SEOPageData {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
}

export interface SEOSettings {
  home: SEOPageData;
  about: SEOPageData;
  solutions: SEOPageData;
  services: SEOPageData;
  contact: SEOPageData;
  careers: SEOPageData;
  partners: SEOPageData;
  clients: SEOPageData;
}

export interface LocationItem {
  id: string;
  state: string;
  district: string;
  isHQ?: boolean;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface TrainingProgramItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  mode: 'Offline' | 'Online' | 'Hybrid';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Diploma';
  imageUrl: string;
  description: string;
  modules: string[];
  certification: string;
  eligibility: string;
  placementAssistance: boolean;
  upcomingBatchDate?: string;
  fee?: string;
  status: 'published' | 'draft';
  updatedAt: string;
}

export interface TrainingEnrollmentItem {
  id: string;
  programId: string;
  programTitle: string;
  fullName: string;
  email: string;
  phone: string;
  qualification: string;
  city: string;
  state?: string;
  message?: string;
  enrolledAt: string;
  status: 'New' | 'Contacted' | 'Enrolled' | 'Completed';
}

export type LogSeverity = 'info' | 'success' | 'warning' | 'error';

export type LogCategory =
  | 'Leads'
  | 'Locations'
  | 'Branding'
  | 'Training'
  | 'Careers'
  | 'Partners'
  | 'Clients'
  | 'Solutions'
  | 'Services'
  | 'Contact'
  | 'Auth'
  | 'System'
  | 'Data';

export interface SystemLogItem {
  id: string;
  timestamp: string; // ISO string
  action: string;
  category: LogCategory;
  severity: LogSeverity;
  user: string;
  details: string;
  entityId?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
}
