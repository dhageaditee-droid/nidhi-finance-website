import { Link } from 'react-router-dom';
import { Phone, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CTA({ title, subtitle, showBadges = true }) {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0A192F] via-[#0F2744] to-[#14532d] text-white relative overflow-hidden">
      {/* Background Subtle Highlights */}
      <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        
        {showBadges && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Secure Today, Success Tomorrow</span>
          </div>
        )}

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          {title || "Take the Next Step Towards Your Financial Goals"}
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle || "Connect with our Sangamner advisory desk for transparent terms, custom planning, and prompt service."}
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-xl shadow-emerald-950/40 hover:scale-105 transition-all duration-200 text-base"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="tel:9112927218"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition-all text-base"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Call: 9112927218</span>
          </a>

          <a
            href="https://wa.me/919112927218?text=Hello%20Nidhi%20Finance,%20I%20would%20like%20to%20enquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-800/80 border border-emerald-700/50 transition-all text-base"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        <div className="text-xs text-slate-400 pt-3">
          Akole By-Pass Road, Sangamner, District Ahilyanagar - 422 605
        </div>

      </div>
    </section>
  );
}
