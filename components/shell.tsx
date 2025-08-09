"use client"
import { SidebarTrigger } from "./ui/sidebar";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "./ui/breadcrumb";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Header() {
    const path = usePathname();
    return (
        <header>
            <div style={{ width: "10px" }}/>
            <SidebarTrigger />
            <Breadcrumb>
                <BreadcrumbList>
                    {path.split("/").map((item, index) => {
                        return (
                            <BreadcrumbItem key={index}>
                                <BreadcrumbLink href={item}>{item}</BreadcrumbLink>
                            </BreadcrumbItem>
                        )
                    })}
                </BreadcrumbList>
            </Breadcrumb>
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