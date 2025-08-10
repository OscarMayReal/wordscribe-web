"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

interface HeaderProps {
  name: string;
}

export function Header({ name }: HeaderProps) {
  const path = usePathname();
  
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      padding: "1rem",
      backgroundColor: "white",
      borderBottom: "1px solid #e2e8f0",
    }}>
      <div style={{ width: "10px" }} />
      <SidebarTrigger />
      <div style={{ marginLeft: "1rem", fontWeight: 500 }}>{name}</div>
      <div style={{ flex: 1 }} />
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <div style={{ width: "10px" }} />
    </header>
  );
}
