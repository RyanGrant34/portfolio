"use client";

import { useState, useRef } from "react";
import { RewriteChat } from "@/components/ui/v0-ai-chat";
import { Testimonials } from "@/components/ui/testimonials-columns-1";
import { Pricing } from "@/components/ui/single-pricing-card-1";
import { GradientDots } from "@/components/ui/gradient-dots";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Footer2 } from "@/components/ui/footer2";
import { Copy, Check, Terminal } from "lucide-react";

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
      {/* Hero */}
      <header className="relative overflow-hidden">
        <GradientDots className="opacity-60" />
        <div className="relative z-10 max-w-4xl mx-auto w-full px-6 pt-20 pb-10">
          {/* Nav bar */}
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 border border-[var(--accent)]/50 flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
              </div>
              <span className="font-mono font-bold text-[var(--accent)] text-sm tracking-wider">
                DWLAI
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#pricing"
                className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors tracking-wider uppercase"
              >
                Pricing
              </a>
              <a
                href="/login"
                className="font-mono text-xs text-[var(--ink)] bg-[var(--accent)] px-4 py-1.5 hover:bg-transparent hover:text-[var(--accent)] border border-[var(--accent)] transition-all tracking-wider uppercase"
              >
                Sign In
              </a>
            </div>
          </div>

          <p className="font-mono text-[0.7rem] tracking-[0.25em] uppercase text-[var(--accent)] mb-4">
            // free tool &mdash; 3 rewrites / day
          </p>
          <h1
            className="text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[0.92] tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Don&apos;t Write
            <br />
            Like{" "}
            <span className="text-[var(--accent)] text-glow">
              AI
            </span>
          </h1>
          <p className="text-[var(--muted)] text-base max-w-[480px] font-mono text-sm mb-10">
            Paste the robot text. Get back something that sounds like a person
            actually wrote it.
          </p>
          <div className="w-full h-px bg-gradient-to-r from-[var(--accent)]/60 via-[var(--accent)]/20 to-transparent" />
        </div>
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
              <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-[var(--accent)]">
                // output &mdash; human version
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 font-mono text-xs tracking-wide uppercase text-[var(--muted)] hover:text-[var(--accent)] transition-colors border border-[var(--ghost)]/40 px-3 py-1.5 hover:border-[var(--accent)]/30"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <ScrollArea className="max-h-[400px] border border-[var(--accent)]/20 bg-[var(--ink-light)] glow-accent">
              <div className="p-5 text-[var(--paper)] text-sm leading-7 whitespace-pre-wrap font-mono">
                {rewrittenText}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Before & After */}
        <section className="border-t border-[var(--ghost)]/20 pt-12 mt-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="border border-[var(--ghost)] py-1 px-4 font-mono text-[0.65rem] text-[var(--accent)] uppercase tracking-[0.2em]">
              // before &amp; after
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <div className="p-5 border border-[var(--error)]/20 bg-[var(--ink-light)] relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-[var(--error)]/40" />
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--error)] mb-3 ml-3">
                Input &mdash; AI detected
              </p>
              <p className="text-sm text-[var(--muted)] leading-relaxed ml-3 font-mono">
                &ldquo;The city boasts a vibrant cultural tapestry, showcasing a
                rich heritage that serves as a testament to its enduring legacy.
                Additionally, the diverse culinary landscape offers a seamless
                blend of traditional and contemporary flavors, fostering a sense
                of community among residents and visitors alike.&rdquo;
              </p>
            </div>
            <div className="p-5 border border-[var(--accent)]/20 bg-[var(--ink-light)] relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)]/60" />
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--accent)] mb-3 ml-3">
                Output &mdash; human
              </p>
              <p className="text-sm text-[var(--paper)] leading-relaxed ml-3 font-mono">
                &ldquo;The city has a long cultural history that still shapes
                daily life. The food scene mixes old recipes with newer ones, and
                that&apos;s part of what pulls people together there.&rdquo;
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-5 border border-[var(--error)]/20 bg-[var(--ink-light)] relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-[var(--error)]/40" />
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--error)] mb-3 ml-3">
                Input &mdash; AI detected
              </p>
              <p className="text-sm text-[var(--muted)] leading-relaxed ml-3 font-mono">
                &ldquo;This groundbreaking initiative underscores the
                organization&apos;s commitment to leveraging innovative solutions
                to navigate the evolving landscape of digital transformation,
                marking a pivotal shift in their strategic approach.&rdquo;
              </p>
            </div>
            <div className="p-5 border border-[var(--accent)]/20 bg-[var(--ink-light)] relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)]/60" />
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--accent)] mb-3 ml-3">
                Output &mdash; human
              </p>
              <p className="text-sm text-[var(--paper)] leading-relaxed ml-3 font-mono">
                &ldquo;The company is trying something new with digital tools.
                It&apos;s a real change in direction for them.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* Pricing */}
        <Pricing />
      </main>

      {/* Footer */}
      <Footer2 />
    </div>
  );
}
