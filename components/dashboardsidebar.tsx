"use client"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { BookmarkIcon, CompassIcon, CreditCardIcon, LibraryIcon, NewspaperIcon, PencilIcon, SettingsIcon, TagIcon, UsersIcon, VideoIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSidebar } from "@/components/ui/sidebar"

export function DashboardSidebar() {
    const router = useRouter();
    const sidebar = useSidebar();
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarContent>
                {/* <SidebarGroup className="pb-0">
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a onClick={() => router.push("/dashboard")}>
                                        <LibraryIcon />
                                        <span>Library</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a>
                                        <CompassIcon />
                                        <span>Discover</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup className="pb-0">
                    <SidebarGroupLabel>Library</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a>
                                        <BookmarkIcon />
                                        <span>All Bookmarks</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a>
                                        <VideoIcon />
                                        <span>Video</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a>
                                        <NewspaperIcon />
                                        <span>Pages</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup> */}
                <SidebarGroup className="pb-0">
                    <SidebarGroupLabel>Your Blog</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild onClick={() => router.push("/dashboard/blog/posts")}>
                                    <a>
                                        <PencilIcon />
                                        <span>Posts</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {/* <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a>
                                        <TagIcon />
                                        <span>Tags</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem> */}
                            <SidebarMenuItem onClick={() => router.push("/dashboard/blog/manage")}>
                                <SidebarMenuButton asChild>
                                    <a>
                                        <SettingsIcon />
                                        <span>Manage Blog</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem onClick={() => router.push("/dashboard/blog/billing")}>
                                <SidebarMenuButton asChild>
                                    <a>
                                        <CreditCardIcon />
                                        <span>Billing</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {sidebar.state === "expanded" && <div className="m-4 mt-2" style={{ width: "calc(240px - 2rem)" }}>
                    <div className="font-medium">Looking for something else?</div>
                    <div className="text-sm">Currently, we only support managing your blog posts on the web, download the mobile app to unlock the full experience.</div>
                </div>}
            </SidebarContent>
            <SidebarFooter>
                
            </SidebarFooter>
        </Sidebar>
    )
}

function DashboardSidebarHeader() {
    return (
        <SidebarHeader className="pb-0 flex items-center gap-2 flex-row">
            <SidebarTrigger />
            <span>Wordscribe</span>
        </SidebarHeader>
    )
}