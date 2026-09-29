import { useState } from 'react';
import { Link } from 'react-router-dom';
import CTA from '../components/CTA';
import { 
  UserCheck, 
  FileText, 
  ShieldAlert, 
  CheckCircle, 
  Building, 
  User, 
  ArrowRight,
  Phone,
  HelpCircle
} from 'lucide-react';

export default function Eligibility() {
  const [activeTab, setActiveTab] = useState('salaried'); // 'salaried' | 'self-employed'

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#0A192F] via-[#0F2744] to-[#1E3A8A] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-amber-300">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Eligibility Guidelines</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Check Your Eligibility & Documents
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Understand standard eligibility guidelines and documentation requirements to ensure a swift, hassle-free loan application process.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Important Notice Pill */}
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Advisory Notice:</span> Eligibility may vary depending on the financial product and applicable verification requirements. Final approval is subject to complete documentation and lending partner guidelines.
            </div>
          </div>

          {/* Profile Selector Tabs: Salaried vs Self-Employed */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#0A192F]">
                  Profile-Based Eligibility & Checklist
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Select your employment category to view relevant parameters and documentation.
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 self-start">
                <button
                  type="button"
                  onClick={() => setActiveTab('salaried')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'salaried'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Salaried Individuals</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('self-employed')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'self-employed'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>Self-Employed / Business</span>
                </button>
              </div>
            </div>

            {/* Tab Contents */}
            {activeTab === 'salaried' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
                {/* Salaried Criteria */}
                <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
                  <h3 className="text-lg font-bold text-[#0A192F] flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-blue-700" />
                    <span>Basic Eligibility for Salaried</span>
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Age:</strong> 21 to 58 years at loan maturity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Employment:</strong> Minimum 6 months with current employer & 1 year overall</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Minimum Monthly Income:</strong> ₹15,000+ per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Credit Track:</strong> Healthy repayment record with no major active defaults</span>
                    </li>
                  </ul>
                </div>

                {/* Salaried Documents */}
                <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
                  <h3 className="text-lg font-bold text-[#0A192F] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-600" />
                    <span>Required Documents (Salaried)</span>
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                      <span><strong>Identity & Address Proof:</strong> PAN Card, Aadhaar Card, Passport or Voter ID</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                      <span><strong>Income Proof:</strong> Latest 3 months salary slips & latest Form 16</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                      <span><strong>Banking:</strong> Last 6 months bank statement of salary account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                      <span><strong>Photographs:</strong> 2 passport-size photographs</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
                {/* Self Employed Criteria */}
                <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
                  <h3 className="text-lg font-bold text-[#0A192F] flex items-center gap-2">
                    <Building className="w-5 h-5 text-emerald-700" />
                    <span>Basic Eligibility for Self-Employed</span>
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Age:</strong> 23 to 65 years at loan maturity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Business Vintage:</strong> Minimum 2 years in continuous business operations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Annual Turnover:</strong> Minimum ₹15,00,000+ audited gross turnover</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Compliance:</strong> Up-to-date ITR and GST filings</span>
                    </li>
                  </ul>
                </div>

                {/* Self Employed Documents */}
                <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
                  <h3 className="text-lg font-bold text-[#0A192F] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-600" />
                    <span>Required Documents (Business)</span>
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                      <span><strong>Business KYC:</strong> GST certificate, Shop Act / Udyam registration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                      <span><strong>Financials:</strong> Last 2 years ITR with Balance Sheet & Computation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                      <span><strong>Banking:</strong> Last 12 months current account bank statements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                      <span><strong>Promoter KYC:</strong> PAN and Aadhaar Card of Proprietor/Partners/Directors</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Quick Action Bar inside Box */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                Not sure if your documents are complete? Let our team inspect your file.
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/apply"
                  className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-sm transition-all"
                >
                  Apply with Available Documents
                </Link>
                <a
                  href="tel:9112927218"
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call 9112927218</span>
                </a>
              </div>
            </div>

          </div>

          {/* 4 Essential Factors That Affect Approval */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#0A192F] text-center">
              Key Factors That Influence Loan Evaluation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="text-blue-700 font-extrabold text-2xl">01</div>
                <h4 className="font-bold text-slate-900">Credit Profile</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Consistent on-time repayments and absence of write-offs significantly improve terms.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="text-amber-600 font-extrabold text-2xl">02</div>
                <h4 className="font-bold text-slate-900">Income Stability</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Regular salary credits or steady business cash inflows provide confidence to lenders.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="text-emerald-600 font-extrabold text-2xl">03</div>
                <h4 className="font-bold text-slate-900">Debt-to-Income</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A lower ratio of existing monthly EMIs relative to income allows higher borrowing limits.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="text-indigo-600 font-extrabold text-2xl">04</div>
                <h4 className="font-bold text-slate-900">Clear Documents</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Legible, unaltered KYC and verifiable income papers prevent processing delays.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <CTA />
    </div>
  );
}
