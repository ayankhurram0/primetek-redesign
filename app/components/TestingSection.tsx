import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    TrendingUp,
    DollarSign,
    Activity,
    FileText,
    ShieldCheck,
    GitMerge,
    Settings,
    RotateCcw,
    AlertTriangle,
    Users,
    CheckCircle,
    Clock,
    AlertCircle,
    Sparkles,
    BarChart3,
    Plus,
    Percent
} from "lucide-react";

// ==========================================
// 1. REVENUE INTELLIGENCE CARD TYPES & DATA
// ==========================================

interface DataPoint {
    x: number;
    y: number;
}

const REVENUE_DATA_SETS: Record<string, DataPoint[]> = {
    reimbursements: [
        { x: 30, y: 110 },
        { x: 80, y: 55 },
        { x: 130, y: 75 },
        { x: 180, y: 40 },
        { x: 230, y: 85 },
        { x: 280, y: 45 },
        { x: 330, y: 35 },
    ],
    underpayments: [
        { x: 30, y: 40 },
        { x: 80, y: 85 },
        { x: 130, y: 50 },
        { x: 180, y: 95 },
        { x: 230, y: 60 },
        { x: 280, y: 110 },
        { x: 330, y: 90 },
    ],
    cashflow: [
        { x: 30, y: 90 },
        { x: 80, y: 100 },
        { x: 130, y: 60 },
        { x: 180, y: 70 },
        { x: 230, y: 45 },
        { x: 280, y: 35 },
        { x: 330, y: 25 },
    ],
};

const REVENUE_DATA_KEYS = ["reimbursements", "underpayments", "cashflow"];

function RevenueIntelligenceCard() {
    const [activeSet, setActiveSet] = useState<string>("reimbursements");
    const [hoveredPointId, setHoveredPointId] = useState<number | null>(null);

    const points = REVENUE_DATA_SETS[activeSet];

    // Auto-cycle datasets to feel alive
    useEffect(() => {
        const interval = setInterval(() => {
            if (hoveredPointId === null) {
                setActiveSet((current) => {
                    const currentIndex = REVENUE_DATA_KEYS.indexOf(current);
                    const nextIndex = (currentIndex + 1) % REVENUE_DATA_KEYS.length;
                    return REVENUE_DATA_KEYS[nextIndex];
                });
            }
        }, 6000);
        return () => clearInterval(interval);
    }, [hoveredPointId]);

    // Curved Path calculation for beautiful chart
    const getCurvedPath = (pts: DataPoint[]) => {
        if (pts.length < 2) return "";
        let d = `M ${pts[0].x},${pts[0].y}`;
        for (let i = 0; i < pts.length - 1; i++) {
            const p0 = pts[i];
            const p1 = pts[i + 1];
            const cpX1 = p0.x + (p1.x - p0.x) / 2;
            const cpY1 = p0.y;
            const cpX2 = p0.x + (p1.x - p0.x) / 2;
            const cpY2 = p1.y;
            d += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${p1.x},${p1.y}`;
        }
        return d;
    };

    const curveD = getCurvedPath(points);

    return (
        <div
            id="revenue-intelligence-card"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/20 p-6 transition-all duration-300 hover:border-[#FF4A3A] hover:shadow-[0_0_20px_5px_rgba(255,74,58,0.6)] min-h-[380px]"
        >
            {/* Visual Animation Area */}
            <div className="relative flex flex-col h-[140px] w-full justify-between rounded-xl bg-transparent p-4 border border-white/20 overflow-hidden">

                {/* Luminous Sweeping Line representing real-time telemetry scans */}
                <motion.div
                    className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#FF4A3A]/60 to-transparent z-10 pointer-events-none"
                    animate={{ x: ["30px", "330px", "30px"] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                />

                {/* Visual Graph with Gridlines */}
                <div className="relative flex-1 mt-3 h-28 w-full flex items-center justify-center">
                    {/* Background Grid Lines from user's code */}
                    <div className="absolute inset-0 opacity-5 flex flex-col justify-between py-6 px-4 pointer-events-none">
                        <div className="border-b border-dashed border-white w-full" />
                        <div className="border-b border-dashed border-white w-full" />
                        <div className="border-b border-dashed border-white w-full" />
                    </div>

                    {/* SVG Canvas for Line Plot matching viewBox and glowing paths */}
                    <svg className="w-full h-24 overflow-visible" viewBox="0 0 350 110" fill="none">
                        <defs>
                            <linearGradient id="redCurveGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FF4A3A" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* Area under curve */}
                        <motion.path
                            d={`${curveD} L 330,110 L 30,110 Z`}
                            fill="url(#redCurveGrad)"
                            initial={false}
                            animate={{ d: `${curveD} L 330,110 L 30,110 Z` }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />

                        {/* Curved Path with user's drop shadow visual styling */}
                        <motion.path
                            d={curveD}
                            fill="none"
                            stroke="#FF4A3A"
                            strokeWidth="4"
                            strokeLinecap="round"
                            className="drop-shadow-[0_0_8px_rgba(255,74,58,0.4)]"
                            initial={false}
                            animate={{ d: curveD }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />

                        {/* Interactive Points Grid */}
                        {points.map((pt, idx) => (
                            <g key={idx}>
                                {/* Invisible hover area */}
                                <circle
                                    cx={pt.x}
                                    cy={pt.y}
                                    r="12"
                                    className="fill-transparent cursor-pointer"
                                    onMouseEnter={() => setHoveredPointId(idx)}
                                    onMouseLeave={() => setHoveredPointId(null)}
                                />

                                {/* Pulsing Dot representing the user's glowing tracking node */}
                                {(hoveredPointId === idx || (hoveredPointId === null && idx === points.length - 1)) && (
                                    <>
                                        <motion.circle
                                            cx={pt.x}
                                            cy={pt.y}
                                            r="9"
                                            fill="#FF4A3A"
                                            className="opacity-75"
                                            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut" }}
                                        />
                                        <circle
                                            cx={pt.x}
                                            cy={pt.y}
                                            r="5"
                                            fill="white"
                                            stroke="#FF4A3A"
                                            strokeWidth="3.5"
                                        />
                                    </>
                                )}
                            </g>
                        ))}
                    </svg>

                    {/* Floating Pill on bottom right */}
                    <div className="absolute right-2 bottom-1 bg-white/5 border border-white/10 rounded-lg py-1 px-2.5 text-[9px] font-bold text-white flex items-center gap-1.5 backdrop-blur-md z-10 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span>Live Leakage: $1.2M+</span>
                    </div>
                </div>
            </div>

            {/* Description and Metadata */}
            <div className="mt-5 text-left">
                <h3 className="font-serif text-xl font-bold tracking-normal text-[#FFFFFF] leading-tight transition-colors duration-300 group-hover:text-[#FF4A3A]">
                    Revenue Intelligence & Reporting
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-[#8E9B9E] font-normal min-h-[48px]">
                    Track reimbursement trends, identify underpayments, and maximize your cash flow with real-time intelligence panels and AI-suggested recovery rules.
                </p>
            </div>

            {/* Bottom section with metric and action */}
            <div className="mt-0 pt-0">
                <a
                    href="#analyze"
                    className="flex items-center justify-between gap-4 bg-[#0F171A] rounded-xl p-4 group/btn transition-colors hover:bg-[#152024]"
                >
                    <div className="flex-1 pr-2">
                        <span className="text-[13px] text-gray-300 leading-snug block">
                            $1.2M+ in average annual underpayments identified and recovered per store.
                        </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] font-bold text-[#FF4A3A] uppercase tracking-widest leading-tight text-left">
                            Analyze<br />Revenue
                        </span>
                        <span className="text-[#FF4A3A] text-base transition-transform duration-300 group-hover/btn:translate-x-1">
                            →
                        </span>
                    </div>
                </a>
            </div>
        </div>
    );
}


// ==========================================
// 2. CLAIMS & REIMBURSEMENT OPTIMIZATION CARD
// ==========================================

function ClaimsReimbursementCard() {
    const [activeRouteIndex, setActiveRouteIndex] = useState<number>(0);
    const [isRouting, setIsRouting] = useState<boolean>(false);
    const [routeStatus, setRouteStatus] = useState<string>("Approved");

    const endpoints = [
        { label: "PBM Auto-Match", status: "Success", color: "text-[#00E5A3]" },
        { label: "COB Validation", status: "Auto-Fixed", color: "text-[#FF9F29]" },
        { label: "NPI Resolution", status: "Matched", color: "text-[#FF6B00]" },
    ];

    const handleTriggerRoute = (index: number) => {
        if (isRouting) return;
        setActiveRouteIndex(index);
        setIsRouting(true);
        // Cycle state
        setTimeout(() => {
            setIsRouting(false);
            setRouteStatus(endpoints[index].status);
        }, 1200);
    };

    // Automated trigger loop simulating active production pipelines
    useEffect(() => {
        const timer = setInterval(() => {
            if (!isRouting) {
                const nextIdx = (activeRouteIndex + 1) % endpoints.length;
                handleTriggerRoute(nextIdx);
            }
        }, 5000);
        return () => clearInterval(timer);
    }, [activeRouteIndex, isRouting]);

    return (
        <div
            id="claims-reimbursement-card"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/20 p-6 transition-all duration-300 hover:border-[#FF6B00] hover:shadow-[0_0_20px_5px_rgba(255,107,0,0.6)] hover:-translate-y-2 hover:scale-[1.02] min-h-[380px]"
        >

            {/* Visual Animation Area */}
            <div className="relative flex flex-col h-[140px] w-full justify-between rounded-xl p-4 border border-white/20 overflow-hidden">

                {/* Category Pill on top left */}
                <div className="flex items-center justify-between z-10 w-full">
                    <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">
                        Claims Pipeline
                    </span>
                </div>

                {/* Dynamic Nodes Graphic SVG from user's case 1 */}
                <div className="relative flex-1 mt-2 w-full h-[110px] flex items-center justify-center">
                    <svg className="w-full h-24 overflow-visible" viewBox="0 0 320 100" fill="none">
                        {/* Background connecting lines track */}
                        <path d="M50 50 L120 50" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />
                        <path d="M120 50 L215 20" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />
                        <path d="M120 50 L215 50" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />
                        <path d="M120 50 L215 80" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />

                        {/* Smart Flow Active Routing Path */}
                        <motion.path
                            d={
                                activeRouteIndex === 0
                                    ? "M50 50 L120 50 Q162 35 215 20"
                                    : activeRouteIndex === 1
                                        ? "M50 50 L120 50 L215 50"
                                        : "M50 50 L120 50 Q162 65 215 80"
                            }
                            stroke="#FF7A00"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            className="drop-shadow-[0_0_6px_rgba(255,122,0,0.4)]"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            key={activeRouteIndex}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />

                        {/* Flow particle traveler */}
                        {isRouting && (
                            <motion.circle
                                r="4"
                                fill="#FF7A00"
                                animate={{
                                    offsetDistance: ["0%", "100%"]
                                }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                                style={{
                                    motionPath: `path('${activeRouteIndex === 0
                                        ? "M50 50 L120 50 Q162 35 215 20"
                                        : activeRouteIndex === 1
                                            ? "M50 50 L120 50 L215 50"
                                            : "M50 50 L120 50 Q162 65 215 80"
                                        }')`
                                }}
                            />
                        )}

                        {/* Source Node (Left) */}
                        <g className="cursor-pointer" onClick={() => handleTriggerRoute((activeRouteIndex + 1) % 3)}>
                            <circle cx="50" cy="50" r="14" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="11"
                                fill="transparent"
                                stroke="#FF7A00"
                                strokeWidth="1"
                                animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                            />
                            <circle cx="50" cy="50" r="5" fill="#FF7A00" />
                        </g>

                        {/* Hub Node (Middle) */}
                        <g>
                            <circle cx="120" cy="50" r="18" fill="rgba(255,122,0,0.08)" stroke="#FF7A00" strokeWidth="2" className="drop-shadow-[0_0_6px_rgba(255,122,0,0.3)]" />
                            <motion.circle
                                cx="120"
                                cy="50"
                                r="18"
                                fill="transparent"
                                stroke="#FF7A00"
                                strokeWidth="1"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            />
                            <circle cx="120" cy="50" r="8" fill="#FF7A00" />
                        </g>

                        {/* Destinations Nodes (Right Side Interactive Targets) */}
                        {endpoints.map((item, idx) => {
                            const isTarget = idx === activeRouteIndex;
                            const nodeY = idx === 0 ? 20 : idx === 1 ? 50 : 80;
                            return (
                                <g key={idx} className="cursor-pointer font-mono" onClick={() => handleTriggerRoute(idx)}>
                                    <circle
                                        cx="215"
                                        cy={nodeY}
                                        r={isTarget ? "12" : "10"}
                                        fill={isTarget ? "rgba(255,122,0,0.12)" : "rgba(255,255,255,0.04)"}
                                        stroke={isTarget ? "#FF7A00" : "rgba(255,255,255,0.15)"}
                                        strokeWidth="1.5"
                                        className="transition-colors duration-200"
                                    />
                                    <circle
                                        cx="215"
                                        cy={nodeY}
                                        r={isTarget ? "5.5" : "4"}
                                        fill={isTarget ? "#FF7A00" : "rgba(255,255,255,0.3)"}
                                        className="transition-colors duration-200"
                                    />

                                    {/* Interactive Text Label next to destination */}
                                    <text
                                        x="234"
                                        y={nodeY + 3}
                                        fill={isTarget ? "#FFF" : "#8E9B9E"}
                                        fontSize="7.5"
                                        fontWeight="bold"
                                        className="select-none font-bold"
                                    >
                                        {item.label}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>

                    {/* Floating badge top right of visual frame */}
                    <div className="absolute right-2 top-0.5 bg-white/5 border border-white/10 rounded-lg py-1 px-2.5 text-[9px] font-bold text-white flex items-center gap-1.5 backdrop-blur-md z-10 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-pulse" />
                        <span>Optimized Routing</span>
                    </div>

                    {/* Live routing status readout */}
                    <div className="absolute left-2 bottom-1 max-w-[140px]">
                        <span className="text-[7.5px] font-mono text-gray-500 uppercase leading-none block">
                            Pipe Status:
                        </span>
                        <span className="text-[9px] font-mono font-bold text-[#FF7A00] uppercase mt-0.5 inline-block animate-pulse">
                            {isRouting ? "processing..." : routeStatus}
                        </span>
                    </div>
                </div>
            </div>

            {/* Description and Metadata */}
            <div className="mt-5 text-left">
                <h3 className="font-serif text-xl font-bold tracking-normal text-[#FFFFFF] leading-tight transition-colors duration-300 group-hover:text-[#FF6B00]">
                    Claims & Reimbursement Optimization
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-[#8E9B9E] font-normal min-h-[48px]">
                    Reduce claim submission errors, automatically flag local rule violations, fix rejection trends, and maximize clean-claim reimbursement flow.
                </p>
            </div>

            {/* Bottom section with metric and action */}
            <div className="mt-0 pt-0">
                <a
                    href="#claims"
                    className="flex items-center justify-between gap-4 bg-[#0F171A] rounded-xl p-4 group/btn transition-colors hover:bg-[#152024]"
                >
                    <div className="flex-1 pr-2">
                        <span className="text-[13px] text-gray-300 leading-snug block">
                            <span className="font-semibold text-white">Up to 19%</span> sustained increase in clean-claim recovery rates across locations.
                        </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-widest leading-tight text-left">
                            Fix My<br />Claims
                        </span>
                        <span className="text-[#FF6B00] text-base transition-transform duration-300 group-hover/btn:translate-x-1">
                            →
                        </span>
                    </div>
                </a>
            </div>
        </div>
    );
}


// ==========================================
// 3. COMPLIANCE & AUDIT PROTECTION CARD
// ==========================================

function ComplianceAuditCard() {
    const [activeStage, setActiveStage] = useState<number>(1); // default to step 1 (middle): Risk Mitigated

    const stages = [
        { id: 0, title: "Audit Deficit", desc: "Flagged risks identified", color: "#FF4A3A" },
        { id: 1, title: "Risk Mitigated", desc: "AI safeguards active", color: "#FF9F29" },
        { id: 2, title: "Protected", desc: "Audit safe status", color: "#00E5A3" },
    ];

    // Auto-cycle stages to simulate active threat protection scans
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStage((prev) => (prev + 1) % stages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            id="compliance-audit-card"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/20 p-6 transition-all duration-300 hover:border-[#FF9F29] hover:shadow-[0_0_20px_5px_rgba(255,159,41,0.6)] hover:-translate-y-2 hover:scale-[1.02] min-h-[380px]"
        >

            {/* Visual Animation Area */}
            <div className="relative flex h-[140px] w-full flex-col justify-between rounded-xl bg-transparent p-4 border border-white/20 overflow-hidden">

                {/* Sweep background highlight */}
                <motion.div
                    className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-[#FF9F29]/5 to-transparent pointer-events-none"
                    animate={{ y: [-40, 180] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                />

                {/* Top items & category badge */}
                <div className="flex items-center justify-between z-10 w-full">
                    <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider">
                        Risk Scanner Active
                    </span>
                </div>

                {/* Dynamic Timeline Indicator block from Case 2 */}
                <div className="relative flex-1 mt-4 w-full h-[90px] flex items-center justify-center">

                    {/* Timeline connecting line behind buttons */}
                    <div className="absolute left-10 right-10 h-[2.5px] bg-white/10" />
                    <motion.div
                        className="absolute left-10 h-[2.5px] bg-[#fb923c] origin-left"
                        initial={false}
                        animate={{
                            width: activeStage === 0 ? "0%" : activeStage === 1 ? "50%" : "100%"
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />

                    <div className="relative w-full flex justify-between items-center px-4 z-10">
                        {/* Milestone 1 (Gap Scan) */}
                        <div
                            onClick={() => setActiveStage(0)}
                            className="flex flex-col items-center gap-2 relative cursor-pointer group/node"
                        >
                            <div
                                className={`w-11 h-11 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${activeStage === 0
                                    ? "bg-[#0a0f1d] border-[#fb923c] text-[#fb923c] scale-110 shadow-[0_0_15px_rgba(251,146,60,0.3)] font-mono"
                                    : "bg-[#0a0f1d] border-white/25 text-white/50"
                                    }`}
                            >
                                01
                            </div>
                            <span className={`text-[8.5px] font-bold uppercase tracking-wider transition-colors duration-300 ${activeStage === 0 ? "text-[#fb923c]" : "text-white/30"
                                }`}>
                                Gap Scan
                            </span>
                        </div>

                        {/* Milestone 2 (Audit Ready) */}
                        <div
                            onClick={() => setActiveStage(1)}
                            className="flex flex-col items-center gap-2 relative cursor-pointer group/node"
                        >
                            <div
                                className={`w-11 h-11 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${activeStage === 1
                                    ? "bg-[#0a0f1d] border-[#fb923c] text-[#fb923c] scale-110 shadow-[0_0_15px_rgba(251,146,60,0.3)]"
                                    : "bg-[#0a0f1d] border-white/10 text-white/30"
                                    }`}
                            >
                                {activeStage > 1 ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : (
                                    <span className="font-mono">02</span>
                                )}
                            </div>
                            <span className={`text-[8.5px] font-bold uppercase tracking-wider transition-colors duration-300 ${activeStage === 1 ? "text-[#fb923c]" : "text-white/30"
                                }`}>
                                Audit Ready
                            </span>
                        </div>

                        {/* Milestone 3 (Safe) */}
                        <div
                            onClick={() => setActiveStage(2)}
                            className="flex flex-col items-center gap-2 relative cursor-pointer group/node"
                        >
                            <div
                                className={`w-11 h-11 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${activeStage === 2
                                    ? "bg-[#0a0f1d] border-[#fb923c] text-[#fb923c] scale-110 shadow-[0_0_15px_rgba(251,146,60,0.3)]"
                                    : "bg-[#0a0f1d] border-white/10 text-white/20"
                                    }`}
                            >
                                {activeStage === 2 ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : (
                                    <span className="font-mono">03</span>
                                )}
                            </div>
                            <span className={`text-[8.5px] font-bold uppercase tracking-wider transition-colors duration-300 ${activeStage === 2 ? "text-[#fb923c]" : "text-white/20"
                                }`}>
                                Safe
                            </span>
                        </div>
                    </div>

                    {/* Floating explanation label info */}
                    <div className="absolute right-2 bottom-0 pointer-events-none">
                        <span className="text-[7.5px] font-mono text-gray-500 uppercase tracking-widest leading-none">
                            {stages[activeStage].desc} — (Click milestones to test system)
                        </span>
                    </div>

                </div>
            </div>

            {/* Description and Metadata */}
            <div className="mt-5 text-left">
                <h3 className="font-serif text-xl font-bold tracking-normal text-[#FFFFFF] leading-tight transition-colors duration-300 group-hover:text-[#FF9F29]">
                    Compliance & Audit Protection
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-[#8E9B9E] font-normal min-h-[48px]">
                    Identify clinical and regulatory compliance gaps early, maintain persistent audit-ready histories, and reduce billing discrepancies automatically.
                </p>
            </div>

            {/* Bottom section with metric and action */}
            <div className="mt-0 pt-0">
                <a
                    href="#audits"
                    className="flex items-center justify-between gap-4 bg-[#0F171A] rounded-xl p-4 group/btn transition-colors hover:bg-[#152024]"
                >
                    <div className="flex-1 pr-2">
                        <span className="text-[13px] text-gray-300 leading-snug block">
                            <span className="font-semibold text-white">87%</span> of active pharmacy users attain total compliance within 30 days of setup.
                        </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] font-bold text-[#FF9F29] uppercase tracking-widest leading-tight text-left">
                            Check Audit<br />Risk
                        </span>
                        <span className="text-[#FF9F29] text-base transition-transform duration-300 group-hover/btn:translate-x-1">
                            →
                        </span>
                    </div>
                </a>
            </div>
        </div>
    );
}


// ==========================================
// 4. PATIENT & OPERATIONAL SUPPORT SYSTEMS CARD
// ==========================================

interface QueueItem {
    initials: string;
    name: string;
    detail: string;
    defaultStatus: string;
}

const OPERATIONS_QUEUE: QueueItem[] = [
    {
        initials: "SJ",
        name: "Sarah Jenkins, PharmD",
        detail: "Automated audit of prior authorization forms resolved 4 pending clinical exceptions for client pipeline sync.",
        defaultStatus: "In Review",
    },
    {
        initials: "DM",
        name: "David Miller, RPh",
        detail: "Daily inventory reconciliation completed. 12 prescription bottlenecks automatically resolved & batch-routed to central fill.",
        defaultStatus: "In Review",
    },
    {
        initials: "ER",
        name: "Elena Rostova, CPht",
        detail: "Client pharmacy onboarding logs fully audited. Flagged clinical compliance checks updated to premium active-state.",
        defaultStatus: "In Review",
    },
];

function PatientOperationalCard() {
    const [queueIndex, setQueueIndex] = useState<number>(0);
    const [profileState, setProfileState] = useState<string>("In Review");
    const [approvalCount, setApprovalCount] = useState<number>(142);
    const [isVerifying, setIsVerifying] = useState<boolean>(false);

    const currentItem = OPERATIONS_QUEUE[queueIndex];

    const handleAction = (status: string) => {
        if (isVerifying) return;
        setProfileState(status);
        if (status === "Verified") {
            setApprovalCount((prev) => prev + 1);
        }
    };

    // Auto-cycle operational tasks with dynamic pipeline staging actions
    useEffect(() => {
        const interval = setInterval(() => {
            // Trigger verification transition automatically to simulate an active AI scanner
            setIsVerifying(true);
            setProfileState("Scanning");

            setTimeout(() => {
                setIsVerifying(false);
                setProfileState("Verified");
                setApprovalCount((prev) => prev + 1);

                // Wait 3 seconds on "Verified" state, then transition to the next queue item
                setTimeout(() => {
                    setQueueIndex((prevIndex) => (prevIndex + 1) % OPERATIONS_QUEUE.length);
                    setProfileState("In Review");
                }, 3000);

            }, 1500);

        }, 8000);

        return () => clearInterval(interval);
    }, [queueIndex]);

    return (
        <div
            id="patient-operational-card"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/20 p-6 transition-all duration-300 hover:border-[#3B82F6] hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.6)] hover:-translate-y-2 hover:scale-[1.02] min-h-[380px]"
        >

            {/* Visual Animation Area */}
            <div className="relative flex min-h-[150px] w-full items-center justify-center rounded-xl bg-transparent p-3 border border-white/20 overflow-hidden">
                
                {/* iOS Notification Single */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={queueIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="w-full max-w-[280px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-[14px] p-3 flex flex-col gap-1.5 shadow-lg relative overflow-hidden group/notif hover:bg-black/60 transition-colors z-10"
                    >
                        {/* Top Header */}
                        <div className="flex justify-between items-center px-0.5">
                            <div className="flex items-center gap-1.5">
                                <div className="w-4 h-4 rounded-md bg-blue-500/20 flex items-center justify-center shrink-0">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                </div>
                                <span className="text-[9px] text-white/50 font-semibold tracking-wide uppercase">System • {currentItem.initials}</span>
                            </div>
                            <span className="text-[8.5px] text-white/40">now</span>
                        </div>
                        
                        {/* Body */}
                        <div className="flex flex-col text-left px-0.5 mt-0.5">
                            <span className="text-[11px] font-bold text-white/90 leading-tight">{currentItem.name}</span>
                            <span className="text-[10px] text-white/60 line-clamp-2 leading-snug mt-0.5">{currentItem.detail}</span>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Description and Metadata */}
            <div className="mt-5 text-left">
                <h3 className="font-serif text-xl font-bold tracking-normal text-[#FFFFFF] leading-tight transition-colors duration-300 group-hover:text-[#3B82F6]">
                    Patient & Operational Support Systems
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-[#8E9B9E] font-normal min-h-[48px]">
                    Standardize pharmacy workflows, secure team collaboration grids, automate client coordination queues, and eliminate patient onboarding bottlenecks.
                </p>
            </div>

            {/* Bottom section with metric and action */}
            <div className="mt-0 pt-0">
                <a
                    href="#operations"
                    className="flex items-center justify-between gap-4 bg-[#0F171A] rounded-xl p-4 group/btn transition-colors hover:bg-[#152024]"
                >
                    <div className="flex-1 pr-2">
                        <span className="text-[13px] text-gray-300 leading-snug block">
                            <span className="font-semibold text-white">30%</span> measured reduction in clinical file workflows bottlenecks.
                        </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-widest leading-tight text-left">
                            Improve<br />Operations
                        </span>
                        <span className="text-[#3B82F6] text-base transition-transform duration-300 group-hover/btn:translate-x-1">
                            →
                        </span>
                    </div>
                </a>
            </div>
        </div>
    );
}


// ==========================================
// 5. PHARMACY GROWTH & PERFORMANCE STRATEGY CARD
// ==========================================

function PharmacyGrowthCard() {
    const [hoveredBar, setHoveredBar] = useState<number | null>(null);
    const [targetMargin, setTargetMargin] = useState<number>(85);

    // Auto-cycle highlighted segment over time
    useEffect(() => {
        let index = 0;
        const dialVals = [25, 45, 60, 75, 85];
        const interval = setInterval(() => {
            if (hoveredBar === null) {
                setHoveredBar(index);
                setTargetMargin(dialVals[index]);
                index = (index + 1) % 5;
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [hoveredBar]);

    return (
        <div
            id="pharmacy-growth-card"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/20 p-6 transition-all duration-300 hover:border-[#00E5A3] hover:shadow-[0_0_20px_5px_rgba(0,229,163,0.6)] hover:-translate-y-2 hover:scale-[1.02] min-h-[380px]"
        >

            {/* Visual Animation Area */}
            <div className="relative flex h-[140px] w-full items-center justify-between rounded-xl bg-transparent p-4 border border-white/20 overflow-hidden">

                {/* Category Pill */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-transparent border border-[#00E5A3] text-[9px] font-mono text-[#00E5A3] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(0,229,163,0.2)]">
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                            <polyline points="17 6 23 6 23 12" />
                        </svg>
                        <span>analytics</span>
                    </span>
                </div>

                {/* Top Right Icon (Animated Bounce) */}
                <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="absolute right-4 top-4 w-8 h-8 rounded-full border-[1.5px] border-[#00E5A3]/50 bg-transparent flex items-center justify-center shadow-[0_0_15px_rgba(0,229,163,0.3)] text-[#00E5A3] z-20"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                    </svg>
                </motion.div>

                {/* Background Sweeping Trend Line (Animated Path) */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 140" fill="none">
                        <motion.path 
                            d="M 15 85 Q 90 60 145 35" 
                            stroke="url(#glow-gradient)" 
                            strokeWidth="2.5" 
                            fill="none" 
                            className="drop-shadow-[0_0_8px_rgba(0,229,163,0.8)]"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", times: [0, 0.4, 0.8, 1] }}
                        />
                        <motion.g
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", times: [0, 0.4, 0.8, 1] }}
                            style={{ transformOrigin: "145px 35px" }}
                        >
                            <polygon 
                                points="145,35 135,41 138,35 135,29" 
                                fill="#00E5A3" 
                                className="drop-shadow-[0_0_8px_rgba(0,229,163,1)]"
                                transform="rotate(-24 145 35)"
                            />
                        </motion.g>
                        <defs>
                            <linearGradient id="glow-gradient" x1="0" y1="1" x2="1" y2="0">
                                <stop offset="0%" stopColor="#00E5A3" stopOpacity="0" />
                                <stop offset="100%" stopColor="#00E5A3" stopOpacity="1" />
                            </linearGradient>
                        </defs>
                        {/* Particles */}
                        <motion.circle animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 2 }} cx="51" cy="72" r="0.8" fill="#00E5A3" className="drop-shadow-[0_0_3px_#00E5A3]" />
                        <motion.circle animate={{ opacity: [0.8, 0.3, 0.8] }} transition={{ repeat: Infinity, duration: 3 }} cx="85" cy="60" r="1.2" fill="#00E5A3" className="drop-shadow-[0_0_4px_#00E5A3]" />
                        <motion.circle animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2.5 }} cx="116" cy="47" r="0.8" fill="#00E5A3" className="drop-shadow-[0_0_3px_#00E5A3]" />
                        <circle cx="132" cy="40" r="0.5" fill="#00E5A3" opacity="0.9" />
                    </svg>
                </div>

                {/* Five Rising Growth Bars */}
                <div className="w-[50%] flex items-end justify-between h-[75px] gap-2 select-none z-10 mt-10 pl-2">
                    {[25, 45, 60, 75, 95].map((val, idx) => {
                        const isHovered = hoveredBar === idx;
                        const barLabels = ["M1", "M2", "M3", "M4", "M5"];
                        const barColors = ["#FFFFFF", "#1D8A99", "#1B8A6B", "#A06A3A", "#00E5A3"];
                        
                        let glowClass = "";
                        if (idx === 0) glowClass = "shadow-[0_0_12px_rgba(255,255,255,0.7)]";
                        if (idx === 4) glowClass = "shadow-[0_0_20px_rgba(0,229,163,0.8)]";
                        if (isHovered && idx !== 0 && idx !== 4) glowClass = "shadow-[0_0_10px_rgba(255,255,255,0.3)]";

                        return (
                            <div 
                                key={idx} 
                                className="flex-1 flex flex-col items-center h-full justify-end relative cursor-pointer"
                                onMouseEnter={() => {
                                    setHoveredBar(idx);
                                    setTargetMargin(val === 95 ? 85 : val);
                                }}
                                onMouseLeave={() => {
                                    setHoveredBar(null);
                                    setTargetMargin(85);
                                }}
                            >
                                <motion.div
                                    className={`w-full rounded-[4px] relative ${glowClass}`}
                                    style={{
                                        height: `${val}%`,
                                        backgroundColor: barColors[idx],
                                        transformOrigin: "bottom"
                                    }}
                                    initial={{ scaleY: 0 }}
                                    animate={{ 
                                        scaleY: [0, 1, 1, 0],
                                        scaleX: isHovered ? 1.05 : 1,
                                        filter: isHovered ? "brightness(1.2)" : "brightness(1)"
                                    }}
                                    transition={{ 
                                        scaleY: { repeat: Infinity, duration: 6, ease: "easeInOut", times: [0, 0.4, 0.8, 1], delay: idx * 0.1 },
                                        scaleX: { duration: 0.5 },
                                        filter: { duration: 0.5 }
                                    }}
                                />
                                <span className={`absolute -bottom-5 text-[8.5px] font-bold transition-colors duration-200 ${
                                    isHovered ? "text-white" : idx === 4 ? "text-[#00E5A3]" : idx === 0 ? "text-[#FFFFFF]/80" : "text-white/30"
                                }`}>
                                    {barLabels[idx]}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Circular Target margin gauge */}
                <div className="flex flex-col items-center justify-center w-[40%] mt-8 relative z-10 pr-2">
                    <svg className="w-[75px] h-[75px] transform -rotate-90 overflow-visible">
                        <circle
                            cx="37.5"
                            cy="37.5"
                            r="30"
                            className="stroke-[#1D2E32]"
                            strokeWidth="5.5"
                            fill="transparent"
                        />
                        <motion.circle
                            cx="37.5"
                            cy="37.5"
                            r="30"
                            className="stroke-[#00E5A3] drop-shadow-[0_0_10px_rgba(0,229,163,0.8)]"
                            strokeWidth="5.5"
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 30}`}
                            animate={{
                                strokeDashoffset: `${2 * Math.PI * 30 * (1 - targetMargin / 100)}`
                            }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                        />
                    </svg>

                    {/* Central Text */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pt-0.5">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={targetMargin}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="text-[17px] font-bold text-white leading-none tracking-tight"
                            >
                                {targetMargin}%
                            </motion.span>
                        </AnimatePresence>
                        <span className="text-[5px] font-bold text-[#8E9B9E] mt-1 uppercase tracking-widest">Performance</span>
                    </div>
                </div>

            </div>

            {/* Description and Metadata */}
            <div className="mt-5 text-left">
                <h3 className="font-serif text-xl font-bold tracking-normal text-[#FFFFFF] leading-tight transition-colors duration-300 group-hover:text-[#00E5A3]">
                    Pharmacy Growth & Performance Strategy
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-[#8E9B9E] font-normal min-h-[48px]">
                    Optimize drug procurement pricing, secure alternative sourcing networks, and execute pricing models to enhance total margins.
                </p>
            </div>

            {/* Bottom section with metric and action */}
            <div className="mt-0 pt-0">
                <a
                    href="#growth"
                    className="flex items-center justify-between gap-4 bg-[#0F171A] rounded-xl p-4 group/btn transition-colors hover:bg-[#152024]"
                >
                    <div className="flex-1 pr-2">
                        <span className="text-[13px] text-gray-300 leading-snug block">
                            <span className="font-semibold text-white">+15-20%</span> standard margin amplification recorded across pharmacy departments.
                        </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] font-bold text-[#00E5A3] uppercase tracking-widest leading-tight text-left">
                            Grow My<br />Pharmacy
                        </span>
                        <span className="text-[#00E5A3] text-base transition-transform duration-300 group-hover/btn:translate-x-1">
                            →
                        </span>
                    </div>
                </a>
            </div>
        </div>
    );
}


// ==========================================
// MAIN UNIFIED SERVICES CARDS GRID COMPONENT
// ==========================================

export default function TestingSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    return (
        <section ref={sectionRef} className="relative w-full overflow-hidden font-montserrat">
            <div className="flex flex-col justify-center 2xl:py-30 px-12">
                <div className="relative z-10 w-full mt-20">
                    <div className="text-center mb-12 flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <h2 ref={headingRef} className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                            Operational Systems That Protect  <br />
                            <span className="text-teal-400">& Grow Pharmacy Revenue</span>
                        </h2>
                        <p ref={textRef} className="text-white/60 text-2xl max-w-4xl leading-relaxed">
                            We identify revenue leakage, reduce audit exposure, and optimize operations across your pharmacy using structured, data-driven systems.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        {/* Top row with 3 cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1800px] mx-auto w-full mb-6">
                            <RevenueIntelligenceCard />
                            <ComplianceAuditCard />
                            <ClaimsReimbursementCard />
                        </div>

                        {/* Bottom row with 2 cards centered */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1300px] mx-auto w-full">
                            <PatientOperationalCard />
                            <PharmacyGrowthCard />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
