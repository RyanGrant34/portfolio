"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FeyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function FeyButton({ className, children, icon, ...props }: FeyButtonProps) {
  return (
    <button
      className={cn(
        "group relative flex items-center justify-center gap-1.5",
        "h-10 min-w-[160px] whitespace-nowrap px-6 py-2",
        "text-sm font-mono font-semibold tracking-wide uppercase",
        "text-[var(--ink)] bg-[var(--accent)]",
        "border border-[var(--accent)]",
        "transition-all duration-200",
        "hover:bg-transparent hover:text-[var(--accent)]",
        "hover:shadow-[0_0_20px_rgba(0,255,136,0.2),0_0_60px_rgba(0,255,136,0.05)]",
        "active:scale-[0.98]",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-1.5">
        {icon}
        {children}
      </span>
    </button>
  );
}
