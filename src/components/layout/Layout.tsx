import type { ReactNode } from "react";
import { Header } from "./Header";
import { ThreeColumnStrip } from "./ThreeColumnStrip";
import { MoreInfoCTA } from "./MoreInfoCTA";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ThreeColumnStrip />
      <main className="flex-1">{children}</main>
      <MoreInfoCTA />
      <Footer />
    </div>
  );
}
