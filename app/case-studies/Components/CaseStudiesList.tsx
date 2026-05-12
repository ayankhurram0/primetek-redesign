import CaseStudyCard, { CaseStudyData } from './CaseStudyCard';


const studies: CaseStudyData[] = [
  {
    category: 'Revenue Recovery',
    type: 'Independent Community Pharmacy',
    title: '$94,000 in Revenue Recovered in 6 Months',
    location: 'New Jersey',
    statValue: '$94K',
    statLabel: 'Revenue Recovered',
    statDuration: '6 Months',
    challenge: 'This single-location independent pharmacy was experiencing consistent revenue shortfalls but had no visibility into where reimbursements were falling short. DIR fees were eroding margins and the owner had no system to track PBM contract performance.',
    approach: 'PrimeTek implemented twice-monthly revenue intelligence reports, identifying unpaid claims and DIR fee exposure across three PBM contracts. A reimbursement reconciliation process was established within the first 30 days.',
    results: [
      '$94,000 in recovered reimbursements over 6 months',
      '23% reduction in DIR fee exposure',
      'Identified 3 PBM contracts with systematic underpayments',
      'Monthly reporting cadence established for ongoing visibility'
    ],
    quote: "Before PrimeTek, I had no idea how much money was slipping through the cracks. Within the first report cycle, they found issues I had been losing money on for years.",
    author: "Pharmacy Owner",
    authorRole: "Independent Pharmacy, NJ",
    theme: 'teal'
  },
  {
    category: 'Audit Protection',
    type: 'Multi-Location Pharmacy Group',
    title: 'PBM Audit Avoided — $210,000 Recoupment Risk Eliminated',
    location: 'Pennsylvania',
    statValue: '$210K',
    statLabel: 'Recoupment Avoided',
    statDuration: '90 Days',
    challenge: 'A 3-location pharmacy group received a PBM audit notice from a major insurer. They had no documentation system, no compliance monitoring, and were at serious risk of a six-figure recoupment. Their internal team had no experience navigating the audit process.',
    approach: 'PrimeTek deployed its Compliance & Audit Protection service immediately. We conducted a full pre-audit review, organized documentation across all three locations, identified and corrected threshold violations before submission, and prepared a formal response package.',
    results: [
      'Audit resolved with zero recoupment',
      '$210,000 in potential recoupment risk eliminated',
      'Compliance monitoring system established across all 3 locations',
      'Staff trained on documentation best practices'
    ],
    quote: "We were panicking when the audit notice arrived. PrimeTek stepped in, took control of the process, and we came out the other side with nothing owed. I cannot overstate how valuable that was.",
    author: "Director of Operations",
    authorRole: "Multi-Location Pharmacy Group, PA",
    theme: 'purple'
  },
  {
    category: 'Performance Growth',
    type: 'Specialty Pharmacy',
    title: '31% Improvement in Operational Efficiency Over One Year',
    location: 'New York',
    statValue: '31%',
    statLabel: 'Efficiency Gain',
    statDuration: '12 Months',
    challenge: 'A specialty pharmacy was struggling with workflow inefficiencies, poor patient adherence metrics, and declining star ratings that were impacting their PBM contract eligibility. They lacked the operational data to understand what was driving the decline.',
    approach: 'PrimeTek delivered a comprehensive operational analysis, identifying bottlenecks in the dispensing workflow, patient outreach gaps, and adherence metric deficiencies. A 12-month performance improvement roadmap was developed and executed with monthly check-ins.',
    results: [
      '31% improvement in overall operational efficiency score',
      'Patient adherence metrics improved from 72% to 89%',
      'Star rating improved from 3.2 to 4.1 within 12 months',
      'Qualified for preferred network status with 2 additional PBMs'
    ],
    quote: "The roadmap PrimeTek built for us was exactly what we needed. They understood our specific challenges and gave us a clear path forward. Our star ratings speak for themselves now.",
    author: "Pharmacy Director",
    authorRole: "Specialty Pharmacy, NY",
    theme: 'blue'
  },
  {
    category: 'Compliance Monitoring',
    type: 'Independent Pharmacy Chain',
    title: 'Real-Time Alert System Catches $47,000 Compliance Issue Before Audit',
    location: 'Connecticut',
    statValue: '$47K',
    statLabel: 'Exposure Eliminated',
    statDuration: '18 Months',
    challenge: 'A 5-location pharmacy chain had no centralized compliance monitoring. Each location operated independently with no visibility into cross-location threshold violations. An OptumRx 25% therapeutic class cap issue was building undetected across two locations.',
    approach: 'PrimeTek implemented its real-time alert monitoring system across all five locations. Within the first monitoring cycle, the system flagged a therapeutic class cap violation at two locations that was approaching audit-triggering thresholds.',
    results: [
      'Therapeutic class cap violation identified and corrected before audit trigger',
      '$47,000 in potential recoupment exposure eliminated',
      'Centralized compliance dashboard deployed across all 5 locations',
      'Zero audit notices received in the 18 months following implementation'
    ],
    quote: "The alert system paid for itself in the first month. We had no idea we were approaching a threshold violation — PrimeTek caught it before it became a real problem.",
    author: "Owner & Pharmacist-in-Charge",
    authorRole: "Independent Pharmacy Chain, CT",
    theme: 'red'
  }
];

export default function CaseStudiesList() {
  return (
    <section className="py-24 px-26 relative overflow-hidden bg-transparent">
      <div className="relative z-10">
        {studies.map((study, idx) => (
          <CaseStudyCard key={idx} study={study} idx={idx} />
        ))}
      </div>
    </section>
  );
}
