"use client"
import { createPost, useBlogInfo, useBlogPosts } from "@/lib/blog";
import { OrganizationSwitcher, PricingTable, SignedIn, useOrganization } from "@clerk/nextjs";
import { LinkIcon, PenIcon, PlusIcon, TextIcon, ZapIcon } from "lucide-react";
import { PlanDetailsButton, SubscriptionDetailsButton } from '@clerk/nextjs/experimental'
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";
import { useContext } from "react";

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
                            <CreatePostButton />
                            <Button variant="outline" onClick={() => window.open(window.location.protocol + "//" + organization.organization?.slug + "." + window.location.hostname + ":" + window.location.port, "_blank")}><LinkIcon size={20}/></Button>
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

function CreatePostButton() {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [postTitle, setPostTitle] = useState("")
    const {getToken, isLoaded} = useAuth()
    const organization = useOrganization()
    const postscontext = useContext(PostsPageContext)
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <Button variant="outline"><PlusIcon size={20}/></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Post</DialogTitle>
                    <DialogDescription>
                        Create a new post
                    </DialogDescription>
                </DialogHeader>
                <Input placeholder="Post Title" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button disabled={!postTitle || !isLoaded} onClick={async () => {
                        const post = await createPost(organization.organization?.slug || "", postTitle, getToken!)
                        router.push(`/dashboard/blog/posts/${post.id}/overview`)
                        setIsOpen(false)
                        postscontext.reloadPosts()
                        console.log(post)
                    }}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
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