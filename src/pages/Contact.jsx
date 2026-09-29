import { useState } from 'react';
import { saveEnquiry } from '../utils/storage';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle,
  Building2
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    serviceRequired: 'Home Loans',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    
    const cleanMobile = formData.mobile.replace(/\D/g, '');
    if (!cleanMobile) {
      errs.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      errs.mobile = 'Enter a valid 10-digit mobile number';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Enter a valid email address';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide a brief message';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      saveEnquiry(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <span>Secure Today, Success Tomorrow</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#14532d] tracking-tight">
            Contact Nidhi Finance
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Visit our Sangamner office or connect directly with our advisory desk for Loans, Insurance, and Investments.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info & Office Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Connect Box */}
            <div className="bg-gradient-to-br from-[#0A192F] via-[#0F2744] to-[#14532d] text-white p-7 sm:p-8 rounded-3xl shadow-xl space-y-6">
              <div className="border-b border-slate-700/80 pb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Head Office • Sangamner</span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Nidhi Finance
                </h3>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-400/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-300">Office Address:</div>
                  <p className="text-sm font-bold text-white mt-0.5 leading-snug">
                    Akole By-Pass Road, Sangamner, District Ahilyanagar - 422 605
                  </p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/30">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-300">Helpline Phone Number:</div>
                    <div className="flex flex-wrap gap-3 mt-1 font-black text-lg text-amber-300">
                      <a href="tel:9112927218" className="hover:text-white transition-colors">
                        9112927218
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href="tel:9112927218"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call 9112927218</span>
                  </a>

                  <a
                    href="https://wa.me/919112927218?text=Hello%20Nidhi%20Finance,%20I%20would%20like%20to%20enquire%20about%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Chat</span>
                  </a>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-700/80">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-400/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-300">Email Address:</div>
                  <a href="mailto:nidhifinance@outlook.com" className="text-sm font-bold text-white hover:text-amber-300 transition-colors mt-0.5 block">
                    nidhifinance@outlook.com
                  </a>
                </div>
              </div>

              {/* Consultation Hours */}
              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-700/80">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 border border-teal-400/30">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-300">Office Working Hours:</div>
                  <div className="text-xs sm:text-sm font-medium text-slate-200 mt-0.5">
                    Monday – Saturday: 9:30 AM – 7:00 PM
                  </div>
                </div>
              </div>

            </div>

            {/* Map Preview Box */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>Sangamner Office Location</span>
                </div>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  Ahilyanagar - 422 605
                </span>
              </div>

              <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-slate-100 to-emerald-50 border border-slate-200 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden group">
                <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform mb-2">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-900">
                  Nidhi Finance Office
                </div>
                <div className="text-[11px] text-slate-600 font-medium max-w-xs mt-0.5">
                  Akole By-Pass Road, Sangamner, Dist. Ahilyanagar - 422 605
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact & Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl">
              
              <div className="mb-6 space-y-1">
                <h3 className="text-2xl font-black text-[#0A192F]">
                  Send an Enquiry
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm">
                  Select your required service (Loans, Insurance, or Investment) and our team will get in touch with you.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-10 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Enquiry Received!
                  </h4>
                  <p className="text-slate-600 text-sm max-w-sm mx-auto">
                    Thank you for contacting Nidhi Finance. Our team will contact you shortly on your provided mobile number.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', mobile: '', email: '', serviceRequired: 'Home Loans', message: '' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  
                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xs sm:text-sm font-bold text-slate-800">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="e.g. Rahul Patil"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                        errors.name ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-600'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-600 text-xs flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Mobile */}
                    <div className="space-y-1">
                      <label htmlFor="mobile" className="text-xs sm:text-sm font-bold text-slate-800">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        maxLength={10}
                        placeholder="10-digit number"
                        value={formData.mobile}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                          errors.mobile ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-600'
                        }`}
                      />
                      {errors.mobile && (
                        <p className="text-red-600 text-xs flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.mobile}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
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
                  </div>

                  {/* Service Required Grouped Dropdown */}
                  <div className="space-y-1">
                    <label htmlFor="serviceRequired" className="text-xs sm:text-sm font-bold text-slate-800">
                      Service Required *
                    </label>
                    <select
                      id="serviceRequired"
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      <optgroup label="── 1. INSURANCE (PROTECTION) ──">
                        <option value="Mediclaim">Mediclaim (Health Insurance)</option>
                        <option value="Term Insurance Plans">Term Insurance Plans</option>
                        <option value="Bike & Car Insurance">Bike & Car Insurance</option>
                        <option value="Commercial Vehicle Insurance">Commercial Vehicle Insurance</option>
                      </optgroup>
                      <optgroup label="── 2. LOANS ──">
                        <option value="Home Loans">Home Loans</option>
                        <option value="Personal Loans">Personal Loans</option>
                        <option value="Car Loans">Car Loans</option>
                        <option value="Old Vehicles Loans">Old Vehicles Loans</option>
                        <option value="Business Loans">Business Loans</option>
                      </optgroup>
                      <optgroup label="── 3. INVESTMENT ──">
                        <option value="Mutual Fund">Mutual Fund</option>
                        <option value="SIP Plans">SIP Plans</option>
                        <option value="Fix Deposit">Fix Deposit</option>
                        <option value="Retirement Plan">Retirement Plan</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label htmlFor="message" className="text-xs sm:text-sm font-bold text-slate-800">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Please share details about your loan amount, insurance requirement, or investment plan..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 resize-none ${
                        errors.message ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-600'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-600 text-xs flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Enquiry...</span>
                    ) : (
                      <>
                        <span>Submit Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
