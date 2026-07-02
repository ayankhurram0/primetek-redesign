"use client";
import { useState, useEffect, MouseEvent } from "react";

interface FancyButtonProps {
    label?: string;
    textColor?: string;
    borderColor?: string;
    rippleColor?: string;
    bgColor?: string;
    extraClasses?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    variant?: "primary" | "secondary" | "outline" | "custom";
    type?: "button" | "submit" | "reset";
}

export default function FancyButton({
    label = "Click Me",
    textColor = "white",
    borderColor = "white",
    rippleColor = "rgba(255,255,255,0.3)",
    bgColor = "transparent",
    extraClasses = "",
    onClick,
    icon,
    variant = "primary",
    type = "button",
}: FancyButtonProps) {
    const [pos, setPos] = useState({ x: 50, y: 50 });
    const [show, setShow] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setPos({ x, y });
    };

    const getVariantClasses = () => {
        if (variant === "primary") {
            return "bg-gradient-to-r from-[#14b8a6] via-[#10b981] to-[#0f766e] bg-[length:200%_auto] hover:bg-right transition-all font-bold shadow-[inset_0px_2px_4px_rgba(255,255,255,0.4),0px_4px_25px_rgba(20,184,166,0.6)] ring-1 ring-white/20 border-transparent text-white drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.6)]";
        }
        if (variant === "secondary") {
            return "bg-gradient-to-r from-[#2b4c8c] via-blue-500 to-[#2b4c8c] bg-[length:200%_auto] hover:bg-right transition-all font-bold shadow-[0_0_20px_rgba(43,76,140,0.3)] border-transparent text-white drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.6)]";
        }
        if (variant === "outline") {
            return `bg-transparent border border-ink/20 text-ink hover:bg-ink/5`;
        }
        return `border border-${borderColor} text-${textColor}`;
    };

    return (
        <button
            type={type}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onMouseMove={handleMove}
            onClick={onClick}
            className={`relative overflow-hidden px-6 py-3 rounded-full transition-all duration-500 ${getVariantClasses()} ${extraClasses}`}
            style={variant === 'custom' ? { backgroundColor: bgColor } : {}}
        >
            {mounted && (
                <span
                    className="pointer-events-none absolute w-[180%] aspect-square rounded-full transition-transform duration-300 ease-out"
                    style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        background: rippleColor,
                        transform: `translate(-50%, -50%) scale(${show ? 1 : 0})`,
                    }}
                />
            )}

            <span className="relative z-10 flex items-center justify-center gap-2">
                {label}
                {icon}
            </span>
        </button>
    );
}