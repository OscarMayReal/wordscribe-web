import { DashboardSidebar } from "@/components/dashboardsidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider style={{ maxHeight: "100dvh" }}>
            <DashboardSidebar />
            <SidebarInset style={{ marginLeft: "0", borderRadius: 10, maxHeight: "100dvh" }}>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}