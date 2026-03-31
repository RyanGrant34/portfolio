"use client";

import { useState, useRef, useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FeyButton } from "@/components/ui/fey-button";
import { cn } from "@/lib/utils";
import {
  PenLine,
  Copy,
  Check,
  ArrowUpIcon,
  Loader2,
  Zap,
  Crown,
  Settings,
  FileText,
  Mail,
  PenLine as PenIcon,
  Briefcase,
  Globe,
} from "lucide-react";

type TonePreset = "default" | "academic" | "casual" | "professional";

const TONE_LABELS: Record<TonePreset, string> = {
  default: "Natural",
  academic: "Academic",
  casual: "Casual",
  professional: "Professional",
};

export default function AppPage() {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [plan, setPlan] = useState<string>("free");
  const [tone, setTone] = useState<TonePreset>("default");
  const [showUpgrade, setShowUpgrade] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch user info on mount
  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then((data) => {
        if (data.plan) setPlan(data.plan);
        if (data.remaining !== undefined) setRemaining(data.remaining);
      })
      .catch(() => {});
  }, []);

  const handleRewrite = async () => {
    if (!input.trim() || isLoading) return;
    const maxChars = plan === "pro" ? 15000 : 5000;
    if (input.length > maxChars) {
      setError(`Keep it under ${maxChars.toLocaleString()} characters.`);
      return;
    }
    if (input.trim().length < 20) {
      setError("Give me at least 20 characters to work with.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input.trim(), tone }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.error === "limit_reached") {
          setShowUpgrade(true);
          setRemaining(0);
        }
        setError(data.error || data.message || "Something went wrong.");
        setIsLoading(false);
        return;
      }

      setOutput(data.rewritten);
      if (data.remaining !== undefined) setRemaining(data.remaining);
      setTimeout(() => {
        outputRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch {
      setError("Network error. Check your connection.");
    }
    setIsLoading(false);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleRewrite();
    }
  };

  const insertSample = (text: string) => {
    setInput(text);
    setOutput(null);
  };

  const maxChars = plan === "pro" ? 15000 : 5000;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <nav className="border-b border-[var(--ghost)]/10 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[var(--accent)] flex items-center justify-center">
              <PenLine className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-[var(--paper)] text-sm">DWLAI</span>
          </a>
          <div className="flex items-center gap-3">
            {plan === "pro" ? (
              <span className="flex items-center gap-1 text-xs font-mono text-[var(--accent)]">
                <Crown className="w-3.5 h-3.5" /> Pro
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-mono text-[var(--muted)]">
                <Zap className="w-3.5 h-3.5" />
                {remaining !== null ? `${remaining} left today` : "Free"}
              </span>
            )}
            <a
              href="/settings"
              className="text-[var(--muted)] hover:text-[var(--paper)] transition-colors"
            >
              <Settings className="w-4 h-4" />
            </a>
            <UserButton />
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <h1
          className="text-2xl font-bold mb-6 text-[var(--paper)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Rewrite
        </h1>

        {/* Tone selector (Pro only) */}
        {plan === "pro" && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
              Tone:
            </span>
            {(Object.keys(TONE_LABELS) as TonePreset[]).map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={cn(
                  "text-xs font-mono px-3 py-1 rounded-full border transition-colors",
                  tone === t
                    ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10"
                    : "border-[var(--ghost)]/15 text-[var(--muted)] hover:text-[var(--paper)]"
                )}
              >
                {TONE_LABELS[t]}
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="rounded-xl border border-[var(--ghost)]/20 bg-[var(--ink-light)]">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste your AI-generated text here..."
            className={cn(
              "w-full px-4 py-4 min-h-[160px] resize-none",
              "bg-transparent border-none text-[var(--paper)] text-sm",
              "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
              "placeholder:text-[var(--muted)] placeholder:italic"
            )}
          />
          <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--ghost)]/10">
            <span
              className={cn(
                "text-xs font-mono tabular-nums",
                input.length > maxChars
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)]"
              )}
            >
              {input.length.toLocaleString()} / {maxChars.toLocaleString()}
            </span>
            <button
              onClick={handleRewrite}
              disabled={isLoading || !input.trim()}
              className={cn(
                "p-2 rounded-lg transition-colors",
                input.trim() && !isLoading
                  ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-dim)]"
                  : "bg-[var(--ghost)]/20 text-[var(--muted)] cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowUpIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-[var(--accent)] text-sm font-mono mt-2">
            {error}
          </p>
        )}

        {/* Quick samples */}
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            { icon: <FileText className="w-3.5 h-3.5" />, label: "Essay", text: "The evolution of artificial intelligence represents a pivotal moment in the landscape of technological innovation, fundamentally reshaping how we navigate the complexities of modern life. This groundbreaking technology serves as a testament to human ingenuity, fostering new paradigms that underscore the importance of adaptability in an ever-changing digital ecosystem." },
            { icon: <Mail className="w-3.5 h-3.5" />, label: "Email", text: "I hope this email finds you well. I wanted to reach out regarding the upcoming project deliverables. Additionally, I believe it is crucial that we align our strategic objectives to ensure seamless collaboration across all departments. Please don't hesitate to let me know if you have any questions or concerns." },
            { icon: <PenIcon className="w-3.5 h-3.5" />, label: "Blog", text: "In today's rapidly evolving digital landscape, businesses must leverage innovative solutions to navigate the complexities of modern commerce. This comprehensive guide delves into the intricacies of digital transformation, showcasing how organizations can foster growth and enhance their competitive edge in an increasingly interconnected world." },
            { icon: <Briefcase className="w-3.5 h-3.5" />, label: "Cover Letter", text: "I am writing to express my keen interest in the position at your esteemed organization. With a robust skill set and a proven track record of delivering results, I am confident in my ability to make a meaningful contribution to your dynamic team." },
            { icon: <Globe className="w-3.5 h-3.5" />, label: "LinkedIn", text: "Thrilled to announce that I've embarked on an exciting new chapter in my professional journey! This pivotal transition underscores my commitment to fostering innovation and driving meaningful change. I'm incredibly grateful for the vibrant community that continues to inspire and support my growth." },
          ].map((s) => (
            <button
              key={s.label}
              onClick={() => insertSample(s.text)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--ink-light)] hover:bg-[var(--ghost)]/10 rounded-full border border-[var(--ghost)]/15 text-[var(--muted)] hover:text-[var(--paper)] transition-colors text-xs font-mono"
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>

        {/* Output */}
        {output && (
          <div ref={outputRef} className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[var(--success)]">
                Rewritten
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 font-mono text-xs text-[var(--muted)] hover:text-[var(--paper)] transition-colors border border-[var(--ghost)]/15 rounded px-3 py-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <ScrollArea className="max-h-[500px] rounded-xl border border-[var(--ghost)]/15 bg-[var(--ink-light)]">
              <div className="p-5 text-[var(--paper)] text-sm leading-7 whitespace-pre-wrap">
                {output}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Upgrade banner */}
        {showUpgrade && plan === "free" && (
          <div className="mt-8 p-6 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/5 text-center">
            <p className="text-[var(--paper)] font-semibold mb-1">
              You&apos;ve hit today&apos;s limit
            </p>
            <p className="text-[var(--muted)] text-sm mb-4">
              Upgrade to Pro for unlimited rewrites, better model, and more.
            </p>
            <FeyButton
              className="bg-[var(--accent)] after:bg-[var(--accent-dim)]"
              onClick={async () => {
                const res = await fetch("/api/stripe/checkout", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ interval: "monthly" }),
                });
                const { url } = await res.json();
                if (url) window.location.href = url;
              }}
            >
              Upgrade to Pro — $12/mo
            </FeyButton>
          </div>
        )}
      </main>
    </div>
  );
}
