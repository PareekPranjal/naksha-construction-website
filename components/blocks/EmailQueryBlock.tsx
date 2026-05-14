"use client";

import { useState } from "react";
import { SectionContainer, Eyebrow } from "../SectionContainer";
import type { EmailQueryBlockData } from "./types";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "success" } | { kind: "error"; message: string };

export function EmailQueryBlock({ block }: { block: EmailQueryBlockData }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.kind === "submitting") return;
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim() || undefined,
          message: message.trim(),
          meta: { source: "email-query-box" },
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        setStatus({ kind: "error", message: text || `Request failed (${res.status})` });
        return;
      }
      setStatus({ kind: "success" });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Network error" });
    }
  };

  const heading = block.heading || "Send us a quick message";
  const intro = block.intro || "Drop your details and we'll get back within a day.";
  const ctaLabel = block.ctaLabel || "Send message";

  return (
    <SectionContainer size="md">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_1.2fr] md:items-start">
        <div>
          <Eyebrow>Email us</Eyebrow>
          <h2 className="serif mt-4 text-h2 text-ink">{heading}</h2>
          <p className="mt-4 text-body text-concrete-text">{intro}</p>
          <ul className="mt-6 space-y-2 text-body-sm text-concrete-text">
            <li>
              <a className="text-accent underline-offset-4 hover:underline" href="mailto:info@nakshaconstruction.com">
                info@nakshaconstruction.com
              </a>
            </li>
            <li>
              <a className="text-accent underline-offset-4 hover:underline" href="tel:+919828727701">
                +91 98287 27701
              </a>
            </li>
          </ul>
        </div>
        <form onSubmit={onSubmit} className="space-y-4 rounded-card border border-rule-ink bg-paper p-6 md:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-body-sm text-ink">Your name</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-card border border-rule-ink bg-white px-3 py-2 text-body text-ink outline-none focus:border-accent"
              />
            </label>
            <label className="block">
              <span className="text-body-sm text-ink">Your email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-card border border-rule-ink bg-white px-3 py-2 text-body text-ink outline-none focus:border-accent"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-body-sm text-ink">Subject</span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 w-full rounded-card border border-rule-ink bg-white px-3 py-2 text-body text-ink outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="text-body-sm text-ink">Your message</span>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full rounded-card border border-rule-ink bg-white px-3 py-2 text-body text-ink outline-none focus:border-accent"
            />
          </label>
          <button
            type="submit"
            disabled={status.kind === "submitting"}
            className="inline-flex items-center gap-2 rounded-card bg-ink px-5 py-3 text-button text-paper transition-colors hover:bg-accent disabled:opacity-60"
          >
            {status.kind === "submitting" ? "Sending…" : ctaLabel}
          </button>
          {status.kind === "success" && (
            <p className="text-body-sm text-accent">Thanks — your message is in. We&apos;ll be in touch shortly.</p>
          )}
          {status.kind === "error" && (
            <p className="text-body-sm text-red-600">Couldn&apos;t send: {status.message}</p>
          )}
        </form>
      </div>
    </SectionContainer>
  );
}
