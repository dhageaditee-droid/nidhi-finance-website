import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Phone, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  TrendingUp,
  HeartPulse,
  Home
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0A192F] to-[#0F2744] text-white pt-12 pb-16 lg:pt-18 lg:pb-24">
      {/* Background Subtle Geometry Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-xs font-bold text-emerald-300 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Secure Today, Success Tomorrow</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Smart Financial Solutions for a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-teal-300">
                Better Future
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Nidhi Finance provides transparent and customer-focused solutions across <strong>Loans</strong>, <strong>Insurance</strong>, and <strong>Investment Plans</strong> designed to support your personal and business goals.
            </p>

            {/* Location & Trust Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Home, Personal, Car, Old Vehicle & Business Loans</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mediclaim, Term & Vehicle Insurance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mutual Funds, SIP Plans & Fixed Deposits</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Akole By-Pass Road, Sangamner</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <Link
                to="/apply"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-xl shadow-emerald-950/40 hover:shadow-2xl hover:-translate-y-0.5 transition-all text-sm sm:text-base"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 transition-all text-sm sm:text-base hover:text-white"
              >
                <span>Explore Services</span>
              </Link>

              <a
                href="tel:9112927218"
                className="inline-flex items-center gap-2 text-sm font-bold text-amber-300 hover:text-white px-2 py-1 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Call: 9112927218</span>
              </a>
            </div>

          </div>

          {/* Right Column: Instant Solution Finder Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="rounded-3xl bg-gradient-to-b from-slate-800/90 to-slate-900/95 border border-slate-700/70 p-6 shadow-2xl backdrop-blur-xl">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-5">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold">
                      Our 3 Core Domains
                    </div>
                    <div className="text-lg font-bold text-white">
                      Instant Solution Finder
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>

                {/* Service Snapshot Chips for 3 categories */}
                <div className="space-y-3">
                  <Link
                    to="/services/home-loans"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                        <Home className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                          Loans
                        </div>
                        <div className="text-xs text-slate-400">
                          Home, Personal, Car, Old Vehicle & Business
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                      Low EMI
                    </span>
                  </Link>

                  <Link
                    to="/services/mediclaim"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                        <HeartPulse className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                          Insurance
                        </div>
                        <div className="text-xs text-slate-400">
                          Mediclaim, Term, Vehicle & Commercial Fleet
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                      Protection
                    </span>
                  </Link>

                  <Link
                    to="/services/sip-plans"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                          Investment
                        </div>
                        <div className="text-xs text-slate-400">
                          Mutual Funds, SIP Plans, FD & Retirement
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded">
                      Growth
                    </span>
                  </Link>
                </div>

                {/* Direct Calculator CTA */}
                <div className="mt-5 pt-4 border-t border-slate-700/80 flex items-center justify-between">
                  <div className="text-xs text-slate-300">
                    Estimate your loan EMI online:
                  </div>
                  <Link
                    to="/loan-calculator"
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>EMI Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-3 bg-emerald-700 text-white px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold border border-emerald-500/40">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Sangamner • Ahilyanagar</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
