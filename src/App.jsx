import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import LoanCalculator from './pages/LoanCalculator';
import Eligibility from './pages/Eligibility';
import ApplyNow from './pages/ApplyNow';
import Contact from './pages/Contact';
import FAQPage from './pages/FAQPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import Applications from './pages/admin/Applications';
import Enquiries from './pages/admin/Enquiries';
import Customers from './pages/admin/Customers';
import ServicesManagement from './pages/admin/ServicesManagement';
import TestimonialsManagement from './pages/admin/TestimonialsManagement';
import Settings from './pages/admin/Settings';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <ScrollToTop />

      {/* Show Public Navbar and Floating Actions only on public routes */}
      {!isAdminRoute && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/apply" element={<ApplyNow />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQPage />} />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Dashboard Nested Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="applications" element={<Applications />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="customers" element={<Customers />} />
            <Route path="services" element={<ServicesManagement />} />
            <Route path="testimonials" element={<TestimonialsManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Catch-all fallback route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Public Footer and Floating quick contact */}
      {!isAdminRoute && (
        <>
          <Footer />
          <FloatingActions />
        </>
      )}
    </div>
  );
}
