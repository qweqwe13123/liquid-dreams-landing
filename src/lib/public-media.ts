/** Encode a path segment for URLs served from /public (handles spaces in filenames). */
function publicPath(...segments: string[]): string {
  return `/${segments.map((segment) => encodeURIComponent(segment)).join("/")}`;
}

/** Full-size project showcase videos (Projects section). */
export const PROJECT_VIDEOS = {
  project1: publicPath("Video Project 1.mp4"),
  project2: publicPath("Video Project 1 copy.mp4"),
  project3: publicPath("copy_8F24B367-2150-405E-BFE2-44EAB65AE0B8.mp4"),
} as const;

/** Short-form preview videos (marquee / shorts section). */
export const SHORT_VIDEOS = [
  publicPath("short", "hero-space-voyage-preview-eECLH3Yc copy.mp4"),
  publicPath("short", "hero-codenest-preview-Cgppc2qV copy.mp4"),
  publicPath("short", "hero-vex-ventures-preview-BczMFIiw copy.mp4"),
  publicPath("short", "hero-stellar-ai-v2-preview-DjvxjG3C copy.mp4"),
  publicPath("short", "hero-stellar-ai-preview-D3HL6bw1 copy.mp4"),
  publicPath("short", "hero-xportfolio-preview-D4A8maiC copy.mp4"),
  publicPath("short", "hero-orbit-web3-preview-BXt4OttD copy.mp4"),
  publicPath("short", "hero-nexora-preview-cx5HmUgo copy.mp4"),
  publicPath("short", "hero-evr-ventures-preview-DZxeVFEX copy.mp4"),
  publicPath("short", "hero-portal-preview-DEscBr2T copy.mp4"),
] as const;
