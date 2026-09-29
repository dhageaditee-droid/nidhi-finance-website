import { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import CTA from '../components/CTA';
import { services } from '../data/services';
import { 
  Briefcase, 
  ShieldCheck, 
  Search, 
  CheckCircle2,
  Sparkles,
  Phone,
  MessageSquare,
  Landmark,
  Shield,
  TrendingUp
} from 'lucide-react';

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(s => s.categorySlug === selectedCategory);

  const loanCount = services.filter(s => s.categorySlug === 'loans').length;
  const insuranceCount = services.filter(s => s.categorySlug === 'insurance').length;
  const investmentCount = services.filter(s => s.categorySlug === 'investment').length;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0A192F] via-[#0F2744] to-[#1E3A8A] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-amber-300">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Nidhi Finance Official Products</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Financial Services & Solutions
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From Home & Business Loans to comprehensive Insurance and smart Wealth Investments — tailored solutions for every milestone.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-6 flex flex-wrap justify-center gap-2.5">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-lg scale-105'
                  : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              All Services ({services.length})
            </button>
            <button
              onClick={() => setSelectedCategory('loans')}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === 'loans'
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>Loans ({loanCount})</span>
            </button>
            <button
              onClick={() => setSelectedCategory('insurance')}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === 'insurance'
                  ? 'bg-emerald-600 text-white shadow-lg scale-105'
                  : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Insurance ({insuranceCount})</span>
            </button>
            <button
              onClick={() => setSelectedCategory('investment')}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === 'investment'
                  ? 'bg-amber-500 text-slate-950 shadow-lg scale-105'
                  : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Investment ({investmentCount})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Transparent Advisory Box */}
          <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0A192F]">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Need expert guidance on selecting loans or investments?</span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm">
                Visit our Sangamner office at Akole By-Pass Road or call our helpline for immediate advisory.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="tel:9112927218"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call 9112927218</span>
              </a>

              <a
                href="https://wa.me/919112927218"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <CTA />
    </div>
  );
}
