import { FadeIn } from "./FadeIn";
import { Link } from "@tanstack/react-router";

const ALL_SERVICES = [
  { n: "01", name: "Web & App Development", desc: "Custom websites, web applications, and mobile experiences built to support growth and deliver exceptional user experiences." },
  { n: "02", name: "Virtual Receptionist", desc: "24/7 call handling, appointment scheduling, lead qualification, and customer support without increasing payroll costs." },
  { n: "03", name: "Business Automation", desc: "Streamlined systems that reduce manual work, improve efficiency, and help businesses operate at scale." },
  { n: "04", name: "Digital Operations", desc: "Integrated business systems that manage customer interactions, internal processes, and day-to-day operations within a unified digital ecosystem." },
  { n: "05", name: "Branding & Web Design", desc: "Premium visual identities and conversion-focused digital experiences designed to build trust, strengthen brand perception, and drive growth." },
  { n: "06", name: "Payment Systems", desc: "Secure payment infrastructures, subscription platforms, invoicing systems, and custom checkout experiences designed to simplify transactions and maximize revenue." },
  { n: "07", name: "Content Automation", desc: "Automated content creation and publishing systems that help businesses maintain a consistent and engaging online presence." },
  { n: "08", name: "Reputation Management", desc: "Systems designed to increase customer reviews, strengthen online credibility, and improve brand perception across digital platforms." },
  { n: "09", name: "CRM & Workflow Integration", desc: "Connecting business tools, customer data, and internal processes into a unified and efficient operational ecosystem." },
  { n: "10", name: "Motion Design", desc: "High-end animations and motion experiences that bring products, brands, and digital interfaces to life." },
  { n: "11", name: "3D Visualization", desc: "Premium 3D assets, product visualizations, and immersive experiences created for marketing, presentations, and digital platforms." },
  { n: "12", name: "E-Commerce Solutions", desc: "Custom online stores and sales platforms optimized for performance, scalability, and customer conversion." },
  { n: "13", name: "Custom Software", desc: "Tailor-made digital solutions built around unique business requirements, workflows, and operational goals." },
  { n: "14", name: "Maintenance & Support", desc: "Ongoing technical support, updates, monitoring, and optimization to ensure long-term reliability and performance." },
];

export { ALL_SERVICES };

export function ServicesSection({ full = false }: { full?: boolean } = {}) {
  const items = full ? ALL_SERVICES : ALL_SERVICES.slice(0, 6);
  return (
    <section
      id="services"
      className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]"
      style={{ background: "#FFFFFF", fontFamily: "'Kanit', sans-serif", color: "#0C0C0C" }}
    >
      <h2
        className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ color: "#0C0C0C", fontSize: "clamp(3rem, 12vw, 160px)", lineHeight: 1 }}
      >
        Services
      </h2>
      <div className="max-w-5xl mx-auto">
        {items.map((s, i) => (
          <FadeIn
            key={s.n}
            delay={i * 0.1}
            className="flex items-start gap-6 sm:gap-10 py-8 sm:py-10 md:py-12"
            style={{
              borderTop: i === 0 ? "1px solid rgba(12,12,12,0.15)" : "none",
              borderBottom: "1px solid rgba(12,12,12,0.15)",
            }}
          >
            <div className="font-black" style={{ color: "#0C0C0C", fontSize: "clamp(3rem, 10vw, 140px)", lineHeight: 0.9 }}>
              {s.n}
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <div className="font-medium uppercase" style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)", lineHeight: 1.1 }}>
                {s.name}
              </div>
              <p
                className="font-light leading-relaxed max-w-2xl"
                style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)", opacity: 0.6 }}
              >
                {s.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
      {!full && (
        <div className="max-w-5xl mx-auto mt-12 sm:mt-16 flex justify-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 rounded-full border-2 border-[#0C0C0C] px-8 sm:px-10 py-4 sm:py-5 font-medium uppercase tracking-wider transition-transform hover:scale-[1.03]"
            style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)" }}
          >
            View all services →
          </Link>
        </div>
      )}
    </section>
  );
}