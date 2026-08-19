import { useParams } from "react-router-dom";
import serviceLandings from "../data/serviceLandings.json";
import type { ServiceLanding } from "../types";
import { ServiceLandingSection } from "../components/ServiceLandingSection";
import { NotFoundPage } from "./NotFoundPage";

export function ServiceLandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const landing = (serviceLandings as ServiceLanding[]).find((s) => s.slug === slug);

  if (!landing) return <NotFoundPage />;

  return <ServiceLandingSection landing={landing} />;
}
