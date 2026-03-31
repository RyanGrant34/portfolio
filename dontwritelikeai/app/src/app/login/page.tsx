"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import { useState } from "react";
import { PenLine } from "lucide-react";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded bg-[var(--accent)] flex items-center justify-center">
          <PenLine className="w-4 h-4 text-white" />
        </div>
        <span
          className="text-xl font-bold text-[var(--paper)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          DWLAI
        </span>
      </a>

      {/* Auth form */}
      {mode === "signin" ? (
        <SignIn
          routing="hash"
          forceRedirectUrl="/app"
          signUpUrl="/login"
        />
      ) : (
        <SignUp
          routing="hash"
          forceRedirectUrl="/app"
          signInUrl="/login"
        />
      )}

      {/* Toggle */}
      <p className="mt-6 text-sm text-[var(--muted)]">
        {mode === "signin" ? "No account? " : "Already have an account? "}
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="text-[var(--accent)] hover:underline"
        >
          {mode === "signin" ? "Sign up" : "Sign in"}
        </button>
      </p>
    </div>
  );
}
