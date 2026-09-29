import LoanCalculatorWidget from '../components/LoanCalculatorWidget';
import CTA from '../components/CTA';
import { 
  Calculator, 
  HelpCircle, 
  CheckCircle2, 
  Info, 
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export default function LoanCalculator() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0A192F] via-[#0F2744] to-[#1E3A8A] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-amber-300">
            <Calculator className="w-3.5 h-3.5" />
            <span>Financial Planning Suite</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Interactive Loan EMI Calculator
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Calculate your equated monthly installments (EMI), assess overall interest payable, and find the optimal loan tenure tailored to your monthly budget.
          </p>
        </div>
      </section>

      {/* Main Calculator Body */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <LoanCalculatorWidget />

          {/* Educational Formula & Guide Box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  fx
                </div>
                <h3 className="text-xl font-bold text-[#0A192F]">
                  Understanding the Mathematical Formula
                </h3>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                The standard mathematical formula used across all certified banking institutions to calculate Equated Monthly Installments is:
              </p>

              <div className="p-4 rounded-xl bg-slate-100 font-mono text-sm text-slate-800 font-semibold text-center border border-slate-200">
                EMI = [P × R × (1+R)ⁿ] ÷ [(1+R)ⁿ - 1]
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex gap-2">
                  <span className="font-bold text-slate-800 w-6">P:</span>
                  <span>Principal loan amount applied for</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-slate-800 w-6">R:</span>
                  <span>Monthly rate of interest (Annual Rate ÷ 12 ÷ 100)</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-slate-800 w-6">n:</span>
                  <span>Total duration of loan in months (Tenure in Years × 12)</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0A192F]">
                  Tips for Managing Your Monthly Outgo
                </h3>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Maintain a healthy FOIR:</strong> Total EMI commitments should ideally remain under 40% to 50% of your take-home monthly salary.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Part Pre-payments:</strong> Making periodic lump-sum prepayments towards principal reduces both interest burden and effective loan tenure.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Compare Tenures:</strong> Longer tenures offer lower monthly EMIs but incur higher total interest over time.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Compliance Disclaimer */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Important Note on Estimates:</span> The calculations generated by this EMI calculator are for simulation and illustrative purposes only. Final loan sanctions, interest rate slabs, processing charges, and repayment schedules depend upon complete documentation, income verification, and credit appraisal.
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <CTA />
    </div>
  );
}
