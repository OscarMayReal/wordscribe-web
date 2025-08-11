"use client"
import { SidebarTrigger } from "./ui/sidebar";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "./ui/breadcrumb";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Header({ name }: { name: string }) {
    const path = usePathname();
    return (
        <header>
            <div style={{ width: "10px" }}/>
            <SidebarTrigger />
            <div>{name}</div>
            <div style={{ flex: 1 }}/>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignInButton />
            </SignedOut>      
            <div style={{ width: "10px" }}/>         
        </header>
    )
}