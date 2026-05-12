"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterSignup({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        setSubmitted(true);
      }}
      className={cn("w-full max-w-md", className)}
    >
      <label className="eyebrow text-accent">Newsletter</label>
      <div className="mt-3 flex items-center gap-2 border-b border-paper/30 pb-2">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-transparent text-paper placeholder:text-paper/40 focus:outline-none"
          aria-label="Email address"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="rounded-full p-1 text-paper hover:text-accent"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-3 text-body-sm text-paper/60">
        {submitted
          ? "Thanks — we'll be in touch."
          : "Quarterly insights from our project teams. No spam, unsubscribe anytime."}
      </p>
    </form>
  );
}
