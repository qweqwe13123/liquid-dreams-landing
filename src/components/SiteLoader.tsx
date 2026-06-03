import { motion } from "framer-motion";

type SiteLoaderProps = {
  exiting: boolean;
};

export function SiteLoader({ exiting }: SiteLoaderProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0C0C0C]"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={exiting}
      aria-busy={!exiting}
    >
      <div className="relative flex flex-col items-center gap-10">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, #B600A8 25%, #7621B0 50%, #BE4C00 75%, transparent 100%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          />
          <div
            className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#141414] text-2xl text-white"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            S
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <p
            className="text-2xl tracking-tight text-white"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Solver
          </p>
          <motion.p
            className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/45"
            style={{ fontFamily: "'Kanit', sans-serif" }}
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            Preparing your experience
          </motion.p>
        </div>

        <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #7621B0, #B600A8, #BE4C00)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: exiting ? "100%" : "82%" }}
            transition={{
              duration: exiting ? 0.5 : 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
