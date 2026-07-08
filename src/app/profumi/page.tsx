import type { Metadata } from "next";
import { ProfumiPageContent } from "@/components/lumen/ProfumiPageContent";

export const metadata: Metadata = {
  title: "Profumi",
  description:
    "Saracenum e Thalasi — profumi underwater affinati a 35 metri nel Tirreno calabrese. Pre-order disponibile.",
};

export default function ProfumiPage() {
  return <ProfumiPageContent />;
}
