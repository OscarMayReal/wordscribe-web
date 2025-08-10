import { SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardSidebarHeader() {
    return (
        <SidebarHeader className="pb-0 flex items-center gap-2 flex-row">
            <SidebarTrigger />
            <span>Wordscribe</span>
        </SidebarHeader>
    )
}
