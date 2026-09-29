import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import WhyChooseUs from '../components/WhyChooseUs';
import HowItWorks from '../components/HowItWorks';
import LoanCalculatorWidget from '../components/LoanCalculatorWidget';
import FAQAccordion from '../components/FAQAccordion';
import TestimonialCard from '../components/TestimonialCard';
import CTA from '../components/CTA';
import { services } from '../data/services';
import { testimonials } from '../data/testimonials';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp
} from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Services Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Financial Products Suite</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
                Our Financial Services
              </h2>
              <p className="text-slate-600 text-base">
                Discover tailored financing and advisory options crafted to support individual dreams and enterprise growth with competitive terms.
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100/80 transition-colors text-sm shrink-0 self-start md:self-end"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

        </div>
      </section>

      {/* 3. Why Choose Nidhi Finance */}
      <WhyChooseUs />

      {/* 4. How It Works (5-Step Timeline) */}
      <HowItWorks />

      {/* 5. Interactive Loan Calculator Section */}
      <section className="py-20 bg-slate-100/70 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Transparent Calculations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
              Calculate Your Monthly EMI
            </h2>
            <p className="text-slate-600 text-base">
              Plan your finances with clarity. Use our real-time calculator to evaluate installments, interest outgo, and total payable amounts before submitting an inquiry.
            </p>
          </div>

          {/* Calculator Widget */}
          <LoanCalculatorWidget />

        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
              <span>Client Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-slate-600 text-base">
              Honest feedback from individuals and business owners who have partnered with Nidhi Finance for their financial planning and loan requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>

        </div>
      </section>

      {/* 7. Quick FAQ Accordion */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-base">
              Quick answers to common questions regarding loans, documentation, and the application process.
            </p>
          </div>

          <FAQAccordion limit={4} />

          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 font-semibold text-sm text-blue-700 hover:text-blue-800"
            >
              <span>View all questions and answers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 9. Final CTA */}
      <CTA />
    </div>
  );
}
