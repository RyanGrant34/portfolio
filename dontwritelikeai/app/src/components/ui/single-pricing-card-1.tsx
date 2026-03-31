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
            <div className="rounded-lg border border-[var(--ghost)]/20 px-4 py-1 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
              Pricing
            </div>
          </div>
          <h2
            className="mt-5 text-center text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl text-[var(--paper)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Free rewrites. Or go unlimited.
          </h2>
          <p className="text-[var(--muted)] mt-5 text-center text-sm md:text-base">
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
                "relative w-11 h-6 rounded-full transition-colors",
                yearly ? "bg-[var(--accent)]" : "bg-[var(--ghost)]/20"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-[var(--paper)] transition-transform",
                  yearly && "translate-x-5"
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
              <Badge className="bg-[var(--success)] text-white border-transparent text-[0.6rem]">
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
              "bg-[size:32px_32px] opacity-[0.04]",
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
            <div className="grid md:grid-cols-2 bg-[var(--ink)] relative border border-[var(--ghost)]/15 p-4">
              <PlusIcon className="absolute -top-3 -left-3 size-5 text-[var(--ghost)]/30" />
              <PlusIcon className="absolute -top-3 -right-3 size-5 text-[var(--ghost)]/30" />
              <PlusIcon className="absolute -bottom-3 -left-3 size-5 text-[var(--ghost)]/30" />
              <PlusIcon className="absolute -right-3 -bottom-3 size-5 text-[var(--ghost)]/30" />

              {/* Free Tier */}
              <div className="w-full px-4 pt-5 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="leading-none font-semibold text-[var(--paper)]">
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
                  <div className="text-[var(--muted)] flex items-end gap-0.5 text-xl">
                    <span className="text-[var(--paper)] -mb-0.5 text-4xl font-extrabold tracking-tighter md:text-5xl">
                      $0
                    </span>
                    <span>/forever</span>
                  </div>
                  <a href="/login">
                    <FeyButton className="w-full">Start Rewriting</FeyButton>
                  </a>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-[var(--muted)]">
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
              <div className="relative w-full rounded-lg border border-[var(--ghost)]/20 bg-[var(--ink-light)] px-4 pt-5 pb-4">
                <BorderTrail
                  className="bg-[var(--accent)]"
                  style={{
                    boxShadow:
                      "0px 0px 60px 30px rgba(194, 54, 22, 0.15), 0 0 100px 60px rgba(194, 54, 22, 0.05)",
                  }}
                  size={100}
                />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="leading-none font-semibold text-[var(--paper)]">
                      Pro
                    </h3>
                    <div className="flex items-center gap-x-1">
                      <Infinity className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <Badge className="bg-[var(--accent)] text-white border-transparent text-[0.65rem]">
                        Unlimited
                      </Badge>
                    </div>
                  </div>
                  <p className="text-[var(--muted)] text-sm">
                    For writers, marketers, and teams.
                  </p>
                </div>
                <div className="mt-10 space-y-4">
                  <div className="text-[var(--muted)] flex items-end text-xl">
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
                    <FeyButton
                      className="w-full bg-[var(--accent)] after:bg-[var(--accent-dim)] [box-shadow:none] after:[box-shadow:inset_0_0_0_0.5px_rgba(200,194,182,0.2),0_0_12px_rgba(194,54,22,0.3)]"
                    >
                      Go Unlimited
                    </FeyButton>
                  </a>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-[var(--muted)]">
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
