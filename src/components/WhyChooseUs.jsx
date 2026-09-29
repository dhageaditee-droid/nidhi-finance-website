import { 
  FileCheck2, 
  UserCog, 
  Briefcase, 
  Zap, 
  HeartHandshake, 
  Headphones,
  CheckCircle2
} from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      id: 1,
      title: "Transparent Process",
      description: "Clear terms, upfront communication, and zero hidden costs or surprise charges throughout your financial journey.",
      icon: FileCheck2,
      accent: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      id: 2,
      title: "Personalized Assistance",
      description: "Tailored guidance based on your monthly cash flow, existing obligations, and immediate financial goals.",
      icon: UserCog,
      accent: "text-amber-600 bg-amber-50 border-amber-100"
    },
    {
      id: 3,
      title: "Professional Support",
      description: "Seasoned financial advisors dedicated to answering your queries across Loans, Insurance, and Investments.",
      icon: Briefcase,
      accent: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      id: 4,
      title: "Simple Application Process",
      description: "Minimal paperwork with streamlined verification to avoid bureaucratic hurdles and lengthy delays.",
      icon: Zap,
      accent: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      id: 5,
      title: "Customer-Focused Service",
      description: "We prioritize your financial well-being, providing ethical advice that puts your long-term interests first.",
      icon: HeartHandshake,
      accent: "text-teal-600 bg-teal-50 border-teal-100"
    },
    {
      id: 6,
      title: "Dedicated Sangamner Office",
      description: "Direct helpline assistance at 9112927218 and in-person consultation at our Akole By-Pass Road office.",
      icon: Headphones,
      accent: "text-rose-600 bg-rose-50 border-rose-100"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Secure Today, Success Tomorrow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A192F] tracking-tight">
            Why Choose Nidhi Finance
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            We bridge the gap between complex borrowing & investment requirements and clear, customer-friendly financial solutions.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 relative"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feature.accent} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-700 transition-colors">
                    0{feature.id}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                  <span className="text-emerald-600">✔</span>
                  <span>{feature.title}</span>
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
