import { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Save, 
  Phone, 
  MapPin, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  RotateCcw,
  KeyRound,
  Lock,
  User,
  AlertCircle
} from 'lucide-react';
import { initialApplications, initialEnquiries } from '../../data/initialApplications';
import { getAdminAccount, updateAdminAccount } from '../../services/auth';

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

  // Admin Account Credentials State
  const [adminAccount, setAdminAccount] = useState({
    email: '',
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [accountSuccess, setAccountSuccess] = useState('');
  const [accountError, setAccountError] = useState('');

  useEffect(() => {
    const current = getAdminAccount();
    setAdminAccount((prev) => ({
      ...prev,
      email: current.email || 'nidhifinance@outlook.com',
      username: current.username || 'admin'
    }));
  }, []);

  const handleSubmitCompany = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleUpdateAdminAccount = (e) => {
    e.preventDefault();
    setAccountError('');
    setAccountSuccess('');

    if (!adminAccount.email.trim()) {
      setAccountError('Admin Email is required.');
      return;
    }

    if (adminAccount.newPassword && adminAccount.newPassword !== adminAccount.confirmPassword) {
      setAccountError('New Password and Confirm Password do not match.');
      return;
    }

    if (adminAccount.newPassword && adminAccount.newPassword.length < 4) {
      setAccountError('Password must be at least 4 characters.');
      return;
    }

    const payload = {
      email: adminAccount.email.trim(),
      username: adminAccount.username.trim() || 'admin'
    };

    if (adminAccount.newPassword) {
      payload.password = adminAccount.newPassword.trim();
    }

    const result = updateAdminAccount(payload);
    if (result.success) {
      setAccountSuccess('Admin login email and password updated successfully!');
      setAdminAccount((prev) => ({
        ...prev,
        newPassword: '',
        confirmPassword: ''
      }));
      setTimeout(() => setAccountSuccess(''), 4000);
    } else {
      setAccountError(result.message || 'Failed to update credentials.');
    }
  };

  const handleExportBackup = () => {
    const backup = {
      applications: localStorage.getItem('nidhi_finance_applications'),
      enquiries: localStorage.getItem('nidhi_finance_enquiries'),
      customers: localStorage.getItem('nidhi_finance_customers'),
      services: localStorage.getItem('nidhi_finance_services'),
      testimonials: localStorage.getItem('nidhi_finance_testimonials'),
      adminAccount: localStorage.getItem('nidhi_admin_account'),
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
    if (window.confirm('Reset all sample applications and enquiries to original state?')) {
      localStorage.setItem('nidhi_finance_applications', JSON.stringify(initialApplications));
      localStorage.setItem('nidhi_finance_enquiries', JSON.stringify(initialEnquiries));
      alert('Data reset to original initial state.');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Portal & Security Settings
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Manage your Admin Login Email & Password, corporate information, and backup data.
        </p>
      </div>

      {/* 1. Admin Login Email & Password Management Card */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-emerald-900/40 shadow-xl space-y-6 relative overflow-hidden">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              Admin Login Credentials & Security
            </h2>
            <p className="text-xs text-slate-400">
              Set your personal email and password to log in to the admin panel.
            </p>
          </div>
        </div>

        {accountSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-800 text-emerald-300 text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{accountSuccess}</span>
          </div>
        )}

        {accountError && (
          <div className="p-4 rounded-xl bg-rose-950/90 border border-rose-800 text-rose-300 text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{accountError}</span>
          </div>
        )}

        <form onSubmit={handleUpdateAdminAccount} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Admin Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin Login Email *</span>
              </label>
              <input
                type="email"
                required
                value={adminAccount.email}
                onChange={(e) => setAdminAccount({ ...adminAccount, email: e.target.value })}
                placeholder="your-email@outlook.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Admin Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span>Admin Username (Optional)</span>
              </label>
              <input
                type="text"
                value={adminAccount.username}
                onChange={(e) => setAdminAccount({ ...adminAccount, username: e.target.value })}
                placeholder="admin"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* New Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>New Password</span>
              </label>
              <input
                type="password"
                value={adminAccount.newPassword}
                onChange={(e) => setAdminAccount({ ...adminAccount, newPassword: e.target.value })}
                placeholder="Enter new password (leave blank to keep current)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Confirm New Password</span>
              </label>
              <input
                type="password"
                value={adminAccount.confirmPassword}
                onChange={(e) => setAdminAccount({ ...adminAccount, confirmPassword: e.target.value })}
                placeholder="Confirm new password"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Update Admin Credentials</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. Company & System Settings Form */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              Official Corporate & Contact Settings
            </h2>
            <p className="text-xs text-slate-400">
              Sangamner office address, public contact lines, and brand information.
            </p>
          </div>
        </div>

        {saved && (
          <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Corporate settings saved successfully.</span>
          </div>
        )}

        <form onSubmit={handleSubmitCompany} className="space-y-6">
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
              <label className="text-xs font-bold text-slate-300">Public Contact Email</label>
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
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Corporate Details</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. Database Backup & Maintenance Actions */}
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
            <span>Reset Sample Data to Initial State</span>
          </button>
        </div>
      </div>

    </div>
  );
}
