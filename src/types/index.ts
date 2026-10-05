export type LeadStatus = 'New' | 'Contacted' | 'Follow-up' | 'Qualified' | 'Converted' | 'Lost';

export type LeadSource = 'Website' | 'Instagram' | 'Facebook' | 'Campaign' | 'Advertisement' | 'Other';

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
}
