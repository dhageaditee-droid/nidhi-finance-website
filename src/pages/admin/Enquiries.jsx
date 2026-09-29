import { useState, useEffect } from 'react';
import { 
  getStoredEnquiries, 
  updateEnquiryStatus, 
  deleteEnquiry, 
  saveEnquiry, 
  exportToCSV 
} from '../../utils/storage';
import { 
  MessageSquare, 
  Search, 
  Phone, 
  CheckCircle2, 
  Clock, 
  Mail,
  ExternalLink,
  Trash2,
  Download,
  Plus
} from 'lucide-react';

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Enquiry State
  const [newEnquiry, setNewEnquiry] = useState({
    name: '',
    mobile: '',
    email: '',
    serviceRequired: 'Personal Loan',
    message: ''
  });

  const loadData = () => {
    setEnquiries(getStoredEnquiries());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = updateEnquiryStatus(id, newStatus);
    if (updated) {
      setEnquiries(updated);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      const updated = deleteEnquiry(id);
      if (updated) {
        setEnquiries(updated);
      }
    }
  };

  const handleExportCSV = () => {
    exportToCSV(`nidhi_enquiries_${new Date().toISOString().split('T')[0]}`, filteredEnquiries);
  };

  const handleCreateEnquiry = (e) => {
    e.preventDefault();
    if (!newEnquiry.name || !newEnquiry.mobile) return;

    saveEnquiry(newEnquiry);
    loadData();
    setShowAddModal(false);
    setNewEnquiry({
      name: '',
      mobile: '',
      email: '',
      serviceRequired: 'Personal Loan',
      message: ''
    });
  };

  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesStatus = statusFilter === 'All' || enq.status === statusFilter;
    const matchesSearch = 
      enq.name.toLowerCase().includes(search.toLowerCase()) ||
      enq.mobile.includes(search) ||
      enq.serviceRequired.toLowerCase().includes(search.toLowerCase()) ||
      enq.id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Contact & Lead Enquiries
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Incoming prospective customer queries received from the contact form and service CTAs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Enquiry</span>
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
      <div className="bg-slate-950/90 p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, mobile, service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-slate-400 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Leads ({enquiries.length})</option>
            <option value="New">New</option>
            <option value="Responded">Responded</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

      </div>

      {/* Enquiries Table */}
      <div className="bg-slate-950/80 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 font-bold">Enquiry ID</th>
                <th className="py-3.5 px-4 font-bold">Name</th>
                <th className="py-3.5 px-4 font-bold">Mobile</th>
                <th className="py-3.5 px-4 font-bold">Service Required</th>
                <th className="py-3.5 px-4 font-bold">Message Snippet</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold">Date</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No enquiries found matching your search.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                      {enq.id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {enq.name}
                      <span className="block text-[11px] text-slate-500 font-normal">{enq.email || 'No email provided'}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">
                      <a href={`tel:${enq.mobile}`} className="hover:text-amber-400">{enq.mobile}</a>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-blue-300">
                      {enq.serviceRequired}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate" title={enq.message}>
                      {enq.message}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        className={`px-2 py-1 rounded-md text-[11px] font-bold focus:outline-none cursor-pointer ${
                          enq.status === 'Responded'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-blue-950 text-blue-400 border border-blue-800'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Responded">Responded</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-xs whitespace-nowrap">
                      {enq.date}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`tel:${enq.mobile}`}
                          className="p-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white transition-colors"
                          title="Call Lead"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`https://wa.me/91${enq.mobile}?text=Hello%20${encodeURIComponent(enq.name)},%20thank%20you%20for%20contacting%20Nidhi%20Finance%20regarding%20${encodeURIComponent(enq.serviceRequired)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white transition-colors"
                          title="WhatsApp Reply"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleDelete(enq.id)}
                          className="p-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white transition-colors"
                          title="Delete Enquiry"
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

      {/* Add Enquiry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">Add Manual Lead / Enquiry</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEnquiry} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Contact Name *</label>
                <input
                  type="text"
                  required
                  value={newEnquiry.name}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={newEnquiry.mobile}
                    onChange={(e) => setNewEnquiry({ ...newEnquiry, mobile: e.target.value })}
                    placeholder="10-digit mobile"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Email</label>
                  <input
                    type="email"
                    value={newEnquiry.email}
                    onChange={(e) => setNewEnquiry({ ...newEnquiry, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Service Required</label>
                <select
                  value={newEnquiry.serviceRequired}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, serviceRequired: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                >
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Business Loan">Business Loan</option>
                  <option value="Home Loan">Home Loan</option>
                  <option value="Car Loan">Car Loan</option>
                  <option value="Financial Planning">Financial Planning</option>
                  <option value="Insurance Solutions">Insurance Solutions</option>
                  <option value="Other">Other Query</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Inquiry Message</label>
                <textarea
                  rows={3}
                  value={newEnquiry.message}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, message: e.target.value })}
                  placeholder="Details of the inquiry..."
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
                  Save Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
