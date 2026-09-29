import { Link } from 'react-router-dom';
import CTA from '../components/CTA';
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  HeartHandshake, 
  CheckCircle2, 
  Award,
  Users,
  Building,
  Phone,
  ArrowRight
} from 'lucide-react';

export default function About() {
  const values = [
    {
      title: "Transparency",
      desc: "Open communication regarding loan terms, applicable charges, and interest calculations without hidden clauses.",
      icon: ShieldCheck,
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      title: "Customer Focus",
      desc: "We prioritize your long-term financial health, tailoring our assistance to your specific cash flow and repayment capacity.",
      icon: HeartHandshake,
      color: "text-amber-600 bg-amber-50 border-amber-200"
    },
    {
      title: "Trust",
      desc: "Earning and maintaining customer trust through ethical advice, transparent guidance, and disciplined confidentiality.",
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    {
      title: "Professional Service",
      desc: "Punctual, organized, and knowledgeable advisory throughout application submission, documentation, and sanctioning.",
      icon: Award,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200"
    },
    {
      title: "Responsibility",
      desc: "Encouraging sustainable borrowing practices, preventing over-leveraging, and promoting disciplined debt management.",
      icon: Users,
      color: "text-teal-600 bg-teal-50 border-teal-200"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0A192F] via-[#0F2744] to-[#1E3A8A] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <span>Our Foundation & Ethos</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About Nidhi Finance
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Nidhi Finance is focused on providing accessible and customer-oriented financial solutions. Our approach is built around transparency, personalized assistance and helping customers understand their available financial options.
          </p>
        </div>
      </section>

      {/* Main Story & Purpose */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <span>Who We Are</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
                Empowering Aspirations Through Clear Financial Guidance
              </h2>

              <p className="text-slate-600 text-base leading-relaxed">
                Navigating the modern financial landscape can often feel overwhelming, with intricate terms, fluctuating interest rates, and complex eligibility criteria. At Nidhi Finance, our mission is to demystify financial products and provide clear, empathetic advisory.
              </p>

              <p className="text-slate-600 text-base leading-relaxed">
                Whether you are an individual seeking emergency funds, a family planning your dream home, or an entrepreneur expanding operations, we act as your trusted financial partner to identify suitable solutions tailored to your unique profile.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/apply"
                  className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <span>Apply for Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="tel:9112927218"
                  className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Call 9112927218</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80"
                  alt="Nidhi Finance Professional Financial Advisory"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <div className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                      Client First Philosophy
                    </div>
                    <div className="text-lg font-bold">
                      Personalized consultation for individuals and growing businesses.
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-3xl p-8 sm:p-10 border border-blue-100 shadow-sm relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-blue-700 text-white flex items-center justify-center mb-6 shadow-md">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0A192F] mb-4">
                Our Mission
              </h3>
              <p className="text-slate-700 text-base leading-relaxed">
                To deliver transparent, accessible, and customer-centric financial assistance that enables individuals and business owners to make informed borrowing decisions, achieve their ambitions, and secure a sustainable financial future.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-gradient-to-br from-amber-50/60 to-orange-50/40 rounded-3xl p-8 sm:p-10 border border-amber-100 shadow-sm relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center mb-6 shadow-md">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0A192F] mb-4">
                Our Vision
              </h3>
              <p className="text-slate-700 text-base leading-relaxed">
                To be recognized as a premier, highly trusted financial advisory company known for integrity, responsive customer support, and fostering long-term relationships built on genuine customer value and mutual respect.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-semibold uppercase tracking-wider">
              <span>Guiding Principles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
              Our Core Values
            </h2>
            <p className="text-slate-600 text-base">
              The fundamental pillars that define every client interaction and service recommendation at Nidhi Finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-7 border border-slate-200/80 hover:border-blue-400 shadow-xs hover:shadow-lg transition-all duration-200 group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${val.color} mb-5 group-hover:scale-105 transition-transform`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {val.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Final CTA */}
      <CTA 
        title="Experience Clear and Professional Financial Advisory"
        subtitle="Speak with our dedicated team today to discuss your loan requirements or financial goals."
      />
    </div>
  );
}
