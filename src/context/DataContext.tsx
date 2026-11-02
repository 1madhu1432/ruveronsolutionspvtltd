import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  CompanyInfo,
  HomeContent,
  AboutContent,
  SolutionItem,
  ServiceItem,
  TestimonialItem,
  TeamItem,
  MediaItem,
  LeadItem,
  LeadStatus,
  LeadSourceChannel,
  SEOSettings,
  SEOPageData,
  CareerJob,
  JobApplication,
  ApplicationStatus,
  PartnerItem,
  ClientItem,
  LocationItem,
  SolutionProject,
  TrainingProgramItem,
  TrainingEnrollmentItem,
  CompanyOffice,
  BusinessHighlight,
  TrainingBatch,
  SystemLogItem,
} from '../types';
import {
  initialCompanyInfo,
  initialCompanyOffices,
  initialBusinessHighlights,
  initialHomeContent,
  initialAboutContent,
  initialSolutions,
  initialProjects,
  initialServices,
  initialTestimonials,
  initialTeam,
  initialMedia,
  initialLeads,
  initialSEOSettings,
  initialCareers,
  initialJobApplications,
  initialPartners,
  initialClients,
  initialSystemLogs,
} from '../data/initialData';
import { initialLocations } from '../data/locations';
import { initialTrainingPrograms, initialTrainingEnrollments,
  initialTrainingBatches,
  initialBatchSlots,
} from '../data/trainingData';
import { getStorageItem, setStorageItem } from '../utils/storage';

interface DataContextType {
  companyInfo: CompanyInfo;
  updateCompanyInfo: (data: Partial<CompanyInfo>) => void;
  homeContent: HomeContent;
  updateHomeContent: (data: Partial<HomeContent>) => void;
  aboutContent: AboutContent;
  updateAboutContent: (data: Partial<AboutContent>) => void;
  
  solutions: SolutionItem[];
  addSolution: (solution: Omit<SolutionItem, 'id' | 'updatedAt'>) => void;
  updateSolution: (id: string, solution: Partial<SolutionItem>) => void;
  deleteSolution: (id: string) => void;

  projects: SolutionProject[];
  addProject: (project: Omit<SolutionProject, 'id' | 'updatedAt'>) => void;
  updateProject: (id: string, project: Partial<SolutionProject>) => void;
  deleteProject: (id: string) => void;
  
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id' | 'updatedAt'>) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  trainingPrograms: TrainingProgramItem[];
  addTrainingProgram: (item: Omit<TrainingProgramItem, 'id' | 'updatedAt'>) => void;
  updateTrainingProgram: (id: string, item: Partial<TrainingProgramItem>) => void;
  deleteTrainingProgram: (id: string) => void;

  trainingEnrollments: TrainingEnrollmentItem[];
  addTrainingEnrollment: (item: Omit<TrainingEnrollmentItem, 'id' | 'enrolledAt' | 'status'>) => void;
  updateEnrollmentStatus: (id: string, status: TrainingEnrollmentItem['status']) => void;
  deleteTrainingEnrollment: (id: string) => void;

  testimonials: TestimonialItem[];
  addTestimonial: (item: Omit<TestimonialItem, 'id' | 'createdAt'>) => void;
  updateTestimonial: (id: string, item: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  team: TeamItem[];
  addTeamMember: (item: Omit<TeamItem, 'id'>) => void;
  updateTeamMember: (id: string, item: Partial<TeamItem>) => void;
  deleteTeamMember: (id: string) => void;

  media: MediaItem[];
  addMedia: (media: Omit<MediaItem, 'id' | 'createdAt'>) => void;
  deleteMedia: (id: string) => void;

  careers: CareerJob[];
  addCareerJob: (job: Omit<CareerJob, 'id' | 'postedDate'>) => void;
  updateCareerJob: (id: string, job: Partial<CareerJob>) => void;
  deleteCareerJob: (id: string) => void;

  jobApplications: JobApplication[];
  addJobApplication: (appData: Omit<JobApplication, 'id' | 'appliedAt' | 'status'>) => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
  deleteJobApplication: (id: string) => void;

  partners: PartnerItem[];
  addPartner: (partner: Omit<PartnerItem, 'id' | 'updatedAt'>) => void;
  updatePartner: (id: string, partner: Partial<PartnerItem>) => void;
  deletePartner: (id: string) => void;

  clients: ClientItem[];
  addClient: (client: Omit<ClientItem, 'id' | 'updatedAt'>) => void;
  updateClient: (id: string, client: Partial<ClientItem>) => void;
  deleteClient: (id: string) => void;
  addClientRemark: (clientId: string, text: string, author?: string) => void;
  deleteClientRemark: (clientId: string, remarkId: string) => void;

  leads: LeadItem[];
  addLeadFromForm: (formData: {
    fullName: string;
    phone: string;
    email: string;
    company: string;
    location: string;
    requirement: string;
    leadType?: 'Service' | 'Solution';
    serviceOrSolutionName?: string;
    source?: LeadSourceChannel;
    acquisitionSource?: string;
  }) => LeadItem;
  addLeadDirect: (lead: Omit<LeadItem, 'id' | 'createdAt' | 'updatedAt' | 'notes' | 'history'>) => void;
  bulkImportLeads: (items: Array<Omit<LeadItem, 'id' | 'createdAt' | 'updatedAt' | 'notes' | 'history'>>) => number;
  updateLeadStatus: (id: string, newStatus: LeadStatus) => void;
  addLeadNote: (id: string, text: string, author?: string) => void;
  deleteLead: (id: string) => void;

  seoSettings: SEOSettings;
  updateSEOPage: (page: keyof SEOSettings, data: Partial<SEOPageData>) => void;

  locations: LocationItem[];
  addLocation: (location: Omit<LocationItem, 'id' | 'createdAt'>) => void;
  updateLocation: (id: string, location: Partial<LocationItem>) => void;
  deleteLocation: (id: string) => void;
  toggleLocationStatus: (id: string) => void;
  enableAllLocations: () => void;
  disableAllLocations: () => void;
  setLocationsStatusByState: (state: string, status: 'Active' | 'Inactive') => void;
  toggleMapLocationDisplay: () => void;
  resetLocationsToDefault: () => void;

  logs: SystemLogItem[];
  addLog: (log: Omit<SystemLogItem, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;

  companyOffices: CompanyOffice[];
  addCompanyOffice: (office: Omit<CompanyOffice, 'id'>) => void;
  updateCompanyOffice: (id: string, office: Partial<CompanyOffice>) => void;
  deleteCompanyOffice: (id: string) => void;

  businessHighlights: BusinessHighlight[];
  addBusinessHighlight: (highlight: Omit<BusinessHighlight, 'id'>) => void;
  updateBusinessHighlight: (id: string, highlight: Partial<BusinessHighlight>) => void;
  deleteBusinessHighlight: (id: string) => void;
  resetBusinessHighlightsToDefault: () => void;

  trainingBatches: TrainingBatch[];
  addTrainingBatch: (batch: Omit<TrainingBatch, 'id' | 'createdAt'>) => void;
  updateTrainingBatch: (id: string, batch: Partial<TrainingBatch>) => void;
  deleteTrainingBatch: (id: string) => void;

  trainingBatchSlots: string[];
  addBatchSlot: (slot: string) => void;
  addTrainingBatchSlot: (slot: string) => void;
  bulkImportStudents: (items: Array<Omit<TrainingEnrollmentItem, 'id' | 'enrolledAt'>>) => number;
  
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companyInfo, setCompanyInfoState] = useState<CompanyInfo>(() =>
    getStorageItem('ruveron_company_info', initialCompanyInfo)
  );
  const [homeContent, setHomeContentState] = useState<HomeContent>(() =>
    getStorageItem('ruveron_home_content', initialHomeContent)
  );
  const [aboutContent, setAboutContentState] = useState<AboutContent>(() =>
    getStorageItem('ruveron_about_content', initialAboutContent)
  );
  const [solutions, setSolutionsState] = useState<SolutionItem[]>(() =>
    getStorageItem('ruveron_solutions', initialSolutions)
  );
  const [projects, setProjectsState] = useState<SolutionProject[]>(() =>
    getStorageItem('ruveron_solution_projects', initialProjects)
  );
  const [services, setServicesState] = useState<ServiceItem[]>(() =>
    getStorageItem('ruveron_services', initialServices)
  );
  const [testimonials, setTestimonialsState] = useState<TestimonialItem[]>(() =>
    getStorageItem('ruveron_testimonials', initialTestimonials)
  );
  const [team, setTeamState] = useState<TeamItem[]>(() =>
    getStorageItem('ruveron_team', initialTeam)
  );
  const [media, setMediaState] = useState<MediaItem[]>(() =>
    getStorageItem('ruveron_media', initialMedia)
  );
  const [careers, setCareersState] = useState<CareerJob[]>(() =>
    getStorageItem('ruveron_careers', initialCareers)
  );
  const [jobApplications, setJobApplicationsState] = useState<JobApplication[]>(() =>
    getStorageItem('ruveron_job_applications', initialJobApplications)
  );
  const [partners, setPartnersState] = useState<PartnerItem[]>(() =>
    getStorageItem('ruveron_partners', initialPartners)
  );
  const [clients, setClientsState] = useState<ClientItem[]>(() =>
    getStorageItem('ruveron_clients', initialClients)
  );
  const [leads, setLeadsState] = useState<LeadItem[]>(() =>
    getStorageItem('ruveron_leads', initialLeads)
  );
  const [seoSettings, setSEOSettingsState] = useState<SEOSettings>(() =>
    getStorageItem('ruveron_seo_settings', initialSEOSettings)
  );
  const [locations, setLocationsState] = useState<LocationItem[]>(() =>
    getStorageItem('ruveron_locations', initialLocations)
  );
  const [trainingPrograms, setTrainingProgramsState] = useState<TrainingProgramItem[]>(() =>
    getStorageItem('ruveron_training_programs', initialTrainingPrograms)
  );
  const [trainingEnrollments, setTrainingEnrollmentsState] = useState<TrainingEnrollmentItem[]>(() =>
    getStorageItem('ruveron_training_enrollments', initialTrainingEnrollments)
  );
  const [companyOffices, setCompanyOfficesState] = useState<CompanyOffice[]>(() => {
    const stored = getStorageItem('ruveron_company_offices', initialCompanyOffices);
    return Array.isArray(stored) && stored.length > 0 ? stored : initialCompanyOffices;
  });
  const [businessHighlights, setBusinessHighlightsState] = useState<BusinessHighlight[]>(() => {
    const stored = getStorageItem('ruveron_business_highlights', initialBusinessHighlights);
    return Array.isArray(stored) && stored.length > 0 ? stored : initialBusinessHighlights;
  });
  const [trainingBatches, setTrainingBatchesState] = useState<TrainingBatch[]>(() =>
    getStorageItem('ruveron_training_batches', initialTrainingBatches)
  );
  const [trainingBatchSlots, setTrainingBatchSlotsState] = useState<string[]>(() =>
    getStorageItem('ruveron_training_batch_slots', initialBatchSlots)
  );

  const [logs, setLogsState] = useState<SystemLogItem[]>(() =>
    getStorageItem('ruveron_system_logs', initialSystemLogs)
  );

  // Sync state to localStorage
  useEffect(() => setStorageItem('ruveron_company_info', companyInfo), [companyInfo]);
  useEffect(() => setStorageItem('ruveron_home_content', homeContent), [homeContent]);
  useEffect(() => setStorageItem('ruveron_about_content', aboutContent), [aboutContent]);
  useEffect(() => setStorageItem('ruveron_solutions', solutions), [solutions]);
  useEffect(() => setStorageItem('ruveron_solution_projects', projects), [projects]);
  useEffect(() => setStorageItem('ruveron_services', services), [services]);
  useEffect(() => setStorageItem('ruveron_training_programs', trainingPrograms), [trainingPrograms]);
  useEffect(() => setStorageItem('ruveron_training_enrollments', trainingEnrollments), [trainingEnrollments]);
  useEffect(() => setStorageItem('ruveron_testimonials', testimonials), [testimonials]);
  useEffect(() => setStorageItem('ruveron_team', team), [team]);
  useEffect(() => setStorageItem('ruveron_media', media), [media]);
  useEffect(() => setStorageItem('ruveron_careers', careers), [careers]);
  useEffect(() => setStorageItem('ruveron_job_applications', jobApplications), [jobApplications]);
  useEffect(() => setStorageItem('ruveron_partners', partners), [partners]);
  useEffect(() => setStorageItem('ruveron_clients', clients), [clients]);
  useEffect(() => setStorageItem('ruveron_leads', leads), [leads]);
  useEffect(() => setStorageItem('ruveron_seo_settings', seoSettings), [seoSettings]);
  useEffect(() => setStorageItem('ruveron_locations', locations), [locations]);
  useEffect(() => setStorageItem('ruveron_system_logs', logs), [logs]);
  useEffect(() => setStorageItem('ruveron_company_offices', companyOffices), [companyOffices]);
  useEffect(() => setStorageItem('ruveron_business_highlights', businessHighlights), [businessHighlights]);
  useEffect(() => setStorageItem('ruveron_training_batches', trainingBatches), [trainingBatches]);
  useEffect(() => setStorageItem('ruveron_training_batch_slots', trainingBatchSlots), [trainingBatchSlots]);

  const addLog = (logData: Omit<SystemLogItem, 'id' | 'timestamp'>) => {
    const newLog: SystemLogItem = {
      ...logData,
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
    };
    setLogsState((prev) => [newLog, ...prev]);
  };

  const clearLogs = () => {
    setLogsState([]);
    setStorageItem('ruveron_system_logs', []);
  };

  const updateCompanyInfo = (data: Partial<CompanyInfo>) => {
    setCompanyInfoState((prev) => ({ ...prev, ...data }));
    addLog({
      action: data.logoUrl || data.logoType ? 'Logo & Branding Updated' : 'Company Info Updated',
      category: data.logoUrl || data.logoType ? 'Branding' : 'Contact',
      severity: 'info',
      user: 'Admin',
      details: data.logoUrl
        ? 'Updated company logo image'
        : 'Saved corporate contact/company details',
    });
  };

  const updateHomeContent = (data: Partial<HomeContent>) => {
    setHomeContentState((prev) => ({ ...prev, ...data }));
  };

  const updateAboutContent = (data: Partial<AboutContent>) => {
    setAboutContentState((prev) => ({ ...prev, ...data }));
  };

  const addSolution = (item: Omit<SolutionItem, 'id' | 'updatedAt'>) => {
    const newItem: SolutionItem = {
      ...item,
      id: `sol-${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setSolutionsState((prev) => [newItem, ...prev]);
  };

  const updateSolution = (id: string, item: Partial<SolutionItem>) => {
    setSolutionsState((prev) =>
      prev.map((sol) => (sol.id === id ? { ...sol, ...item, updatedAt: new Date().toISOString().split('T')[0] } : sol))
    );
  };

  const deleteSolution = (id: string) => {
    setSolutionsState((prev) => prev.filter((sol) => sol.id !== id));
  };

  const addProject = (item: Omit<SolutionProject, 'id' | 'updatedAt'>) => {
    const newItem: SolutionProject = {
      ...item,
      id: `proj-${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setProjectsState((prev) => [newItem, ...prev]);
  };

  const updateProject = (id: string, item: Partial<SolutionProject>) => {
    setProjectsState((prev) =>
      prev.map((proj) =>
        proj.id === id
          ? { ...proj, ...item, updatedAt: new Date().toISOString().split('T')[0] }
          : proj
      )
    );
  };

  const deleteProject = (id: string) => {
    setProjectsState((prev) => prev.filter((proj) => proj.id !== id));
  };

  const addService = (item: Omit<ServiceItem, 'id' | 'updatedAt'>) => {
    const newItem: ServiceItem = {
      ...item,
      id: `srv-${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setServicesState((prev) => [newItem, ...prev]);
  };

  const updateService = (id: string, item: Partial<ServiceItem>) => {
    setServicesState((prev) =>
      prev.map((srv) => (srv.id === id ? { ...srv, ...item, updatedAt: new Date().toISOString().split('T')[0] } : srv))
    );
  };

  const deleteService = (id: string) => {
    setServicesState((prev) => prev.filter((srv) => srv.id !== id));
  };

  const addTestimonial = (item: Omit<TestimonialItem, 'id' | 'createdAt'>) => {
    const newItem: TestimonialItem = {
      ...item,
      id: `test-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTestimonialsState((prev) => [newItem, ...prev]);
  };

  const updateTestimonial = (id: string, item: Partial<TestimonialItem>) => {
    setTestimonialsState((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...item } : t))
    );
  };

  const deleteTestimonial = (id: string) => {
    setTestimonialsState((prev) => prev.filter((t) => t.id !== id));
  };

  const addTeamMember = (item: Omit<TeamItem, 'id'>) => {
    const newItem: TeamItem = {
      ...item,
      id: `team-${Date.now()}`,
    };
    setTeamState((prev) => [newItem, ...prev]);
  };

  const updateTeamMember = (id: string, item: Partial<TeamItem>) => {
    setTeamState((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...item } : t))
    );
  };

  const deleteTeamMember = (id: string) => {
    setTeamState((prev) => prev.filter((t) => t.id !== id));
  };

  const addMedia = (item: Omit<MediaItem, 'id' | 'createdAt'>) => {
    const newItem: MediaItem = {
      ...item,
      id: `med-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setMediaState((prev) => [newItem, ...prev]);
  };

  const deleteMedia = (id: string) => {
    setMediaState((prev) => prev.filter((m) => m.id !== id));
  };

  const addCareerJob = (item: Omit<CareerJob, 'id' | 'postedDate'>) => {
    const newItem: CareerJob = {
      ...item,
      id: `job-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
    };
    setCareersState((prev) => [newItem, ...prev]);
  };

  const updateCareerJob = (id: string, item: Partial<CareerJob>) => {
    setCareersState((prev) =>
      prev.map((job) => (job.id === id ? { ...job, ...item } : job))
    );
  };

  const deleteCareerJob = (id: string) => {
    setCareersState((prev) => prev.filter((job) => job.id !== id));
  };

  const addJobApplication = (appData: Omit<JobApplication, 'id' | 'appliedAt' | 'status'>) => {
    const newApp: JobApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      appliedAt: new Date().toISOString(),
      status: 'New',
    };
    setJobApplicationsState((prev) => [newApp, ...prev]);
  };

  const updateApplicationStatus = (id: string, status: ApplicationStatus) => {
    setJobApplicationsState((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const deleteJobApplication = (id: string) => {
    setJobApplicationsState((prev) => prev.filter((app) => app.id !== id));
  };

  const addPartner = (item: Omit<PartnerItem, 'id' | 'updatedAt'>) => {
    const newItem: PartnerItem = {
      ...item,
      id: `part-${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setPartnersState((prev) => [newItem, ...prev]);
  };

  const updatePartner = (id: string, item: Partial<PartnerItem>) => {
    setPartnersState((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...item, updatedAt: new Date().toISOString().split('T')[0] } : p))
    );
  };

  const deletePartner = (id: string) => {
    setPartnersState((prev) => prev.filter((p) => p.id !== id));
  };

  const addClient = (item: Omit<ClientItem, 'id' | 'updatedAt'>) => {
    const now = new Date().toISOString().split('T')[0];
    const initialNotes = item.notes && item.notes.length > 0
      ? item.notes
      : item.remarks
      ? [
          {
            id: `cnote-${Date.now()}`,
            date: now,
            author: 'Admin',
            text: item.remarks,
          },
        ]
      : [];

    const newItem: ClientItem = {
      ...item,
      id: `cli-${Date.now()}`,
      updatedAt: now,
      notes: initialNotes,
      contractStatus: item.contractStatus || 'Active',
    };
    setClientsState((prev) => [newItem, ...prev]);
    addLog({
      action: 'Client Created',
      category: 'Clients',
      severity: 'info',
      user: 'Admin',
      details: `Added enterprise client: ${newItem.name} (${newItem.industry})`,
      entityId: newItem.id,
    });
  };

  const updateClient = (id: string, item: Partial<ClientItem>) => {
    setClientsState((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...item, updatedAt: new Date().toISOString().split('T')[0] } : c))
    );
    addLog({
      action: 'Client Updated',
      category: 'Clients',
      severity: 'info',
      user: 'Admin',
      details: `Updated client details for ID: ${id}`,
      entityId: id,
    });
  };

  const addClientRemark = (clientId: string, text: string, author = 'Admin') => {
    const now = new Date().toISOString().split('T')[0];
    const newRemark = {
      id: `cnote-${Date.now()}`,
      date: now,
      author,
      text,
    };
    setClientsState((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c;
        const updatedNotes = [newRemark, ...(c.notes || [])];
        return {
          ...c,
          remarks: text,
          notes: updatedNotes,
          updatedAt: now,
        };
      })
    );
    addLog({
      action: 'Client Remark Added',
      category: 'Clients',
      severity: 'info',
      user: author,
      details: `Logged remark on client: "${text.slice(0, 40)}${text.length > 40 ? '...' : ''}"`,
      entityId: clientId,
    });
  };

  const deleteClientRemark = (clientId: string, remarkId: string) => {
    setClientsState((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c;
        const updatedNotes = (c.notes || []).filter((n) => n.id !== remarkId);
        return {
          ...c,
          remarks: updatedNotes[0]?.text || '',
          notes: updatedNotes,
          updatedAt: new Date().toISOString().split('T')[0],
        };
      })
    );
  };

  const deleteClient = (id: string) => {
    const target = clients.find((c) => c.id === id);
    setClientsState((prev) => prev.filter((c) => c.id !== id));
    addLog({
      action: 'Client Deleted',
      category: 'Clients',
      severity: 'warning',
      user: 'Admin',
      details: `Deleted client: ${target?.name || id}`,
      entityId: id,
    });
  };

  const addLeadFromForm = (formData: {
    fullName: string;
    phone: string;
    email: string;
    company: string;
    location: string;
    requirement: string;
    leadType?: 'Service' | 'Solution';
    serviceOrSolutionName?: string;
    source?: LeadSourceChannel;
    acquisitionSource?: string;
  }): LeadItem => {
    const now = new Date().toISOString();
    const leadId = `LEAD-${Math.floor(1000 + Math.random() * 9000)}`;
    const category = formData.leadType || 'Service';
    const newLead: LeadItem = {
      id: leadId,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      company: formData.company || 'Not Specified',
      location: formData.location || 'Not Specified',
      leadType: category,
      serviceOrSolutionName: formData.serviceOrSolutionName || (category === 'Service' ? 'General Service Inquiry' : 'General Solution Inquiry'),
      requirement: formData.requirement,
      source: formData.source || 'Website',
      acquisitionSource: (formData.acquisitionSource as any) || 'Website Enquiry',
      status: 'New',
      createdAt: now,
      updatedAt: now,
      notes: [
        {
          id: `note-${Date.now()}`,
          date: now,
          author: 'Website Visitor',
          text: `Enquiry submitted via Contact Form (${category} Lead: ${formData.serviceOrSolutionName || 'General'}). Requirement: ${formData.requirement}`,
        },
      ],
      history: [
        {
          id: `hist-${Date.now()}`,
          date: now,
          action: `Lead Created from Contact Form (Type: ${category})`,
        },
      ],
    };

    setLeadsState((prev) => [newLead, ...prev]);
    return newLead;
  };

  const addLeadDirect = (leadData: Omit<LeadItem, 'id' | 'createdAt' | 'updatedAt' | 'notes' | 'history'>) => {
    const now = new Date().toISOString();
    const leadId = `LEAD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLead: LeadItem = {
      ...leadData,
      id: leadId,
      createdAt: now,
      updatedAt: now,
      notes: [
        {
          id: `note-${Date.now()}`,
          date: now,
          author: 'Admin',
          text: 'Lead manually entered into system.',
        },
      ],
      history: [
        {
          id: `hist-${Date.now()}`,
          date: now,
          action: `Lead manually added with status ${leadData.status}`,
        },
      ],
    };
    setLeadsState((prev) => [newLead, ...prev]);
  };

  const bulkImportLeads = (
    items: Array<Omit<LeadItem, 'id' | 'createdAt' | 'updatedAt' | 'notes' | 'history'>>
  ): number => {
    const now = new Date().toISOString();
    const createdLeads: LeadItem[] = items.map((item, index) => {
      const leadId = `LEAD-IMP-${Math.floor(1000 + Math.random() * 9000)}-${index + 1}`;
      return {
        ...item,
        id: leadId,
        createdAt: now,
        updatedAt: now,
        notes: [
          {
            id: `note-${Date.now()}-${index}`,
            date: now,
            author: 'CSV Importer',
            text: 'Bulk imported into Ruveron Lead Engine.',
          },
        ],
        history: [
          {
            id: `hist-${Date.now()}-${index}`,
            date: now,
            action: `Lead imported with status ${item.status}`,
          },
        ],
      };
    });

    setLeadsState((prev) => [...createdLeads, ...prev]);
    return createdLeads.length;
  };

  const updateLeadStatus = (id: string, newStatus: LeadStatus) => {
    const now = new Date().toISOString();
    setLeadsState((prev) =>
      prev.map((lead) => {
        if (lead.id !== id) return lead;
        const oldStatus = lead.status;
        return {
          ...lead,
          status: newStatus,
          updatedAt: now,
          history: [
            {
              id: `hist-${Date.now()}`,
              date: now,
              action: `Status changed from ${oldStatus} to ${newStatus}`,
            },
            ...lead.history,
          ],
        };
      })
    );
  };

  const addLeadNote = (id: string, text: string, author = 'Admin') => {
    const now = new Date().toISOString();
    setLeadsState((prev) =>
      prev.map((lead) => {
        if (lead.id !== id) return lead;
        return {
          ...lead,
          updatedAt: now,
          notes: [
            {
              id: `note-${Date.now()}`,
              date: now,
              author,
              text,
            },
            ...lead.notes,
          ],
        };
      })
    );
  };

  const deleteLead = (id: string) => {
    setLeadsState((prev) => prev.filter((lead) => lead.id !== id));
  };

  const updateSEOPage = (page: keyof SEOSettings, data: Partial<SEOPageData>) => {
    setSEOSettingsState((prev) => ({
      ...prev,
      [page]: { ...prev[page], ...data },
    }));
  };

  const addLocation = (locData: Omit<LocationItem, 'id' | 'createdAt'>) => {
    const newLoc: LocationItem = {
      ...locData,
      id: `loc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    setLocationsState((prev) => [newLoc, ...prev]);
  };

  const updateLocation = (id: string, updated: Partial<LocationItem>) => {
    setLocationsState((prev) =>
      prev.map((loc) => (loc.id === id ? { ...loc, ...updated } : loc))
    );
  };

  const deleteLocation = (id: string) => {
    setLocationsState((prev) => prev.filter((loc) => loc.id !== id));
  };

  const toggleLocationStatus = (id: string) => {
    setLocationsState((prev) =>
      prev.map((loc) =>
        loc.id === id
          ? { ...loc, status: loc.status === 'Active' ? 'Inactive' : 'Active' }
          : loc
      )
    );
  };

  const enableAllLocations = () => {
    setLocationsState((prev) => prev.map((loc) => ({ ...loc, status: 'Active' as const })));
  };

  const disableAllLocations = () => {
    setLocationsState((prev) => prev.map((loc) => ({ ...loc, status: 'Inactive' as const })));
  };

  const setLocationsStatusByState = (state: string, status: 'Active' | 'Inactive') => {
    setLocationsState((prev) =>
      prev.map((loc) => (loc.state === state ? { ...loc, status } : loc))
    );
  };

  const toggleMapLocationDisplay = () => {
    setCompanyInfoState((prev) => {
      const updated = {
        ...prev,
        enableMapLocation: prev.enableMapLocation === false ? true : false,
      };
      setStorageItem('ruveron_company_info', updated);
      return updated;
    });
  };

  const resetLocationsToDefault = () => {
    setLocationsState(initialLocations);
    setStorageItem('ruveron_locations', initialLocations);
  };

  const addTrainingProgram = (item: Omit<TrainingProgramItem, 'id' | 'updatedAt'>) => {
    const newItem: TrainingProgramItem = {
      ...item,
      id: `tr-${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setTrainingProgramsState((prev) => [newItem, ...prev]);
  };

  const updateTrainingProgram = (id: string, item: Partial<TrainingProgramItem>) => {
    setTrainingProgramsState((prev) =>
      prev.map((tr) =>
        tr.id === id
          ? { ...tr, ...item, updatedAt: new Date().toISOString().split('T')[0] }
          : tr
      )
    );
  };

  const deleteTrainingProgram = (id: string) => {
    setTrainingProgramsState((prev) => prev.filter((tr) => tr.id !== id));
  };

  const addTrainingEnrollment = (
    item: Omit<TrainingEnrollmentItem,
'id' | 'enrolledAt' | 'status'>
  ) => {
    const newEnr: TrainingEnrollmentItem = {
      ...item,
      id: `enr-${Date.now()}`,
      enrolledAt: new Date().toISOString(),
      status: 'New',
    };
    setTrainingEnrollmentsState((prev) => [newEnr, ...prev]);

    // Automatically bridge candidate to the central Leads Engine
    addLeadFromForm({
      fullName: item.fullName,
      email: item.email,
      phone: item.phone,
      company: item.qualification ? `Candidate (${item.qualification})` : 'Individual Trainee',
      location: [item.city, item.state].filter(Boolean).join(', ') || 'Not Specified',
      requirement: `Applied for Skill Program: "${item.programTitle}". Message: ${item.message || 'Ready for batch enrollment.'}`,
      leadType: 'Service',
      serviceOrSolutionName: `Skill Training: ${item.programTitle}`,
    });
  };

  const updateEnrollmentStatus = (id: string, status: TrainingEnrollmentItem['status']) => {
    setTrainingEnrollmentsState((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  };

  const deleteTrainingEnrollment = (id: string) => {
    setTrainingEnrollmentsState((prev) => prev.filter((e) => e.id !== id));
  };

  // Company Offices Management
  const addCompanyOffice = (officeData: Omit<CompanyOffice, 'id'>) => {
    const newOffice: CompanyOffice = {
      ...officeData,
      id: `off-${Date.now()}`,
    };
    setCompanyOfficesState((prev) => [...prev, newOffice]);
    addLog({
      action: 'Company Office Added',
      category: 'Locations',
      severity: 'info',
      user: 'Admin',
      details: `Added new corporate office: ${officeData.name} (${officeData.type})`,
    });
  };

  const updateCompanyOffice = (id: string, officeData: Partial<CompanyOffice>) => {
    setCompanyOfficesState((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...officeData } : o))
    );
    addLog({
      action: 'Company Office Updated',
      category: 'Locations',
      severity: 'info',
      user: 'Admin',
      details: `Updated office details for ID: ${id}`,
    });
  };

  const deleteCompanyOffice = (id: string) => {
    const toDelete = companyOffices.find((o) => o.id === id);
    setCompanyOfficesState((prev) => prev.filter((o) => o.id !== id));
    addLog({
      action: 'Company Office Deleted',
      category: 'Locations',
      severity: 'warning',
      user: 'Admin',
      details: `Deleted corporate office: ${toDelete?.name || id}`,
    });
  };

  // Business Highlights Management
  const addBusinessHighlight = (hlData: Omit<BusinessHighlight, 'id'>) => {
    const newHl: BusinessHighlight = {
      ...hlData,
      id: `hl-${Date.now()}`,
    };
    setBusinessHighlightsState((prev) => [...prev, newHl]);
    addLog({
      action: 'Business Highlight Added',
      category: 'System',
      severity: 'info',
      user: 'Admin',
      details: `Added highlight: ${hlData.title} (${hlData.category})`,
    });
  };

  const updateBusinessHighlight = (id: string, hlData: Partial<BusinessHighlight>) => {
    setBusinessHighlightsState((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...hlData } : h))
    );
    addLog({
      action: 'Business Highlight Updated',
      category: 'System',
      severity: 'info',
      user: 'Admin',
      details: `Updated highlight ID: ${id}`,
    });
  };

  const deleteBusinessHighlight = (id: string) => {
    setBusinessHighlightsState((prev) => prev.filter((h) => h.id !== id));
    addLog({
      action: 'Business Highlight Deleted',
      category: 'System',
      severity: 'warning',
      user: 'Admin',
      details: `Deleted highlight ID: ${id}`,
    });
  };

  const resetBusinessHighlightsToDefault = () => {
    setBusinessHighlightsState(initialBusinessHighlights);
    setStorageItem('ruveron_business_highlights', initialBusinessHighlights);
    addLog({
      action: 'Business Highlights Restored',
      category: 'System',
      severity: 'info',
      user: 'Admin',
      details: 'Restored default corporate highlights (Awards, BNI Membership, ISO 9001)',
    });
  };

  // Training Batches Management
  const addTrainingBatch = (batchData: Omit<TrainingBatch, 'id' | 'createdAt'>) => {
    const newBatch: TrainingBatch = {
      ...batchData,
      id: `batch-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setTrainingBatchesState((prev) => [newBatch, ...prev]);
    addLog({
      action: 'Training Batch Created',
      category: 'Training',
      severity: 'info',
      user: 'Admin',
      details: `Created batch "${batchData.batchName}" for ${batchData.courseTitle}`,
    });
  };

  const updateTrainingBatch = (id: string, batchData: Partial<TrainingBatch>) => {
    setTrainingBatchesState((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...batchData } : b))
    );
    addLog({
      action: 'Training Batch Updated',
      category: 'Training',
      severity: 'info',
      user: 'Admin',
      details: `Updated batch ID: ${id}`,
    });
  };

  const deleteTrainingBatch = (id: string) => {
    setTrainingBatchesState((prev) => prev.filter((b) => b.id !== id));
    addLog({
      action: 'Training Batch Deleted',
      category: 'Training',
      severity: 'warning',
      user: 'Admin',
      details: `Deleted batch ID: ${id}`,
    });
  };

  const addBatchSlot = (slot: string) => {
    if (!slot.trim() || trainingBatchSlots.includes(slot.trim())) return;
    setTrainingBatchSlotsState((prev) => [...prev, slot.trim()]);
    addLog({
      action: 'Batch Slot Added',
      category: 'Training',
      severity: 'info',
      user: 'Admin',
      details: `Added new batch slot option: "${slot.trim()}"`,
    });
  };

  const bulkImportStudents = (items: Array<Omit<TrainingEnrollmentItem, 'id' | 'enrolledAt'>>) => {
    const newEnrollments: TrainingEnrollmentItem[] = items.map((item, idx) => ({
      ...item,
      id: `enr-imp-${Date.now()}-${idx}`,
      enrolledAt: new Date().toISOString(),
      status: item.status || 'Enrolled',
    }));
    setTrainingEnrollmentsState((prev) => [...newEnrollments, ...prev]);
    addLog({
      action: 'Bulk Students Imported',
      category: 'Training',
      severity: 'success',
      user: 'Admin',
      details: `Successfully imported ${newEnrollments.length} student records`,
    });
    return newEnrollments.length;
  };

  const resetToDefaults = () => {
    setCompanyInfoState(initialCompanyInfo);
    setHomeContentState(initialHomeContent);
    setAboutContentState(initialAboutContent);
    setSolutionsState(initialSolutions);
    setProjectsState(initialProjects);
    setServicesState(initialServices);
    setTestimonialsState(initialTestimonials);
    setTeamState(initialTeam);
    setMediaState(initialMedia);
    setCareersState(initialCareers);
    setJobApplicationsState(initialJobApplications);
    setPartnersState(initialPartners);
    setClientsState(initialClients);
    setLeadsState(initialLeads);
    setSEOSettingsState(initialSEOSettings);
    setLocationsState(initialLocations);
    setTrainingProgramsState(initialTrainingPrograms);
    setTrainingEnrollmentsState(initialTrainingEnrollments);
    setLogsState(initialSystemLogs);
    setCompanyOfficesState(initialCompanyOffices);
    setBusinessHighlightsState(initialBusinessHighlights);
    setTrainingBatchesState(initialTrainingBatches);
    setTrainingBatchSlotsState(initialBatchSlots);
    localStorage.clear();
  };

  return (
    <DataContext.Provider
      value={{
        companyInfo,
        updateCompanyInfo,
        homeContent,
        updateHomeContent,
        aboutContent,
        updateAboutContent,
        solutions,
        addSolution,
        updateSolution,
        deleteSolution,
        projects,
        addProject,
        updateProject,
        deleteProject,
        services,
        addService,
        updateService,
        deleteService,
        trainingPrograms,
        addTrainingProgram,
        updateTrainingProgram,
        deleteTrainingProgram,
        trainingEnrollments,
        addTrainingEnrollment,
        updateEnrollmentStatus,
        deleteTrainingEnrollment,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        team,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        media,
        addMedia,
        deleteMedia,
        careers,
        addCareerJob,
        updateCareerJob,
        deleteCareerJob,
        jobApplications,
        addJobApplication,
        updateApplicationStatus,
        deleteJobApplication,
        partners,
        addPartner,
        updatePartner,
        deletePartner,
        clients,
        addClient,
        updateClient,
        deleteClient,
        addClientRemark,
        deleteClientRemark,
        leads,
        addLeadFromForm,
        addLeadDirect,
        bulkImportLeads,
        updateLeadStatus,
        addLeadNote,
        deleteLead,
        seoSettings,
        updateSEOPage,
        locations,
        addLocation,
        updateLocation,
        deleteLocation,
        toggleLocationStatus,
        enableAllLocations,
        disableAllLocations,
        setLocationsStatusByState,
        toggleMapLocationDisplay,
        resetLocationsToDefault,
        logs,
        addLog,
        clearLogs,
        companyOffices,
        addCompanyOffice,
        updateCompanyOffice,
        deleteCompanyOffice,
        businessHighlights,
        addBusinessHighlight,
        updateBusinessHighlight,
        deleteBusinessHighlight,
        resetBusinessHighlightsToDefault,
        trainingBatches,
        addTrainingBatch,
        updateTrainingBatch,
        deleteTrainingBatch,
        trainingBatchSlots,
        addBatchSlot,
        addTrainingBatchSlot: addBatchSlot,
        bulkImportStudents,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
