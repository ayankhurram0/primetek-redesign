import React, { useState, useEffect } from "react";
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
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1C2C30] bg-[#111C1F] p-6 transition-all duration-300 hover:border-[#FF4A3A]/40 hover:shadow-2xl hover:shadow-[#FF4A3A]/5 min-h-[430px]"
        >
            {/* Visual Animation Area */}
            <div className="relative flex flex-col h-[180px] w-full justify-between rounded-xl bg-[#090E11] p-4 border border-[#162225] overflow-hidden">

                {/* Luminous Sweeping Line representing real-time telemetry scans */}
                <motion.div
                    className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#FF4A3A]/60 to-transparent z-10 pointer-events-none"
                    animate={{ x: ["30px", "330px", "30px"] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                />

                {/* Top bar logic & category pill */}
                <div className="flex items-center justify-between z-10">
                    <div className="flex gap-1 bg-[#10171A] p-0.5 rounded-lg border border-[#1C2C30]">
                        <button
                            onClick={() => setActiveSet("reimbursements")}
                            className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${activeSet === "reimbursements"
                                ? "bg-[#FF4A3A] text-white"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Trends
                        </button>
                        <button
                            onClick={() => setActiveSet("underpayments")}
                            className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${activeSet === "underpayments"
                                ? "bg-[#FF4A3A] text-white"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Audits
                        </button>
                        <button
                            onClick={() => setActiveSet("cashflow")}
                            className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${activeSet === "cashflow"
                                ? "bg-[#FF4A3A] text-white"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Flow
                        </button>
                    </div>

                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#1A1110] border border-[#FF4A3A]/30 text-[9px] font-mono text-[#FF4A3A] font-bold uppercase tracking-widest animate-pulse">
                        <Activity className="h-2.5 w-2.5" />
                        <span>Telemetry active</span>
                    </span>
                </div>

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
            <div className="mt-4 pt-4 border-t border-[#1C2C30] flex flex-col justify-between gap-3 bg-[#090E11]/40 rounded-xl p-3">
                <div className="flex flex-col">
                    <span className="text-xl font-mono font-extrabold text-[#FFFFFF] tracking-tight">
                        $1.2M+
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono mt-0.5 leading-snug">
                        Average annual underpayments identified & recovered per store.
                    </span>
                </div>

                <a
                    href="#analyze"
                    className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider font-bold text-[#FF4A3A] hover:text-[#FFFFFF] transition-colors duration-200 cursor-pointer pt-1"
                >
                    <span>Analyze Revenue</span>
                    <span className="text-xs transition-transform duration-200 translate-x-0 group-hover:translate-x-1">
                        →
                    </span>
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
        { label: "NPI Resolution", status: "Matched", color: "text-[#FF4A3A]" },
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
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1C2C30] bg-[#111C1F] p-6 transition-all duration-300 hover:border-[#FF4A3A]/40 hover:shadow-2xl hover:shadow-[#FF4A3A]/5 min-h-[430px]"
        >
            {/* Visual Animation Area */}
            <div className="relative flex flex-col h-[180px] w-full justify-between rounded-xl bg-[#090E11] p-4 border border-[#162225] overflow-hidden">

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
                            stroke="#ff5c4d"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            className="drop-shadow-[0_0_6px_rgba(255,92,77,0.4)]"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            key={activeRouteIndex}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />

                        {/* Flow particle traveler */}
                        {isRouting && (
                            <motion.circle
                                r="4"
                                fill="#ff5c4d"
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
                                stroke="#ff5c4d"
                                strokeWidth="1"
                                animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                            />
                            <circle cx="50" cy="50" r="5" fill="#ff5c4d" />
                        </g>

                        {/* Hub Node (Middle) */}
                        <g>
                            <circle cx="120" cy="50" r="18" fill="rgba(255,92,77,0.08)" stroke="#ff5c4d" strokeWidth="2" className="drop-shadow-[0_0_6px_rgba(255,92,77,0.3)]" />
                            <motion.circle
                                cx="120"
                                cy="50"
                                r="18"
                                fill="transparent"
                                stroke="#ff5c4d"
                                strokeWidth="1"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            />
                            <circle cx="120" cy="50" r="8" fill="#ff5c4d" />
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
                                        fill={isTarget ? "rgba(255,92,77,0.12)" : "rgba(255,255,255,0.04)"}
                                        stroke={isTarget ? "#ff5c4d" : "rgba(255,255,255,0.15)"}
                                        strokeWidth="1.5"
                                        className="transition-colors duration-200"
                                    />
                                    <circle
                                        cx="215"
                                        cy={nodeY}
                                        r={isTarget ? "5.5" : "4"}
                                        fill={isTarget ? "#ff5c4d" : "rgba(255,255,255,0.3)"}
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
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5c4d] animate-pulse" />
                        <span>Optimized Routing</span>
                    </div>

                    {/* Live routing status readout */}
                    <div className="absolute left-2 bottom-1 max-w-[140px]">
                        <span className="text-[7.5px] font-mono text-gray-500 uppercase leading-none block">
                            Pipe Status:
                        </span>
                        <span className="text-[9px] font-mono font-bold text-[#ff5c4d] uppercase mt-0.5 inline-block animate-pulse">
                            {isRouting ? "processing..." : routeStatus}
                        </span>
                    </div>
                </div>
            </div>

            {/* Description and Metadata */}
            <div className="mt-5 text-left">
                <h3 className="font-serif text-xl font-bold tracking-normal text-[#FFFFFF] leading-tight transition-colors duration-300 group-hover:text-[#FF4A3A]">
                    Claims & Reimbursement Optimization
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-[#8E9B9E] font-normal min-h-[48px]">
                    Reduce claim submission errors, automatically flag local rule violations, fix rejection trends, and maximize clean-claim reimbursement flow.
                </p>
            </div>

            {/* Bottom section with metric and action */}
            <div className="mt-4 pt-4 border-t border-[#1C2C30] flex flex-col justify-between gap-3 bg-[#090E11]/40 rounded-xl p-3">
                <div className="flex flex-col">
                    <span className="text-xl font-mono font-extrabold text-[#FFFFFF] tracking-tight">
                        Up to 19%
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono mt-0.5 leading-snug">
                        Sustained increase in clean-claim recovery rates across locations.
                    </span>
                </div>

                <a
                    href="#claims"
                    className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider font-bold text-[#FF4A3A] hover:text-[#FFFFFF] transition-colors duration-200 cursor-pointer pt-1"
                >
                    <span>Fix My Claims</span>
                    <span className="text-xs transition-transform duration-200 translate-x-0 group-hover:translate-x-1">
                        →
                    </span>
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
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-[#FF9F29] bg-[#111C1F] p-6 glow-amber-strong transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF9F29]/10 hover:translate-y-[-2px] min-h-[430px]"
        >
            {/* Visual Animation Area */}
            <div className="relative flex h-[180px] w-full flex-col justify-between rounded-xl bg-[#090E11] p-4 border border-[#FF9F29]/20 overflow-hidden">

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
            <div className="mt-4 pt-4 border-t border-[#1C2C30] flex flex-col justify-between gap-3 bg-[#0A1412] rounded-xl p-3">
                <div className="flex flex-col">
                    <span className="text-xl font-mono font-extrabold text-[#FF9F29] tracking-tight">
                        87%
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono mt-0.5 leading-snug">
                        Of active pharmacy users attain total compliance within 30 days of setup.
                    </span>
                </div>

                <a
                    href="#audits"
                    className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider font-bold text-[#FF9F29] hover:text-[#FFFFFF] transition-colors duration-200 cursor-pointer pt-1"
                >
                    <span>Check Audit Risk</span>
                    <span className="text-xs transition-transform duration-200 translate-x-0 group-hover:translate-x-1">
                        →
                    </span>
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
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1C2C30] bg-[#111C1F] p-6 transition-all duration-300 hover:border-[#00E5A3]/40 hover:shadow-2xl hover:shadow-[#00E5A3]/5 min-h-[420px]"
        >
            {/* Visual Animation Area */}
            <div className="relative flex h-[180px] w-full items-center justify-center rounded-xl bg-[#090E11] p-4 border border-[#162225] overflow-hidden">

                {/* Support Action Queue Mock Widget from Case 3 */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={queueIndex}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-[280px] bg-white/[0.03] border border-white/10 rounded-xl p-3 flex flex-col gap-2.5 backdrop-blur-md relative overflow-hidden shadow-xl"
                    >
                        {/* Ambient blue background blur circle */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                {/* Calendar system icon */}
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                </div>
                                <div className="flex flex-col text-left min-w-0">
                                    <span className="text-[10px] font-bold text-white truncate max-w-[130px]">{currentItem.name}</span>
                                    <span className="text-[7.5px] text-white/40 uppercase tracking-wider font-mono">Daily Queue</span>
                                </div>
                            </div>

                            {/* Status dynamic pill */}
                            <motion.span
                                animate={profileState === "Scanning" ? { opacity: [1, 0.4, 1] } : {}}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className={`px-2 py-0.5 rounded-full text-[7.5px] font-mono font-bold uppercase tracking-wider ${profileState === "Verified"
                                    ? "bg-[#00E5A3]/15 text-[#00E5A3] border border-[#00E5A3]/25"
                                    : profileState === "Scanning"
                                        ? "bg-amber-400/15 text-amber-400 border border-amber-400/25 animate-pulse"
                                        : "bg-blue-500/15 text-blue-400 border border-blue-500/25"
                                    }`}
                            >
                                {profileState === "In Review" ? "Active" : profileState}
                            </motion.span>
                        </div>

                        {/* Description body */}
                        <div className="h-[32px] overflow-hidden text-left pl-0.5">
                            <p className="text-[8.5px] text-[#8E9B9E] leading-relaxed line-clamp-2">
                                {currentItem.detail}
                            </p>
                        </div>

                        {/* Horizontal line divider */}
                        <div className="h-[1px] bg-white/5 my-0.5" />

                        {/* Next scheduled Sync from Case 3 / Interactive Action Buttons */}
                        <div className="flex justify-between items-center gap-2 pt-0.5">
                            <div className="flex items-center gap-1.5 text-[8.5px] font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-white font-bold">Sync: Today, 6:00 PM</span>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => handleAction("Verified")}
                                    disabled={profileState === "Verified" || isVerifying}
                                    className="px-2.5 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-[8px] font-mono font-bold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    {isVerifying ? "Scanning" : "Verify"}
                                </button>
                                <button
                                    onClick={() => handleAction("Snoozed")}
                                    disabled={profileState === "Snoozed" || isVerifying}
                                    className="px-2 py-1 rounded bg-[#1C2D31] hover:bg-[#253E43] text-gray-400 hover:text-white text-[8px] font-mono uppercase tracking-wider transition-all cursor-pointer"
                                >
                                    Hold
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Counter floating stat */}
                <div className="absolute bottom-2.5 left-2.5 z-10">
                    <span className="text-[7.5px] font-mono text-gray-500 block uppercase leading-none">
                        Queue Resolved
                    </span>
                    <span className="text-[10px] font-mono font-bold text-white mt-0.5 block">
                        {approvalCount} orders
                    </span>
                </div>
            </div>

            {/* Description and Metadata */}
            <div className="mt-5 text-left">
                <h3 className="font-serif text-xl font-bold tracking-normal text-[#FFFFFF] leading-tight transition-colors duration-300 group-hover:text-[#00E5A3]">
                    Patient & Operational Support Systems
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-[#8E9B9E] font-normal min-h-[48px]">
                    Standardize pharmacy workflows, secure team collaboration grids, automate client coordination queues, and eliminate patient onboarding bottlenecks.
                </p>
            </div>

            {/* Bottom section with metric and action */}
            <div className="mt-4 pt-4 border-t border-[#1C2C30] flex flex-col justify-between gap-3 bg-[#090E11]/40 rounded-xl p-3">
                <div className="flex flex-col">
                    <span className="text-xl font-mono font-extrabold text-[#00E5A3] tracking-tight">
                        30%
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono mt-0.5 leading-snug">
                        Measured reduction in clinical file workflows bottlenecks.
                    </span>
                </div>

                <a
                    href="#operations"
                    className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider font-bold text-[#00E5A3] hover:text-[#FFFFFF] transition-colors duration-200 cursor-pointer pt-1"
                >
                    <span>Improve Operations</span>
                    <span className="text-xs transition-transform duration-200 translate-x-0 group-hover:translate-x-1">
                        →
                    </span>
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
    const [targetMargin, setTargetMargin] = useState<number>(78);

    const bars = [
        { label: "Sourcing", height: 85, value: "$84K", color: "bg-[#00E5A3]", dialVal: 85 },
        { label: "Pricing", height: 60, value: "$61K", color: "bg-[#00E0E5]", dialVal: 60 },
        { label: "Margin", height: 78, value: "22%", color: "bg-[#AAFF00]", dialVal: 78 },
        { label: "Contracts", height: 45, value: "11 store", color: "bg-[#FF9F29]", dialVal: 45 },
    ];

    // Auto-cycle highlighted segment over time if user is not actively placing their mouse layout
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (hoveredBar === null) {
                setHoveredBar(index);
                setTargetMargin(bars[index % bars.length].dialVal);
                index = (index + 1) % 5; // supporting 5 virtual indices
            }
        }, 3500);

        return () => clearInterval(interval);
    }, [hoveredBar]);

    return (
        <div
            id="pharmacy-growth-card"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1C2C30] bg-[#111C1F] p-6 transition-all duration-300 hover:border-[#00E5A3]/40 hover:shadow-2xl hover:shadow-[#00E5A3]/5 min-h-[420px]"
        >
            {/* Visual Animation Area */}
            <div className="relative flex h-[180px] w-full items-center justify-between rounded-xl bg-[#090E11] p-4 border border-[#162225] overflow-hidden">

                {/* Category Pill */}
                <div className="absolute top-3 left-3 z-10">
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#081C17] border border-[#00E5A3]/25 text-[9px] font-mono text-[#00E5A3] font-bold uppercase tracking-widest animate-pulse">
                        <Percent className="h-2.5 w-2.5" />
                        <span>analytics</span>
                    </span>
                </div>

                {/* Five Rising Growth Bars from Case 4 */}
                <div className="w-[58%] flex items-end justify-between h-20 gap-2.5 max-w-[200px] select-none z-10 mt-6 pl-1">
                    {[45, 60, 78, 65, 95].map((val, idx) => {
                        const isHovered = hoveredBar === idx;
                        const barLabels = ["M1", "M2", "M3", "M4", "M5"];
                        const colors = ["#00E5A3", "#00E0E5", "#00E5A3", "#FF9F29", "#00E5A3"];

                        return (
                            <div
                                key={idx}
                                className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer relative"
                                onMouseEnter={() => {
                                    setHoveredBar(idx);
                                    setTargetMargin(val);
                                }}
                                onMouseLeave={() => {
                                    setHoveredBar(null);
                                    setTargetMargin(78);
                                }}
                            >
                                {/* Visual pillar column */}
                                <div className="w-full bg-white/5 rounded-t-sm relative overflow-hidden h-full">
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 rounded-t-sm transition-all duration-500 shadow-[0_0_8px_rgba(0,229,163,0.15)]"
                                        style={{
                                            height: `${val}%`,
                                            backgroundColor: isHovered ? "#FFFFFF" : idx === 4 ? "#00E5A3" : `${colors[idx % colors.length]}70`
                                        }}
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        transition={{ delay: idx * 0.08, duration: 0.6 }}
                                    />
                                </div>

                                {/* Sub-label indices M1...M5 matching Case 4 */}
                                <span className={`text-[8px] font-bold mt-1.5 transition-colors duration-200 ${isHovered ? "text-white font-black" : idx === 4 ? "text-[#00E5A3]" : "text-white/20"
                                    }`}>
                                    {barLabels[idx]}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Circular Target margin gauge (Right half) */}
                <div className="flex flex-col items-center justify-center w-[35%] mt-6 relative z-10 pr-2">
                    <svg className="w-14 h-14 transform -rotate-90">
                        <circle
                            cx="28"
                            cy="28"
                            r="22"
                            className="stroke-[#1D2E32]"
                            strokeWidth="3.5"
                            fill="transparent"
                        />
                        <motion.circle
                            cx="28"
                            cy="28"
                            r="22"
                            className="stroke-[#00E5A3]"
                            strokeWidth="3.5"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 22}`}
                            animate={{
                                strokeDashoffset: `${2 * Math.PI * 22 * (1 - targetMargin / 100)}`
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                    </svg>

                    {/* Central Percentage */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-1 shadow-md flex flex-col items-center">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={targetMargin}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="text-[10px] font-mono font-bold text-white leading-none"
                            >
                                {targetMargin}%
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Floating Bouncing Lightning Bolt from Case 4 */}
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="absolute right-4 top-3.5 w-7 h-7 rounded-full border border-[#00E5A3]/30 bg-[#0a0f1d] flex items-center justify-center shadow-[0_0_12px_rgba(0,229,163,0.25)] text-[#00E5A3]"
                >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                </motion.div>

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
            <div className="mt-4 pt-4 border-t border-[#1C2C30] flex flex-col justify-between gap-3 bg-[#090E11]/40 rounded-xl p-3">
                <div className="flex flex-col">
                    <span className="text-xl font-mono font-extrabold text-[#00E5A3] tracking-tight">
                        +15-20%
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono mt-0.5 leading-snug">
                        Standard margin amplification recorded across pharmacy departments.
                    </span>
                </div>

                <a
                    href="#growth"
                    className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider font-bold text-[#00E5A3] hover:text-[#FFFFFF] transition-colors duration-200 cursor-pointer pt-1"
                >
                    <span>Grow My Pharmacy</span>
                    <span className="text-xs transition-transform duration-200 translate-x-0 group-hover:translate-x-1">
                        →
                    </span>
                </a>
            </div>
        </div>
    );
}


// ==========================================
// MAIN UNIFIED SERVICES CARDS GRID COMPONENT
// ==========================================

export default function Services() {
    return (
        <div id="services-section" className="flex flex-col gap-6 w-full">
            {/* Top row with 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <RevenueIntelligenceCard />
                <ClaimsReimbursementCard />
                <ComplianceAuditCard />
            </div>

            {/* Bottom row with 2 cards centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
                <PatientOperationalCard />
                <PharmacyGrowthCard />
            </div>
        </div>
    );
}
