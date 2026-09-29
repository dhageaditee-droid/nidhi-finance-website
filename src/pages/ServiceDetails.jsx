import { useParams, Link, Navigate } from 'react-router-dom';
import { services } from '../data/services';
import CTA from '../components/CTA';
import LoanCalculatorWidget from '../components/LoanCalculatorWidget';
import { 
  Home, 
  UserCheck, 
  Car, 
  Truck, 
  Building2, 
  HeartPulse, 
  ShieldCheck, 
  ShieldAlert, 
  TrendingUp, 
  Coins, 
  PiggyBank, 
  Briefcase, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  Phone,
  MessageSquare,
  Clock,
  Sparkles,
  HelpCircle,
  Mail
} from 'lucide-react';

const iconMap = {
  Home,
  UserCheck,
  Car,
  Truck,
  Building2,
  HeartPulse,
  ShieldCheck,
  ShieldAlert,
  TrendingUp,
  Coins,
  PiggyBank,
  Briefcase
};

export default function ServiceDetails() {
  const { id } = useParams();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const IconComponent = iconMap[service.icon] || ShieldCheck;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Hero Banner */}
      <section className="bg-gradient-to-b from-[#0A192F] via-[#0F2744] to-[#1E3A8A] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link to="/services" className="hover:text-white transition-colors">Services</Link>
                <span>/</span>
                <span className="text-amber-400 font-semibold">{service.name}</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-300">
                <IconComponent className="w-4 h-4" />
                <span>{service.category} • {service.badge || "Financial Solution"}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {service.name}
              </h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
                {service.tagline || service.shortDescription}
              </p>

              {/* Fast Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/70">
                  <span className="text-[11px] text-slate-400 block">Terms / Rates</span>
                  <span className="font-bold text-amber-400 text-sm">{service.interestRateRange}</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/70">
                  <span className="text-[11px] text-slate-400 block">Tenure / Coverage</span>
                  <span className="font-bold text-white text-sm">{service.tenureRange}</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/70 col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-slate-400 block">Processing Speed</span>
                  <span className="font-bold text-emerald-400 text-sm">{service.processingTime}</span>
                </div>
              </div>

            </div>

            {/* Quick Apply Card in Hero */}
            <div className="w-full lg:w-80 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-white space-y-4 shadow-xl">
              <h2 className="font-bold text-lg text-white">Apply for {service.name}</h2>
              <p className="text-xs text-slate-300">
                Connect directly with our Sangamner office team to discuss your application.
              </p>

              <Link
                to={`/apply?service=${service.id}`}
                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Apply Online Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:9112927218"
                  className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-600 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call 9112927218</span>
                </a>

                <a
                  href="https://wa.me/919112927218"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs border border-emerald-600 transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Main Details & Requirements */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Overview & Key Benefits */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-2xl font-bold text-[#0A192F]">
                  Service Overview
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  {service.overview}
                </p>

                <h3 className="text-lg font-bold text-slate-900 pt-4">
                  Key Advantages & Features
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {service.keyBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: Documents & Eligibility */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Eligibility Box */}
              <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#0A192F] flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-blue-700" />
                  <span>Eligibility Guidelines</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {service.eligibilityCriteria.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents Box */}
              <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#0A192F] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-600" />
                  <span>Required Documents</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {service.documentsRequired.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact office card */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Direct Office Assistance
                </div>
                <div className="text-xs text-slate-300">
                  Akole By-Pass Road, Sangamner, District Ahilyanagar - 422 605
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2 pt-1">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>nidhifinance@outlook.com</span>
                </div>
              </div>

            </div>

          </div>

          {/* Calculator widget for loan products */}
          {service.categorySlug === 'loans' && (
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0A192F]">
                  Estimate EMIs for {service.name}
                </h2>
                <p className="text-slate-600 text-sm">
                  Simulate different loan amounts and tenures to fit your comfortable monthly budget.
                </p>
              </div>

              <LoanCalculatorWidget 
                initialAmount={
                  service.id === 'personal-loans' ? 300000 :
                  service.id === 'business-loans' ? 1000000 :
                  service.id === 'home-loans' ? 3000000 : 500000
                }
                initialRate={
                  service.id === 'personal-loans' ? 10.5 :
                  service.id === 'business-loans' ? 12.0 :
                  service.id === 'home-loans' ? 8.5 : 9.0
                }
                initialTenure={service.id === 'home-loans' ? 20 : 3}
              />
            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <CTA 
        title={`Ready to Apply for ${service.name}?`}
        subtitle="Submit your inquiry online or call our Sangamner office for direct consultation."
      />
    </div>
  );
}
