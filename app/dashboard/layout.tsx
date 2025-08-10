"use client"
import { DashboardSidebar } from "@/components/dashboardsidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { OrganizationList, SignedIn, SignedOut, SignIn } from "@clerk/nextjs"
import { useOrganization } from "@clerk/nextjs"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    document.title = "WordScribe Dashboard"
    return (
        <>
            <SignedIn>
                <MainDashboardLayout>
                    {children}
                </MainDashboardLayout>
            </SignedIn>
            <SignedOut>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100dvh" }}>
                    <SignIn forceRedirectUrl={"/dashboard"} />
                </div>
            </SignedOut>
        </>
    )
}

export function MainDashboardLayout({ children }: { children: React.ReactNode }) {
    const organization = useOrganization()
    if (!organization.isLoaded) {
        return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100dvh" }}>
            <div>Loading...</div>
        </div>
    }
    if (!organization.organization) {
        return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100dvh" }}>
            <OrganizationList hidePersonal afterSelectOrganizationUrl={"/dashboard"} />
        </div>
    }
    return (
        <SidebarProvider style={{ maxHeight: "100dvh" }}>
            <DashboardSidebar />
            <SidebarInset style={{ marginLeft: "0", borderRadius: 10, maxHeight: "100dvh" }}>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}