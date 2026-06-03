import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Home", to: "/" as const },
  { label: "Services", to: "/services" as const },
  { label: "Reach Us", href: "#contact" },
] as const;

type MobileNavProps = {
  logoStyle?: CSSProperties;
  variant?: "light" | "dark";
};

export function MobileNav({ logoStyle, variant = "light" }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const isDark = variant === "dark";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
          isDark
            ? "border-white/20 bg-black/30 text-white backdrop-blur-md"
            : "liquid-glass text-foreground"
        }`}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: isDark ? "rgba(7, 11, 38, 0.98)" : "rgba(12, 12, 12, 0.98)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="flex items-center justify-between px-5 py-5">
            <Link to="/" className="text-2xl tracking-tight text-white" style={logoStyle} onClick={() => setOpen(false)}>
              Solver<sup className="text-xs">®</sup>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 px-5 pt-4">
            {LINKS.map((link) =>
              "to" in link ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className="rounded-xl px-4 py-4 text-lg font-medium text-white/90 transition-colors hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-xl px-4 py-4 text-lg font-medium text-white/90 transition-colors hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>

          <div className="border-t border-white/10 p-5">
            <a
              href="#contact"
              className="flex w-full items-center justify-center rounded-full border border-white/25 bg-white/10 py-4 text-sm font-medium uppercase tracking-wider text-white"
              onClick={() => setOpen(false)}
            >
              Begin Journey
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
