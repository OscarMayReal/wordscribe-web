"use client"
import { useBlogInfo, useBlogPosts } from "@/lib/blog";
import { OrganizationSwitcher, PricingTable, SignedIn, useOrganization } from "@clerk/nextjs";
import { PenIcon, TextIcon, ZapIcon } from "lucide-react";
import { PlanDetailsButton, SubscriptionDetailsButton } from '@clerk/nextjs/experimental'
import { Button } from "@/components/ui/button";
import { Header } from "@/components/shell";
import { createContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export const PostsPageContext = createContext({
    reloadPosts: () => {},
    reloadBlogInfo: () => {},
    blogInfo: {},
    posts: [],
})

export default function PostsPage({ children }: { children: React.ReactNode }) {
    const organization = useOrganization()
    const blogInfo = useBlogInfo(organization.organization?.slug || "")
    const posts = useBlogPosts(organization.organization?.slug || "")
    const router = useRouter()
    const pathname = usePathname()
    useEffect(() => {
        if (organization.organization?.slug) {
            blogInfo.reload()
            posts.reload()
            if (pathname != "/dashboard/blog/posts") {
                router.replace(`/dashboard/blog/posts/`)
            }
        }
    }, [organization.organization?.slug || ""])
    return (
        <PostsPageContext.Provider value={{ reloadPosts: () => {posts.reload()}, reloadBlogInfo: () => {blogInfo.reload()}, blogInfo: blogInfo, posts: posts }}>
            <div className="pageshell">
                <Header name="Posts" />
                <div style={{ display: "flex", flexDirection: "row", maxHeight: "calc(100% - 50px)", minHeight: "calc(100% - 50px)" }}>
                    <div style={{ display: "flex", flexDirection: "column", width: "400px", height: "100%" }}>
                        <div style={{ fontSize: "20px", padding: "20px", display: "flex", flexDirection: "row", alignItems: "center", gap: "5px", borderBottom: "1px solid var(--border)" }}>
                            <OrganizationSwitcher hidePersonal />
                            {blogInfo.info.plan == "blog_pro" ? <ProBadge /> : ""}
                            <div style={{flexGrow: 1}} />
                            <Button variant="outline" onClick={() => window.open(window.location.protocol + "//" + organization.organization?.slug + "." + window.location.hostname + ":" + window.location.port, "_blank")}>View Blog</Button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {posts.posts.map((post: any) => (
                                <PostItem post={post} key={post.id} />
                            ))}
                        </div>
                    </div>
                    <div style={{ flex: 1, borderLeft: "1px solid var(--border)", maxHeight: "100%" }}>
                        {children}
                    </div>
                </div>
            </div>
        </PostsPageContext.Provider>
    )
}

function PostItem({ post }: { post: any }) {
    const router = useRouter()
    return (
        <div className="blogmanager-postitem" onClick={() => {router.push(`/dashboard/blog/posts/${post.id}/overview`)}}>
            {post.public ? <TextIcon size={20} /> : <PenIcon size={20} />}
            <div>{post.title}</div>
            <div> • </div>
            <div style={{ color: "#666666" }}>{new Date(post.createdAt).toLocaleDateString()}</div>
        </div>
    )
}

function ProBadge() {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "#7C5ED5", color: "white", padding: "2px 8px", borderRadius: "5px" }}>
            <ZapIcon size={12} />
            <span style={{ fontSize: "15px" }}>Pro</span>
        </div>
    )
}