import { useState, useEffect } from 'react';
import { 
  getStoredCustomers, 
  saveCustomer, 
  deleteCustomer, 
  exportToCSV 
} from '../../utils/storage';
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  ShieldCheck, 
  Trash2, 
  Plus, 
  Download,
  Building
} from 'lucide-react';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newCust, setNewCust] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    activeProduct: 'Personal Loan',
    loanAmount: '₹5,00,000',
    status: 'Active'
  });

  const loadData = () => {
    setCustomers(getStoredCustomers());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this customer record?')) {
      const updated = deleteCustomer(id);
      if (updated) setCustomers(updated);
    }
  };

  const handleExportCSV = () => {
    exportToCSV(`nidhi_customers_${new Date().toISOString().split('T')[0]}`, filtered);
  };

  const handleCreateCustomer = (e) => {
    e.preventDefault();
    if (!newCust.name || !newCust.phone) return;

    saveCustomer(newCust);
    loadData();
    setShowAddModal(false);
    setNewCust({
      name: '',
      phone: '',
      email: '',
      city: '',
      activeProduct: 'Personal Loan',
      loanAmount: '₹5,00,000',
      status: 'Active'
    });
  };

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.city.toLowerCase().includes(search.toLowerCase()) ||
    c.activeProduct.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Customer Directory
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Registered client accounts, active borrowing relationships, and portfolio status.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Customer</span>
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

      {/* Filter */}
      <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customers by name, phone, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-950/80 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 font-bold">Cust ID</th>
                <th className="py-3.5 px-4 font-bold">Client Name</th>
                <th className="py-3.5 px-4 font-bold">Phone</th>
                <th className="py-3.5 px-4 font-bold">Location</th>
                <th className="py-3.5 px-4 font-bold">Active Product</th>
                <th className="py-3.5 px-4 font-bold">Disbursed Amount</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-400">{c.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {c.name}
                      <span className="block text-[11px] text-slate-500 font-normal">{c.email}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">
                      <a href={`tel:${c.phone}`} className="hover:text-amber-400">{c.phone}</a>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">{c.city}</td>
                    <td className="py-3.5 px-4 font-medium text-emerald-300">{c.activeProduct}</td>
                    <td className="py-3.5 px-4 font-bold text-white">{c.loanAmount}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white transition-colors"
                        title="Remove Customer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">Add Customer Record</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newCust.name}
                    onChange={(e) => setNewCust({ ...newCust, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newCust.phone}
                    onChange={(e) => setNewCust({ ...newCust, phone: e.target.value })}
                    placeholder="10-digit phone"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Email</label>
                  <input
                    type="email"
                    value={newCust.email}
                    onChange={(e) => setNewCust({ ...newCust, email: e.target.value })}
                    placeholder="email@domain.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">City</label>
                  <input
                    type="text"
                    value={newCust.city}
                    onChange={(e) => setNewCust({ ...newCust, city: e.target.value })}
                    placeholder="e.g. Pune"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Active Product</label>
                  <select
                    value={newCust.activeProduct}
                    onChange={(e) => setNewCust({ ...newCust, activeProduct: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Business Loan">Business Loan</option>
                    <option value="Home Loan">Home Loan</option>
                    <option value="Car Loan">Car Loan</option>
                    <option value="Financial Planning">Financial Planning</option>
                    <option value="Insurance Solutions">Insurance Solutions</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Disbursed Amount</label>
                  <input
                    type="text"
                    value={newCust.loanAmount}
                    onChange={(e) => setNewCust({ ...newCust, loanAmount: e.target.value })}
                    placeholder="₹5,00,000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
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
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
