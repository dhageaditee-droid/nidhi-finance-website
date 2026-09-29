import { useState } from 'react';
import { faqs } from '../data/faq';
import CTA from '../components/CTA';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  Phone, 
  MessageSquare,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(0);

  const categories = ['All', 'General', 'Application', 'Documentation', 'Process', 'Calculator', 'Compliance'];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0A192F] via-[#0F2744] to-[#1E3A8A] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-amber-300">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help & FAQ Center</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Find immediate answers to questions about loan products, interest rates, document requirements, and consultation.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-4 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 mt-2" />
            <input
              type="text"
              placeholder="Search by keywords (e.g. EMI, documents, timeline)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
            />
          </div>
        </div>
      </section>

      {/* Main FAQ Body */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-700 text-white shadow-xs font-bold'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
              <HelpCircle className="w-10 h-10 mx-auto text-slate-400 mb-3" />
              <p className="font-semibold text-slate-700">No questions found matching your search.</p>
              <p className="text-xs text-slate-400 mt-1">Try searching with a different term or browse categories.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-white border-blue-400 shadow-md ring-1 ring-blue-400/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 shrink-0">
                          {faq.category}
                        </span>
                        <span className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                          {faq.question}
                        </span>
                      </div>
                      <div className={`p-1.5 rounded-full transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-400'
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
            </div>
          )}

          {/* Quick Direct Help Box */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-[#0A192F]">
                Still have an unresolved query?
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Our support team is available by phone and WhatsApp to answer your specific loan questions.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="tel:9112927218"
                className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 9112927218</span>
              </a>

              <a
                href="https://wa.me/919112927218"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <CTA />
    </div>
  );
}
