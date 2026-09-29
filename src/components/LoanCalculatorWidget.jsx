import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { calculateEMI, formatCurrency } from '../utils/calculator';
import EMIChart from './EMIChart';
import { 
  Calculator, 
  ArrowRight, 
  HelpCircle, 
  Sparkles,
  RotateCcw
} from 'lucide-react';

export default function LoanCalculatorWidget({ initialAmount = 500000, initialRate = 10.5, initialTenure = 3, defaultTenureUnit = 'years' }) {
  const [amount, setAmount] = useState(initialAmount);
  const [rate, setRate] = useState(initialRate);
  const [tenureUnit, setTenureUnit] = useState(defaultTenureUnit); // 'years' | 'months'
  const [tenureValue, setTenureValue] = useState(initialTenure);

  // Convert tenure to total months for calculation
  const totalMonths = useMemo(() => {
    return tenureUnit === 'years' ? tenureValue * 12 : tenureValue;
  }, [tenureUnit, tenureValue]);

  // Dynamic calculations
  const { monthlyEmi, totalInterest, totalAmount, principalRatio, interestRatio } = useMemo(() => {
    return calculateEMI(amount, rate, totalMonths);
  }, [amount, rate, totalMonths]);

  const handleReset = () => {
    setAmount(500000);
    setRate(10.5);
    setTenureUnit('years');
    setTenureValue(3);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Widget Header */}
      <div className="bg-gradient-to-r from-[#0A192F] to-[#1E3A8A] text-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2 border border-blue-400/20">
            <Calculator className="w-3.5 h-3.5" />
            <span>Financial Planning Tool</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Loan EMI Calculator
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Adjust the sliders below to calculate your estimated monthly installments.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-600 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Calculator Body */}
      <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Sliders and Input Controls */}
        <div className="lg:col-span-7 space-y-7">
          
          {/* 1. Loan Amount */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="loan-amount-input" className="text-sm font-bold text-slate-800">
                Loan Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input
                  id="loan-amount-input"
                  type="number"
                  min="25000"
                  max="10000000"
                  step="10000"
                  value={amount}
                  onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                  className="w-36 pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 text-right font-bold text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm"
                />
              </div>
            </div>
            <input
              type="range"
              aria-label="Loan Amount Slider"
              min="25000"
              max="10000000"
              step="25000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>₹25,000</span>
              <span>₹50 Lakh</span>
              <span>₹1 Crore</span>
            </div>
          </div>

          {/* 2. Interest Rate */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="interest-rate-input" className="text-sm font-bold text-slate-800">
                Interest Rate (% p.a.)
              </label>
              <div className="relative">
                <input
                  id="interest-rate-input"
                  type="number"
                  min="5"
                  max="30"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
                  className="w-24 pl-3 pr-7 py-1.5 rounded-lg border border-slate-300 text-right font-bold text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
              </div>
            </div>
            <input
              type="range"
              aria-label="Interest Rate Slider"
              min="5"
              max="25"
              step="0.25"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>5%</span>
              <span>15%</span>
              <span>25%</span>
            </div>
          </div>

          {/* 3. Loan Tenure */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label htmlFor="loan-tenure-input" className="text-sm font-bold text-slate-800">
                  Loan Tenure
                </label>
                {/* Years / Months toggle */}
                <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      if (tenureUnit !== 'years') {
                        setTenureUnit('years');
                        setTenureValue(Math.max(1, Math.round(tenureValue / 12)) || 1);
                      }
                    }}
                    className={`px-2.5 py-0.5 text-xs font-semibold rounded-md transition-all ${
                      tenureUnit === 'years'
                        ? 'bg-blue-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Years
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (tenureUnit !== 'months') {
                        setTenureUnit('months');
                        setTenureValue(tenureValue * 12);
                      }
                    }}
                    className={`px-2.5 py-0.5 text-xs font-semibold rounded-md transition-all ${
                      tenureUnit === 'months'
                        ? 'bg-blue-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Months
                  </button>
                </div>
              </div>

              <div className="relative">
                <input
                  id="loan-tenure-input"
                  type="number"
                  min="1"
                  max={tenureUnit === 'years' ? 30 : 360}
                  value={tenureValue}
                  onChange={(e) => setTenureValue(Math.max(1, Number(e.target.value)))}
                  className="w-24 pl-3 pr-10 py-1.5 rounded-lg border border-slate-300 text-right font-bold text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 font-semibold uppercase">
                  {tenureUnit === 'years' ? 'Yrs' : 'Mos'}
                </span>
              </div>
            </div>

            <input
              type="range"
              aria-label="Loan Tenure Slider"
              min={tenureUnit === 'years' ? 1 : 6}
              max={tenureUnit === 'years' ? 30 : 360}
              step={1}
              value={tenureValue}
              onChange={(e) => setTenureValue(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>{tenureUnit === 'years' ? '1 Year' : '6 Months'}</span>
              <span>{tenureUnit === 'years' ? '15 Years' : '180 Months'}</span>
              <span>{tenureUnit === 'years' ? '30 Years' : '360 Months'}</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="pt-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Popular Presets:
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => { setAmount(300000); setRate(11.0); setTenureUnit('years'); setTenureValue(3); }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors"
              >
                Personal: ₹3L @ 11% / 3Y
              </button>
              <button
                type="button"
                onClick={() => { setAmount(1500000); setRate(13.0); setTenureUnit('years'); setTenureValue(5); }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors"
              >
                Business: ₹15L @ 13% / 5Y
              </button>
              <button
                type="button"
                onClick={() => { setAmount(3500000); setRate(8.75); setTenureUnit('years'); setTenureValue(20); }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors"
              >
                Home: ₹35L @ 8.75% / 20Y
              </button>
            </div>
          </div>

        </div>

        {/* Dynamic EMI Output & Donut Chart Breakdown */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Monthly EMI Highlight Box */}
          <div className="bg-gradient-to-br from-[#0A192F] via-[#0F2744] to-[#1E3A8A] text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 -mr-6 -mt-6 w-24 h-24 bg-amber-400/10 rounded-full blur-xl pointer-events-none"></div>
            
            <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold block mb-1">
              Estimated Monthly Installment
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {formatCurrency(monthlyEmi)}
              <span className="text-xs font-normal text-slate-300 ml-1">/ month</span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-300">
              <span>Total Tenure:</span>
              <span className="font-semibold text-white">{totalMonths} Months ({tenureUnit === 'years' ? `${tenureValue} Years` : `${(tenureValue/12).toFixed(1)} Years`})</span>
            </div>
          </div>

          {/* SVG Donut Chart */}
          <EMIChart
            principal={amount}
            totalInterest={totalInterest}
            totalAmount={totalAmount}
            principalRatio={principalRatio}
            interestRatio={interestRatio}
          />

          {/* Apply Now CTA Button */}
          <Link
            to={`/apply?amount=${amount}&rate=${rate}&tenure=${totalMonths}`}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-800 hover:to-indigo-900 shadow-lg shadow-blue-900/20 hover:shadow-xl transition-all duration-200 text-sm group"
          >
            <span>Apply with these Parameters</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

        </div>

      </div>
    </div>
  );
}
