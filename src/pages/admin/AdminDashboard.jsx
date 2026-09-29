import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  getStoredApplications, 
  getStoredEnquiries, 
  updateApplicationStatus, 
  exportToCSV, 
  saveApplication 
} from '../../utils/storage';
import { 
  FileText, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  ArrowRight,
  Phone,
  Eye,
  ShieldCheck,
  RotateCcw,
  Download,
  Plus,
  Building,
  User,
  ExternalLink
} from 'lucide-react';

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Application Form State
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

  const refreshData = () => {
    setApplications(getStoredApplications());
    setEnquiries(getStoredEnquiries());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const totalApplications = applications.length;
  const totalEnquiries = enquiries.length;
  const pendingCount = applications.filter(a => a.status === 'Pending').length;
  const underReviewCount = applications.filter(a => a.status === 'Under Review').length;
  const approvedCount = applications.filter(a => a.status === 'Approved').length;
  const rejectedCount = applications.filter(a => a.status === 'Rejected').length;

  const handleStatusChange = (id, newStatus) => {
    const updated = updateApplicationStatus(id, newStatus);
    if (updated) {
      setApplications(updated);
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp(prev => ({ ...prev, status: newStatus }));
      }
    }
  };

  const handleExportApplications = () => {
    exportToCSV(`nidhi_applications_${new Date().toISOString().split('T')[0]}`, applications);
  };

  const handleExportEnquiries = () => {
    exportToCSV(`nidhi_enquiries_${new Date().toISOString().split('T')[0]}`, enquiries);
  };

  const handleCreateNewApp = (e) => {
    e.preventDefault();
    if (!newAppForm.fullName || !newAppForm.mobile) return;

    saveApplication(newAppForm);
    refreshData();
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
    <div className="space-y-8">
      
      {/* Top Banner / Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-950 via-slate-900 to-[#0A192F] p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-800/40">
            <span>Operations & Lending Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Nidhi Finance Admin Dashboard
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Live management of loan leads, applications, contact inquiries, and customer portfolios.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Application</span>
          </button>

          <button
            onClick={handleExportApplications}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
            title="Download CSV report"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={refreshData}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Refresh Data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* Total Applications */}
        <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              Total Applications
            </span>
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {totalApplications}
          </div>
          <div className="text-[10px] text-slate-500 mt-2 flex items-center justify-between pt-2 border-t border-slate-900">
            <span>Overall Pipeline</span>
          </div>
        </div>

        {/* New / Under Review */}
        <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              New / In Review
            </span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-400">
            {underReviewCount}
          </div>
          <div className="text-[10px] text-slate-500 mt-2 flex items-center justify-between pt-2 border-t border-slate-900">
            <span>Under Assessment</span>
          </div>
        </div>

        {/* Pending Applications */}
        <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              Pending
            </span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">
            {pendingCount}
          </div>
          <div className="text-[10px] text-slate-500 mt-2 flex items-center justify-between pt-2 border-t border-slate-900">
            <span>Awaiting Action</span>
          </div>
        </div>

        {/* Approved Applications */}
        <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              Approved
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            {approvedCount}
          </div>
          <div className="text-[10px] text-slate-500 mt-2 flex items-center justify-between pt-2 border-t border-slate-900">
            <span>Sanctions Ready</span>
          </div>
        </div>

        {/* Rejected Applications */}
        <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              Rejected
            </span>
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-400">
            {rejectedCount}
          </div>
          <div className="text-[10px] text-slate-500 mt-2 flex items-center justify-between pt-2 border-t border-slate-900">
            <span>Ineligible / Closed</span>
          </div>
        </div>

        {/* Total Enquiries */}
        <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              Enquiries
            </span>
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-300">
            {totalEnquiries}
          </div>
          <div className="text-[10px] text-slate-500 mt-2 flex items-center justify-between pt-2 border-t border-slate-900">
            <Link to="/admin/enquiries" className="text-purple-400 hover:underline">View Enquiries &rarr;</Link>
          </div>
        </div>

      </div>

      {/* Status Distribution Visual Bar */}
      <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
          <span>Application Status Breakdown:</span>
          <span>{totalApplications} Total Records</span>
        </div>
        
        {totalApplications > 0 && (
          <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden flex">
            <div 
              style={{ width: `${(approvedCount / totalApplications) * 100}%` }} 
              className="bg-emerald-500 h-full" 
              title={`Approved: ${approvedCount}`}
            />
            <div 
              style={{ width: `${(underReviewCount / totalApplications) * 100}%` }} 
              className="bg-amber-500 h-full" 
              title={`Under Review: ${underReviewCount}`}
            />
            <div 
              style={{ width: `${(pendingCount / totalApplications) * 100}%` }} 
              className="bg-blue-500 h-full" 
              title={`Pending: ${pendingCount}`}
            />
            <div 
              style={{ width: `${(rejectedCount / totalApplications) * 100}%` }} 
              className="bg-rose-500 h-full" 
              title={`Rejected: ${rejectedCount}`}
            />
          </div>
        )}

        <div className="flex flex-wrap gap-4 text-xs pt-1 text-slate-400">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Approved ({approvedCount})</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Under Review ({underReviewCount})</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Pending ({pendingCount})</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Rejected ({rejectedCount})</span>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-slate-950/80 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white">
              Recent Loan Applications
            </h3>
            <p className="text-xs text-slate-400">
              Real-time applications submitted by prospective borrowers.
            </p>
          </div>
          <Link
            to="/admin/applications"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <span>Manage All ({applications.length})</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 font-bold">App ID</th>
                <th className="py-3.5 px-4 font-bold">Applicant</th>
                <th className="py-3.5 px-4 font-bold">Mobile</th>
                <th className="py-3.5 px-4 font-bold">Loan Type</th>
                <th className="py-3.5 px-4 font-bold">Amount</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold">Date</th>
                <th className="py-3.5 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {applications.slice(0, 6).map((app) => (
                <tr key={app.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-400">
                    {app.id}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {app.fullName}
                    <span className="block text-[11px] text-slate-500 font-normal">{app.city || 'Location not specified'}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    <a href={`tel:${app.mobile}`} className="hover:text-amber-400 transition-colors font-mono">
                      {app.mobile}
                    </a>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-200">
                    {app.loanType}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    {app.requiredAmount}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 text-xs whitespace-nowrap">
                    {app.date}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-white text-xs font-semibold transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review</span>
                    </button>
                  </td>
                </tr>
              ))}
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
                  <a href={`tel:${selectedApp.mobile}`} className="font-bold text-amber-400 hover:underline">
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
                  Change Application Status:
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
              <h3 className="text-xl font-bold text-white">Create New Application</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
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
                  <label className="text-slate-300 font-bold">Amount</label>
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
                <label className="text-slate-300 font-bold">Note / Requirement</label>
                <textarea
                  rows={2}
                  value={newAppForm.message}
                  onChange={(e) => setNewAppForm({ ...newAppForm, message: e.target.value })}
                  placeholder="Application purpose or notes..."
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
