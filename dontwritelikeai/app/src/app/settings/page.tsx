"use client";

import { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { FeyButton } from "@/components/ui/fey-button";
import {
  Terminal,
  Settings,
  Crown,
  Zap,
  ArrowLeft,
} from "lucide-react";

export default function SettingsPage() {
  const { user } = useUser();
  const [plan, setPlan] = useState<string>("free");
  const [rewritesToday, setRewritesToday] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then((data) => {
        if (data.plan) setPlan(data.plan);
        if (data.rewrites_today !== undefined) setRewritesToday(data.rewrites_today);
        if (data.email) setEmail(data.email);
      })
      .catch(() => {});
  }, []);

  const handleManageBilling = async () => {
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  const handleUpgrade = async (interval: string) => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interval }),
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <nav className="border-b border-[var(--ghost)]/30 px-4 py-3 bg-[var(--ink-light)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 border border-[var(--accent)]/50 flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
            </div>
            <span className="font-mono font-bold text-[var(--accent)] text-sm tracking-wider">
              DWLAI
            </span>
          </a>
          <div className="flex items-center gap-3">
            {plan === "pro" ? (
              <span className="flex items-center gap-1 text-xs font-mono text-[var(--accent)]">
                <Crown className="w-3.5 h-3.5" /> PRO
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-mono text-[var(--muted)]">
                <Zap className="w-3.5 h-3.5" /> Free
              </span>
            )}
            <UserButton />
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <a
          href="/app"
          className="inline-flex items-center gap-1 text-sm font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to app
        </a>

        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-5 h-5 text-[var(--accent)]" />
          <h1
            className="text-2xl font-bold text-[var(--paper)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Settings
          </h1>
          <div className="h-px flex-1 bg-[var(--ghost)]/20" />
        </div>

        {/* Account */}
        <section className="mb-10">
          <h2 className="font-mono text-[0.65rem] text-[var(--accent)] uppercase tracking-[0.2em] mb-4">
            // account
          </h2>
          <div className="border border-[var(--ghost)]/40 bg-[var(--ink-light)] p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--muted)]">Email</span>
              <span className="text-sm text-[var(--paper)]">
                {email || user?.primaryEmailAddress?.emailAddress || "..."}
              </span>
            </div>
            <div className="h-px bg-[var(--ghost)]/20" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--muted)]">Plan</span>
              <span className="text-sm font-mono text-[var(--accent)] uppercase tracking-wider">
                {plan}
              </span>
            </div>
            <div className="h-px bg-[var(--ghost)]/20" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--muted)]">
                Rewrites today
              </span>
              <span className="text-sm text-[var(--paper)]">
                {rewritesToday}
              </span>
            </div>
          </div>
        </section>

        {/* Billing */}
        <section className="mb-10">
          <h2 className="font-mono text-[0.65rem] text-[var(--accent)]/70 uppercase tracking-[0.2em] mb-4">
            // billing
          </h2>
          <div className="border border-[var(--ghost)]/40 bg-[var(--ink-light)] p-6">
            {plan === "pro" ? (
              <div className="space-y-4">
                <p className="text-sm text-[var(--paper)]">
                  You&apos;re on the Pro plan. Manage your subscription below.
                </p>
                <FeyButton onClick={handleManageBilling} className="bg-transparent text-[var(--paper)] border-[var(--ghost)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
                  Manage Subscription
                </FeyButton>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[var(--muted)]">
                  Upgrade to Pro for unlimited rewrites, better AI model, tone
                  presets, and 15K character limit.
                </p>
                <div className="flex gap-3">
                  <FeyButton onClick={() => handleUpgrade("monthly")}>
                    $12/mo
                  </FeyButton>
                  <FeyButton
                    onClick={() => handleUpgrade("yearly")}
                    className="bg-transparent text-[var(--accent)] border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--ink)]"
                  >
                    $8/mo (yearly)
                  </FeyButton>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Plan comparison */}
        <section>
          <h2 className="font-mono text-[0.65rem] text-[var(--accent)] uppercase tracking-[0.2em] mb-4">
            // plan limits
          </h2>
          <div className="border border-[var(--ghost)]/40 bg-[var(--ink-light)] overflow-hidden">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="border-b border-[var(--ghost)]/30 bg-[var(--ink-mid)]">
                  <th className="text-left p-3 text-[var(--muted)] font-normal">
                    Feature
                  </th>
                  <th className="text-center p-3 text-[var(--muted)] font-normal">
                    Free
                  </th>
                  <th className="text-center p-3 text-[var(--accent)] font-normal">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody className="text-[var(--paper)]">
                <tr className="border-b border-[var(--ghost)]/20">
                  <td className="p-3 text-[var(--muted)]">Daily rewrites</td>
                  <td className="p-3 text-center">3</td>
                  <td className="p-3 text-center text-[var(--accent)]">
                    Unlimited
                  </td>
                </tr>
                <tr className="border-b border-[var(--ghost)]/20">
                  <td className="p-3 text-[var(--muted)]">Character limit</td>
                  <td className="p-3 text-center">5,000</td>
                  <td className="p-3 text-center text-[var(--accent)]">
                    15,000
                  </td>
                </tr>
                <tr className="border-b border-[var(--ghost)]/20">
                  <td className="p-3 text-[var(--muted)]">Model</td>
                  <td className="p-3 text-center">Haiku</td>
                  <td className="p-3 text-center text-[var(--accent)]">
                    Sonnet
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-[var(--muted)]">Tone presets</td>
                  <td className="p-3 text-center text-[var(--muted)]">-</td>
                  <td className="p-3 text-center text-[var(--accent)]">4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
