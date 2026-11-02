export type LeadStatus = 'New' | 'Contacted' | 'Follow-up' | 'Qualified' | 'Converted' | 'Lost';

export type LeadSource = 'Website' | 'Instagram' | 'Facebook' | 'Campaign' | 'Advertisement' | 'Other';
export type LeadSourceChannel = LeadSource;

export type AcquisitionSource = 'Market Data' | 'Website Enquiry' | 'Social Media' | 'Campaign' | 'Referral';

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
  acquisitionSource?: AcquisitionSource;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
  notes: LeadNote[];
  history: LeadHistoryItem[];

  // Vendor / Extended Details
  industry?: string;
  jobType?: string;
  designation?: string;
  vendorPhoto?: string;
}

export interface SocialMediaLinks {
  instagram?: string;
  youtube?: string;
  x?: string;
  linkedin?: string;
}

export type CompanyOfficeType = 'Registered Office' | 'Business Office' | 'Branch Office';

export interface CompanyOffice {
  id: string;
  name: string;
  type: CompanyOfficeType;
  address: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
  mapsLink: string;
  phone: string;
  email: string;
  status: 'Active' | 'Inactive';
  displayOrder?: number;
}

export type HighlightCategory = 'Awards' | 'Award' | 'BNI Membership' | 'BNI' | 'ISO Certified Company' | 'ISO' | 'Achievement' | 'Membership' | 'Other';

export interface BusinessHighlight {
  id: string;
  title: string;
  subtitle?: string;
  category: HighlightCategory;
  description: string;
  imageUrl?: string;
  mediaUrl?: string;
  linkUrl?: string;
  badgeText?: string;
  displayOrder?: number;
  status: 'published' | 'draft' | 'Active' | 'Inactive';
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
  socialLinks?: SocialMediaLinks;
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

  // Configurable About Section on Home
  coreValuesTitle?: string;
  coreValuesDesc?: string;
  coreValuesImageUrl?: string;
  ourStoryTitle?: string;
  ourStoryDesc?: string;
  ourStoryImageUrl?: string;
  coreValues?: {
    title?: string;
    description?: string;
    imageUrl?: string;
  };
  ourStory?: {
    title?: string;
    description?: string;
    imageUrl?: string;
  };
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
  coreValuesImageUrl?: string;
  ourStoryImageUrl?: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  category: string;
  companyName?: string; // Company name / customer
  customer?: string;
  description: string;
  benefits: string[];
  iconName: string;
  imageUrl?: string;
  images?: string[]; // Multiple images support
  videoUrl?: string; // Video/media upload
  youtubeUrl?: string;
  instagramUrl?: string;
  implementedProjects?: string;
  displayOrder?: number;
  pincode?: string; // 6-digit PIN code field
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
  displayOrder?: number;
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
  videoUrl?: string; // Video upload support
  displayOrder?: number;
  status: 'published' | 'draft';
  createdAt: string;
}

export interface TeamItem {
  id: string;
  name: string;
  designation: string;
  department: string;
  description?: string; // Added description field
  photo?: string; // Profile image upload
  linkedin?: string;
  displayOrder?: number;
  status: 'published' | 'draft';
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  size: string;
  type: string;
  createdAt: string;
  usedIn?: string[]; // Where asset is used
}

export type JobStatus = 'draft' | 'published' | 'closed';

export interface CareerJob {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Remote';
  isInternship?: boolean;
  experience: string;
  salaryRange?: string;
  skillsRequired?: string[];
  deadline?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  status: JobStatus;
  postedDate: string;
  closedDate?: string;
}

export type ApplicationStatus = 'New' | 'Under Review' | 'Shortlisted' | 'Rejected';

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  location?: string;
  designationApplied?: string;

  // Compensation
  currentCtcFixed?: string;
  currentCtcVariable?: string;
  expectedCtcFixed?: string;
  expectedCtcVariable?: string;

  // Additional Info
  jobType?: string;
  isInternship?: boolean;
  experience: string;
  skills?: string | string[];
  noticePeriod?: string;
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
  displayOrder?: number;
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
  displayOrder?: number;
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

export type TrainingBatchStatus = 'Open' | 'Filling Fast' | 'Closed' | 'Upcoming';
export type BatchStatus = TrainingBatchStatus;

export interface TrainingBatch {
  id: string;
  batchName: string;
  courseTitle: string;
  courseId?: string;
  startDate: string;
  endDate: string;
  capacity: number;
  enrolledCount: number;
  location: string;
  batchSlot: string; // e.g. "1st Batch", "15th Batch", custom
  slot?: string;
  trainerName?: string;
  status: TrainingBatchStatus;
  createdAt: string;
}

export type StudentEnrollmentStatus = 'New' | 'Contacted' | 'Enrolled' | 'In Training' | 'Completed' | 'Placed';
export type EnrollmentProgressStatus = StudentEnrollmentStatus;

export interface TrainingEnrollmentItem {
  id: string;
  programId: string;
  programTitle: string;
  batchId?: string;
  batchName?: string;
  fullName: string;
  email: string;
  phone: string;
  qualification: string;
  city: string;
  state?: string;
  message?: string;
  enrolledAt: string;
  status: StudentEnrollmentStatus;
  placementStatus?: 'Seeking' | 'Interviewing' | 'Placed';
  placedCompany?: string;
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
