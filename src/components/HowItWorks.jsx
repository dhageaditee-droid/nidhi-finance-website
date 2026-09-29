import { Link } from 'react-router-dom';
import { 
  Send, 
  PhoneCall, 
  FileCheck, 
  Cpu, 
  Banknote,
  ArrowRight
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Submit Enquiry",
      description: "Fill out the quick online application form or call us at 9112927218 with your required details.",
      icon: Send,
      badge: "Step 1"
    },
    {
      number: "02",
      title: "Get Consultation",
      description: "Our financial consultant connects with you to assess suitable loan, insurance, or investment options.",
      icon: PhoneCall,
      badge: "Step 2"
    },
    {
      number: "03",
      title: "Document Verification",
      description: "Submit basic KYC, income records, or vehicle details for fast verification.",
      icon: FileCheck,
      badge: "Step 3"
    },
    {
      number: "04",
      title: "Application Processing",
      description: "Your file is evaluated swiftly with competitive interest rates and optimal structuring.",
      icon: Cpu,
      badge: "Step 4"
    },
    {
      number: "05",
      title: "Financial Assistance",
      description: "Upon formal sanction and verification, disbursement or policy issuance is coordinated smoothly.",
      icon: Banknote,
      badge: "Step 5"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <span>Seamless 5-Step Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
            How It Works
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            From initial consultation to final disbursement, our streamlined workflow is built around speed, transparency, and minimal hassle.
          </p>
        </div>

        {/* Desktop Horizontal Timeline & Mobile Vertical Timeline */}
        <div className="relative">
          
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-blue-200 via-indigo-200 to-emerald-200 -translate-y-12 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 relative z-10">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-slate-50/90 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-center group hover:-translate-y-1.5"
                >
                  <div>
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-[#14532d] to-[#166534] text-white flex items-center justify-center font-extrabold text-lg shadow-md group-hover:scale-110 transition-all duration-300 mb-4 border-2 border-white">
                      <span className="text-amber-300">{step.number}</span>
                    </div>

                    <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full mb-3 border border-emerald-100">
                      <IconComponent className="w-3.5 h-3.5" />
                      <span>{step.badge}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-center text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                    <span>Explore Step</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Fast Track CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0A192F] via-[#0F2744] to-[#14532d] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold text-white">
              Ready to start step 01 today?
            </h4>
            <p className="text-slate-300 text-sm">
              It takes less than 2 minutes to submit your inquiry with zero commitment.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/apply"
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all hover:scale-105"
            >
              Start Application
            </Link>
            <a
              href="tel:9112927218"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-600 transition-colors"
            >
              Call 9112927218
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
