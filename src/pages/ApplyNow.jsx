import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { saveApplication } from '../utils/storage';
import { 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Lock, 
  Phone, 
  Sparkles, 
  Building2, 
  AlertCircle,
  Clock,
  ArrowRight,
  MapPin,
  Mail
} from 'lucide-react';

export default function ApplyNow() {
  const [searchParams] = useSearchParams();

  const paramService = searchParams.get('service') || '';
  const paramAmount = searchParams.get('amount') || '';

  const mapServiceToType = (slug) => {
    switch (slug) {
      case 'home-loans': return 'Home Loans';
      case 'personal-loans': return 'Personal Loans';
      case 'car-loans': return 'Car Loans';
      case 'old-vehicles-loans': return 'Old Vehicles Loans';
      case 'business-loans': return 'Business Loans';
      case 'mediclaim': return 'Mediclaim';
      case 'term-insurance-plans': return 'Term Insurance Plans';
      case 'commercial-vehicle-insurance': return 'Commercial Vehicle Insurance';
      case 'bike-car-insurance': return 'Bike & Car Insurance';
      case 'mutual-fund': return 'Mutual Fund';
      case 'sip-plans': return 'SIP Plans';
      case 'fix-deposit': return 'Fix Deposit';
      case 'retirement-plan': return 'Retirement Plan';
      default: return 'Home Loans';
    }
  };

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    city: 'Sangamner',
    employmentType: 'Salaried',
    monthlyIncome: '',
    requiredAmount: paramAmount ? `₹${Number(paramAmount).toLocaleString('en-IN')}` : '',
    loanType: paramService ? mapServiceToType(paramService) : 'Home Loans',
    message: ''
  });

  const [consent, setConsent] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState('');

  const validateForm = () => {
    const errs = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required';
    }

    const cleanMobile = formData.mobile.replace(/\D/g, '');
    if (!cleanMobile) {
      errs.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      errs.mobile = 'Enter a valid 10-digit Indian mobile number';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.city.trim()) {
      errs.city = 'City is required';
    }

    if (!formData.monthlyIncome.trim()) {
      errs.monthlyIncome = 'Monthly income is required';
    }

    if (!formData.requiredAmount.trim()) {
      errs.requiredAmount = 'Required amount is required';
    }

    if (!formData.loanType) {
      errs.loanType = 'Please select a service type';
    }

    if (!consent) {
      errs.consent = 'You must agree to the advisory consent';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const savedList = saveApplication(formData);
      const generatedId = savedList && savedList.length > 0 ? savedList[0].id : `APP-${Date.now().toString().slice(-4)}`;
      setSubmittedAppId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <span>Secure Today, Success Tomorrow</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#14532d] tracking-tight">
            Apply for Financial Services
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Apply online for Loans, Insurance, or Investment solutions. Our Sangamner team will evaluate your profile and contact you.
          </p>
        </div>

        {/* Security & Privacy Advisory Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/90 text-emerald-900 text-xs sm:text-sm flex items-start gap-3">
          <Lock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold">Confidential & Direct Advisory:</span> Nidhi Finance does not collect sensitive credentials, OTPs, or passwords. Your details are processed directly by our authorized executives.
          </div>
        </div>

        {/* Main Application Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl relative">
          
          {isSubmitted ? (
            /* Success State */
            <div className="py-12 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Application Reference: {submittedAppId}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F]">
                  Application Submitted Successfully
                </h2>
                <p className="text-slate-600 text-base max-w-md mx-auto leading-relaxed">
                  Thank you for contacting Nidhi Finance. Our team from Sangamner office will get in touch with you shortly.
                </p>
              </div>

              {/* Summary Card */}
              <div className="max-w-md mx-auto bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left text-xs sm:text-sm space-y-2 text-slate-700">
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-bold text-slate-900">{formData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-emerald-700">{formData.loanType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">Amount / Cover:</span>
                  <span className="font-bold text-slate-900">{formData.requiredAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mobile:</span>
                  <span className="font-bold text-slate-900">{formData.mobile}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link
                  to="/"
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors"
                >
                  Return to Home
                </Link>

                <a
                  href="tel:9112927218"
                  className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 9112927218</span>
                </a>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="text-xs sm:text-sm font-bold text-slate-800">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Anand Deshmukh"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.fullName ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-600'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-xs flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label htmlFor="mobile" className="text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-between">
                    <span>Mobile Number *</span>
                    <span className="text-[11px] font-normal text-slate-400">10-Digit Mobile</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold">+91</span>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      maxLength={10}
                      placeholder="9112927218"
                      value={formData.mobile}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                        errors.mobile ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-600'
                      }`}
                    />
                  </div>
                  {errors.mobile && (
                    <p className="text-red-600 text-xs flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.mobile}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs sm:text-sm font-bold text-slate-800">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.email ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-600'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label htmlFor="city" className="text-xs sm:text-sm font-bold text-slate-800">
                    City / Taluka *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="e.g. Sangamner, Akole, Ahilyanagar"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.city ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-600'
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-600 text-xs flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.city}</span>
                    </p>
                  )}
                </div>

                {/* Employment Type */}
                <div className="space-y-1.5">
                  <label htmlFor="employmentType" className="text-xs sm:text-sm font-bold text-slate-800">
                    Occupation / Profile *
                  </label>
                  <select
                    id="employmentType"
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Salaried">Salaried Employee</option>
                    <option value="Self-Employed">Self-Employed Professional</option>
                    <option value="Business Owner">Business Owner / Trader / Farmer</option>
                    <option value="Other">Other / Retired</option>
                  </select>
                </div>

                {/* Monthly Income */}
                <div className="space-y-1.5">
                  <label htmlFor="monthlyIncome" className="text-xs sm:text-sm font-bold text-slate-800">
                    Monthly Income / Turnover *
                  </label>
                  <input
                    type="text"
                    id="monthlyIncome"
                    name="monthlyIncome"
                    placeholder="e.g. ₹40,000 or ₹1 Lakh"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.monthlyIncome ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-600'
                    }`}
                  />
                  {errors.monthlyIncome && (
                    <p className="text-red-600 text-xs flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.monthlyIncome}</span>
                    </p>
                  )}
                </div>

                {/* Service Type Dropdown with 13 official services */}
                <div className="space-y-1.5">
                  <label htmlFor="loanType" className="text-xs sm:text-sm font-bold text-slate-800">
                    Required Product / Service *
                  </label>
                  <select
                    id="loanType"
                    name="loanType"
                    value={formData.loanType}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 ${
                      errors.loanType ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-600'
                    }`}
                  >
                    <optgroup label="── LOANS ──">
                      <option value="Home Loans">Home Loans</option>
                      <option value="Personal Loans">Personal Loans</option>
                      <option value="Car Loans">Car Loans</option>
                      <option value="Old Vehicles Loans">Old Vehicles Loans</option>
                      <option value="Business Loans">Business Loans</option>
                    </optgroup>
                    <optgroup label="── INSURANCE ──">
                      <option value="Mediclaim">Mediclaim (Health Insurance)</option>
                      <option value="Term Insurance Plans">Term Insurance Plans</option>
                      <option value="Commercial Vehicle Insurance">Commercial Vehicle Insurance</option>
                      <option value="Bike & Car Insurance">Bike & Car Insurance</option>
                    </optgroup>
                    <optgroup label="── INVESTMENT ──">
                      <option value="Mutual Fund">Mutual Fund</option>
                      <option value="SIP Plans">SIP Plans</option>
                      <option value="Fix Deposit">Fix Deposit</option>
                      <option value="Retirement Plan">Retirement Plan</option>
                    </optgroup>
                  </select>
                </div>

                {/* Amount / Coverage */}
                <div className="space-y-1.5">
                  <label htmlFor="requiredAmount" className="text-xs sm:text-sm font-bold text-slate-800">
                    Required Amount / Target Investment *
                  </label>
                  <input
                    type="text"
                    id="requiredAmount"
                    name="requiredAmount"
                    placeholder="e.g. ₹5,00,000"
                    value={formData.requiredAmount}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.requiredAmount ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-600'
                    }`}
                  />
                  {errors.requiredAmount && (
                    <p className="text-red-600 text-xs flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.requiredAmount}</span>
                    </p>
                  )}
                </div>

              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-between">
                  <span>Additional Details / Notes</span>
                  <span className="text-[11px] font-normal text-slate-400">Optional</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Tell us about the purpose, vehicle model, property details, or investment horizon..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
                />
              </div>

              {/* Consent */}
              <div className="space-y-2 pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 mt-0.5 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I agree to be contacted by Nidhi Finance executives via Call or WhatsApp regarding this enquiry, and I acknowledge that approvals are subject to document verification and terms.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-red-600 text-xs flex items-center gap-1 pl-7">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.consent}</span>
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Sangamner Office: 9112927218</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 shadow-lg shadow-emerald-900/20 hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Processing Application...</span>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
