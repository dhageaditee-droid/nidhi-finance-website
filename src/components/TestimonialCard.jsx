import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ item }) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group">
      <div>
        {/* Top rating and quote icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {[...Array(item.rating || 5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <Quote className="w-6 h-6 text-slate-300 group-hover:text-blue-200 transition-colors" />
        </div>

        {/* Comment */}
        <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
          "{item.comment}"
        </p>
      </div>

      {/* Author Details & Sample Label */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-10 h-10 rounded-full object-cover border border-slate-200"
            loading="lazy"
          />
          <div>
            <div className="text-sm font-bold text-slate-900 leading-tight">
              {item.name}
            </div>
            <div className="text-xs text-slate-500">
              {item.designation}
            </div>
          </div>
        </div>

        {item.isSample && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
            Client Review
          </span>
        )}
      </div>
    </div>
  );
}
