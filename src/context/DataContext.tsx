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
  SEOSettings,
  SEOPageData,
} from '../types';
import {
  initialCompanyInfo,
  initialHomeContent,
  initialAboutContent,
  initialSolutions,
  initialServices,
  initialTestimonials,
  initialTeam,
  initialMedia,
  initialLeads,
  initialSEOSettings,
} from '../data/initialData';
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
  
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id' | 'updatedAt'>) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

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

  leads: LeadItem[];
  addLeadFromForm: (formData: {
    fullName: string;
    phone: string;
    email: string;
    company: string;
    location: string;
    requirement: string;
  }) => LeadItem;
  addLeadDirect: (lead: Omit<LeadItem, 'id' | 'createdAt' | 'updatedAt' | 'notes' | 'history'>) => void;
  updateLeadStatus: (id: string, newStatus: LeadStatus) => void;
  addLeadNote: (id: string, text: string, author?: string) => void;
  deleteLead: (id: string) => void;

  seoSettings: SEOSettings;
  updateSEOPage: (page: keyof SEOSettings, data: Partial<SEOPageData>) => void;
  
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
  const [leads, setLeadsState] = useState<LeadItem[]>(() =>
    getStorageItem('ruveron_leads', initialLeads)
  );
  const [seoSettings, setSEOSettingsState] = useState<SEOSettings>(() =>
    getStorageItem('ruveron_seo_settings', initialSEOSettings)
  );

  // Sync state to localStorage
  useEffect(() => setStorageItem('ruveron_company_info', companyInfo), [companyInfo]);
  useEffect(() => setStorageItem('ruveron_home_content', homeContent), [homeContent]);
  useEffect(() => setStorageItem('ruveron_about_content', aboutContent), [aboutContent]);
  useEffect(() => setStorageItem('ruveron_solutions', solutions), [solutions]);
  useEffect(() => setStorageItem('ruveron_services', services), [services]);
  useEffect(() => setStorageItem('ruveron_testimonials', testimonials), [testimonials]);
  useEffect(() => setStorageItem('ruveron_team', team), [team]);
  useEffect(() => setStorageItem('ruveron_media', media), [media]);
  useEffect(() => setStorageItem('ruveron_leads', leads), [leads]);
  useEffect(() => setStorageItem('ruveron_seo_settings', seoSettings), [seoSettings]);

  const updateCompanyInfo = (data: Partial<CompanyInfo>) => {
    setCompanyInfoState((prev) => ({ ...prev, ...data }));
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

  const addLeadFromForm = (formData: {
    fullName: string;
    phone: string;
    email: string;
    company: string;
    location: string;
    requirement: string;
  }): LeadItem => {
    const now = new Date().toISOString();
    const leadId = `LEAD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLead: LeadItem = {
      id: leadId,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      company: formData.company || 'Not Specified',
      location: formData.location || 'Not Specified',
      requirement: formData.requirement,
      source: 'Website',
      status: 'New',
      createdAt: now,
      updatedAt: now,
      notes: [
        {
          id: `note-${Date.now()}`,
          date: now,
          author: 'Website Visitor',
          text: `Enquiry submitted via Contact Form. Requirement: ${formData.requirement}`,
        },
      ],
      history: [
        {
          id: `hist-${Date.now()}`,
          date: now,
          action: 'Lead Created from Contact Form (Status: New)',
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

  const resetToDefaults = () => {
    setCompanyInfoState(initialCompanyInfo);
    setHomeContentState(initialHomeContent);
    setAboutContentState(initialAboutContent);
    setSolutionsState(initialSolutions);
    setServicesState(initialServices);
    setTestimonialsState(initialTestimonials);
    setTeamState(initialTeam);
    setMediaState(initialMedia);
    setLeadsState(initialLeads);
    setSEOSettingsState(initialSEOSettings);
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
        services,
        addService,
        updateService,
        deleteService,
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
        leads,
        addLeadFromForm,
        addLeadDirect,
        updateLeadStatus,
        addLeadNote,
        deleteLead,
        seoSettings,
        updateSEOPage,
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
