"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  intent: z.enum(["project", "careers", "press", "general"]),
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(20, "At least 20 characters"),
});

type Values = z.infer<typeof schema>;

const INTENTS: { key: Values["intent"]; label: string; sub: string }[] = [
  { key: "project", label: "Start a project", sub: "Discuss a build or get a quote." },
  { key: "careers", label: "Careers", sub: "Recruiting or general questions." },
  { key: "press", label: "Press & media", sub: "Interviews, photography, comments." },
  { key: "general", label: "General enquiry", sub: "Anything else we can help with." },
];

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { intent: "project" },
    mode: "onTouched",
  });

  const intent = watch("intent");

  async function next(fields: (keyof Values)[]) {
    const ok = await trigger(fields);
    if (ok) setStep((s) => Math.min(s + 1, 2));
  }

  async function onSubmit(values: Values) {
    // Submission is a no-op placeholder — wire to your endpoint later.
    await new Promise((r) => setTimeout(r, 600));
    console.log("Naksha contact form submission:", values);
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-card border border-rule-ink bg-paper p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-paper">
          <Check className="h-5 w-5" />
        </div>
        <h3 className="serif mt-6 text-h2">Message received.</h3>
        <p className="mx-auto mt-3 max-w-md text-body text-concrete-text">
          Thank you. The right team here will be in touch within two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-card border border-rule-ink bg-paper p-6 md:p-10">
      <div className="mb-8 flex items-center gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-1 items-center gap-3">
            <span
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full text-body-sm font-semibold",
                i <= step ? "bg-accent text-paper" : "bg-ink/10 text-ink",
              )}
            >
              {i + 1}
            </span>
            <span className="hidden text-body-sm text-concrete-text md:inline">
              {["Intent", "Details", "Message"][i]}
            </span>
            {i < 2 && <span className="h-px flex-1 bg-rule-ink" />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div>
          <h3 className="serif text-h3">What brings you here?</h3>
          <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            {INTENTS.map((it) => (
              <li key={it.key}>
                <button
                  type="button"
                  onClick={() => setValue("intent", it.key, { shouldValidate: true })}
                  className={cn(
                    "w-full rounded-card border p-5 text-left transition-colors",
                    intent === it.key
                      ? "border-accent bg-accent/5"
                      : "border-rule-ink hover:border-ink",
                  )}
                >
                  <p className="serif text-h4">{it.label}</p>
                  <p className="mt-1 text-body-sm text-concrete-text">{it.sub}</p>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => next(["intent"])}
              className="inline-flex items-center gap-2 rounded-card bg-ink px-5 py-3 text-button text-paper hover:bg-accent"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 className="serif text-h3">Your details</h3>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="First name" error={errors.firstName?.message}>
              <input className={inputCls} {...register("firstName")} />
            </Field>
            <Field label="Last name" error={errors.lastName?.message}>
              <input className={inputCls} {...register("lastName")} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input className={inputCls} type="email" {...register("email")} />
            </Field>
            <Field label="Phone (optional)">
              <input className={inputCls} type="tel" {...register("phone")} />
            </Field>
            <Field label="Company (optional)" className="md:col-span-2">
              <input className={inputCls} {...register("company")} />
            </Field>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="inline-flex items-center gap-2 text-body-sm text-concrete-text hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              type="button"
              onClick={() => next(["firstName", "lastName", "email"])}
              className="inline-flex items-center gap-2 rounded-card bg-ink px-5 py-3 text-button text-paper hover:bg-accent"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="serif text-h3">Tell us more</h3>
          <Field label="Your message" error={errors.message?.message} className="mt-6">
            <textarea
              rows={6}
              className={inputCls}
              placeholder="Project type, timeline, budget range, anything we should know..."
              {...register("message")}
            />
          </Field>
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 text-body-sm text-concrete-text hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-card bg-accent px-6 py-3 text-button text-paper hover:bg-accent-hi disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send message"}{" "}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

const inputCls =
  "w-full rounded-card border border-rule-ink bg-paper px-3 py-2.5 text-body text-ink placeholder:text-concrete focus:border-ink focus:outline-none";

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="text-body-sm font-medium text-ink">{label}</span>
      <span className="mt-1.5 block">{children}</span>
      {error && <span className="mt-1 block text-body-sm text-accent">{error}</span>}
    </label>
  );
}
