import { initialApplications, initialEnquiries } from '../data/initialApplications';
import { services as defaultServices } from '../data/services';
import { blogs as defaultBlogs } from '../data/blogs';
import { testimonials as defaultTestimonials } from '../data/testimonials';

const APPS_KEY = 'nidhi_finance_applications';
const ENQ_KEY = 'nidhi_finance_enquiries';
const CUST_KEY = 'nidhi_finance_customers';
const SERVICES_KEY = 'nidhi_finance_services';
const BLOGS_KEY = 'nidhi_finance_blogs';
const TESTIMONIALS_KEY = 'nidhi_finance_testimonials';
const AUTH_KEY = 'nidhi_admin_auth';

// ---------------- AUTH ----------------
export function getAdminAuth() {
  try {
    const auth = localStorage.getItem(AUTH_KEY);
    return auth ? JSON.parse(auth) : null;
  } catch {
    return null;
  }
}

export function setAdminAuth(user) {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } catch (err) {
    console.error('Error saving auth:', err);
  }
}

export function clearAdminAuth() {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (err) {
    console.error('Error clearing auth:', err);
  }
}

// ---------------- APPLICATIONS ----------------
export function getStoredApplications() {
  try {
    const data = localStorage.getItem(APPS_KEY);
    if (!data) {
      localStorage.setItem(APPS_KEY, JSON.stringify(initialApplications));
      return initialApplications;
    }
    return JSON.parse(data);
  } catch {
    return initialApplications;
  }
}

export function saveApplication(newApp) {
  try {
    const current = getStoredApplications();
    const updated = [
      {
        ...newApp,
        id: newApp.id || `APP-${Date.now().toString().slice(-4)}`,
        status: newApp.status || 'Pending',
        date: newApp.date || new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      },
      ...current
    ];
    localStorage.setItem(APPS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving application:', err);
    return null;
  }
}

export function updateApplicationStatus(id, newStatus) {
  try {
    const current = getStoredApplications();
    const updated = current.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    localStorage.setItem(APPS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error updating application status:', err);
    return null;
  }
}

export function updateApplication(id, updatedFields) {
  try {
    const current = getStoredApplications();
    const updated = current.map((app) =>
      app.id === id ? { ...app, ...updatedFields } : app
    );
    localStorage.setItem(APPS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error updating application:', err);
    return null;
  }
}

export function deleteApplication(id) {
  try {
    const current = getStoredApplications();
    const updated = current.filter((app) => app.id !== id);
    localStorage.setItem(APPS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting application:', err);
    return null;
  }
}

// ---------------- ENQUIRIES ----------------
export function getStoredEnquiries() {
  try {
    const data = localStorage.getItem(ENQ_KEY);
    if (!data) {
      localStorage.setItem(ENQ_KEY, JSON.stringify(initialEnquiries));
      return initialEnquiries;
    }
    return JSON.parse(data);
  } catch {
    return initialEnquiries;
  }
}

export function saveEnquiry(newEnquiry) {
  try {
    const current = getStoredEnquiries();
    const updated = [
      {
        ...newEnquiry,
        id: newEnquiry.id || `ENQ-${Date.now().toString().slice(-4)}`,
        status: newEnquiry.status || 'New',
        date: newEnquiry.date || new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      },
      ...current
    ];
    localStorage.setItem(ENQ_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving enquiry:', err);
    return null;
  }
}

export function updateEnquiryStatus(id, newStatus) {
  try {
    const current = getStoredEnquiries();
    const updated = current.map((enq) =>
      enq.id === id ? { ...enq, status: newStatus } : enq
    );
    localStorage.setItem(ENQ_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error updating enquiry status:', err);
    return null;
  }
}

export function deleteEnquiry(id) {
  try {
    const current = getStoredEnquiries();
    const updated = current.filter((enq) => enq.id !== id);
    localStorage.setItem(ENQ_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting enquiry:', err);
    return null;
  }
}

// ---------------- CUSTOMERS ----------------
const initialCustomers = [
  { id: 'CUST-101', name: 'Vikas Patil', phone: '9823012345', email: 'vikas.patil@example.com', city: 'Pune', activeProduct: 'Personal Loan', loanAmount: '₹5,00,000', status: 'Active', joinedDate: '2025-11-12' },
  { id: 'CUST-102', name: 'Priya Soni', phone: '9890123456', email: 'priya.soni@example.com', city: 'Mumbai', activeProduct: 'Business Loan', loanAmount: '₹25,00,000', status: 'Under Verification', joinedDate: '2026-01-20' },
  { id: 'CUST-103', name: 'Rohan Mehta', phone: '9765432109', email: 'rohan.mehta@example.com', city: 'Thane', activeProduct: 'Home Loan', loanAmount: '₹45,00,000', status: 'Active', joinedDate: '2026-02-14' },
  { id: 'CUST-104', name: 'Sandeep Joshi', phone: '9822334455', email: 'sandeep.j@example.com', city: 'Nashik', activeProduct: 'Car Loan', loanAmount: '₹7,50,000', status: 'Active', joinedDate: '2026-03-01' },
  { id: 'CUST-105', name: 'Ananya Roy', phone: '9819876543', email: 'ananya.roy@example.com', city: 'Pune', activeProduct: 'Personal Loan', loanAmount: '₹3,50,000', status: 'Active', joinedDate: '2026-03-10' },
];

export function getStoredCustomers() {
  try {
    const data = localStorage.getItem(CUST_KEY);
    if (!data) {
      localStorage.setItem(CUST_KEY, JSON.stringify(initialCustomers));
      return initialCustomers;
    }
    return JSON.parse(data);
  } catch {
    return initialCustomers;
  }
}

export function saveCustomer(newCust) {
  try {
    const current = getStoredCustomers();
    const updated = [
      {
        ...newCust,
        id: `CUST-${Date.now().toString().slice(-3)}`,
        joinedDate: new Date().toISOString().split('T')[0]
      },
      ...current
    ];
    localStorage.setItem(CUST_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving customer:', err);
    return null;
  }
}

export function deleteCustomer(id) {
  try {
    const current = getStoredCustomers();
    const updated = current.filter(c => c.id !== id);
    localStorage.setItem(CUST_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting customer:', err);
    return null;
  }
}

// ---------------- SERVICES ----------------
export function getStoredServices() {
  try {
    const data = localStorage.getItem(SERVICES_KEY);
    if (!data) {
      localStorage.setItem(SERVICES_KEY, JSON.stringify(defaultServices));
      return defaultServices;
    }
    return JSON.parse(data);
  } catch {
    return defaultServices;
  }
}

export function saveService(newService) {
  try {
    const current = getStoredServices();
    const updated = [newService, ...current];
    localStorage.setItem(SERVICES_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving service:', err);
    return null;
  }
}

// ---------------- BLOGS ----------------
export function getStoredBlogs() {
  try {
    const data = localStorage.getItem(BLOGS_KEY);
    if (!data) {
      localStorage.setItem(BLOGS_KEY, JSON.stringify(defaultBlogs));
      return defaultBlogs;
    }
    return JSON.parse(data);
  } catch {
    return defaultBlogs;
  }
}

export function saveBlog(newBlog) {
  try {
    const current = getStoredBlogs();
    const updated = [
      {
        ...newBlog,
        id: newBlog.id || `article-${Date.now().toString().slice(-4)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      },
      ...current
    ];
    localStorage.setItem(BLOGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving blog:', err);
    return null;
  }
}

export function deleteBlog(id) {
  try {
    const current = getStoredBlogs();
    const updated = current.filter(b => b.id !== id);
    localStorage.setItem(BLOGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting blog:', err);
    return null;
  }
}

// ---------------- TESTIMONIALS ----------------
export function getStoredTestimonials() {
  try {
    const data = localStorage.getItem(TESTIMONIALS_KEY);
    if (!data) {
      localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(defaultTestimonials));
      return defaultTestimonials;
    }
    return JSON.parse(data);
  } catch {
    return defaultTestimonials;
  }
}

export function saveTestimonial(newTest) {
  try {
    const current = getStoredTestimonials();
    const updated = [
      {
        ...newTest,
        id: Date.now(),
        isSample: false
      },
      ...current
    ];
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving testimonial:', err);
    return null;
  }
}

export function deleteTestimonial(id) {
  try {
    const current = getStoredTestimonials();
    const updated = current.filter(t => t.id !== id);
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting testimonial:', err);
    return null;
  }
}

// ---------------- CSV EXPORT HELPER ----------------
export function exportToCSV(filename, rows) {
  if (!rows || !rows.length) return;
  const separator = ',';
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    '\n' +
    rows.map(row => {
      return keys.map(k => {
        let cell = row[k] === null || row[k] === undefined ? '' : row[k];
        cell = cell instanceof Date ? cell.toLocaleString() : cell.toString().replace(/"/g, '""');
        if (cell.search(/("|,|\n)/g) >= 0) cell = `"${cell}"`;
        return cell;
      }).join(separator);
    }).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
