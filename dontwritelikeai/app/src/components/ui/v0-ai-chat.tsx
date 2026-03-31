"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  FileText,
  Mail,
  PenLine,
  Briefcase,
  Globe,
  ArrowUpIcon,
  Loader2,
} from "lucide-react";

interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({
  minHeight,
  maxHeight,
}: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

interface RewriteChatProps {
  onRewriteResult?: (text: string) => void;
  remainingUses: number;
  onUsesChange?: (uses: number) => void;
}

export function RewriteChat({
  onRewriteResult,
  remainingUses,
  onUsesChange,
}: RewriteChatProps) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 100,
    maxHeight: 300,
  });

  const charCount = value.length;
  const isOverLimit = charCount > 5000;

  const handleRewrite = async () => {
    if (!value.trim() || isLoading || isOverLimit) return;

    if (value.trim().length < 20) {
      setError("Give me at least 20 characters to work with.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: value.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "limit_reached") {
          setError(data.message);
          onUsesChange?.(0);
        } else {
          setError(data.error || "Something went wrong.");
        }
        setIsLoading(false);
        return;
      }

      onRewriteResult?.(data.rewritten);
      onUsesChange?.(Math.max(0, remainingUses - 1));
    } catch {
      setError("Network error. Check your connection and try again.");
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleRewrite();
    }
  };

  const insertSample = (sample: string) => {
    setValue(sample);
    setTimeout(() => adjustHeight(), 0);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full">
        <div className="relative rounded-xl border border-[var(--ghost)]/20 bg-[var(--ink-light)]">
          <div className="overflow-y-auto">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Paste your AI-generated text here. The kind with delve into, tapestry of, and it is important to note that..."
              className={cn(
                "w-full px-4 py-4",
                "resize-none",
                "bg-transparent",
                "border-none",
                "text-[var(--paper)] text-sm font-[var(--font-body)]",
                "focus:outline-none",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "placeholder:text-[var(--muted)] placeholder:text-sm placeholder:italic",
                "min-h-[100px]"
              )}
              style={{ overflow: "hidden" }}
            />
          </div>

          <div className="flex items-center justify-between p-3 border-t border-[var(--ghost)]/10">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "text-xs font-mono tabular-nums",
                  isOverLimit ? "text-[var(--accent)]" : "text-[var(--muted)]"
                )}
              >
                {charCount.toLocaleString()} / 5,000
              </span>
              <span className="text-xs font-mono text-[var(--muted)]">
                <strong className="text-[var(--accent)]">
                  {remainingUses}
                </strong>{" "}
                free rewrite{remainingUses !== 1 ? "s" : ""} left
              </span>
            </div>
            <button
              type="button"
              onClick={handleRewrite}
              disabled={isLoading || !value.trim() || isOverLimit}
              className={cn(
                "px-1.5 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1",
                value.trim() && !isOverLimit && !isLoading
                  ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-dim)]"
                  : "bg-[var(--ghost)]/20 text-[var(--muted)] cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowUpIcon className="w-4 h-4" />
              )}
              <span className="sr-only">Rewrite</span>
            </button>
          </div>
        </div>

        {error && (
          <p className="text-[var(--accent)] text-sm font-mono mt-2">
            {error}
          </p>
        )}

        <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
          <ActionButton
            icon={<FileText className="w-4 h-4" />}
            label="Essay"
            onClick={() =>
              insertSample(
                "The evolution of artificial intelligence represents a pivotal moment in the landscape of technological innovation, fundamentally reshaping how we navigate the complexities of modern life. This groundbreaking technology serves as a testament to human ingenuity, fostering new paradigms that underscore the importance of adaptability in an ever-changing digital ecosystem."
              )
            }
          />
          <ActionButton
            icon={<Mail className="w-4 h-4" />}
            label="Email"
            onClick={() =>
              insertSample(
                "I hope this email finds you well. I wanted to reach out regarding the upcoming project deliverables. Additionally, I believe it is crucial that we align our strategic objectives to ensure seamless collaboration across all departments. Please don't hesitate to let me know if you have any questions or concerns."
              )
            }
          />
          <ActionButton
            icon={<PenLine className="w-4 h-4" />}
            label="Blog Post"
            onClick={() =>
              insertSample(
                "In today's rapidly evolving digital landscape, businesses must leverage innovative solutions to navigate the complexities of modern commerce. This comprehensive guide delves into the intricacies of digital transformation, showcasing how organizations can foster growth and enhance their competitive edge in an increasingly interconnected world."
              )
            }
          />
          <ActionButton
            icon={<Briefcase className="w-4 h-4" />}
            label="Cover Letter"
            onClick={() =>
              insertSample(
                "I am writing to express my keen interest in the position at your esteemed organization. With a robust skill set and a proven track record of delivering results, I am confident in my ability to make a meaningful contribution to your dynamic team. My experience has equipped me with the tools necessary to navigate complex challenges and drive impactful outcomes."
              )
            }
          />
          <ActionButton
            icon={<Globe className="w-4 h-4" />}
            label="LinkedIn"
            onClick={() =>
              insertSample(
                "Thrilled to announce that I've embarked on an exciting new chapter in my professional journey! This pivotal transition underscores my commitment to fostering innovation and driving meaningful change. I'm incredibly grateful for the vibrant community that continues to inspire and support my growth. Here's to embracing new challenges and creating lasting impact! 🚀"
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function ActionButton({ icon, label, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 bg-[var(--ink-light)] hover:bg-[var(--ghost)]/10 rounded-full border border-[var(--ghost)]/15 text-[var(--muted)] hover:text-[var(--paper)] transition-colors text-xs font-mono"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
