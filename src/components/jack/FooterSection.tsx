import type { ReactNode } from "react";

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90">{title}</h3>
      <div className="flex flex-col gap-3 text-[13px] leading-relaxed text-white/55">{children}</div>
    </div>
  );
}

export function FooterSection() {
  return (
    <footer
      id="contact"
      className="relative z-10 border-t border-white/[0.06] px-5 pb-8 pt-16 sm:px-8 sm:pt-20 md:px-10"
      style={{ background: "#141414", fontFamily: "'Kanit', sans-serif" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-10 max-lg:gap-8 sm:grid-cols-2 lg:grid-cols-[minmax(140px,1fr)_repeat(2,minmax(0,1fr))_minmax(200px,1.2fr)] lg:gap-8 xl:gap-10">
          <div className="lg:pt-1">
            <a
              href="/"
              className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold lowercase tracking-tight text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              solver.
            </a>
          </div>

          <FooterColumn title="Contact">
            <a href="mailto:solvershq@gmail.com" className="transition hover:text-white">
              solvershq@gmail.com
            </a>
          </FooterColumn>

          <FooterColumn title="Legal">
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-use"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              Terms of Use
            </a>
          </FooterColumn>

          <div className="flex flex-col items-start gap-6 max-lg:col-span-2 sm:col-span-2 lg:col-span-1 lg:items-end lg:text-right">
            <h3 className="max-w-[220px] text-[13px] font-semibold uppercase leading-[1.35] tracking-[0.08em] text-white/90 lg:ml-auto">
              Let&apos;s Build
              <br />
              Something
              <br />
              Exceptional
            </h3>
            <button
              type="button"
              className="rounded-full bg-black px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
            >
              Start Your Project
            </button>
          </div>
        </div>

        <p
          className="mt-16 text-center text-[13px] text-white/40 sm:mt-20"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Designed by Solver Company.
        </p>
      </div>
    </footer>
  );
}
