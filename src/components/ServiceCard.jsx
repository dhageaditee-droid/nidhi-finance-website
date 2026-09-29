import { Link } from 'react-router-dom';
import { 
  Home, 
  UserCheck, 
  Car, 
  Truck, 
  Building2, 
  HeartPulse, 
  ShieldCheck, 
  ShieldAlert, 
  TrendingUp, 
  Coins, 
  PiggyBank, 
  Briefcase, 
  Check, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

const iconMap = {
  Home,
  UserCheck,
  Car,
  Truck,
  Building2,
  HeartPulse,
  ShieldCheck,
  ShieldAlert,
  TrendingUp,
  Coins,
  PiggyBank,
  Briefcase
};

export default function ServiceCard({ service }) {
  const IconComponent = iconMap[service.icon] || ShieldCheck;

  // Category based color badge
  const getCategoryTheme = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'loans':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          accent: 'from-blue-700 to-indigo-600',
          iconBg: 'bg-blue-50 text-blue-700 group-hover:bg-blue-700 group-hover:text-white'
        };
      case 'insurance':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          accent: 'from-emerald-700 to-teal-600',
          iconBg: 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white'
        };
      case 'investment':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          accent: 'from-amber-600 to-orange-600',
          iconBg: 'bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white'
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          accent: 'from-blue-700 to-indigo-600',
          iconBg: 'bg-blue-50 text-blue-700 group-hover:bg-blue-700 group-hover:text-white'
        };
    }
  };

  const theme = getCategoryTheme(service.category);

  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
      {/* Top Accent Strip */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${theme.accent} opacity-90 group-hover:opacity-100 transition-opacity`}></div>

      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        {/* Header with Icon and Category Tag */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl border border-slate-100 flex items-center justify-center transition-colors duration-300 ${theme.iconBg}`}>
            <IconComponent className="w-6 h-6" />
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${theme.bg}`}>
              {service.category}
            </span>
            {service.badge && (
              <span className="text-[10px] font-semibold text-slate-500">
                {service.badge}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
          {service.name}
        </h3>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
          {service.shortDescription}
        </p>

        {/* Key Rate / Feature Snapshot */}
        <div className="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Terms / Rate</span>
            <span className="font-bold text-slate-800 text-xs">{service.interestRateRange}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Processing</span>
            <span className="font-bold text-emerald-700 text-xs">{service.processingTime}</span>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="space-y-1.5 mb-5 flex-1">
          {service.keyBenefits.slice(0, 3).map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons: Learn More & Enquire Now */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
          <Link
            to={`/services/${service.id}`}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <span>Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to={`/apply?service=${service.id}`}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-xs"
          >
            <span>Enquire</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
