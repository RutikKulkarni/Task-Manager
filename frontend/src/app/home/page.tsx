"use client";
import SidebarWrapper from "@/components/Wrappers/SidebarWrapper";
import Header from "@/components/Header/Header";
import Dashboard from "@/components/Dashboard/Dashboard";

export default function Home() {
  return (
    <SidebarWrapper>
      <Header />
      <Dashboard />
    </SidebarWrapper>
  );
}
