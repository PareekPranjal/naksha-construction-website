import { SectionContainer, Eyebrow } from "../SectionContainer";
import { JobCard } from "../JobCard";
import { cms } from "@/lib/api";

export async function OpenRolesBlock() {
  const jobs = await cms.jobs();
  if (!jobs.length) return null;
  return (
    <SectionContainer size="md">
      <Eyebrow>Open roles</Eyebrow>
      <ul className="mt-10 grid grid-cols-1 gap-4">
        {jobs.map((j) => (
          <li key={j.slug}>
            <JobCard job={j} />
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
