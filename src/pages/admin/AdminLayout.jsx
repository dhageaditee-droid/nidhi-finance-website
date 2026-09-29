import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getAdminAuth, clearAdminAuth } from '../../utils/storage';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Users, 
  Briefcase, 
  BookOpen, 
  Star, 
  Settings as SettingsIcon, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck, 
  ArrowLeft,
  Bell,
  ExternalLink
} from 'lucide-react';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If not on login page, verify session or default to demo user
    const currentAuth = getAdminAuth();
    if (!currentAuth && !location.pathname.includes('/admin/login')) {
      // Auto assign demo session or redirect
      setAdminUser({ username: 'admin', role: 'Administrator' });
    } else {
      setAdminUser(currentAuth);
    }
  }, [location.pathname]);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Applications', path: '/admin/applications', icon: FileText },
    { name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Services', path: '/admin/services', icon: Briefcase },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
    { name: 'Settings', path: '/admin/settings', icon: SettingsIcon },
  ];

  const handleLogout = () => {
    clearAdminAuth();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-sans antialiased">
      
      {/* Mobile Top Nav */}
      <div className="md:hidden bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-lg object-contain bg-white p-0.5" />
          <span className="font-bold text-white text-base">Admin Portal</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-800/80 p-5 flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Admin Header Logo */}
          <div className="flex items-center justify-between px-2">
            <Link to="/admin" className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Nidhi Finance" className="w-10 h-10 rounded-xl object-contain bg-white p-1 shadow-md" />
              <div>
                <div className="font-extrabold text-white text-base leading-tight tracking-tight">
                  Nidhi Finance
                </div>
                <div className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                  Admin Portal
                </div>
              </div>
            </Link>
          </div>

          {/* Nav items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`
                  }
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom: Back to Website & Logout */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900 overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-semibold">
              Live Portal Active
            </span>
            <span className="hidden sm:inline">
              Smart Financial Solutions Management
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/apply"
              target="_blank"
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors hidden sm:inline-flex items-center gap-1"
            >
              <span>+ Test User Application</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 border border-blue-500/40 flex items-center justify-center text-xs font-bold text-white">
                AD
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-white">Aditee (Admin)</div>
                <div className="text-[10px] text-slate-400">Operations Desk</div>
              </div>
            </div>
          </div>
        </header>

        {/* Child Routes */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
