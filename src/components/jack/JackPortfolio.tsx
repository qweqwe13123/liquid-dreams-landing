import { MarqueeSection } from "./MarqueeSection";
import { AboutSection } from "./AboutSection";
import { ServicesSection } from "./ServicesSection";
import { ProjectsSection } from "./ProjectsSection";
import { ReviewsSection } from "./ReviewsSection";
import { FooterSection } from "./FooterSection";

export function JackPortfolio() {
  return (
    <div style={{ background: "#070B26", fontFamily: "'Kanit', sans-serif", overflowX: "clip" }}>
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ReviewsSection />
      <FooterSection />
    </div>
  );
}