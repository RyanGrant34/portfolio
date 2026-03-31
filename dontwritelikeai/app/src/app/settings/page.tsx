"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { FeyButton } from "@/components/ui/fey-button";
import {
  PenLine,
  Crown,
  Zap,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

type UserData = {
  plan: string;
  email: string;
  rewrites_today: number;
  remaining: number;
  created_at: string;
};

export default function SettingsPage() {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openBillingPortal = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      setPortalLoading(false);
    }
  };

  const handleUpgrade = async (interval: "monthly" | "yearly") => {
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
      <nav className="border-b border-[var(--ghost)]/10 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/app" className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--paper)] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-mono">Back to app</span>
          </a>
          <UserButton />
        </div>
      </nav>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <h1
          className="text-2xl font-bold mb-8 text-[var(--paper)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Settings
        </h1>

        {loading ? (
          <div className="text-[var(--muted)] text-sm">Loading...</div>
        ) : (
          <div className="space-y-8">
            {/* Account */}
            <section>
              <h2 className="text-sm font-mono uppercase tracking-wider text-[var(--muted)] mb-4">
                Account
              </h2>
              <div className="rounded-xl border border-[var(--ghost)]/15 bg-[var(--ink-light)] p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--muted)]">Email</span>
                  <span className="text-sm text-[var(--paper)]">
                    {user?.primaryEmailAddress?.emailAddress || userData?.email}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--muted)]">Plan</span>
                  <span className="flex items-center gap-1.5 text-sm">
                    {userData?.plan === "pro" ? (
                      <>
                        <Crown className="w-3.5 h-3.5 text-[var(--accent)]" />
                        <span className="text-[var(--accent)] font-semibold">
                          Pro
                        </span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 text-[var(--muted)]" />
                        <span className="text-[var(--paper)]">Free</span>
                      </>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--muted)]">
                    Rewrites today
                  </span>
                  <span className="text-sm text-[var(--paper)] font-mono">
                    {userData?.rewrites_today || 0}
                  </span>
                </div>
              </div>
            </section>

            {/* Billing */}
            <section>
              <h2 className="text-sm font-mono uppercase tracking-wider text-[var(--muted)] mb-4">
                Billing
              </h2>

              {userData?.plan === "pro" ? (
                <div className="rounded-xl border border-[var(--ghost)]/15 bg-[var(--ink-light)] p-5">
                  <p className="text-sm text-[var(--paper)] mb-4">
                    You&apos;re on the Pro plan. Manage your subscription, update
                    payment method, or cancel through Stripe.
                  </p>
                  <FeyButton onClick={openBillingPortal} disabled={portalLoading}>
                    {portalLoading ? "Loading..." : "Manage Subscription"}
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </FeyButton>
                </div>
              ) : (
                <div className="rounded-xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 p-5">
                  <h3
                    className="text-lg font-bold text-[var(--paper)] mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Upgrade to Pro
                  </h3>
                  <p className="text-sm text-[var(--muted)] mb-5">
                    Unlimited rewrites, 15K character limit, Sonnet model, tone
                    presets, and API access.
                  </p>
                  <div className="flex gap-3">
                    <FeyButton
                      className="bg-[var(--accent)] after:bg-[var(--accent-dim)]"
                      onClick={() => handleUpgrade("monthly")}
                    >
                      $12/month
                    </FeyButton>
                    <FeyButton onClick={() => handleUpgrade("yearly")}>
                      $8/month (yearly)
                    </FeyButton>
                  </div>
                </div>
              )}
            </section>

            {/* Usage limits */}
            <section>
              <h2 className="text-sm font-mono uppercase tracking-wider text-[var(--muted)] mb-4">
                Plan Limits
              </h2>
              <div className="rounded-xl border border-[var(--ghost)]/15 bg-[var(--ink-light)] p-5">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[var(--muted)]">
                      <th className="text-left font-mono text-xs pb-3">
                        Feature
                      </th>
                      <th className="text-center font-mono text-xs pb-3">
                        Free
                      </th>
                      <th className="text-center font-mono text-xs pb-3">
                        Pro
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--paper)]">
                    <tr className="border-t border-[var(--ghost)]/10">
                      <td className="py-2.5">Daily rewrites</td>
                      <td className="text-center text-[var(--muted)]">3</td>
                      <td className="text-center text-[var(--accent)]">
                        Unlimited
                      </td>
                    </tr>
                    <tr className="border-t border-[var(--ghost)]/10">
                      <td className="py-2.5">Character limit</td>
                      <td className="text-center text-[var(--muted)]">5,000</td>
                      <td className="text-center text-[var(--accent)]">
                        15,000
                      </td>
                    </tr>
                    <tr className="border-t border-[var(--ghost)]/10">
                      <td className="py-2.5">Model</td>
                      <td className="text-center text-[var(--muted)]">Haiku</td>
                      <td className="text-center text-[var(--accent)]">
                        Sonnet
                      </td>
                    </tr>
                    <tr className="border-t border-[var(--ghost)]/10">
                      <td className="py-2.5">Tone presets</td>
                      <td className="text-center text-[var(--muted)]">-</td>
                      <td className="text-center text-[var(--accent)]">4</td>
                    </tr>
                    <tr className="border-t border-[var(--ghost)]/10">
                      <td className="py-2.5">API access</td>
                      <td className="text-center text-[var(--muted)]">-</td>
                      <td className="text-center text-[var(--accent)]">
                        Coming soon
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
