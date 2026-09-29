export const serviceCategories = [
  { id: 'loans', name: 'Loans' },
  { id: 'insurance', name: 'Insurance' },
  { id: 'investment', name: 'Investment' }
];

export const services = [
  // ================= LOANS =================
  {
    id: "home-loans",
    name: "Home Loans",
    category: "Loans",
    categorySlug: "loans",
    shortDescription: "Financial assistance for purchasing new homes, resale properties, plot construction, or home renovation with low EMIs.",
    tagline: "Turn your dream home into reality with competitive interest rates.",
    icon: "Home",
    badge: "Low Rates",
    interestRateRange: "From 8.5% p.a.*",
    tenureRange: "Up to 30 Years",
    maxAmount: "Up to ₹5,00,00,000",
    processingTime: "3 - 5 Days*",
    keyBenefits: [
      "Attractive low-interest rates with maximum tax benefits",
      "Flexible repayment tenure up to 30 years",
      "Support for home extension, improvement, and plot construction",
      "Minimal paperwork and expedited legal verification"
    ],
    overview: "Buying or building a home is a life milestone. Nidhi Finance provides complete assistance from property verification support to loan disbursement with transparent terms.",
    eligibilityCriteria: [
      "Age: 21 to 65 years",
      "Salaried employee or self-employed professional/business owner",
      "Minimum monthly income of ₹20,000+",
      "Clear property title documents"
    ],
    documentsRequired: [
      "KYC: PAN Card, Aadhaar Card",
      "Income Proof: 3 months salary slips / 2 years ITR",
      "Bank Statement: 6 months operating account",
      "Property Papers: Agreement to sale, title documents"
    ]
  },
  {
    id: "personal-loans",
    name: "Personal Loans",
    category: "Loans",
    categorySlug: "loans",
    shortDescription: "Flexible financial assistance for personal needs, medical emergencies, weddings, education, or lifestyle requirements.",
    tagline: "Instant support for your personal financial milestones.",
    icon: "UserCheck",
    badge: "Most Popular",
    interestRateRange: "From 10.5% p.a.*",
    tenureRange: "12 to 60 Months",
    maxAmount: "Up to ₹25,00,000",
    processingTime: "24 - 48 Hours*",
    keyBenefits: [
      "No collateral or asset security required",
      "Quick digital documentation and fast disbursement",
      "Flexible repayment options from 1 to 5 years",
      "Transparent fee structure with zero hidden costs"
    ],
    overview: "Nidhi Finance personal loan assistance is structured to help individuals manage unforeseen expenses or planned milestones without financial strain.",
    eligibilityCriteria: [
      "Age: 21 to 58 years",
      "Salaried or self-employed individual",
      "Minimum monthly income of ₹15,000+",
      "Satisfactory credit repayment history"
    ],
    documentsRequired: [
      "Identity & Address Proof (PAN, Aadhaar)",
      "Income Proof (Latest 3 months salary slips / ITR)",
      "Bank Statement (Last 6 months)",
      "Passport size photographs"
    ]
  },
  {
    id: "car-loans",
    name: "Car Loans",
    category: "Loans",
    categorySlug: "loans",
    shortDescription: "Vehicle financing solutions for brand-new passenger cars and commercial four-wheelers with attractive interest rates.",
    tagline: "Drive home your dream vehicle with hassle-free financing.",
    icon: "Car",
    badge: "Quick Approval",
    interestRateRange: "From 8.75% p.a.*",
    tenureRange: "12 to 84 Months",
    maxAmount: "Up to 90% On-Road",
    processingTime: "24 - 48 Hours*",
    keyBenefits: [
      "Financing up to 90% to 100% of on-road vehicle cost",
      "Attractive interest rates and flexible tenures up to 7 years",
      "Special schemes for electric vehicles (EVs)",
      "Quick dealer tie-up and speedy delivery coordination"
    ],
    overview: "Get the best financing terms for your new vehicle with customized repayment schedules to match your monthly budget.",
    eligibilityCriteria: [
      "Age: 21 to 60 years",
      "Salaried employee or self-employed professional",
      "Minimum annual income of ₹2,50,000+"
    ],
    documentsRequired: [
      "KYC (PAN & Aadhaar)",
      "Income Proof (Salary Slips / Form 16 / ITR)",
      "Bank Statement (6 months)",
      "Vehicle Proforma Invoice from authorized dealership"
    ]
  },
  {
    id: "old-vehicles-loans",
    name: "Old Vehicles Loans",
    category: "Loans",
    categorySlug: "loans",
    shortDescription: "Used and pre-owned vehicle loans for second-hand cars, commercial vehicles, and utility vehicles.",
    tagline: "Affordable financing for certified pre-owned & used vehicles.",
    icon: "Truck",
    badge: "Pre-Owned",
    interestRateRange: "From 11.5% p.a.*",
    tenureRange: "12 to 60 Months",
    maxAmount: "Up to 80% Valuation",
    processingTime: "2 - 3 Days*",
    keyBenefits: [
      "Financing available up to 80% of vehicle certified valuation",
      "Support for private cars, used commercial tempos & trucks",
      "Easy vehicle RC transfer assistance and documentation",
      "Flexible tenures suited to used vehicle age"
    ],
    overview: "Looking to buy a reliable pre-owned car or commercial vehicle? Nidhi Finance provides quick loan valuation and financing solutions for used four-wheelers.",
    eligibilityCriteria: [
      "Age: 21 to 62 years",
      "Vehicle age should not exceed lender threshold at maturity",
      "Stable income and residential address proof"
    ],
    documentsRequired: [
      "KYC (PAN & Aadhaar Card)",
      "Vehicle RC Copy, Insurance & Fitness Certificate",
      "Valuation report from certified inspector",
      "Bank Statement of last 6 months"
    ]
  },
  {
    id: "business-loans",
    name: "Business Loans",
    category: "Loans",
    categorySlug: "loans",
    shortDescription: "Financial solutions designed to support enterprise growth, working capital, inventory, machinery, and business expansion.",
    tagline: "Fueling business growth and working capital needs.",
    icon: "Building2",
    badge: "MSME Growth",
    interestRateRange: "From 12.0% p.a.*",
    tenureRange: "12 to 84 Months",
    maxAmount: "Up to ₹1,00,00,000",
    processingTime: "48 - 72 Hours*",
    keyBenefits: [
      "Collateral-free and secured financing options available",
      "Customized repayment terms matching business cash flows",
      "High loan amounts for machinery, inventory, and office upgrades",
      "Dedicated MSME consulting and swift file processing"
    ],
    overview: "Running and growing a business requires timely capital. Nidhi Finance assists traders, manufacturers, shops, and service providers in Sangamner, Ahilyanagar and beyond.",
    eligibilityCriteria: [
      "Business operating vintage of at least 2 years",
      "Minimum annual turnover of ₹15,00,000+",
      "Valid business registrations (GST / Shop Act / Udyam)"
    ],
    documentsRequired: [
      "Business Proof (GST Certificate, Udyam Registration, Trade License)",
      "Promoter KYC (PAN, Aadhaar of proprietor/partners/directors)",
      "Financials: 2 years ITR with Balance Sheet & P&L",
      "Current Account statement of last 12 months"
    ]
  },

  // ================= INSURANCE =================
  {
    id: "mediclaim",
    name: "Mediclaim",
    category: "Insurance",
    categorySlug: "insurance",
    shortDescription: "Comprehensive health insurance and hospitalization cover for individuals and families against rising medical costs.",
    tagline: "Protect your family's health and savings against medical emergencies.",
    icon: "HeartPulse",
    badge: "Health Protection",
    interestRateRange: "Affordable Premiums",
    tenureRange: "Annual / Multi-Year",
    maxAmount: "₹5L to ₹1 Crore Cover",
    processingTime: "Instant Policy",
    keyBenefits: [
      "Cashless hospitalization across thousands of network hospitals",
      "Covers pre and post-hospitalization medical expenses",
      "No Claim Bonus (NCB) benefits and annual free health checkups",
      "Tax deduction benefits under Section 80D"
    ],
    overview: "Medical emergencies can deplete family savings rapidly. Our mediclaim advisory helps you select comprehensive family floater and individual health covers from leading insurers.",
    eligibilityCriteria: [
      "Entry age: 18 to 65 years (Children from 90 days)",
      "Standard health declaration"
    ],
    documentsRequired: [
      "KYC: PAN Card & Aadhaar Card",
      "Passport size photo of all insured members",
      "Previous medical records (if any)"
    ]
  },
  {
    id: "term-insurance-plans",
    name: "Term Insurance Plans",
    category: "Insurance",
    categorySlug: "insurance",
    shortDescription: "High-cover life insurance protection providing financial security to your family at highly affordable premium rates.",
    tagline: "Secure your family's financial future with high life coverage.",
    icon: "ShieldCheck",
    badge: "Family Security",
    interestRateRange: "Low Premiums",
    tenureRange: "Up to Age 85",
    maxAmount: "₹25L to ₹5 Crore Sum",
    processingTime: "Quick Issuance",
    keyBenefits: [
      "High sum assured coverage at economical monthly or annual premiums",
      "Critical illness and accidental death rider options",
      "Tax exemption benefits under Section 80C and 10(10D)",
      "Complete financial peace of mind for your dependents"
    ],
    overview: "Term life insurance is the purest form of risk protection. We help you compare top IRDAI-approved insurance providers to get the highest sum assured at the lowest premium.",
    eligibilityCriteria: [
      "Age: 18 to 65 years",
      "Salaried or self-employed with steady annual income"
    ],
    documentsRequired: [
      "KYC (PAN, Aadhaar, Age Proof)",
      "Income Proof (Salary Slips / Form 16 / ITR)",
      "Medical checkup (arranged if required by insurer)"
    ]
  },
  {
    id: "commercial-vehicle-insurance",
    name: "Commercial Vehicle Insurance",
    category: "Insurance",
    categorySlug: "insurance",
    shortDescription: "Comprehensive insurance coverage for goods vehicles, trucks, buses, tempos, taxis, and commercial transport fleets.",
    tagline: "Complete risk coverage for your commercial transport assets.",
    icon: "Truck",
    badge: "Commercial Fleet",
    interestRateRange: "Competitive Quotes",
    tenureRange: "1 Year Annual Renewal",
    maxAmount: "Vehicle IDV Based",
    processingTime: "Instant Renewal",
    keyBenefits: [
      "Mandatory Third-Party Liability plus Own Damage (OD) protection",
      "Coverage against accidents, theft, fire, and natural calamities",
      "Fast claim settlement assistance and towing support",
      "Fleet discounts for commercial fleet operators"
    ],
    overview: "Keep your commercial vehicles compliant and safeguarded against road mishaps, goods damage, and third-party liabilities with quick policy renewals.",
    eligibilityCriteria: [
      "Registered commercial vehicle owner / fleet transport company",
      "Valid vehicle RC and commercial permit"
    ],
    documentsRequired: [
      "Vehicle RC Copy and Commercial Permit",
      "Previous year policy copy",
      "Fitness & Pollution (PUC) certificate"
    ]
  },
  {
    id: "bike-car-insurance",
    name: "Bike & Car Insurance",
    category: "Insurance",
    categorySlug: "insurance",
    shortDescription: "Instant comprehensive and third-party insurance for two-wheelers, scooters, and private four-wheelers.",
    tagline: "Instant policy issuance with maximum No-Claim Bonus (NCB).",
    icon: "ShieldAlert",
    badge: "Motor Protection",
    interestRateRange: "Best Market Rates",
    tenureRange: "1 to 3 Years",
    maxAmount: "Vehicle IDV Based",
    processingTime: "Instant 5-Min Policy",
    keyBenefits: [
      "Zero-Depreciation (Bumper to Bumper) and Engine Protect add-ons",
      "Instant paperless policy generation and renewal",
      "Transfer up to 50% existing No Claim Bonus (NCB)",
      "24x7 Roadside Assistance (RSA) and cashless garage network"
    ],
    overview: "Get your two-wheeler or private car insured within minutes. We compare top insurance companies to get you the lowest premium with maximum add-on covers.",
    eligibilityCriteria: [
      "Valid vehicle registration certificate (RC)",
      "Owner driving license"
    ],
    documentsRequired: [
      "Vehicle RC Copy",
      "Previous Insurance Policy copy",
      "Owner KYC details"
    ]
  },

  // ================= INVESTMENT =================
  {
    id: "mutual-fund",
    name: "Mutual Fund",
    category: "Investment",
    categorySlug: "investment",
    shortDescription: "Professionally managed equity, debt, and hybrid mutual fund portfolios to build long-term wealth and beat inflation.",
    tagline: "Smart wealth creation through diversified mutual fund portfolios.",
    icon: "TrendingUp",
    badge: "Wealth Creation",
    interestRateRange: "Market-Linked Returns",
    tenureRange: "Flexible / Long-Term",
    maxAmount: "Start from ₹500",
    processingTime: "Same Day Setup",
    keyBenefits: [
      "Diversified exposure across top companies and sovereign debt",
      "Expert portfolio management by certified fund managers",
      "High liquidity with flexible redemption options",
      "Tax saving ELSS mutual funds with Section 80C rebate"
    ],
    overview: "Mutual funds allow you to participate in market growth with professional risk management. We guide you in selecting funds that match your risk appetite and financial horizon.",
    eligibilityCriteria: [
      "Individual Indian Resident or NRI (Age 18+)",
      "KYC compliant investor"
    ],
    documentsRequired: [
      "PAN Card (Mandatory)",
      "Aadhaar Card with mobile linking",
      "Cancelled Cheque / Bank Account details"
    ]
  },
  {
    id: "sip-plans",
    name: "SIP Plans (Systematic Investment)",
    category: "Investment",
    categorySlug: "investment",
    shortDescription: "Disciplined monthly investing starting from just ₹500/month with rupee cost averaging and power of compounding.",
    tagline: "Build substantial wealth month-by-month with disciplined SIPs.",
    icon: "Coins",
    badge: "Compounding Growth",
    interestRateRange: "Compounding Growth",
    tenureRange: "Flexible (3 to 20+ Yrs)",
    maxAmount: "From ₹500 / Month",
    processingTime: "Instant Online Setup",
    keyBenefits: [
      "Start with small monthly amounts (as low as ₹500 to ₹1,000)",
      "Rupee cost averaging eliminates the need to time the market",
      "Exponential growth through long-term power of compounding",
      "Automated bank mandate for hassle-free monthly investing"
    ],
    overview: "Systematic Investment Plans (SIP) are the most effective wealth-building tool for salaried individuals and families to build a major corpus for children's education, marriage, and future goals.",
    eligibilityCriteria: [
      "Open to all salaried, business persons, and students aged 18+",
      "Active savings bank account with Net Banking / UPI"
    ],
    documentsRequired: [
      "PAN Card & Aadhaar Card",
      "Bank Account details / Cancelled cheque"
    ]
  },
  {
    id: "fix-deposit",
    name: "Fix Deposit",
    category: "Investment",
    categorySlug: "investment",
    shortDescription: "Secure, guaranteed-return fixed deposit options with attractive interest rates for senior citizens and conservative savers.",
    tagline: "Safe, guaranteed growth with attractive interest payouts.",
    icon: "PiggyBank",
    badge: "Guaranteed Return",
    interestRateRange: "Up to 8.5% p.a.*",
    tenureRange: "12 to 60 Months",
    maxAmount: "From ₹10,000 upwards",
    processingTime: "Instant Booking",
    keyBenefits: [
      "High capital safety with guaranteed fixed returns",
      "Additional 0.50% interest bonus for Senior Citizens",
      "Flexible interest payout options: Monthly, Quarterly, or Cumulative",
      "Loan and overdraft facility against FD available"
    ],
    overview: "When safety of principal is your top priority, Fixed Deposits provide peace of mind and stable, predictable returns regardless of market volatility.",
    eligibilityCriteria: [
      "Individuals, Senior Citizens, HUF, and Trust entities",
      "Resident Indian"
    ],
    documentsRequired: [
      "Identity & Address Proof (PAN, Aadhaar)",
      "Bank details for interest crediting",
      "Recent photograph"
    ]
  },
  {
    id: "retirement-plan",
    name: "Retirement Plan",
    category: "Investment",
    categorySlug: "investment",
    shortDescription: "Structured pension and annuity solutions ensuring a steady, guaranteed monthly income throughout your golden retirement years.",
    tagline: "Ensure lifelong financial independence and guaranteed pension.",
    icon: "Briefcase",
    badge: "Lifelong Security",
    interestRateRange: "Guaranteed Pension",
    tenureRange: "Long-Term to Age 80+",
    maxAmount: "Custom Corpus Goal",
    processingTime: "Advisory Consultation",
    keyBenefits: [
      "Guaranteed regular monthly pension after retirement",
      "Accumulation of substantial retirement corpus with tax exemptions",
      "Inflation protection and joint-life annuity options for spouse",
      "Personalized retirement readiness and gap analysis"
    ],
    overview: "Retire with dignity and complete financial independence. Our retirement advisors help you calculate your target retirement corpus and structure regular lifelong income streams.",
    eligibilityCriteria: [
      "Age: 25 to 60 years",
      "Desire to secure guaranteed post-retirement monthly cash flows"
    ],
    documentsRequired: [
      "KYC Documents (PAN, Aadhaar)",
      "Age Proof",
      "Bank account details"
    ]
  }
];
