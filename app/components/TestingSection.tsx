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
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/20 p-6 transition-all duration-300 hover:border-[#FF4A3A] hover:shadow-[0_0_20px_5px_rgba(255,74,58,0.6)] hover:-translate-y-2 hover:scale-[1.02] min-h-[360px]"
        >
            {/* Visual Animation Area */}
            <div className="relative flex flex-col h-[140px] w-full justify-between rounded-xl bg-transparent p-4 border border-white/20 overflow-hidden">
                {/* Badge — top right inside visual box */}
                <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#FF4A3A]/40 bg-[#FF4A3A]/5 text-[9px] font-mono font-bold uppercase tracking-widest text-[#FF4A3A] pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A3A]" />
                    Live Tracking
                </div>

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
                <p className="mt-2 text-[15px] leading-relaxed text-[#8E9B9E] font-normal min-h-[48px]">
                    Real-time revenue tracking that flags underpayments and recovers lost income automatically.
                </p>
            </div>

            {/* Bottom section with metric and action */}
            <div className="mt-0 pt-0">
                <a
                    href="#analyze"
                    className="flex items-center justify-between gap-4 bg-[#0F171A] rounded-xl p-4 group/btn transition-colors hover:bg-[#152024]"
                >
                    <div className="flex-1 min-w-0">
                        <span className="text-[12px] text-gray-300 leading-snug block whitespace-nowrap overflow-hidden text-ellipsis">
                            <span className="font-semibold text-white">$1.2M+</span> avg. underpayments recovered per store.
                        </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] font-bold text-[#FF4A3A] uppercase tracking-widest leading-tight text-left whitespace-nowrap">
                            Analyze Revenue
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
                {/* Badge — top right inside visual box */}
                <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/5 text-[9px] font-mono font-bold uppercase tracking-widest text-[#FF6B00] pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                    Auto-Route
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
                            stroke="#FF6B00"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            className="drop-shadow-[0_0_6px_rgba(255,107,0,0.5)]"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            key={activeRouteIndex}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />

                        {/* Flow particle traveler */}
                        {isRouting && (
                            <motion.circle
                                r="4"
                                fill="#FF6B00"
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
                                stroke="#FF6B00"
                                strokeWidth="1"
                                animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                            />
                            <circle cx="50" cy="50" r="5" fill="#FF6B00" />
                        </g>

                        {/* Hub Node (Middle) */}
                        <g>
                            <circle cx="120" cy="50" r="18" fill="rgba(255,107,0,0.08)" stroke="#FF6B00" strokeWidth="2" className="drop-shadow-[0_0_6px_rgba(255,107,0,0.3)]" />
                            <motion.circle
                                cx="120"
                                cy="50"
                                r="18"
                                fill="transparent"
                                stroke="#FF6B00"
                                strokeWidth="1"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            />
                            <circle cx="120" cy="50" r="8" fill="#FF6B00" />
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
                                        fill={isTarget ? "rgba(255,107,0,0.12)" : "rgba(255,255,255,0.04)"}
                                        stroke={isTarget ? "#FF6B00" : "rgba(255,255,255,0.15)"}
                                        strokeWidth="1.5"
                                        className="transition-colors duration-200"
                                    />
                                    <circle
                                        cx="215"
                                        cy={nodeY}
                                        r={isTarget ? "5.5" : "4"}
                                        fill={isTarget ? "#FF6B00" : "rgba(255,255,255,0.3)"}
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



                    {/* Live routing status readout */}
                    <div className="absolute left-2 bottom-1 max-w-[140px]">
                        <span className="text-[7.5px] font-mono text-gray-500 uppercase leading-none block">
                            Pipe Status:
                        </span>
                        <span className="text-[9px] font-mono font-bold text-[#FF6B00] uppercase mt-0.5 inline-block animate-pulse">
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
                <p className="mt-2 text-[15px] leading-relaxed text-[#8E9B9E] font-normal min-h-[48px]">
                    Automatically fix claim errors and maximize clean-claim reimbursement flow.
                </p>
            </div>

            {/* Bottom section with metric and action */}
            <div className="mt-0 pt-0">
                <a
                    href="#claims"
                    className="flex items-center justify-between gap-4 bg-[#0F171A] rounded-xl p-4 group/btn transition-colors hover:bg-[#152024]"
                >
                    <div className="flex-1">
                        <span className="text-[12px] text-gray-300 leading-snug block whitespace-nowrap">
                            <span className="font-semibold text-white">19%</span> increase in clean-claim recovery rates.
                        </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-widest leading-tight text-left whitespace-nowrap">
                            Fix My Claims
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
        { id: 0, title: "Audit Deficit", color: "#FF4A3A" },
        { id: 1, title: "Risk Mitigated", color: "#FF9F29" },
        { id: 2, title: "Protected", color: "#00E5A3" },
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
                {/* Badge — top right inside visual box */}
                <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#FF9F29]/40 bg-[#FF9F29]/5 text-[9px] font-mono font-bold uppercase tracking-widest text-[#FF9F29] pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F29]" />
                    Risk Control
                </div>

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

                    <div className="relative w-full flex justify-between items-center px-4 z-10">
                        {/* Track line — anchored from center of first to center of last circle */}
                        {/* px-4 = 16px, w-11/2 = 22px → left/right offset = 38px */}
                        <div className="absolute left-[38px] right-[38px] top-[22px] -translate-y-1/2 h-[2.5px] bg-white/10" />
                        <motion.div
                            className="absolute left-[38px] top-[22px] -translate-y-1/2 h-[2.5px] bg-[#fb923c] origin-left"
                            style={{ right: "38px" }}
                            initial={false}
                            animate={{
                                scaleX: activeStage === 0 ? 0 : activeStage === 1 ? 0.5 : 1
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        />

                        {/* Milestone 1 (Gap Scan) */}
                        <div
                            onClick={() => setActiveStage(0)}
                            className="flex flex-col items-center gap-2 relative cursor-pointer group/node"
                        >
                            <div
                                className={`w-11 h-11 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${activeStage === 0
                                    ? "bg-[#0a0f1d] border-[#fb923c] text-[#fb923c] scale-110 shadow-[0_0_15px_rgba(251,146,60,0.3)] font-mono"
                                    : "bg-[#0a0f1d] border-[#fb923c] text-[#fb923c]"
                                    }`}
                            >
                                {activeStage > 0 ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : (
                                    <span className="font-mono">01</span>
                                )}
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
                                    : activeStage > 1
                                        ? "bg-[#0a0f1d] border-[#fb923c] text-[#fb923c]"
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

                </div>
            </div>

            {/* Description and Metadata */}
            <div className="mt-5 text-left">
                <h3 className="font-serif text-xl font-bold tracking-normal text-[#FFFFFF] leading-tight transition-colors duration-300 group-hover:text-[#FF9F29]">
                    Compliance & Audit Protection
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#8E9B9E] font-normal min-h-[48px]">
                    Stay permanently audit-ready by detecting compliance gaps before they become liabilities.
                </p>
            </div>

            {/* Bottom section with metric and action */}
            <div className="mt-0 pt-0">
                <a
                    href="#audits"
                    className="flex items-center justify-between gap-2 bg-[#0F171A] rounded-xl p-4 group/btn transition-colors hover:bg-[#152024]"
                >
                    <div className="flex-1 min-w-0">
                        <span className="text-[12px] text-gray-300 leading-snug block whitespace-nowrap overflow-hidden text-ellipsis">
                            <span className="font-semibold text-white">87%</span> achieve full compliance within 30 days.
                        </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-bold text-[#FF9F29] uppercase tracking-widest leading-tight text-left whitespace-nowrap">
                            Check Audit Risk
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
    const [notifications, setNotifications] = useState<number[]>([0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setNotifications(prev => {
                const next = (prev[0] + 1) % OPERATIONS_QUEUE.length;
                return [next, ...prev].slice(0, 3);
            });
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            id="patient-operational-card"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/20 p-6 transition-all duration-300 hover:border-[#3B82F6] hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.6)] hover:-translate-y-2 hover:scale-[1.02] min-h-[380px]"
        >
            {/* Visual Animation Area */}
            <div className="relative flex min-h-[150px] w-full items-start justify-center rounded-xl bg-transparent p-3 border border-white/20 overflow-hidden">
                {/* Badge — top right inside visual box */}
                <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#3B82F6]/40 bg-[#3B82F6]/5 text-[9px] font-mono font-bold uppercase tracking-widest text-[#3B82F6] pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                    Ops Sync
                </div>

                {/* Notification Stack */}
                <div className="relative w-full max-w-[280px] h-[120px]">
                    <AnimatePresence>
                        {notifications.map((itemIndex, stackPos) => {
                            const item = OPERATIONS_QUEUE[itemIndex];
                            const isTop = stackPos === 0;
                            return (
                                <motion.div
                                    key={itemIndex}
                                    initial={{ opacity: 0, y: -40, scale: 1 }}
                                    animate={{
                                        opacity: isTop ? 1 : stackPos === 1 ? 0.6 : 0.35,
                                        y: stackPos * 10,
                                        scale: 1 - stackPos * 0.04,
                                    }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    style={{ zIndex: 10 - stackPos, position: "absolute", width: "100%" }}
                                    className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-[14px] p-3 flex flex-col gap-1.5 shadow-lg"
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
                                            <span className="text-[9px] text-white/50 font-semibold tracking-wide uppercase">System • {item.initials}</span>
                                        </div>
                                        <span className="text-[8.5px] text-white/40">{isTop ? "now" : `${stackPos * 2}m ago`}</span>
                                    </div>

                                    {/* Body */}
                                    <div className="flex flex-col text-left px-0.5 mt-0.5">
                                        <span className="text-[11px] font-bold text-white/90 leading-tight">{item.name}</span>
                                        <span className="text-[10px] text-white/60 line-clamp-2 leading-snug mt-0.5">{item.detail}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Description and Metadata */}
            <div className="mt-5 text-left">
                <h3 className="font-serif text-xl font-bold tracking-normal text-[#FFFFFF] leading-tight transition-colors duration-300 group-hover:text-[#3B82F6]">
                    Patient & Operational Support Systems
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#8E9B9E] font-normal min-h-[48px]">
                    Streamline every pharmacy workflow from patient onboarding to team coordination.
                </p>
            </div>

            {/* Bottom section with metric and action */}
            <div className="mt-0 pt-0">
                <a
                    href="#operations"
                    className="flex items-center justify-between gap-4 bg-[#0F171A] rounded-xl p-4 group/btn transition-colors hover:bg-[#152024]"
                >
                    <div className="flex-1">
                        <span className="text-[12px] text-gray-300 leading-snug block whitespace-nowrap">
                            <span className="font-semibold text-white">30%</span> reduction in bottlenecks.
                        </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-widest leading-tight text-left whitespace-nowrap">
                            Improve Operations
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
            <div className="relative flex h-[160px] w-full items-center justify-center rounded-xl bg-transparent p-4 border border-white/20 overflow-hidden">
                {/* Badge — top right inside visual box */}
                <div className="absolute top-3 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00E5A3]/40 bg-[#00E5A3]/5 text-[9px] font-mono font-bold uppercase tracking-widest text-[#00E5A3] pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A3]" />
                    Growth AI
                </div>

                {/* Pure SVG layout matching the mockup exactly with animations */}
                <svg className="w-full h-[130px] mt-6 overflow-visible" viewBox="0 0 500 130" fill="none">
                    {/* Horizontal axis line */}
                    <line x1="20" y1="110" x2="480" y2="110" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

                    {/* Five neon green bars - Looping grow/collapse animation */}
                    {/* M1 Bar: final height 30 */}
                    <motion.rect
                        x="35"
                        width="55"
                        rx="6"
                        fill="#00E5A3"
                        className="drop-shadow-[0_0_8px_rgba(0,229,163,0.5)] cursor-pointer"
                        animate={{ y: [110, 110, 80, 80, 110], height: [0, 0, 30, 30, 0] }}
                        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, times: [0, 0.05, 0.25, 0.75, 1], delay: 0 }}
                    />
                    {/* M2 Bar: final height 48 */}
                    <motion.rect
                        x="130"
                        width="55"
                        rx="6"
                        fill="#00E5A3"
                        className="drop-shadow-[0_0_8px_rgba(0,229,163,0.5)] cursor-pointer"
                        animate={{ y: [110, 110, 62, 62, 110], height: [0, 0, 48, 48, 0] }}
                        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, times: [0, 0.05, 0.3, 0.75, 1], delay: 0.12 }}
                    />
                    {/* M3 Bar: final height 32 */}
                    <motion.rect
                        x="225"
                        width="55"
                        rx="6"
                        fill="#00E5A3"
                        className="drop-shadow-[0_0_8px_rgba(0,229,163,0.5)] cursor-pointer"
                        animate={{ y: [110, 110, 78, 78, 110], height: [0, 0, 32, 32, 0] }}
                        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, times: [0, 0.05, 0.35, 0.75, 1], delay: 0.22 }}
                    />
                    {/* M4 Bar: final height 64 */}
                    <motion.rect
                        x="320"
                        width="55"
                        rx="6"
                        fill="#00E5A3"
                        className="drop-shadow-[0_0_8px_rgba(0,229,163,0.5)] cursor-pointer"
                        animate={{ y: [110, 110, 46, 46, 110], height: [0, 0, 64, 64, 0] }}
                        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, times: [0, 0.05, 0.4, 0.75, 1], delay: 0.32 }}
                    />
                    {/* M5 Bar: final height 86 */}
                    <motion.rect
                        x="415"
                        width="55"
                        rx="6"
                        fill="#00E5A3"
                        className="drop-shadow-[0_0_8px_rgba(0,229,163,0.5)] cursor-pointer"
                        animate={{ y: [110, 110, 24, 24, 110], height: [0, 0, 86, 86, 0] }}
                        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, times: [0, 0.05, 0.45, 0.75, 1], delay: 0.42 }}
                    />

                    {/* Labels below the axis */}
                    <text x="62.5" y="126" fill="rgba(255,255,255,0.6)" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat, sans-serif">M1</text>
                    <text x="157.5" y="126" fill="rgba(255,255,255,0.6)" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat, sans-serif">M2</text>
                    <text x="252.5" y="126" fill="rgba(255,255,255,0.6)" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat, sans-serif">M3</text>
                    <text x="347.5" y="126" fill="rgba(255,255,255,0.6)" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat, sans-serif">M4</text>
                    <text x="442.5" y="126" fill="#00E5A3" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="Montserrat, sans-serif">M5</text>

                    {/* Animated Line Graph — continuous float + looping trace */}
                    <motion.g
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                    >
                        {/* Green line path — traces in then out on loop */}
                        <motion.path
                            d="M 62.5 70 L 157.5 45 L 252.5 58 L 347.5 28 L 442.5 12"
                            stroke="#00E5A3"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="drop-shadow-[0_0_6px_rgba(0,229,163,0.8)]"
                            animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, times: [0, 0.45, 0.75, 1] }}
                        />

                        {/* Dot above M2 */}
                        <motion.circle
                            cx="157.5" cy="45" r="4.5"
                            fill="#00E5A3" stroke="#00E5A3" strokeWidth="1"
                            className="drop-shadow-[0_0_6px_rgba(0,229,163,0.8)]"
                            animate={{ scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
                            style={{ transformOrigin: "157.5px 45px" }}
                            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, times: [0, 0.28, 0.45, 0.75, 1] }}
                        />
                        {/* Dot above M3 */}
                        <motion.circle
                            cx="252.5" cy="58" r="4.5"
                            fill="#00E5A3" stroke="#00E5A3" strokeWidth="1"
                            className="drop-shadow-[0_0_6px_rgba(0,229,163,0.8)]"
                            animate={{ scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
                            style={{ transformOrigin: "252.5px 58px" }}
                            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, times: [0, 0.34, 0.45, 0.75, 1] }}
                        />
                        {/* Dot above M4 */}
                        <motion.circle
                            cx="347.5" cy="28" r="4.5"
                            fill="#00E5A3" stroke="#00E5A3" strokeWidth="1"
                            className="drop-shadow-[0_0_6px_rgba(0,229,163,0.8)]"
                            animate={{ scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
                            style={{ transformOrigin: "347.5px 28px" }}
                            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, times: [0, 0.39, 0.45, 0.75, 1] }}
                        />

                        {/* Arrowhead at end of line */}
                        <motion.polygon
                            points="442.5,12 430,19 432,9"
                            fill="#00E5A3"
                            className="drop-shadow-[0_0_6px_rgba(0,229,163,0.8)]"
                            animate={{ scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
                            style={{ transformOrigin: "442.5px 12px" }}
                            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, times: [0, 0.43, 0.5, 0.75, 1] }}
                        />
                    </motion.g>
                </svg>
            </div>

            {/* Description and Metadata */}
            <div className="mt-5 text-left">
                <h3 className="font-serif text-xl font-bold tracking-normal text-[#FFFFFF] leading-tight transition-colors duration-300 group-hover:text-[#00E5A3]">
                    Pharmacy Growth & Performance Strategy
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#8E9B9E] font-normal min-h-[48px]">
                    Optimize procurement pricing and sourcing to grow your pharmacy's total margins.
                </p>
            </div>

            {/* Bottom section with metric and action */}
            <div className="mt-0 pt-0">
                <a
                    href="#growth"
                    className="flex items-center justify-between gap-4 bg-[#0F171A] rounded-xl p-4 group/btn transition-colors hover:bg-[#152024]"
                >
                    <div className="flex-1">
                        <span className="text-[12px] text-gray-300 leading-snug block whitespace-nowrap">
                            <span className="font-semibold text-white">+15-20%</span> margin amplification across departments.
                        </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] font-bold text-[#00E5A3] uppercase tracking-widest leading-tight text-left whitespace-nowrap">
                            Grow My Pharmacy
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
