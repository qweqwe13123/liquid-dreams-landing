import { createFileRoute } from "@tanstack/react-router";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { TERMS_OF_USE } from "@/data/legal/terms-of-use";

export const Route = createFileRoute("/terms-of-use")({
  head: () => ({
    meta: [{ title: "Terms of Use — Solver" }, { name: "robots", content: "noindex" }],
  }),
  component: TermsOfUsePage,
});

function TermsOfUsePage() {
  return <LegalDocumentPage document={TERMS_OF_USE} />;
}
