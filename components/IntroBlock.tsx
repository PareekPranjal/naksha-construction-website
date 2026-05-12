import { AnimateInView } from "./AnimateInView";
import { SectionContainer, Eyebrow } from "./SectionContainer";

export function IntroBlock({
  eyebrow,
  heading,
  body,
  background = "paper",
}: {
  eyebrow?: string;
  heading: string;
  body: string;
  background?: "paper" | "ink";
}) {
  return (
    <SectionContainer background={background} size="md">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <AnimateInView className="md:col-span-5">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="serif mt-4 text-h1">{heading}</h2>
        </AnimateInView>
        <AnimateInView className="md:col-span-7" delay={0.1}>
          <p className={`text-lead ${background === "ink" ? "text-paper/85" : "text-concrete-text"}`}>
            {body}
          </p>
        </AnimateInView>
      </div>
    </SectionContainer>
  );
}
