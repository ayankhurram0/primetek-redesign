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
}

export default function FancyButton({
    label = "Click Me",
    textColor = "white",
    borderColor = "white",
    rippleColor = "white",
    bgColor = "transparent",
    extraClasses = "",
    onClick,
    icon,
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

    return (
        <button
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                onMouseMove={handleMove}
                onClick={onClick}
                className={`relative overflow-hidden px-6 py-3 rounded-full border font-medium text-${textColor} border-${borderColor} ${extraClasses}`}
                style={{ backgroundColor: bgColor }}
            >
                {mounted && (
                    <span
                        className="pointer-events-none absolute w-[180%] aspect-square rounded-full transition-transform duration-300 ease-out"
                        style={{
                            left: `${pos.x}%`,
                            top: `${pos.y}%`,
                            backgroundColor: rippleColor,
                            transform: `translate(-50%, -50%) scale(${show ? 1 : 0})`,
                        }}
                    />
                )}

                <span className="relative z-10 flex items-center gap-2">
                    {label}
                    {icon}
                </span>
            </button>
    );
}