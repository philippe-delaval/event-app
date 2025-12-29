import Navigation from "@/app/(public)/_components/navigation/navigation";
import Footer from "@/app/(public)/_components/footer/footer";
import React from "react";

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* AdBanner removed to match new design */}
      <div className="relative flex-1">
        <Navigation />
        <section>{children}</section>
        <Footer />
      </div>
    </div>
  );
}
