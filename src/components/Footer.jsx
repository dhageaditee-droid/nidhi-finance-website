import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight,
  Lock,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#071324] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.jpg" 
                alt="Nidhi Finance Logo" 
                className="h-12 w-auto object-contain rounded-xl bg-white p-1 shadow-lg" 
              />
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white">
                  NIDHI <span className="text-amber-400">FINANCE</span>
                </span>
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-widest -mt-0.5">
                  Secure Today, Success Tomorrow
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Nidhi Finance provides simple, transparent and customer-focused financial solutions — including Home, Personal & Business Loans, Insurance, and Wealth Investments.
            </p>

            {/* Office Location & Contact Snapshot */}
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Akole By-Pass Road, Sangamner, District Ahilyanagar - 422 605</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:9112927218" className="font-bold text-white hover:text-amber-400 transition-colors">
                  +91 9112927218
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:nidhifinance@outlook.com" className="hover:text-white transition-colors">
                  nidhifinance@outlook.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Loans */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wide flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Loans
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/home-loans" className="text-slate-400 hover:text-white transition-colors">
                  Home Loans
                </Link>
              </li>
              <li>
                <Link to="/services/personal-loans" className="text-slate-400 hover:text-white transition-colors">
                  Personal Loans
                </Link>
              </li>
              <li>
                <Link to="/services/car-loans" className="text-slate-400 hover:text-white transition-colors">
                  Car Loans
                </Link>
              </li>
              <li>
                <Link to="/services/old-vehicles-loans" className="text-slate-400 hover:text-white transition-colors">
                  Old Vehicles Loans
                </Link>
              </li>
              <li>
                <Link to="/services/business-loans" className="text-slate-400 hover:text-white transition-colors">
                  Business Loans
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Insurance */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wide flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Insurance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/mediclaim" className="text-slate-400 hover:text-white transition-colors">
                  Mediclaim
                </Link>
              </li>
              <li>
                <Link to="/services/term-insurance-plans" className="text-slate-400 hover:text-white transition-colors">
                  Term Insurance Plans
                </Link>
              </li>
              <li>
                <Link to="/services/commercial-vehicle-insurance" className="text-slate-400 hover:text-white transition-colors">
                  Commercial Vehicle Insurance
                </Link>
              </li>
              <li>
                <Link to="/services/bike-car-insurance" className="text-slate-400 hover:text-white transition-colors">
                  Bike & Car Insurance
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Investment & Contact */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wide flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Investment
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/mutual-fund" className="text-slate-400 hover:text-white transition-colors">
                  Mutual Fund
                </Link>
              </li>
              <li>
                <Link to="/services/sip-plans" className="text-slate-400 hover:text-white transition-colors">
                  SIP Plans
                </Link>
              </li>
              <li>
                <Link to="/services/fix-deposit" className="text-slate-400 hover:text-white transition-colors">
                  Fix Deposit
                </Link>
              </li>
              <li>
                <Link to="/services/retirement-plan" className="text-slate-400 hover:text-white transition-colors">
                  Retirement Plan
                </Link>
              </li>
            </ul>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="tel:9112927218"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call: 9112927218</span>
              </a>

              <a
                href="https://wa.me/919112927218"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold bg-blue-700 hover:bg-blue-600 text-white transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Regulatory & Advisory Disclaimer */}
        <div className="py-6 border-b border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
          <p className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Important Financial Disclaimer:
          </p>
          <p>
            Information provided on this website is for general informational purposes only. Financial products, eligibility, interest rates, approval, insurance coverage, and investment returns are subject to verification, provider underwriting, market risks, and applicable terms and conditions. Nidhi Finance does not guarantee unconditional loan approvals without standard documentation and credit evaluation.
          </p>
        </div>

        {/* Copyright & Sub-links */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © 2026 Nidhi Finance, Sangamner. All Rights Reserved.
          </div>

          <div className="flex flex-wrap gap-4 text-xs">
            <Link to="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-slate-300 transition-colors">About Us</Link>
            <span>•</span>
            <Link to="/services" className="hover:text-slate-300 transition-colors">Services</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
            <span>•</span>
            <Link to="/admin" className="hover:text-amber-400 transition-colors font-medium">Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
