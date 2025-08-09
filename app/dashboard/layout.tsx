import { DashboardSidebar } from "@/components/dashboardsidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset style={{ marginLeft: "0", borderRadius: 10 }}>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}