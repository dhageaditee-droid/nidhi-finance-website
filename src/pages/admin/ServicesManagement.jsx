import { services } from '../../data/services';
import { Briefcase, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Services & Financial Products
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Active loan products, interest rate ranges, and maximum tenure configurations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/40">
                {s.badge || 'Active'}
              </span>
              <Link to={`/services/${s.id}`} target="_blank" className="text-slate-400 hover:text-white">
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">{s.name}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{s.shortDescription}</p>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/80 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Interest Range:</span>
                <span className="font-bold text-amber-300">{s.interestRateRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tenure Limit:</span>
                <span className="font-medium text-slate-300">{s.tenureRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Max Amount:</span>
                <span className="font-medium text-slate-300">{s.maxAmount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
