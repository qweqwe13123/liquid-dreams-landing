import { Link } from "@tanstack/react-router";

type LegalSection = {
  heading: string;
  paragraphs: readonly string[];
  list?: readonly string[];
  email?: string;
};

type LegalDocument = {
  title: string;
  updated: string;
  sections: readonly LegalSection[];
};

export function LegalDocumentPage({ document }: { document: LegalDocument }) {
  return (
    <div
      className="min-h-screen px-5 py-12 sm:px-8 sm:py-16 md:px-10"
      style={{ background: "#070B26", fontFamily: "'Inter', sans-serif", color: "#D7E2EA" }}
    >
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="mb-10 inline-block text-sm text-white/50 transition-colors hover:text-white"
        >
          ← Back to home
        </Link>

        <h1
          className="mb-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {document.title}
        </h1>
        <p className="mb-10 text-sm text-white/45">Last Updated: {document.updated}</p>

        <div className="flex flex-col gap-8">
          {document.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-3 text-lg font-semibold text-white">{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="mb-3 text-[15px] leading-relaxed text-white/72">
                  {p}
                </p>
              ))}
              {section.list ? (
                <ul className="mb-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-white/72">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {section.email ? (
                <p className="text-[15px] text-white/72">
                  Email:{" "}
                  <a
                    href={`mailto:${section.email}`}
                    className="text-white underline-offset-2 hover:underline"
                  >
                    {section.email}
                  </a>
                </p>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
