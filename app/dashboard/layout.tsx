import { DashboardSidebar } from "@/components/dashboardsidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SignedIn>
                <SidebarProvider style={{ maxHeight: "100dvh" }}>
                    <DashboardSidebar />
                    <SidebarInset style={{ marginLeft: "0", borderRadius: 10, maxHeight: "100dvh" }}>
                        {children}
                    </SidebarInset>
                </SidebarProvider>
            </SignedIn>
            <SignedOut>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100dvh" }}>
                    <SignIn forceRedirectUrl={"/dashboard"} />
                </div>
            </SignedOut>
        </>
    )
}