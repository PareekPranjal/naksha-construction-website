"use client";

import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionContainer, Eyebrow } from "@/components/SectionContainer";
import { JobCard } from "@/components/JobCard";
import { FilterPills } from "@/components/FilterPills";
import { CTABanner } from "@/components/CTABanner";
import { LOREM, type Job } from "@/lib/data";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function OpeningsClient() {
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    fetch(`${API}/jobs`)
      .then((r) => r.json())
      .then((rows: Job[]) => setJobs(rows))
      .catch(() => undefined);
  }, []);
  const [dept, setDept] = useState("All");
  const [type, setType] = useState("All");

  const departments = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((j) => j.department)))],
    [jobs],
  );
  const types = ["All", "Full-time", "Contract", "Apprenticeship"];

  const filtered = jobs.filter(
    (j) => (dept === "All" || j.department === dept) && (type === "All" || j.type === type),
  );

  return (
    <>
      <Header />
      <main className="pt-[64px] md:pt-[72px]">
        <SectionContainer size="md">
          <div className="max-w-2xl">
            <Eyebrow>Openings</Eyebrow>
            <h1 className="serif mt-4 text-display-lg leading-[1.05]">Roles we're hiring for.</h1>
            <p className="mt-5 text-lead text-concrete-text">{LOREM.medium}</p>
          </div>
        </SectionContainer>

        <SectionContainer size="md">
          <div className="space-y-5">
            <div>
              <p className="eyebrow text-concrete-text">Department</p>
              <div className="mt-3">
                <FilterPills options={departments} active={dept} onChange={setDept} />
              </div>
            </div>
            <div>
              <p className="eyebrow text-concrete-text">Type</p>
              <div className="mt-3">
                <FilterPills options={types} active={type} onChange={setType} />
              </div>
            </div>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-4">
            {filtered.map((j) => (
              <li key={j.slug}>
                <JobCard job={j} />
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="text-body text-concrete-text">No roles match those filters.</li>
            )}
          </ul>
        </SectionContainer>

        <CTABanner
          heading="Don't see your role?"
          sub="Send us your CV anyway — we keep a pipeline for the right people."
        />
      </main>
      <Footer />
    </>
  );
}
