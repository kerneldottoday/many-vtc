import { business } from "@/lib/business";
import type { Dictionary } from "@/lib/translations";

type LegalContentProps = {
  title: string;
  lead: string;
  sections: Dictionary["legal"]["mentionsSections"];
  showContact?: boolean;
};

function ContactLine() {
  return (
    <p className="body-md mt-4">
      <a href={`tel:${business.phone}`} className="text-white hover:underline">
        {business.phoneDisplay}
      </a>
      {" · "}
      <a href={`mailto:${business.email}`} className="text-white hover:underline">
        {business.email}
      </a>
    </p>
  );
}

export default function LegalContent({ title, lead, sections, showContact }: LegalContentProps) {
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="section-heading">{title}</h1>
      <p className="body-lg mt-5">{lead}</p>

      <div className="mt-12 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-2xl font-medium tracking-tighter">{section.title}</h2>
            <div className="body-md mt-4 space-y-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {showContact && <ContactLine />}
    </article>
  );
}
