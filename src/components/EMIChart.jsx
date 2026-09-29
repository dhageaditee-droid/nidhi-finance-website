import { formatCurrency } from '../utils/calculator';

export default function EMIChart({ principal, totalInterest, totalAmount, principalRatio, interestRatio }) {
  // SVG Donut Chart parameters
  const size = 200;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const principalOffset = 0;
  const principalStroke = (principalRatio / 100) * circumference;
  const interestStroke = (interestRatio / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80">
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Principal segment (Blue) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1D4ED8"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${principalStroke} ${circumference}`}
            strokeDashoffset={principalOffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />

          {/* Interest segment (Amber) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F59E0B"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${interestStroke} ${circumference}`}
            strokeDashoffset={-principalStroke}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center Text inside Donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
            Total Payable
          </span>
          <span className="text-sm sm:text-base font-extrabold text-[#0A192F]">
            {formatCurrency(totalAmount)}
          </span>
        </div>
      </div>

      {/* Legend & Breakdown */}
      <div className="w-full mt-6 space-y-3 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-700 shrink-0"></span>
            <span className="text-slate-600 font-medium">Principal Amount</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-slate-900">{formatCurrency(principal)}</span>
            <span className="text-slate-400 text-xs ml-1.5">({principalRatio}%)</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0"></span>
            <span className="text-slate-600 font-medium">Total Interest</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-amber-600">{formatCurrency(totalInterest)}</span>
            <span className="text-slate-400 text-xs ml-1.5">({interestRatio}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
