import { Phone, MessageSquare } from 'lucide-react';

export default function FloatingActions() {
  return (
    <aside aria-label="Quick Contact Actions" className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Quick Chat */}
      <a
        href="https://wa.me/919112927218?text=Hello%20Nidhi%20Finance,%20I%20would%20like%20to%20enquire%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Nidhi Finance"
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-emerald-500 text-white shadow-xl hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
        <span className="sr-only">Chat on WhatsApp</span>
        <span className="hidden md:group-hover:block absolute right-16 bg-slate-900 text-white text-xs font-medium py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap">
          WhatsApp: 9112927218
        </span>
      </a>

      {/* Call 9112927218 */}
      <a
        href="tel:9112927218"
        aria-label="Call Nidhi Finance Helpline"
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-emerald-700 text-white shadow-xl hover:bg-emerald-800 hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <Phone className="w-6 h-6" />
        <span className="sr-only">Call Helpline</span>
        <span className="hidden md:group-hover:block absolute right-16 bg-slate-900 text-white text-xs font-medium py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap">
          Call: 9112927218
        </span>
      </a>
    </aside>
  );
}
