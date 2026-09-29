import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Menu, 
  X, 
  ChevronRight, 
  ShieldCheck, 
  ArrowUpRight,
  Mail,
  MapPin
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Loan Calculator', path: '/loan-calculator' },
    { name: 'Eligibility', path: '/eligibility' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Advisory Strip */}
      <div className="bg-[#0A192F] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/60 uppercase tracking-wider">
              Secure Today, Success Tomorrow
            </span>
            <span className="hidden lg:inline text-slate-400 text-[11px]">
              Akole By-Pass Road, Sangamner, Ahilyanagar - 422 605
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a 
              href="tel:9112927218" 
              className="flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 transition-colors"
              title="Call Helpline: 9112927218"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91 9112927218</span>
            </a>

            <span className="text-slate-600 hidden md:inline">|</span>

            <a 
              href="mailto:nidhifinance@outlook.com" 
              className="text-slate-400 hover:text-white transition-colors text-[11px] hidden sm:inline-flex items-center gap-1"
            >
              <Mail className="w-3 h-3 text-blue-400" />
              <span>nidhifinance@outlook.com</span>
            </a>

            <span className="text-slate-600 hidden md:inline">|</span>

            <Link 
              to="/admin" 
              className="text-slate-400 hover:text-white transition-colors text-[11px] hidden md:inline-flex items-center gap-1"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass-nav shadow-lg border-b border-slate-200/80 py-3' 
            : 'bg-white border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="/logo.jpg" 
                alt="Nidhi Finance Logo" 
                className="h-11 sm:h-12 w-auto object-contain rounded-lg shadow-sm border border-slate-200/80 group-hover:scale-105 transition-transform duration-200" 
              />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#14532d] flex items-center gap-1">
                  NIDHI <span className="text-amber-600">FINANCE</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-800 -mt-1 hidden sm:block">
                  Secure Today, Success Tomorrow
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                      isActive
                        ? 'text-emerald-800 bg-emerald-50 font-bold'
                        : 'text-slate-700 hover:text-emerald-800 hover:bg-slate-50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="tel:9112927218"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-800 hover:text-emerald-800 hover:bg-emerald-50 border border-slate-200 transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call: 9112927218</span>
              </a>

              <Link
                to="/apply"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 shadow-md shadow-emerald-900/15 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Apply Now</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to="/apply"
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 sm:hidden"
              >
                Apply
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-emerald-800 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-1 gap-1 py-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive
                        ? 'text-emerald-800 bg-emerald-50 font-bold'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </NavLink>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="tel:9112927218"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call Helpline (9112927218)</span>
              </a>

              <a
                href="mailto:nidhifinance@outlook.com"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium text-slate-600 bg-slate-50"
              >
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                <span>nidhifinance@outlook.com</span>
              </a>

              <Link
                to="/apply"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md"
              >
                <span>Apply Online</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
