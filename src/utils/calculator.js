/**
 * Calculates Equated Monthly Installment (EMI)
 * Formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
 * 
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate in percentage (e.g. 10.5)
 * @param {number} tenureMonths - Loan tenure in months
 * @returns {object} { monthlyEmi, totalInterest, totalAmount, monthlyRate }
 */
export function calculateEMI(principal, annualRate, tenureMonths) {
  const P = Number(principal);
  const rAnnual = Number(annualRate);
  const n = Number(tenureMonths);

  if (!P || P <= 0 || !n || n <= 0) {
    return {
      monthlyEmi: 0,
      totalInterest: 0,
      totalAmount: 0,
      principalRatio: 100,
      interestRatio: 0
    };
  }

  if (!rAnnual || rAnnual <= 0) {
    const monthlyEmi = Math.round(P / n);
    return {
      monthlyEmi,
      totalInterest: 0,
      totalAmount: P,
      principalRatio: 100,
      interestRatio: 0
    };
  }

  const r = rAnnual / 12 / 100;
  const emiNumerator = P * r * Math.pow(1 + r, n);
  const emiDenominator = Math.pow(1 + r, n) - 1;
  const monthlyEmi = Math.round(emiNumerator / emiDenominator);

  const totalAmount = Math.round(monthlyEmi * n);
  const totalInterest = Math.max(0, totalAmount - P);

  const principalRatio = Math.round((P / totalAmount) * 100);
  const interestRatio = Math.max(0, 100 - principalRatio);

  return {
    monthlyEmi,
    totalInterest,
    totalAmount,
    principalRatio,
    interestRatio
  };
}

/**
 * Format currency into Indian Rupee format (e.g., ₹5,00,000)
 */
export function formatCurrency(amount) {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format raw numbers to compact Indian representation (e.g. 5 Lakh, 1.2 Cr)
 */
export function formatCompactINR(amount) {
  const num = Number(amount);
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
  }
  if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2).replace(/\.00$/, '')} Lakh`;
  }
  if (num >= 1000) {
    return `₹${(num / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return `₹${num}`;
}
