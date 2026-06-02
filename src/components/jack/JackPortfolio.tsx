import { MarqueeSection } from "./MarqueeSection";
import { AboutSection } from "./AboutSection";
import { ServicesSection } from "./ServicesSection";
import { ProjectsSection } from "./ProjectsSection";
import { ReviewsSection } from "./ReviewsSection";

export function JackPortfolio() {
  return (
    <div style={{ background: "#0C0C0C", fontFamily: "'Kanit', sans-serif", overflowX: "clip" }}>
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ReviewsSection />
    </div>
  );
}