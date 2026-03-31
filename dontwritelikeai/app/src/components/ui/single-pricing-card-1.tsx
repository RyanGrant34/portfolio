"use client";
import React, { useState } from "react";
import { PlusIcon, ShieldCheckIcon, Zap, Infinity } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";
import { BorderTrail } from "./border-trail";
import { FeyButton } from "./fey-button";

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="relative overflow-hidden py-20">
      <div id="pricing" className="mx-auto w-full max-w-4xl space-y-5 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl space-y-4"
        >
          <div className="flex justify-center">
            <div className="border border-[var(--ghost)] py-1 px-4 font-mono text-[0.65rem] text-[var(--accent)] uppercase tracking-[0.2em]">
              // pricing
            </div>
          </div>
          <h2
            className="mt-5 text-center text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl text-[var(--paper)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Free rewrites. Or go unlimited.
          </h2>
          <p className="text-[var(--muted)] mt-5 text-center text-sm font-mono">
            Three free rewrites a day covers most people. But if you write for a
            living, the math changes fast.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <span
              className={cn(
                "text-sm font-mono transition-colors",
                !yearly ? "text-[var(--paper)]" : "text-[var(--muted)]"
              )}
            >
              Monthly
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className={cn(
                "relative w-11 h-6 rounded-full transition-colors border",
                yearly
                  ? "bg-[var(--accent)]/20 border-[var(--accent)]"
                  : "bg-[var(--ghost)]/20 border-[var(--ghost)]"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform",
                  yearly
                    ? "translate-x-5 bg-[var(--accent)]"
                    : "bg-[var(--muted)]"
                )}
              />
            </button>
            <span
              className={cn(
                "text-sm font-mono transition-colors",
                yearly ? "text-[var(--paper)]" : "text-[var(--muted)]"
              )}
            >
              Yearly
            </span>
            {yearly && (
              <Badge className="bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30 text-[0.6rem] font-mono">
                Save 33%
              </Badge>
            )}
          </div>
        </motion.div>

        <div className="relative">
          <div
            className={cn(
              "z--10 pointer-events-none absolute inset-0 size-full",
              "bg-[linear-gradient(to_right,var(--ghost)_1px,transparent_1px),linear-gradient(to_bottom,var(--ghost)_1px,transparent_1px)]",
              "bg-[size:48px_48px] opacity-[0.06]",
              "[mask-image:radial-gradient(ellipse_at_center,var(--ink)_10%,transparent)]"
            )}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="mx-auto w-full max-w-2xl space-y-3"
          >
            <div className="grid md:grid-cols-2 bg-[var(--ink)] relative border border-[var(--ghost)]/60 p-4">
              <PlusIcon className="absolute -top-3 -left-3 size-5 text-[var(--ghost)]/50" />
              <PlusIcon className="absolute -top-3 -right-3 size-5 text-[var(--ghost)]/50" />
              <PlusIcon className="absolute -bottom-3 -left-3 size-5 text-[var(--ghost)]/50" />
              <PlusIcon className="absolute -right-3 -bottom-3 size-5 text-[var(--ghost)]/50" />

              {/* Free Tier */}
              <div className="w-full px-4 pt-5 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="leading-none font-mono font-semibold text-[var(--paper)] uppercase tracking-wider text-sm">
                      Free
                    </h3>
                    <div className="flex items-center gap-x-1">
                      <Zap className="w-3.5 h-3.5 text-[var(--muted)]" />
                      <span className="text-[var(--muted)] text-xs font-mono">
                        3 / day
                      </span>
                    </div>
                  </div>
                  <p className="text-[var(--muted)] text-sm">
                    Enough for quick fixes and one-offs.
                  </p>
                </div>
                <div className="mt-10 space-y-4">
                  <div className="text-[var(--muted)] flex items-end gap-0.5 text-xl font-mono">
                    <span className="text-[var(--paper)] -mb-0.5 text-4xl font-extrabold tracking-tighter md:text-5xl">
                      $0
                    </span>
                    <span>/forever</span>
                  </div>
                  <a href="/login">
                    <FeyButton className="w-full bg-transparent text-[var(--paper)] border-[var(--ghost)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
                      Start Rewriting
                    </FeyButton>
                  </a>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-[var(--muted)] font-mono">
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--ghost)]">-</span> 3 rewrites
                    per day
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--ghost)]">-</span> 5,000
                    character limit
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--ghost)]">-</span> Standard
                    model (Haiku)
                  </li>
                </ul>
              </div>

              {/* Pro Tier */}
              <div className="relative w-full border border-[var(--accent)]/30 bg-[var(--ink-light)] px-4 pt-5 pb-4">
                <BorderTrail
                  className="bg-[var(--accent)]"
                  style={{
                    boxShadow:
                      "0px 0px 60px 30px rgba(0, 255, 136, 0.1), 0 0 100px 60px rgba(0, 255, 136, 0.03)",
                  }}
                  size={100}
                />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="leading-none font-mono font-semibold text-[var(--accent)] uppercase tracking-wider text-sm">
                      Pro
                    </h3>
                    <div className="flex items-center gap-x-1">
                      <Infinity className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <Badge className="bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30 text-[0.65rem] font-mono">
                        Unlimited
                      </Badge>
                    </div>
                  </div>
                  <p className="text-[var(--muted)] text-sm">
                    For writers, marketers, and teams.
                  </p>
                </div>
                <div className="mt-10 space-y-4">
                  <div className="text-[var(--muted)] flex items-end text-xl font-mono">
                    <span>$</span>
                    <motion.span
                      key={yearly ? "yearly" : "monthly"}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[var(--paper)] -mb-0.5 text-4xl font-extrabold tracking-tighter md:text-5xl"
                    >
                      {yearly ? "8" : "12"}
                    </motion.span>
                    <span>/month</span>
                  </div>
                  {yearly && (
                    <p className="text-xs text-[var(--muted)] font-mono">
                      $96/year &middot; billed annually
                    </p>
                  )}
                  <a href="/login">
                    <FeyButton className="w-full">
                      Go Unlimited
                    </FeyButton>
                  </a>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-[var(--muted)] font-mono">
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--accent)]">+</span>{" "}
                    <span className="text-[var(--paper)]">
                      Unlimited rewrites
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--accent)]">+</span>{" "}
                    <span className="text-[var(--paper)]">
                      15,000 character limit
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--accent)]">+</span>{" "}
                    <span className="text-[var(--paper)]">
                      Advanced model (Sonnet)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--accent)]">+</span>{" "}
                    <span className="text-[var(--paper)]">
                      Tone presets &amp; batch mode
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--accent)]">+</span>{" "}
                    <span className="text-[var(--paper)]">API access</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-[var(--muted)] flex items-center justify-center gap-x-2 text-xs font-mono">
              <ShieldCheckIcon className="size-3.5" />
              <span>Cancel anytime. No hidden fees. No contracts.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
