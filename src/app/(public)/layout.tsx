import Navigation from "@/app/(public)/_components/navigation/navigation";
import Footer from "@/app/(public)/_components/footer/footer";
import React from "react";

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <section>{children}</section>
      <Footer />
    </>
  );
}
