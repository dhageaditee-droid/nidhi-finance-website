import { useState } from 'react';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { faqs } from '../data/faq';

export default function FAQAccordion({ limit, showContactNotice = true }) {
  const [openIndex, setOpenIndex] = useState(0);

  const displayFaqs = limit ? faqs.slice(0, limit) : faqs;

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="space-y-4">
      {displayFaqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={faq.id}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                : 'bg-white border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleAccordion(idx)}
              className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                  isOpen ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  Q{faq.id}
                </div>
                <span className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                  {faq.question}
                </span>
              </div>
              <div className={`p-1.5 rounded-full transition-transform duration-300 ${
                isOpen ? 'rotate-180 bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-400'
              }`}>
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-6 sm:px-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}

      {showContactNotice && (
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700 mt-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Have a question not listed here? Our advisory team is happy to help.</span>
          </div>
          <a
            href="tel:9112927218"
            className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Call 9112927218</span>
          </a>
        </div>
      )}
    </div>
  );
}
