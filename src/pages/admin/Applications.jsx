import { useState, useEffect } from 'react';
import { 
  getStoredApplications, 
  updateApplicationStatus, 
  deleteApplication, 
  saveApplication, 
  exportToCSV 
} from '../../utils/storage';
import { 
  Search, 
  Filter, 
  Eye, 
  Phone, 
  CheckCircle2, 
  Clock, 
  FileText, 
  User,
  RotateCcw,
  Trash2,
  Download,
  Plus,
  MessageSquare
} from 'lucide-react';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Application Form
  const [newAppForm, setNewAppForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    employmentType: 'Salaried',
    monthlyIncome: '₹50,000',
    requiredAmount: '₹5,00,000',
    loanType: 'Personal Loan',
    message: ''
  });

  const loadData = () => {
    setApplications(getStoredApplications());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = updateApplicationStatus(id, newStatus);
    if (updated) {
      setApplications(updated);
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp(prev => ({ ...prev, status: newStatus }));
      }
    }
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this application record?')) {
      const updated = deleteApplication(id);
      if (updated) {
        setApplications(updated);
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp(null);
        }
      }
    }
  };

  const handleExportCSV = () => {
    exportToCSV(`nidhi_applications_${new Date().toISOString().split('T')[0]}`, filteredApps);
  };

  const handleCreateNewApp = (e) => {
    e.preventDefault();
    if (!newAppForm.fullName || !newAppForm.mobile) return;

    saveApplication(newAppForm);
    loadData();
    setShowAddModal(false);
    setNewAppForm({
      fullName: '',
      mobile: '',
      email: '',
      city: '',
      employmentType: 'Salaried',
      monthlyIncome: '₹50,000',
      requiredAmount: '₹5,00,000',
      loanType: 'Personal Loan',
      message: ''
    });
  };

  const filteredApps = applications.filter((app) => {
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesType = typeFilter === 'All' || app.loanType === typeFilter;
    const matchesSearch = 
      app.fullName.toLowerCase().includes(search.toLowerCase()) ||
      app.mobile.includes(search) ||
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      (app.city && app.city.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesType && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-950 text-emerald-400 border border-emerald-800';
      case 'Under Review':
        return 'bg-amber-950 text-amber-400 border border-amber-800';
      case 'Rejected':
        return 'bg-rose-950 text-rose-400 border border-rose-800';
      default:
        return 'bg-blue-950 text-blue-400 border border-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Loan Applications Manager
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Review, edit status, delete, and export leads submitted by borrowers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Application</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-950/90 p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, mobile, ID, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Statuses ({applications.length})</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Loan Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Types</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Business Loan">Business Loan</option>
              <option value="Home Loan">Home Loan</option>
              <option value="Car Loan">Car Loan</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

      </div>

      {/* Applications Table */}
      <div className="bg-slate-950/80 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 font-bold">App ID</th>
                <th className="py-3.5 px-4 font-bold">Applicant Name</th>
                <th className="py-3.5 px-4 font-bold">Mobile</th>
                <th className="py-3.5 px-4 font-bold">City</th>
                <th className="py-3.5 px-4 font-bold">Loan Type</th>
                <th className="py-3.5 px-4 font-bold">Amount</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold">Date</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    No loan applications found matching your search.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-400">
                      {app.id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {app.fullName}
                      <span className="block text-[11px] text-slate-500 font-normal">{app.employmentType}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono">
                      <a href={`tel:${app.mobile}`} className="hover:text-amber-400 transition-colors">
                        {app.mobile}
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {app.city || '—'}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-200">
                      {app.loanType}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      {app.requiredAmount}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`px-2 py-1 rounded-md text-[11px] font-bold focus:outline-none cursor-pointer ${getStatusBadge(app.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-xs whitespace-nowrap">
                      {app.date}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-white transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`https://wa.me/91${app.mobile}?text=Hello%20${encodeURIComponent(app.fullName)},%20regarding%20your%20${encodeURIComponent(app.loanType)}%20application%20with%20Nidhi%20Finance.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white transition-colors"
                          title="Chat on WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={(e) => handleDelete(app.id, e)}
                          className="p-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white transition-colors"
                          title="Delete Application"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-mono font-bold text-blue-400">{selectedApp.id}</span>
                <h3 className="text-xl font-bold text-white">{selectedApp.fullName}</h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-xs">Mobile Number</span>
                  <a href={`tel:${selectedApp.mobile}`} className="font-bold text-amber-400 hover:underline font-mono">
                    {selectedApp.mobile}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Email</span>
                  <span className="font-medium text-slate-200">{selectedApp.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">City</span>
                  <span className="font-medium text-slate-200">{selectedApp.city || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Employment</span>
                  <span className="font-medium text-slate-200">{selectedApp.employmentType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Monthly Income</span>
                  <span className="font-medium text-slate-200">{selectedApp.monthlyIncome}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Requested Loan</span>
                  <span className="font-bold text-emerald-400">{selectedApp.requiredAmount}</span>
                </div>
              </div>

              {selectedApp.message && (
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-xs mb-1">Applicant Note:</span>
                  <p className="text-slate-300 italic text-xs">{selectedApp.message}</p>
                </div>
              )}

              {/* Status Update Control */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-300">
                  Update Application Status:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['Pending', 'Under Review', 'Approved', 'Rejected'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedApp.id, st)}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-bold transition-all ${
                        selectedApp.status === st
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center gap-3 pt-4 border-t border-slate-800">
              <a
                href={`tel:${selectedApp.mobile}`}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Applicant</span>
              </a>

              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Add New Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">Create New Loan Application</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewApp} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Applicant Name *</label>
                  <input
                    type="text"
                    required
                    value={newAppForm.fullName}
                    onChange={(e) => setNewAppForm({ ...newAppForm, fullName: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={newAppForm.mobile}
                    onChange={(e) => setNewAppForm({ ...newAppForm, mobile: e.target.value })}
                    placeholder="10-digit mobile"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Email</label>
                  <input
                    type="email"
                    value={newAppForm.email}
                    onChange={(e) => setNewAppForm({ ...newAppForm, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">City</label>
                  <input
                    type="text"
                    value={newAppForm.city}
                    onChange={(e) => setNewAppForm({ ...newAppForm, city: e.target.value })}
                    placeholder="e.g. Pune"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Loan Type</label>
                  <select
                    value={newAppForm.loanType}
                    onChange={(e) => setNewAppForm({ ...newAppForm, loanType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Business Loan">Business Loan</option>
                    <option value="Home Loan">Home Loan</option>
                    <option value="Car Loan">Car Loan</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Loan Amount</label>
                  <input
                    type="text"
                    value={newAppForm.requiredAmount}
                    onChange={(e) => setNewAppForm({ ...newAppForm, requiredAmount: e.target.value })}
                    placeholder="₹5,00,000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Applicant Note / Purpose</label>
                <textarea
                  rows={2}
                  value={newAppForm.message}
                  onChange={(e) => setNewAppForm({ ...newAppForm, message: e.target.value })}
                  placeholder="Purpose of loan or details..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Save Application
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
