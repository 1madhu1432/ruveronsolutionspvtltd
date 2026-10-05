import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { SolutionsPage } from './pages/public/SolutionsPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ContactPage } from './pages/public/ContactPage';
import { CareersPage } from './pages/public/CareersPage';
import { PartnersPage } from './pages/public/PartnersPage';
import { ClientsPage } from './pages/public/ClientsPage';
import { TestimonialsPage } from './pages/public/TestimonialsPage';
import { TeamPage } from './pages/public/TeamPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminLeadsPage } from './pages/admin/AdminLeadsPage';
import { AdminHomeContentPage } from './pages/admin/AdminHomeContentPage';
import { AdminAboutContentPage } from './pages/admin/AdminAboutContentPage';
import { AdminSolutionsPage } from './pages/admin/AdminSolutionsPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminTestimonialsPage } from './pages/admin/AdminTestimonialsPage';
import { AdminTeamPage } from './pages/admin/AdminTeamPage';
import { AdminMediaPage } from './pages/admin/AdminMediaPage';
import { AdminContactPage } from './pages/admin/AdminContactPage';
import { AdminSEOPage } from './pages/admin/AdminSEOPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminCareersPage } from './pages/admin/AdminCareersPage';
import { AdminPartnersPage } from './pages/admin/AdminPartnersPage';
import { AdminClientsPage } from './pages/admin/AdminClientsPage';

// Public Layout Wrapper
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <DataProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Website Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected Admin CMS & Lead Management Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="leads" element={<AdminLeadsPage />} />
              <Route path="careers" element={<AdminCareersPage />} />
              <Route path="partners" element={<AdminPartnersPage />} />
              <Route path="clients" element={<AdminClientsPage />} />
              <Route path="home-content" element={<AdminHomeContentPage />} />
              <Route path="about-content" element={<AdminAboutContentPage />} />
              <Route path="solutions" element={<AdminSolutionsPage />} />
              <Route path="services" element={<AdminServicesPage />} />
              <Route path="testimonials" element={<AdminTestimonialsPage />} />
              <Route path="team" element={<AdminTeamPage />} />
              <Route path="media" element={<AdminMediaPage />} />
              <Route path="contact" element={<AdminContactPage />} />
              <Route path="seo" element={<AdminSEOPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </DataProvider>
  );
};

export default App;
