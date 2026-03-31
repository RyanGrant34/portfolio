"use client";

import { useState, useRef } from "react";
import { RewriteChat } from "@/components/ui/v0-ai-chat";
import { Testimonials } from "@/components/ui/testimonials-columns-1";
import { Copy, Check } from "lucide-react";

export default function Home() {
  const [rewrittenText, setRewrittenText] = useState<string | null>(null);
  const [remainingUses, setRemainingUses] = useState(3);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleRewriteResult = (text: string) => {
    setRewrittenText(text);
    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleCopy = async () => {
    if (!rewrittenText) return;
    try {
      await navigator.clipboard.writeText(rewrittenText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="max-w-4xl mx-auto w-full px-6 pt-12 pb-2">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[var(--muted)] mb-2">
          Free tool &mdash; 3 rewrites / day
        </p>
        <h1
          className="text-[clamp(2.8rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-tight mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Don&apos;t Write
          <br />
          Like{" "}
          <span className="line-through decoration-[var(--accent)] decoration-3 opacity-50">
            AI
          </span>
        </h1>
        <p
          className="text-[var(--muted)] text-lg max-w-[520px] italic mb-6"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Paste the robot text. Get back something that sounds like a person
          actually wrote it.
        </p>
        <div className="w-full h-px bg-gradient-to-r from-[var(--accent)] to-transparent" />
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto w-full px-6 py-8 flex-1">
        {/* Input */}
        <RewriteChat
          onRewriteResult={handleRewriteResult}
          remainingUses={remainingUses}
          onUsesChange={setRemainingUses}
        />

        {/* Output */}
        {rewrittenText && (
          <div ref={outputRef} className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[var(--success)]">
                Output &mdash; human version
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 font-mono text-xs tracking-wide uppercase text-[var(--muted)] hover:text-[var(--paper)] transition-colors border border-[var(--ghost)]/15 rounded px-3 py-1.5"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="p-5 rounded-xl border border-[var(--ghost)]/15 bg-[var(--ink-light)] text-[var(--paper)] text-sm leading-7 whitespace-pre-wrap">
              {rewrittenText}
            </div>
          </div>
        )}

        {/* Ad Slot: Leaderboard */}
        <div className="border border-dashed border-[var(--ghost)]/10 rounded p-6 text-center my-10">
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ghost)]/30">
            Advertisement
          </p>
          <p className="font-mono text-[0.55rem] text-[var(--ghost)]/20 mt-1">
            728 &times; 90 &mdash; Leaderboard
          </p>
        </div>

        {/* Before & After */}
        <section className="border-t border-[var(--ghost)]/10 pt-10">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Before &amp; After
          </h2>

          <div className="space-y-3 mb-8">
            <div className="p-5 rounded-xl border border-[var(--ghost)]/10 bg-[var(--ink-light)]">
              <p className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[var(--accent)] mb-2">
                Before
              </p>
              <p className="text-sm text-[var(--ghost)] leading-relaxed">
                &ldquo;The city boasts a vibrant cultural tapestry, showcasing a
                rich heritage that serves as a testament to its enduring legacy.
                Additionally, the diverse culinary landscape offers a seamless
                blend of traditional and contemporary flavors, fostering a sense
                of community among residents and visitors alike.&rdquo;
              </p>
            </div>
            <div className="p-5 rounded-xl border border-[var(--ghost)]/10 bg-[var(--ink-light)]">
              <p className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[var(--success)] mb-2">
                After
              </p>
              <p className="text-sm text-[var(--paper)] leading-relaxed">
                &ldquo;The city has a long cultural history that still shapes
                daily life. The food scene mixes old recipes with newer ones, and
                that&apos;s part of what pulls people together there.&rdquo;
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-5 rounded-xl border border-[var(--ghost)]/10 bg-[var(--ink-light)]">
              <p className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[var(--accent)] mb-2">
                Before
              </p>
              <p className="text-sm text-[var(--ghost)] leading-relaxed">
                &ldquo;This groundbreaking initiative underscores the
                organization&apos;s commitment to leveraging innovative solutions
                to navigate the evolving landscape of digital transformation,
                marking a pivotal shift in their strategic approach.&rdquo;
              </p>
            </div>
            <div className="p-5 rounded-xl border border-[var(--ghost)]/10 bg-[var(--ink-light)]">
              <p className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[var(--success)] mb-2">
                After
              </p>
              <p className="text-sm text-[var(--paper)] leading-relaxed">
                &ldquo;The company is trying something new with digital tools.
                It&apos;s a real change in direction for them.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* Ad Slot: Medium Rectangle */}
        <div className="border border-dashed border-[var(--ghost)]/10 rounded p-6 text-center my-10">
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ghost)]/30">
            Advertisement
          </p>
          <p className="font-mono text-[0.55rem] text-[var(--ghost)]/20 mt-1">
            300 &times; 250 &mdash; Medium Rectangle
          </p>
        </div>

        {/* Testimonials */}
        <Testimonials />

        {/* Ad Slot: Bottom Banner */}
        <div className="border border-dashed border-[var(--ghost)]/10 rounded p-6 text-center my-10">
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ghost)]/30">
            Advertisement
          </p>
          <p className="font-mono text-[0.55rem] text-[var(--ghost)]/20 mt-1">
            728 &times; 90 &mdash; Leaderboard
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full px-6 py-6 border-t border-[var(--ghost)]/10 flex justify-between items-center flex-wrap gap-4">
        <span className="font-mono text-[0.65rem] text-[var(--muted)] tracking-wider">
          dontwritelikeai.com
        </span>
        <span className="font-mono text-[0.65rem] text-[var(--ghost)]/30">
          Powered by Claude API
        </span>
      </footer>
    </div>
  );
}
