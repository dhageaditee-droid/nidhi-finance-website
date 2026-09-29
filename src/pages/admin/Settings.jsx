import { useState } from 'react';
import { Settings as SettingsIcon, Save, Phone, MapPin, Mail, ShieldCheck, CheckCircle2, Download, RotateCcw } from 'lucide-react';
import { initialApplications, initialEnquiries } from '../../data/initialApplications';

export default function Settings() {
  const [companySettings, setCompanySettings] = useState({
    companyName: 'Nidhi Finance',
    contactNumber: '9112927218',
    whatsappNumber: '9112927218',
    tagline: 'Secure Today, Success Tomorrow',
    officeAddress: 'Akole By-Pass Road, Sangamner, District Ahilyanagar - 422 605',
    operatingHours: 'Mon - Sat: 9:30 AM to 7:00 PM',
    emailContact: 'nidhifinance@outlook.com'
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExportBackup = () => {
    const backup = {
      applications: localStorage.getItem('nidhi_finance_applications'),
      enquiries: localStorage.getItem('nidhi_finance_enquiries'),
      customers: localStorage.getItem('nidhi_finance_customers'),
      services: localStorage.getItem('nidhi_finance_services'),
      blogs: localStorage.getItem('nidhi_finance_blogs'),
      testimonials: localStorage.getItem('nidhi_finance_testimonials'),
      exportedAt: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nidhi_finance_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all demo applications and enquiries to original sample records?')) {
      localStorage.setItem('nidhi_finance_applications', JSON.stringify(initialApplications));
      localStorage.setItem('nidhi_finance_enquiries', JSON.stringify(initialEnquiries));
      alert('Data reset to original initial state.');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Company & System Settings
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Official corporate branding, Sangamner office address, phone lines, and data management.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Settings saved successfully in active session.</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Company Name</label>
            <input
              type="text"
              value={companySettings.companyName}
              onChange={(e) => setCompanySettings({ ...companySettings, companyName: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Primary Contact Number</label>
            <input
              type="text"
              value={companySettings.contactNumber}
              onChange={(e) => setCompanySettings({ ...companySettings, contactNumber: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Secondary / WhatsApp Number</label>
            <input
              type="text"
              value={companySettings.whatsappNumber}
              onChange={(e) => setCompanySettings({ ...companySettings, whatsappNumber: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Official Tagline</label>
            <input
              type="text"
              value={companySettings.tagline}
              onChange={(e) => setCompanySettings({ ...companySettings, tagline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Official Email</label>
            <input
              type="email"
              value={companySettings.emailContact}
              onChange={(e) => setCompanySettings({ ...companySettings, emailContact: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Operating Consultation Hours</label>
            <input
              type="text"
              value={companySettings.operatingHours}
              onChange={(e) => setCompanySettings({ ...companySettings, operatingHours: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-slate-300">Official Office Address</label>
            <input
              type="text"
              value={companySettings.officeAddress}
              onChange={(e) => setCompanySettings({ ...companySettings, officeAddress: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>

      </form>

      {/* Database Backup & Maintenance Actions */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white">
          Data Management & Database Backup
        </h3>
        <p className="text-xs text-slate-400">
          Export all active portal records as a JSON backup or reset to default state.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={handleExportBackup}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Download Full JSON Backup</span>
          </button>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900 text-rose-300 text-xs font-semibold border border-rose-800/60 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data to Initial State</span>
          </button>
        </div>
      </div>

    </div>
  );
}
