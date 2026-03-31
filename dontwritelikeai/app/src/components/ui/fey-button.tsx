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
        "h-10 min-w-[160px] whitespace-nowrap rounded-[28px] px-5 py-2",
        "text-sm font-semibold leading-tight",
        "text-[var(--paper)]",
        "bg-[radial-gradient(61.35%_50.07%_at_48.58%_50%,rgb(0,0,0)_0%,rgba(255,255,255,0.04)_100%)]",
        "[box-shadow:inset_0_0_0_0.5px_rgba(200,194,182,0.2),inset_1px_1px_0_-0.5px_rgba(200,194,182,0.3),inset_-1px_-1px_0_-0.5px_rgba(200,194,182,0.3)]",
        "after:absolute after:inset-0 after:rounded-[28px] after:opacity-0 after:transition-opacity after:duration-200",
        "after:bg-[radial-gradient(61.35%_50.07%_at_48.58%_50%,rgb(0,0,0)_0%,rgb(34,30,25)_100%)]",
        "after:[box-shadow:inset_0_0_0_0.5px_rgba(200,194,182,0.25),inset_1px_1px_0_-0.5px_rgba(200,194,182,0.35),inset_-1px_-1px_0_-0.5px_rgba(200,194,182,0.35),0_0_6px_rgba(194,54,22,0.15)]",
        "hover:after:opacity-100",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "transition-transform active:scale-[0.98]",
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
