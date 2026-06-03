import type { ReactNode } from "react";
import { Linkedin } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.31-2.84V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.403.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

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
      className="relative z-10 border-t border-white/[0.06] px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 pb-8"
      style={{ background: "#141414", fontFamily: "'Kanit', sans-serif" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(140px,1fr)_repeat(4,minmax(0,1fr))_minmax(200px,1.2fr)] lg:gap-8 xl:gap-10">
          <div className="lg:pt-1">
            <a
              href="/"
              className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold lowercase tracking-tight text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              solver.
            </a>
          </div>

          <FooterColumn title="Europe & USA Office">
            <a href="tel:+13105550142" className="flex items-center gap-2 text-white/70 transition hover:text-white">
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
              +1 (310) 555-0142
            </a>
            <p>SOLVER COMPANY</p>
            <p>1200 South Hope Street, Los Angeles, CA</p>
            <a href="mailto:hello@solvercompany.com" className="transition hover:text-white">
              hello@solvercompany.com
            </a>
          </FooterColumn>

          <FooterColumn title="Asia Office">
            <a href="tel:+6591234567" className="flex items-center gap-2 text-white/70 transition hover:text-white">
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
              +65 9123 4567
            </a>
            <p>SOLVER COMPANY</p>
            <p>15 Beach Road, Singapore</p>
            <a href="mailto:hello@solvercompany.com" className="transition hover:text-white">
              hello@solvercompany.com
            </a>
          </FooterColumn>

          <FooterColumn title="Social Media">
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition hover:text-white">
              <TikTokIcon className="h-4 w-4 shrink-0" />
              @solvercompany
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition hover:text-white">
              <Linkedin className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              @solvercompany
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition hover:text-white">
              <PinterestIcon className="h-4 w-4 shrink-0" />
              @solvercompany
            </a>
          </FooterColumn>

          <FooterColumn title="Legal">
            <a href="#" className="transition hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-white">
              Legal Notice
            </a>
            <a href="#" className="transition hover:text-white">
              Terms of Service
            </a>
          </FooterColumn>

          <div className="flex flex-col items-start gap-6 lg:items-end lg:text-right">
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
          className="mt-16 sm:mt-20 text-center text-[13px] text-white/40"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Designed by Solver Company.
        </p>
      </div>
    </footer>
  );
}
